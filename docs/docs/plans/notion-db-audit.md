---
id: notion-db-audit
title: "Data Audit & Notion Integration — Build Source of Truth Locally, Propagate to Notion"
status: queued
priority: 7
scope: refi-bcn-os
depends_on: [notion-integration]
created: 2026-04-07
started: null
completed: null
estimated_sessions: 2-3
tags: [notion, audit, data, integration, operations]
category: integrations
related_to:
  - type: area
    id: refi-bcn-os
  - type: plan
    id: notion-integration
---

## Goal

Go through each operational domain (projects, governance, tasks, meetings, finances) together with the operator. For each: audit what we have locally, compare with Notion (which is outdated), build the accurate source of truth in `data/*.yaml`, then configure propagation back to Notion.

**Direction: local YAML is primary → propagate to Notion.** Notion is a read target, not the source. We build truth here.

_Merges scope from former `project-management-audit` plan (projects, heartbeat, finances audit)._

## Context

- Notion workspace is outdated — cannot be trusted as source of truth
- Local `data/*.yaml` files are populated (15 registries, all schema_version 2.0) but need accuracy review
- Notion MCP available for querying and updating
- ReFi BCN has 14 active projects, 3 core members, cooperative in formation
- `data/projects.yaml` has 25+ entries including archived — needs active/stale audit
- HEARTBEAT.md is 140 lines (Q1 archived) but may have stale items
- `data/finances.yaml` tracks Celo Safe treasury — needs balance verification

## Flow Per Domain

For each domain, follow this sequence with the operator:

1. **Audit local** — Review `data/*.yaml` for accuracy, staleness, gaps
2. **Compare Notion** — Query the corresponding Notion DB, identify what's different or missing
3. **Build truth** — Update `data/*.yaml` with the operator to reflect current reality (neither Notion nor existing YAML may be fully correct)
4. **Map fields** — Document the field mapping for propagation
5. **Configure propagation** — Set up local → Notion sync direction

## Domains to Walk Through

### 1. Projects — `data/projects.yaml` ↔ Notion Projects DB
- 25+ entries locally (14 active, 2 backlog, 1 idea, rest archived/done)
- Audit: which projects are actually active? stale? misattributed?
- Cross-reference any `projects/` directory READMEs with projects.yaml — reconcile mismatches
- Verify Regenerant Catalunya project status and data are current
- Clean up statuses, leads, dates with operator
- Propagate corrected state back to Notion

### 2. Governance — `data/governance.yaml` ↔ Notion
- Review governance structure: cooperative formation status (Bloc4 incubation)
- Are current governance entries reflecting the cooperative-in-formation model?
- Update `data/governance.yaml` to reflect current decision model (consent-based)

### 3. Tasks — `HEARTBEAT.md`
- HEARTBEAT.md has accumulated items — some may be stale (Localism Fund report was due Apr 5)
- Audit: which tasks are real, current, and assigned?
- Rebuild clean task list with operator
- Decide: keep HEARTBEAT.md format or move to `data/tasks.yaml`?

### 4. Meetings — `data/meetings.yaml` ↔ Notion Meetings DB
- 38 meetings indexed locally (from schema generation)
- Compare with Notion Meetings DB — what's missing on each side?
- Verify dates, attendees, action items

### 5. Finances — `data/finances.yaml` (+ `data/pending-payouts.yaml`)
- Verify treasury state against Celo Safe (0x91889ea97FeD05180fb5A70cB9570630f3C0Be77)
- Review pending payouts (170 lines in pending-payouts.yaml)
- Verify numbers reflect actual state
- Flag anything needing operator input (balances, pending payouts)

### 6. Members — `data/members.yaml`
- 3 core members currently — verify roles and status are current
- Cross-reference with `data/relationships.yaml` (128 lines) for CRM accuracy

### 7. Funding — `data/funding-opportunities.yaml`
- 14 opportunities mapped (last updated Mar 19)
- Audit: are deadlines still accurate? Any new opportunities?
- Localism Fund Report status (was due Apr 5 — resolved?)

## Outputs

After completing all domains:
- Clean, audited `data/*.yaml` files reflecting current org reality
- Updated `HEARTBEAT.md` with only current, real tasks
- Field mappings documented for Notion propagation
- Reconciliation matrix: local = canonical for all domains
- Propagation config ready for sync scripts

## Verification

- [ ] All 7 domains reviewed with operator
- [ ] `data/*.yaml` files reflect current organizational state
- [ ] HEARTBEAT.md cleaned of stale items
- [ ] Field mappings documented per domain
- [ ] Propagation direction confirmed: local → Notion
- [ ] `npm run generate:schemas` passes after data updates
