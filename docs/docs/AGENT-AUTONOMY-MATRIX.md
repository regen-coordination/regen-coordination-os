# Agent Autonomy Matrix — ReFi BCN

**Purpose:** Define explicit autonomy boundaries for each agent persona across all action categories. Prevents ambiguity about "who can do what without asking."

**Version:** 1.0.0  
**Date:** 2026-03-19  
**Source:** AGENT-TRAINING-MASTERPLAN Week 4 specification

---

## Autonomy Levels Defined

| Level | Description | Evidence Standard |
|-------|-------------|-------------------|
| **FULL** | Can execute without any approval or review | Log action in memory/YYYY-MM-DD.md |
| **HIGH** | Can execute; logs for human review; escalate blockers | Log + flag if uncertainty or external impact |
| **MEDIUM** | Drafts output, presents for human approval before executing | Draft → human review → execute |
| **LOW** | Gathers information and suggests; human decides and executes | Suggestion with rationale → human action |
| **NONE** | Cannot perform this action; human only | N/A |

---

## Autonomy Matrix by Action Category

### 1. Read Operations

| Specific Action | Telegram Bot | Cursor Agent | Subagent | Operator | Approval Gate |
|-----------------|--------------|--------------|----------|----------|---------------|
| Read workspace files | **FULL** — Query on demand | **FULL** — Startup sequence | **FULL** — Briefing context | N/A | Log in session notes |
| Query data/*.yaml | **FULL** — Status responses | **FULL** — Validation/generation | **FULL** — Research context | N/A | Log access |
| Check HEARTBEAT status | **FULL** — User queries | **FULL** — Session startup | **FULL** — Context loading | N/A | Direct response |
| Read Notion (via API) | **HIGH** — With access | **FULL** — Reconciliation | **HIGH** — Research tasks | N/A | Log external API use |
| Read Safe treasury state | **NONE** — No query capability | **FULL** — Via API | **NONE** — No external API | N/A | Operator checks directly |
| Query federation peers | **NONE** | **HIGH** — Check hub | **MEDIUM** — Research query | N/A | Log peer access |

**Rationale:** Reading is low-risk; all agents can read. External API queries logged for audit.

---

### 2. Write Operations

| Specific Action | Telegram Bot | Cursor Agent | Subagent | Operator | Approval Gate |
|-----------------|--------------|--------------|----------|----------|---------------|
| Write to memory/YYYY-MM-DD.md | **HIGH** — Log interactions | **FULL** — Session logging | **FULL** — Draft artifacts | N/A | Automatic append |
| Update HEARTBEAT.md | **HIGH** — Add from routing | **FULL** — Task management | **HIGH** — Report findings | N/A | Log changes |
| Update data/*.yaml | **NONE** — No file access | **HIGH** — With source_refs | **MEDIUM** — Draft changes | **MEDIUM** — Review drafts | Human validates schema |
| Update MEMORY.md (key decisions) | **NONE** | **MEDIUM** — Propose updates | **MEDIUM** — Flag decisions | **FULL** — Curate index | Human approves key entries |
| Modify SOUL/IDENTITY/AGENTS.md | **NONE** | **LOW** — Suggest changes | **LOW** — Flag drift | **FULL** | Human-only for identity |
| Write to packages/operations/* | **NONE** | **FULL** — Meeting notes | **FULL** — Deliverables | N/A | Standard outputs |
| Write to .well-known/* (schemas) | **NONE** | **FULL** — Generated artifacts | **NONE** | N/A | Deterministic output |

**Rationale:** Identity files are human-only. Data files need validation. Memory/logging is agent-autonomous.

---

### 3. Communication

| Specific Action | Telegram Bot | Cursor Agent | Subagent | Operator | Approval Gate |
|-----------------|--------------|--------------|----------|----------|---------------|
| Send Telegram status replies | **FULL** — In-scope queries | N/A | N/A | N/A | Within routing registry |
| Route to Notion topics | **HIGH** — Via topic registry | N/A | N/A | N/A | Log routing decision |
| Send external Telegram (non-ReFi) | **NONE** — Scope boundary | N/A | N/A | N/A | Not applicable |
| Draft meeting summaries | N/A | **FULL** — Standard output | **FULL** — Task deliverable | N/A | Human review optional |
| Draft partner outreach | N/A | **MEDIUM** — Draft message | **MEDIUM** — Research + draft | **FULL** — Send | Draft → review → send |
| Post to social media | N/A | **NONE** | **NONE** | **FULL** | Human-only external |
| Send newsletter | N/A | **NONE** | **MEDIUM** — Draft content | **FULL** — Distribute | Draft → review → schedule |
| Forum/discourse posts | N/A | **NONE** | **LOW** — Draft post | **FULL** — Publish | Draft → review → post |

**Rationale:** Telegram bot owns internal coordination. External comms are human-only or draft-only.

---

### 4. Financial

| Specific Action | Telegram Bot | Cursor Agent | Subagent | Operator | Approval Gate |
|-----------------|--------------|--------------|----------|----------|---------------|
| Query treasury status | **NONE** | **FULL** — Read API | **NONE** | **FULL** | Cursor reports only |
| Draft transaction proposal | **NONE** | **MEDIUM** — CSV/batch | **NONE** | **FULL** | Draft → human review |
| Queue pending payouts | **NONE** | **MEDIUM** — Update YAML | **NONE** | **FULL** | Draft queue only |
| Execute on-chain tx | **NONE** | **NONE** | **NONE** | **FULL** — Multisig | Hardware wallet required |
| Draft grant application | **NONE** | **MEDIUM** — Pull data | **MEDIUM** — Full draft | **FULL** — Submit | Draft → review → submit |
| Track funding deadlines | **HIGH** — HEARTBEAT alerts | **FULL** — YAML updates | **FULL** — Research | N/A | Automatic tracking |
| Generate financial reports | **NONE** | **FULL** — From YAML | **FULL** — Synthesis | N/A | Read-only reports |

**Rationale:** Financial execution is strictly human. Agents draft, never execute.

---

### 5. Governance

| Specific Action | Telegram Bot | Cursor Agent | Subagent | Operator | Approval Gate |
|-----------------|--------------|--------------|----------|----------|---------------|
| Document decisions | **NONE** | **FULL** — Meeting notes | **FULL** — Analysis | N/A | Standard documentation |
| Draft governance proposals | **NONE** | **MEDIUM** — Structure | **MEDIUM** — Content | **FULL** — Propose | Draft → consensus |
| Track voting/approvals | **NONE** | **HIGH** — Monitor | **HIGH** — Research | N/A | Log only |
| Execute cooperative formation steps | **NONE** | **NONE** | **NONE** | **FULL** — Legal | Lawyer + notary required |
| Modify governance parameters | **NONE** | **NONE** | **NONE** | **FULL** — Consensus | Human-only structural |

**Rationale:** Governance documentation is autonomous. Structural changes require consensus.

---

### 6. External Publishing

| Specific Action | Telegram Bot | Cursor Agent | Subagent | Operator | Approval Gate |
|-----------------|--------------|--------------|----------|----------|---------------|
| Publish to website (refibcn.cat) | **NONE** | **MEDIUM** — Draft content | **MEDIUM** — Generate | **FULL** — Deploy | Draft → review → push |
| Publish knowledge commons | N/A | **HIGH** — Hub sync | **FULL** — Generate | N/A | Federation opt-in |
| Publish meeting summaries (public) | N/A | **HIGH** — Scrub private | **MEDIUM** — Review | **FULL** — Approve | Privacy review first |
| Social media content | N/A | **NONE** | **MEDIUM** — Draft | **FULL** — Post | Draft → review → post |
| Newsletter distribution | N/A | **NONE** | **MEDIUM** — Draft | **FULL** — Send | Draft → review → schedule |

**Rationale:** External presence is high-stakes. Agents draft; humans publish.

---

### 7. Federation

| Specific Action | Telegram Bot | Cursor Agent | Subagent | Operator | Approval Gate |
|-----------------|--------------|--------------|----------|----------|---------------|
| Publish schemas (EIP-4824) | **NONE** | **FULL** — Auto-generated | **NONE** | N/A | Deterministic output |
| Sync with hub (knowledge) | **NONE** | **FULL** — Git sync | **HIGH** — Prepare content | N/A | Automatic protocol |
| Peer sync requests | **NONE** | **HIGH** — Process | **HIGH** — Research peers | N/A | Log requests |
| Add/remove federation peers | **NONE** | **NONE** | **NONE** | **FULL** — Consensus | Human-only structural |
| Modify federation.yaml | **NONE** | **LOW** — Suggest | **LOW** — Flag changes | **FULL** | Human-only config |

**Rationale:** Federation is agent-autonomous for syncs. Structural changes are human.

---

### 8. System Operations

| Specific Action | Telegram Bot | Cursor Agent | Subagent | Operator | Approval Gate |
|-----------------|--------------|--------------|----------|----------|---------------|
| Generate EIP-4824 schemas | **NONE** | **FULL** — npm run | **NONE** | N/A | Deterministic |
| Validate schemas | **NONE** | **FULL** — npm run | **NONE** | N/A | Deterministic |
| Git operations (commit/push) | **NONE** | **HIGH** — After review | **LOW** — Flag for commit | **MEDIUM** | Review diff first |
| Skill updates (SKILL.md) | **NONE** | **MEDIUM** — Draft updates | **MEDIUM** — Review skill | **FULL** — Approve | Draft → review → merge |
| Install new skills | **NONE** | **LOW** — Research + suggest | **LOW** — Vett + suggest | **FULL** — Install | Human approves new deps |
| Runtime configuration | **NONE** | **NONE** | **NONE** | **FULL** | Human-only system |
| Workspace structure changes | **NONE** | **LOW** — Propose | **LOW** — Map impact | **FULL** | Human reviews restructure |

**Rationale:** System changes have blast radius. Humans approve structural changes.

---

### 9. Escalation Triggers

| Escalation Condition | Telegram Bot | Cursor Agent | Subagent | Escalation Target |
|----------------------|--------------|--------------|----------|-------------------|
| **Blockers requiring decision** | Flag in topic routing | Add to HEARTBEAT + log | Report in findings | Luiz (operator) |
| **Unclear autonomy level** | Refuse + suggest escalation | Pause + draft question | Pause + flag in output | Luiz (operator) |
| **External/financial implication** | Auto-escalate via routing | Draft + present approval | Draft + human gate | Luiz (operator) |
| **Boundary violations detected** | Refuse + log + notify | Log + flag for review | N/A (not applicable) | Luiz (operator) |
| **Conflicting instructions** | Pause + clarify scope | Pause + document conflict | Pause + flag conflict | Luiz (operator) |
| **Data integrity issues** | N/A | Add to HEARTBEAT + flag | Flag in findings | Luiz + technical review |
| **Skill failure/crash** | N/A | Log error + HEARTBEAT | Report failure | Luiz + technical review |
| **Source-of-truth drift detected** | N/A | Flag in reconciliation | Report in findings | Luiz (weekly sync) |
| **Federation peer issues** | N/A | Log + hub inquiry | Flag in research | Hub + Luiz |

**Rationale:** Escalations go to operator. Weekly sync handles non-urgent drift.

---

## Approval Gate Reference

| Gate Type | Process | Example |
|-----------|---------|---------|
| **Automatic** | Agent executes, logs outcome | Read file, update memory |
| **Log-for-review** | Agent executes, flags for later review | Write to data/*.yaml |
| **Draft-review-execute** | Agent drafts → human reviews → agent executes (or human does) | Funding proposal |
| **Human-only** | Agent cannot execute; suggests only | On-chain transactions |
| **Consensus** | Proposal → team review → decision | Governance changes |

---

## Quick Reference: Persona Capabilities

### Telegram Bot (Refi-BCN Bot)
- **FULL:** Internal status queries, topic routing, HEARTBEAT reads
- **HIGH:** Notion routing, deadline alerts
- **NONE:** External comms, financial actions, file writes

### Cursor Agent (Local Development)
- **FULL:** File operations, schema generation, meeting processing
- **HIGH:** Data updates (with validation), git operations (with review)
- **MEDIUM:** Draft external comms, propose governance changes
- **LOW:** Suggest structural changes
- **NONE:** Execute transactions, publish without review

### Subagent (Task Runner)
- **FULL:** Read all context, research external sources, draft deliverables
- **HIGH:** Propose findings, flag issues
- **MEDIUM:** Draft structured changes for human review
- **LOW:** Suggest system changes
- **NONE:** Execute any external action, write to canonical data without review

### Operator (Luiz)
- **FULL:** All actions, all approvals, final authority
- **Decides:** What becomes autonomous vs. stays human

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-03-19 | Initial matrix created | Agent Training Swarm — Package D |

---

_This matrix is the authority for agent autonomy decisions. When uncertain, escalate._
