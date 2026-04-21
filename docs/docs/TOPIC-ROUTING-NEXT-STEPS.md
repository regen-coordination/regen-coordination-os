# Recommended Next Steps — Telegram Topic Routing

Date: 2026-03-19
Status: Pending Review
Owner Assignment: Luiz + refi-bcn agent

---

## Immediate Actions (This Week)

### 1. Execute Boundary Acceptance Tests
**Owner**: Luiz + refi-bcn agent  
**Time**: 2 hours  
**Deliverable**: Completed checklist in `docs/BOUNDARY-ACCEPTANCE-TEST-PLAN.md`  
**Dependencies**: None

| Step | Action | Success Criteria |
|------|--------|----------------|
| 1.1 | Send test messages in group topic for A1–A4 | All 4 refusal responses received |
| 1.2 | Send `BRIDGE_APPROVED` command in DM for B1 | 4-step protocol completed |
| 1.3 | Send bridge request without command for B2 | Protocol guidance received |
| 1.4 | Log review — verify all 6 audit fields present | GAP-B4 satisfied |
| 1.5 | Luiz sign-off on boundary behavior | NO-GO cleared |

### 2. Validate Telegram Bot Topic Reception
**Owner**: Luiz (with agent support)  
**Time**: 1 hour  
**Deliverable**: Confirmed thread_id mapping for 4 priority topics  
**Dependencies**: Luiz access to Telegram group admin

| Step | Action | Success Criteria |
|------|--------|----------------|
| 2.1 | Post test message in `add to crm` topic | Bot logs message with thread_id 1507 |
| 2.2 | Post test message in `check later` topic | Bot logs message with thread_id 65 |
| 2.3 | Post test message in `emails & meetings` topic | Bot logs message with thread_id 320 |
| 2.4 | Post test message in `cycles` topic | Bot logs message with thread_id 622 |
| 2.5 | Verify no cross-topic leakage | Messages only logged in correct topic |

### 3. Create Missing Data Registries
**Owner**: refi-bcn agent  
**Time**: 1 hour  
**Deliverable**: `data/relationships.yaml` and `data/pending-payouts.yaml`  
**Dependencies**: None

**File: `data/relationships.yaml`**
```yaml
# Relationship Registry — ReFi BCN CRM Local Mirror
# Sync target: Notion CRM (2156ed08-45cb-815c-9a3a-000b46e37cb7)
as_of: '2026-03-19'
schema_version: '1.0'

contacts:
  # Template entry — remove after first real entry
  - id: template
    name: Template Contact
    org: Template Organization
    role: Template Role
    context: Template context description
    source: Template source
    next_step: Template follow-up action
    status: active | dormant | archived
    discovered_date: '2026-03-19'
    last_contact_date: null
    notion_page_id: null
    tags: []

organizations:
  # Template entry — remove after first real entry
  ################################################################################
```

**File: `data/pending-payouts.yaml`**
```yaml
# Pending Payouts Queue — ReFi BCN Treasury Drafts
# Safety: Drafts only — never execute autonomously
as_of: '2026-03-19'
schema_version: '1.0'

pending:
  # Template entry — remove after first real entry
  - id: template-payout
    recipient_name: Template Recipient
    recipient_address: '0x0000...0000'
    amount: '0'
    token: XDAI
    rationale: Template rationale for payout
    source_ref: Template meeting/project reference
    requested_date: '2026-03-19'
    due_date: null
    status: draft | pending_approval | approved | executed | cancelled
    notion_task_id: null
    safe_tx_id: null

executed:
  # Archive of completed payouts for reconciliation
  []
```

---

## Short-Term Actions (Next 7 Days)

### 4. Implement Topic-to-Skill Routing Logic
**Owner**: refi-bcn agent  
**Time**: 4 hours  
**Deliverable**: Routing dispatcher in `skills/` or agent configuration  
**Dependencies**: Step 2 (validated thread IDs)

**Implementation Sketch:**
```
On Telegram message received:
  1. Extract thread_id from message
  2. Lookup topic_key in telegram-topic-routing.yaml
  3. Load default_skills for topic_key
  4. Parse message content for trigger patterns
  5. Invoke skill with message + topic context
  6. Capture skill outputs
  7. Route outputs to topic-defined output targets
  8. Log processing in memory/YYYY-MM-DD.md
```

### 5. Define Message Content Patterns
**Owner**: refi-bcn agent  
**Time**: 2 hours  
**Deliverable**: Pattern definitions in docs or skill config  
**Dependencies**: None

| Topic | Trigger Patterns | Examples |
|-------|------------------|----------|
| `add_to_crm` | "met [name]", "[org] doing [work]", "contact: [info]" | "Met Maria from GreenFi at event" |
| `check_later` | "check later", "review this", "read [link]", 🚩📌⏳ | "https://example.com/article check later" |
| `emails_meetings` | Transcript markers, "meeting notes", "call with [name]" | "[Granola transcript pasted]" |
| `cycles` | Status verbs, "payment", "invoice", "phase [N]", "blocked" | "Payment due to contributor X" |

### 6. Verify Notion Integration Write Paths
**Owner**: refi-bcn agent  
**Time**: 2 hours  
**Deliverable**: Test writes to 4 Notion databases  
**Dependencies**: Notion integration active (`refi-bcn-openclaw`)

| Database | Test Action | Success Criteria |
|----------|-------------|------------------|
| CRM (2156ed08-45cb-815c-9a3a-000b46e37cb7) | Create test contact entry | Entry appears with correct fields |
| Tasks (1386ed08-45cb-8142-801b-000b2cb5c615) | Create test task | Task appears with correct status |
| Projects (1386ed08-45cb-8185-a48b-000bc4a72d53) | Read project list | Returns active projects |
| Notes (1386ed08-45cb-81ed-b055-000ba5b70a6b) | Read recent notes | Returns meeting notes |

---

## Medium-Term Actions (Next 14 Days)

### 7. Implement Meeting-to-Notion-Tasks Sync
**Owner**: refi-bcn agent  
**Time**: 3 hours  
**Deliverable**: meeting-processor skill enhanced with Notion sync  
**Dependencies**: Step 5 (message patterns), Step 6 (Notion verified)

**Flow:**
1. meeting-processor extracts action items from meeting
2. For each action item with owner + deadline → create Notion Task
3. Link Notion Task to source meeting file
4. Update HEARTBEAT.md with task references

### 8. Create Per-Topic Operator Runbooks
**Owner**: refi-bcn agent  
**Time**: 4 hours  
**Deliverable**: `docs/RUNBOOK-[topic].md` for 4 priority topics  
**Dependencies**: Steps 1–5 (validated routing behavior)

**Runbook Template per Topic:**
- Purpose and typical use cases
- Expected input formats
- Output locations and verification
- Common issues and resolution
- Escalation path if processing fails

### 9. Implement Daily/Weekly Health Check
**Owner**: refi-bcn agent  
**Time**: 3 hours  
**Deliverable**: Health check routine + HEARTBEAT.md integration  
**Dependencies**: Step 4 (routing logic)

**Check Items:**
- Messages processed per topic (last 24h/7d)
- Routing failures or fallback triggers
- Output target write success rates
- Boundary incident count (should be 0)
- Bridge event count and audit completeness

---

## Owners Summary

| Owner | Actions | Total Time |
|-------|---------|------------|
| **Luiz** | 1.2 (bridge validation), 1.5 (sign-off), 2.x (Telegram validation) | ~3 hours |
| **refi-bcn agent** | 3.x (create files), 4 (routing logic), 5 (patterns), 6 (Notion test), 7 (sync), 8 (runbooks), 9 (health check) | ~20 hours |
| **Collaborative** | 1.1, 1.3, 1.4 (boundary tests) | ~2 hours |

---

## Decision Points for Luiz

### Decision 1: Scope of First End-to-End Cycle
**Options:**
- **A. Full scope**: All 15 topics with full Notion sync (higher risk, needs more validation)
- **B. Constrained scope**: 4 priority topics with local outputs only (recommended)
- **C. Single topic**: Pilot with `add_to_crm` only (lowest risk, slower validation)

**Recommendation**: Option B — see `docs/TOPIC-ROUTING-GAP-ANALYSIS.md` "Recommended First Cycle Scope"

### Decision 2: Notion Sync Strategy
**Options:**
- **A. Immediate bidirectional**: All writes sync to Notion immediately (risk: rate limits, failures)
- **B. Batch daily**: Local writes accumulate, daily sync job to Notion (recommended)
- **C. Manual trigger**: Agent prepares sync batch, Luiz approves before write (safest, more friction)

**Recommendation**: Option B for first cycle; graduate to A after stability proven

### Decision 3: Bridge Event Notification
**Options:**
- **A. Silent logging only**: Bridge events logged to memory only
- **B. HEARTBEAT.md alert**: Bridge events create HEARTBEAT.md entries (recommended)
- **C. Telegram notification**: Bridge events notify Luiz in DM (higher visibility, potential noise)

**Recommendation**: Option B for balance of awareness and noise

---

## Success Metrics for First Cycle

| Metric | Target | Measurement |
|--------|--------|-------------|
| Messages processed | 20+ across 4 topics | `memory/` logs |
| Routing accuracy | 90%+ correct topic routing | Manual review sample |
| Output completeness | 100% of processed messages have outputs | File/Notion verification |
| Boundary incidents | 0 | `memory/` incident log |
| Processing latency | < 5 minutes message→output | Timestamp comparison |
| Luiz satisfaction | Confirmed usable | Direct feedback |

---

_Last updated: 2026-03-19_
