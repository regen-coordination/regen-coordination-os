# Agent Context Layers — ReFi BCN Agent Architecture

**Purpose:** Map what context matters for each agent role, what files to load, what APIs they use, and what to skip for efficient operation.

**Date:** 2026-03-19  
**Version:** 1.0.0  
**Related:** `AGENTS.md`, `AGENT-TRAINING-MASTERPLAN.md` Week 2

---

## Context Mapping by Agent Role

| Agent Role | Context It Needs | Context It Doesn't Need |
|-----------|-----------------|------------------------|
| **ReFi BCN Telegram Bot** | HEARTBEAT, MEMORY, data/*.yaml, topic routing config | Full knowledge graph, federation details, skill orchestration internals |
| **Cursor/Local Dev Agent** | All workspace files, schema validation, git status | Telegram message history, live Notion session data (use exported snapshots) |
| **Subagent (Task Runner)** | Task-specific context passed at spawn, relevant data files | Full memory history, unrelated workfronts, federation peer states |
| **Federation Peer Agent** | Published schemas, knowledge commons, shared skills | Internal decisions, personal operator context, pending payouts |

---

## Role 1: ReFi BCN Telegram Bot

### Purpose
Coordinating bot running in ReFi BCN Telegram groups. Routes inputs to Notion CRM, answers status questions, escalates blockers.

### Startup File Load Sequence (Ordered)

```
Priority 1 — Essential (always load)
├── HEARTBEAT.md              → Active tasks + urgent alerts
├── MEMORY.md                 → Key decisions (curated index)
├── memory/YYYY-MM-DD.md      → Today's notes (if exists) or latest
└── data/telegram-topic-routing.yaml  → Topic routing rules

Priority 2 — Operational Context (load on demand)
├── data/projects.yaml        → When answering project questions
├── data/members.yaml         → When referencing team members
├── data/funding-opportunities.yaml  → When discussing funding
└── SOUL.md                   → When generating responses (voice/boundaries)

Priority 3 — Lookup (load when query matches)
├── packages/operations/meetings/    → Meeting summaries by date
├── packages/operations/projects/    → Project details
└── .well-known/*.json        → Schema lookups (rare)
```

### APIs and Systems Interaction

| System | Interaction | Autonomy Level |
|--------|-------------|----------------|
| **Telegram API** | Receive messages, send responses | [HIGH] Draft responses, [MEDIUM] Send status queries, [NONE] External messages without approval |
| **Notion** | Read Projects/Tasks/Notes, write to CRM | [HIGH] Read, [MEDIUM] Write to "add to crm" topic, [NONE] Delete/modify without approval |
| **HEARTBEAT** | Read status, write urgent items | [FULL] Read, [HIGH] Add detected blockers, [MEDIUM] Confirm with human before adding |
| **MEMORY** | Read decisions, append daily notes | [FULL] Read, [FULL] Append (log interactions) |

### Write Permissions (Autonomy Scope)

| Write Target | Autonomy | Notes |
|--------------|----------|-------|
| `memory/YYYY-MM-DD.md` | [FULL] Append log entries | All bot interactions logged |
| Notion CRM (topic: `add to crm`) | [HIGH] Add entries | From `data/telegram-topic-routing.yaml` routing |
| `HEARTBEAT.md` | [MEDIUM] Add urgent items | With clear evidence |
| Telegram messages | [MEDIUM] Status responses | [NONE] for external/new channels |

### Context Passed vs. Discovered

| Passed At Runtime | Discovered During Session |
|-------------------|---------------------------|
| Telegram message content | Related project context (from `data/projects.yaml`) |
| Topic/thread ID | Member details (from `data/members.yaml`) |
| Bot configuration | HEARTBEAT urgency status |
| Routing rules | SOUL voice/boundaries |

### Token Budget Considerations

**Small context window (8K-16K tokens):**
- Skip: Full knowledge graph, detailed meeting transcripts
- Load: HEARTBEAT (urgent only), topic routing config, relevant data/*.yaml entry
- Summarize: Project descriptions >200 words, meeting summaries

**Medium context window (32K tokens):**
- Skip: Historical memory beyond 7 days, federation.yaml details
- Load: All Priority 1 + relevant Priority 2 files

**Large context window (128K+ tokens):**
- Load: All Priority 1-3 as needed
- Consider: Knowledge graph sections relevant to query

---

## Role 2: Cursor/Local Development Agent

### Purpose
Workspace-native agent running in local development environment. File-focused operations, documentation maintenance, data reconciliation.

### Startup File Load Sequence (Ordered)

```
Priority 1 — Session Foundation
├── SOUL.md                   → Values + voice (grounds all output)
├── IDENTITY.md               → Org identity, addresses, federation
├── USER.md                   → Operator preferences (Luiz)
├── MEMORY.md                 → Key decisions context
└── HEARTBEAT.md              → Active priorities

Priority 2 — Workspace State
├── AGENTS.md                 → Operating procedures
├── TOOLS.md                  → API endpoints, channel config
├── federation.yaml           → Network context, skills list
├── data/*.yaml              → All data registries (load as needed)
└── memory/YYYY-MM-DD.md      → Recent operations

Priority 3 — Skills & Operations
├── skills/*/SKILL.md        → Skill runbooks (load specific skill being used)
├── packages/operations/*      → Meeting notes, project docs
├── docs/*.md                → Process documentation
└── .well-known/*.json       → Schema validation

Priority 4 — Contextual (load when relevant)
├── docs/AGENT-KNOWLEDGE-GRAPH.md   → Deep org context
├── docs/OPERATIONAL-VOCABULARY.md → Terminology lookup
├── docs/AGENT-CONTEXT-LAYERS.md   → (this file) role boundaries
└── Git status / diff output   → When reconciling
```

### APIs and Systems Interaction

| System | Interaction | Autonomy Level |
|--------|-------------|----------------|
| **Local filesystem** | Read/write all workspace files | [FULL] Read, [HIGH] Write to docs/memory/data, [MEDIUM] Modify core files (AGENTS.md, SOUL.md) |
| **Notion API** | Read databases, export snapshots | [HIGH] Read/query, [NONE] Write (use Telegram bot for Notion writes) |
| **Git** | Status, diff, commit/push | [FULL] Status check, [HIGH] Commit generated files, [MEDIUM] Push (confirm first) |
| **Schema scripts** | Run generate:schemas, validate:schemas | [FULL] Execute after data changes |
| **npm scripts** | Run setup, generate, validate | [FULL] Execute |

### Write Permissions (Autonomy Scope)

| Write Target | Autonomy | Notes |
|--------------|----------|-------|
| `docs/*.md` | [HIGH] Create/update | Documentation drafts |
| `memory/YYYY-MM-DD.md` | [FULL] Append daily notes | Always append, never overwrite |
| `data/*.yaml` | [HIGH] Update with source_refs | From Notion exports or meetings |
| `packages/operations/*` | [HIGH] Create meeting notes, project docs | With proper structure |
| `.well-known/*.json` | [FULL] Regenerate via scripts | Automated after data changes |
| `HEARTBEAT.md` | [HIGH] Update task status | Mark complete, add blockers |
| `AGENTS.md`, `SOUL.md` | [MEDIUM] Propose changes | Draft edits, present for approval |

### Context Passed vs. Discovered

| Passed At Runtime | Discovered During Session |
|-------------------|---------------------------|
| Task instructions | Related files by path/reference |
| File paths to process | Git status for reconciliation |
| Notion export data | Data dependencies (what links to what) |
| Specific skill to run | Schema validation state |

### Token Budget Considerations

**Small context window (8K-16K tokens):**
- Skip: Full knowledge graph, historical meeting notes beyond recent
- Load: Task-specific files + SOUL + IDENTITY + relevant data/*.yaml
- Use: `rg` or `grep` to find relevant context before loading full files

**Medium context window (32K tokens):**
- Skip: Old memory files (>30 days), archived projects
- Load: Priority 1-2 + skill-specific docs

**Large context window (128K+ tokens):**
- Load: Full workspace context for complex reconciliation tasks
- Consider: Knowledge graph for cross-referencing decisions

---

## Role 3: Subagent (Task Runner)

### Purpose
Temporary agents spawned for specific tasks (research, writing, analysis). Limited context lifecycle, focused scope.

### Startup File Load Sequence (Ordered)

```
Priority 1 — Task Briefing (ALWAYS passed at spawn)
├── Task description          → Explicit instructions from spawner
├── Success criteria          → What "done" looks like
├── Output format requirements → Expected structure
└── Constraints/boundaries    → Time, scope, approval gates

Priority 2 — Essential Org Context
├── SOUL.md                   → Voice and values (condensed summary if token-limited)
├── IDENTITY.md               → Org name, type, key addresses
└── docs/OPERATIONAL-VOCABULARY.md → Terminology (lookup as needed)

Priority 3 — Task-Specific Context
├── Relevant data/*.yaml     → Only files related to task
├── Relevant docs/*.md       → Process docs for task type
├── Relevant memory/*.md     → Recent context if temporal
└── Relevant packages/operations/* → Meeting notes, project docs if referenced

Priority 4 — External (load if task requires)
├── Web search results        → If research task
├── API documentation         → If integration task
└── Source code               → If code analysis task
```

### APIs and Systems Interaction

| System | Interaction | Autonomy Level |
|--------|-------------|----------------|
| **Web search** | Research queries | [FULL] For task research |
| **External APIs** | Data retrieval | [HIGH] Query, [NONE] Write/post without approval |
| **Local files** | Read task context | [FULL] Read specified files |
| **Local files** | Write outputs | [FULL] Write to `memory/` drafts, [MEDIUM] Propose structured changes |
| **Subagent spawn** | Delegate sub-tasks | [MEDIUM] Spawn with clear scope |

### Write Permissions (Autonomy Scope)

| Write Target | Autonomy | Notes |
|--------------|----------|-------|
| `memory/YYYY-MM-DD.md` | [FULL] Append task execution notes | Log subagent activity |
| `memory/subagent-*` | [FULL] Draft outputs | Task-specific draft files |
| `docs/*.md` (new) | [FULL] Create drafts | New documentation |
| `data/*.yaml` | [MEDIUM] Propose structured changes | Present diff for approval |
| External communications | [NONE] | Always escalate to spawner |
| Git commits/push | [NONE] | Spawner handles version control |

### Context Passed vs. Discovered

| Passed At Spawn | Discovered During Execution |
|-------------------|---------------------------|
| Task description + criteria | Additional context from web search |
| File paths to read | Related files by cross-reference |
| Output format | Specific terminology/vocabulary |
| Constraints | Blockers or ambiguities |
| Success criteria | Completion evidence |

### Context Passing Conventions (Spawner → Subagent)

**Always include in spawn task:**
1. **Task type** (research, writing, analysis, coordination)
2. **Explicit scope** (what's in/out of bounds)
3. **Output format** (markdown structure, YAML schema, etc.)
4. **Success criteria** (measurable completion)
5. **Files to load** (specific paths, ordered priority)
6. **Time budget** (expected duration)
7. **Escalation triggers** (when to ask for help)

**Example spawn context:**
```markdown
**Task:** Research funding opportunities for climate projects in Catalonia
**Type:** Research
**Scope:** Web search + local data/funding-opportunities.yaml review
**Output:** Markdown list with 5+ opportunities, deadlines, source URLs
**Load files:** data/funding-opportunities.yaml, SOUL.md (values), IDENTITY.md
**Time budget:** 30 min
**Escalate if:** Eligibility unclear, deadline ambiguous, requires partnership decision
```

### Token Budget Considerations

**Always optimize for small context windows:**
- Load: Task briefing + essential org context + specific data files
- Skip: Full knowledge graph, historical memory, unrelated skills
- Summarize: Pass condensed SOUL/IDENTITY if full files too large
- Use: External lookup (web search) rather than loading large reference docs

---

## Role 4: Federation Peer Agent

### Purpose
Agent interface for federation network peers (ReFi DAO, Regen Coordination, other nodes). Shares public organizational state, receives shared skills/knowledge.

### Startup File Load Sequence (Ordered)

```
Priority 1 — Public Identity
├── .well-known/*.json       → Published schemas (what we share)
├── SOUL.md (public sections) → Mission, values (for alignment)
├── IDENTITY.md (public)      → Org type, chain, daoURI
└── federation.yaml           → Network config, peer list

Priority 2 — Knowledge Commons
├── knowledge/*/             → Published domain knowledge
├── packages/operations/meetings/*.md → Meeting summaries (if publish: true)
└── packages/operations/projects/*.md → Project docs (if publish: true)

Priority 3 — Shared Skills
├── skills/*/SKILL.md        → Skill definitions (for skill sharing)
└── docs/AGENT-*.md          → Agent patterns (for network adoption)

Priority 4 — Private (NEVER shared)
├── [NONE]                   → Federation peers see only published content
├── Internal HEARTBEAT details → Filtered to public status only
├── Pending payouts          → Never shared
├── Operator personal context → Never shared
```

### APIs and Systems Interaction

| System | Interaction | Autonomy Level |
|--------|-------------|----------------|
| **Hub git sync** | Push/pull knowledge commons | [HIGH] Sync on schedule, [MEDIUM] Review before push |
| **Peer APIs** | Read shared schemas/knowledge | [FULL] Read published peer content |
| **Schema publication** | Update .well-known/ | [FULL] Regenerate on data changes |
| **Knowledge commons** | Contribute curated content | [MEDIUM] Draft, [NONE] Publish without approval |

### Write Permissions (Autonomy Scope)

| Write Target | Autonomy | Notes |
|--------------|----------|-------|
| `.well-known/*.json` | [FULL] Regenerate | Published organizational state |
| `knowledge/*` | [MEDIUM] Draft contributions | For hub sync |
| Hub knowledge commons | [NONE] Publish | Requires operator approval |
| Peer notifications | [NONE] | Human coordination |

### Context Passed vs. Discovered

| Passed At Sync | Discovered During Interaction |
|-------------------|---------------------------|
| Published schemas | Peer schemas via hub |
| Knowledge commons subscriptions | New shared skills from hub |
| Sync protocol config | Peer node status |

### Schema Publication Protocol

**When to regenerate and publish:**
1. After material data changes (members, projects, finances)
2. After significant meetings (if `publish: true`)
3. Before scheduled hub sync
4. When explicitly requested by operator

**Validation before publication:**
```bash
npm run generate:schemas
npm run validate:schemas
# Review changes before commit/push
```

### Knowledge Commons Contribution Format

```markdown
# Knowledge Curation — [Domain]
**Period:** YYYY-MM-DD → YYYY-MM-DD
**Node:** [name from IDENTITY.md]
**Share with:** [federation peers from federation.yaml]

## Summary
[2-3 sentence synthesis of key insight]

## Key Developments
- [Insight with source ref]

## Resources
- [URL with description]
```

### Token Budget Considerations

**Small context window:**
- Load: dao.json + specific peer schema being queried
- Skip: Full knowledge base, internal operational details

**Medium/Large context:**
- Load: Full published knowledge for synthesis tasks
- Cross-reference: Multiple peer schemas for pattern analysis

---

## Cross-Role Context Sharing

### Shared Context (All Roles)

| Context Element | Source File | All Roles Load |
|-----------------|-------------|----------------|
| Mission/Values | `SOUL.md` | ✅ Yes (condensed for subagents) |
| Identity | `IDENTITY.md` | ✅ Yes (public subset for federation) |
| Active Priorities | `HEARTBEAT.md` | ✅ Yes (filtered by role) |
| Terminology | `docs/OPERATIONAL-VOCABULARY.md` | ✅ Yes (as needed) |
| Skills | `skills/*/SKILL.md` | ✅ Yes (specific skill only) |

### Role-Specific Isolation

| Context Element | Telegram Bot | Cursor Agent | Subagent | Federation Peer |
|-----------------|--------------|--------------|----------|-------------------|
| Telegram history | ✅ Full | ❌ None | ❌ None | ❌ None |
| Git status | ❌ None | ✅ Full | ⚠️ Task-only | ❌ None |
| Full data/*.yaml | ⚠️ On query | ✅ Full | ⚠️ Task-only | ⚠️ Published only |
| Meeting transcripts | ❌ Skip | ✅ Full | ⚠️ Task-only | ⚠️ Published only |
| Pending payouts | ❌ Skip | ✅ Full | ❌ None | ❌ None |
| Operator personal context | ❌ Skip | ⚠️ USER.md only | ⚠️ Task-only | ❌ None |

---

## Context Loading Optimization

### For Fast Session Startup

**Pre-computed context bundles:**
```
context-bundles/
├── telegram-bot-startup.md    → HEARTBEAT + MEMORY + routing config
├── cursor-dev-startup.md      → SOUL + IDENTITY + USER + HEARTBEAT
├── subagent-brief-template.md → Task briefing structure
└── federation-public.md       → .well-known/ + public SOUL sections
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
| `HEARTBEAT.md` | 1 hour | Explicit refresh or task completion |
| `data/*.yaml` | Per query | File modification |
| Knowledge graph sections | 24 hours | Memory system update |

---

## Implementation Notes

1. **Always respect token budgets** — load context proportional to window size
2. **Source refs are mandatory** — every data point traces to origin
3. **Role boundaries are strict** — Telegram bot doesn't need git status; Cursor doesn't need Telegram history
4. **Subagent context is minimal** — pass only what's needed for the specific task
5. **Federation context is public-only** — never leak internal operational details

---

_Last updated: 2026-03-19_
