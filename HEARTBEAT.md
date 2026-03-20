# Regen Coordination Agent — Periodic Tasks

# These tasks run on agent heartbeat (when polled)
# Comment out or remove tasks to disable them

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
