---
id: operations-consolidation
title: "Operations Consolidation: workspace hygiene, Notion sync, CRM migration, service packages"
status: queued
priority: 5
scope: refi-bcn-os
depends_on: []
created: 2026-04-15
started: null
completed: null
estimated_sessions: 3
tags: [operations, notion, crm, workspace, services]
category: operations
related_to:
  - type: plan
    id: notion-integration
  - type: plan
    id: notion-db-audit
  - type: area
    id: knowledge-and-infrastructure
---

## Goal

Consolidate all scattered operational tasks into a single cohesive plan: complete the workspace structural map, finish Notion infrastructure review (T5–T9), establish the weekly Notion sync protocol, migrate CRM to local data using Andrea's ontology, process remaining meeting notes, and define service packages for the website.

## Done

- [x] Notion API key path fixed — correct DB IDs, dotenv support, dual-path docs _(2026-04-15)_
- [x] First reconciliation snapshot produced and logged to `docs/FEEDBACK-ACTION-REGISTER.md` _(2026-04-15)_
- [x] Process-implementation checkpoint #1 written _(2026-04-15)_
- [x] 260414 weekly ops sync processed into `packages/operations/meetings/` _(2026-04-15)_
- [x] `data/relationships.yaml` created (8 entities, 8 relationships) 
- [x] `data/pending-payouts.yaml` created (6 pending payouts)

## Tasks

### Workspace structure

- [ ] Complete workspace structural map and publish to `docs/WORKSPACE-SYSTEM-MAP.md`
- [ ] Align core files (`AGENTS.md`, `TOOLS.md`, `HEARTBEAT.md`, `MEMORY.md`) with current operational rhythm
- [ ] Fix docs/workflow drift: missing `docs/PACKAGES.md` reference and schema workflow path assumptions
- [ ] Run `npm run generate:schemas` after data changes

### Notion infrastructure review (T5–T9)

- [ ] **T5**: Archive or update outdated projects in Notion (33 projects, ~18 stale)
- [ ] **T6**: Sync active projects to local `data/projects.yaml` — reconcile Notion's 43 projects with local 24
- [ ] **T7**: Extract urgent tasks from Notion to `HEARTBEAT.md`
- [ ] **T8**: Document weekly sync protocol in `docs/SOURCE-OF-TRUTH-MATRIX.md` (overdue since 2026-03-17)
- [ ] **T9**: Test first sync cycle — run full Notion → local reconciliation and log results
- [ ] Mirror Projects & Areas split on Notion side (add `type: area` vs `project` distinction)

### Meeting notes processing

- [ ] Process and sync remaining ReFi BCN weekly ops notes from Notion into `packages/operations/meetings/`
- [ ] Maintain `docs/FEEDBACK-ACTION-REGISTER.md` as mandatory feedback→action control loop

### CRM migration

- [ ] Plan CRM-to-database migration using Andrea's ontology framework (individuals, orgs, territory mapping, areas of work)
- [ ] Expand `data/relationships.yaml` from 8 entities to cover top 20-50 (tier 1 per 260414 decision)
- [ ] Define enrichment workflow: LinkedIn input → agent processing → knowledge base integration

### Service packages

- [ ] Define service packages: fundraising support, knowledge base creation, content production
- [ ] Write descriptions and case studies for each package
- [ ] Prepare for website integration (coordinate with `services-packages` backlog plan)

### Workspace indexing

- [ ] Implement `docs/WORKSPACE-INDEXING-RETRIEVAL-IMPLEMENTATION-PLAN.md` (Phase 0 + Phase 1)

## Verification

- [ ] `docs/WORKSPACE-SYSTEM-MAP.md` is complete and accurate
- [ ] Notion projects match local `data/projects.yaml` (no duplicates, stale items archived)
- [ ] Weekly sync protocol documented and tested end-to-end
- [ ] CRM has 20+ tier-1 entities with enriched data
- [ ] Service packages have written descriptions ready for website
- [ ] `npm run validate:schemas` passes after all data changes

## References

- `docs/FEEDBACK-ACTION-REGISTER.md` — Notion reconciliation log
- `docs/SOURCE-OF-TRUTH-MATRIX.md` — sync protocol and freshness metrics
- `docs/NOTION-INTEGRATION-LOG.md` — sync history
- `docs/WORKSPACE-INDEXING-RETRIEVAL-IMPLEMENTATION-PLAN.md` — indexing phases
- `data/relationships.yaml` — CRM local mirror
- `docs/plans/notion-integration.md` — bidirectional sync plan (related)
- `docs/plans/notion-db-audit.md` — data audit plan (related)
