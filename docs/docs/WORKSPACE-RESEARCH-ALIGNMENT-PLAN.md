# ReFi BCN Workspace Research & Agent Alignment Plan

Date: 2026-03-07  
Owner: Luiz + refi-bcn agent

## Objective

Build a reliable operational map of the ReFi BCN workspace (local files + Notion) and evolve agent skills, tools, and core files so day-to-day operations become faster, more consistent, and better traceable.

## Scope

- Local workspace (`data/`, `packages/`, `knowledge/`, `.well-known/`, `skills/`)
- Notion workspace (`ReFi Barcelona` root + operational data sources)
- Agent operating files (`AGENTS.md`, `HEARTBEAT.md`, `MEMORY.md`, `TOOLS.md`)
- Skill set (`skills/*`) and practical execution workflows

## Workstreams

## WS1 — Structural Research & Mapping

### Goals
- Produce an explicit map of all operational systems and where each type of truth lives.
- Detect duplication, stale records, and missing links.

### Tasks
- [ ] Build local workspace inventory map (files, data registries, schema outputs, templates)
- [ ] Build Notion map (databases, properties, relations, operational usage)
- [ ] Build cross-system map (Notion ↔ local files ↔ schemas)
- [ ] Tag each system as source-of-truth / mirror / report layer

### Deliverables
- `docs/WORKSPACE-SYSTEM-MAP.md`
- `docs/NOTION-WORKSPACE-MAP.md`
- `docs/SOURCE-OF-TRUTH-MATRIX.md`

## WS2 — Data Model & Ontology Alignment

### Goals
- Align naming and entities across ReFi BCN, ReFi DAO, and Regenerant contexts.
- Reduce friction in syncing people/projects/tasks/funding across tools.

### Tasks
- [ ] Compare Notion schemas with `data/*.yaml`
- [ ] Define canonical entity IDs and alias rules
- [ ] Define status/state normalization map (Notion statuses ↔ IDEA stages ↔ HEARTBEAT tasks)
- [ ] Document mismatch and migration recommendations

### Deliverables
- `docs/DATA-MODEL-ALIGNMENT.md`
- `knowledge/normalization-log.md` updates (when conflicts are resolved)

## WS3 — Skills Upgrade Program

### Goals
- Tune each skill for real ReFi BCN operational workflows.
- Add deterministic scripts where repeated manual work exists.

### Tasks
- [ ] Audit each skill trigger description for operational specificity
- [ ] Add role-specific runbooks in `references/` (funding, weekly ops, partner pipeline)
- [ ] Add scripts for repetitive sync/report tasks
- [ ] Add validation checklists per skill

### Priority Skills
1. `meeting-processor` (Notion notes → structured ops records)
2. `heartbeat-monitor` (deadline/risk escalation from tasks + funding)
3. `funding-scout` (pipeline monitoring with eligibility flags)
4. `knowledge-curator` (cross-channel synthesis with source traceability)
5. `capital-flow` (draft-only treasury flows + compliance reminders)
6. `schema-generator` (post-change verification and drift detection)

### Deliverables
- Iterated `skills/*/SKILL.md`
- New skill references/scripts where needed
- `docs/SKILL-CAPABILITY-MATRIX.md`

## WS4 — Core File Alignment

### Goals
- Make core files operational, not placeholder-heavy.
- Ensure startup and heartbeat behavior match actual team rhythm.

### Tasks
- [ ] Replace placeholder blocks in `HEARTBEAT.md` with concrete recurring routines
- [ ] Update `TOOLS.md` with current integrations (no secrets)
- [ ] Refine `AGENTS.md` startup/decision rules after WS1 findings
- [ ] Keep `MEMORY.md` active context synchronized with current priorities

### Deliverables
- Updated `HEARTBEAT.md`, `TOOLS.md`, `AGENTS.md`, `MEMORY.md`

## WS5 — Automation & QA

### Goals
- Reduce manual overhead and prevent drift.

### Tasks
- [ ] Add routine checklists for schema freshness and data drift
- [ ] Add operational sync cadence (daily/weekly/monthly)
- [ ] Add lightweight quality gates before publishing updates

### Deliverables
- `docs/OPERATIONS-QA-CHECKLIST.md`
- Optional cron plan for recurring checks

## Execution Cadence

### Phase 1 (Immediate: 2-3 sessions)
- Complete WS1 map and WS2 mismatch inventory.
- Make minimum core-file updates to support ongoing work.

### Phase 2 (Next: 3-5 sessions)
- Execute WS3 skill upgrades for top 3 priority skills.
- Pilot workflows in weekly ops cycle and iterate.

### Phase 3 (Stabilization)
- Complete remaining skill upgrades.
- Lock QA routines and maintain cadence.

## Definition of Done

- We can answer within minutes:
  - where each operational truth lives,
  - which file/database owns each entity,
  - how updates propagate to `.well-known/` outputs.
- Core skills execute with fewer ad-hoc prompts and clearer outputs.
- HEARTBEAT/MEMORY reflect real operations with minimal placeholder content.
- Notion and local OS artifacts are aligned enough for weekly execution without rework.
