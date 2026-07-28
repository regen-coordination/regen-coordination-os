# Discourse Hub → Hetzner Self-Host Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **⚠️ Ops-migration plan:** tasks are command→verify, not TDD. Steps marked **⛔ GATE** require operator (Luiz) action/approval before proceeding — never skip or simulate them. External actions (DNS flips, cancellation) are **draft-and-present** per org safety rules.

> ## 🗓️ HARD DEADLINE: 2026-07-30
> The hosted plan was cancelled on/around 2026-07-23. Per Discourse support, the site **stays fully online until July 30, then is decommissioned**. Until July 30 the hosted instance is our **live rollback**; after July 30 we still hold the full backup (zero data loss) but lose the side-by-side fallback. **DNS cutover must complete before July 30.**

**Goal:** Move `hub.regencoordination.xyz` (Discourse `2026.7.0`, 187 users / 936 posts / 160 topics) from Discourse managed hosting (~$100/mo) to a self-hosted official Docker install on Hetzner CX32 (~$8/mo), with zero data loss and near-zero user-visible disruption, before the July 30 decommission.

**Architecture:** Single Hetzner **CX23** (Ubuntu 24.04, 2 vCPU / 4 GB / 40 GB + 2 GB swap, €6.49/mo, nbg1) running the official `discourse_docker` all-in-one container (Postgres+Redis+Rails+nginx), Let's Encrypt TLS, transactional SMTP, Cloudflare DNS. Staging dry-run on `hub-staging.` subdomain, then cutover; hosted instance is the live rollback until July 30.

> **Server type history:** plan originally specified `cx32` → retired in Hetzner's CX renumbering; successor `cx33` → **no capacity in any datacenter worldwide** (entire new CX line capacity-starved, `fsn1` offering zero types); **`cx23` selected** — meets Discourse's official *recommended* production spec (2 cores / 4 GB) at **lower cost than planned**, with a 2 GB swap file for `launcher rebuild` headroom. Forum is 187 users / <200 MB, so 40 GB is ~200× site size.

> **⚠️ Shell gotcha (macOS zsh):** the `SSH="ssh ..."` then `$SSH '...'` pattern **fails under zsh** (no word-splitting of unquoted vars → tries to exec the whole string, exit 127). Use explicit full invocations: `ssh -i ~/.ssh/regen-hub root@$SERVER_IP '...'`.

**Tech Stack:** `discourse_docker` launcher · `hcloud` CLI · Cloudflare API · Discourse admin API · scp

**Spec:** `docs/superpowers/specs/2026-07-11-discourse-hetzner-migration-design.md`

---

## Confirmed current-state (Phase 0 inventory — committed 3de7eb9)

- **Version:** `2026.7.0` — pin the self-host image to this (restore target must ≥ source, same plugin set).
- **Plugins (14, all official):** discourse-ai, chat, discourse-github, discourse-cakeday, discourse-reactions, discourse-narrative-bot, discourse-presence, discourse-local-dates, discourse-details, checklist, footnote, poll, spoiler-alert, discourse-lazy-videos. All ship with the core monorepo at this version **except `discourse-lazy-videos`** → explicit clone line in `app.yml`.
- **Uploads:** on Discourse's managed CDN/S3 (`canada1.discourse-cdn.com/.../greenpill_hub/...`), NOT local. The DB-only self-serve backup excludes them. **Full backup with uploads comes only from the cancellation-triggered export** (see Task 2).
- **Email:** no SMTP settings in DB (host-managed) → must configure our own. `reply_by_email_enabled=true` (inbound, host-managed).
- **SSO:** Discord login enabled (`enable_discord_logins`, `discord_client_id=1290768492445827153`, secret redacted). `enforce_second_factor=staff`. Local logins on.
- **S3 uploads setting:** DB default = false (managed hosting abstracts storage).

## Migration decisions (from operator, 2026-07-23)

| Decision | Choice | Implication |
|----------|--------|-------------|
| Discord login | **Keep** | Need Discord app **client secret** in `app.yml` env (`DISCOURSE_DISCORD_SECRET`) — avoids locking out Discord-only members |
| discourse-ai | **Disable** | Don't enable AI features (no LLM keys/cost); plugin present but inert |
| Reply-by-email (inbound) | **Disable** | Set `reply_by_email_enabled=false`; outbound notifications unaffected |
| Uploads export | **Path A — cancellation export** | Full backup (DB+uploads) delivered by cancelling; no CDN mirror needed |

---

## Secrets handling (applies to every task)

All credentials live in `~/.secrets/regen-hub-migration.env` (chmod 600, **outside the repo**, never committed):

```bash
DISCOURSE_API_KEY=        # ✅ set — admin API key (validated)
DISCOURSE_API_USER=luizfernando
HCLOUD_TOKEN=             # ✅ set — Hetzner project token (validated)
CF_API_TOKEN=             # ⛔ NEEDED — Cloudflare token, Zone:DNS:Edit on regencoordination.xyz
DISCORD_SECRET=           # ⛔ NEEDED — Discord app client secret (to preserve Discord login)
SMTP_HOST=                # Task 6 — transactional SMTP provider
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

Load in any shell: `set -a; source ~/.secrets/regen-hub-migration.env; set +a`

Curl the hosted forum with a browser UA (Cloudflare 403s bots) + auth headers:
`-A "Mozilla/5.0 ... Chrome/126 Safari/537.36" -H "Api-Key: $DISCOURSE_API_KEY" -H "Api-Username: $DISCOURSE_API_USER"`

---

## Phase 0 — Discovery, cancel, full backup ✅ partially done

### Task 1: Instance inventory ✅ DONE (commit 3de7eb9)
Version, plugins, settings, SSO, scale captured in `docs/temp/hub-migration/`.

### Task 2: Cancel → download the full backup (with uploads)

- [ ] **Step 1 ⛔ GATE (Luiz): Confirm authorization** to cancel the `greenpill_hub` (Greenpill-owned) account — or give the Greenpill account owner a heads-up. Cancelling is the point of no return on that billing account.

- [ ] **Step 2 ⛔ GATE (Luiz): Cancel the plan.** Log in → admin → **Manage Account** → **Cancel**. Site stays online until **July 30**. Keep the confirmation email.

- [ ] **Step 3 ⛔ GATE (Luiz): Download the cancellation backup.** Within minutes, admin → **Backups** → a new backup appears that **includes uploads** (a `.tar.gz`, not the `.sql.gz`). Download to `~/Downloads`. Report the filename.

- [ ] **Step 4 (agent): Verify the payload**

```bash
FN2=<filename from Luiz>
ls -lh ~/Downloads/"$FN2"
file ~/Downloads/"$FN2"                 # expect gzip compressed data
tar tzf ~/Downloads/"$FN2" | grep -E 'uploads/|dump.sql' | head   # expect BOTH a dump AND uploads/ entries
shasum -a 256 ~/Downloads/"$FN2"
```

Expected: a `.tar.gz` containing `dump.sql(.gz)` **and** an `uploads/` tree. If it's `.sql.gz` / no `uploads/`, the wrong file was grabbed → re-download the cancellation backup (NOT the self-serve one). Record filename+size+sha256 in `docs/temp/hub-migration/inventory.md`; commit (`migration(0): full cancellation backup verified`).

---

## Phase 1 — Provision (needs CF_API_TOKEN)

### Task 3: Cloudflare + Hetzner readiness

- [ ] **Step 1 ⛔ GATE (Luiz):** Confirm `regencoordination.xyz` is on Cloudflare; create a token scoped **Zone:DNS:Edit** for that zone → `CF_API_TOKEN`. Confirm who can flip production DNS at cutover.

- [ ] **Step 2 (agent): Verify CF token + get zone id**

```bash
set -a; source ~/.secrets/regen-hub-migration.env; set +a
curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones?name=regencoordination.xyz" | jq '.result[0] | {id, name, status}'
```

Expected: zone object, `status: active`. Save `zone id` → `$ZID` in inventory.md. (Hetzner token already validated — `curl -s -H "Authorization: Bearer $HCLOUD_TOKEN" https://api.hetzner.cloud/v1/servers` returned 0 servers.)

### Task 4: Create the server ✅ DONE (commit 0e3f7ed)

**Result:** `regen-hub` @ **91.99.139.14** (IPv6 `2a01:4f8:1c1a:32b7::1`), cx23 / nbg1, Ubuntu 24.04.4, x86_64, Docker 29.6.2, fail2ban active, 3.7 Gi RAM + 2 Gi swap, 32 G free. SSH: `ssh -i ~/.ssh/regen-hub root@91.99.139.14`. Firewall `regen-hub-fw` (22/80/443) applied. Staging DNS **still pending `CF_API_TOKEN`**.

<details><summary>Original steps (superseded — kept for reference)</summary>

- [ ] **Step 1 (agent): SSH key + firewall + CX32**

```bash
ssh-keygen -t ed25519 -f ~/.ssh/regen-hub -N "" -C "regen-hub-migration"
brew install hcloud 2>/dev/null; hcloud context create regen-hub   # paste $HCLOUD_TOKEN
hcloud ssh-key create --name regen-hub --public-key-from-file ~/.ssh/regen-hub.pub
hcloud firewall create --name regen-hub-fw --rules-file <(echo '[
  {"direction":"in","protocol":"tcp","port":"22","source_ips":["0.0.0.0/0","::/0"]},
  {"direction":"in","protocol":"tcp","port":"80","source_ips":["0.0.0.0/0","::/0"]},
  {"direction":"in","protocol":"tcp","port":"443","source_ips":["0.0.0.0/0","::/0"]}]')
hcloud server create --name regen-hub --type cx32 --image ubuntu-24.04 \
  --location fsn1 --ssh-key regen-hub --firewall regen-hub-fw
hcloud server list -o columns=name,ipv4,status
```

Expected: server `running` with a public IPv4. Record as `$SERVER_IP` in inventory.md.

- [ ] **Step 2 (agent): Base setup + Docker**

```bash
SSH="ssh -o StrictHostKeyChecking=accept-new -i ~/.ssh/regen-hub root@$SERVER_IP"
$SSH 'apt-get update && apt-get -y upgrade && apt-get -y install fail2ban && \
      curl -fsSL https://get.docker.com | sh && timedatectl set-timezone UTC && docker --version'
```

Expected: Docker version prints, no errors.

- [ ] **Step 3 (agent): Staging DNS (unproxied, for Let's Encrypt)**

```bash
curl -s -X POST -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/$ZID/dns_records" \
  -d "{\"type\":\"A\",\"name\":\"hub-staging.regencoordination.xyz\",\"content\":\"$SERVER_IP\",\"ttl\":300,\"proxied\":false}"
dig +short hub-staging.regencoordination.xyz    # after ~1 min → $SERVER_IP
```

- [ ] **Step 4: Commit** inventory update (`migration(1): CX32 provisioned, staging DNS live`).

</details>

**Remaining from Task 4 — staging DNS (⛔ needs `CF_API_TOKEN`):**

```bash
set -a; source ~/.secrets/regen-hub-migration.env; set +a
ZID=$(curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones?name=regencoordination.xyz" | jq -r '.result[0].id')
curl -s -X POST -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/$ZID/dns_records" \
  -d '{"type":"A","name":"hub-staging.regencoordination.xyz","content":"91.99.139.14","ttl":300,"proxied":false}' \
  | jq '{success, name: .result.name, content: .result.content, proxied: .result.proxied}'
dig +short hub-staging.regencoordination.xyz   # → 91.99.139.14
```

**Manual alternative (no token needed):** in the Cloudflare dashboard → `regencoordination.xyz` → DNS → Add record: **A**, name `hub-staging`, IPv4 `91.99.139.14`, TTL 5 min, **Proxy status: DNS only (grey cloud)**. The grey cloud is mandatory — Let's Encrypt HTTP-01 validation fails behind Cloudflare's proxy.

---

## Phase 2 — Install + restore on staging

### Task 5: SMTP provider

- [ ] **Step 1 (agent): Recommend** — default **Brevo** free tier (300 emails/day, ample for 187 users) unless Luiz prefers another. Present a one-line recommendation.
- [ ] **Step 2 ⛔ GATE (Luiz, ~10 min):** Create account, verify sending domain `regencoordination.xyz`, paste SMTP creds → env. Provider supplies SPF+DKIM records.
- [ ] **Step 3 (agent): Add SPF/DKIM via Cloudflare API** (draft-and-present the exact records first, then POST to `/zones/$ZID/dns_records`). Verify provider dashboard shows the domain verified.

### Task 6: Install Discourse (staging hostname)

- [ ] **Step 1 (agent): Clone launcher, seed config**

```bash
$SSH 'git clone https://github.com/discourse/discourse_docker.git /var/discourse && \
      cd /var/discourse && cp samples/standalone.yml containers/app.yml'
```

- [ ] **Step 2 (agent): Edit `containers/app.yml`** on the server:
  - `DISCOURSE_HOSTNAME: hub-staging.regencoordination.xyz`
  - `DISCOURSE_DEVELOPER_EMAILS: luizfernandolfsg@gmail.com`
  - `DISCOURSE_SMTP_ADDRESS / _PORT / _USER_NAME / _PASSWORD` from env
  - `LETSENCRYPT_ACCOUNT_EMAIL: luizfernandolfsg@gmail.com` (keep both LE templates enabled)
  - Pin version: set `version: v2026.7.0` (or the exact tag matching source) so plugin set matches
  - Under `hooks.after_code`, add the one non-core plugin: `git clone https://github.com/discourse/discourse-lazy-videos.git` (the other 13 ship with core)
  - **Discord SSO:** add env `DISCOURSE_DISCORD_CLIENT_ID` + `DISCOURSE_DISCORD_SECRET` (from env) — or set via site settings post-restore. (discourse-ai stays disabled; reply-by-email will be disabled post-restore.)

- [ ] **Step 3 (agent): Bootstrap (~10 min)**

```bash
$SSH 'cd /var/discourse && ./launcher rebuild app'
curl -sI https://hub-staging.regencoordination.xyz | head -3
```

Expected: rebuild completes; curl returns `HTTP/2 200` with valid Let's Encrypt TLS.

- [ ] **Step 4: Commit** notes (`migration(2): staging Discourse bootstrapped`).

### Task 7: Restore the full backup

- [ ] **Step 1 (agent): Upload the backup**

```bash
scp -i ~/.ssh/regen-hub ~/Downloads/"$FN2" root@$SERVER_IP:/var/discourse/shared/standalone/backups/default/
```

- [ ] **Step 2 (agent): Restore (uploads included this time)**

```bash
$SSH "cd /var/discourse && ./launcher run app 'discourse enable_restore'"
$SSH "cd /var/discourse && ./launcher run app 'discourse restore $FN2'"
$SSH "cd /var/discourse && ./launcher run app 'discourse disable_restore'"
```

Expected: restore log ends `[SUCCESS]`; uploads land under `shared/standalone/uploads`. (Plugin mismatch = restore fails — that's why version+plugins are pinned in Task 6.)

- [ ] **Step 3 (agent): Remap old CDN URLs → local, then rebake**

```bash
$SSH "cd /var/discourse && ./launcher run app 'discourse remap //canada1.discourse-cdn.com/flex004/uploads/greenpill_hub //hub-staging.regencoordination.xyz/uploads/default'"
$SSH "cd /var/discourse && ./launcher run app 'rake posts:rebake'"
```

Expected: remap reports N rows changed; rebake completes (≈ minutes at 936 posts). Re-upload logo/favicon locally if they still point at the CDN.

- [ ] **Step 4 (agent): Apply post-restore settings** — disable reply-by-email; confirm Discord login configured; confirm discourse-ai features off:

```bash
$SSH "cd /var/discourse && ./launcher run app 'rails runner \"SiteSetting.reply_by_email_enabled=false\"'"
```

- [ ] **Step 5: Commit** notes (`migration(2): full backup restored + remapped on staging`).

### Task 8: Staging verification (dry-run sign-off)

- [ ] **Step 1 (agent): Automated checks**

```bash
S=https://hub-staging.regencoordination.xyz; UA="Mozilla/5.0 ... Chrome/126 Safari/537.36"
curl -s -A "$UA" $S/about.json | jq '.about.stats | {users_count, topics_count, posts_count}'  # ≈ 187/160/936
curl -s -A "$UA" $S/latest.json | jq '.topic_list.topics | length'                              # 30
curl -s -A "$UA" $S/t/1.json | jq '.title'                                                       # a real topic
```

- [ ] **Step 2 (agent): Verify images actually load** — pick 3 posts known to contain images; confirm their `<img>` src now points at the staging host (not `discourse-cdn.com`) and returns HTTP 200. This is the uploads-migration proof.

- [ ] **Step 3 (agent): Test email** — admin `/admin/email/test` → Luiz. Expect inbox delivery (not spam), passing SPF/DKIM.

- [ ] **Step 4 ⛔ GATE (Luiz + Afo, ~10 min): Human smoke-test on staging** — log in with existing password (proves credential migration), test **Discord login**, open topics, confirm images/avatars render, post a test reply. Afo joins (ops onboarding).

- [ ] **Step 5: Record results in inventory.md; commit** (`migration(2): staging verified — GO for cutover`).

---

## Phase 3 — Cutover (complete before July 30)

> ### ⚠️ Corrections learned during the staging build — DO NOT SKIP
>
> 1. **Do NOT `git clone discourse-lazy-videos`.** It already ships in the base image at this version; the explicit clone **fails the bootstrap** (`destination path already exists`, exit 128). All 14 source plugins are bundled in `discourse/base` — **no external plugin clones are needed at all**. The hook is now guarded with `test -d X || git clone`.
> 2. **The staging hostname is baked into post content.** Discourse's restore auto-remapped CDN URLs → `hub-staging.regencoordination.xyz`. Cutover therefore needs `discourse remap --force hub-staging.regencoordination.xyz hub.regencoordination.xyz` **followed by `rake posts:rebake`**. (Restore's own remap is broader than expected — it also caught `yyz2.discourse-cdn.com` and the `cdck-file-uploads-canada1.s3.amazonaws.com` bucket.)
> 3. **`disable_emails` is currently `yes`** (set deliberately, so staff mail doesn't retry against the placeholder SMTP and flood Sidekiq). **MUST be set back to `no` at cutover**, after real SMTP is configured — otherwise the live forum sends no notifications at all.
> 4. **`rails runner` must run as the `discourse` user**, not root: `docker exec -u discourse -w /var/www/discourse app bundle exec rails runner /shared/script.rb`. As root it fails with `ActiveRecord::NoDatabaseError`.
> 5. Rebake matters: post-restore, `raw` was clean but **351 posts still had CDN URLs in cooked HTML** until `rake posts:rebake` ran.
> 6. **`force_https` was restored as `true`** (inherited from hosted) and was set to **`false`** so staging works over plain HTTP. **MUST be set back to `true` at cutover once Let's Encrypt TLS is live** — otherwise the production forum serves insecure http and leaks session cookies. Pair it with re-enabling `disable_emails=no` (item 3) in the same step.
>
> **Cutover site-settings checklist (all four, after TLS + SMTP are live):**
> ```ruby
> SiteSetting.force_https = true          # was false for staging
> SiteSetting.disable_emails = "no"       # was "yes" while SMTP was a placeholder
> SiteSetting.reply_by_email_enabled = false   # stays false (no inbound mail on self-host)
> # then: discourse remap --force hub-staging.regencoordination.xyz hub.regencoordination.xyz
> #       rake posts:rebake
> ```

### Task 9: Pre-cutover prep (1–2 days before)

- [ ] **Step 1 (agent): Lower production DNS TTL + record rollback value**

```bash
RID=$(curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones/$ZID/dns_records?name=hub.regencoordination.xyz" | jq -r '.result[0].id')
curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones/$ZID/dns_records/$RID" | jq '.result | {type, content, proxied}'  # RECORD THIS = rollback value
curl -s -X PATCH -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/$ZID/dns_records/$RID" -d '{"ttl":300}'
```

- [ ] **Step 2 (agent): Draft the maintenance-window notice** (draft-and-present; posts only with approval) — short topic: ~1h read-only window, date/time.
- [ ] **Step 3 ⛔ GATE (Luiz): Approve notice + pick cutover window** (any low-traffic slot before July 30; forum averages <1 post/day). Post it.

### Task 10: Cutover execution (<1 hour)

- [ ] **Step 1 ⛔ GATE (Luiz "go") → (agent): Set hosted read-only**

```bash
B=https://hub.regencoordination.xyz; H=(-A "$UA" -H "Api-Key: $DISCOURSE_API_KEY" -H "Api-Username: $DISCOURSE_API_USER")
curl -s -X PUT "${H[@]}" $B/admin/site_settings/enable_readonly_mode -d "enable_readonly_mode=true" \
  || echo "Fallback: /admin → search 'read only' → enable (Luiz, 1 min)"
```

- [ ] **Step 2 (agent): Final DB-only backup → download → upload** to capture posts since the cancellation backup. Trigger self-serve backup (DB-only is fine — uploads already migrated and unchanged since cancellation), download, scp to server as `$FN3`.

- [ ] **Step 3 (agent): Restore `$FN3` on the server** (Task 7 Step 2 pattern). Re-run remap for the production host + old CDN, then rebake.

- [ ] **Step 4 (agent): Switch hostname to production + rebuild**

Edit `/var/discourse/containers/app.yml`: `DISCOURSE_HOSTNAME: hub.regencoordination.xyz`, then `$SSH 'cd /var/discourse && ./launcher rebuild app'`. (LE issuance for the prod hostname fails until DNS points here — expected; fixed in Step 6.)

- [ ] **Step 5 (agent): Flip DNS**

```bash
curl -s -X PATCH -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/$ZID/dns_records/$RID" \
  -d "{\"type\":\"A\",\"name\":\"hub.regencoordination.xyz\",\"content\":\"$SERVER_IP\",\"proxied\":false,\"ttl\":300}"
```

- [ ] **Step 6 (agent): Re-issue TLS once DNS resolves**

```bash
until [ "$(dig +short hub.regencoordination.xyz)" = "$SERVER_IP" ]; do sleep 15; done
$SSH 'cd /var/discourse && ./launcher rebuild app'
curl -sI https://hub.regencoordination.xyz | head -3    # HTTP/2 200, valid cert
```

- [ ] **Step 7 (agent): Final remap + verify** — remap `hub-staging` → `hub`, re-run the Task 8 checks against production, confirm images load. **⛔ GATE (Luiz):** log in, post a real reply, confirm notification email arrives. Disable read-only on the new instance if it carried over.

- [ ] **Step 8: Commit** (`migration(3): cutover complete — hub live on Hetzner`).

**Rollback (any point in Task 10, valid until July 30):** PATCH the DNS record back to the recorded hosted value (Step 1) + disable read-only on hosted. Zero data loss (hosted was read-only during the switch).

---

## Phase 4 — Stabilize + hand off

> Note: the hosted plan is already cancelled and **auto-decommissions July 30** — there is no separate "cancel plan" step. The ~$92/mo saving is realized automatically at decommission.

### Task 11: Backups + monitoring (within 48h of cutover, well before July 30)

- [ ] **Step 1 (agent): Automated daily backups** — site settings `backup_frequency=1`, `maximum_backups=14`. Offsite: create a **Cloudflare R2** bucket `regen-hub-backups` (free 10 GB, S3-compatible), set `backup_location=s3` + R2 creds in app.yml, rebuild.
- [ ] **Step 2 (agent): Hetzner snapshots** — `hcloud server enable-backup regen-hub` (7 rolling, ≈ +$1.5/mo).
- [ ] **Step 3 (agent): Verify a backup lands in R2**; document exact restore commands in the runbook.
- [ ] **Step 4 ⛔ GATE (Luiz): Uptime monitoring** — UptimeRobot (free) on `https://hub.regencoordination.xyz/srv/status`, alert Luiz + Afo.

### Task 12: Runbook + repo integration

**Files:** Create `docs/runbooks/discourse-hub-ops.md`; modify `federation.yaml`, `TOOLS.md`, `HEARTBEAT.md`, `data/finances.yaml`.

- [ ] **Step 1 (agent): Write `docs/runbooks/discourse-hub-ops.md`** — server details (IP, provider, ops owners Afo/Matty), monthly upgrade (`cd /var/discourse && git pull && ./launcher rebuild app`), backup locations (R2 + Hetzner) + restore procedure (exact commands), TLS auto-renewal check, incident basics (disk full → `./launcher cleanup`; container down → `./launcher start app`), escalation contacts.
- [ ] **Step 2 (agent): `federation.yaml`** forum entry → add `hosting: self-hosted (hetzner-cx32)`; API URL unchanged.
- [ ] **Step 3 (agent): `TOOLS.md`** — SSH alias, server IP, R2 bucket, monitoring link. **No secrets.**
- [ ] **Step 4 (agent): `HEARTBEAT.md`** — mark done: "Decide on owning hub self-hosting (budget line 7)" + "Investigate Discourse self-hosting on VPS"; add recurring "Monthly: Discourse `launcher rebuild` security update (owner: Afo/Matty)".
- [ ] **Step 5 (agent): `data/finances.yaml`** budget line 7: $250 placeholder → ~$10/mo actual; run `npm run generate:schemas && npm run validate:schemas`.
- [ ] **Step 6: Memory + commit** — append to `memory/2026-MM-DD.md`; `git add` the specific files; `git commit -m "migration(4): hub self-host complete — runbook, federation, finances updated"`.
- [ ] **Step 7 ⛔ GATE (Luiz): Ops handoff to Afo + Matty** — draft-and-present a handoff note linking the runbook; add their SSH keys to the server + Hetzner project access.

---

## Task dependency graph

```
T1 ✅ ─▶ T2 (cancel+full backup) ─────────────────────────┐
T3 (CF token) ─▶ T4 (provision) ─▶ T5 (SMTP) ─▶ T6 (install) ─▶ T7 (restore) ─▶ T8 (verify) ─▶ T9 (prep) ─▶ T10 (CUTOVER, <Jul30) ─▶ T11 ─▶ T12
```

T2 and T3–T6 run in parallel (T7 restore needs both the backup AND a bootstrapped instance). **T10 is the only downtime-bearing task and MUST land before July 30.**

## Operator gate summary (what Luiz must personally do) — ⏰ all before July 30

| Gate | Task | Effort |
|------|------|--------|
| Confirm authorization to cancel (Greenpill account) | T2.1 | async |
| Cancel plan + download full backup | T2.2–2.3 | 10 min |
| Cloudflare token + confirm DNS control | T3.1 | 5 min |
| Discord client secret (to keep Discord login) | T6.2 | 3 min |
| SMTP account + domain verify | T5.2 | 10 min |
| Smoke-test staging (+ Afo) | T8.4 | 10 min |
| Approve notice + pick cutover window | T9.3 | 5 min |
| "Go" for cutover + post-cutover login test | T10 | 15 min |
| Uptime monitoring account | T11.4 | 5 min |
| Approve ops-handoff note | T12.7 | 5 min |
