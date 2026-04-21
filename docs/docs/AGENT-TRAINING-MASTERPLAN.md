# Agent Training Masterplan — ReFi BCN Agentic OS Development

**Purpose:** Systematically develop the ReFi BCN agent stack from basic files into a fully coherent, operationally grounded, and vision-aligned agentic OS.

**Vision:** Agents (refi-bcn bot, cursor, subagents) become proactive operational partners that maintain organizational coherence, anticipate needs, and execute reliable feedback→action loops without constant human intervention.

**Timeline:** Phase 1 (2026-03-17 to 2026-04-14) — 4 weeks of intensive development

---

## Phase 1: Foundation Building (Weeks 1–4)

### Week 1: Context Indexing & Knowledge Integration (2026-03-17 → 2026-03-24)

**Goal:** Build a comprehensive, machine-searchable knowledge graph that grounds all agent reasoning.

**Deliverables:**

1. **`docs/AGENT-KNOWLEDGE-GRAPH.md`** — Complete index of organizational knowledge
   - Core identity (SOUL, IDENTITY, mission, values)
   - Organizational context (members, relationships, network)
   - Project portfolio (active, completed, planned)
   - Funding landscape (opportunities, sources, stage)
   - Operational rhythms (daily/weekly/monthly loops)
   - Decision history (key choices, rationale, owner)
   - External ecosystem (partners, federation, standards)

2. **`docs/OPERATIONAL-VOCABULARY.md`** — Terminology + definitions used consistently
   - ReFi/Web3 terms (regenerative finance, DAO, multisig, etc.)
   - Internal jargon (e.g., "CRM pipeline", "source-of-truth drift")
   - Roles (operator, maintainer, node lead, subagent)
   - Process names (daily loop, weekly sync, monthly integrity check)

3. **`docs/AGENT-CONTEXT-LAYERS.md`** — Map of context by agent role ✅ DELIVERED (by Package C subagent, 2026-03-19)
   - Refi-bcn bot (Telegram coordination): what context matters?
   - Cursor agent (local coding): what context matters?
   - Subagents (spawned for tasks): what context matters?
   - Federation agents (peer nodes): what context do we share?

**Status:** ✅ COMPLETE (2026-03-17)

**Tasks:**
- [x] Extract and consolidate knowledge from MEMORY.md, HEARTBEAT.md, memory/*, and meeting notes
- [x] Map ReFi BCN decision history and reasoning (why we're doing what)
- [x] Document current network relationships, partner commitments, timeline assumptions
- [x] Create operational vocabulary reference with examples
- [x] Tag all sources with file paths for agent citations

---

### Week 2: Core Agent Files Coherence Pass (2026-03-19 → 2026-03-31) 🔄 IN PROGRESS

**Goal:** Evolve AGENTS.md, SOUL.md, and related files from basic templates into operationally coherent guides that reflect the actual vision and complexity of ReFi BCN.

**Status:** Week 2 swarm launched 2026-03-19 with 4 parallel subagents on Kimi-2.5 model.

**Deliverables:**

1. **`AGENTS.md` v2 — Comprehensive Agent Operating Manual** 🔄 IN PROGRESS (Package A subagent)
   - **A. Session Initialization Protocol** (clarify and expand)
     - Startup sequence with explicit context layers for different agent roles
     - Notion integration context (what APIs? what schema?)
     - Federation context (which peer knowledge is relevant?)
     - Telegram topic routing (which topics map to which contexts?)
   
   - **B. Execution Framework** (new section)
     - Explicit state machine: [Idle] → [Context Load] → [Plan] → [Execute] → [Reflect] → [Log]
     - Error handling and escalation patterns
     - When to spawn subagents vs handle locally
     - When to ask for approval vs act autonomously
   
   - **C. Memory & Feedback System** (expand significantly)
     - What to log where (memory/, HEARTBEAT.md, data/*, packages/operations/*)
     - How to structure daily session notes
     - How to escalate blockers and decisions
     - Evidence capture standards (links, summaries, outcomes)
   
   - **D. Skill Orchestration** (detailed)
     - Which skills run in sequence? Which in parallel?
     - Skill pre/post conditions
     - Data flow between skills
     - When each skill triggers (daily/weekly/monthly/on-demand)
   
   - **E. Role-Specific Personas** (new)
     - Refi-bcn bot operating principles
     - Cursor agent autonomy boundaries
     - Subagent spawning templates
     - Federation peer protocols
   
   - **F. Safety & Guardrails** (tighten)
     - Approval matrix for different action types (read vs write vs publish vs execute)
     - Data protection rules (what can be shared with whom)
     - Federation data boundaries
     - Notion sync safety rules

2. **`SOUL.md` v2 — Evolved Identity & Voice** 🔄 IN PROGRESS (Package B subagent)
   - Expand mission with explicit ReFi BCN theory of change
   - Add section on how we measure success/impact
   - Clarify values in operational terms (what does "regenerative over extractive" mean for decisions?)
   - Describe voice/tone with concrete examples
   - Add "what we explicitly reject" section

3. **`IDENTITY.md` v2 — Comprehensive Organizational Identity** 🔄 IN PROGRESS (Package B subagent)
   - Expand on-chain identity with governance structure
   - Add member roles and responsibilities
   - Document treasury management approach
   - List all relevant contracts/addresses/account keys
   - Add standards compliance section (EIP-4824, etc.)

4. **New: `docs/AGENT-WORKFLOWS-MATRIX.md`** 🔄 IN PROGRESS (Package A subagent)
   - Table: [Workflow] × [Trigger] × [Owner(Human/Agent)] × [Inputs] × [Outputs] × [Approval Gate?]
   - All daily/weekly/monthly/on-demand workflows documented
   - Clear ownership (human, agent, or collaborative)
   - Which Notion tables/local files involved in each workflow

5. **New: `docs/AGENT-PROMPTING-FRAMEWORK.md`** 🔄 IN PROGRESS (Package A subagent)
   - System prompts for refi-bcn bot (Telegram coordination)
   - System prompts for cursor agent (local development)
   - System prompts for subagents (spawned task runners)
   - Few-shot examples for each persona
   - Expected response formats and quality standards

**Tasks:**
- [ ] Rewrite AGENTS.md with all sections above
- [ ] Evolve SOUL.md with clearer operational grounding
- [ ] Expand IDENTITY.md with full governance/treasury detail
- [ ] Create AGENT-WORKFLOWS-MATRIX with all workflows
- [ ] Create AGENT-PROMPTING-FRAMEWORK with personas and examples
- [ ] Get operator alignment on voice/decision patterns

---

### Week 3: Skills Hardening & Orchestration (2026-03-31 → 2026-04-07)

**Goal:** Make each skill operationally concrete and ensure they orchestrate coherently.

**Deliverables:**

1. **For each skill: Fully hardened SKILL.md**
   - Clear problem statement and why it matters
   - Exact input schema (what data triggers this skill?)
   - Exact output schema (what does success look like?)
   - Pre/post conditions (what state do we need? what state do we leave?)
   - Explicit runbook with ReFi BCN-specific steps
   - Error handling (what if Notion is down? what if data is malformed?)
   - Evidence capture (what do we log to memory/HEARTBEAT/data/?

2. **`docs/SKILLS-ORCHESTRATION-MAP.md`**
   - Daily execution sequence (in order: A → B → C)
   - Weekly execution sequence
   - Monthly execution sequence
   - Data dependencies (skill B needs output from skill A)
   - Parallelizable vs sequential
   - Skip conditions (when do we skip a skill?)
   - Rollback procedures

3. **`docs/SKILL-INTEGRATION-POINTS.md`**
   - meeting-processor ↔ funding-scout (how do meeting outputs feed funding pipeline?)
   - funding-scout ↔ capital-flow (how do opportunities become payouts?)
   - knowledge-curator ↔ schema-generator (how do knowledge changes trigger schema updates?)
   - heartbeat-monitor ↔ all skills (how does heartbeat pick up blocker signals?)
   - All skills ↔ memory system (what gets logged where?)

**Skills to harden:**
- [ ] meeting-processor (already strong; add ReFi BCN meeting templates)
- [ ] funding-scout (activate pipeline; add deadline escalation logic)
- [ ] knowledge-curator (clarify triggering; add source-traceability)
- [ ] capital-flow (add treasury visibility; draft transaction templates)
- [ ] schema-generator (add validation; add change notification)
- [ ] heartbeat-monitor (add pattern recognition for blockers; add escalation logic)

---

### Week 4: Agent Personas & Autonomy Mapping (2026-03-19 → 2026-04-14) 🔄 EARLY DELIVERY IN PROGRESS

**Goal:** Define concrete agent personas and autonomy boundaries so different agent runtimes work coherently.

**Status:** Week 4 autonomy matrix and spawning templates being delivered early (2026-03-19) by Package D subagent to support Week 2-3 work.

**Deliverables:**

1. **New: `docs/AGENT-PERSONAS.md`**
   
   **Persona 1: Refi-BCN Telegram Bot**
   - Context: Runs in Telegram group, responds to messages + topics
   - Responsibilities:
     - Route messages to Notion (add to CRM, check later, etc.)
     - Answer questions about status/deadlines (query HEARTBEAT/MEMORY)
     - Escalate blockers to humans
     - Summarize weekly metrics
   - Autonomy:
     - [FULL] Read from HEARTBEAT/MEMORY/data
     - [FULL] Log decisions to memory/YYYY-MM-DD.md
     - [HIGH] Extract action items from messages
     - [MEDIUM] Suggest next steps for projects
     - [LOW] Propose funding applications (draft only)
     - [NONE] Send messages without human approval (except status queries)
   - Example interactions (capture patterns)
   
   **Persona 2: Cursor Local Development Agent**
   - Context: Runs locally, integrates with code editor
   - Responsibilities:
     - Keep README/documentation current
     - Process Notion exports into local data files
     - Generate/validate schemas
     - Maintain metadata consistency
     - Draft documentation from structured records
   - Autonomy:
     - [FULL] Read all workspace files
     - [FULL] Write to docs/, memory/YYYY-MM-DD.md, .well-known/
     - [HIGH] Update data/*.yaml with sourced information
     - [HIGH] Run schema generation/validation
     - [MEDIUM] Suggest project prioritization
     - [LOW] Propose structural changes to AGENTS.md/SOUL.md
     - [NONE] Execute on-chain transactions (draft only)
   - Example workflows (capture patterns)
   
   **Persona 3: Subagent (Task Runner)**
   - Context: Spawned by Luiz for specific tasks
   - Responsibilities:
     - Research (scan web, repositories, RFPs)
     - Writing (draft proposals, reports, communications)
     - Analysis (compare options, synthesize findings)
     - Coordination (schedule meetings, prepare agendas)
   - Autonomy:
     - [FULL] Read all workspace files
     - [FULL] Write draft artifacts to memory/
     - [HIGH] Query external APIs/web sources
     - [MEDIUM] Propose next steps
     - [LOW] Commit structured changes
     - [NONE] Send external communications without approval

2. **New: `docs/AGENT-AUTONOMY-MATRIX.md`** ✅ COMPLETE (Package D subagent, 2026-03-19)
   - Complete matrix: [Action Type] × [Agent Persona] × [Autonomy Level] × [Approval Gate?]
   - Read/write/publish/execute for each persona
   - Examples of what "approval gate" looks like (draft → review → execute)

3. **New: `docs/AGENT-SPAWNING-TEMPLATES.md`** ✅ COMPLETE (Package D subagent, 2026-03-19)
   - When to spawn a subagent (vs handle locally)
   - Subagent task templates (research, analysis, writing, coordination)
   - How to brief a subagent (context pass, constraints, success criteria)
   - How to receive subagent outputs (review, integrate, give feedback)

4. **Integration tests** — Validate personas work coherently
   - [ ] Simulate daily loop with all personas active
   - [ ] Simulate weekly ops sync with all personas active
   - [ ] Simulate decision escalation (bot → human → agent → data)
   - [ ] Simulate subagent spawning and result integration

---

## Phase 1 Acceptance Criteria

At end of Week 4, the ReFi BCN agentic OS is considered **Ready for Operationalization** when:

- [ ] All core agent files (AGENTS.md, SOUL.md, IDENTITY.md) are evolved and coherent
- [ ] Knowledge graph (AGENT-KNOWLEDGE-GRAPH.md) is comprehensive and machine-searchable
- [ ] All skills are hardened with explicit runbooks and ReFi BCN-specific steps
- [ ] Skill orchestration is documented and tested (daily/weekly/monthly sequences)
- [ ] Agent personas are defined with concrete autonomy boundaries
- [ ] Workflows are explicitly mapped (trigger → owner → inputs/outputs → approval gate)
- [ ] System prompts for each persona exist with examples
- [ ] Integration tests show personas working coherently
- [ ] Operator (Luiz) approves personas, autonomy boundaries, and escalation patterns

---

## Phase 2: Operationalization (Weeks 5–8) *(Planned for future)*

- Deploy personas to live runtimes (refi-bcn bot, cursor)
- Execute daily/weekly/monthly loops with agent autonomy
- Monitor decision quality and escalation patterns
- Refine based on operational feedback
- Scale to federation peer coordination

---

## Maintenance & Evolution (Ongoing)

After Phase 1:
- Quarterly review of agent effectiveness and autonomy boundaries
- Continuous update of knowledge graph as decisions are made
- Skill enhancement based on operational learnings
- Federation sync of agent standards with peer nodes

---

## File Map (Phase 1 Artifacts)

**New files created:**
- `docs/AGENT-KNOWLEDGE-GRAPH.md`
- `docs/OPERATIONAL-VOCABULARY.md`
- `docs/AGENT-CONTEXT-LAYERS.md`
- `docs/AGENT-WORKFLOWS-MATRIX.md`
- `docs/AGENT-PROMPTING-FRAMEWORK.md`
- `docs/SKILLS-ORCHESTRATION-MAP.md`
- `docs/SKILL-INTEGRATION-POINTS.md`
- `docs/AGENT-PERSONAS.md`
- `docs/AGENT-AUTONOMY-MATRIX.md`
- `docs/AGENT-SPAWNING-TEMPLATES.md`

**Evolved files:**
- `AGENTS.md` (v1 → v2: comprehensive manual)
- `SOUL.md` (v1 → v2: operational grounding)
- `IDENTITY.md` (v1 → v2: full governance/treasury)
- Individual skill SKILL.md files (all hardened)

---

## Success Metrics

**Technical:**
- All agent workflows execute without human intervention in daily/weekly/monthly loops
- Schema generation/validation passes on every data update
- Notion ↔ local sync maintains 100% traceability with source_refs
- Agent decision logs are audit-able and traceable

**Operational:**
- Agents reduce human context-switching by handling routine coordination
- Escalations are clear and actionable (not ambiguous)
- Team (Luiz, Giulio, Andrea) can onboard new agents in < 1 hour using core files
- Quarterly agent effectiveness review shows increasing autonomy with maintained safety

**Knowledge:**
- New team members can understand agent autonomy boundaries in < 30 min
- Federation peers can adopt ReFi BCN agent patterns with minimal adaptation
- Knowledge graph is the single source of truth for all agent reasoning

---

---

## Session Log

| Date | Event | Details |
|------|-------|---------|
| **2026-03-17** | Week 1 deliverables completed | Created AGENT-KNOWLEDGE-GRAPH.md (comprehensive org knowledge), OPERATIONAL-VOCABULARY.md (100+ terminology definitions), AGENT-TRAINING-MASTERPLAN.md (4-week roadmap) |
| **2026-03-19** | Week 2 swarm launched | 4 parallel subagents spawned on Kimi-2.5 model: Package A (AGENTS.md + workflows), Package B (SOUL.md + IDENTITY.md + PERSONAS.md), Package C (context-layers + feedback-loop), Package D (autonomy matrix + spawning templates + validation report) |
| **2026-03-19** | Package D early delivery | AGENT-AUTONOMY-MATRIX.md and AGENT-SPAWNING-TEMPLATES.md delivered ahead of schedule (originally Week 4) to support Week 2-3 work |
| **2026-03-19** | Validation report created | WEEK2-VALIDATION-REPORT.md cross-validates all training artifacts against source files |

### Artifacts Being Created/Updated (2026-03-19 Swarm)

| Artifact | Package | Status | Description |
|----------|---------|--------|-------------|
| `AGENTS.md` v2 | A | 🔄 IN PROGRESS | Comprehensive agent operating manual |
| `docs/AGENT-WORKFLOWS-MATRIX.md` | A | 🔄 IN PROGRESS | All workflows mapped with triggers/owners/gates |
| `docs/AGENT-PROMPTING-FRAMEWORK.md` | A | 🔄 IN PROGRESS | System prompts for all personas |
| `SOUL.md` v2 | B | 🔄 IN PROGRESS | Evolved identity with operational grounding |
| `IDENTITY.md` v2 | B | 🔄 IN PROGRESS | Full governance and treasury details |
| `docs/AGENT-PERSONAS.md` | B | 🔄 IN PROGRESS | 3 personas with responsibilities and autonomy |
| `docs/AGENT-CONTEXT-LAYERS.md` | C | ✅ COMPLETE | Context mapping by agent role |
| `docs/FEEDBACK-ACTION-REGISTER.md` | C | 🔄 UPDATED | Feedback loop enforcement |
| `docs/AGENT-AUTONOMY-MATRIX.md` | D | ✅ COMPLETE | Action × persona × autonomy level matrix |
| `docs/AGENT-SPAWNING-TEMPLATES.md` | D | ✅ COMPLETE | Reusable subagent spawning templates |
| `docs/WEEK2-VALIDATION-REPORT.md` | D | ✅ COMPLETE | Cross-validation of all training artifacts |

---

_This masterplan is the north star for Phase 1 development. Update when priorities shift._

_Last updated: 2026-03-19_
