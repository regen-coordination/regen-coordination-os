# Runbook — hub.regencoordination.xyz (self-hosted Discourse)

**Status:** live since 2026-07-29 · **Ops owners:** Afo, Matty · **Migrated by:** Luiz

Migrated off Discourse managed hosting (~$100/mo) to a self-hosted Hetzner box (~€7.79/mo incl. snapshots). Same domain, same accounts, same content.

---

## 1. What and where

| | |
|---|---|
| **URL** | https://hub.regencoordination.xyz |
| **Server** | Hetzner Cloud `regen-hub`, id `155961215` |
| **IP** | `91.99.139.14` (IPv6 `2a01:4f8:1c1a:32b7::1`) |
| **Spec** | cx23 — 2 vCPU / 4 GB RAM / 40 GB NVMe + 2 GB swap, nbg1 (Nuremberg) |
| **OS** | Ubuntu 24.04.4 LTS · Docker 29.6.2 · fail2ban |
| **Discourse** | official `discourse_docker` all-in-one (Postgres + Redis + Rails + nginx) in `/var/discourse` |
| **Cost** | server €6.49/mo + Hetzner snapshots ~€1.30/mo. Brevo email: free tier. |
| **DNS** | Cloudflare (`regencoordination.xyz`); `hub` = **A → 91.99.139.14, grey cloud (unproxied)** |
| **TLS** | Let's Encrypt, auto-renewing. Issued 2026-07-29, expires 2026-10-27. |
| **Email** | Brevo SMTP relay (`smtp-relay.brevo.com:587`), From `noreply@regencoordination.xyz` |

### Access
```bash
ssh -i ~/.ssh/regen-hub root@91.99.139.14
```
Credentials (Cloudflare token, Hetzner token, Brevo SMTP) live in `~/.secrets/regen-hub-migration.env` on Luiz's machine — **not in this repo**.

> ⚠️ **The grey cloud on the `hub` DNS record is deliberate.** Turning on Cloudflare's proxy (orange) breaks Let's Encrypt HTTP-01 renewal. Leave it grey unless you also switch to a DNS-01 challenge.

---

## 2. Monthly maintenance (~15 min)

Discourse ships security fixes regularly. Roughly monthly:

```bash
ssh -i ~/.ssh/regen-hub root@91.99.139.14
cd /var/discourse
git pull
./launcher rebuild app     # ~6–10 min; site is down during the rebuild
```

Then confirm it came back:
```bash
curl -sI https://hub.regencoordination.xyz | head -1     # expect HTTP/2 200
```

**Note on memory:** the box has 4 GB + 2 GB swap. `rebuild` builds a new container alongside the running one; the swap file is what keeps that safe. Do not remove `/swapfile`.

---

## 3. Backups

Two independent layers:

| Layer | What | Where | Retention |
|---|---|---|---|
| **Discourse** | DB + uploads (`backup_with_uploads=true`) | on-server `/var/discourse/shared/standalone/backups/default/` | 7 daily, 03:30 UTC |
| **Hetzner** | whole-server snapshot | Hetzner (off-server) | 7 rolling, window 10–14 UTC |

⚠️ **Gap:** Discourse backups are stored *on the same server*. If the box is lost, only the Hetzner snapshots survive. **Recommended improvement:** set `backup_location=s3` pointing at a Cloudflare R2 bucket (free ≤10 GB) for true offsite copies. Not yet configured.

### Download a backup
Admin UI → `/admin/backups` → Download. Or:
```bash
ls -lh /var/discourse/shared/standalone/backups/default/
```

### Restore a backup
```bash
docker exec app bash -c "discourse enable_restore"
docker exec app bash -c "discourse restore <FILENAME>.tar.gz"
docker exec app bash -c "discourse disable_restore"
```
The restore auto-remaps upload URLs. Afterwards, rebake so cooked HTML picks them up:
```bash
docker exec -u discourse -w /var/www/discourse app bundle exec rake posts:rebake
```

---

## 4. Running commands against the app

**Rails console / scripts must run as the `discourse` user** — as root you get `ActiveRecord::NoDatabaseError`:

```bash
# one-liner
docker exec -u discourse -w /var/www/discourse app bundle exec rails runner 'puts SiteSetting.title'

# script (put it in the shared volume so the container can see it)
cat > /var/discourse/shared/standalone/x.rb <<'EOF'
puts Post.count
EOF
docker exec -u discourse -w /var/www/discourse app bundle exec rails runner /shared/x.rb
```

---

## 4b. Watchdog (auto-recovery)

`/usr/local/bin/hub-watchdog.sh`, run by cron every 5 minutes.

It checks **HTTPS over loopback** with correct SNI:
```bash
curl --resolve hub.regencoordination.xyz:443:127.0.0.1 https://hub.regencoordination.xyz/srv/status
```
Any **2xx or 3xx** counts as healthy. Only after **3 consecutive failures** (~15 min) does it dump diagnostics — memory, disk, load, container status, `dmesg` OOM lines, last 40 lines of container log — to **`/var/log/hub-watchdog.log`** and run `./launcher restart app`. A counter lives at `/var/run/hub-watchdog.fails` and resets on recovery.

**If the hub misbehaves, read `/var/log/hub-watchdog.log` first** — it's the only place failure-time state is captured.

> ⚠️ **Bug to not repeat (2026-07-30 → 07-31).** The first version checked plain `http://127.0.0.1/srv/status` and treated anything ≠ 200 as unhealthy. With `force_https=true`, Discourse correctly answers **301**, so the watchdog read healthy redirects as failures and restarted the container **283 times over ~24 hours** (roughly 30–60s of downtime every 5 minutes). Two lessons baked into the current version: **accept 3xx**, and **require consecutive failures** before restarting. The buggy log is preserved at `/var/log/hub-watchdog.log.buggy-20260731`.

---

## 4c. Incident log

### 2026-07-30 — ~2h outage, root cause UNKNOWN

**Symptoms:** site stopped serving (`ECONNREFUSED` on 443 from outside; kernel alive and answering TCP, CPU active 5–11%, but no web service). Began sometime between 10:44 and 12:45 UTC. Last known-good: Hetzner snapshot at 10:44 UTC; Afo browsing at 10:30.

**Resolution:** rebuilt the server from the **2026-07-29 13:39** snapshot (the post-cutover verified-good image). Restoring the *10:44 today* snapshot first did **not** fix it — suggesting that snapshot already captured the broken state.

**Cost:** no data loss (no posts since 2026-07-20). Only regression was `backup_frequency`/`maximum_backups` reverting to defaults, since those were set after the restored snapshot — re-applied.

**Root cause: not determined.** Today's logs were destroyed by the rebuild. Leading hypotheses, none confirmed: memory exhaustion/swap thrashing on the 4 GB box, or a wedged Docker/container state. The watchdog exists specifically to capture this next time.

**Process lessons (important):**
- **Do not diagnose from a filtered network.** The coworking wifi blocked outbound port 22 *and* dropped traffic to the server, making a service outage look like a totally dead machine. Three power-cycles were issued on that false signal, which likely made recovery harder. **Verify from an independent vantage point before touching production** — an external fetch, a phone hotspot on cellular, or a VPN.
- `nc -z -w 5 github.com 22` is a quick test of whether the current network permits SSH at all.
- Hetzner reporting `status=running` means the *VM* is running — it says nothing about whether the OS or services are healthy.

---

## 5. Incidents

| Symptom | Fix |
|---|---|
| Site down / 502 | `cd /var/discourse && ./launcher start app` — if that fails, `./launcher rebuild app` |
| Disk full | `./launcher cleanup` (removes old Docker images); check `du -sh /var/discourse/shared/standalone/*` |
| Site hangs on the loading spinner | Usually a scheme mismatch — confirm `SiteSetting.force_https` matches how it's actually served |
| TLS expired | `./launcher rebuild app` re-runs Let's Encrypt. Confirm DNS is **grey cloud**. |
| Email not arriving | See §6 |
| Rebuild dies mid-way (OOM) | Confirm swap is on: `swapon --show`. If missing, recreate (see §7). |

Logs:
```bash
docker logs app --tail 100
tail -100 /var/discourse/shared/standalone/log/rails/production.log
```
Admin error log: `https://hub.regencoordination.xyz/logs`

---

## 6. Email

Sent via **Brevo** SMTP relay. The domain `regencoordination.xyz` is authenticated in Brevo, and all seven DNS records are in Cloudflare.

**Auth stack (all verified PASS on 2026-07-29):**
- SPF: `v=spf1 include:spf.efwd.registrar-servers.com include:spf.brevo.com ~all`
- DKIM: `brevo1._domainkey` / `brevo2._domainkey` → `b1/b2.regencoordination-xyz.dkim.brevo.com`
- DMARC: `_dmarc` → `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com`
- Brand: `mail`, `img.mail`, `r.mail` CNAMEs → `*.brand.brevosend.com`
- Verification: TXT `brevo-code:df886e...`

> **Hard-won lesson:** Google/Yahoo's 2024 bulk-sender rules mean **a DMARC record is mandatory** and DKIM must *align with the From domain*. Without both, Gmail silently discards the mail — no bounce, not even a spam-folder copy. If mail stops arriving, check these first.

**Diagnose:**
```bash
# send a test
docker exec -u discourse -w /var/www/discourse app bundle exec rails runner \
  'm=TestMailer.send_test("you@example.com"); Email::Sender.new(m,:test_message).send; puts "sent"'
```
Then check Brevo → **Transactional → Logs**. `Sent` immediately followed by `Error` means the receiving server rejected it — almost always an auth/alignment problem.

Free tier: 300 emails/day. Current usage is far below that (~189 users, low traffic).

---

## 7. Reference: key configuration

`/var/discourse/containers/app.yml` — hostname, SMTP, Let's Encrypt email, plugin hooks. Backups of prior versions: `app.yml.bak-pre-ssl`, `app.yml.bak-precutover`.

**Plugins:** all 14 in use ship with the Discourse base image. **Do not add explicit `git clone` lines for them** — cloning `discourse-lazy-videos` breaks the bootstrap because it already exists.

**Production site settings that matter:**
```ruby
SiteSetting.force_https = true
SiteSetting.disable_emails = "no"
SiteSetting.reply_by_email_enabled = false   # no inbound mail on self-host
SiteSetting.notification_email = "noreply@regencoordination.xyz"
```

**Recreate swap** (if ever lost):
```bash
fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo "/swapfile none swap sw 0 0" >> /etc/fstab
```

---

## 8. Open items

- [ ] **Offsite backups** → Cloudflare R2 (`backup_location=s3`). Biggest remaining risk.
- [ ] **Uptime monitoring** → e.g. UptimeRobot on `https://hub.regencoordination.xyz/srv/status`, alerting Afo + Luiz.
- [ ] **Account access** — Hetzner and Cloudflare are reachable only via Luiz's API tokens/logins. Add Afo and Matty to both so ops ownership is real.
- [ ] **Domain renewal** — `regencoordination.xyz` expires **2026-10-10** (Namecheap, owner: Monty). Confirm auto-renew. *If this lapses, the hub goes down regardless of hosting.*
