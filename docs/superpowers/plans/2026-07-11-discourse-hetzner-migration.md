# Discourse Hub → Hetzner Self-Host Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **⚠️ Ops-migration plan:** tasks are command→verify, not TDD. Steps marked **⛔ GATE** require operator (Luiz) input/approval before proceeding — never skip or simulate them. External actions (posting to the forum, flipping DNS, cancelling plans) are **draft-and-present** per org safety rules.

**Goal:** Move `hub.regencoordination.xyz` (Discourse, 186 users / 931 posts) from Discourse hosted (~$100/mo) to a self-hosted official Docker install on Hetzner CX32 (~$8/mo), with zero data loss and near-zero user-visible disruption.

**Architecture:** Single Hetzner CX32 (Ubuntu 24.04) running the official `discourse_docker` all-in-one container (Postgres+Redis+Rails+nginx), Let's Encrypt TLS, transactional SMTP, Cloudflare DNS. Staging dry-run on `hub-staging.` subdomain before cutover; hosted instance stays alive as rollback until verified.

**Tech Stack:** `discourse_docker` launcher · `hcloud` CLI · Cloudflare API · Discourse admin API · rsync/scp

**Spec:** `docs/superpowers/specs/2026-07-11-discourse-hetzner-migration-design.md`

---

## Secrets handling (applies to every task)

All credentials live in `~/.secrets/regen-hub-migration.env` (chmod 600, **outside the repo**, never committed). Format:

```bash
# ~/.secrets/regen-hub-migration.env
DISCOURSE_API_KEY=        # Task 1 — admin API key from hosted panel
DISCOURSE_API_USER=luizfernando
HCLOUD_TOKEN=             # Task 4 — Hetzner project API token
CF_API_TOKEN=             # Task 3 — Cloudflare token scoped to regencoordination.xyz DNS
SMTP_HOST=                # Task 5
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

Load in any shell that needs them: `set -a; source ~/.secrets/regen-hub-migration.env; set +a`

---

## Phase 0 — Discovery & Backup (zero risk, no changes)

### Task 1: Admin API key + instance inventory

**Files:** Create: `docs/temp/hub-migration/inventory.md` (working notes, gitignored area)

- [ ] **Step 1 ⛔ GATE (Luiz, ~3 min):** In the hosted panel, go to `https://hub.regencoordination.xyz/admin/api/keys` → New API Key → User: `luizfernando`, Scope: Global. Paste the key into `~/.secrets/regen-hub-migration.env` as `DISCOURSE_API_KEY`.

- [ ] **Step 2 (agent): Pull the full inventory via API**

```bash
set -a; source ~/.secrets/regen-hub-migration.env; set +a
H=(-H "Api-Key: $DISCOURSE_API_KEY" -H "Api-Username: $DISCOURSE_API_USER")
B=https://hub.regencoordination.xyz
mkdir -p docs/temp/hub-migration
curl -s "${H[@]}" $B/admin/dashboard.json        | jq '{version: .version_check}'                  > docs/temp/hub-migration/version.json
curl -s "${H[@]}" $B/admin/plugins.json          | jq '[.plugins[] | {name, enabled, version}]'    > docs/temp/hub-migration/plugins.json
curl -s "${H[@]}" $B/admin/site_settings.json    | jq '[.site_settings[] | select(.value != .default) | {setting, value}]' > docs/temp/hub-migration/nondefault-settings.json
curl -s "${H[@]}" "$B/admin/customize/themes.json" | jq '[.themes[] | {name, enabled: .user_selectable, default: .default}]' > docs/temp/hub-migration/themes.json
```

Expected: four JSON files. **Redact any secrets** (SMTP passwords, OAuth secrets) from `nondefault-settings.json` before it touches disk in the repo area — pipe through `jq 'map(if (.setting|test("secret|password|token|key";"i")) then .value="REDACTED" else . end)'`.

- [ ] **Step 3 (agent): Summarize findings in `inventory.md`** — Discourse version, plugin list (flag any non-default: these must go into `app.yml`), theme(s), SMTP provider currently configured, any OAuth/SSO providers enabled (`enable_google_oauth2_logins` etc.), whether `enable_s3_uploads` is true.

- [ ] **Step 4 (agent): Check total uploads size** from `/admin/dashboard.json` disk stats or `/admin/backups.json` last-backup size. Record in `inventory.md`. Expected: well under 2 GB per spec §1.

- [ ] **Step 5: Commit** (inventory summary only — verify no secrets):

```bash
git add docs/temp/hub-migration/inventory.md
git commit -m "migration(0): hosted Discourse inventory — version, plugins, settings"
```

### Task 2: Pull the full backup

- [ ] **Step 1 (agent): Trigger a fresh backup with uploads**

```bash
curl -s -X POST "${H[@]}" $B/admin/backups.json -d "with_uploads=true"
```

Expected: `{"success":"OK"}`. Poll `curl -s "${H[@]}" $B/admin/backups.json | jq '.[0]'` until the new file appears (a few minutes at this size).

- [ ] **Step 2 (agent): Download it**

```bash
FN=$(curl -s "${H[@]}" $B/admin/backups.json | jq -r '.[0].filename')
curl -s "${H[@]}" -o ~/Downloads/"$FN" "$B/admin/backups/$FN?token=$(curl -s -X PUT "${H[@]}" $B/admin/backups/$FN/download.json | jq -r .token 2>/dev/null)" \
  || echo "If token flow fails: download manually from $B/admin/backups (browser), ~1 click"
ls -lh ~/Downloads/"$FN"
```

Expected: a `.tar.gz` in `~/Downloads`, size consistent with Task 1 Step 4. **Fallback ⛔ GATE:** if the API download 403s (some hosted plans force browser download), Luiz downloads via browser — 1 minute.

- [ ] **Step 3 (agent): Record backup filename + size + sha256 in `inventory.md`; commit** (`migration(0): backup payload recorded`).

### Task 3: Ownership, DNS, billing confirmation

- [ ] **Step 1 ⛔ GATE (Luiz):** Confirm three facts and report back:
  1. **DNS**: is `regencoordination.xyz` on Cloudflare? Who has account access? → obtain a **scoped API token** (Zone:DNS:Edit for that zone only) into env as `CF_API_TOKEN`.
  2. **Billing**: is the hosted Discourse subscription under a Greenpill account (site id `greenpill_hub`) or RC? Who can cancel it in Phase 4?
  3. **Ops sign-off**: Afo/Matty confirmed as post-migration ops owners (spec §1)?

- [ ] **Step 2 (agent): Verify the CF token works (read-only check)**

```bash
curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones?name=regencoordination.xyz" | jq '.result[0] | {id, name, status}'
```

Expected: zone object with `"status": "active"`. Save `zone id` to `inventory.md`.

- [ ] **Step 3: Record all three answers in `inventory.md`; commit** (`migration(0): ownership/DNS/billing confirmed`).

### Task 4: Hetzner account + token

- [ ] **Step 1 ⛔ GATE (Luiz, ~5 min):** Create/confirm Hetzner Cloud account (decide: personal vs shared RC account — spec favors one Afo/Matty can also access). Create a project `regen-hub`, generate an API token (Read+Write) → `HCLOUD_TOKEN` in env.

- [ ] **Step 2 (agent): Install CLI + verify**

```bash
brew install hcloud
hcloud context create regen-hub   # paste $HCLOUD_TOKEN when prompted
hcloud server list
```

Expected: empty server list, no auth error.

### Task 5: SMTP provider

- [ ] **Step 1 (agent): Recommend based on Task 1 findings.** Default recommendation: **Brevo free tier** (300 emails/day — ample for ~186 users' notifications+digests) unless inventory shows an existing provider we can reuse, or RC has an AWS account (then SES at ~$0.10/1k). Present a one-paragraph draft recommendation to Luiz.

- [ ] **Step 2 ⛔ GATE (Luiz, ~10 min):** Create the account, verify the sending domain (`regencoordination.xyz`), and paste SMTP creds into env. Provider will supply **SPF + DKIM DNS records** — hold them for Step 3.

- [ ] **Step 3 (agent): Add SPF/DKIM records via Cloudflare API** (draft-and-present the exact records first):

```bash
ZID=<zone id from Task 3>
# Example — actual name/content come from the provider dashboard:
curl -s -X POST -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/$ZID/dns_records" \
  -d '{"type":"TXT","name":"mail._domainkey.regencoordination.xyz","content":"<DKIM value from provider>","ttl":3600}'
```

Expected: `"success": true`. Then verify in provider dashboard that domain shows verified.

---

## Phase 1 — Provision staging

### Task 6: Create the server

- [ ] **Step 1 (agent): SSH key + firewall + server**

```bash
ssh-keygen -t ed25519 -f ~/.ssh/regen-hub -N "" -C "regen-hub-migration"
hcloud ssh-key create --name regen-hub --public-key-from-file ~/.ssh/regen-hub.pub
hcloud firewall create --name regen-hub-fw \
  --rules-file <(echo '[
    {"direction":"in","protocol":"tcp","port":"22","source_ips":["0.0.0.0/0","::/0"]},
    {"direction":"in","protocol":"tcp","port":"80","source_ips":["0.0.0.0/0","::/0"]},
    {"direction":"in","protocol":"tcp","port":"443","source_ips":["0.0.0.0/0","::/0"]}
  ]')
hcloud server create --name regen-hub --type cx32 --image ubuntu-24.04 \
  --location fsn1 --ssh-key regen-hub --firewall regen-hub-fw
hcloud server list -o columns=name,ipv4,status
```

Expected: server `running` with a public IPv4. Record IP as `$SERVER_IP` in `inventory.md`.

- [ ] **Step 2 (agent): Base hardening + Docker**

```bash
SSH="ssh -i ~/.ssh/regen-hub root@$SERVER_IP"
$SSH 'apt-get update && apt-get -y upgrade && apt-get -y install fail2ban && \
      curl -fsSL https://get.docker.com | sh && \
      timedatectl set-timezone UTC && docker --version'
```

Expected: Docker version prints; no errors.

- [ ] **Step 3 (agent): Staging DNS record**

```bash
curl -s -X POST -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/$ZID/dns_records" \
  -d "{\"type\":\"A\",\"name\":\"hub-staging.regencoordination.xyz\",\"content\":\"$SERVER_IP\",\"ttl\":300,\"proxied\":false}"
dig +short hub-staging.regencoordination.xyz   # after a minute
```

Expected: resolves to `$SERVER_IP`. **Note `proxied: false`** — required for Let's Encrypt HTTP challenge.

- [ ] **Step 4: Commit** inventory update (`migration(1): CX32 provisioned, staging DNS live`).

---

## Phase 2 — Install + restore on staging

### Task 7: Install Discourse (staging hostname)

- [ ] **Step 1 (agent): Clone launcher + configure**

```bash
$SSH 'git clone https://github.com/discourse/discourse_docker.git /var/discourse && \
      cd /var/discourse && cp samples/standalone.yml containers/app.yml'
```

- [ ] **Step 2 (agent): Edit `containers/app.yml` on the server.** Set (values from env + Task 1 inventory):
  - `DISCOURSE_HOSTNAME: hub-staging.regencoordination.xyz`
  - `DISCOURSE_DEVELOPER_EMAILS: luizfernandolfsg@gmail.com`
  - `DISCOURSE_SMTP_ADDRESS/PORT/USER_NAME/PASSWORD` from env
  - `LETSENCRYPT_ACCOUNT_EMAIL: luizfernandolfsg@gmail.com` (keep the two LE templates enabled)
  - **Every non-default plugin from Task 1** appended under `hooks: after_code: - exec: cd: $home/plugins cmd:` as `git clone` lines (exact repos looked up per plugin name; official plugin repos live under `github.com/discourse/discourse-<name>`)
  - If source Discourse version (Task 1) is pinned/older: set `version:` in `app.yml` to match, so restore target ≥ source and same-branch.

- [ ] **Step 3 (agent): Bootstrap + start (~10 min)**

```bash
$SSH 'cd /var/discourse && ./launcher rebuild app'
curl -sI https://hub-staging.regencoordination.xyz | head -3
```

Expected: rebuild completes without error; curl returns `HTTP/2 200` with valid TLS (Let's Encrypt auto-issued during bootstrap).

- [ ] **Step 4: Commit** notes (`migration(2): staging Discourse bootstrapped`).

### Task 8: Restore the backup

- [ ] **Step 1 (agent): Upload the backup**

```bash
scp -i ~/.ssh/regen-hub ~/Downloads/$FN root@$SERVER_IP:/var/discourse/shared/standalone/backups/default/
```

- [ ] **Step 2 (agent): Restore**

```bash
$SSH 'cd /var/discourse && ./launcher enter app' <<'EOF'
discourse enable_restore
discourse restore <FN>
discourse disable_restore
exit
EOF
```

Expected: restore log ends with `[SUCCESS]`; site restarts. (If shell heredoc into `launcher enter` misbehaves, run the three commands via `./launcher run app "discourse restore <FN>"` style instead.)

- [ ] **Step 3 (agent): Remap any baked-in CDN URLs**

```bash
$SSH 'cd /var/discourse && ./launcher enter app' <<'EOF'
discourse remap //canada1.discourse-cdn.com/flex004/uploads/greenpill_hub //hub-staging.regencoordination.xyz/uploads/default
exit
EOF
```

Expected: reports N posts remapped (may be 0 — fine). Then rebake: `rake posts:rebake` inside the container (background, can take a while; at 931 posts ≈ minutes).

- [ ] **Step 4: Commit** notes (`migration(2): backup restored to staging`).

### Task 9: Staging verification (the dry-run sign-off)

- [ ] **Step 1 (agent): Automated checks**

```bash
S=https://hub-staging.regencoordination.xyz
curl -s $S/about.json -H "User-Agent: Mozilla/5.0" | jq '.about.stats | {users_count, topics_count, posts_count}'
# Expected: {"users_count":186,"topics_count":159,"posts_count":931} (± any new activity since backup)
curl -s $S/latest.json -H "User-Agent: Mozilla/5.0" | jq '.topic_list.topics | length'   # Expected: 30
curl -s $S/t/1.json -H "User-Agent: Mozilla/5.0" | jq '.title'                            # a real topic renders
```

- [ ] **Step 2 (agent): Test email** — from the running container: `./launcher enter app` → `discourse` … or simpler, admin UI `/admin/email/test` sending to Luiz's address. Expected: mail arrives in inbox (not spam) with passing SPF/DKIM headers (verify in "show original").

- [ ] **Step 3 ⛔ GATE (Luiz, ~10 min): Human smoke-test on staging** — log in with your existing password (proves credential migration), open a few topics, check images render, check avatars, try posting in a test topic, check `/admin` loads. **Also ⛔ invite Afo to poke at it** — this doubles as ops-owner onboarding.

- [ ] **Step 4: Record verification results in `inventory.md`; commit** (`migration(2): staging verified — GO for cutover prep`).

---

## Phase 3 — Cutover

### Task 10: Pre-cutover prep (do 1–2 days before the window)

- [ ] **Step 1 (agent): Lower production DNS TTL**

```bash
RID=$(curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones/$ZID/dns_records?name=hub.regencoordination.xyz" | jq -r '.result[0].id')
curl -s -X PATCH -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/$ZID/dns_records/$RID" -d '{"ttl":300}'
```

Expected: `"success": true`. Also record the **current record content** (the hosted IP/CNAME) in `inventory.md` — this is the rollback value.

- [ ] **Step 2 (agent): Draft the heads-up forum post** (draft-and-present to Luiz; posts only with approval): short topic announcing a ~1-hour read-only maintenance window, date/time.

- [ ] **Step 3 ⛔ GATE (Luiz): Approve + schedule the cutover window** (pick a low-activity time; forum averages <1 post/day, so almost any time works). Post the announcement.

### Task 11: Cutover execution (target: <1 hour)

- [ ] **Step 1 ⛔ GATE (Luiz confirms "go") → (agent): Enable read-only on hosted**

```bash
curl -s -X PUT "${H[@]}" $B/admin/site_settings/enable_readonly_mode -d "enable_readonly_mode=true" \
  || echo "Fallback: /admin → Settings → search 'read only' → enable (Luiz, 1 min)"
```

- [ ] **Step 2 (agent): Final backup → download → upload to server** (same commands as Tasks 2+8 Step 1; new `$FN2`).

- [ ] **Step 3 (agent): Restore `$FN2` on the server** (same as Task 8 Step 2).

- [ ] **Step 4 (agent): Switch hostname to production + rebuild**

On the server, edit `/var/discourse/containers/app.yml`: `DISCOURSE_HOSTNAME: hub.regencoordination.xyz`, then:

```bash
$SSH 'cd /var/discourse && ./launcher rebuild app'
```

⚠️ TLS for the production hostname can't issue until DNS points here — expect the LE attempt in this rebuild to fail; that's fine, next step fixes it.

- [ ] **Step 5 (agent): Flip DNS**

```bash
curl -s -X PATCH -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/$ZID/dns_records/$RID" \
  -d "{\"type\":\"A\",\"name\":\"hub.regencoordination.xyz\",\"content\":\"$SERVER_IP\",\"proxied\":false,\"ttl\":300}"
```

- [ ] **Step 6 (agent): Re-run LE issuance once DNS resolves**

```bash
dig +short hub.regencoordination.xyz    # wait until = $SERVER_IP
$SSH 'cd /var/discourse && ./launcher rebuild app'   # LE now succeeds
curl -sI https://hub.regencoordination.xyz | head -3  # HTTP/2 200, valid cert
```

- [ ] **Step 7 (agent): Remap staging hostname + old CDN in restored data**

```bash
$SSH 'cd /var/discourse && ./launcher enter app' <<'EOF'
discourse remap hub-staging.regencoordination.xyz hub.regencoordination.xyz
discourse remap //canada1.discourse-cdn.com/flex004/uploads/greenpill_hub //hub.regencoordination.xyz/uploads/default
exit
EOF
```

(First remap likely 0 hits since Step 3 restored fresh production data — run anyway, it's idempotent.)

- [ ] **Step 8: Verify production end-to-end** — repeat Task 9 Steps 1–2 against `https://hub.regencoordination.xyz`. **⛔ GATE (Luiz):** log in, post a real test reply, confirm email notification arrives. Then **disable read-only on the NEW instance** if it carried over (`/admin` → read-only off).

- [ ] **Step 9: Commit** (`migration(3): cutover complete — hub live on Hetzner`).

**Rollback at any point in Task 11:** PATCH the DNS record back to the recorded hosted value (Task 10 Step 1) and disable read-only on hosted. Data loss: zero (hosted was read-only throughout).

---

## Phase 4 — Stabilize, decommission, hand off

### Task 12: Backups + monitoring (run within 48h of cutover)

- [ ] **Step 1 (agent): Enable automated daily backups** — `/admin/site_settings`: `backup_frequency=1`, `maximum_backups=14`. Offsite: create a **Cloudflare R2 bucket** (free 10 GB, S3-compatible) `regen-hub-backups`, generate R2 API creds, set `backup_location=s3`, `s3_backup_bucket`, S3 endpoint+keys in app.yml env section, rebuild.
- [ ] **Step 2 (agent): Enable Hetzner snapshots** — `hcloud server enable-backup regen-hub` (7 rolling snapshots, +20% of server cost ≈ $1.5/mo).
- [ ] **Step 3 (agent): Verify one backup actually lands in R2**, then run a **restore drill on paper**: document the exact restore commands in the runbook (Task 14).
- [ ] **Step 4 (agent): Uptime monitoring** — free tier UptimeRobot (or similar) pinging `https://hub.regencoordination.xyz/srv/status`, alerting Luiz + Afo emails. ⛔ GATE: Luiz creates the account (or approves reuse of an existing one).

### Task 13: Verification window + hosted-plan cancellation

- [ ] **Step 1: Hold 7 days.** Watch: email deliverability (`/admin/email/sent`), error logs (`/logs`), uptime alerts. Agent checks daily during session opens; any anomaly → fix before proceeding.
- [ ] **Step 2 ⛔ GATE (Luiz + billing owner per Task 3): Cancel the hosted Discourse plan.** Draft-and-present the cancellation note. **Saving realized: ~$92/mo.**
- [ ] **Step 3 (agent): Confirm hosted instance is gone** and old CDN URLs 404 — re-run the remap check (Task 11 Step 7) shows no remaining `discourse-cdn.com` references: from container rails console, `Post.where("cooked LIKE '%discourse-cdn.com%'").count` → expected 0.

### Task 14: Runbook + repo integration

**Files:**
- Create: `docs/runbooks/discourse-hub-ops.md`
- Modify: `federation.yaml` (services.forum — note self-hosted), `TOOLS.md` (server/SSH details, no secrets), `HEARTBEAT.md` (close 2 tasks, add monthly maintenance task), `data/finances.yaml` (budget line 7 → actual cost)

- [ ] **Step 1 (agent): Write `docs/runbooks/discourse-hub-ops.md`** covering: server details (IP, provider, ops owners Afo/Matty), monthly upgrade (`cd /var/discourse && git pull && ./launcher rebuild app`), backup locations (R2 + Hetzner snapshots) and restore procedure (exact commands from Task 8), TLS auto-renewal (built-in, verify with `curl -sI`), incident basics (disk full → `./launcher cleanup`; container down → `./launcher start app`), and escalation contacts.
- [ ] **Step 2 (agent): Update `federation.yaml`** forum entry: add `hosting: self-hosted (hetzner-cx32)` comment; API URL unchanged.
- [ ] **Step 3 (agent): Update `TOOLS.md`** — SSH alias, server IP, R2 bucket name, monitoring dashboard link. **No secrets.**
- [ ] **Step 4 (agent): Update `HEARTBEAT.md`** — mark done: "Decide on owning hub self-hosting (budget line 7)" and "Investigate Discourse self-hosting on VPS"; add recurring: "Monthly: Discourse `launcher rebuild` security update (owner: Afo/Matty)".
- [ ] **Step 5 (agent): Update `data/finances.yaml`** budget line 7: $250 placeholder → ~$10/mo actual; run `npm run generate:schemas && npm run validate:schemas`.
- [ ] **Step 6: Memory + commit**

```bash
# append to memory/2026-MM-DD.md: migration completed, final architecture, savings
git add docs/runbooks/discourse-hub-ops.md federation.yaml TOOLS.md HEARTBEAT.md data/finances.yaml .well-known/
git commit -m "migration(4): hub self-host complete — runbook, federation, finances updated"
```

- [ ] **Step 7 ⛔ GATE (Luiz): Ops handoff call/message to Afo + Matty** — draft-and-present a short handoff note linking the runbook, confirming they have SSH keys added (`hcloud ssh-key create` for each + append to server `authorized_keys`) and Hetzner project access.

---

## Task dependency graph

```
T1 (API key+inventory) ─┬─▶ T2 (backup) ──────────────┐
T3 (DNS/billing confirm) ┤                            ├─▶ T7 (install) ─▶ T8 (restore) ─▶ T9 (verify) ─▶ T10 (prep) ─▶ T11 (CUTOVER) ─▶ T12 ─▶ T13 ─▶ T14
T4 (Hetzner token) ──────┴─▶ T6 (provision) ──────────┘
T5 (SMTP) ───────────────────────────────▲ (needed by T7 step 2)
```

Tasks 1–5 can proceed in parallel where gates allow. T11 is the only downtime-bearing task.

## Operator gate summary (everything Luiz must personally do)

| Gate | Task | Effort |
|------|------|--------|
| Generate Discourse admin API key | T1 | 3 min |
| Confirm DNS/Cloudflare access + billing owner + ops owners | T3 | async, message Matty/Afo |
| Create Hetzner account + token | T4 | 5 min |
| Create SMTP account + domain verify | T5 | 10 min |
| Smoke-test staging (+ Afo) | T9 | 10 min |
| Approve announcement + pick cutover window | T10 | 5 min |
| "Go" for cutover + post-cutover login test | T11 | 15 min |
| Approve hosted-plan cancellation (w/ billing owner) | T13 | async |
| Approve ops-handoff note | T14 | 5 min |
