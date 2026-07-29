# ✅ The Regen Coordination Hub is now self-hosted

**For:** Regen Coordination Council
**From:** Luiz
**Date:** 2026-07-29

---

## TL;DR

**hub.regencoordination.xyz has moved off Discourse's paid hosting onto infrastructure we own.**

Cost went from **~$100/month to ~$8.40/month** — a saving of roughly **$1,100/year**.

Nothing changed for members: same web address, same logins, same posts, same images. No one needs to do anything.

---

## What changed for members: nothing

| | Before | After |
|---|---|---|
| Web address | hub.regencoordination.xyz | hub.regencoordination.xyz *(unchanged)* |
| Your login & password | works | works *(unchanged)* |
| Login with Discord | works | works *(unchanged)* |
| All posts, topics, history | present | present |
| Images and attachments | present | present |
| Existing links to threads | work | work |

Everything was migrated: **188 members, 160 topics, 938 posts, and 154 MB of images and attachments** — verified piece by piece.

## Cost

| | Monthly | Yearly |
|---|---|---|
| **Before** — Discourse managed hosting | ~$100 | ~$1,200 |
| **After** — our own server + email + backups | **~$8.40** | **~$100** |
| **Saving** | **~$92/mo** | **~$1,100/yr** |

Server: Hetzner (2 vCPU / 4 GB / 40 GB) €6.49/mo, plus automated off-server snapshots €1.30/mo. Email runs on a free tier.

This directly resolves budget line 7 (*hub self-hosting*), which carried a $250 placeholder. **Actual infrastructure cost is ~$100/year**, so that line now only needs to cover labour — the build and ongoing maintenance — not hosting.

It also matters for the wind-down: at ~$8/month the hub can stay online cheaply and sustainably, largely independent of RC's operating budget.

## What was verified before and after the switch

- Logging in with an existing password — **no one had to reset anything**
- Logging in with Discord (80 of our 189 members use this)
- Posts, topics, categories and full history intact
- Images and attachments loading from the new server
- Email notifications sending and passing all modern authentication checks (SPF, DKIM, DMARC)
- The `.well-known` / `latest.json` feeds other tools in the network read

The old hosted forum was kept running side-by-side as a fallback throughout, and a complete verified backup was in hand before anything was switched.

## How it's looked after now

- **Automated backups** — daily, including all uploads, plus separate off-server snapshots of the whole machine
- **Security updates** — a routine monthly task (~15 min)
- **Proposed ops owners: Afo and Matty**, with a full written runbook covering access, updates, restores, and troubleshooting

---

## Three asks

1. **Confirm Afo & Matty as hub ops owners** — and they need to be added to the hosting (Hetzner) and DNS (Cloudflare) accounts. Right now access runs through Luiz alone, which isn't a healthy setup for shared infrastructure.

2. **⚠️ The domain `regencoordination.xyz` expires 2026-10-10.** It's registered at Namecheap under Monty's account. **If it isn't renewed, the hub goes offline regardless of where it's hosted** — and that date falls just after our end-Q3 wind-down. Can we confirm auto-renew is on, and agree who's responsible for it going forward?

3. **Retro for the migration work** — budget line 7 was scoped at $250 as a placeholder for hosting. Since actual hosting is ~$100/year, the council may want to redirect that line toward the build + ongoing ops instead.

*Questions welcome. Full technical runbook: `docs/runbooks/discourse-hub-ops.md`.*
