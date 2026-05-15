# Regen Coordination Agent — Periodic Tasks

# These tasks run on agent heartbeat (when polled)
# Comment out or remove tasks to disable them

## Active Action Items

_Sources: 2026-04-23 Toolkit Planning · 2026-04-24 Council · 2026-04-28 Greenpill Growth · 2026-05-08 Council. Full sets tracked per meeting record in `packages/operations/meetings/`._

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
- [ ] Luiz: Karma GAP activities report

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
