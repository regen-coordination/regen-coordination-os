# Agent Context Layers — Regen Coordination Hub Architecture

**Purpose:** Map what context matters for each agent role in a hub coordination network, what files to load, what APIs they interact with, and what to skip for efficient operation.

**Version:** 1.0.0  
**Date:** 2026-03-19  
**Related:** `MASTERPROMPT.md`, `AGENTS.md`, `federation.yaml`

---

## Context Mapping by Agent Role

| Agent Role | Context It Needs | Context It Doesn't Need |
|-----------|-----------------|------------------------|
| **Hub Cursor Agent** | All hub workspace files, MASTERPROMPT, federation.yaml, node registry, downstream member states, knowledge commons structure | Node-specific internal operations (CRM data, Telegram internals, pending payouts) |
| **Subagent (Hub Task)** | Task-specific context passed at spawn, hub data, relevant node summaries | Full federation state, all node operational details, full knowledge graph |
| **Federation Peer (Node Agent)** | Published hub schemas, knowledge commons, shared skills, network topology | Hub internal decisions, council deliberations, funding allocation drafts |
| **Council Coordination Agent** | Council decisions, member alignment, cross-node synthesis, governance records | Operational details (CI/CD status, Notion sync details, schema internals) |

---

## Role 1: Hub Cursor Agent

### Purpose
The primary hub coordination agent — network-centric, federation-aware, council-coordinating. Serves as the AI coordination layer for the federation of regenerative nodes.

### Startup File Load Sequence (Ordered)

```
Priority 1 — Essential (always load)
├── MASTERPROMPT.md          → Hub mandate, workfronts, success metrics
├── SOUL.md                  → Network values: bioregional autonomy, open knowledge
├── IDENTITY.md              → Hub identity, Gnosis Chain, council structure
├── federation.yaml          → Network topology, downstream nodes (7+), peer relationships
└── MEMBERS.md               → Node registry, status (🟢🟡🔴), agent configurations

Priority 2 — Operational Context (load on demand)
├── MEMORY.md                → Key decisions, active context, network history
├── memory/YYYY-MM-DD.md     → Recent council sessions, recent operations
├── data/*.yaml             → Node registries, funding opportunities, initiatives
├── WORKFRONTS_IMMEDIATE.md  → Current priorities across hub and downstream nodes
└── skills/INDEX.md          → Shared capabilities catalog

Priority 3 — Knowledge & Coordination
├── knowledge/<domain>/      → Aggregated commons by domain
├── skills/<name>/SKILL.md   → Skill documentation (load specific skill being used)
├── packages/coop/          → Coop product status (if workfront active)
└── integrations/           → Tool profiles and specs

Priority 4 — Automation & Federation
├── .github/workflows/      → GitHub Actions status (knowledge aggregation, skill distribution)
├── funding/<domain>/       → Pool configurations (if funding workfront active)
└── docs/*.md               → Process documentation
```

### APIs and Systems Interaction

| System | Interaction | Autonomy Level |
|--------|-------------|----------------|
| **Local filesystem** | Read/write all hub workspace files | [FULL] Read, [HIGH] Write to docs/memory/data, [MEDIUM] Modify core files (SOUL.md, federation.yaml governance sections) |
| **Git** | Status, subtree management, push/pull | [FULL] Status check, [HIGH] Commit generated files, [MEDIUM] Push to hub, [NONE] Push to embedded packages without approval |
| **GitHub API** | Actions status, workflow triggers | [FULL] Read status, [MEDIUM] Trigger workflows, [NONE] Modify Actions configuration |
| **Notion** (future) | Read/write network directory | [NONE] Not yet integrated — escalate to human |
| **Forum API** (hub.regencoordination.xyz) | Read posts, network visibility | [FULL] Read /latest.json, /c/regen-coordination/4.json |

### Write Permissions (Autonomy Scope)

| Write Target | Autonomy | Notes |
|--------------|----------|-------|
| `memory/YYYY-MM-DD.md` | [FULL] Append daily notes | Always append, never overwrite |
| `docs/*.md` | [HIGH] Create/update | Documentation drafts, workflows matrix |
| `data/*.yaml` | [HIGH] Update with source_refs | Node registries, funding opportunities, initiatives |
| `knowledge/<domain>/` | [HIGH] Curate aggregated content | Hub-level synthesis from node contributions |
| `skills/*/references/` | [FULL] Update supporting docs | Skill documentation |
| `HEARTBEAT.md` | [HIGH] Update task status | Mark complete, add blockers, cross-hub priorities |
| `AGENTS.md`, `MASTERPROMPT.md` | [MEDIUM] Propose changes | Draft edits, present for council review |
| `SOUL.md`, `federation.yaml` (governance sections) | [MEDIUM] Propose changes | Requires council approval for modifications |
| `MEMBERS.md` (node add/remove) | [NONE] | Requires council approval |
| `funding/<domain>/pool-config.yaml` | [NONE] | Requires council approval for pool configuration changes |

### Context Passed vs. Discovered

| Passed At Runtime | Discovered During Session |
|-------------------|---------------------------|
| Task instructions | Related files by path/reference |
| Node status updates | Node-specific details via federation.yaml |
| Council meeting context | Knowledge commons gaps |
| Funding opportunity signals | Shared skill updates |
| Workfront priorities | Network health indicators |

### Token Budget Considerations

**Small context window (8K-16K tokens):**
- Skip: Full knowledge commons per domain, detailed meeting transcripts from all nodes
- Load: MASTERPROMPT + SOUL + federation.yaml + MEMBERS (node list) + specific workfront
- Summarize: Node profiles, funding pipeline, skill catalogs

**Medium context window (32K tokens):**
- Skip: Historical memory beyond 14 days, full package/coop source code
- Load: Priority 1-2 + relevant Priority 3 (current workfronts only)

**Large context window (128K+ tokens):**
- Load: Full workspace context for complex cross-node synthesis tasks
- Consider: Knowledge commons for comprehensive network analysis

---

## Role 2: Subagent (Hub Task Runner)

### Purpose
Temporary agents spawned for specific hub tasks: research, writing, analysis, coordination, governance support. Limited context lifecycle, focused scope.

### Startup File Load Sequence (Ordered)

```
Priority 1 — Task Briefing (ALWAYS passed at spawn)
├── Task description          → Explicit instructions from spawner
├── Success criteria          → What "done" looks like
├── Output format requirements → Expected structure (markdown, YAML, etc.)
├── Constraints/boundaries    → Time, scope, approval gates
└── Hub context summary       → Condensed SOUL/IDENTITY/federation summary

Priority 2 — Essential Hub Context
├── SOUL.md (summary)         → Network values (condensed for token efficiency)
├── IDENTITY.md (summary)     → Hub name, type, chain, council structure
├── federation.yaml (peers)    → Target node for node-specific tasks
└── docs/OPERATIONAL-VOCABULARY.md → Terminology (lookup as needed)

Priority 3 — Task-Specific Context
├── Relevant data/*.yaml     → Only files related to task (nodes.yaml, funding-opportunities.yaml, etc.)
├── Relevant knowledge/<domain>/ → Domain content if knowledge task
├── Relevant skills/<name>/    → Skill docs for skill-related tasks
└── Relevant memory/*.md       → Recent context if temporal

Priority 4 — External (load if task requires)
├── Web search results        → If research task (funding platforms, ecosystem news)
├── API documentation         → If integration task
└── Node workspace files      → If cross-node analysis (via federation reference)
```

### APIs and Systems Interaction

| System | Interaction | Autonomy Level |
|--------|-------------|----------------|
| **Web search** | Research queries (Perplexity/Brave) | [FULL] For task research |
| **External APIs** | Data retrieval (GitHub, forum, etc.) | [HIGH] Query, [NONE] Write/post without approval |
| **Local files** | Read task context | [FULL] Read specified files |
| **Local files** | Write outputs | [FULL] Write to `memory/` drafts, [MEDIUM] Propose structured changes to data/ |
| **Subagent spawn** | Delegate sub-tasks (parallel node processing) | [MEDIUM] Spawn with clear scope |

### Task Types and Context Patterns

| Task Type | Files to Load | Output Format | Duration |
|-----------|---------------|---------------|----------|
| **Research** | SOUL + federation.yaml + data/funding-opportunities.yaml + web search | Markdown list with 5+ findings, sources | 30-45 min |
| **Writing** | SOUL + IDENTITY + task brief + examples | Document (500-2000 words), structured per type | 45-60 min |
| **Analysis** | federation.yaml + MEMBERS + data/nodes.yaml + relevant domain knowledge | Comparison matrix, recommendations | 30-45 min |
| **Coordination** | MASTERPROMPT + WORKFRONTS + data/initiatives.yaml + council context | Action items, owner assignments, timeline | 30-60 min |
| **Governance** | SOUL + federation.yaml (governance section) + MEMORY.md (recent decisions) | Decision documentation, ratification tracking | 45-90 min |

### Write Permissions (Autonomy Scope)

| Write Target | Autonomy | Notes |
|--------------|----------|-------|
| `memory/YYYY-MM-DD.md` | [FULL] Append task execution notes | Log subagent activity |
| `memory/subagent-*` | [FULL] Draft outputs | Task-specific draft files |
| `docs/*.md` (new) | [FULL] Create drafts | New documentation |
| `knowledge/<domain>/` (drafts) | [FULL] Draft curated content | Hub-level synthesis |
| `data/*.yaml` | [MEDIUM] Propose structured changes | Present diff for approval |
| External communications | [NONE] | Always escalate to spawner |
| Git commits/push | [NONE] | Spawner handles version control |

### Context Passing Conventions (Hub Cursor → Subagent)

**Always include in spawn task:**
1. **Task type** (research, writing, analysis, coordination, governance)
2. **Explicit scope** (what's in/out of bounds for this hub/network context)
3. **Output format** (markdown structure, YAML schema, decision record format, etc.)
4. **Success criteria** (measurable completion)
5. **Files to load** (specific paths, ordered priority)
6. **Time budget** (expected duration)
7. **Escalation triggers** (when to ask for help)

**Example spawn context for node analysis:**
```markdown
**Task:** Analyze ReFi BCN and Bloom node bootstrapping progress for council report
**Type:** Analysis
**Scope:** Compare status, blockers, next steps between the two nodes
**Output:** Markdown comparison table with recommendations for council
**Load files:** 
  - MEMBERS.md (node statuses)
  - federation.yaml (downstream section)
  - data/nodes.yaml (if exists)
**Time budget:** 30 min
**Escalate if:** Missing data on NYC node, unclear bootstrapping criteria, requires funding allocation decision
```

### Token Budget Considerations

**Always optimize for small context windows:**
- Load: Task briefing + essential hub context (condensed SOUL/IDENTITY) + specific data files
- Skip: Full knowledge commons, historical memory, unrelated skills, full meeting transcripts
- Summarize: Pass condensed network summary if full federation.yaml too large
- Use: External lookup (web search) rather than loading large reference docs

---

## Role 3: Federation Peer Agent (Node Interface)

### Purpose
Agent interface for federation network peers (ReFi BCN, NYC Node, Bloom, etc.) — shares public hub state, receives node contributions, distributes shared skills.

### Startup File Load Sequence (Ordered)

```
Priority 1 — Published Hub State
├── federation.yaml          → Network topology (what we share with all nodes)
├── MEMBERS.md               → Node registry (public status)
├── SOUL.md (public sections) → Mission, values, federated commons principles
├── IDENTITY.md (public)     → Hub type, chain, daoURI, council structure
└── skills/INDEX.md          → Shared capabilities catalog

Priority 2 — Knowledge Commons (Published)
├── knowledge/<domain>/      → Aggregated domain knowledge from all nodes
├── knowledge/network/       → Cross-node directory
└── Published meeting summaries → Council decisions (if marked publish: true)

Priority 3 — Skill Distribution
├── skills/<name>/SKILL.md   → Skill definitions for downstream nodes
├── skills/<name>/references/ → Supporting documentation
└── Skill distribution logs  → Recent push status

Priority 4 — Private (NEVER shared with nodes)
├── [NONE]                   → Nodes see only published content per federation.yaml
├── Internal HEARTBEAT details → Filtered to public status only
├── Council deliberations    → Only final decisions published
├── Funding allocation drafts → Never shared before council approval
├── Node-specific data       → Only what node contributes or hub aggregates
```

### APIs and Systems Interaction

| System | Interaction | Autonomy Level |
|--------|-------------|----------------|
| **Hub git sync** | Pull node contributions, push skill updates | [HIGH] Automated sync on schedule, [MEDIUM] Review before distribution |
| **Node APIs** | Read published node schemas/knowledge | [FULL] Read published peer content (if nodes publish .well-known/) |
| **Skill distribution** | Push skills/ updates to downstream nodes | [HIGH] Automated via distribute-skills.yml, [MEDIUM] Validate before push |
| **Knowledge aggregation** | Collect node contributions, generate synthesis | [FULL] Automated via aggregate-knowledge.yml |
| **Schema publication** | Maintain hub-level network schemas | [FULL] Regenerate on data changes |

### Write Permissions (Autonomy Scope)

| Write Target | Autonomy | Notes |
|--------------|----------|-------|
| `skills/` | [FULL] Maintain skill docs | Distribute to downstream nodes |
| `knowledge/<domain>/from-nodes/<node>/` | [FULL] Accept node contributions | Node-owned content, hub aggregates |
| `knowledge/<domain>/` (aggregated) | [HIGH] Curate synthesis | Hub-level knowledge aggregation |
| Skill distribution workflow | [HIGH] Trigger distribute-skills.yml | On push to skills/ |
| Node notification | [MEDIUM] Draft notifications | "Skill X updated; pull when ready" |
| `MEMBERS.md` (status updates) | [MEDIUM] Propose status changes | Based on sync health |
| Git subtree operations | [MEDIUM] Execute with validation | Pull/push packages/coop/, packages/regen-toolkit/ |

### Context Passed vs. Discovered

| Passed At Sync | Discovered During Interaction |
|-------------------|---------------------------|
| Hub schema updates | Node schema contributions (if nodes publish) |
| Skill distribution manifest | Node-specific skill additions (preserved on distribution) |
| Knowledge commons subscriptions | New node contributions |
| Network topology changes | Peer node status via MEMBERS.md |

### Schema Publication Protocol

**What context gets shared with nodes:**

| Data Element | Shared Form | Location | Conditions |
|--------------|-------------|----------|------------|
| Network topology | federation.yaml | Root | Always public |
| Node registry | MEMBERS.md | Root | Always public (status indicators) |
| Hub identity | IDENTITY.md sections | Root | Public sections only |
| Shared skills | SKILL.md files | skills/*/ | Always shared |
| Aggregated knowledge | Markdown | knowledge/<domain>/ | After curation |
| Council decisions | MEMORY.md sections | Root | If marked network-relevant |
| Funding opportunities | data/funding-opportunities.yaml | data/ | Always shared (network-wide pipeline) |
| Domain pool configs | funding/<domain>/ | funding/ | High-level only (not internal allocations) |

**What context is NEVER shared with nodes:**

| Data Element | Reason | Storage |
|--------------|--------|---------|
| Internal HEARTBEAT details | Operational priorities are hub-private | HEARTBEAT.md |
| Council deliberations (pre-consensus) | Pre-decision content confidential | memory/ (pre-ratification) |
| Funding allocation drafts | Allocation decisions require council approval | MEMORY.md (drafts), funding/internal/ |
| Per-node operational data | Node autonomy respected | In node repos only |
| Telegram/Discord internals | Private communications | Not stored in hub |
| Operator personal context | Privacy | Not in hub workspace |

**Schema Publication Sequence:**
```
1. Update federation.yaml if network topology changes
2. Regenerate MEMBERS.md if node status changes
3. Update skills/INDEX.md if skills change
4. Validate all YAML and markdown
5. Commit with descriptive message
6. Skill distribution: Trigger distribute-skills.yml (automated)
7. Knowledge aggregation: Trigger aggregate-knowledge.yml (Mondays 6am UTC)
8. Log to memory/YYYY-MM-DD.md
```

### Knowledge Commons Contribution Protocol

**Receiving from nodes:**
```markdown
Nodes contribute → knowledge/<domain>/from-nodes/<node>/
Hub aggregates → knowledge/<domain>/YYYY-MM-DD-topic.md
Nodes subscribe → pull updates from hub
```

**Node contribution format (expected):**
```markdown
# Knowledge Contribution — [Domain]
**Period:** YYYY-MM-DD → YYYY-MM-DD
**Node:** [node name from federation.yaml]
**Share with:** regen-coordination

## Summary
[2-3 sentence synthesis of key insight]

## Key Developments
- [Insight with source ref]

## Resources
- [URL with description]
```

**Hub aggregation format:**
```markdown
# Knowledge Aggregation — [Domain]
**Period:** YYYY-MM-DD → YYYY-MM-DD
**Nodes contributing:** [list of nodes]
**Hub curator:** Regen Coordination Agent

## Cross-Node Synthesis
[Hub-level insight combining node contributions]

## Node Contributions
### [Node A]
- [Condensed insight] — Source: [node contribution path]

### [Node B]
- [Condensed insight] — Source: [node contribution path]
```

### Token Budget Considerations

**Small context window:**
- Load: federation.yaml + specific node schema being queried
- Skip: Full knowledge commons, detailed council transcripts

**Medium/Large context:**
- Load: Full published knowledge for synthesis tasks
- Cross-reference: Multiple node contributions for pattern analysis

---

## Role 4: Council Coordination Agent

### Purpose
Agent specialized for council operations: facilitating decisions, tracking alignment across nodes, synthesizing multi-node input, documenting governance.

### Startup File Load Sequence (Ordered)

```
Priority 1 — Council Context (Essential)
├── federation.yaml (governance section) → Decision model, partners, proposal threshold
├── MEMBERS.md (council section)       → Council members, node affiliations
├── MEMORY.md                          → Key decisions, decision history
├── memory/YYYY-MM-DD-council-sync.md  → Recent council session notes
└── WORKFRONTS_IMMEDIATE.md            → Current priorities (council context)

Priority 2 — Node Alignment
├── MEMBERS.md (full)                  → All nodes, statuses, last sync
├── data/nodes.yaml (if exists)        → Node operational data
├── knowledge/network/                 → Cross-node directory
└── Recent node contributions          → Knowledge/ from each node

Priority 3 — Decision Materials
├── Funding proposals                  → funding/ pool configs, proposals
├── Skill distribution proposals     → skills/ changes pending
├── Node onboarding requests           → New node proposals
└── Governance documentation           → docs/ governance process

Priority 4 — Synthesis Resources
├── SOUL.md                            → Values alignment for decisions
├── IDENTITY.md                        → Hub identity context
└── Historical decisions               → MEMORY.md archive
```

### APIs and Systems Interaction

| System | Interaction | Autonomy Level |
|--------|-------------|----------------|
| **Forum API** | Read council discussions | [FULL] Read /c/regen-coordination/4.json |
| **Telegram** | Council group monitoring (future) | [NONE] Not yet integrated |
| **Calendar** | Council call scheduling | [MEDIUM] Draft schedule, [NONE] Send invites without approval |
| **Meeting notes** | Process council transcripts | [HIGH] Generate structured notes |
| **Decision log** | Record ratified decisions | [HIGH] Update MEMORY.md, [MEDIUM] Mark as ratified |

### Write Permissions (Autonomy Scope)

| Write Target | Autonomy | Notes |
|--------------|----------|-------|
| `memory/YYYY-MM-DD-council-sync.md` | [FULL] Create session notes | Structure: attendees, decisions, action items, blockers |
| `MEMORY.md` (key decisions) | [HIGH] Append ratified decisions | After council consensus |
| `MEMORY.md` (deliberations) | [MEDIUM] Draft decision proposals | Pre-ratification status |
| `HEARTBEAT.md` (council items) | [HIGH] Update council action items | Track open decisions |
| `docs/council-decisions/*.md` | [FULL] Create decision records | Full decision documentation |
| `federation.yaml` (governance) | [NONE] | Requires council approval |
| Council communications | [MEDIUM] Draft messages | [NONE] Send without approval |

### Council Decision Facilitation

**Decision tracking structure:**
```markdown
## Decision: [Title]
**Status:** [Proposed → Discussed → Consensus → Ratified → Implemented]
**Proposed by:** [Council member]
**Date proposed:** YYYY-MM-DD
**Date ratified:** YYYY-MM-DD (or pending)
**Decision type:** [Network topology / Funding / Skill distribution / Governance]

### Context
[Background information]

### Options Considered
- [Option A with pro/con]
- [Option B with pro/con]

### Consensus
[What the council agreed upon]

### Action Items
- [ ] [Action] — Owner: [Name] — Due: [Date]

### Blockers
- [Blocker] — Resolution: [Plan]
```

**Tracking alignment across nodes:**
```markdown
## Node Alignment Check — [Decision Topic]
**Date:** YYYY-MM-DD

| Node | Position | Rationale | Concerns |
|------|----------|-----------|----------|
| ReFi BCN | Support | [Rationale] | [Concerns] |
| NYC Node | Support | [Rationale] | [Concerns] |
| Bloom | Abstain | [Rationale] | [Concerns] |
| GreenPill | Oppose | [Rationale] | [Concerns] |

**Consensus status:** [Achieved / Pending / Blocked]
**Next step:** [Action to resolve concerns]
```

### Synthesizing Multi-Node Input

**Input collection:**
1. Pull recent node contributions from knowledge/<domain>/from-nodes/
2. Review node-specific workfronts from WORKFRONTS_IMMEDIATE.md
3. Check node statuses from MEMBERS.md
4. Query forum discussions (if relevant)

**Synthesis format:**
```markdown
# Cross-Node Synthesis — [Topic]
**Date:** YYYY-MM-DD
**Nodes consulted:** [List]
**Synthesis author:** Council Coordination Agent

## Summary
[2-3 sentence synthesis of cross-node perspective]

## Common Themes
- [Theme with node citations]

## Divergent Views
- [View A — supporting nodes] vs [View B — supporting nodes]

## Implications for Council
[What this means for decision-making]

## Recommendations
1. [Recommendation with rationale]
2. [Recommendation with rationale]
```

### Token Budget Considerations

**Small context window:**
- Skip: Full knowledge commons per domain, detailed node operational data
- Load: Council-specific context + specific decision materials

**Medium/Large context:**
- Load: Full council history + multi-node contributions
- Consider: Cross-node synthesis requiring comprehensive context

---

## Cross-Role Context Sharing

### Shared Context (All Roles)

| Context Element | Source File | All Roles Load |
|-----------------|-------------|----------------|
| Mission/Values | `SOUL.md` | ✅ Yes (condensed for subagents, public subset for federation) |
| Network Topology | `federation.yaml` | ✅ Yes (full for hub/council, peers subset for federation) |
| Node Registry | `MEMBERS.md` | ✅ Yes (full for hub/council, public for federation) |
| Terminology | `docs/OPERATIONAL-VOCABULARY.md` | ✅ Yes (as needed) |
| Skills | `skills/*/SKILL.md` | ✅ Yes (specific skill only) |

### Role-Specific Isolation

| Context Element | Hub Cursor | Subagent | Federation Peer | Council Coordination |
|-----------------|------------|----------|-----------------|----------------------|
| Full workfronts | ✅ Full | ⚠️ Task-only | ❌ None | ✅ Relevant only |
| Council deliberations | ⚠️ Partial | ❌ None | ❌ None | ✅ Full |
| Node operational data | ⚠️ Summary | ⚠️ Task-only | ❌ None | ⚠️ On query |
| Skill distribution internals | ✅ Full | ⚠️ Task-only | ⚠️ Output only | ❌ None |
| Knowledge aggregation internals | ✅ Full | ⚠️ Task-only | ⚠️ Output only | ❌ None |
| Funding pool allocations | ⚠️ High-level | ❌ None | ⚠️ High-level | ✅ Full |
| Git subtree operations | ✅ Full | ❌ None | ❌ None | ❌ None |

---

## Context Loading Optimization

### For Fast Session Startup

**Pre-computed context bundles:**
```
context-bundles/
├── hub-startup.md              → MASTERPROMPT + SOUL + federation + MEMBERS
├── subagent-brief-template.md  → Task briefing structure + hub context summary
├── council-session-startup.md  → Governance sections + recent decisions
└── federation-public.md        → Published hub state for node queries
```

### Lazy Loading Pattern

```
1. Load Priority 1 (essential) synchronously
2. Start task execution with Priority 1 context
3. Load Priority 2+ asynchronously/as needed
4. Query specific data files only when referenced
```

### Context Caching (Where Supported)

| Cache Target | Duration | Invalidation |
|--------------|----------|--------------|
| `SOUL.md`, `IDENTITY.md` | Session | File modification |
| `federation.yaml` | Session | File modification |
| `MEMBERS.md` | 1 hour | Status change or sync event |
| `MASTERPROMPT.md` | Session | File modification |
| `data/*.yaml` | Per query | File modification |
| Knowledge graph sections | 24 hours | Aggregation update |

---

## Implementation Notes

1. **Always respect token budgets** — load context proportional to window size
2. **Source refs are mandatory** — every data point traces to origin (critical for network coordination)
3. **Role boundaries are strict** — Federation peer doesn't see council deliberations; Council agent doesn't need GitHub Actions internals
4. **Subagent context is minimal** — pass only what's needed for the specific task, scaled for cheap models (Kimi-2.5, Big-Pickle)
5. **Federation context is public-only** — never leak internal operational details to nodes; respect node autonomy
6. **Council context is governance-focused** — operational details abstracted; alignment and decision quality emphasized
7. **Hub context is network-centric** — cross-node synthesis prioritized over single-node details

---

_Last updated: 2026-03-19_
