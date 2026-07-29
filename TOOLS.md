# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## Regen Coordination Hub (self-hosted Discourse)

Live since 2026-07-29. Full runbook: **`docs/runbooks/discourse-hub-ops.md`**

- **URL** — https://hub.regencoordination.xyz
- **Server** — Hetzner Cloud `regen-hub` (id `155961215`), cx23, nbg1
- **SSH** — `ssh -i ~/.ssh/regen-hub root@91.99.139.14`
- **Discourse** — `/var/discourse` (official docker); rebuild: `cd /var/discourse && ./launcher rebuild app`
- **Rails** — must run as the `discourse` user:
  `docker exec -u discourse -w /var/www/discourse app bundle exec rails runner /shared/<script>.rb`
- **DNS** — Cloudflare; `hub` = A → 91.99.139.14, **grey cloud** (proxy breaks Let's Encrypt renewal)
- **Email** — Brevo SMTP relay; domain authenticated (SPF/DKIM/DMARC all pass)
- **Backups** — Discourse daily 03:30 UTC (7 kept, on-server) + Hetzner snapshots (7 rolling, off-server)
- **Ops owners** — Afo, Matty

**Secrets** (Cloudflare + Hetzner tokens, Brevo SMTP, Discourse API key) live in
`~/.secrets/regen-hub-migration.env` on Luiz's machine — never in this repo.

---

Add whatever helps you do your job. This is your cheat sheet.
