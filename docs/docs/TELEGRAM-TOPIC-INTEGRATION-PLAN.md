# Telegram Topic Integration Plan — ReFi BCN OpenClaw

Date: 2026-03-11  
Status: In execution (Phase A started)
Owner: Luiz + refi-bcn agent

## Objective

Deploy a topic-aware Telegram operating model for ReFi BCN with strict separation from Luiz personal agent scope, while preparing migration to a dedicated ReFi BCN OpenClaw instance.

## Current Baseline

- OpenClaw runtime available on Hostinger VPS (infrastructure baseline)
- `refi-bcn` agent currently running via personal gateway context
- Canonical operations/filesystem in `refi-bcn-os`
- Notion integration connected (`refi-bcn-openclaw`)
- ReFi BCN Telegram bot configured (`refibcn`) pending final group/topic validation

## Design Principles

1. **No spill across personal ↔ org scopes**
2. **Topic-aware responsibility routing**
3. **Canonical logging in repo + Notion sync discipline**
4. **Finance/governance safety gates remain human-approved**

---

## Workstreams

## WS1 — Boundary & Security Segregation

Artifacts:
- `docs/BOUNDARY-AND-BRIDGE-POLICY.md` (active)

Execution:
- Enforce org-only behavior in group topics
- Allow personal-scope bridge only from Luiz DM with explicit approval command
- Log bridge events in daily memory

## WS2 — Topic Routing Layer

Artifacts:
- `data/telegram-topic-routing.yaml` (in-progress)

Execution:
- Map each Telegram topic to a default workflow/skill and output target
- Fill all `thread_id` values from production Telegram topics
- Define fallback for unknown/ambiguous topics

## WS3 — Intake to Canonical Systems

Execution:
- `add to crm` → Notion CRM + `data/relationships.yaml`
- `check later` → Notion Tasks + optional HEARTBEAT escalation
- `emails & meetings` → meeting pipeline (`packages/operations/meetings/`)
- `staking/cycles/giveth` → finance draft lane (`data/pending-payouts.yaml`, `data/finances.yaml`)

## WS4 — Operational QA & Acceptance Testing

Required tests:
1. Group request to access personal repo is refused
2. Luiz DM bridge request follows protocol and logs event
3. Topic routing triggers expected outputs for each topic
4. Finance requests generate drafts only (no autonomous tx)
5. Notion/local sync loop is working for CRM + tasks + finance draft references

## WS5 — Migration to Dedicated ReFi BCN Instance (target)

Target architecture:
- Separate OpenClaw gateway/service
- Separate secrets/session history
- Bot handling shifted to org instance
- Controlled repo sync and cutover checklist

Pre-cutover conditions:
- WS1–WS4 stable for at least one full weekly cycle
- No unresolved boundary incidents
- Topic routing accuracy validated

---

## Phase Plan

### Phase A (now, started)
- [x] Document boundary policy
- [x] Create topic routing registry
- [ ] Add heartbeat tasks for rollout tracking
- [ ] Register thread IDs in routing file

### Phase B (next 24–48h)
- [ ] Enable topic-by-topic operating mode in live group
- [ ] Verify outputs per topic with small controlled tests
- [ ] Log first sync cycle evidence in feedback register

### Phase C (next weekly cycle)
- [ ] Run full acceptance test suite
- [ ] Capture issues + patch policy/routing
- [ ] Approve go-live readiness report

### Phase D (migration)
- [ ] Provision dedicated ReFi BCN OpenClaw instance
- [ ] Migrate bot handling and validate isolation
- [ ] Close interim mixed-gateway setup

---

## Completion Criteria

- Topic-aware routing is deterministic and auditable
- Group scope never accesses personal scope
- CRM/task/finance intake lands in canonical systems
- Weekly sync protocol is running with evidence
- Dedicated instance migration checklist approved
