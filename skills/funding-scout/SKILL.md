---
name: funding-scout
version: 1.0.0
description: Network-wide funding opportunity tracking for Regen Coordination nodes
author: regen-coordination
category: coordination
metadata:
  openclaw:
    requires:
      env: []
      bins: []
      config: []
---

# Funding Scout (Regen Coordination)

## What This Is

Network-specific funding scout with awareness of Regen Coordination's active platform relationships, domain pool strategy, and multi-node coordination.

This extends the base `funding-scout` skill with network context.

## Network Funding Strategy

Regen Coordination pursues a **domain-based funding pool** approach:

1. **Domain pools** aggregate funding from multiple sources around shared domains
2. **Current priority domains:** Waste Management, Regenerative Finance
3. **Primary platforms:** Artisan (seasonal), Octant (quarterly), Impact Stake (ongoing)

### Domain Pool Status (as of 2026-02-20)

See `funding/` directory for pool configs:
- `funding/regenerative-finance/pool-config.yaml` — designing
- `funding/waste-management/pool-config.yaml` — designing

## Network Platform Relationships

Status and relationship posture (update as relationships evolve):

| Platform | Relationship | Status | Notes |
|----------|--------------|--------|-------|
| Artisan | Active platform relationship | Active | Season 6 active; artifacts drive donations + matching, votes are signaling |
| Octant | Active platform relationship | Exploring | Vault strategy TBD |
| Impact Stake | Council-led strategy | Active | 1/3-1/3-1/3 model in implementation |
| Superfluid | Platform tracking | Active | Check Season 6 |
| Spinach | Platform tracking | Active | Monthly renewal |
| Celo PG | Ecosystem relationship | Low activity | Post-funding period |
| Gitcoin GG24 | Domain co-design relationship | Pipeline | Ethereum Localism DDA co-design track |

## Current Priority Signals (2026-03 update)

### Artisan Season 6

- Track both channels distinctly:
  - **Votes** indicate perceived relevance by fund managers.
  - **Artifacts** unlock real fundraising through donation + matching flows.
- Capture season windows and deadlines per pool because season resets affect momentum.

### Impact Stake

- Treat Impact Stake as active in tracking.
- Track implementation of the council-aligned 1/3-1/3-1/3 split strategy (ReFi DAO / GreenPill / Bloom).
- Monitor ETH target progress and yield allocation pathways.

### Gitcoin GG24 / Ethereum Localism DDA

- Track DDA readiness signals (co-design milestones, steward alignment, pilot round commitments, sponsor conversations).
- Prioritize opportunities that support 3-5 pilot rounds and can compound into 2026 scale-out.

## Cross-Node Opportunity Sharing

When a node's funding-scout discovers an opportunity:
1. Adds to local `data/funding-opportunities.yaml`
2. Syncs to this OS via GitHub Action (push to `knowledge/<domain>/from-nodes/<node>/`)
3. This OS aggregates into network-wide view
4. All nodes see opportunity on next sync

## Funding-Scout References

See `references/funding-platforms.yaml` for the full platform database (kept up to date by this repo).

## For Full Instructions

See base skill in `organizational-os-template/skills/funding-scout/SKILL.md` for complete workflow.
