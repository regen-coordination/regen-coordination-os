---
id: "meeting-20260724-council"
type: council
date: "2026-07-24"
title: "Regen Coordination Council Sync — Collective Governance Fund → Regen Coordination Fund, Artizen strategy, Discourse migration progress, budget scope, outputs-vs-outcomes"
categories: [Meetings]
projects:
  - "[[regen-web3-toolkit]]"
  - "[[rc-scope-budget]]"
attendees: [Luiz Fernando, Matt, Afo, Coi]
attendees_note: "Full speaker labels present in this transcript (unlike 260710). Speaking: Luiz Fernando Segala Gomes (Luiz), Matty Compost (Matt), Afolabi Aiyeloja (Afo), Coi groweco (Coi). Invited but not clearly engaging: Monty (monty@refidao.com), Caue (caue.mtomaz@gmail.com — possibly the same person as Coi/'groweco'; kept distinct per the council roster in rc-scope-budget), Eve (imaginationhealer@gmail.com, discussed at length but not speaking), refi.sicilia@gmail.com, civilmonkey@proton.me."
referenced:
  - Eve (Regen Commons steward — meditation/embodiment + community-connection work sits under Regen Commons, not RC; stepping back due to work; central to Coi's autonomy argument)
  - Nana (worked at Regen Foundation; gave async pushback on Commons-joins-Foundation; stepping back)
  - Patricia (Tricia — did identity/branding series for Regen Commons; raised GG23 eval data on a community call)
  - Benjamin (council member, already stepped back)
  - Gregory (drove Regen Foundation / institutional-home proposal; travelling + unresponsive; original SporkDAO framing)
  - Monty (invited; doing work with Astera)
  - Rather (Rathermercurial — Astro data-layer / toolkit collaborator; new compliant template; interested in BREAD Co-op work)
  - Nai (BREAD Co-op; interested in knowledge consolidation)
  - Renee (Artizen platform; OK'd revamping the Collective Governance Fund)
  - Leo (Artizen-side contact; possible gifts/support)
  - Masabi (referenced via prior Gardens proposal context)
related:
  - collective-governance-fund-to-regen-coordination-fund
  - artizen-boost-strategy
  - artizen-reimbursement-model
  - regen-toolkit-artizen-project
  - discourse-forum-migration
  - discourse-backup-request
  - regen-commons-stalled
  - regen-foundation-institutional-home
  - eve-stewardship-autonomy
  - budget-scope-review
  - outputs-vs-outcomes
  - compensation-effort-tracking
  - gg23-ai-evaluation-data
  - karma-gap-low-priority
  - impact-metrics-projects-supported
  - superbenefit-fiscal-sponsor
  - edge-city-fund
  - astro-template-toolkit
  - bread-coop-knowledge-consolidation
  - rc-wind-down
signals:
  - collective-governance-fund-being-revamped-to-regen-coordination-fund-now
  - fund-limited-to-5-10-curated-projects
  - artizen-boosts-only-affect-cash-prizes-not-matching
  - matching-tied-to-artifact-purchases-only
  - coordinate-boosts-and-funds-within-single-weekly-drive-at-high-matching
  - fund-release-6-months-january
  - artizen-reimbursement-model-for-contributed-funds
  - luiz-existing-project-converts-to-regen-toolkit
  - discourse-host-hetzner-selfhost-under-10-per-month
  - discourse-backup-must-be-requested-by-billing-owner-matt
  - discourse-migration-saves-80-90-per-month
  - regen-commons-stalled-leadership-stepped-back
  - regen-commons-treasury-5k-remaining
  - regen-foundation-headless-no-funding
  - rc-no-full-fold-into-commons
  - regen-commons-could-create-project-to-join-fund-build-runway
  - eve-role-more-than-meditation-autonomy-tension-unresolved
  - no-long-term-treasury-earmarking
  - route-remaining-budget-through-artizen
  - outcome-driven-over-output-driven-reporting-aligned
  - small-optional-500-working-group-earmark
  - karma-gap-explicitly-low-priority
  - prioritize-gg23-and-poll-data-synthesis
  - track-projects-supported-as-impact-metric
  - compensation-flexible-trust-based-track-time-on-synthesis
  - luiz-ok-with-reduced-or-no-comp-for-activity-reports
  - matt-to-update-budget-and-notify-telegram
  - scope-budget-for-remainder-of-q3
prior_meetings:
  - "[[260710 Regen Coordination Council Sync]]"
superseded_in_part_by:
  - "memory/2026-08-05.md — Artizen Season 7 + settled ownership map (regen-coordination → Matt, Toolkit profile → Rather, ReFi DAO project → Luiz); supersedes this record's 'convert the Artizen project' decision"
  - "docs/260803 Artizen August Drive - Action Plan.md"
transcript_included: false
source_file: "260724 Regen Coordination Council Sync.md"
---

# Regen Coordination Council Sync

**Date:** 2026-07-24 (Thursday)
**Type:** Council
**Original note title:** "Regen Coordination Council Sync" (Gemini quick + full notes + transcript)

> **Terminology normalized** from an auto-transcript: "Region Coordination" → Regen Coordination (RC); "Region Commons / region comments / region common" → Regen Commons; "region foundation" → Regen Foundation (Regen Network's foundation); "Refi Dow / refidel / refund out" → ReFi DAO; "Artisan / Artism / artist and" → Artizen; "green goods / green colors" → Green Goods (Afo's Greenpill-adjacent project); "headnet" → **Hetzner** (self-host target, confirmed by operator — see note below); "spork dow" → SporkDAO; "Super Benefit" → SuperBenefit; "EP City / EPE fund" → Edge City fund (for internet-native institutions); "g23 / GG23" → GG23; "karma gap" → Karma GAP; "Astera" → Astera; "Post Hog" → PostHog; "Valley of the Commons" → Valley of the Commons (event, Austria); "Brad / red / the pickle" → **BREAD** (the BREAD Co-op, invited to the fund — confirmed by operator). Speaker attribution is **complete** in this transcript.
>
> **Discourse host — resolved:** the auto-transcript's "Headnet" is a mis-transcription of **Hetzner** (confirmed by operator). This is consistent with the repo's in-progress **Hetzner self-host migration** plan (commits `55a1f8e`, `91b722a`, `47aeff0` + `docs/` migration spec). The "<$10/mo" and seamless-migration framing refer to moving **from** the current managed Discourse host **to** Hetzner self-host; the full-backup request goes to the *current* provider.

## Key Decisions

- **Collective Governance Fund → "Regen Coordination Fund" (Afo revamps it now).** Renee OK'd repurposing the open-ended Collective Governance Fund (only ~$500 left, prior matching already allocated). New fund is **curated to 5–10 specific projects** — Bloom, BREAD Co-op, Greenpill, ReFi DAO, the Regen Toolkit, and possibly Edge City / TDF / other aligned Regen communities. Rationale: winning cash prizes at the **fund level** is far less competitive than at the project level → unlocks more matching (est. potential ~$40–50k in the fund over drives). Afo emails existing projects (thank-you + removal) first, then recruits new partners before the next call.
- **Luiz's existing Artizen project → becomes the Regen Toolkit project.** The current project entry Luiz opened converts to represent just the toolkit and joins the new Regen Coordination Fund. — ⚠️ **SUPERSEDED 2026-08-03/05.** Afo + Matt settled a different ownership map: Luiz's `regen-coordination` entry transfers to **Matt as-is** (transfer executed 2026-08-05 via `venus@artizen.fund`), **Rather** owns a separate Regen Toolkit profile, and **Luiz creates a ReFi DAO project fresh**. Do not act on the 260724 reading. See `memory/2026-08-05.md` and `docs/260803 Artizen August Drive - Action Plan.md`.
- **Artizen boost/matching mechanics clarified + strategy set.** Matching is tied **only to artifact purchases** (donations); **boosts have no effect on matching** — they only drive the weekly **cash-prize fund drives** (drives end Thursday). Decision: **don't spend boosts randomly** — coordinate boosts + internal funds within a **single weekly drive when matching is high** and there's a real chance of winning. Luiz holds ~600k boost points (enough to win a cash prize in the right week).
- **Reimbursement model for contributed funds.** Funds members put into Artizen can be **reimbursed in January** when the season's funds release (6-month timeline); surplus stays in RC or returns to Greenpill. Matt to **submit a reimbursement transaction** for outstanding expenses (needs signatures).
- **Discourse migration underway → Hetzner self-host, <$10/mo** (down from ~$100/mo; saves ~$80–90/mo). Process is largely seamless (brief cutover desync; full history + credentials migrate). **Blocker:** the **billing account owner (Matt)** must email the current (managed) provider to request a **full data backup**; Luiz has a draft and will try first as admin, wait a few days, and hand to Matt if that fails.
- **No long-term treasury earmarking; route remaining budget through Artizen.** Reviewed the "Regen Coordination Scope and Budget" sheet. Kept it slim: one-off retro items (hub setup, activity reports, docs, Karma GAP, polls/meeting-notes distillation) stay, but no dedicated long-term treasury bucket, no operations/info-management line — loop surplus through Artizen for matching. Optional **small ~$500 post-Artizen earmark** for a possible Greenpill/ReFi DAO/Bloom entanglement working group (Afo unsure how much to allocate now).
- **Outcome-driven over output-driven (aligned).** Coi's framing accepted: artifacts (e.g. polls) are **outputs**; the **outcome** is the analysis, communication, and people actually engaging with the results. All future reporting/analysis is framed around outcomes, not artifact production.
- **Karma GAP → low priority.** No rush to publish; **prioritize synthesizing existing data** (GG23 AI evaluations + poll data) over platform-specific inputs. Down the line someone can be paid to input results into Karma GAP.
- **RC does not fully fold into Regen Commons (reaffirmed).** Regen Commons is **stalled** — leadership stepped back, no consensus, ~$5k left in treasury, Foundation-join proposal stuck. RC keeps its own coordination identity; the Regen Coordination Fund is the better coordination vehicle right now. Regen Commons *could* create a project to join the fund and build a runway. Individuals (incl. Luiz) should still **apply for personal Regen Commons membership**.

## Action Items

### Afo
- [ ] **Revamp the Governance Fund** → convert the Collective Governance Fund into the **Regen Coordination Fund** before the next meeting.
- [ ] **Notify existing projects** — email current fund participants re: the reorganization and their removal from the program (thank-you note).
- [ ] **Recruit new partners** — contact **Bloom, BREAD** (BREAD Co-op), and other selected communities to invite them into the new Regen Coordination Fund (target 5–10 curated projects).
- [ ] **Synthesize data** — analyze the **GG23 AI valuations + poll data** to synthesize findings for future coordination (also feeds the planned community workshop).

### Matt
- [ ] **Process reimbursements** — submit a transaction for outstanding expenses and request signatures for approval.
- [ ] **Update budget (scope/decisions)** — revise the fiscal-planning doc to earmark funds toward **Regen Coordination + toolkit**; reflect the outputs-vs-outcomes framing.
- [ ] **Update budget (Q3 scope)** — update the spreadsheet and **scope the budget for the remainder of Q3** (short-term focus; retro items as outlined).
- [ ] **Notify group** — post in the Telegram group once the budget spreadsheet is updated; discuss next week.

### Luiz
- [x] ~~**Request Discourse backup** — contact the current (managed) provider to request the complete data + history backup for the migration to **Hetzner self-host**.~~ — ✅ **DONE: migration completed 2026-07-29.** `hub.regencoordination.xyz` now self-hosted on Hetzner cx23 (€6.49/mo + €1.30 snapshots), down from ~$100/mo — **~$1,100/yr saved**. Same domain/logins/content, zero data loss. Runbook: `docs/runbooks/discourse-hub-ops.md`. 7-day check 2026-08-05: stable.
- [ ] **Apply for Regen Commons membership** — submit the membership form to officially join (long overdue; reaffirmed).
- [x] ~~**Convert the Artizen project** to the Regen Toolkit project and join it to the new Regen Coordination Fund; open a ReFi DAO project if useful.~~ — ⚠️ **SUPERSEDED 2026-08-03/05** by the settled ownership map: `regen-coordination` → **Matt** (transfer done 2026-08-05), Regen Toolkit profile → **Rather**, ReFi DAO project → **Luiz to create fresh** (still open; curation cutoff Thu 2026-08-06). Tracked in `HEARTBEAT.md` under the Artizen August drive.
- [ ] **Bring Artizen contribution sizing** to next week's two-orgs (ReFi) council meeting — decide how much repair/capital to put in, and the split model (proportional to contribution).

### Team / Group
- [ ] **Coordinate Artizen boosts + funds within a single high-matching weekly drive** rather than spending boosts randomly (drives end Thursday).
- [ ] **(Unresolved) Eve's role / stewardship autonomy** — Coi pushed hard that Eve does far more than meditation (she's the human connective tissue holding space for the community) and should get more autonomy / a formalized, recognized role. **Eve's work sits under Regen Commons** (not RC), so any RC support would flow via the Regen Commons relationship — e.g. surfacing her initiative as a project on the Regen Coordination Fund. Tension with Afo over past fund allocation + "outputs vs outcomes" left **unresolved**.
- [ ] **(Impact metric) Track projects funded/supported** — coordination rounds, 1:1 mentoring calls, total projects supported as a low-hanging-fruit impact number for reporting.
- [ ] **(Compensation) Track time on synthesis tasks** — keep compensation **flexible/trust-based**; log hours rather than fixing budgets per task. Luiz OK with **reduced or no comp** for his activity reports given the delays.

## Discussion Summary

### Artizen fund & project strategy
- **Mechanics:** projects enter funds that have matching pools; each week has a matching multiplier (this week 1x; opening week was 3x). **Matching is unlocked only by artifact purchases** (donations), not boosts. Separately, weekly **fund drives** (e.g. "Base Camp") pay **cash prizes** won via a combination of that week's sales + **boost points**. Renee has been tuning the boost/matching calc to lean more on boosts (cash-only can create discrepancy and reduce competitiveness).
- **Strategy:** conserve boosts and internal funds; **strike within one weekly drive** when matching is high and there's a real shot at the cash prize. Green Goods' reference case: ~$8k in during a 3x week unlocked most matching + won 2nd-place cash prize via boosts.
- **Timeline:** season funds release in ~6 months (**~January**). A **reimbursement model** lets contributors recover funds then; surplus stays in RC or returns to Greenpill. Luiz to bring contribution sizing + split model to next week's ReFi council.
- **Fund-level play:** repurpose the Collective Governance Fund → **Regen Coordination Fund**, 5–10 curated projects (Bloom, BREAD Co-op, Greenpill, ReFi DAO, toolkit, poss. Edge City/TDF). Fund-level cash prizes are less competitive → more matching unlocked. Possible **rewards** to incentivize donations (TBD). Leo (Artizen-side) flagged as a possible source of gifts/support.

### Technical infrastructure & migration
- **Discourse → Hetzner self-host**, <$10/mo (from ~$100/mo). Seamless migration (brief cutover desync; full history + credentials transfer). Blocker: **billing owner (Matt)** must request the full backup from the current (managed) provider; Luiz has a draft and will try as admin first. Consistent with the repo's in-progress Hetzner self-host migration plan.
- **Astro toolkit template:** Luiz's chat with **Rather** surfaced Astro's **content layer** (data layer) as close to the interoperability layer the toolkit has been building — display content from many sources + expose content to be fetched elsewhere. Rather will prep a new **compliant Astro template** for content visualization (likely for the content-viz layer, not the whole site). Rather is also interested in a parallel **BREAD Co-op knowledge-consolidation** initiative (he led BREAD's information workstream / first public talks; Nai + others interested).
- **Fiscal sponsorship:** **SuperBenefit** floated as another nonprofit/fiscal-sponsor option (does setup/contract work for orgs; details unclear). Afo noted Green Goods got into the **Edge City fund** for internet-native institutions.

### Regen Commons status
- **Stalled.** Leadership stepped back (Nana, Benjamin; Eve pulled by work; Monty on Astera; Gregory travelling + unresponsive). The Foundation-join / institutional-home proposal Gregory drove stalled after **Nana's async pushback** (Regen Foundation is itself "headless," no incoming funding, board partly exited). **~$5k** remains (started ~$10k; ~$5k spent — Patricia's identity/branding series, Matt's contribution work, Afo hosting calls, Nana docs; cohort is over). No prioritized strategy.
- **Original sin (Gregory/SporkDAO framing):** the initiative was pitched as "money is already behind this, they just want to see structure" — which turned out **not** to be the case; people who join expecting funding get surprised.
- **Path:** RC doesn't fold in; instead build the **Regen Coordination Fund** (RC can coordinate better and already holds ~2/3 of the Commons treasury's size). Regen Commons could create a project to join the fund and build a runway; Eve's initiative could be surfaced there too. Individuals still encouraged to apply for membership.

### Eve's role & the outputs/outcomes tension *(unresolved, heated)*
- **Coi:** Eve does **far more than meditation** — she's the one genuinely creating connection and holding space; give her more autonomy and formalize/recognize it. Precision matters ("meditation is just a resource"). Coi also raised a **historical grievance**: early energy (~30 people building protocols/constitution) dissipated when a small council decided **not to reward** present contributors — a symbolic recognition (even ~$50) would have preserved connection; the perceived "council pays itself" dynamic diluted the community.
- **Afo:** pushed back on the characterization of how funds were allocated and offered full context; exchange got heated. **Matt** de-escalated ("let's drop it… I'm rooting for Regen Commons but I'm focused on my few things").
- **Outputs vs. outcomes:** Coi's framing accepted by the group — an **artifact/poll is an output**; the **outcome** is the analysis + who engages with it (e.g. how many people from ReFi DAO participated, what the poll surfaced, communicated back). Afo: the intended outcome of the polls was always to analyze responses + catalyze a workshop (hub post exists) — "before getting paid, I'd want to do that anyway."

### Budget & scope strategy
- Reviewed the **"Regen Coordination Scope and Budget"** sheet (column C = one-off retro items: hub setup, activity reports, docs update, Karma GAP, meeting-notes distillation/polls). **No long-term treasury bucket**, no operations/info-management line — keep it slim, loop surplus through **Artizen** for matching. Everything framed as **outcome-driven, not admin-task-driven**.
- Optional **~$500 post-Artizen** earmark for a possible **Greenpill/ReFi DAO/Bloom entanglement working group** (biweekly convos on structures/entangling) — Afo unsure how much to commit now; Matt frames it as a small hedge for shifting priorities over the next ~6 months.
- **Compensation:** hard to define for past activity reports / Karma GAP (many contributors, indirect support for chapters/local nodes). Keep it **flexible + trust-based** — track hours on synthesis rather than fixing per-task budgets (still a high-trust council). Luiz's reports are ~ready pending a final review; he's **fine with reduced/no comp** given the delays.

### Data analysis & impact accounting
- Distinguish **outputs vs. outcomes** (above). Analyze existing **poll data** (avg ~20–30 respondents) to catalyze future workshop planning.
- **GG23 AI valuations** = rich, underutilized data (raised by Patricia on a community call) — synthesize into a **strategic map/compass** for high-leverage community needs; **Afo to lead synthesis**, paid for the synthesis work.
- **Impact metric (low-hanging fruit):** total projects funded/supported, coordination rounds, 1:1 mentoring calls.

## Next Meeting

- **Next council sync (biweekly):** **Thursday 2026-07-31** (Matt to circulate the updated budget in Telegram beforehand; async budget discussion continues, finalize at the call).
- **Next week:** ReFi two-orgs council meeting (Luiz to raise Artizen contribution sizing) + toolkit call thread continues.

## Source

- **Source file:** `260724 Regen Coordination Council Sync.md` (vault root) — Gemini auto-notes (quick + full) with a pre-written summary, decisions, and next-steps block, plus a full speaker-labelled transcript; synthesized here 2026-07-25.
- **Speaker attribution:** complete — transcript labels Luiz, Matt (Matty Compost), Afo (Afolabi Aiyeloja), and Coi (Coi groweco). See `attendees_note`.
- **Transcript excluded** from this record per meeting-processor convention (synthesis only).
