# Workspace + Channel Indexing & Retrieval Implementation Plan

Date: 2026-03-07  
Owner: Luiz + refi-bcn agent  
Status: Active (implementation-ready)

## 1) Objective

Build and maintain a **single operational knowledge system** where all relevant organizational information (workspace files, operational records, channel insights, and key decisions/feedback) is:

1. Indexed,
2. Easy to retrieve,
3. Continuously updated,
4. Reliably logged into action.

---

## 2) Current State (Baseline)

## Organization understanding (current)
- Org: **ReFi Barcelona (ReFi BCN)** — local ReFi node/cooperative-in-formation.
- Mission: bridge local regenerative initiatives in Barcelona/Catalonia with global regenerative finance infrastructure.
- Operator: **Luiz Fernando Gomez Segala**.

## Active local operational records
- `data/members.yaml`: **10** entries
- `data/projects.yaml`: **3** entries
- `data/meetings.yaml`: **3** entries
- `data/finances.yaml`: **3 budgets / 1 expense / 3 revenues**
- `data/funding-opportunities.yaml`: **0** entries (priority gap)

## Systems already mapped
- Notion root + operational databases mapped in:
  - `docs/NOTION-WORKSPACE-MAP.md`
  - `docs/WORKSPACE-SYSTEM-MAP.md`
  - `docs/SOURCE-OF-TRUTH-MATRIX.md`
- Continuous research/alignment mode already encoded in `MEMORY.md` and `HEARTBEAT.md`.

## Reliability improvements already done
- Memory search switched to local embeddings provider (no dependency on invalid OpenAI embeddings key).

---

## 3) Target End State

A repeatable operating system where:
- README acts as **master index/entrypoint**.
- Every major domain has a canonical source + sync policy.
- Meeting/channel insights become structured records (projects/tasks/decisions).
- Feedback from Luiz is always captured, linked to concrete actions, and tracked to closure.
- Retrieval is fast through clear indexes + memory + structured registries.

---

## 4) Indexing Architecture (What gets indexed)

## Layer A — Canonical Core (authoritative records)
- Identity/context: `SOUL.md`, `IDENTITY.md`, `USER.md`, `MEMORY.md`, `HEARTBEAT.md`, `TOOLS.md`
- Structured registries: `data/*.yaml`
- Machine-readable outputs: `.well-known/*.json`

## Layer B — Operational Knowledge (derived but durable)
- Processed meetings: `packages/operations/meetings/`
- Project operations: `packages/operations/projects/`
- Domain knowledge: `knowledge/`
- Planning/mapping docs: `docs/*`

## Layer C — Channels & External Inputs
- Notion databases (CRM, Projects, Tasks, Notes, Research, Hours)
- Session/channel conversations (agent memory sessions)
- Linked repos under `repos/` (especially Regenerant-Catalunya, ReFi-BCN-Website, ReFi-Barcelona)

## Layer D — Retrieval Interfaces
- README navigation index
- Domain maps (`WORKSPACE-SYSTEM-MAP`, source-of-truth matrix)
- Memory search + daily memory logs
- Registry queries (`data/*.yaml`, generated schemas)

---

## 5) Workstreams

## WS1 — README as Master Index
Goal: Make README the first-stop operational map.

Actions:
- Add “Current State Snapshot” section.
- Add “Operational Index” section linking core files, registries, docs, knowledge, meetings/projects packages.
- Add “Retrieval Paths” (where to look for projects, tasks, decisions, partner context, funding pipeline).
- Add “Continuous Update Loop” and “Feedback-to-Action protocol” links.

Deliverable:
- Updated `README.md` with org-specific index and live state references.

## WS2 — Channel/Meeting Ingestion Pipeline
Goal: Convert raw meeting/channel content into structured operational state.

Actions:
- Process accessible meeting records into `packages/operations/meetings/*.md`.
- Extract and sync:
  - projects updates → `data/projects.yaml`
  - tasks/deadlines → `HEARTBEAT.md`
  - decisions/context → `MEMORY.md` + `memory/YYYY-MM-DD.md`
- Preserve `source_refs` in all updates.

Deliverables:
- New processed meeting files.
- Updated `data/meetings.yaml` and related registries.

## WS3 — Feedback-to-Action Control Loop
Goal: Ensure key feedback is never lost.

Actions:
- Maintain a dedicated feedback/action register.
- For each high-priority instruction:
  - capture,
  - convert to task(s),
  - assign owner,
  - define due/review cadence,
  - mark closure evidence.

Deliverable:
- `docs/FEEDBACK-ACTION-REGISTER.md` (live tracker).

## WS4 — Continuous Update Cadence
Goal: Keep context and indexes fresh with minimal drift.

Cadence:
- **Daily (light):** capture new decisions, tasks, blockers.
- **2x weekly:** reconcile Notion Projects/Tasks with local OS subset.
- **Weekly:** meeting ingestion + funding pipeline refresh.
- **Monthly:** full index integrity review (README links, source-of-truth drift, schema validity).

Deliverables:
- Cadence checklist in docs + HEARTBEAT enforcement tasks.

## WS5 — QA & Reliability
Goal: keep outputs trustworthy.

Checks after material data updates:
1. `npm run generate:schemas`
2. `npm run validate:schemas`
3. Verify links/index pointers in README and docs.
4. Append concise run summary to daily memory log.

Deliverable:
- Standard QA checklist integrated into operations.

---

## 6) Feedback-to-Action Protocol (strict)

For every critical user message/instruction:

1. **Capture**: log in `docs/FEEDBACK-ACTION-REGISTER.md`.
2. **Classify**: decision / task / policy / blocker.
3. **Operationalize**:
   - decision → `MEMORY.md`
   - immediate task → `HEARTBEAT.md`
   - execution context → `memory/YYYY-MM-DD.md`
4. **Act**: implement or schedule implementation.
5. **Verify**: record evidence/commit/file update.
6. **Close**: mark complete only when output exists and is linked.

---

## 7) Implementation Timeline

## Phase 0 (now, same session)
- [ ] Publish this plan
- [ ] Update README with full index + current state snapshot
- [ ] Create feedback-action register and log initial entries

## Phase 1 (next 24h)
- [ ] Process priority meeting records into operational meeting files
- [ ] Extract active tasks/projects into local registries
- [ ] Create Notion reconciliation mini-project structure

## Phase 2 (next 3-7 days)
- [ ] Run first full Notion ↔ Local review cycle (projects/tasks)
- [ ] Populate `data/funding-opportunities.yaml` with initial pipeline
- [ ] Stabilize weekly cadence and QA checklist usage

---

## 8) Success Metrics

- Retrieval speed: key answer path identifiable in <2 minutes from README.
- Logging integrity: 100% of critical user feedback appears in feedback register + mapped action.
- Freshness: weekly sync completed for Projects/Tasks/Meetings.
- Data quality: schema generation/validation passes after data changes.
- Drift reduction: fewer unresolved mismatches between Notion and local OS over each weekly cycle.

---

## 9) Risks & Mitigations

- **Risk:** Notion data is stale or inconsistent.  
  **Mitigation:** meeting-first reality baseline + explicit reconciliation pass.

- **Risk:** Over-documenting without execution.  
  **Mitigation:** feedback register requires linked action evidence.

- **Risk:** Index drift over time.  
  **Mitigation:** monthly index integrity review + README as maintained control plane.

---

## 10) Immediate Execution Priority

1. README indexing refresh (master entrypoint).  
2. Feedback-action register live.  
3. Meeting/channel extraction into structured tasks/projects.  
4. Notion consolidation mini-project kickoff.
