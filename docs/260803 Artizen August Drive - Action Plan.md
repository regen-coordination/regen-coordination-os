---
categories: [Funding, Artizen, Planning, Decision]
projects:
  - "[[rc-scope-budget]]"
  - "[[regen-web3-toolkit]]"
date: 2026-08-03
status: "[ACTIVE] Drive closes Thursday 2026-08-06"
sources:
  - "Afo TG messages 2026-07-24, 2026-07-30, 2026-08-02, 2026-08-03"
  - "Matt TG message 2026-08-01"
  - "[[260724 Regen Coordination Council Sync]]"
gap:
  - "260730 toolkit session notes — NOT YET RECEIVED (requested from Afo). Artizen was discussed at length; this plan may need revision once they land."
---

# Artizen August Drive — Action Plan

> **Window:** Mon 2026-08-03 → **drive closes Thursday 2026-08-06**. Afo reports competitive thresholds **Wednesday 08-05**. Big call with Luiz + Afo + Matt + Rather on **Thursday**.
>
> **Operator posture (Luiz):** minimum personal attention. Everything below is either (a) delegated to Afo/Matt/Rather, (b) pre-drafted here for one-click send, or (c) in the short **§7 Luiz-only** list. Nothing else needs your eyes.

---

## 1. What's actually on the table

Three separate money plays, one shared scarce resource (Luiz's boost points).

| # | Play | Capital in | Unlocks | Owner | Source |
|---|---|---|---|---|---|
| A | **Regen Coordination project** matching | $1,000 sales | **$4,000** matching | Matt (post-transfer) | Afo 08-02 |
| B | **Regen Coordination Fund** matching + fund-level cash prize | $250 from treasury | **$1,000** matching → then boost for cash prize (**1st = $60k**) | Afo (manager) | Afo 08-02 |
| C | **Green Goods** cash prize *(Afo's explicitly personal ask)* | $7,000 from an external funder | **$28,000** matching → $35k base, needs **300–600k boosts** | Afo | Afo 08-02 |

**Scoring formula (per Afo):** `score = (sales + matching) × boost points / 100`

Boosts do **not** affect matching — matching is unlocked by artifact purchases only. Boosts only decide **cash-prize ranking**. This was already the 260724 council conclusion; Afo's message is consistent with it.

---

## 2. The math that should drive the decision

Applying the formula to each play, assuming Luiz's full boost stack (~600k per 260724):

| Play | Base (sales + matching) | Score at 600k boosts | Field |
|---|---|---|---|
| B — RC **Fund** | $1,250 | **7.5M** | fund-level (Afo: "less competitive") |
| A — RC **project** | $5,000 | 30M | project-level |
| C — Green Goods | $35,000 | **210M** | project-level, Afo's est. threshold **100–200M** |

**The uncomfortable read:** because score is *multiplicative*, boosts spent on a low-dollar entity produce a low score. The RC Fund's $1,250 base means it tops out around **7.5M even with every boost point Luiz owns** — that's ~4% of Green Goods' score. Afo's claim that fund competition is lower may well be true, but **we have no fund-level threshold number**, and if fund thresholds are anywhere near project-level, play B is unwinnable regardless of how many boosts we dump.

**This is the single question that decides the week** → §3, Q1.

**The corollary that could flip it:** if a *fund's* score aggregates the sales + matching of **all its curated projects**, then the RC Fund's base isn't $1,250 — it's the sum across all 8 curated projects. That would make play B by far the best boost target, and would make it worth actively pushing every one of the 8 projects to transact **in this same week**. Unconfirmed. Also §3, Q1.

---

## 3. Blocking questions — must be answered before boosts are spent

These go to Afo today (drafted in §6.1). Everything else in this plan is executable regardless of the answers; **only the boost allocation is gated.**

**Q1 — Fund-level scoring.** What is the fund score computed on: the fund's own sales+matching only, or the aggregate of all curated projects? And what score has actually **won** the fund drive in recent weeks? (Without a threshold number the boost decision is a guess.)

**Q2 — Matching ratio.** Afo describes 4:1 in both places ($1k → $4k; $250 → $1k). Artizen's public playbook says **1:1 per backing fund** — i.e. $1 of sales draws $1 from *each* fund curating the project. If that's the live rule, then "$1,000 unlocks $4,000" means the RC project is curated in **4 funds**, and "$250 unlocks $1,000" would need reconciling. **This changes how much capital we need to raise.** Confirm the actual live ratio and the per-fund availability.

**Q3 — Fund pool dilution.** Public docs: 90% of a fund's pool splits **equally among curated projects**, 10% becomes the cash prize. If the RC Fund's remaining pool is small (260724 put the old Collective Governance Fund at **~$500 left**), curating **8 projects** into it dilutes match-per-project to near-nothing. What is the fund's actual remaining pool, and does adding projects dilute the per-project match?

**Q4 — Boost-earning mechanics.** For the email campaign (1,000 pts/person, 300k cap): does it need **individual** emails, or does one email with many recipients CC'd count per recipient? Does BCC count? Any verification requirement? *(Also drafted as a direct question to venus@artizen.fund — §6.4.)*

---

## 4. Execution risks

**R1 — The Gardens pool is on the critical path and probably too slow.** Play A's $1,000 is meant to come from the idle Gardens toolkit pool (~$2.4k). Afo: *"we'll need to coordinate to update the pool setting so we can easily pass a proposal to move some funds back to our treasury."* Gardens proposals accrue conviction over **days**. If the setting change + proposal isn't already in flight, **$1,000 cannot land before Thursday.** → Ask Matt today (§6.2). If it can't clear, play A slips to next week's drive and only plays B/C are live.

**R2 — Treasury cannot fund both plays.** RC treasury (`0xFCb81c1B0e0D4FEa01e5A0fbf0aebb91e78A67E1`, 3-of-6) holds **260 USDGLO + 1,302 BREAD**. The $250 for play B consumes essentially **all** the liquid GLO. There is no treasury path to play A's $1,000 — it is Gardens-or-nothing. Also: a 3-of-6 multisig needs **3 signatures collected before Thursday**; start the signature ask Monday, not Wednesday.

**R3 — 6-month lock vs. RC wind-down.** Season funds release **~January 2027**. RC targets conclusion at **end of Q3 2026 (Sept 30)**. Any capital deployed this week comes back roughly **three months after RC has wound down**. The 260724 "reimbursement model" assumed contributors get made whole in January — but that needs a **named custodian and a written record now**, while the council still exists. Do not deploy treasury funds without this written down. → Thursday agenda item (§6.5).

**R4 — Ownership map discrepancy.** 260724 council decided *"Luiz's existing Artizen project converts to the Regen Toolkit project."* Matt's 08-01 message instead has **Rather** owning the toolkit profile and Luiz **transferring the Regen Coordination project to Matt**, with Luiz creating a new ReFi DAO project. These are different end-states for the entry Luiz currently owns. Resolve before anyone clicks transfer — a wrong transfer is painful to undo. → §5, §6.2.

**R5 — Boost balance unverified.** ~600k is the 260724 figure. Two boost codes have passed since (Afo asked "You claim the boost points?" on 07-24; code `8MQQ82` posted 07-30). Actual balance unknown. → §7.

---

## 5. Target ownership map

| Artizen entity | Target owner | Current state | Next action | Whose move |
|---|---|---|---|---|
| **Regen Coordination Fund** (was Collective Governance Fund) | Afo (manager); Luiz + Matt as **curators** | Afo revamping; has asked Artizen to add Luiz + Matt | Confirm curator invites landed; Luiz accepts | Afo → Luiz |
| **Regen Coordination** project | **Matt** | owned by Luiz | Transfer — *after* R4 is resolved | Luiz |
| **Regen Toolkit** project | **Rather** | not created / pending | Matt DM'd Rather 08-01, awaiting thumbs-up | Rather → Matt |
| **ReFi DAO** project | **Luiz** | not created | Create + curate into the RC Fund | Luiz |

**Net effect for Luiz:** ends up owning **one** project (ReFi DAO) instead of the RC entry, plus a nominal curator seat. That's a *reduction* in ongoing load — consistent with the low-attention posture. Recommend accepting the curator seat (it's a permission, not a workload) on the explicit understanding that **Afo and Matt run day-to-day curation**.

**Fund's curated project list (Afo's initial 8):** ReFi DAO · Greenpill Network · Bread Coop · Bloom Network · Regen Commons · Grassroot Economics · Regen Coordination · Regen Toolkit. Within the 5–10 target from 260724. Note Regen Commons is included — consistent with the 260724 line that Regen Commons could join the fund to build a runway (and that Eve's initiative could surface there). **Subject to Q3 dilution check.**

---

## 6. Pre-drafted sends

> Draft-and-present. Nothing here has been sent. Review, then paste.

### 6.1 → Afo (Telegram)

```
**What Afo actually asked** (across 07-24, 07-30, 08-02, 08-03):

| | His ask | Your answer |
|---|---|---|
| a | Claim the boost points / code `8MQQ82` | Yes — do it before replying so the answer is true |
| b | Be a **curator** on the RC Fund (he's asked Artizen to add you + Matt) | **Yes** — nominal, Afo/Matt run curation |
| c | **$250 from treasury** to unlock the fund's $1k matching | **Yes in principle** — but it's ~all our liquid GLO and needs 3-of-6 sigs |
| d | Coordinate the **Gardens pool setting change** → $1k → RC project | Yes, but flag it's likely too slow for this week — Matt owns it |
| e | React to the **8-project** curation list | Broadly good; check dilution before locking |
| f | Commit **boosts to the RC Fund** ("competition between funds is less") | Conditional — need the threshold number |
| g | **Personal ask: boosts to Green Goods** ("you're kind of a whale") | Yes in principle, sized Wednesday |
| h | Run the **supporter-email** campaign for boost points | Yes, once mechanics are confirmed |

**The thing to name that he hasn't:** (f) and (g) compete for the same 600k. His message treats them as two separate asks. They aren't.

> Send as **two** Telegram messages — the operational yeses, then the boost question. Long single blocks don't get read.

**Message 1 — the yeses:**

```
Afo — good update, and yes to basically all of it. Point by point so nothing's
ambiguous:

- Curator on the RC Fund: yes, happy to. Assume you and Matt run day-to-day curation
  and I'm there as a signer/second pair of eyes rather than active curation.
- $250 from treasury to unlock the fund matching: yes in principle. Heads up though
  — we hold 260 USDGLO, so that's essentially all our liquid GLO, and it's a 3-of-6
  so we need signatures lined up. Flagged to Matt to start collecting today.
- Gardens pool for the $1k: agreed it's the right source, but that needs the setting
  change plus a proposal that accrues conviction over days. If it's not in flight
  today it won't clear by Thursday. Matt's picking that up — if it slips we just do
  the project side next drive, no drama.
- Curation list: the 8 look right to me. One thing to check before locking — if 90%
  of the fund pool splits equally across curated projects, going 8-wide dilutes the
  match per project. Might be better to start at 5 and add. What's actually left in
  the pool right now?
- Boost emails: I'll run a list this week. Does it need individual emails, or does
  one email with everyone CC'd count per recipient? Does BCC count? Asking Venus too
  but you've done 150k so you'd know.
- Claimed the codes.

One more — could you send the 260730 toolkit session notes? We covered a lot of
Artizen there and I don't want to re-litigate it Thursday.
```

**Message 2 — the boost question:**

```
On boosts — I want to give you a real answer rather than a vague yes, so here's my
problem with the numbers.

Your formula is (sales + matching) x boosts / 100, which is multiplicative, so where
the boosts land matters enormously:

- RC Fund at $250 + $1k = $1,250 base. Even if I dump all ~600k of my points there,
  that's ~7.5M.
- Green Goods at $7k + $28k = $35k base. Same 600k points = ~210M, and you're
  estimating 100-200M to win.

So the fund is ~4% of the score Green Goods would post. You may well be right that
fund competition is much lower — but I have no fund-level threshold to check that
against. If winning the fund drive takes anything close to project-level numbers,
boosts spent there are just gone.

Two things flip this, and they're the same question:
1. Is a fund's score based on the fund's own sales+matching, or the aggregate across
   all its curated projects? If it aggregates, the fund is by far the best target and
   we should be pushing all 8 projects to transact in this same week.
2. What score has actually won the fund drive the last few weeks?

Also — you've got 4:1 in both places ($1k -> $4k, $250 -> $1k), but Artizen's public
playbook says 1:1 per backing fund. Is the project 4:1 because it's curated in 4
funds? Changes how much we need to raise.

Where I'm at: default is RC Fund first, since that's what we agreed on the 24th —
coordinate boosts and funds into one high-matching drive — and Green Goods with
whatever's left. Genuinely happy to flip it if the fund can't win; I'd rather the
points do something than be loyal to a decision that doesn't survive the math. Get me
the thresholds Wednesday and I'll commit the same day rather than at the closing bell.
```

### 6.2 → Matt (Telegram)

**What Matt actually asked** (08-01):

| | His ask | Your answer |
|---|---|---|
| a | You **transfer the Regen Coordination project** to him | Yes — but which entry? See (c) |
| b | You **create the ReFi DAO project** | Yes, doing it |
| c | *(implicit)* Both gated on Rather's thumbs-up | Fine — but the ownership map conflicts with 260724 |
| d | *(implicit)* Deploy capital "when the time is right" | **Afo says the time is this week** — are you two aligned? |

**The thing to name that he hasn't:** Matt's message reads as *future* tense — "when the time is right", "gotta apply for funds first". Afo's reads as *this week*. They said they aligned Friday, but Matt shows no urgency about a Thursday close, and **his items (Gardens, signatures) are the ones on the critical path.** If that gap is real, nothing lands this week.

```
Matt — yes to both moves: I'll transfer the Regen Coordination entry to you and
create the ReFi DAO project. Good call on Rather for the toolkit profile. One thing
to sort before I click anything, and one timing question.

1. Which entry converts to what. On the 24th we decided my existing Artizen entry
   becomes the Regen Toolkit project. Your message has Rather owning the toolkit and
   me handing the Regen Coordination entry to you, with ReFi DAO created fresh. Those
   are different end-states for the same entry — just tell me which and I'll execute.
   Transferring the wrong one is a pain to undo.

2. Timing — this is the one I actually want to land. Your message reads like
   deploying capital is a "when the time is right" thing, but Afo's update has this
   week as the strike week: drive closes Thursday, $4k matching on the RC project off
   $1k in sales, $1k on the fund off $250. If we're going for it this week then two
   things are on your plate and both need to move today:

   - Gardens: the $1k is meant to come from the idle pool, which needs the setting
     change plus a proposal that accrues conviction over days. Not in flight today =
     can't clear by Thursday.
   - Signatures: we hold 260 USDGLO, so the $250 is basically all our liquid GLO and
     it's a 3-of-6. Worth starting the ask today rather than Wednesday night.

   If you'd rather not force it this week, also fine — but let's decide that
   deliberately now instead of discovering it Thursday afternoon.

3. For Thursday's agenda: season funds don't release until ~January and we're
   targeting wind-down end of Q3. Anything we put in this week comes back roughly
   three months after the council stops existing. We should name a custodian and get
   the reimbursement terms written down while we're all still in the room.
```

### 6.3 → Supporter email (boost points campaign)

> Only send after Q4/§6.4 confirms the mechanics. **CC `venus@artizen.fund`** — that's what makes it count.
> Target genuinely relevant people, not a blast. A spammed list costs more reputation than 300k boosts are worth.

```
Subject: A week that actually matters for Regen Coordination on Artizen

Hi —

Short and concrete: this week is the one week of the Artizen season where the
matching multipliers make our contribution go furthest, and I'd value your support.

Regen Coordination is the coordination layer between ReFi DAO, Greenpill and Bloom —
the toolkit, the knowledge commons, the hub, and the funding flows that keep local
nodes connected. We've just moved our forum to self-hosted infrastructure, cutting
running costs by about $1,100/year, and we're consolidating the Regen Web3 Toolkit
as shared infrastructure for the network.

Artizen works like this: artifacts are $10 open-edition NFTs. Every $1 of artifact
sales unlocks matching from each fund backing the project. So a $10 purchase this
week is worth multiples of $10 to the projects.

The Regen Coordination Fund curates a small set of projects — ReFi DAO, Greenpill
Network, Bread Coop, Bloom Network, Regen Commons, Grassroot Economics, Regen
Coordination and the Regen Toolkit. If any of those are ones you'd back, this is the
efficient week to do it.

Browse and buy: https://artizen.fund/
Grow app: https://grow.artizen.fund/

No pressure at all if it's not your thing — but if you've been meaning to support
any of this, the timing genuinely matters.

Thanks,
Luiz
```

### 6.4 → venus@artizen.fund

```
Subject: Boost points via supporter emails — mechanics question

Hi Venus,

Afo (Greenpill / WEFA) pointed me to this week's boost-point campaign — 1,000 points
per person emailed, up to 300,000. Before I run it I want to make sure I do it in a
way that actually counts:

1. Does it need to be individual emails per person, or does a single email with
   multiple recipients CC'd count once per recipient?
2. Does BCC count, or must recipients be visible?
3. Is there a verification step, or is CC'ing you sufficient?
4. Is there a deadline within this week's drive?

Separately — I'm involved with Regen Coordination (coordination layer across ReFi
DAO, Greenpill and Bloom) and we're curating the Regen Coordination Fund. If you have
fund-fit recommendations for the Regen Web3 Toolkit or a ReFi DAO project entry, I'd
welcome them.

Thanks,
Luiz Fernando
Regen Coordination
```

### 6.4b → venus@artizen.fund — **project transfer request** (send first, keep clean)

> Per Afo 08-03: transfer is handled by emailing Venus directly. **Send from the email address registered to the Artizen account** — she needs to verify you're the current owner.
> Keep this standalone so it gets actioned fast; send the §6.4 boost-mechanics questions as a separate email.

```
Subject: Project transfer request — Regen Coordination → Matty Compost

Hi Venus,

Afo pointed me your way for this. I'd like to transfer ownership of the Regen
Coordination project to Matt (Matty Compost).

  Project:      https://artizen.fund/index/p/regen-coordination?season=7
  Transfer to:  mattycompost@gmail.com

I'm the current owner and I'm sending this from the address on the account — let me
know if you need anything further from me or a confirmation from Matt's side.

If it's possible to complete before Thursday that would help: Matt will run the
project from there, and I'm separately creating a ReFi DAO project so both can be
curated into the Regen Coordination Fund ahead of the next fund drive.

Thanks very much,
Luiz Fernando
Regen Coordination
```

### 6.5 Thursday call agenda (Luiz · Afo · Matt · Rather)

1. **Boost allocation — decide and execute in-call.** RC Fund vs Green Goods, using Wednesday's threshold numbers. Don't leave it to the closing minutes.
2. **Ownership map sign-off** (R4) — who owns which of the 4 Artizen entities, executed on the call.
3. **Fund curation list** — 8 vs 5 projects, given the dilution answer (Q3).
4. **Capital: what actually cleared.** Gardens proposal status; 3-of-6 signature status; what we can genuinely deploy before close.
5. **⚠️ January custodian + reimbursement terms** (R3) — named person, written terms, agreed *now*. RC winds down end of Q3; funds release ~January.
6. **Toolkit profile handover to Rather** — what Rather needs from Matt/Luiz to run it.
7. Carry-over: Artizen contribution sizing + split model for the ReFi two-orgs council (open since 260724).

---

## 7. Consolidated action register

Every action across all owners, deduped. **Canonical list — HEARTBEAT mirrors this.**

### 7.1 Luiz (8 actions + 1 carry-over · < 90 min total)

| # | Action | Where | Time | When | Blocked by |
|---|---|---|---|---|---|
| L1 | Check **real boost balance** + claim code `8MQQ82` if still live | grow.artizen.fund | 2 min | **today** | — |
| L2 | Send §6.1 to Afo — the 4 blocking questions + allocation posture + 260730 notes request | Telegram | 1 min | **today** | — |
| L3 | Send §6.2 to Matt — Gardens timing, ownership discrepancy, 3-of-6 sigs, January custodian | Telegram | 1 min | **today** | — |
| L4 | Send §6.4 to Venus — boost-email mechanics + fund-fit rec | email | 1 min | **today** | — |
| L5 | Accept the RC Fund **curator** invite | Artizen | 1 min | on arrival | A2 |
| L6 | **Decide boost allocation** — RC Fund vs Green Goods | — | 5 min | **Wed 08-05** | A1 (Q1 answer) |
| L7 | *(optional)* Assemble supporter list + send §6.3 — up to 300k boosts | email | 30–45 min | Wed–Thu | Venus reply (Q4) |
| ~~L8a~~ | ~~Email Venus to transfer the RC project to Matt~~ — ✅ **DONE 2026-08-05, transfer complete.** Matt now owns `regen-coordination` | — | — | done | — |
| L8b | **Create the ReFi DAO project** so Afo can curate it into the RC Fund before Thursday | Artizen | 15–20 min | **by Wed** | — |
| L9 | Spend boosts per the L6 decision | grow.artizen.fund | 5 min | **Thu, pre-close** | L6 |
| L10 | *(carry-over, 260724)* Bring Artizen contribution sizing + split model to the ReFi two-orgs council | — | — | next ReFi council | — |

L7 is the only item that's more than a few clicks, and the only optional one — worth ~50% on top of the current boost stack.

### 7.2 Matt

| # | Action | When | Risk |
|---|---|---|---|
| M1 | ~~**Resolve the ownership-map discrepancy**~~ — **RESOLVED 08-03 by Afo**: Luiz's `regen-coordination` entry transfers to Matt as-is; Rather owns a separate Toolkit profile; Luiz creates ReFi DAO fresh. Matt's 08-01 map wins over the 260724 reading | done | ~~R4~~ |
| M2 | **Gardens pool setting change + proposal** to move ~$1,000 to treasury — conviction accrues over days; if not in flight today, play A slips a week | **today** | R1 |
| M3 | Collect **3-of-6 multisig signatures** for the $250 fund unlock (treasury holds only 260 USDGLO) | Mon–Wed | R2 |
| M4 | Get **Rather's confirmation** as toolkit project owner (DM'd 08-01) | Mon–Tue | — |
| M5 | *(260724)* Update budget/scope doc for remainder of Q3 + notify Telegram — feeds Thursday | before Thu | — |
| M6 | *(260724)* Submit the **reimbursement transaction** for outstanding expenses + request signatures | before Thu | R3 |

### 7.3 Afo

| # | Action | When |
|---|---|---|
| A1 | **Answer Q1–Q4** (§3) — fund scoring basis + winning threshold, real matching ratio, fund pool + dilution, boost-email mechanics. **Q1 gates L6** | by **Wed 08-05** |
| A2 | Confirm the Luiz + Matt **curator invites** landed on the RC Fund | this week |
| A3 | **Send the 260730 toolkit session notes** | asap |
| A4 | *(260724)* Finish the Collective Governance Fund → **Regen Coordination Fund** revamp | before Thu |
| A5 | *(260724)* Notify existing fund projects re: reorganization + removal (thank-you email) | before Thu |
| A6 | *(260724)* Recruit Bloom, BREAD Co-op + other communities into the fund | ongoing |

### 7.4 Rather

| # | Action | When |
|---|---|---|
| R1a | Confirm as **toolkit Artizen project owner** (responding to Matt's DM) | asap |
| R2a | Take over / stand up the Regen Toolkit profile — needs handover from Matt + Luiz | Thu call |

### 7.5 Thursday call — decide in the room, not at the closing bell

| # | Decision | Depends on |
|---|---|---|
| T1 | **Boost allocation executed** — RC Fund vs Green Goods | L6 / A1 |
| T2 | **Ownership map signed off** across all 4 Artizen entities | M1 |
| T3 | **Fund curation list** — 8 projects vs starting at 5 | A1 (Q3 dilution) |
| T4 | **Capital status** — what actually cleared: Gardens, signatures, deployable total | M2, M3 |
| T5 | **⚠️ Name a January custodian + write reimbursement terms down** — funds release ~Jan 2027, RC winds down end of Q3 2026 | R3 |
| T6 | **Toolkit profile handover** to Rather | R1a |

### 7.6 Critical path

```
TODAY  ── L1 L2 L3 L4 ──┐
         M1 M2 M3 M4     │   M2 is the hard deadline: Gardens conviction
                         │   takes days. Not started today = play A slips.
TUE    ── A4 A5, M5 M6 ──┤
                         │
WED    ── A1 answers ────┼──> L6 boost decision ──┐
         L7 email send   │                        │
                         │                        │
THU    ── call: T1–T6 ───┴──> L8 ownership ───────┴──> L9 spend boosts
         DRIVE CLOSES                                   (before close)
```

**Do not do (Luiz):** chase the Gardens proposal (M2, Matt), curate the fund list (A6, Afo), write the toolkit profile (Rather), or drive the capital raise (Afo/Matt).

---

## 8. Standing gap

The **260730 toolkit session** notes have not arrived (requested from Afo, restated in §6.1). Artizen was discussed at length there. Treat §2 and §5 as provisional until those land — particularly anything about the toolkit project's Artizen positioning and Rather's role.
