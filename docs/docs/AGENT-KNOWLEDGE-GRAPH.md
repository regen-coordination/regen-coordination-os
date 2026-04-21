# Agent Knowledge Graph — ReFi BCN Organizational Context

**Purpose:** A comprehensive, machine-searchable reference for all agent reasoning. This is the ground truth for "what do agents need to know about ReFi BCN?"

**Last updated:** 2026-03-17  
**Maintenance:** Update whenever decisions are made, new relationships formed, or priorities shift.

---

## 1. CORE IDENTITY

### Mission Statement
ReFi Barcelona (ReFi BCN) builds bridges between local regenerative initiatives in Barcelona and Catalonia and global regenerative finance infrastructure. We coordinate funding, learning, and governance pathways so communities can access resources while preserving local autonomy and cooperative values.

**Source:** `SOUL.md`

### Core Values
1. **Regenerative over extractive** — Prioritize ecological/social regeneration over short-term gains
2. **Cosmo-local practice** — Global knowledge + resources, local rooted action
3. **Cooperative and community-centered governance** — Participation, transparency, shared accountability
4. **Open knowledge commons** — Documentation and learning are collective infrastructure
5. **Practical experimentation** — Test, learn, adapt with evidence and care

**Source:** `SOUL.md`

### Organization Type
- **Name:** ReFi Barcelona (ReFi BCN)
- **Type:** LocalNode (cooperative in formation)
- **Stage:** Operational baseline (launched 2026-03-07)
- **Geography:** Barcelona and Catalonia, with global ecosystem articulation

**Source:** `IDENTITY.md`

### On-Chain Identity
- **Primary Chain:** Celo (eip155:42220)
- **Treasury Safe:** `0x91889ea97FeD05180fb5A70cB9570630f3C0Be77` (Regenerant Catalunya, shared multisig)
- **daoURI:** https://refibcn.cat/.well-known/dao.json
- **Standards:** EIP-4824 (organizational identity schema)

**Source:** `IDENTITY.md`, `TOOLS.md`

### Vision of Change
ReFi BCN succeeds when:
1. Local Barcelona/Catalonia communities have access to regenerative finance resources without losing autonomy
2. Global ReFi infrastructure (ReFi DAO, Regen Coordination, Web3 tools) are translated into cooperative language
3. Local ESS (solidarity economy) and Web3/ReFi ecosystems genuinely strengthen each other
4. Decision-making remains grounded in community needs, not technology trends

**Source:** `SOUL.md`, `MEMORY.md` (decisions 2026-03-12)

---

## 2. ORGANIZATIONAL STRUCTURE

### Core Team
- **Luiz Fernando Gomez Segala** (Founder, Strategy Lead)
  - Timezone: Europe/Barcelona
  - Roles: Strategy, ecosystem coordination, grants/funding ops, knowledge systems
  - Primary channels: Email, Telegram, GitHub, planning docs
  - Decision authority: High autonomy for strategy, approval required for financial/external comms
  - **Source:** `USER.md`, `IDENTITY.md`

- **Giulio Quarta** (Maintainer)
  - Role: [To be filled in after onboarding]
  - **Source:** `federation.yaml` governance block

- **Andrea Farias** (Maintainer)
  - Role: [To be filled in after onboarding]
  - **Source:** `federation.yaml` governance block

### Governance Model
- **Decision Model:** Consensus-based with objection window
- **Approval Matrix:**
  - Strategy/planning: Consensus of core team
  - Financial actions: Luiz + multisig signers
  - External communications: Luiz approval
  - Federation decisions: Core team + relevant peers
- **Maintenance:** Luiz (owner) + Giulio + Andrea

**Source:** `federation.yaml` governance block, `AGENTS.md` safety policy

### Roles & Responsibilities

| Role | Responsibility | Decision Authority | Example Tasks |
|---|---|---|---|
| **Operator (Luiz)** | Set priorities, approve high-impact actions, federation alignment | High | Review HEARTBEAT, approve proposals, align with peers |
| **Maintainer (Giulio)** | [TBD after onboarding] | Medium | [TBD] |
| **Maintainer (Andrea)** | [TBD after onboarding] | Medium | [TBD] |
| **ReFi-BCN Agent** | Execute day-to-day workflows, keep canonical files current, escalate decisions | High (ops), None (external/financial) | Process meetings, track funding, monitor heartbeat, update memory |

---

## 3. NETWORK RELATIONSHIPS

### Federation Network
- **Network:** regen-coordination
- **Hub:** github.com/regen-coordination/hub
- **Trust Model:** Read-based (peers share knowledge; ReFi BCN contributes insights)

### Peer Nodes

| Peer | Type | Relationship | Key Coordination | Source |
|---|---|---|---|---|
| **ReFi DAO** | Hub/Coordination | Strategic alignment | Network-level governance, grants coordination, node support | `federation.yaml` peers |
| **Regen Coordination** | Hub | Governance framework | DAO-OS extension, federation sync, standards | `federation.yaml` upstream |
| **Regenerant Catalunya** | Program | Operational partner | Treasury shared (Celo Safe), program execution, funding | `TOOLS.md`, repos |
| **ReFi-Barcelona Repo** | Knowledge base | Knowledge infrastructure | Ecosystem mapping, research outputs, Obsidian vault | `repos/ReFi-Barcelona/` |
| **Regen Coordination OS** | Template | Framework upstream | Standards, schema templates, agent patterns | `federation.yaml` upstream |

### External Partners
- **Funding platforms:** Gitcoin, Celo Public Goods, Localism Fund, Karma GAP
- **Technical integrations:** Safe (treasury), Telegram (coordination), Notion (operations), GitHub (versioning)
- **Knowledge infrastructure:** Obsidian (local vault), Quartz (publishing)

**Source:** `TOOLS.md`, `federation.yaml`

### Communication Channels

| Channel | Purpose | Owner | Frequency | Integration |
|---|---|---|---|---|
| **Internal Telegram** | Fast coordination, decision signals | Luiz | Daily | Routed to Notion CRM, HEARTBEAT |
| **Telegram Network Topics** | ReFi DAO + peer coordination | Federation | As needed | Selective knowledge commons publishing |
| **GitHub** | Versioned records, public sharing | Luiz + team | Weekly (sync) | Mirror of local OS data |
| **Notion workspace** | Live operations (CRM/Projects/Tasks) | Team | Real-time | Reconciled with local OS weekly |
| **Email** | Formal communications | Luiz | As needed | Filed to ops records |

**Source:** `TOOLS.md`, `docs/CHANNELS-AND-SYSTEMS-MAP.md`

---

## 4. FUNDING LANDSCAPE

### Current Funding Status
- **Treasury:** Celo multisig (shared with Regenerant Catalunya for program efficiency)
- **Active Opportunities:** [Populate from data/funding-opportunities.yaml]
- **Priority Gaps:** Endowment fund, concessional debt instruments, direct community grants

**Source:** `IDENTITY.md`, `data/funding-opportunities.yaml`

### Funding Strategy
1. **Diversify sources:** Mix of grants, earned revenue, community contributions
2. **Local-first validation:** Test models with Barcelona/Catalonia communities first
3. **Federation amplification:** Leverage ReFi DAO for larger funding cycles
4. **Impact transparency:** Clear reporting via EIP-4824 schemas + Karma GAP

**Source:** `MEMORY.md` decisions, `SOUL.md` values

### Key Funding Platforms
- **Gitcoin:** Active through ecosystem coordination (small grants)
- **Celo Public Goods:** Aligned with treasury chain; used for program funding
- **Localism Fund:** Matching route for local initiatives
- **Karma GAP:** Program reporting + public activity tracking

**Source:** `TOOLS.md` funding accounts

---

## 5. PROJECT PORTFOLIO

### Active Projects (as of 2026-03-17)

**1. ReFi BCN Core Coordination**
- **Status:** Ongoing operational execution
- **Scope:** Maintain daily/weekly/monthly coordination loops
- **Owner:** Luiz + team
- **Key outcomes:** Coherent agent OS, team alignment, federation presence
- **Source:** `data/projects.yaml`, `HEARTBEAT.md`

**2. Notion Infrastructure Review & Consolidation (project-notion-infra-review-2026)**
- **Status:** Active (T3–T9 in progress)
- **Scope:** Full Notion database export → local OS reconciliation
- **Tasks:** T1–T2 complete; T3–T4 in progress; T5–T9 scheduled
- **Owner:** Luiz + ops sync team (Giulio + Andrea)
- **Deliverables:** Reconciliation report, updated projects.yaml, archived stale items
- **Deadline:** End of sprint (2026-03-21)
- **Source:** `HEARTBEAT.md` projects, `memory/2026-03-17.md`

**3. Regenerant Catalunya Phase 2 Execution**
- **Status:** Active program execution
- **Scope:** Safe setup workshop, multisig governance, fund deployment
- **Owner:** Miceli + Luiz (facilitation)
- **Key milestones:** Safe workshop (target 2026-03-19), runbook v1, test transaction
- **Source:** `HEARTBEAT.md`, `repos/Regenerant-Catalunya/`

**4. ReFi BCN Ecosystem Map & Knowledge Infrastructure**
- **Status:** Ongoing (Obsidian vault active, Quartz migration planned)
- **Scope:** Ecosystem documentation, relationship mapping, knowledge commons publishing
- **Owner:** Luiz + curation team
- **Source:** `repos/ReFi-Barcelona/`, `knowledge/`

**5. ReFi DAO Cooperative Service Framework (2026-03-12 workshop)**
- **Status:** Definition complete; implementation pending
- **Scope:** Three service pillars (Network Coordination, Research & Sense-Making, Regenerative Finance)
- **Owner:** ReFi DAO network + ReFi BCN contribution
- **Next:** Monthly strategy calls + Thursday flexible work sessions (ongoing)
- **Source:** `MEMORY.md` decisions, `HEARTBEAT.md`

---

## 6. OPERATIONAL RHYTHMS

### Daily Loop (Light)
1. **Heartbeat monitor** detects urgent/overdue tasks
2. **Meeting processor** ingests any new operational notes
3. **Schema generator** runs after material updates
4. Log key decisions to `memory/YYYY-MM-DD.md`

**Autonomy:** Agent-led with human spot-checks

**Source:** `docs/SKILLS-WORKFLOWS-SCOPE.md`

### Weekly Loop (Ops Sync)
1. **Funding scout** scans and updates opportunity pipeline
2. **Knowledge curator** curates signals from channels/notes/repos
3. **Meeting processor** ensures all meetings structurally captured
4. **Heartbeat monitor** reconciles overdue + blocked chains
5. **Notion reconciliation** (Projects/Tasks sync to local)
6. Schema QA: `npm run validate:schemas`

**Schedule:** Tuesdays (ops sync with team)  
**Owner:** Luiz + Giulio + Andrea  
**Autonomy:** Agent prep + human execution

**Source:** `HEARTBEAT.md`, `docs/SOURCE-OF-TRUTH-MATRIX.md`

### Monthly Loop (Integrity)
1. Validate source-of-truth drift (Notion ↔ local)
2. Prune stale HEARTBEAT tasks; archive completed items
3. Review README/index integrity
4. Deep audit of memory system consistency
5. Federation sync with hub

**Owner:** Luiz (with agent support)  
**Autonomy:** Agent analysis + human decision

**Source:** `docs/WORKSPACE-INDEXING-RETRIEVAL-IMPLEMENTATION-PLAN.md`

---

## 7. DECISION HISTORY (Key Decisions)

### Strategic Decisions

| Date | Decision | Rationale | Owner | Impact |
|---|---|---|---|---|
| 2026-03-12 | Define ReFi DAO cooperative service framework (3 pillars) | Clarify ReFi DAO's operational scope and naming | ReFi DAO network | Shapes monthly rituals and partner alignment |
| 2026-03-12 | Establish monthly strategy calls + Thursday work sessions | Operationalize network coordination | ReFi DAO network | Ongoing tempo for ReFi BCN coordination |
| 2026-03-11 | Enforce boundary between ReFi BCN and Luiz personal scope | Maintain org clarity and governance | Luiz | Clear delegation + agent autonomy |
| 2026-03-08 | Prioritize process implementation before Telegram rollout | Risk mitigation (avoid broken automation) | Luiz | Shaped Phase 1 execution order |
| 2026-03-07 | Restrict data/members.yaml to core team only (3 members) | Clean governance model | Luiz | Simplified HEARTBEAT + role clarity |
| 2026-03-07 | Launch workspace indexing/retrieval program | Enable proactive agent behavior | Luiz | Master index + continuous improvement |

**Source:** `MEMORY.md` key decisions block

### Operational Decisions

| Date | Decision | Owner | Status |
|---|---|---|---|
| 2026-03-16 | Miceli Safe workshop materials finalized + distributed | Luiz | Complete (ready for execution 2026-03-19) |
| 2026-03-12 | Telegram topic routing registry + boundaries documented | Luiz + agent | Complete (ready for acceptance tests) |
| 2026-03-12 | ReFi BCN branding workshop outcomes integrated | All partners | In progress (outputs to Notion + website) |
| 2026-03-10 | Notion T1/T2 (Projects + Tasks) exported for reconciliation | Agent | Complete (ready for T3–T4 analysis) |

**Source:** `HEARTBEAT.md` recently completed

---

## 8. SUCCESS METRICS & MILESTONES

### Q1 2026 (Current Quarter)
- [ ] Agent training masterplan executed (Phase 1 complete by 2026-04-14)
- [ ] Miceli Safe workshop successful (target 2026-03-19)
- [ ] Telegram bot live with topic routing (end of March)
- [ ] Notion reconciliation complete (T1–T9, end of March)
- [ ] Funding pipeline populated (5+ opportunities with deadlines)
- [ ] Giulio + Andrea fully onboarded and contributing

### Q2 2026 (Preview)
- [ ] Agents running autonomously in daily/weekly/monthly loops
- [ ] Federation peer coordination patterns established
- [ ] Knowledge commons publishing working
- [ ] First major grant application or partnership formalized

---

## 9. EXTERNAL CONTEXT (Broader Ecosystem)

### ReFi Ecosystem Status
- **ReFi DAO:** Maturing network of regional nodes; governance phase active
- **Regen Coordination:** Building OS frameworks for DAOs + regenerative organizations
- **Web3 tooling:** Safe, Hats, Gardens mature; EIP-4824 emerging standard for org identity
- **Local Barcelona/Catalonia:** ESS/cooperative movement active; limited Web3 exposure but growing interest

**Source:** `repos/ReFi-Barcelona/content/02-ecosystem/`

### Key Assumptions (To Validate)
1. Barcelona/Catalonia communities will embrace Web3 if presented as cooperative tool
2. Regenerative finance can work at local scale with global infrastructure support
3. ReFi DAO will continue as stable network coordination layer
4. Funding will diversify (grants + community contributions + earned revenue)

**Source:** `SOUL.md` vision, `MEMORY.md` context

---

## 10. CRITICAL CONSTRAINTS & RISKS

### Constraints
1. **Team size:** 3 core members (Luiz, Giulio, Andrea) — limits bandwidth
2. **Funding:** Currently exploratory; no guaranteed revenue yet
3. **Treasury model:** Shared multisig with Regenerant Catalunya (coordination overhead)
4. **Technology:** Adoption of Web3/DAO tools depends on community readiness

### Risks
1. **Governance drift:** If Telegram/Notion coordination breaks, team loses visibility
2. **Knowledge loss:** If agent memory system fails, organization loses continuity
3. **Funding cliff:** If grants end, model needs to prove self-sustainability
4. **Network instability:** If ReFi DAO or federation peers become unreliable, loses external alignment

### Mitigation
- Rigorous feedback→action loops (docs/FEEDBACK-ACTION-REGISTER.md)
- Memory system discipline (daily notes + weekly synthesis)
- Diversified funding strategy (multiple platforms + funding models)
- Federation redundancy (maintain peer relationships, don't over-depend on single source)

**Source:** `SOUL.md` boundaries, `HEARTBEAT.md` active monitoring

---

## 11. TERMINOLOGY (Quick Reference)

| Term | Definition | Used in |
|---|---|---|
| **ReFi** | Regenerative Finance — using Web3 tools for ecological/social regeneration | Mission, funding landscape |
| **LocalNode** | ReFi DAO term for regional coordination nodes | IDENTITY.md |
| **Cosmo-local** | Global knowledge + resources, local action (cooperative principle) | SOUL.md values |
| **ESS** | Economia Solidaria (solidarity economy) — local cooperative enterprises | SOUL.md, context |
| **Multisig** | Multi-signature governance (requires N-of-M approvals for actions) | Treasury, Regenerant Catalunya |
| **DAO** | Decentralized Autonomous Organization (Web3-based governance structure) | Federation, standards |
| **EIP-4824** | Ethereum standard for organizational identity schemas | Schema generation |
| **Safe** | Gnosis Safe — primary multisig/treasury smart contract | TOOLS.md, Regenerant |
| **Notion** | Live operations database (CRM, Projects, Tasks, Notes, Research) | Integration layer |
| **Source-of-truth drift** | When local OS and Notion versions become misaligned | SOURCE-OF-TRUTH-MATRIX.md |
| **HEARTBEAT** | Active task + monitoring file (emergent priorities + deadlines) | Core ops |

---

## 12. INFORMATION RETRIEVAL MAP

**To find [X], look in:**
- Mission/values: `SOUL.md` + this graph section 1–2
- Organization structure: `IDENTITY.md`, this graph section 3
- Team info: `USER.md`, federation.yaml governance
- Relationships: this graph section 3, `data/relationships.yaml` (when created)
- Projects: `data/projects.yaml`, `packages/operations/projects/`, this graph section 5
- Funding: `data/funding-opportunities.yaml`, `data/finances.yaml`, this graph section 4
- Rhythms/processes: `docs/SKILLS-WORKFLOWS-SCOPE.md`, this graph section 6
- Decisions: `MEMORY.md`, `memory/YYYY-MM-DD.md`, this graph section 7
- Metrics: `HEARTBEAT.md`, this graph section 8
- Ecosystem context: `repos/ReFi-Barcelona/`, this graph section 9

---

## 13. AGENT REASONING GUIDE

**When an agent needs to decide or act:**

1. **Check identity & constraints**
   - What is ReFi BCN's mission? (section 1)
   - What are core values? (section 1)
   - What is my autonomy level for this action? (`AGENTS.md` safety policy)

2. **Check context**
   - What are active projects? (section 5)
   - What are current deadlines/blockers? (`HEARTBEAT.md`)
   - What was the last relevant decision? (section 7, `MEMORY.md`)
   - Who owns this domain? (section 3)

3. **Check operational patterns**
   - Does this fit daily/weekly/monthly loop? (section 6)
   - How do I maintain source-of-truth? (`SOURCE-OF-TRUTH-MATRIX.md`)
   - Where do I log outcomes? (section 6, `AGENTS.md` memory system)

4. **Execute with feedback**
   - Log to memory as I go
   - Escalate ambiguous decisions to operator
   - Evidence capture (source refs, links, outcomes)
   - Close loop in HEARTBEAT/memory

---

_This knowledge graph is a living document. Update whenever organizational context changes._

_Last updated: 2026-03-17 by Agent Training Initiative_
