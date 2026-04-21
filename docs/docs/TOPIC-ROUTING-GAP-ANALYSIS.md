# Gap Analysis — Telegram Topic End-to-End Routing

Date: 2026-03-19
Status: Analysis Complete
Owner: Luiz + refi-bcn agent
Scope: First end-to-end routing cycle readiness

---

## Executive Summary

The Telegram topic-aware rollout is **structurally complete** but has **implementation gaps** that must be closed before the first end-to-end cycle can execute reliably.

- **Boundary Policy**: Documented ✓ | Tested ✗
- **Topic Registry**: Mapped ✓ | Validated ✗
- **Skill Pipelines**: Defined ✓ | Integrated ✗
- **Output Targets**: Specified ✓ | Connected ✗

---

## Gap Inventory by Category

### 1. Boundary Acceptance Tests (Critical — Blocking)

| Gap ID | Description | Impact | Severity |
|--------|-------------|--------|----------|
| GAP-B1 | No boundary test execution recorded | Cannot verify scope separation works | 🔴 Critical |
| GAP-B2 | Bridge protocol not validated in live DM | Bridge behavior theoretical only | 🔴 Critical |
| GAP-B3 | Incident handling protocol untested | Spill risk response unknown | 🟡 High |
| GAP-B4 | No test automation for boundary rules | Manual testing only; regression risk | 🟡 High |

**Blocking**: First end-to-end cycle SHOULD NOT proceed until GAP-B1 and GAP-B2 are closed.

### 2. Topic Routing Integration (Critical — Blocking)

| Gap ID | Description | Impact | Severity |
|--------|-------------|--------|----------|
| GAP-R1 | Telegram bot not receiving topic-aware messages | No routing trigger source | 🔴 Critical |
| GAP-R2 | Thread ID validation incomplete (15 topics mapped, 0 validated live) | Routing may fail silently | 🔴 Critical |
| GAP-R3 | No topic-to-skill invocation logic implemented | Skills exist but aren't called from Telegram | 🔴 Critical |
| GAP-R4 | Message content pattern matching undefined | Cannot classify inbound messages | 🔴 Critical |
| GAP-R5 | Fallback routing (unknown topic) not tested | Unhandled messages may drop | 🟡 High |

**Blocking**: First end-to-end cycle CANNOT proceed until GAP-R1 through GAP-R4 are closed.

### 3. Skill-to-Output Integration (High — Degraded Function)

| Gap ID | Description | Impact | Severity |
|--------|-------------|--------|----------|
| GAP-S1 | `funding-scout` → Notion CRM connection not verified | CRM updates may fail | 🟡 High |
| GAP-S2 | `meeting-processor` → Notion Tasks sync not implemented | Action items siloed locally | 🟡 High |
| GAP-S3 | `capital-flow` → Safe transaction service not tested | Treasury reads unverified | 🟡 High |
| GAP-S4 | `heartbeat-monitor` → Telegram alert back-channel not configured | Cannot surface urgent items | 🟡 High |
| GAP-S5 | `knowledge-curator` → Telegram source not connected | Channel monitoring manual only | 🟢 Medium |

**Degraded**: Cycle can proceed with local-only outputs, but full integration requires closing GAP-S1–S4.

### 4. Data Registry Completeness (Medium — Risk of Data Loss)

| Gap ID | Description | Impact | Severity |
|--------|-------------|--------|----------|
| GAP-D1 | `data/relationships.yaml` does not exist | CRM writes have no local registry | 🟡 High |
| GAP-D2 | `data/meetings.yaml` structure undefined | Meeting registry incomplete | 🟢 Medium |
| GAP-D3 | `data/pending-payouts.yaml` does not exist | Capital flow drafts have no target | 🟡 High |
| GAP-D4 | Notion database IDs not validated in production | Writes may fail silently | 🟡 High |
| GAP-D5 | `data/projects.yaml` not synchronized with Notion | State divergence risk | 🟢 Medium |

**Risk**: Data writes may fail or be unrecoverable without closing GAP-D1, GAP-D3, GAP-D4.

### 5. Operational Runbooks (Medium — Human Dependency)

| Gap ID | Description | Impact | Severity |
|--------|-------------|--------|----------|
| GAP-O1 | No per-topic operator runbook | Luiz must infer actions | 🟢 Medium |
| GAP-O2 | No failure escalation procedure | Stuck items have no path | 🟢 Medium |
| GAP-O3 | No daily/weekly routing health check | Degradation unnoticed | 🟢 Medium |
| GAP-O4 | No topic routing QA criteria | Quality undefined | 🟢 Medium |

---

## Gap Closure Roadmap

### Phase 1: Pre-Flight (Must Complete Before First Cycle)

| Gap ID | Action | Owner | Est. Effort |
|--------|--------|-------|-------------|
| GAP-B1 | Execute boundary test plan `docs/BOUNDARY-ACCEPTANCE-TEST-PLAN.md` | Luiz + agent | 2h |
| GAP-B2 | Validate bridge protocol in live DM with test messages | Luiz | 30min |
| GAP-R1 | Verify Telegram bot (`ReFiBCNOpsBot`) receives topic messages | Luiz + agent | 1h |
| GAP-R2 | Validate all 15 thread IDs against live Telegram topics | Luiz + agent | 1h |
| GAP-D1 | Create `data/relationships.yaml` with CRM structure | agent | 30min |
| GAP-D3 | Create `data/pending-payouts.yaml` with payout schema | agent | 30min |
| GAP-D4 | Test Notion write access for all 4 target databases | agent | 1h |

**Phase 1 Total Effort**: ~6.5 hours
**Phase 1 Completion Criteria**: All critical gaps closed; boundary tests passed; routing source validated.

### Phase 2: Core Integration (Required for Full Cycle)

| Gap ID | Action | Owner | Est. Effort |
|--------|--------|-------|-------------|
| GAP-R3 | Implement topic-to-skill invocation routing logic | agent | 4h |
| GAP-R4 | Define message content patterns for 4 priority topics | agent | 2h |
| GAP-S1 | Verify `funding-scout` → Notion CRM write path | agent | 2h |
| GAP-S2 | Implement `meeting-processor` → Notion Tasks sync | agent | 3h |
| GAP-D2 | Define `data/meetings.yaml` schema and registry logic | agent | 1h |

**Phase 2 Total Effort**: ~12 hours
**Phase 2 Completion Criteria**: Messages flow through topics → skills → outputs end-to-end.

### Phase 3: Hardening (Post-Cycle Validation)

| Gap ID | Action | Owner | Est. Effort |
|--------|--------|-------|-------------|
| GAP-B3 | Test incident handling with simulated spill | Luiz + agent | 1h |
| GAP-B4 | Automate boundary test validation | agent | 4h |
| GAP-S3 | Test `capital-flow` → Safe transaction service reads | agent | 2h |
| GAP-S4 | Configure `heartbeat-monitor` → Telegram alert channel | agent + Luiz | 2h |
| GAP-O1 | Create per-topic operator runbooks | agent | 4h |
| GAP-O2 | Define failure escalation procedure | agent + Luiz | 2h |
| GAP-O3 | Implement daily/weekly routing health check | agent | 3h |

**Phase 3 Total Effort**: ~18 hours
**Phase 3 Completion Criteria**: System production-hardened; operational procedures documented.

---

## Risk Assessment

### If First Cycle Proceeds Without Closing Gaps...

| Scenario | Likelihood | Impact | Mitigation |
|----------|------------|--------|------------|
| Personal/org scope spill | Medium | 🔴 Severe (privacy, trust) | Mandatory GAP-B1/B2 closure first |
| Message loss (routing failure) | High | 🟡 High (operational) | At minimum close GAP-R1/R2/R4 |
| Data write failures (CRM/tasks) | Medium | 🟡 High (data integrity) | Close GAP-D1/D3/D4 first |
| Silent failures (no alerts) | Medium | 🟡 High (missed deadlines) | Implement health check logging |
| Manual recovery overhead | High | 🟢 Medium (Luiz time) | Document fallback procedures |

---

## Go/No-Go Criteria for First End-to-End Cycle

### GO — Required Checklist

- [ ] GAP-B1: Boundary tests executed and passed
- [ ] GAP-B2: Bridge protocol validated in live DM
- [ ] GAP-R1: Telegram bot confirmed receiving topic messages
- [ ] GAP-R2: At minimum 4 priority topic thread IDs validated (`add_to_crm`, `check_later`, `emails_meetings`, `cycles`)
- [ ] GAP-R4: Message pattern matching defined for 4 priority topics
- [ ] GAP-D1: `data/relationships.yaml` exists with valid schema
- [ ] GAP-D3: `data/pending-payouts.yaml` exists with valid schema
- [ ] Luiz explicit sign-off on boundary test results

### NO-GO — Stop Conditions

- [ ] Any boundary test fails (spill risk)
- [ ] Telegram bot not receiving messages (no input source)
- [ ] Notion writes failing (no CRM/task integration)
- [ ] Bridge protocol not behaving per specification

---

## Recommended First Cycle Scope

Given gap analysis, recommend **constrained first cycle**:

### In Scope (Validated Components Only)
- `add_to_crm` topic → `funding-scout` skill → Notion CRM + `data/relationships.yaml`
- `emails_meetings` topic → `meeting-processor` skill → local meeting files only (no Notion sync)
- `check_later` topic → `heartbeat-monitor` skill → HEARTBEAT.md only (no Notion tasks)
- `cycles` topic → `heartbeat-monitor` skill → HEARTBEAT.md only (no payout queuing)

### Out of Scope (Pending Validation)
- Full Notion bidirectional sync
- `capital-flow` treasury reads
- Telegram alert back-channel
- Cross-topic routing
- Automated bridge events

### Success Criteria for Constrained Cycle
- 5+ messages processed per topic without manual intervention
- 0 scope spill incidents
- All outputs in expected locations (CRM, HEARTBEAT, local files)
- Luiz confirmation that outputs are usable

---

_Last updated: 2026-03-19_
