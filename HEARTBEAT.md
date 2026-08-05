# Regen Coordination Agent — Periodic Tasks

# These tasks run on agent heartbeat (when polled)
# Comment out or remove tasks to disable them

## Active Action Items

_Sources: 2026-04-23 Toolkit Planning · 2026-04-24 Council · 2026-04-28 Greenpill Growth · 2026-05-08 Council · 2026-05-15 Council · 2026-07-03 Matty TG update (scope/budget) · 2026-07-10 Council · 2026-07-24 Council · 2026-08-01/02/03 Matt + Afo TG (Artizen August drive). Full sets tracked per meeting record in `packages/operations/meetings/`._

### ⏱ Artizen August drive — CLOSES THURSDAY 2026-08-06 (260803)
_Plan: `docs/260803 Artizen August Drive - Action Plan.md`. Sources: Afo TG 07-30/08-02/08-03, Matt TG 08-01. Gap: 260730 toolkit session notes not yet received (requested from Afo). Decision gate is **Wed 08-05** when Afo returns competitive thresholds._
- [ ] Luiz (today): Check real boost balance + claim code `8MQQ82` at grow.artizen.fund (~600k is the stale 260724 figure)
- [ ] Luiz (today): Send the 4 blocking questions to Afo — fund-level scoring basis + winning threshold, real matching ratio (4:1 vs public 1:1-per-fund), fund pool remaining + dilution across 8 curated projects, boost-email mechanics (draft §6.1)
- [ ] Luiz (today): Send Matt the Gardens-timing + ownership-map blockers, and the 3-of-6 signature heads-up (draft §6.2)
- [ ] Luiz (today): Email venus@artizen.fund to confirm boost-email mechanics before running the campaign (draft §6.4)
- [ ] Luiz (Wed 08-05): **Decide boost allocation** — RC Fund vs Green Goods — on Afo's thresholds. Council default (260724) is RC Fund first, Green Goods with the remainder
- [ ] Luiz (Wed–Thu, optional): Supporter email campaign for boost points — 1,000/person, 300k cap (~50% increase on current stack). Targeted list, not a blast (draft §6.3)
- [x] ~~Luiz: Email venus@artizen.fund to transfer the `regen-coordination` project to Matt~~ — ✅ **DONE 2026-08-05, transfer complete.** Matt owns the project
- [ ] **Luiz (TODAY/Thu AM): Create the ReFi DAO project** — must exist before Thursday's curation cutoff or it misses next week's drive entirely; last remaining Luiz-side blocker on the fund play
- [ ] Luiz (Thu): Accept the RC Fund curator invite
- [ ] Luiz (Thu, before close): Spend boosts per the Wednesday decision
- [x] ~~Matt: Confirm which entry converts to what~~ — **RESOLVED 2026-08-03 by Afo:** Luiz's `regen-coordination` entry transfers to Matt as-is (via email to Venus); Rather owns a separate Toolkit profile; Luiz creates ReFi DAO fresh. Matt's 08-01 map stands
- [ ] Matt: Gardens toolkit-pool setting change + proposal to move ~$1,000 to treasury — **conviction accrues over days; if not already in flight it cannot clear before Thursday** (risk R1)
- [ ] Matt: Collect 3-of-6 multisig signatures for the $250 fund unlock — treasury holds only 260 USDGLO, so this is essentially all liquid GLO (risk R2)
- [ ] Matt: Rather's confirmation as toolkit project owner (DM'd 08-01)
- [ ] Afo: Confirm the Luiz + Matt curator invites landed on the Regen Coordination Fund
- [ ] Afo: Send the 260730 toolkit session notes
- [ ] **Team (Thu agenda) ⚠️ Name a January custodian + write the reimbursement terms down** — season funds release ~Jan 2027 but RC winds down end of Q3 2026; capital deployed this week returns ~3 months after the council stops existing (risk R3)
- [ ] Team (Thu agenda): Fund curation list — 8 projects (ReFi DAO, Greenpill, Bread Coop, Bloom, Regen Commons, Grassroot Economics, Regen Coordination, Regen Toolkit) vs. starting at 5, pending the dilution answer

### Regen Coordination Fund, Artizen, Discourse & budget scope (260724 — latest council)
_Meeting record: `packages/operations/meetings/260724 Regen Coordination Council Sync.md`. Reinforces RC wind-down; active workstreams: toolkit + BREAD + the new Regen Coordination Fund + Discourse migration + budget close-out. Next council sync: Thu 2026-07-31 (biweekly)._
- [ ] Afo: Revamp the Collective Governance Fund → **Regen Coordination Fund** (5–10 curated projects) before next meeting; Renee OK'd it
- [ ] Afo: Notify existing fund projects re: reorganization + removal (thank-you email)
- [ ] Afo: Recruit new partners (Bloom, BREAD Co-op, other selected communities) into the fund
- [ ] Afo: Synthesize GG23 AI valuations + poll data for future coordination (paid synthesis; feeds community workshop) — elevates the 260710 deferred GG23 item
- [ ] Matt: Process reimbursements — submit a transaction for outstanding expenses + request signatures
- [ ] Matt: Update budget doc — earmark funds toward Regen Coordination + toolkit; reflect outputs-vs-outcomes framing; **scope for remainder of Q3**; notify Telegram when updated (connects to `rc-scope-budget`; supersedes the 260710 "clean up budget doc" item below)
- [x] ~~Luiz: Request the Discourse full-data backup from the current managed provider~~ — **DONE 2026-07-29: migration complete.** `hub.regencoordination.xyz` now self-hosted on Hetzner cx23 (€6.49/mo + €1.30 snapshots) — from ~$100/mo, ~**$1,100/yr saved**. Same domain/logins/content, zero data loss; email (Brevo) + Discord login verified. Runbook: `docs/runbooks/discourse-hub-ops.md`
- [ ] **Luiz → Afo/Matty: hub ops handoff** — add both to the Hetzner + Cloudflare accounts, walk through the runbook, agree monthly `./launcher rebuild app` rotation
- [ ] Luiz: Hub offsite backups → Cloudflare R2 (`backup_location=s3`). Currently backups live on the same server; Hetzner snapshots are the only off-box copy
- [ ] Luiz: Hub uptime monitoring + alerts to Afo/Luiz
- [ ] **Luiz → Monty: confirm `regencoordination.xyz` auto-renew — domain expires 2026-10-10** (Namecheap, Monty is owner). If it lapses the hub goes down regardless of hosting
- [ ] Luiz: Convert the Artizen project → **Regen Toolkit project** and join it to the new fund; open a ReFi DAO project if useful _(→ **conflicts with Matt's 08-01 map** — see risk R4 in the August drive section above; do not execute until resolved)_
- [ ] Luiz: Bring Artizen contribution sizing + split model to next week's ReFi two-orgs council
- [ ] Luiz: Apply for Regen Commons membership — submit the form (long overdue; reaffirmed again 260724)
- [ ] Team: Coordinate Artizen boosts + funds within a **single high-matching weekly drive** (drives end Thursday) — matching is artifact-only; boosts drive cash prizes _(→ **this is that week** — executing via the August drive section above)_
- [ ] Team (unresolved): Eve's role/autonomy — she does more than meditation (community connective tissue). Her work sits under **Regen Commons**, so RC support flows via the Commons (e.g. surface as a Regen Coordination Fund project). Heated Coi↔Afo exchange on past fund allocation left open
- [ ] Team (impact metric): Track projects funded/supported, coordination rounds, 1:1 mentoring calls
- [ ] Team (compensation): Track time on synthesis; keep comp flexible/trust-based; Luiz OK with reduced/no comp for his activity reports

### Toolkit, Discourse, budget & wind-down (260710 — cadence now BIWEEKLY)
_Meeting record: `packages/operations/meetings/260710 Regen Coordination Council Sync.md`. RC in deliberate wind-down; only toolkit + BREAD distribution remain active; target end of Q3 for conclusion clarity. Next council sync: Thu 2026-07-23 (toolkit call Thu 2026-07-16)._
- [ ] Matt: Hand off master doc (one more loop) + resources database (Excel) — primary input for OS ingestion
- [ ] Matt: Audit Gitcoin funds the toolkit qualifies for; decide whether a separate toolkit project entry is needed ("Region Coordination" name may confuse funders)
- [ ] Matt: Route idle Gardens funds (~2.4k) + BREAD through Artizen for matching (Masabi's $1,200 direct proposal set aside)
- [ ] Matt: Clean up budget doc — drop column A, delete vague line items, concrete numbers + single owners; who pays now vs. waits — connects to `rc-scope-budget` _(→ folded into the 260724 "Update budget / scope Q3" item above)_
- [ ] Luiz: Reprocess a subset of Heenal's repo content with new framework specs → visual, concrete diff before next demo (focus time next week)
- [ ] Luiz: Plan + execute toolkit repo migration to the Regen Coordination GitHub org (from Heenal's account; no blockers)
- [ ] Luiz: Decide + propose OS-overlay-into-`main` vs. separate branch
- [ ] Luiz: Integrate the eight forms of capital into the framework (master-doc gap surfaced by ontology comparison)
- [ ] Luiz: Confirm Discourse admin access (Mede + Alpha; not via Google login) and begin forum migration — starting next week (supersedes the 260515 self-host investigation task below) _(→ progressed at 260724: host = Hetzner self-host, blocker is the full-backup request from the current managed provider; see 260724 item above)_
- [ ] Luiz: Set up three-way toolkit call with Matt + Rather — skip next week; confirm Rather's interests first (likely GeoBrowser)
- [ ] Luiz: Submit personal Regen Commons membership application (long overdue)
- [ ] Luiz: ReFi DAO knowledge commons — continue joint review with Monty; decide KOI ("CAR"/BlockScience, Regen Network) integrate-now vs. defer-interoperable (Gregory pinged)
- [ ] Luiz: Revisit toolkit visualization — FigJam board / Obsidian Canvas / Codex-Claude diagrams (not urgent)
- [ ] Team (deferred): Education content initiative — curated NotebookLM content, group-approved, dropped into a closed Telegram channel; toolkit as shared substrate
- [ ] Team (deferred): Compost GG23 AI-evaluation data + poll signals (20–30 respondents) into a workshop/education series — poss. with Regen Pollination

### RC Scope & Budget project (260703 — project `rc-scope-budget`)
_Matt's core-functions synthesis + $2,450 Q2/Q3 council budget, now a tracked project: `packages/operations/projects/rc-scope-budget.md`_
- [ ] Council: Share feedback on scope/budget sheet — what each member wants to contribute to or drive ("not much feedback" so far per Matt)
- [ ] Matt: Finish brain-dump + budget formulas; map concrete proposal options
- [ ] Luiz: Review finalized 2025 activities report punch list (`docs/reports/2025-activities-report-karma-gap.md`) → submit to Karma GAP (budget line 8, $250)
- [x] ~~Luiz: Decide on owning hub self-hosting (budget line 7, $250 placeholder)~~ — **RESOLVED 2026-07-29.** Self-host live; **actual infra cost ≈ €7.79/mo (~$8.40)**, i.e. ~$100/yr vs the $250 placeholder. Remaining question for council is only the *labour* rate for the build + ongoing ops (Afo/Matty), not the hosting line
- [ ] Team: Agenda the scope/budget doc for the next council sync — it's been ready since 260508 without discussion

### Regen Commons cohort kickoff (260515 — HARD DEADLINE 2026-05-28)
- [ ] Luiz: Fill Regen Coordination organizational membership form for Regen Commons cohort (before kickoff 2026-05-28)
- [ ] Luiz: Configure official RC email via Cloudflare email routing — coordinate with Monty on domain access
- [ ] Luiz: Assess Regen Commons integration process — official path for working group/subgroup initiation
- [ ] Luiz: Verify active ReFi DAO voting status in personal wallets

### Hub-as-primary-platform (260515)
- [ ] Team: Automate hub posting of call summaries to drive community engagement
- [ ] Team: Draft forum thread on hub re: future structure + potential elections (end-of-year election signal)
- [ ] Afo: Add missing Regen Commons logo to hub
- [ ] Afo: Share Green Pill website preview to group by Monday for feedback
- [ ] Investigate Discourse self-hosting on VPS (Fly.io / Google Cloud) — cut $100/mo custom-domain cost

### Gardens public-goods proposal (260515)
- [ ] Coi: Update Gardens-integration Gitcoin proposal vote
- [ ] Coi: Rally support in community groups (needs 6–7 more votes to clear 22 threshold)
- [ ] Coi + Afo: Coordinate afternoon Green Goods discussion

### Stewardship + governance evolution (260515 — Coi's call)
- [ ] Team: Adopt stewardship categories (active / inactive / merit-legacy) for council
- [ ] Team: Define standardized membership protocol + periodic elections
- [ ] Team: Brand integrity monitoring protocol (Next State incident as reference)
- [ ] Team: Identify which AI-focused spend can be paused until specific real needs are mapped

### Toolkit handoff (260508 — TIME-SENSITIVE)
- [ ] Luiz: Process Matt's toolkit master doc (markdown, completed 2026-05-08) into `feature/org-os-overlay` workspace; target accessible before next toolkit call (~2026-05-22)
- [ ] Initialize Bread Co-op OS instance using OrgoS template; surface Durgadas's CSIS power-distribution standards during deployment — `03 Libraries/bread-coop-os/`
- [ ] Confirm May hackathon date once Matt's group locks it in
- [ ] Join Open Civics Consortium chat via website (Luiz) — coordinate hackathon invitation

### Ma Earth Fund window (260508 — opens ~week of 2026-05-15, runs through June)
- [ ] Team: Map legal entity / fiscal-sponsor status across all chapters (eligibility gate: nonprofit/501c3/charity/NGO/sponsor required) — track as registry category
- [ ] Team: Blast Ma Earth opportunity to network circles; attend next Ma Earth call
- [ ] Brazil: Secure fiscal sponsor for this round (own registry by December)

### Artizen pipeline (260424 + 260508)
- [ ] Luiz: Finalize + submit Bonfires Fund application for OrgoS (draft at `docs/260429 Artizen Bonfires Fund - Application.md`)
- [ ] Luiz: Submit Collective Governance Fund application (draft at `docs/260429 Artizen Collective Governance Fund - Application.md`)
- [ ] Luiz: Frame-language scrub on rhetorical-fund drafts (Bonfires + Solarpunk Pirate) per Durgadas critique
- [ ] Luiz: Email Venus@Artisan.fund for fund-fit recs; DM Renee on TG for Monday-call access (10am Pacific)
- [ ] Luiz: Karma GAP activities report — 2025 report finalized at `docs/reports/2025-activities-report-karma-gap.md`; punch-list confirm + submission remain (see rc-scope-budget section above)

### Coordination / personal (260508)
- [ ] Luiz: Apply Durgadas coordination-suite prompts to overload/role situation; consult Durgadas as mentor
- [ ] Luiz: Consider governance/coordination consulting positioning as service offering

### Cross-cutting (260508)
- [ ] Team: Project-aggregation strategy for Artisans — per-individual balance approach
- [ ] Team: Draft brand guidelines for region coordination (protect from appropriation; avoid micromanagement)
- [ ] Team: Follow up on Region Commons membership pathway; register for monthly KOI calls

## Weekly Tasks (Mondays)

### Knowledge Aggregation Check
- Check for new node contributions in knowledge/*/from-nodes/
- Update aggregated/index.md timestamps if needed
- Trigger: cron(0 6 * * 1) — handled by GitHub Actions

### Funding Opportunity Scan
- Review Artisan, Octant, Superfluid, Gitcoin for new opportunities
- Check data/funding-opportunities.yaml for stale entries
- Alert on upcoming deadlines

## Daily Tasks

### Forum Monitoring
- Check hub.regencoordination.xyz/latest.json for new topics
- Flag action items, proposals, funding opportunities
- Update knowledge/network/ if significant announcements

### Node Status Check
- Review MEMBERS.md for node sync status
- Flag nodes with >30 days since last sync
- Prepare council call agenda items if needed

## On-Demand Triggers

- After council calls: Process meeting transcript via meeting-processor
- After funding announcements: Update data/funding-opportunities.yaml
- After new node joins: Update MEMBERS.md, data/nodes.yaml, federation.yaml
