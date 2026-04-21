# ReFi BCN Skills & Workflows Scope

Date: 2026-03-07  
Status: Scoped (ready for implementation)

---

## 1) Scope Objective

Define the operational responsibilities, triggers, inputs/outputs, and implementation priorities for ReFi BCN’s core agent skills so we can move from baseline setup to reliable execution loops.

This scope covers:
- `skills/meeting-processor/`
- `skills/funding-scout/`
- `skills/heartbeat-monitor/`
- `skills/knowledge-curator/`
- `skills/capital-flow/`
- `skills/schema-generator/`

---

## 2) Operating Model (Human + Agent)

### Human operator (Luiz)
- Sets priorities and approves high-impact external/financial actions.
- Reviews escalations and final outputs when governance, money, or external representation is involved.

### ReFi BCN agent
- Runs day-to-day extraction, structuring, monitoring, and synthesis workflows.
- Keeps canonical files current (`HEARTBEAT.md`, `MEMORY.md`, `memory/`, `data/*`, `packages/operations/*`).
- Escalates decisions rather than executing sensitive actions.

---

## 3) Skill Responsibility Matrix

| Skill | Primary Responsibility | Trigger | Output Paths | Autonomy |
|---|---|---|---|---|
| `meeting-processor` | Convert meeting/Notion notes into structured records and actions | New meeting notes/transcript; weekly sync ingestion | `packages/operations/meetings/*`, `data/meetings.yaml`, `HEARTBEAT.md`, `memory/*` | High (content ops), no external publish without approval |
| `funding-scout` | Maintain active funding pipeline + deadline escalation | Weekly funding scan; on-demand opportunity query | `data/funding-opportunities.yaml`, `HEARTBEAT.md`, `memory/*` | High for research/tracking, no submissions without approval |
| `heartbeat-monitor` | Monitor deadlines, workload, and blockers | Session start + recurring checks | `HEARTBEAT.md`, alert summaries, `memory/*` | High (monitoring), no irreversible actions |
| `knowledge-curator` | Turn channel/repo flow into reusable knowledge artifacts | Weekly curation or topic request | `knowledge/*`, `MEMORY.md`, `memory/*` | High (internal knowledge ops) |
| `capital-flow` | Treasury visibility + payout draft coordination | Finance request, payout cycle, pending tx review | `data/finances.yaml`, `data/pending-payouts.yaml`, `HEARTBEAT.md` | Draft-only for tx; execution requires approval |
| `schema-generator` | Keep `.well-known/*` aligned with data and package updates | Any material data/meetings/projects update | `.well-known/*.json`, validation logs, `memory/*` | High (deterministic infra task) |

---

## 4) Cross-Skill Workflow Loops

## Daily loop (light)
1. `heartbeat-monitor`: detect urgent/overdue tasks.
2. `meeting-processor`: process newly added operational notes.
3. `schema-generator`: run after material registry updates.
4. Log key decisions/changes to `memory/YYYY-MM-DD.md`.

## Weekly loop (ops)
1. `funding-scout`: scan/update opportunity pipeline.
2. `knowledge-curator`: curate high-signal updates from channels/notes/repos.
3. `meeting-processor`: ensure all weekly meetings are structurally captured.
4. `heartbeat-monitor`: reconcile overdue + blocked chains.

## Monthly loop (integrity)
1. Validate source-of-truth drift (Notion ↔ local subsets).
2. Run schema QA (`generate:schemas`, `validate:schemas`).
3. Prune stale HEARTBEAT tasks and archive completed items.

---

## 5) Immediate Implementation Priorities (P1)

### P1-A — Funding pipeline activation
- Populate `data/funding-opportunities.yaml` with at least 5 active/potential entries.
- Add 30-day and 7-day deadline escalations into `HEARTBEAT.md`.

### P1-B — Notion ↔ local reconciliation (T1–T3 first)
- Export Notion Projects + Tasks full list.
- Gap-map against `data/projects.yaml` and heartbeat urgent tasks.
- Produce first reconciliation report and update local canonical subset.

### P1-C — Skill runbook hardening
- Add explicit runbook checklists inside remaining skills where still generic:
  - `knowledge-curator`
  - `capital-flow`
  - `schema-generator`

### P1-D — Role/responsibility codification
- Formalize “agent key responsibilities/activities” in docs and heartbeat cadence.

---

## 6) Acceptance Criteria

Scope is considered implemented when:
- [ ] Funding pipeline has >=5 entries with deadlines/status/source refs.
- [ ] Notion reconciliation T1–T3 is complete and reflected locally.
- [ ] All six skills have ReFi BCN-specific operational runbooks (no generic placeholders for core paths).
- [ ] Weekly loop artifacts are visible in `memory/`, `HEARTBEAT.md`, and relevant `data/*` files.
- [ ] Schema generation/validation is run after material data updates.

---

## 7) Execution Paths (for next phase)

- Skills source: `skills/*/SKILL.md`
- Priority monitor: `HEARTBEAT.md`
- Canonical memory: `MEMORY.md`, `memory/YYYY-MM-DD.md`
- Data registries: `data/*.yaml`
- Outputs: `packages/operations/*`, `knowledge/*`, `.well-known/*`

---

## 8) Next Step

After this scope approval: execute implementation in this order:
1. Funding pipeline activation
2. Notion reconciliation T1–T3
3. Skill runbook hardening
4. Responsibility/activity codification

---

## 9) Pilot Decisions Update (2026-03-08)

Operator alignment for workflow piloting (implemented as working assumptions):

1. **Run HEARTBEAT last in the pilot sequence**
   - First pilot operational workflows and collect outputs/signals.
   - Then synthesize the resulting priorities into `HEARTBEAT.md` as the final consolidation step.

2. **Meeting processing scope = full Notion history window (~last 12 months)**
   - Build a year-window intake map for Notion `Notes & Documents`.
   - Process records into local meeting artifacts + action extraction pipeline.

3. **Funding pipeline and leads pipeline should be merged/integrated**
   - Treat CRM relationship pipeline + funding opportunities as one integrated operational flow.
   - Keep distinctions at field/status level, not at disconnected workflow level.

4. **Ecosystem map / knowledge base must be handled in its canonical repo**
   - Work directly in the dedicated ecosystem-map knowledge-base repo context.
   - Include a full review/update pass plus migration stream from Obsidian Publish patterns to Quartz publishing workflow.

5. **Integrate knowledge-base and pipeline outputs into finance management**
   - Connect opportunity and partner pipeline states to financial planning/forecast and payout prep logic.

6. **Reduce unnecessary standalone workflows**
   - Where possible, integrate schema/ops checks into existing workflow exits (meeting/funding/knowledge/finance loops) rather than maintaining isolated processes.
   - Include Telegram internal topic capture (`add to CRM`, `check later`) as standard intake routed into Notion DB sync.

### Revised Pilot Order (v2)
1. Meeting processing (year-window Notion backlog)
2. CRM + funding integrated pipeline
3. Knowledge-base repo review/update + Quartz migration track
4. Finance-management integration
5. Cross-workflow QA/schema checks embedded
6. HEARTBEAT synthesis and monitoring activation
