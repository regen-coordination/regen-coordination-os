# Discourse Migration Design — hub.regencoordination.xyz → Hetzner self-host

**Date:** 2026-07-11
**Owner:** Luiz (decision) · Afo / Matty (ongoing ops) · Agent (execution)
**Status:** Design approved — pending spec review, then implementation plan

---

## 1. Decision summary

- **Driver:** Cost. Retire the ~$100/mo Discourse hosted custom-domain tier → **~$9–14/mo all-in** (≈85–90% cut; see §7 breakdown).
- **Target platform:** Hetzner Cloud, **CX32** (4 vCPU / 8 GB RAM / 80 GB NVMe, ~$7.69/mo). Chosen over CX22 so the ops owners never fight the 2 GB rebuild-OOM problem; over Hostinger because Hetzner is cheaper long-run (flat rate, no renewal shock) and exposes a full API/CLI for agent-driven lifecycle management.
- **Install:** Official `discourse_docker` launcher on Ubuntu 24.04. **No PaaS** (Railway/Fly rejected: Discourse only officially supports the Docker-on-VM path; PaaS is unsupported and, for a cost driver, more expensive and more fragile).
- **Ops owners post-migration:** Afo / Matty.
- **Agent execution model:** Agent drives provisioning + config + upkeep via **SSH key** (Discourse work) + **`hcloud` API token** (server lifecycle) + **Cloudflare API token** (DNS). Destructive/cutover steps (read-only freeze, DNS flip, plan cancellation) are **draft-and-present**, not autonomous.

### Verified current-state (public data, 2026-07-11)
- **Scale:** 186 users · 159 topics · 931 posts · ~1,012 likes. Chat essentially unused.
- **Activity:** light — ~9 posts / 1 topic in the last 30 days.
- **Hosting:** confirmed on Discourse's official hosted CDN (`canada1.discourse-cdn.com/.../greenpill_hub/...`).
- **Implication:** uploads are at most a few hundred MB; a full backup (DB + uploads) will be well under ~1–2 GB. CX32's 80 GB is years of headroom; disk sizing is a non-issue.

---

## 2. Architecture

Single Hetzner VM → one Docker container (the standard all-in-one: Postgres + Redis + Rails/Unicorn + nginx) → uploads on local NVMe → Let's Encrypt TLS → outbound mail via a **transactional SMTP provider** (required — see §5). DNS `A`/`AAAA` for `hub.regencoordination.xyz` points at the box (via Cloudflare — to confirm). The `latest.json` federation feed that the network reads comes free with any Discourse instance and is preserved unchanged.

```
Cloudflare DNS ──▶ Hetzner CX32 (Ubuntu 24.04)
                     └── Docker: Postgres · Redis · Rails · nginx
                           ├── uploads on local NVMe
                           ├── Let's Encrypt TLS
                           └── SMTP ──▶ transactional mail provider
```

---

## 3. Migration phases

### Phase 0 — Discovery & backup (no changes, zero risk)
From the admin panel (Luiz now has admin), record and procure:
- Discourse **version** (target restore must be ≥ source version — ideally identical).
- **Installed plugins/themes** (must be re-declared in `app.yml`).
- **Current SMTP/email provider** in use on the hosted plan.
- **Uploads size** (read from `/admin/backups`) — confirms disk & transfer estimate.
- Whether uploads are already on S3, and any CDN specifics.
- **Hosted-account ownership & billing** — site id is `greenpill_hub`; confirm whether the subscription is billed to a Greenpill account vs RC, since that determines who cancels the plan and realizes the saving in Phase 4.
- Pull a **full backup *with uploads*** from `/admin/backups` — this is the migration payload.
- Procure secrets: Hetzner account + `hcloud` API token, Cloudflare scoped DNS token, SMTP credentials.

### Phase 1 — Provision (staging)
Create the Hetzner CX32 box (Ubuntu 24.04, SSH key, firewall 22/80/443). Point a **`hub-staging.regencoordination.xyz`** record at it so the full dry-run happens **without touching production**.

### Phase 2 — Install + restore on staging
Clone `discourse_docker`, run `./discourse-setup`, configure `app.yml` (staging hostname, SMTP, admin email, **matching plugin list**), bootstrap. Match Discourse version to source. Restore the backup, then **verify**: posts, users, uploads, categories, login, a real test email delivery, and `latest.json`.

### Phase 3 — Cutover (the only risky window)
1. Set the hosted forum **read-only**.
2. Take one **final fresh backup** (captures the last posts).
3. Restore that backup to the new box.
4. Switch hostname to production (`hub.regencoordination.xyz`) + rebuild.
5. Issue **Let's Encrypt TLS** (port 80 reachable; if Cloudflare proxy is on, disable proxy during issuance or use DNS challenge).
6. **Flip the Cloudflare DNS record** to the new IP (lower TTL a day ahead).
7. Verify end-to-end; re-enable Cloudflare proxy if used.

### Phase 4 — Decommission + handoff
- Run stable for a verification window (~3–7 days).
- **Cancel the hosted plan** — saving realized (coordinate with whoever owns the billing account per Phase 0).
- Enable automated **daily backups** (Discourse built-in → offsite/S3) + Hetzner snapshots.
- Write the ops runbook: monthly `./launcher rebuild app`, restore drill, incident contacts (Afo / Matty).
- Update `federation.yaml` (note self-hosted), `TOOLS.md` (server IP / SSH), close the two HEARTBEAT tasks, correct the budget line (line 7, $250 placeholder → actual ~$8/mo).

---

## 4. Rollback / safety net

The hosted instance stays **fully alive** until Phase 4. If cutover misbehaves, point DNS back to the hosted instance — near-zero data loss because the source was **read-only** during the switch. The paid plan is only cancelled *after* the verification window passes.

---

## 5. Required discovery items (currently unknown)

- **Email / SMTP (blocker):** self-hosted Discourse **cannot reliably send its own mail** — it needs a transactional provider (Mailgun / Postmark / SES / etc.). Must be procured before Phase 2. A forum this size fits comfortably in free-to-few-dollar tiers.
- **Plugins / themes:** any non-default plugins must be re-declared in `app.yml`; unknown until the Phase 0 admin inventory.

---

## 6. Open questions to close before Phase 3

1. **DNS controller** — confirm `hub.regencoordination.xyz` is on Cloudflare and who holds the token to flip it. *(Luiz to confirm.)*
2. **Hosted-account ownership** — Greenpill vs RC billing (see Phase 0). Determines who cancels the plan.
3. **SMTP provider** — pick one and procure before Phase 2.

---

## 7. Cost summary

| Line | Before | After |
|------|--------|-------|
| Compute | ~$100/mo (hosted custom-domain tier) | Hetzner CX32 ~$7.69/mo |
| Email | included | transactional SMTP ~$0–5/mo |
| Backups | included | offsite/snapshot ~$1/mo |
| **Total** | **~$100/mo** | **~$9–14/mo (≈85–90% cut)** |

Sources for pricing/requirements verified 2026-07-11: Hetzner Cloud pricing (CX22 ~$4.35/mo, CX32 ~$7.69/mo), Hostinger KVM pricing/renewal, Discourse official INSTALL.md + RAM-requirements meta threads.
