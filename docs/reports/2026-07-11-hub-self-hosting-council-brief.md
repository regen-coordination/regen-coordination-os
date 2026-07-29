> **⚠️ SUPERSEDED — this was the pre-migration proposal.** The migration completed on 2026-07-29.
> Current announcement: [`2026-07-29-hub-self-hosting-complete.md`](2026-07-29-hub-self-hosting-complete.md).
> Kept for the record.

# Proposal: Move the Regen Coordination Hub to Self-Hosting

**For:** Regen Coordination Council
**From:** Luiz
**Date:** 2026-07-11
**Decision requested:** Yes — three items (see end)

---

## TL;DR

Our community forum, **hub.regencoordination.xyz**, currently runs on Discourse's paid hosting at **~$100/month**. We can move it to a self-hosted server for **~$10/month** — the *exact same forum*, same web address, same logins, same posts — and **save ~$90/month (~$1,080/year)**.

Nothing changes for members. The only visible impact is a short (<1 hour) read-only window during the switch, which we'll schedule at a quiet time and announce in advance.

This directly closes the "own the hub / cut the $100/mo custom-domain cost" item the council has already discussed, and it matters more given our wind-down: **at ~$10/month the hub can stay alive cheaply and sustainably, largely independent of RC's operating budget.**

---

## Why now

- The hub is our primary engagement platform, but the hosted plan's custom-domain tier costs ~$100/month and blocks the cheaper downgrade path.
- Discourse is open-source; self-hosting it on a small cloud server is the officially-supported, well-trodden path.
- We already have the people for it: Afo has the relevant cloud experience, and the day-to-day upkeep is minimal (~15 min/month).

## What changes for members: **nothing**

| | Before | After |
|---|---|---|
| Web address | hub.regencoordination.xyz | hub.regencoordination.xyz *(unchanged)* |
| Your login & password | works | works *(migrated as-is — no reset)* |
| All posts, topics, history | present | present *(fully migrated)* |
| Existing links to threads | work | work *(unchanged)* |

The migration copies **everything** — accounts, passwords, posts, images, likes, settings — via Discourse's own full-backup tool. No member has to do anything.

## Cost

| | Monthly | Yearly |
|---|---|---|
| **Today** (Discourse hosted) | ~$100 | ~$1,200 |
| **After** (Hetzner server + email + backups) | **~$10** | **~$120** |
| **Savings** | **~$90/mo** | **~$1,080/yr** |

Server: Hetzner Cloud CX32 (~$8/mo). Plus a free/low-cost transactional email service and offsite backups (~$1–2/mo).

## Risk & safety

This is low-risk by design:

1. **Full backup already secured.** Discourse's cancellation process generates a complete backup (database **+ all uploads**), which we've retrieved — so every post, image, and account is safely in hand before we build anything.
2. **Full dry-run first.** We stand up the new server on a staging address and restore that complete copy there, then test logins, posting, images, and email — *before* switching the live address.
3. **Live fallback until July 30.** The current hosted forum **stays fully online until July 30** (end of the paid period), so we run both side-by-side and can point the address back instantly if anything looks wrong — zero data loss (the live forum is read-only during the brief switch).

## Timeline — ⏰ hard deadline July 30

Discourse decommissions the hosted site on **July 30** (end of the current billing period). Our sequence fits inside that window: **full backup secured → new server + staging restore → verification & smoke-test → scheduled cutover (<1 hour) before July 30.** After July 30 the migration is complete and the ~$1,080/yr saving is locked in automatically.

## Ongoing responsibility

After migration, the forum needs a routine security update roughly monthly (~15 min) plus backup monitoring. **Proposed owners: Afo and Matty**, with automated daily backups and uptime alerts in place.

---

## Where things stand & decisions requested

The migration is **already in motion** (the hosted plan sits under a Greenpill-associated account, `greenpill_hub`, and cancelling it is what produces the full backup — so cancellation is step one, not last). Asks for the council:

1. **Awareness / green-light** — the hub moves to self-hosting this week, cutover before **July 30**, no member-visible change beyond a short maintenance window.
2. **Confirm ops owners** — Afo & Matty as the two maintainers going forward. *(OK?)*
3. **Greenpill account heads-up** — since the subscription is Greenpill-side, flagging the cancellation to whoever owns that account is a courtesy + correctness check. *(Anyone we should loop in?)*

*Questions or concerns welcome on the thread. Full technical plan available on request.*
