# Agent Workflows Matrix — ReFi BCN Operational Workflows

**Purpose:** Comprehensive mapping of all operational workflows: triggers, ownership, inputs/outputs, approval gates, skills involved, and duration estimates.

**Date:** 2026-03-19  
**Version:** 1.0.0  
**Related:** `SKILLS-WORKFLOWS-SCOPE.md`, `AGENT-TRAINING-MASTERPLAN.md` Week 2

---

## Workflow Matrix

| # | Workflow Name | Trigger | Owner | Inputs | Outputs | Approval Gate? | Skills Involved | Est. Duration |
|---|---------------|---------|-------|--------|---------|----------------|-----------------|---------------|
| 1 | Daily Ops Check (Heartbeat) | Daily (morning) / Session start | **Agent** (auto) | `HEARTBEAT.md`, `data/*.yaml`, Notion Projects/Tasks status | Urgency report, updated HEARTBEAT alerts | No | `heartbeat-monitor` | 5-10 min |
| 2 | Weekly Sync Cycle (Notion ↔ Local) | Weekly (Tuesdays, ops sync) | **Collaborative** (Agent prep + Human execution) | Notion Projects DB, Notion Tasks DB, `data/projects.yaml` | Reconciliation report, updated local YAML, `HEARTBEAT.md` updates | Yes — Luiz approves sync actions | `heartbeat-monitor` (analysis), manual Notion updates | 60-90 min |
| 3 | Meeting Processing | Event (after each meeting) / Weekly backlog | **Collaborative** (Agent processes, Human reviews) | Meeting transcript, Notion notes, `data/members.yaml`, `data/projects.yaml` | Structured meeting notes, `data/meetings.yaml` entry, `HEARTBEAT.md` action items, `memory/YYYY-MM-DD.md` log | No for processing, Yes for external publish | `meeting-processor` | 15-30 min per meeting |
| 4 | Funding Opportunity Scouting | Weekly (funding scan) / On-demand query | **Agent** (research) → **Human** (decision) | `data/funding-opportunities.yaml`, Notion CRM, web research, `HEARTBEAT.md` deadlines | Updated `data/funding-opportunities.yaml`, deadline alerts in HEARTBEAT, research summaries in `memory/` | Yes — applications require Luiz approval | `funding-scout`, `web_search` | 30-45 min |
| 5 | Telegram Topic Routing | Event (per message in routed topics) | **Agent** (auto-route) → **Human** (complex decisions) | Telegram message content, `data/telegram-topic-routing.yaml`, Notion CRM structure | Notion CRM entries, `HEARTBEAT.md` items (for `cycles` topic), `memory/` logs | No for routing, Yes for financial/legal actions | `heartbeat-monitor` (for classification), Notion integration | <1 min per message |
| 6 | Schema Generation | Event (after material data changes) / Weekly validation | **Agent** (auto) | `data/*.yaml`, `packages/operations/*`, `IDENTITY.md` | `.well-known/*.json` schemas, validation logs | No (deterministic) | `schema-generator` | 2-5 min |
| 7 | New Member Onboarding | Event (new core team member) | **Collaborative** (Agent drafts, Human executes) | `data/members.yaml` template, onboarding checklist, access requirements | Updated `data/members.yaml`, access provisioned, first task assigned, `memory/` log | Yes — Luiz + core team approval for member add | `schema-generator` (after data update), manual access provisioning | 2-4 hours (spread over days) |
| 8 | Project Status Update | Weekly (ops sync) / On-demand | **Collaborative** (Agent synthesizes, Human presents) | `data/projects.yaml`, Notion Projects, recent meeting notes, `HEARTBEAT.md` | Stakeholder summary, updated project pages, `HEARTBEAT.md` refresh | Yes — if communicating externally | `heartbeat-monitor`, `meeting-processor` (for context) | 20-30 min |
| 9 | Treasury Reconciliation | Monthly (1st of month) / Event (payout need) | **Collaborative** (Agent drafts, Human executes) | Safe API (`0x91889ea97FeD05180fb5A70cB9570630f3C0Be77`), `data/finances.yaml`, `data/pending-payouts.yaml` | Treasury report, drafted payouts in `data/pending-payouts.yaml`, Safe transaction data | **YES — All financial actions require Luiz + multisig approval** | `capital-flow` | 30-60 min |
| 10 | Knowledge Curation | Weekly (curation cycle) / Event (signal accumulation) | **Agent** (auto) → **Human** (review for hub) | `packages/operations/meetings/`, docs updates, Telegram signals, Notion Notes | `knowledge/<domain>/YYYY-MM-DD-curation.md`, hub contribution drafts | Yes — for hub publication | `knowledge-curator` | 45-60 min |
| 11 | Cooperative Formation Checkpoint | Quarterly / Milestone-driven | **Human** (decision) → **Agent** (documentation) | Governance decisions, compliance requirements, `IDENTITY.md` | Updated governance docs, milestone records, `HEARTBEAT.md` next steps | Yes — core team consensus | `meeting-processor` (for governance meetings), `schema-generator` | 2-3 hours (spread over weeks) |
| 12 | Federation Sync | Monthly / Event (material publish need) | **Collaborative** (Agent prepares, Human approves) | `.well-known/*.json`, `knowledge/`, hub sync status | Published schemas, hub knowledge contributions, peer sync log | Yes — for hub contributions | `schema-generator`, `knowledge-curator` | 30-45 min |
| 13 | Monthly Integrity Check | Monthly (last day) | **Collaborative** (Agent audits, Human decides) | All `data/*.yaml`, Notion snapshots, `HEARTBEAT.md`, `memory/` consistency | Integrity report, drift fixes, archived stale items, updated indexes | Yes — for structural changes | All skills (comprehensive check) | 2-3 hours |
| 14 | Quarterly Agent Effectiveness Review | Quarterly (end of quarter) | **Human** (review) → **Agent** (data support) | `HEARTBEAT.md` history, `memory/` logs, workflow execution records, operator feedback | Effectiveness report, autonomy boundary adjustments, skill improvement tasks | Yes — human-led review | `heartbeat-monitor` (metrics), `knowledge-curator` (synthesis) | 3-4 hours (spread over week) |

---

## Detailed Workflow Specifications

### 1. Daily Ops Check (Heartbeat)

**Trigger:** Daily morning / Session start  
**Owner:** Agent (autonomous)  
**Frequency:** Every session, proactive alerts every 1h (per `federation.yaml`)

**Inputs:**
- `HEARTBEAT.md` (full read)
- `data/projects.yaml` (status check)
- `data/funding-opportunities.yaml` (deadline scan)
- Notion Projects/Tasks status (if accessible)

**Process:**
1. Load HEARTBEAT and categorize by urgency
2. Scan for deadlines within 7 days (critical) and 30 days (upcoming)
3. Check Notion workload (Projects In Progress, Tasks backlog)
4. Generate priority report
5. Alert if critical items detected

**Outputs:**
- Heartbeat report (markdown)
- Updated `HEARTBEAT.md` (if new items detected)
- `memory/YYYY-MM-DD.md` entry

**Approval Gate:** None (monitoring only)  
**Skills:** `heartbeat-monitor`  
**Duration:** 5-10 minutes

---

### 2. Weekly Sync Cycle (Notion ↔ Local)

**Trigger:** Weekly (Tuesdays, ops sync time)  
**Owner:** Collaborative — Agent prepares, Human executes  
**Frequency:** Weekly  

**Inputs:**
- Notion Projects database (full export)
- Notion Tasks database (full export)
- `data/projects.yaml` (local canonical)
- Previous reconciliation report (if exists)

**Process:**
1. Export Notion Projects + Tasks (T1/T2)
2. Cross-reference with local `data/projects.yaml` (T3)
3. Identify gaps: Notion items not in local, local items stale
4. Reality-check "active" projects against meeting context (T4)
5. Mark stale items for archive/update (T5)
6. Sync active projects to local YAML with source_refs (T6)
7. Extract urgent tasks to HEARTBEAT (T7)
8. Document sync protocol (T8)
9. Test first sync cycle (T9)

**Outputs:**
- Reconciliation report (`docs/` or `memory/`)
- Updated `data/projects.yaml`
- `HEARTBEAT.md` with urgent tasks
- `docs/SOURCE-OF-TRUTH-MATRIX.md` protocol update
- `memory/YYYY-MM-DD.md` execution log

**Approval Gate:** Yes — Luiz approves sync actions and archive decisions  
**Skills:** `heartbeat-monitor` (analysis), manual Notion updates  
**Duration:** 60-90 minutes

**Reference:** `HEARTBEAT.md` — Notion Infrastructure Review T1-T9

---

### 3. Meeting Processing

**Trigger:** Event-driven (after meeting) / Weekly backlog processing  
**Owner:** Collaborative — Agent processes, Human reviews  
**Frequency:** As meetings occur + weekly backlog scan

**Inputs:**
- Meeting transcript (Granola, Meet, Otter.ai, Zoom, or manual notes)
- Notion Notes & Documents entry (if exists)
- `data/members.yaml` (attendee resolution)
- `data/projects.yaml` (project linking)
- `SOUL.md` (voice/boundaries)

**Process:**
1. Receive transcript/notes
2. Extract: Date, Participants, Decisions, Action items, Topics, Projects
3. Write structured meeting note to `packages/operations/meetings/YYMMDD [Title].md`
4. Update `data/meetings.yaml` registry entry
5. Append to `memory/YYYY-MM-DD.md`
6. Add action items to `HEARTBEAT.md` (with urgency)
7. Update linked project pages with new action items

**Outputs:**
- Structured meeting note (markdown)
- `data/meetings.yaml` entry
- `HEARTBEAT.md` action items
- `memory/YYYY-MM-DD.md` log
- Updated project pages (if applicable)

**Approval Gate:** No for processing, Yes for external publishing (if `publish: true`)  
**Skills:** `meeting-processor`  
**Duration:** 15-30 minutes per meeting

**Reference:** `skills/meeting-processor/SKILL.md`

---

### 4. Funding Opportunity Scouting

**Trigger:** Weekly (funding scan day) / On-demand query  
**Owner:** Agent (research) → Human (decision)  
**Frequency:** Weekly + event-driven

**Inputs:**
- `data/funding-opportunities.yaml` (current pipeline)
- Notion CRM (funding intent signals)
- Notion Research & Reading List (opportunity mentions)
- Web search (funding platforms)
- `HEARTBEAT.md` (deadline tracking)

**Process:**
1. Check current pipeline in `data/funding-opportunities.yaml`
2. Query Notion CRM for funding intent entries
3. Review Notion Research for opportunity mentions
4. Web search: Gitcoin, Celo PG, Octant, Superfluid, Artisan, etc.
5. Add/update opportunities with deadlines, eligibility, status
6. Identify <30 day deadlines → add to HEARTBEAT
7. Identify <7 day deadlines → flag as urgent
8. Write scan summary to `memory/YYYY-MM-DD.md`

**Outputs:**
- Updated `data/funding-opportunities.yaml`
- `HEARTBEAT.md` deadline alerts
- `memory/YYYY-MM-DD.md` research summary
- Draft application materials (if requested, for approval)

**Approval Gate:** Yes — All applications require Luiz approval before submission  
**Skills:** `funding-scout`, `web_search`  
**Duration:** 30-45 minutes

**Reference:** `skills/funding-scout/SKILL.md`, `HEARTBEAT.md` Funding section

---

### 5. Telegram Topic Routing

**Trigger:** Event (every message in configured topics)  
**Owner:** Agent (auto-route) → Human (complex decisions)  
**Frequency:** Real-time (per message)

**Inputs:**
- Telegram message content
- `data/telegram-topic-routing.yaml` (routing rules)
- Notion CRM structure (for "add to crm" topic)
- `HEARTBEAT.md` (for "cycles" topic)
- Boundary policy (`docs/BOUNDARY-AND-BRIDGE-POLICY.md`)

**Process:**
1. Receive message with topic/thread ID
2. Lookup routing rule in `data/telegram-topic-routing.yaml`
3. Validate scope (ReFi BCN org vs Luiz personal)
4. If out of scope → Refuse with boundary message + bridge protocol
5. If in scope → Route per topic:
   - `add to crm`: Extract entities, add to Notion CRM
   - `check later`: Add to Notion with "check later" tag
   - `emails & meetings`: Queue for meeting processing
   - `cycles`: Add to `HEARTBEAT.md` as task
6. Log routing action to `memory/YYYY-MM-DD.md`
7. Send acknowledgment (if configured)

**Outputs:**
- Notion CRM entries (for "add to crm")
- `HEARTBEAT.md` items (for "cycles")
- `memory/YYYY-MM-DD.md` routing log
- Telegram acknowledgment (optional)

**Approval Gate:** No for routing, Yes for financial/legal actions (escalate)  
**Skills:** `heartbeat-monitor` (classification), Notion integration  
**Duration:** <1 minute per message

**Reference:** `data/telegram-topic-routing.yaml`, `docs/TELEGRAM-TOPIC-INTEGRATION-PLAN.md`

---

### 6. Schema Generation

**Trigger:** Event (after material data changes) / Weekly validation  
**Owner:** Agent (autonomous, deterministic)  
**Frequency:** After any `data/*.yaml` update + weekly

**Inputs:**
- `data/members.yaml`
- `data/projects.yaml`
- `data/finances.yaml`
- `data/meetings.yaml`
- `IDENTITY.md`
- `federation.yaml`
- `packages/operations/meetings/*.md`
- `packages/operations/projects/*.md`

**Process:**
1. Detect data changes (file modification times)
2. Run `npm run generate:schemas`
3. Generate EIP-4824 compliant JSON in `.well-known/`
4. Run `npm run validate:schemas`
5. Verify validation passes
6. Log to `memory/YYYY-MM-DD.md`
7. If failure → add blocker to `HEARTBEAT.md`

**Outputs:**
- `.well-known/dao.json`
- `.well-known/members.json`
- `.well-known/projects.json`
- `.well-known/finances.json`
- `.well-known/meetings.json`
- Validation logs
- `memory/YYYY-MM-DD.md` entry

**Approval Gate:** No (deterministic infrastructure task)  
**Skills:** `schema-generator`  
**Duration:** 2-5 minutes

**Reference:** `skills/schema-generator/SKILL.md`

---

### 7. New Member Onboarding

**Trigger:** Event (new core team member confirmed)  
**Owner:** Collaborative — Agent drafts, Human executes  
**Frequency:** As needed (rare)

**Inputs:**
- New member details (name, role, contact)
- `data/members.yaml` template
- Onboarding checklist
- Access requirements (Notion, GitHub, Telegram, Safe)
- `AGENTS.md` role definitions

**Process:**
1. Draft `data/members.yaml` entry with source_refs
2. Prepare onboarding checklist
3. Provision access (Notion, GitHub, Telegram) — Human executes
4. Assign first task (from HEARTBEAT or new)
5. Update `IDENTITY.md` if governance role
6. Run schema generation
7. Log onboarding to `memory/YYYY-MM-DD.md`
8. Notify existing members

**Outputs:**
- Updated `data/members.yaml`
- Provisioned access (accounts created)
- Assigned first task
- Updated schemas (`.well-known/members.json`)
- Onboarding log in `memory/`

**Approval Gate:** Yes — Luiz + core team approval required for new members  
**Skills:** `schema-generator` (post-update)  
**Duration:** 2-4 hours (spread over days)

**Reference:** `data/members.yaml`, `IDENTITY.md`

---

### 8. Project Status Update

**Trigger:** Weekly (ops sync) / On-demand request  
**Owner:** Collaborative — Agent synthesizes, Human presents  
**Frequency:** Weekly + event-driven

**Inputs:**
- `data/projects.yaml` (all projects)
- Notion Projects (live status)
- Recent meeting notes (`packages/operations/meetings/`)
- `HEARTBEAT.md` (project-related tasks)
- Active workfront context

**Process:**
1. Load all projects from `data/projects.yaml`
2. Cross-check with Notion Projects status
3. Review recent meeting notes for project mentions
4. Identify blockers and progress from HEARTBEAT
5. Synthesize stakeholder summary:
   - Active projects with status
   - Blockers requiring attention
   - Decisions needed
   - Next milestones
6. Update project pages with latest status
7. Refresh `HEARTBEAT.md` with extracted priorities

**Outputs:**
- Stakeholder summary (markdown)
- Updated project pages
- Refreshed `HEARTBEAT.md`
- `memory/YYYY-MM-DD.md` log

**Approval Gate:** Yes — if communicating externally (stakeholders, federation)  
**Skills:** `heartbeat-monitor`, `meeting-processor` (context)  
**Duration:** 20-30 minutes

---

### 9. Treasury Reconciliation

**Trigger:** Monthly (1st of month) / Event (payout need)  
**Owner:** Collaborative — Agent drafts, Human executes  
**Frequency:** Monthly + event-driven

**Inputs:**
- Safe API (`https://safe-transaction-gnosis.gateway.gnosis.io`)
- Safe address: `0x91889ea97FeD05180fb5A70cB9570630f3C0Be77`
- `data/finances.yaml` (historical)
- `data/pending-payouts.yaml` (draft queue)
- `data/members.yaml` (allocations)
- Meeting notes (payout approvals)

**Process:**
1. Query Safe API for balances
2. Read `data/finances.yaml` for historical context
3. Check `data/pending-payouts.yaml` for draft queue
4. Generate treasury report
5. If payout needed:
   - Calculate amounts from member allocations
   - Draft payout list in `data/pending-payouts.yaml`
   - Prepare Safe transaction data
   - **Present for approval** (Luiz + multisig signers)
6. After human execution: record transaction in `data/finances.yaml`
7. Update `HEARTBEAT.md`
8. Log to `memory/YYYY-MM-DD.md`

**Outputs:**
- Treasury report (markdown)
- `data/pending-payouts.yaml` (draft payouts)
- Safe transaction data (for human execution)
- Updated `data/finances.yaml` (post-execution)
- `HEARTBEAT.md` updates

**Approval Gate:** **YES — All financial actions require Luiz + multisig approval**  
**Skills:** `capital-flow`  
**Duration:** 30-60 minutes

**Reference:** `skills/capital-flow/SKILL.md`, `TOOLS.md` Safe endpoints

---

### 10. Knowledge Curation

**Trigger:** Weekly (curation cycle) / Event (signal accumulation)  
**Owner:** Agent (auto) → Human (review for hub)  
**Frequency:** Weekly

**Inputs:**
- `packages/operations/meetings/*.md` (last 7 days)
- Docs updates (last 7 days)
- Telegram signals (high-value topics)
- Notion Notes & Documents (`1386ed08-45cb-81ed-b055-000ba5b70a6b`)
- `docs/CHANNELS-AND-SYSTEMS-MAP.md` (signal sources)
- `federation.yaml` knowledge-commons config

**Process:**
1. Collect sources (last 7 days)
2. Extract durable knowledge:
   - Funding mechanisms
   - Governance/process decisions
   - Partner/ecosystem shifts
3. Synthesize by domain (from `federation.yaml`):
   - `regenerative-finance/`
   - `local-governance/`
   - `bioregional-finance/`
   - `cooperative-web3-bridging/`
4. Write curation: `knowledge/<domain>/YYYY-MM-DD-curation.md`
5. Quality gate: source refs, no duplicates, clear implications
6. Operationalize: actionable items → `HEARTBEAT.md`, decisions → `MEMORY.md`
7. If `publish: true`, draft hub contribution

**Outputs:**
- `knowledge/<domain>/YYYY-MM-DD-curation.md`
- Hub contribution drafts (if publishing)
- `HEARTBEAT.md` operationalized items
- `MEMORY.md` strategic decisions
- `memory/YYYY-MM-DD.md` log

**Approval Gate:** Yes — for hub publication (human review)  
**Skills:** `knowledge-curator`  
**Duration:** 45-60 minutes

**Reference:** `skills/knowledge-curator/SKILL.md`

---

### 11. Cooperative Formation Checkpoint

**Trigger:** Quarterly / Milestone-driven  
**Owner:** Human (decision) → Agent (documentation)  
**Frequency:** Quarterly + milestone events

**Inputs:**
- Governance decisions (meeting notes)
- Compliance requirements (legal docs)
- `IDENTITY.md` (org structure)
- `federation.yaml` (governance block)
- Cooperative formation roadmap

**Process:**
1. Review governance decisions since last checkpoint
2. Assess compliance status (legal, financial, operational)
3. Document milestone achievements
4. Identify blockers to formal registration
5. Update governance docs
6. Record checkpoint in `memory/`
7. Add next steps to `HEARTBEAT.md`
8. Update `IDENTITY.md` if status changed

**Outputs:**
- Updated governance documentation
- Milestone records
- `HEARTBEAT.md` next steps
- `IDENTITY.md` updates (if status changed)
- Checkpoint log in `memory/`

**Approval Gate:** Yes — core team consensus required  
**Skills:** `meeting-processor` (governance meetings), `schema-generator`  
**Duration:** 2-3 hours (spread over weeks)

**Reference:** `IDENTITY.md` (cooperative in formation), `federation.yaml` governance

---

### 12. Federation Sync

**Trigger:** Monthly / Event (material publish need)  
**Owner:** Collaborative — Agent prepares, Human approves  
**Frequency:** Monthly + event-driven

**Inputs:**
- `.well-known/*.json` (published schemas)
- `knowledge/` (curated content)
- Hub sync status
- `federation.yaml` (peers, knowledge-commons, sync-protocol)
- `IDENTITY.md` (org identity)

**Process:**
1. Regenerate schemas (if needed)
2. Validate schemas (`npm run validate:schemas`)
3. Review `knowledge/` for hub-ready content
4. Prepare hub contribution package
5. **Human review** of contributions
6. Push to hub (git sync)
7. Pull peer updates from hub
8. Log sync in `memory/`
9. Update `HEARTBEAT.md` if sync issues

**Outputs:**
- Published schemas (`.well-known/`)
- Hub knowledge contributions
- Peer sync log
- `memory/YYYY-MM-DD.md` sync record

**Approval Gate:** Yes — for hub contributions (human approval)  
**Skills:** `schema-generator`, `knowledge-curator`  
**Duration:** 30-45 minutes

**Reference:** `federation.yaml`, `IDENTITY.md`

---

### 13. Monthly Integrity Check

**Trigger:** Monthly (last day of month)  
**Owner:** Collaborative — Agent audits, Human decides  
**Frequency:** Monthly

**Inputs:**
- All `data/*.yaml` files
- Notion snapshots (Projects, Tasks, CRM)
- `HEARTBEAT.md` (task aging)
- `memory/` (consistency)
- `MEMORY.md` (decision history)
- `docs/*.md` (process drift)
- `packages/operations/*` (completeness)

**Process:**
1. **Data integrity:**
   - Cross-validate `data/*.yaml` against Notion
   - Check source_refs completeness
   - Validate YAML syntax
2. **HEARTBEAT audit:**
   - Identify stale tasks (>30 days)
   - Archive completed items
   - Flag orphaned action items (no owner)
3. **Memory consistency:**
   - Check `memory/` has entries for last 30 days
   - Verify `MEMORY.md` key decisions are current
4. **Index integrity:**
   - Review README/index accuracy
   - Check for broken links/references
5. **Drift fixes:**
   - Propose corrections
   - **Human approves** structural changes
6. **Archive stale items**
7. **Update indexes**
8. Log full audit to `memory/`

**Outputs:**
- Integrity report (markdown)
- Drift fixes (approved by human)
- Archived stale items
- Updated indexes
- `HEARTBEAT.md` refreshed
- Audit log in `memory/`

**Approval Gate:** Yes — for structural changes  
**Skills:** All skills (comprehensive check)  
**Duration:** 2-3 hours

---

### 14. Quarterly Agent Effectiveness Review

**Trigger:** Quarterly (end of quarter)  
**Owner:** Human (review) → Agent (data support)  
**Frequency:** Quarterly

**Inputs:**
- `HEARTBEAT.md` history (task completion rates)
- `memory/` logs (session records)
- Workflow execution records (from this matrix)
- Operator feedback (Luiz + team)
- Skill performance notes
- Escalation frequency
- Autonomy boundary test results

**Process:**
1. **Metrics compilation:**
   - Tasks completed vs created
   - Average time to completion
   - Escalation frequency
   - Autonomous vs human-executed actions
2. **Skill performance:**
   - Each skill's effectiveness
   - Error rates
   - Human override frequency
3. **Autonomy boundary review:**
   - Are boundaries appropriate?
   - Should any [MEDIUM] become [HIGH] or vice versa?
4. **Synthesis:**
   - Effectiveness report
   - Recommended boundary adjustments
   - Skill improvement tasks
5. **Human review meeting:**
   - Discuss findings
   - Approve boundary changes
   - Prioritize improvements
6. **Update documentation:**
   - Revise autonomy levels
   - Update skill runbooks

**Outputs:**
- Effectiveness report (markdown)
- Autonomy boundary adjustment recommendations
- Skill improvement tasks (added to HEARTBEAT)
- Updated `AGENTS.md`, `docs/AGENT-AUTONOMY-MATRIX.md`
- Review log in `memory/`

**Approval Gate:** Yes — human-led review  
**Skills:** `heartbeat-monitor` (metrics), `knowledge-curator` (synthesis)  
**Duration:** 3-4 hours (spread over week)

---

## Workflow Interdependencies

### Sequential Dependencies (Must complete A before B)

| A | B | Notes |
|---|---|-------|
| Meeting Processing | Schema Generation | Meeting notes may trigger schema updates |
| Notion Sync (T1-T4) | Project Status Update | Need reconciled data for accurate status |
| Funding Scout | HEARTBEAT Update | Funding deadlines feed HEARTBEAT |
| Treasury Reconciliation | Schema Generation | Financial data updates trigger schema regen |
| Knowledge Curation | Federation Sync | Curated knowledge feeds hub sync |

### Parallelizable Workflows (Can run simultaneously)

- Daily Ops Check + Telegram Topic Routing (both lightweight)
- Funding Scout + Knowledge Curation (different data sources)
- Schema Generation + Meeting Processing (if no meeting data changes)

### Trigger Cascades (One workflow triggers another)

| Trigger Workflow | Triggered Workflow | Condition |
|------------------|-------------------|-----------|
| Meeting Processing | Schema Generation | If projects/members updated |
| Notion Sync | Project Status Update | Always after sync |
| Funding Scout | HEARTBEAT Update | If deadlines <30 days |
| Treasury Reconciliation | Schema Generation | If finances.yaml updated |
| Data File Update | Schema Generation | Automatic (via GitHub Actions or manual) |

---

## Approval Gate Reference

| Gate Type | Workflows | Approver | Response Time |
|-----------|-----------|----------|---------------|
| None (autonomous) | Daily Ops Check, Meeting Processing (internal), Schema Generation, Telegram Routing (standard) | N/A | Immediate |
| Review only | Knowledge Curation (hub), Federation Sync | Luiz | 24-48 hours |
| Approval required | Weekly Sync, Project Status (external), Funding Applications, Treasury Payouts | Luiz | 24-48 hours |
| Consensus required | New Member Onboarding, Cooperative Formation | Core team | 3-7 days |
| Multisig execution | Treasury Payouts (execution) | Safe signers | 1-3 days |

---

## Workflow Optimization Notes

1. **Batch where possible** — Group similar tasks (multiple meetings, multiple funding checks)
2. **Cache context** — SOUL.md, IDENTITY.md change rarely; cache between sessions
3. **Lazy load** — Don't load full knowledge graph unless needed
4. **Parallel execution** — Use subagents for independent tasks (e.g., web research)
5. **Evidence capture** — Always log to `memory/` for traceability
6. **Escalate early** — When uncertain, escalate rather than guess
7. **Validate before publish** — Run schema validation before any external publication

---

_Last updated: 2026-03-19_
