# Regen Coordination Agent — Periodic Tasks

# These tasks run on agent heartbeat (when polled)
# Comment out or remove tasks to disable them

## Active Action Items

_Source: 2026-04-23 Regen Web3 Toolkit Planning Call — full set tracked in `packages/operations/projects/regen-web3-toolkit.md`._

- [ ] Join Open Civics Consortium chat via website (Luiz) — coordinate May hackathon invitation
- [ ] Validate OrgoS embed approach (`feature/org-os-overlay`) + Bread Co-op OS bootstrap with the team on next planning call (~2026-05-07)
- [ ] Confirm May hackathon date once Matt's group locks it in
- [ ] Initialize Bread Co-op OS instance using OrgoS template; surface Durgadas's CSIS power-distribution standards during deployment (Luiz + Durgadas) — `03 Libraries/bread-coop-os/`

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
