# Hosted Discourse Inventory — hub.regencoordination.xyz

Phase 0 discovery for the migration off Discourse hosted → self-hosted server.
Read-only against the live forum (except the standard backup trigger in Task 2).
Gathered: 2026-07-23. Base URL: `https://hub.regencoordination.xyz`.

Raw JSON alongside this file: `plugins.json`, `themes.json`, `nondefault-settings.json`
(the settings file has all secret-ish values REDACTED before it ever hit disk).

---

## Discourse version

- **Installed:** `Discourse 2026.7.0-latest`
- git sha: `0ba2b5a76b38f8ec61004b14f63b3105bc1b3ba4`
- Source: HTML `<meta name="generator">` tag on `/`. `admin/dashboard.json` did NOT
  expose a `version` block for this API user (only `updated_at`), so the meta tag
  is the authoritative signal.
- Implication: pin the self-host `Discourse_hub` image to this same version (or the
  closest stable `tests-passed`) so the bundled-plugin set matches (see Plugins).

## Basic scale (from `about.json` → `about.stats`)

| Metric | Count |
|--------|-------|
| Users  | 187 |
| Topics | 160 |
| Posts  | 936 |
| Likes  | 1013 |
| Chat messages | 13 (14 channels, 4 chat users) |

Small, low-traffic forum. Active users 30d ≈ 19. Recent posting is light
(13 posts / 30d). Consistent with the RC wind-down.

## Plugins

**All ENABLED plugins are OFFICIAL Discourse plugins (`is_official: true`). None are
third-party / community plugins.** In this Discourse version most of these live in
the core monorepo (`discourse/discourse/plugins/*`), so a same-version self-host
image inherits them automatically; only genuinely standalone repos need explicit
declaration in `app.yml`.

Enabled (14):

| Plugin | Version | Official | Ships in core repo? (per plugin `url`) |
|--------|---------|----------|-----------------------------------------|
| discourse-ai | 0.0.1 | yes | core (`/plugins/discourse-ai`) — needs LLM API keys configured |
| chat | 0.4 | yes | core |
| discourse-github | 0.3 | yes | core |
| discourse-cakeday | 0.3 | yes | core |
| discourse-reactions | 0.5 | yes | core |
| discourse-narrative-bot | 1.0 | yes | core |
| discourse-presence | 2.0 | yes | core |
| discourse-local-dates | 0.1 | yes | url null (bundled core) |
| discourse-details | 0.4 | yes | core |
| checklist | 1.0 | yes | core |
| footnote | 1.0 | yes | core |
| poll | 1.0 | yes | core |
| spoiler-alert | 1.1.0 | yes | core |
| **discourse-lazy-videos** | 0.1 | yes | **STANDALONE repo** (`github.com/discourse/discourse-lazy-videos`) — most likely needs an explicit `app.yml` clone line |

Action for new `app.yml`: pin the same Discourse version so the core-bundled set
matches, then verify each of the 14 is present after boot. Explicitly declare any
that are NOT bundled in your chosen image — `discourse-lazy-videos` is the one flagged
as a standalone repo; the rest resolve to the core `/plugins/*` tree.

Notable disabled plugins (present but `enabled:false`, NOT needed): discourse-adplugin,
discourse-assign, discourse-calendar, discourse-data-explorer, discourse-solved,
discourse-subscriptions, discourse-oauth2-basic, discourse-openid-connect, and ~24
others (full list in `plugins.json`). Do not carry these over unless re-enabled.

## Themes

5 themes installed (`themes.json`). Default active theme is **`01`**. Also present:
`Brand Header`, `Easy Responsive Footer`, `Foundation`, `Horizon`. None are marked
`user_selectable`. Themes come across in the backup restore, but custom theme
components/remote themes may need re-import; verify after restore.

Custom fonts set via site settings: `base_font = nunito`, `heading_font = noto_sans_jp`.

## Email / SMTP

- **No `smtp_*` settings appear in site settings** → outbound SMTP is configured at
  the hosting/container level (Discourse hosted manages it), NOT in the DB. This means
  the new server needs its OWN SMTP provider configured in `app.yml`
  (`DISCOURSE_SMTP_ADDRESS`, `_PORT`, `_USER_NAME`, `_PASSWORD`). **Pick an SMTP
  provider as part of migration.**
- Non-default mail-related site settings present:
  - `reply_by_email_enabled = true` → **inbound** email replies are ON. Currently
    handled by the host's inbound mail pipeline. Self-host will need an inbound email
    setup (POP3 polling or mail receiver, e.g. via the provider's inbound routing)
    to preserve this. If you don't provision inbound mail, disable this to avoid
    broken reply handling.
  - `email_subject = %{site_name}: %{topic_title}`
  - `max_tags_per_email_subject = 7`
- `notification_email` is at default (not overridden) — set an appropriate
  `DISCOURSE_DEVELOPER_EMAILS` / notification sender on the new box.

## SSO / social login

- **`enable_discord_logins = true`** — Discord OAuth is the ONLY social/SSO provider
  enabled. `discord_client_id = 1290768492445827153` (public client id, fine to note).
  `discord_secret` is set (REDACTED). To preserve Discord login, port the client id
  and re-supply the secret on the new server, and update the OAuth redirect URI if
  the hostname changes.
- No Google/GitHub/SAML/OIDC/Apple/Microsoft logins enabled.
- `enforce_second_factor = staff` (2FA required for staff) — carry over.
- Local logins are at default (enabled).

## S3 uploads

- **`enable_s3_uploads` is at DEFAULT = FALSE.** Uploads are stored locally, so they
  are captured inside the `with_uploads=true` backup — no separate S3 bucket to
  migrate. Good: the backup tarball is the complete payload.
- Note: current logo/favicon/large_icon URLs point at the hosted managed CDN
  (`cdck-file-uploads-canada1.s3...amazonaws.com/.../greenpill_hub/...`). These are
  absolute external URLs baked into site settings; after restore, re-upload the
  logo/favicon locally (or the CDN links may rot once off hosted).
- `purge_deleted_uploads_grace_period_days = 180` (non-default, informational).

## Uploads / backup size signal (Task 1c)

Pre-existing backups on the hosted instance (`admin/backups.json`), newest first:

| Filename | Size | Modified |
|----------|------|----------|
| greenpill-network-2024-12-25-223029-v20241212113000.tar.gz | 54.77 MB | 2024-12-25 |
| greenpill-network-2024-11-27-222102-v20241120182858.tar.gz | 49.39 MB | 2024-11-27 |
| greenpill-network-2024-09-13-184606-v20240909121255.sql.gz | 24.94 MB | 2024-09-13 |

- **Size signal: ~55 MB** for a full with-uploads backup (as of the last one, Dec 2024).
  Well under the 2 GB ceiling. The fresh backup (Task 2) will be similar-order.
- Note: backup filename prefix is `greenpill-network` / `greenpill_hub` — the instance
  was previously the Greenpill Network hub before becoming Regen Coordination Hub.

## Other notable non-default settings (context for new server)

- discourse-ai active: `ai_bot_enabled_llms = -4`, `ai_spam_detection_enabled = true`,
  `ai_translation_backfill_hourly_rate = 100` → new server needs LLM provider API keys
  configured for AI features to work.
- Content localization ON: `content_localization_enabled = true`, supported locales
  `pt|fr|es`, allowed groups `1|2|44`.
- `enable_discourse_github_plugin = true`, `cakeday_enabled = true`.
- Custom `allowed_iframes` (Google Maps/Calendar, OpenStreetMap, CodePen, Instagram,
  discobot certificate) — carry over.
- Full non-default set (65 settings) in `nondefault-settings.json`.

---

## Backup payload (Task 2) — STATUS: BLOCKED (manual download required)

- **Backup triggered successfully** (`POST /admin/backups.json with_uploads=true` →
  `{"success":"OK"}`). Fresh backup produced server-side:
  - **Filename:** `regen-coordination-hub-2026-07-23-130030-v20260721080424.sql.gz`
  - **Size:** 57,205,436 bytes (~54.6 MB), created 2026-07-23T13:00:37Z
  - sha256: not yet computable (file not downloaded — see below)
- **Scripted download FAILED / BLOCKED.** The backup download in this Discourse
  version (`2026.7.0-latest`) requires a one-time `token`, and the token-minting
  routes are not API-accessible here:
  - `GET /admin/backups/<FN>` (no token) → HTTP 400 `param is missing: token`
  - `PUT|POST /admin/backups/<FN>/download` and `.../download.json` → HTTP 404
  - `PUT /admin/email-backup-token.json` → HTTP 404
  - The token is delivered by EMAIL (one-time link), by design; it cannot be minted
    from an API-key session. This is the anticipated fallback, not a Cloudflare 403.
- **OPERATOR ACTION REQUIRED:** log into `https://hub.regencoordination.xyz/admin/backups`
  in a browser as an admin and click Download on
  `regen-coordination-hub-2026-07-23-130030-v20260721080424.sql.gz`
  (this emails/opens the tokenized link). Save it, then record its sha256 here.

### ⚠️ CRITICAL migration finding: uploads are NOT in the backup

Despite requesting `with_uploads=true`, the backup is a **`.sql.gz` (DB-only)**, not a
`.tar.gz`. Reason: on the CDCK-managed hosting, **uploads live on an external S3/CDN**
(`canada1.discourse-cdn.com` / `cdck-file-uploads-canada1...amazonaws.com`, path
`flex004/uploads/greenpill_hub/...`) — NOT on local disk. So `with_uploads` had nothing
local to bundle. (This is why `enable_s3_uploads` reads default-false in site settings
yet assets are on S3: the host uses a global/env-level S3 config, not the site setting.)

Implications for migration:
- The DB backup alone will restore posts/users/settings but leave **image/attachment
  links pointing at the hosted CDN**, which will rot once off hosted.
- The uploads must be pulled SEPARATELY (e.g. mirror the `greenpill_hub` upload tree
  from the CDN, or request an uploads export from CDCK support before hosting ends),
  then rebaked/rehosted on the self-host after restore.
- Confirm with the hosting provider whether a true full-uploads export is available;
  the standard admin backup will not include them.

---

## Server (Phase 1)

Provisioned 2026-07-27. Hetzner Cloud, x86.

| Field | Value |
|---|---|
| Server name | `regen-hub` |
| Hetzner server ID | 155961215 |
| Type | **cx23** (2 vCPU / 4 GB RAM / 40 GB disk, x86, €6.49/mo) |
| Location | `nbg1` (Nuremberg, DE) |
| **Public IPv4** | **91.99.139.14** |
| Public IPv6 | `2a01:4f8:1c1a:32b7::1` (network `2a01:4f8:1c1a:32b7::/64`) |
| OS | Ubuntu 24.04.4 LTS (kernel 6.8.0-117-generic) |
| Architecture | `x86_64` (verified via `uname -m` — required for Discourse containers) |
| Docker | 29.6.2 (build dfc4efb) + Compose v5.3.1, service active + enabled |
| RAM verified | `free -h` → 3.7 Gi total |
| Disk verified | `df -h /` → 38 G total, 4.1 G used, 32 G available (12%) |
| Swap | 2 GB `/swapfile`, persistent via `/etc/fstab`, `vm.swappiness=10` |
| Timezone | UTC |
| fail2ban | active + enabled |
| SSH key | `~/.ssh/regen-hub` (ed25519, fingerprint `SHA256:FrRuDOK3LwEcWXYJofY89G9mDOq0RyNWz+qdRgBaiwI`) |
| Hetzner SSH key | `regen-hub` (ID 115917758) |
| Firewall | `regen-hub-fw` (ID 11378807) — inbound TCP 22/80/443 from `0.0.0.0/0` + `::/0`; confirmed applied to server |

Access: `ssh -i ~/.ssh/regen-hub root@91.99.139.14`

### Staging DNS — PENDING (blocked on operator)

The `hub-staging.regencoordination.xyz` A record was **not** created: `CF_API_TOKEN` is
absent from `~/.secrets/regen-hub-migration.env`. Blocked-pending-operator.

When the token is supplied (or the record is made by hand), it must be an **A record to
`91.99.139.14`, TTL 300, and UNPROXIED** (grey cloud). Unproxied is required so Let's
Encrypt HTTP-01 validation succeeds during Discourse setup.

### Note on server type (why this differs from the plan doc)

The plan specified `cx32`. That type no longer exists — Hetzner renumbered the shared-vCPU
CX line, and the current generation is `cx23 / cx33 / cx43 / cx53`. `cx33`
(4 vCPU / 8 GB / 80 GB, €8.99/mo) was selected as the direct successor and an exact match
for the plan's intended spec, but it had **no capacity in any Hetzner datacenter worldwide**
at provisioning time — five create attempts across `fsn1`/`nbg1`/`hel1` all returned
`resource_unavailable`, and `/v1/datacenters` confirmed the entire new CX generation was
unplaceable (`fsn1` was offering zero server types of any kind).

`cx23` was chosen instead: it meets Discourse's **recommended 4 GB production spec**
(official minimum is 2 GB), and at 187 users / ~1 post per day / <200 MB of content the
40 GB disk is roughly 200x the site size. It is also cheaper than planned (€6.49 vs €8.99).
A 2 GB swap file was added to give `./launcher rebuild app` headroom, since a rebuild
briefly runs the new container alongside the running one.

`nbg1` was the only datacenter with `cx23` capacity.

---

## Phase 2 — staging install + restore

Performed 2026-07-27 22:00–22:50 UTC on `91.99.139.14` (cx23, nbg1). Staging install is
deliberately **HTTP-only, no real SMTP** — DNS and mail provider are not yet available, and
the point of this pass was to surface restore failures early.

### Discourse version installed

| | |
|---|---|
| Base image | `discourse/base:2.0.20260726-0220` |
| Discourse version | **`2026.7.0-latest`** (`lib/version.rb` → `STRING`) |
| Source version | `2026.7.0-latest` |
| Match | ✅ exact — not older than source, so no downgrade risk on restore |

### `containers/app.yml`

Standard `postgres` + `redis` + `web` + `web.ratelimited` templates. **No `ssl` /
`letsencrypt` templates** — intentional, since `hub-staging.regencoordination.xyz` has no A
record yet. `UNICORN_WORKERS: 3`, `db_shared_buffers: 1024MB`. SMTP is a placeholder
(`smtp.placeholder.invalid`).

All HTTP verification below was done by IP with an explicit `Host:` header, e.g.
`curl -H "Host: hub-staging.regencoordination.xyz" http://91.99.139.14/...`.

### Bootstrap

**First attempt FAILED** (exit 128, ~2 min in):

```
cd /var/www/discourse/plugins && git clone --depth 1 https://github.com/discourse/discourse-lazy-videos.git
fatal: destination path 'discourse-lazy-videos' already exists and is not an empty directory.
```

**Finding — the plan's premise about `discourse-lazy-videos` was wrong.** At this version it
*does* ship in the base image; the explicit clone is not needed and actively breaks the
bootstrap. Verified directly:

```
docker run --rm --entrypoint /bin/bash discourse/base:2.0.20260726-0220 -c "ls /var/www/discourse/plugins"
→ 44 plugins, including discourse-lazy-videos, footnote, poll, spoiler-alert
```

Cross-checked against `plugins.json`: **all 14 enabled source plugins**
(`discourse-ai`, `discourse-cakeday`, `chat`, `checklist`, `discourse-details`, `footnote`,
`discourse-github`, `discourse-lazy-videos`, `discourse-local-dates`,
`discourse-narrative-bot`, `poll`, `discourse-presence`, `discourse-reactions`,
`spoiler-alert`) are present in the base image. **No external plugin clones are required for
this site.** The `after_code` hook now only guards `docker_manager`:

```yaml
- test -d docker_manager || git clone --depth 1 https://github.com/discourse/docker_manager.git
- test -d discourse-lazy-videos || git clone --depth 1 https://github.com/discourse/discourse-lazy-videos.git
```

**Second attempt SUCCEEDED** — ~6 min (22:12–22:18 UTC; base image was already pulled).
Peak RAM ~1.9 GB of 3.7 GB, swap usage peaked at ~1 MB. **No memory pressure** — the 2 GB
swap file was never meaningfully touched. `docker ps` → `app  Up`. `GET /` → **200**.

### Restore

```
docker exec app discourse enable_restore
docker exec app discourse restore regen-coordination-hub-2026-07-27-214859-v20260723013754.tar.gz
docker exec app discourse disable_restore
```

Backup staged to `/var/discourse/shared/standalone/backups/default/`, `chown 1000:1000`;
sha256 re-verified after copy = `282f9aa7c9b23abf4fbaad65e6be93d9c95d39d7135b08d4a2dd05c42909329c`
(matches source). The original at `/root/migration/` was left untouched.

**SUCCEEDED** in ~2 min (22:26–22:28 UTC). Log ends:

```
Restoring uploads, this may take a while...
Optimizing site icons...
Executing the after_restore_hook...
Marking restore as finished...
Finished!
[SUCCESS]
Restore done.
```

No errors or warnings of substance.

### CDN remap

**Discourse's restore did the CDN remap automatically** — this was not anticipated by the
plan. The restore log shows it rewriting, on its own:

```
Remapping 'https://canada1.discourse-cdn.com/flex004/' → 'https://hub-staging.regencoordination.xyz/'
Remapping 'canada1.discourse-cdn.com'                  → 'hub-staging.regencoordination.xyz'
Remapping 'https://yyz2.discourse-cdn.com/flex004/'    → 'https://hub-staging.regencoordination.xyz/'
Remapping 'yyz2.discourse-cdn.com'                     → 'hub-staging.regencoordination.xyz'
Remapping '/uploads/greenpill_hub/'                    → '/uploads/default/'
Remapping (regex) '//cdck-file-uploads-canada1.s3.amazonaws.com/flex004/' → '/'
```

Note it also caught **`yyz2.discourse-cdn.com`** and the **`cdck-file-uploads-canada1.s3`**
bucket, neither of which was in the plan.

The explicit remap was then run anyway, in the `--regex` form (with `--force` to skip the
interactive confirm):

```
discourse remap --regex --force "//canada1.discourse-cdn.com/flex004/uploads/greenpill_hub" \
                               "//hub-staging.regencoordination.xyz/uploads/default"
→ "Remapping tables on default... Done"  —  0 rows changed (no table/count lines emitted)
```

0 changed is the expected and correct outcome: the restore had already remapped everything.

### Rebake

```
rake posts:rebake  →  "937 posts done!"   (~2 min, no errors)
```

Necessary: immediately after restore, `raw` was already clean (0 CDN refs) but **351 posts
still had `discourse-cdn.com` in their cooked HTML**, because cooked was baked on the hosted
side. The rebake cleared all of them.

### Post-restore settings

| Setting | Value | Note |
|---|---|---|
| `reply_by_email_enabled` | `false` | Set per operator decision — no inbound mail on self-host |
| `disable_emails` | `non-staff` | Set automatically by `discourse restore` (its default) |
| `manual_polling_enabled` | `false` | |
| `pop3_polling_enabled` | `false` | |
| Discord login | untouched | Secret not available; deliberately not configured |
| discourse-ai features | untouched | Nothing enabled |

### Verification

| Check | Expected | **Actual** | |
|---|---|---|---|
| `about.stats.users_count` | ~187 | **188** | ✅ |
| `about.stats.topics_count` | ~160 | **160** | ✅ |
| `about.stats.posts_count` | ~936 | **937** | ✅ |
| `about.version` | 2026.7.0 | **2026.7.0-latest** | ✅ |
| `latest.json` topics returned | 30 | **30** | ✅ |
| Categories | — | **4** | ✅ |
| `Upload.count` | — | **540** | ✅ |
| Uploads with a CDN url | 0 | **0** | ✅ |
| Posts with `discourse-cdn.com` in **raw** | 0 | **0** | ✅ |
| Posts with `discourse-cdn.com` in **cooked** | 0 | **0** (was 351 pre-rebake) | ✅ |
| Posts with `baked_version IS NULL` | 0 | **0** | ✅ |
| nginx 5xx responses | 0 | **0** | ✅ |

Real topic titles come through (`Welcome to Regen Coordination Hub! 👋`,
`Welcome to Greenpill Network! :wave:`,
`Farmblock ReFi Initiative. A ReFi DAO Network initiative draft Proposal`,
`See you when I see you 🌱`,
`🍳 What should we cook? Building a shared recipe for impact`).

**Uploads proof.** 129 posts contain locally-hosted `<img>` tags, spanning 1,195 distinct
upload URLs. A random sample of **60 of those URLs was fetched over HTTP: 60/60 returned
200** with correct image content-types and real byte sizes, e.g.

```
/uploads/default/original/1X/bbfa5f9…9cd9.jpeg          → 200 image/jpeg 950151B
/uploads/default/optimized/1X/0af6027…1902_2_690x359.jpeg → 200 image/jpeg  48954B
/uploads/default/original/1X/23c8e6a…d235a.png          → 200 image/png     1301B
```

On disk: `/var/discourse/shared/standalone/uploads/default` = **154 MB, 1,933 files**.
Server at 29% disk (11 G of 38 G), 2.0 Gi RAM used, 273 Mi swap.

### STILL PENDING — deferred to a later rebuild

- **TLS** — no `ssl` / `letsencrypt` template in `app.yml`. Blocked on the
  `hub-staging.regencoordination.xyz` A record, which is blocked on `CF_API_TOKEN`. Must be
  **unproxied (grey cloud)** for HTTP-01 to validate.
- **Real SMTP** — currently `smtp.placeholder.invalid`. No outbound mail works. Blocked on
  choosing/provisioning a mail provider.
- **Discord login secret** — not configured; `discourse-oauth2`/Discord settings left exactly
  as restored.

All three require re-running `./launcher rebuild app` after `app.yml` is updated. The restore
does **not** need to be repeated — the data lives in the `shared/` volume and survives a
rebuild.

### Follow-ups to handle before pointing real DNS here

1. `DISCOURSE_HOSTNAME` is currently `hub-staging.regencoordination.xyz`, and the restore
   baked that hostname into post content via its auto-remap. Cutting over to the real
   `hub.regencoordination.xyz` will need **another `discourse remap`** from the staging
   hostname to the production one, plus a rebake.
2. `disable_emails` is `non-staff`, so **staff notifications will still attempt delivery**
   against the placeholder SMTP host and fail into the Sidekiq retry queue. Consider setting
   it to `yes` until real SMTP exists.
3. `Upload.count` went 504 → 540 across the rebake. Worth a glance — likely
   `download_remote_images_to_local` pulling in externally-hosted images during rebake.
