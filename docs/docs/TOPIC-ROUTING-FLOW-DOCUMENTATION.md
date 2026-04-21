# Topic Routing Flow Documentation — ReFi BCN Telegram Integration

Date: 2026-03-19
Status: Draft (pending validation)
Owner: Luiz + refi-bcn agent
Reference: `data/telegram-topic-routing.yaml`

---

## Overview

This document maps the complete message processing logic for each Telegram topic in the ReFi BCN operating system. Each topic has:
- **Purpose**: What kind of work happens here
- **Trigger Pattern**: What message content activates processing
- **Skill Pipeline**: Which skills process messages
- **Output Targets**: Where results are written
- **Edge Cases**: Known exceptions and handling

---

## Topic: `add_to_crm`

### Registry Mapping
- **Thread ID**: 1507
- **Purpose**: crm-intake
- **Registry Entry**: `data/telegram-topic-routing.yaml` → `routing[1]`

### Processing Logic

```
Inbound Message (Topic: "add to crm")
    ↓
[Trigger Detection]
    - Message contains contact/org information
    - Or explicit command: "add to crm", "new contact", "meet someone"
    ↓
[funding-scout skill] + [knowledge-curator skill]
    ↓
[Entity Extraction]
    Required fields (per registry):
    - contact_or_org: Name of person or organization
    - context: Where/how met, relationship nature
    - source: Who provided this info / how discovered
    - next_step: Immediate follow-up action
    ↓
[Data Validation]
    - Check if contact already exists in Notion CRM
    - Check if contact already exists in `data/relationships.yaml`
    - Flag duplicates for review
    ↓
[Output Generation]
    ↓ → Notion CRM (database: 2156ed08-45cb-815c-9a3a-000b46e37cb7)
    ↓ → `data/relationships.yaml` (local relationship registry)
    ↓
[Confirmation]
    - Draft confirmation with extracted data
    - Present for review (do not auto-send to Telegram)
```

### Expected Message Flows

| Scenario | Input Example | Processing | Output |
|----------|---------------|------------|--------|
| New contact from event | "Met Maria from GreenFi at ReFi event, interested in collaboration" | Extract: Maria/GreenFi, event context, collaboration interest | Notion CRM entry + relationships.yaml update |
| Organization discovery | "New org: Regen Coordination Hub doing ecosystem mapping" | Extract: Regen Coordination Hub, mapping work, source | Notion CRM entry tagged for ecosystem research |
| Follow-up reminder | "Need to follow up with Octant team about vault setup" | Extract: Octant team, vault setup context, follow-up due | Notion CRM + HEARTBEAT.md task creation |

### Edge Cases & Handling

| Edge Case | Detection | Handling |
|-----------|-----------|----------|
| Missing required field | One of (contact_or_org, context, source, next_step) is null | Request clarification in topic; do not create incomplete records |
| Duplicate contact | Name/org matches existing in Notion or relationships.yaml | Flag as duplicate; present update vs new entry options |
| Ambiguous intent | Message unclear if CRM-worthy or general chat | Default to `check_later` topic routing for human triage |
| Bulk contact list | Multiple contacts in single message | Extract all; create draft entries; present batch for review |

---

## Topic: `check_later`

### Registry Mapping
- **Thread ID**: 65
- **Purpose**: deferred-intake
- **Registry Entry**: `data/telegram-topic-routing.yaml` → `routing[2]`

### Processing Logic

```
Inbound Message (Topic: "check later")
    ↓
[Trigger Detection]
    - Explicit: "check later", "review this", "read when you can"
    - Implicit: Link shared without immediate action context
    - Flag emoji: 🚩, 📌, ⏳
    ↓
[heartbeat-monitor skill]
    ↓
[Content Classification]
    - Link → queue for reading/research
    - Task mention → create task entry
    - Decision needed → flag for standup review
    ↓
[Queue Assignment]
    - Urgent (< 3 days): HEARTBEAT.md critical section
    - Soon (< 7 days): HEARTBEAT.md urgent section
    - Later: Notion Tasks (backlog status)
    - Research: Notion Research & Reading List
    ↓
[Output Generation]
    ↓ → Notion Tasks (database: 1386ed08-45cb-8142-801b-000b2cb5c615)
    ↓ → HEARTBEAT.md (if time-sensitive)
    ↓
[Confirmation]
    - Acknowledge receipt
    - Provide estimated review timeframe
```

### Expected Message Flows

| Scenario | Input Example | Processing | Output |
|----------|---------------|------------|--------|
| Article to read | "https://example.com/regenerative-finance-report check later" | Classify as research; queue for reading | Notion Research & Reading List entry |
| Task reminder | "Need to update website copy — check later this week" | Classify as task; assign deadline | Notion Tasks + HEARTBEAT.md entry |
| Decision pending | "Review partnership proposal from XYZ — need decision by Friday" | Classify as decision; flag urgency | HEARTBEAT.md urgent + Notion Tasks |
| Resource collection | "Check this grant platform when reviewing funding pipeline" | Classify as funding resource | Notion Research (tagged: funding) |

### Edge Cases & Handling

| Edge Case | Detection | Handling |
|-----------|-----------|----------|
| No clear deadline | Message lacks timeframe | Default to 7-day review; add to HEARTBEAT.md upcoming |
| Multiple links/items | Several URLs or tasks in one message | Create separate queue entries; present summary |
| Already in queue | URL/task matches existing HEARTBEAT or Notion item | Flag duplicate; update priority if higher |
| Stale queue item | Item in queue > 14 days untouched | Flag in HEARTBEAT.md for review or archive |

---

## Topic: `emails_meetings`

### Registry Mapping
- **Thread ID**: 320
- **Purpose**: meeting-email-intake
- **Registry Entry**: `data/telegram-topic-routing.yaml` → `routing[10]`

### Processing Logic

```
Inbound Message (Topic: "emails & meetings")
    ↓
[Trigger Detection]
    - Meeting notes pasted
    - Email thread forwarded/summarized
    - Transcript file shared
    - "Process this meeting", "file these notes"
    ↓
[meeting-processor skill]
    ↓
[Input Classification]
    - Raw transcript → Full processing pipeline
    - Meeting notes → Structure and file
    - Email thread → Extract decisions/action items
    - File attachment → Save + process
    ↓
[Extraction Pipeline]
    1. Date detection (explicit or inferred)
    2. Participant identification (names, roles)
    3. Key decisions extraction ("agreed", "decided", "approved")
    4. Action item extraction (owners, deadlines)
    5. Topic/project tagging (cross-reference data/projects.yaml)
    ↓
[Output Generation]
    ↓ → `packages/operations/meetings/YYMMDD [Title].md` (structured meeting note)
    ↓ → `data/meetings.yaml` (meeting registry entry)
    ↓ → Notion Tasks (action items with owners)
    ↓ → `memory/YYYY-MM-DD.md` (memory log entry)
    ↓ → HEARTBEAT.md (action items with deadlines)
    ↓
[Cross-Reference Updates]
    - Update related project pages in `packages/operations/projects/`
    - Link to source Notion page if applicable
```

### Expected Message Flows

| Scenario | Input Example | Processing | Output |
|----------|---------------|------------|--------|
| Meeting transcript | [Pasted transcript from Granola/Otter] | Full extraction: decisions, actions, attendees | Structured meeting note + tasks |
| Email decision thread | "Email chain: decided to proceed with Y platform, budget approved" | Extract decision and budget approval | Meeting note format + HEARTBEAT.md update |
| Quick sync notes | "Call with John: agreed on timeline, John to send draft by Friday" | Extract: agreement, timeline, John's task | Meeting note + task assignment |
| Workshop output | [Multi-hour workshop notes] | Segment by topic; extract decisions per segment | Multiple meeting notes if needed |

### Edge Cases & Handling

| Edge Case | Detection | Handling |
|-----------|-----------|----------|
| Unclear transcript | Low-quality or partial transcript | Note gaps explicitly; flag for human review |
| Unknown attendees | Names not in `data/members.yaml` | Add as "External — [Name]"; flag for membership update |
| No clear decisions | Meeting content but no explicit decisions | Mark as "informational only"; still file |
| Action items without owners | "Need to do X" but no who | Flag for assignment; add to HEARTBEAT.md as unassigned |
| Duplicate meeting | Same date/participants as existing entry | Check if duplicate or follow-up; merge or separate |

---

## Topic: `cycles`

### Registry Mapping
- **Thread ID**: 622
- **Purpose**: project-finance-lane
- **Registry Entry**: `data/telegram-topic-routing.yaml` → `routing[11]`

### Processing Logic

```
Inbound Message (Topic: "cycles")
    ↓
[Trigger Detection]
    - Task status update: "started", "blocked", "completed"
    - Funding milestone: "payment due", "invoice received"
    - Project phase transition: "moving to Phase 2"
    - Cycle checkpoint: "weekly cycle review"
    ↓
[capital-flow skill] + [heartbeat-monitor skill]
    ↓
[Classification]
    - Task tracking → Update `data/projects.yaml` + HEARTBEAT.md
    - Funding cycle → Update `data/pending-payouts.yaml` + `data/finances.yaml`
    - Project phase → Update project status + cascade task updates
    - Review request → Generate status snapshot
    ↓
[State Update Logic]
    IF task update:
        - Update task status in `data/projects.yaml`
        - Update HEARTBEAT.md if deadline/deliverable
        - Update Notion Tasks if integrated
    
    IF funding milestone:
        - Queue payout/invoice in `data/pending-payouts.yaml`
        - Update `data/finances.yaml` with commitment
        - Present draft for human approval (never execute)
    
    IF phase transition:
        - Update project phase in `data/projects.yaml`
        - Generate phase entry/exit checklist
        - Cascade status updates to dependent tasks/projects
    ↓
[Output Generation]
    ↓ → `data/projects.yaml` (project state updates)
    ↓ → `data/pending-payouts.yaml` (queued transactions)
    ↓ → HEARTBEAT.md (action items + alerts)
    ↓ → `memory/YYYY-MM-DD.md` (cycle checkpoint log)
```

### Expected Message Flows

| Scenario | Input Example | Processing | Output |
|----------|---------------|------------|--------|
| Task completion | "Website redesign completed, ready for review" | Update project status; queue review task | Projects.yaml + HEARTBEAT.md update |
| Funding request | "Need to pay contributor X for Y work — 500 XDAI" | Queue payout; prepare draft; present for approval | pending-payouts.yaml + approval request |
| Phase transition | "Regenerant Phase 1 complete, starting Phase 2" | Update project phase; generate Phase 2 task list | Projects.yaml + HEARTBEAT.md + task generation |
| Blocked task | "Grant application blocked — need clarification from funder" | Flag blocked status; add blocker to HEARTBEAT.md | Projects.yaml + HEARTBEAT.md blocker alert |
| Cycle review | "Weekly cycle: review active projects and funding status" | Generate snapshot: active tasks, pending payouts, blockers | Cycle report in memory/ + status update |

### Edge Cases & Handling

| Edge Case | Detection | Handling |
|-----------|-----------|----------|
| Missing project reference | Task update without clear project | Route to `check_later` for triage; request clarification |
| Funding without budget line | Payout request for unbudgeted work | Flag for review; do not queue until budget confirmed |
| Duplicate payout request | Same payment already in pending-payouts.yaml | Flag duplicate; confirm if additional or error |
| Unknown contributor | Payout to name not in `data/members.yaml` | Request verification; flag for membership update |
| Overlapping cycles | Multiple simultaneous cycle updates | Process serially; log dependencies in HEARTBEAT.md |

---

## Cross-Topic Routing Matrix

| If Topic... | And Message Contains... | Then Route To... |
|-------------|------------------------|------------------|
| `add_to_crm` | "meeting notes" or transcript | `emails_meetings` (with CRM cross-reference) |
| `check_later` | "need decision by [date]" | `cycles` (if project-related) or HEARTBEAT.md urgent |
| `emails_meetings` | "new partner" or "met someone" | `add_to_crm` (extract after meeting processing) |
| `cycles` | "check later" with no urgency | `check_later` (defer if not time-sensitive) |
| `general` | Topic-specific keywords | Route to appropriate topic based on content |

---

## Fallback & Ambiguity Handling

### Unknown Topic
- **Detection**: `thread_id` not found in registry
- **Action**: Route to `general` topic processing
- **Log**: `memory/YYYY-MM-DD.md`: "Unknown topic [id] → routed to general"

### Ambiguous Content
- **Detection**: Message matches multiple topic patterns
- **Action**: 
  1. Apply default priority: `emails_meetings` > `cycles` > `add_to_crm` > `check_later`
  2. If still ambiguous, ask clarifying question in topic
  3. Log ambiguity for pattern refinement

### Empty/Minimal Message
- **Detection**: Message has < 5 words or only emoji
- **Action**: No processing; optional acknowledgment only
- **Exception**: If emoji is flag (🚩📌⏳) → route to `check_later`

---

## Monitoring & Quality Gates

Per-topic quality checks:

| Topic | Quality Gate | Failure Action |
|-------|--------------|----------------|
| `add_to_crm` | All 4 required fields present | Request clarification; block incomplete records |
| `check_later` | Clear queue destination identified | Default to HEARTBEAT.md upcoming; log ambiguity |
| `emails_meetings` | Structured meeting note generated | Flag for manual processing if extraction fails |
| `cycles` | State update reflected in data file | Retry once; escalate to HEARTBEAT.md if persistent |

---

_Last updated: 2026-03-19_
