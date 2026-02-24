# Funding Platforms Integration

## What it is

- Domain-based funding pool strategy: aggregate funding from multiple sources around shared domains.
- Platform database: Artisan, Octant, Impact Stake, Superfluid, Gitcoin, Spinach, Celo PG, Arbitrum, StreamVote.
- Canonical source: `skills/funding-scout/references/funding-platforms.yaml`.

## Why it matters for regen-coordination-os

- Network pursues domain pools for Regenerative Finance and Waste Management.
- funding-scout skill uses platform data to track opportunities, sync discoveries, and support pool design.
- Nodes contribute opportunities; hub aggregates into network-wide view.

## Integration modes

- **Content:** platform status, mechanics, contacts in `funding-platforms.yaml`; pool configs in `funding/<domain>/`.
- **Workflow:** funding-scout discovers → adds to local `data/funding-opportunities.yaml` → syncs to hub via GitHub Action.
- **Technical:** funding-scout skill references `funding-platforms.yaml`; domain pools declared in `federation.yaml` knowledge-commons.

## Suggested sync cadence

- **Weekly** platform status review (contacts, cadence, notes).
- **Event-driven** when new platforms or rounds launch.

## Risks/blockers

- Platform relationships are relationship-driven; contact turnover can create gaps.
- Some platforms (e.g., Octant) have vault strategy TBD.

## Next actions

1. Complete pool-config.yaml for regenerative-finance and waste-management domains.
2. Add taxonomy crosswalk for platform types (quadratic, yield-distribution, streaming, etc.).
3. Document governance model for domain pool allocation decisions.
