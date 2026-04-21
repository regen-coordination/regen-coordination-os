# Operational Vocabulary — ReFi BCN Terminology & Definitions

**Purpose:** Single source of truth for terminology used consistently across ReFi BCN operations, agent reasoning, and documentation. Ensures agents, humans, and federation peers share the same mental models.

**Maintenance:** Add terms as they emerge. Update definitions when organizational understanding evolves.

---

## A. CORE MISSION & VALUES

### Regenerative Finance (ReFi)
**Definition:** Using Web3 tools, financial mechanisms, and governance structures to finance ecological and social regeneration at scale.

**Why it matters:** ReFi is the north star for ReFi BCN's theory of change. Every decision should move toward genuine regeneration, not just superficial "green" branding.

**Examples:**
- ✅ Funding watershed restoration via impact-linked bonds
- ✅ Supporting local cooperative businesses with concessional capital
- ❌ Using "green" language to attract venture capital with no regenerative intent
- ❌ Creating financial products that extract from communities

**Related terms:** ESS (solidarity economy), DAO, Cooperative governance

**Source:** `SOUL.md` mission

---

### Regenerative (vs Extractive)
**Definition:** Actions that restore capacity, relationships, and resilience. Extractive actions that deplete resources, community autonomy, or ecosystem health.

**In operations:** Every decision should explicitly ask: "Is this regenerative (creates value) or extractive (takes value)?"

**Examples:**
- ✅ Regenerative: Funding local communities directly without intermediaries
- ✅ Regenerative: Sharing knowledge openly so peers can adapt and improve
- ❌ Extractive: Taking fees for coordination without added value
- ❌ Extractive: Locking communities into predatory loan terms

**Related terms:** Impact, alignment, local autonomy

**Source:** `SOUL.md` core values

---

### Cosmo-local
**Definition:** Combining global infrastructure/knowledge with locally rooted action. "Think globally, act locally" applied to regenerative finance.

**Why it matters:** ReFi BCN's competitive advantage is bridging global ReFi tools with local Barcelona/Catalonia cooperative culture.

**Examples:**
- ✅ Cosmo-local: ReFi BCN learns governance patterns from ReFi DAO (global) and adapts them for Barcelona cooperatives (local)
- ✅ Cosmo-local: Using Safe (global infrastructure) for local treasury management with community oversight
- ❌ Not cosmo-local: Importing Web3 tools without community buy-in
- ❌ Not cosmo-local: Staying purely local and rejecting external infrastructure

**Related terms:** Federation, peer-to-peer, global-local alignment

**Source:** `SOUL.md` core values

---

### Economia Solidaria (ESS / Solidarity Economy)
**Definition:** Local economic systems based on solidarity principles: cooperation, non-exploitation, democratic control, environmental sustainability.

**Why it matters:** ReFi BCN's primary constituency is Barcelona/Catalonia's ESS ecosystem. All actions should respect ESS principles and language.

**Examples:**
- ✅ ESS: Worker cooperatives, community land trusts, time banks, social enterprises
- ✅ ESS: Democratic decision-making, profit-sharing, community ownership
- ❌ Not ESS: Hierarchical corporations, investor-owned ventures, extraction models

**Related terms:** Cooperative governance, community-centered, local autonomy

**Source:** `SOUL.md` mission, bridging language

---

## B. ORGANIZATIONAL STRUCTURE

### Local Node
**Definition:** A regional coordination point within the ReFi DAO network. Responsible for bridging global ReFi infrastructure with local context and community needs.

**ReFi BCN's role:** Barcelona + Catalonia regional node. We coordinate funding, knowledge, and governance alignment between local initiatives and global ReFi ecosystem.

**Examples:**
- ✅ ReFi BCN as local node: Researching which ReFi tools fit Barcelona cooperatives
- ✅ ReFi BCN as local node: Bringing local ESS projects to ReFi DAO funding channels
- ❌ Confusing with: Being a DAO (we're coordinating, not governing on-chain yet)
- ❌ Confusing with: Being a venture fund (we're facilitating, not allocating capital unilaterally)

**Related terms:** Hub (federation coordinator), peer node, network node

**Source:** `IDENTITY.md` organization type

---

### Cooperative in Formation
**Definition:** ReFi BCN is transitioning toward formal cooperative legal structure. Not yet registered, but operating with cooperative governance principles.

**Why it matters:** Signals commitment to member-based governance and community accountability (not just top-down donor control).

**Timeline assumption:** Formal registration target Q3 2026 (assumption to validate)

**Related terms:** Governance model, decision authority, member

**Source:** `IDENTITY.md`, `SOUL.md` governance values

---

### Core Team
**Definition:** The 3 founding members with ongoing operational responsibility: Luiz (strategy), Giulio (TBD), Andrea (TBD).

**Key constraint:** With 3 core members, bandwidth is limited. Autonomy for agents is critical to avoid bottlenecks.

**Related terms:** Maintainer, operator, decision authority

**Source:** `federation.yaml` governance, `USER.md`

---

### Maintainer
**Definition:** Person with delegated decision authority for specific domains within ReFi BCN.

**Examples:**
- Luiz: Maintainer for strategy, funding operations, federation alignment
- Giulio: Maintainer for [TBD after onboarding]
- Andrea: Maintainer for [TBD after onboarding]

**Related terms:** Operator, owner, responsibility domain

**Source:** `federation.yaml` governance block

---

## C. AGENT ROLES & AUTONOMY

### Agent
**Definition:** An AI system (refi-bcn bot, cursor, subagent) authorized to execute operational tasks within defined autonomy boundaries.

**Key principle:** Agents are operational partners, not decision-makers. They execute, monitor, and escalate—but humans make strategic choices.

**Related terms:** Persona, autonomy level, escalation

**Source:** `AGENTS.md`, `docs/AGENT-PERSONAS.md`

---

### Agent Autonomy Level
**Definition:** How much independent decision-making authority an agent has for a specific action type.

**Levels (from full to none):**
- **[FULL]** Agent acts independently; humans review after-the-fact if needed
- **[HIGH]** Agent acts independently; escalate blockers to humans
- **[MEDIUM]** Agent drafts or proposes; human reviews and approves before execution
- **[LOW]** Agent gathers information only; human decides
- **[NONE]** Agent cannot act; humans only

**Examples:**
- [FULL] Agent reads HEARTBEAT and reports status (just information retrieval)
- [HIGH] Agent logs decisions to memory/YYYY-MM-DD.md (internal record-keeping)
- [MEDIUM] Agent drafts funding proposal for Luiz to review (requires approval)
- [NONE] Agent cannot send external messages without human approval (communication gate)

**Related terms:** Approval matrix, escalation, persona

**Source:** `AGENTS.md` safety policy, `docs/AGENT-AUTONOMY-MATRIX.md`

---

### Persona
**Definition:** A specific agent configuration with defined responsibilities, context, and autonomy boundaries.

**ReFi BCN personas:**
1. **Refi-bcn Telegram Bot** — Coordinates in messaging channels; routes inputs to Notion; answers status questions
2. **Cursor Agent** — Local development; keeps documentation current; reconciles data files
3. **Subagent** — Spawned for specific tasks (research, writing, analysis); temporary lifecycle

**Related terms:** Agent, runtime, autonomy level

**Source:** `docs/AGENT-PERSONAS.md`

---

### Subagent
**Definition:** An agent spawned temporarily for a specific task, then terminated. Has limited context (briefing documents) and specific success criteria.

**When to spawn:**
- Complex research requiring external API access
- Writing tasks (proposals, reports, analysis)
- Coordination (scheduling, agenda prep)
- Time-boxed analysis with clear deliverables

**Example:**
- "Research Gitcoin grant opportunities for climate projects in Catalonia" → spawn subagent with context docs → receive report → close

**Related terms:** Agent, persona, task-runner

**Source:** `docs/AGENT-SPAWNING-TEMPLATES.md`

---

## D. OPERATIONAL FLOWS

### Daily Loop
**Definition:** Light coordination tasks run every day to catch urgent issues and maintain operational continuity.

**Steps:**
1. Heartbeat monitor detects urgent/overdue tasks
2. Meeting processor ingests new notes
3. Schema generator validates data integrity
4. Log key changes to memory/YYYY-MM-DD.md

**Owner:** Agent-led with human spot-checks

**Related terms:** Weekly loop, monthly loop, operational rhythm

**Source:** `docs/SKILLS-WORKFLOWS-SCOPE.md`

---

### Weekly Loop (Ops Sync)
**Definition:** Comprehensive operational review and synchronization every Tuesday.

**Steps:**
1. Funding scout scans/updates opportunity pipeline
2. Knowledge curator curates signals from channels
3. Meeting processor captures all weekly meetings
4. Heartbeat monitor reconciles blockers
5. Notion reconciliation (Projects/Tasks sync)
6. Schema validation (npm run validate:schemas)

**Owner:** Agent prep + team execution (Luiz, Giulio, Andrea)

**Related terms:** Daily loop, monthly loop, rhythm, sync ritual

**Source:** `HEARTBEAT.md`, `docs/SOURCE-OF-TRUTH-MATRIX.md`

---

### Monthly Loop (Integrity Check)
**Definition:** Deep structural audit and cleanup to prevent drift and maintain system health.

**Steps:**
1. Validate source-of-truth alignment (Notion ↔ local)
2. Archive completed HEARTBEAT tasks
3. Review README and index integrity
4. Audit memory system consistency
5. Federation sync with hub

**Owner:** Luiz with agent support

**Related terms:** Daily loop, weekly loop, source-of-truth

**Source:** `docs/WORKSPACE-INDEXING-RETRIEVAL-IMPLEMENTATION-PLAN.md`

---

### Feedback → Action Loop
**Definition:** The non-negotiable control cycle that turns feedback, bugs, and improvement suggestions into documented, executed changes.

**Steps:**
1. **Capture** — Document feedback in FEEDBACK-ACTION-REGISTER.md
2. **Classify** — Is this a doc issue? Process gap? Data inconsistency?
3. **Map** — Link to responsible files/tasks and assign owner
4. **Execute** — Make the change with source refs
5. **Verify** — Log evidence (what changed? why?)
6. **Close** — Mark as done; update source files

**Why it matters:** Without this loop, the organization drifts and agents get stale instructions.

**Related terms:** HEARTBEAT, memory system, escalation

**Source:** `docs/FEEDBACK-ACTION-REGISTER.md`

---

## E. DATA & KNOWLEDGE SYSTEMS

### Source-of-Truth
**Definition:** The single authoritative version of a piece of data. When local OS and Notion versions conflict, source-of-truth rules decide which wins.

**ReFi BCN policy:**
- **Notion** = live operations layer (Projects, Tasks, CRM, Notes)
- **Local OS** (data/*.yaml) = canonical governance/reporting layer
- **Selective sync, not blind mirroring**

**Examples:**
- ✅ A project status updated in Notion; agent syncs to local data/projects.yaml with source_refs
- ✅ A decision made in Telegram; agent logs to MEMORY.md + memory/YYYY-MM-DD.md
- ❌ Data exists in both places but versions conflict and no source_refs to resolve

**Related terms:** Reconciliation, source_refs, drift

**Source:** `docs/SOURCE-OF-TRUTH-MATRIX.md`

---

### Source Refs
**Definition:** Metadata that tracks where a piece of information came from (file path, line number, date, URL, etc.).

**Format (in YAML):**
```yaml
project:
  name: "Project X"
  source_refs:
    - path: "Notion/Projects DB/Project X"
    - path: "repos/Regenerant-Catalunya/docs/phase-2/"
    - date: "2026-03-15"
```

**Why it matters:** Without source_refs, agents can't determine which version is authoritative or trace decisions back to context.

**Related terms:** Traceability, metadata, audit trail

**Source:** `docs/SOURCE-OF-TRUTH-MATRIX.md`

---

### Knowledge Graph
**Definition:** A machine-searchable reference containing all organizational knowledge needed for agent reasoning.

**Components:**
- Core identity (mission, values, org structure)
- Decision history (why we chose this path)
- Project portfolio (what we're executing)
- Funding landscape (what resources are available)
- Relationships (who we work with)
- Operational rhythms (what happens daily/weekly/monthly)

**Related terms:** Memory system, context layers, reasoning

**Source:** `docs/AGENT-KNOWLEDGE-GRAPH.md`

---

### Memory System
**Definition:** The distributed record-keeping system that enables organizational continuity across sessions.

**Components:**
- `MEMORY.md` — Index of key decisions + active context (curated)
- `memory/YYYY-MM-DD.md` — Daily session notes (append-only)
- `HEARTBEAT.md` — Active tasks + monitoring (update real-time)
- `data/*` — Canonical registries (source of truth)
- `packages/operations/*` — Structured records (meetings, projects, finances)

**Why it matters:** If memory breaks, organization loses continuity. Every agent session loads memory first.

**Related terms:** Continuity, context, session startup

**Source:** `AGENTS.md` memory system, `docs/AGENT-KNOWLEDGE-GRAPH.md`

---

## F. GOVERNANCE & DECISION-MAKING

### Consensus with Objection Window
**Definition:** ReFi BCN's decision model. Decisions proceed unless someone voices a principled objection within the window.

**Process:**
1. Proposal circulated (Telegram, email, or meeting)
2. Team has 3 days to raise objections
3. No objections → decision stands
4. Objections raised → discussion until alignment or escalation

**Why it matters:** Avoids both paralysis (endless discussion) and authoritarianism (unilateral decisions).

**Related terms:** Decision authority, approval matrix, governance

**Source:** `federation.yaml` governance model, `SOUL.md` values

---

### Approval Matrix
**Definition:** Explicit rules for who can approve which action types.

**Examples:**
- **Strategy:** Core team consensus
- **Funding under $5K:** Luiz approval
- **Funding over $5K:** Core team consensus + multisig signers (if on-chain)
- **External comms:** Luiz approval
- **Federation decisions:** Luiz + relevant peers

**Why it matters:** Removes ambiguity about "who decides?" Prevents bottlenecks and unauthorized actions.

**Related terms:** Decision authority, escalation, autonomy

**Source:** `AGENTS.md` safety policy, `docs/AGENT-AUTONOMY-MATRIX.md`

---

### Escalation
**Definition:** Process for bringing ambiguous or high-stakes decisions to humans for approval.

**Trigger examples:**
- Agent is uncertain about autonomy level for an action
- Action has external/financial implications
- Feedback conflicts with existing policy
- Decision required that affects multiple teams/domains

**Process:**
1. Agent identifies escalation need
2. Agent drafts summary with options/recommendation
3. Agent sends to Luiz (or relevant maintainer)
4. Human reviews and decides
5. Agent implements decision + logs outcome

**Related terms:** Approval matrix, decision authority, autonomy level

**Source:** `AGENTS.md` safety policy

---

## G. FEDERATION & NETWORK

### Federation
**Definition:** The network of aligned organizations (ReFi DAO, Regen Coordination, peer nodes) coordinating around regenerative governance and finance.

**ReFi BCN's role:** Local node contributing local context + learning from peer nodes.

**Key integration points:**
- Knowledge commons (shared research, ecosystem mapping)
- Governance patterns (how other nodes organize)
- Funding coordination (larger grant cycles)
- Standards (EIP-4824 organizational schemas)

**Related terms:** Peer, hub, trust model, network node

**Source:** `federation.yaml`, `IDENTITY.md`

---

### Peer
**Definition:** Another organization in the federation network. ReFi BCN treats peers as collaborators, not competitors.

**ReFi BCN's peer nodes:**
- ReFi DAO (global coordination hub)
- Regen Coordination (governance standards)
- Regenerant Catalunya (program partner)
- Other local nodes (Barcelona/regional/beyond)

**Related terms:** Federation, trust model, integration

**Source:** `federation.yaml` peers block, `IDENTITY.md`

---

### Hub
**Definition:** The federation hub is the coordination point for network-level decisions and knowledge commons publishing.

**ReFi BCN relationship to hub:**
- Read: Access to hub's knowledge commons
- Write: Can propose projects/decisions to hub
- Contribute: Publish ReFi BCN learnings/ecosystem map to commons

**Related terms:** Federation, peer, coordination

**Source:** `federation.yaml` hub, `regen-coordination-hub` repository

---

### Knowledge Commons
**Definition:** Shared knowledge infrastructure where federation peers publish research, governance patterns, and learnings.

**ReFi BCN contributions:**
- Ecosystem map (Barcelona/Catalonia regenerative landscape)
- Meeting summaries (network insights)
- Project documentation (how we organize)
- Decision history (why we chose certain paths)

**Privacy boundary:** Internal strategy discussions stay private; operational/research outputs go to commons.

**Related terms:** Federation, peer learning, transparency

**Source:** `federation.yaml` knowledge-commons block

---

## H. TREASURY & FINANCIAL

### Multisig
**Definition:** Multi-signature governance. A smart contract that requires N-of-M signers to approve actions (transfers, parameter changes, etc.).

**ReFi BCN's setup:**
- Treasury Safe: `0x91889ea97FeD05180fb5A70cB9570630f3C0Be77` (Celo)
- Shared with Regenerant Catalunya (program efficiency)
- Requires consensus approval for payouts

**Why it matters:** Multisig prevents single-person theft/mistakes and embodies cooperative governance.

**Related terms:** Safe, treasury, on-chain governance

**Source:** `IDENTITY.md`, `TOOLS.md`

---

### Safe (Gnosis Safe)
**Definition:** Smart contract platform for managing treasuries with multisig approval.

**ReFi BCN usage:**
- Primary treasury management tool
- Used on Celo chain
- Integration with frontend (Rabby wallet, Safe app)

**Related terms:** Multisig, treasury, on-chain, smart contract

**Source:** `TOOLS.md` API endpoints

---

### Payout Draft vs Execution
**Definition:** Two-step process for financial transfers.

**Draft:** Agent prepares a proposed transaction (who, what, why, amount) for human review.  
**Execution:** Human reviews draft, approves, and executes on-chain (or delegates signing).

**Why it matters:** Financial actions require human oversight. Drafts let agents prepare thoroughly; humans maintain final control.

**Related terms:** Autonomy level, approval matrix, capital-flow

**Source:** `docs/SKILLS-WORKFLOWS-SCOPE.md` capital-flow skill

---

## I. CROSS-CUTTING PRINCIPLES

### Source Traceability
**Definition:** Every important piece of data should trace back to its origin (file, date, person, decision).

**Why it matters:** Enables accountability, prevents lost context, helps agents cite sources correctly.

**Practice:**
- Every .yaml entry has source_refs field
- Every meeting note links to transcript/source
- Every decision has owner + date + rationale
- Every agent output cites what it used to decide

**Related terms:** Source_refs, audit trail, accountability

**Source:** `docs/SOURCE-OF-TRUTH-MATRIX.md`

---

### Operational Clarity
**Definition:** ReFi BCN prioritizes "what do we do on Tuesday?" over abstract concepts.

**Why it matters:** Prevents mission creep, keeps team aligned on concrete next steps, makes agent instructions unambiguous.

**Practice:**
- Weekly ops syncs (not endless philosophy discussions)
- Explicit tasks with owners + deadlines (not vague aspirations)
- HEARTBEAT as active priority source (not aspirational vision docs)
- Agent autonomy boundary rules (not intuition calls)

**Related terms:** Practicality, execution discipline, feedback loops

**Source:** `SOUL.md` voice, `AGENTS.md` operating principles

---

### Continuous Improvement
**Definition:** ReFi BCN learns from each cycle and evolves (vs static operations).

**Mechanisms:**
- Weekly feedback loop (FEEDBACK-ACTION-REGISTER.md)
- Monthly deep audits (source-of-truth drift, memory consistency)
- Quarterly agent effectiveness review
- Decision history review before major new decisions

**Why it matters:** Prevents stale playbooks; keeps org responsive to reality.

**Related terms:** Feedback, learning, iteration

**Source:** `docs/WORKSPACE-INDEXING-RETRIEVAL-IMPLEMENTATION-PLAN.md`

---

## J. QUICK REFERENCE TABLE

| Term | Simple Definition | Context | See also |
|---|---|---|---|
| ReFi | Regenerative finance (Web3 + ecology) | Mission | Regenerative, ESS |
| Cosmo-local | Global tools, local action | Mission | Federation, ESS |
| ESS | Solidarity economy (cooperatives, social enterprises) | Context | Local, community |
| LocalNode | Regional ReFi coordination point | Structure | Federation, hub |
| Coop in formation | Moving toward cooperative governance | Structure | Governance, decision |
| Multisig | N-of-M approval (multiple signers needed) | Treasury | Safe, payout |
| Source-of-truth | Authoritative version of data | Data | source_refs, reconciliation |
| Feedback loop | Feedback → action → evidence → close | Operations | HEARTBEAT, memory |
| Daily loop | Light daily coordination | Rhythm | Weekly, monthly |
| Escalation | Bring decision to human for approval | Governance | Approval matrix, autonomy |
| Agent | AI operational partner | Roles | Persona, subagent |
| Autonomy level | How much independent decision authority | Agent | [FULL] to [NONE], persona |
| Approval matrix | Rules for who approves what | Governance | Decision authority, escalation |

---

## K. ADDING NEW TERMS

**When a new term emerges:**
1. Add to this document with simple definition
2. Include context (why this term matters for ReFi BCN)
3. Link to related terms
4. Add source (which file introduced this term?)
5. Request feedback from Luiz/team at next ops sync
6. Update agent knowledge graph if strategic importance

---

---

## ADDENDUM: Terms Added 2026-03-19

### Workfront
**Definition:** A named, bounded area of active operational work with its own scope, deliverables, timeline, and status tracking. Used in MASTERPLAN.md to organize parallel streams of agent execution.

**Why it matters:** Workfronts structure how agents prioritize and parallelize work. Each workfront has clear ownership (human, agent, or collaborative) and defined completion criteria.

**Examples:**
- Workfront A: Telegram Topic-Aware Rollout
- Workfront B: Notion Infrastructure Review
- Workfront C: Regenerant Catalunya — Miceli Safe Workshop
- Workfront D: Funding Pipeline

**Related terms:** Sprint, Task, Project, Heartbeat task

**Source:** `MASTERPLAN.md` Section 4

---

### Practical Experimentation
**Definition:** ReFi BCN's commitment to testing ideas in real operational conditions before codifying them as standards. Emphasizes learning-by-doing over theoretical planning.

**Why it matters:** As a core value, it shapes how ReFi BCN approaches new tools, governance structures, and partnerships — try small, document what works, then scale.

**Examples:**
- ✅ Testing Safe multisig with Miceli before recommending it to other partners
- ✅ Running Telegram topic routing as a pilot before formalizing
- ✅ Experimenting with agent-assisted ops before writing the full skills spec
- ❌ Writing a 50-page governance framework before any real governance decisions

**Related terms:** Regenerative, Cosmo-local practice, Minimum viable process

**Source:** `SOUL.md` Core Values

---

_This vocabulary is the glue that holds ReFi BCN's operating model together. Keep it current as the organization evolves._

_Last updated: 2026-03-19 by Agent Training Initiative (Week 2 gap fix)_
