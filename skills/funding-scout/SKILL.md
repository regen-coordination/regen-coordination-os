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

Key contacts and status (update as relationships evolve):

| Platform | Contact | Status | Notes |
|----------|---------|--------|-------|
| Artisan | Swift | Active | Season 6 launching |
| Octant | James | Exploring | Vault strategy TBD |
| Impact Stake | — | Evaluating | 1/3-1/3-1/3 model |
| Superfluid | — | Active | Check Season 6 |
| Spinach | — | Active | Monthly renewal |
| Celo PG | Marek | Low activity | Post-funding period |

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
