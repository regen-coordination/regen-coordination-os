# KOI-net Integration

## What it is

- `koi-net` is a Python implementation of the KOI protocol for interoperable knowledge exchange via RIDs, manifests, bundles, and events.
- Defines event/state communication endpoints (`/events/broadcast`, `/events/poll`, `/rids|manifests|bundles/fetch`) and full/partial node patterns.

## Why it matters for regen-coordination-os

- Provides protocol-native real-time knowledge sync across nodes instead of Git-only.
- Formal way to propagate updates (`NEW/UPDATE/FORGET`) between network nodes.
- Aligns with `knowledge-commons.shared-domains` in federation.

## Integration modes

- **Content:** index knowledge commons artifacts as KOI knowledge objects (domain files, node contributions).
- **Taxonomy:** align knowledge domain metadata with RID types and manifest metadata.
- **Workflow:** trigger event emission when `knowledge/` artifacts change; nodes poll or receive webhooks.
- **Technical:** nodes run koi-net Python package directly; no TypeScript bridge required.

## Suggested sync cadence

- **Daily event sync** for changed knowledge artifacts.
- **Weekly integrity checks** (RID validity + manifest/hash consistency).

## Risks/blockers

- Requires protocol and schema discipline to avoid inconsistent RID generation.
- Adds operational overhead (node lifecycle, monitoring, retries).
- Team onboarding needed for KOI concepts before production use.

## Next actions

1. Define minimal RID scheme for regen-coordination knowledge domains.
2. Pilot event emission from one domain (e.g., regenerative-finance).
3. Validate end-to-end retrieval of manifests/bundles for changed docs.
