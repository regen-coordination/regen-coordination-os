# Boundary and Bridge Policy — ReFi BCN Agent vs Personal Agent

Date: 2026-03-11  
Status: Active (Phase A implemented)
Owner: Luiz + refi-bcn agent

## Purpose

Guarantee strict operational separation between:

1. **ReFi BCN organizational agent scope** (`refi-bcn`, group topics, `refi-bcn-os` operations)
2. **Luiz personal agent/repository scope** (personal-only)

This policy prevents context/data spill between scopes.

---

## Scope Surfaces

- Telegram ReFi BCN group and topics
- Telegram DM with Luiz
- Notion workspace operations
- Local repo/filesystem usage (`refi-bcn-os`)
- Cross-agent session messaging

---

## Hard Separation Rules

1. **Group-topic default = org-only scope.**
   - No personal agent/repository access from group topics.
2. **Personal scope access is allowed only in Luiz DM.**
3. **No implicit cross-agent bridge.**
   - Bridge requires explicit, per-request authorization from Luiz.
4. **Finance/governance actions remain approval-gated.**
   - Draft → Present → Luiz approval → human execution.

---

## Allowed vs Forbidden

### Allowed in ReFi BCN group topics
- Intake and triage
- CRM/task capture
- Meeting and notes structuring
- Knowledge curation and synthesis
- Finance analysis and draft queues (no execution)

### Forbidden in ReFi BCN group topics
- Accessing Luiz personal repo/workspace
- Triggering personal-agent workflows
- Sharing personal agent memory or artifacts
- Cross-posting private material without explicit authorization

---

## Bridge Protocol (Luiz DM only)

Bridge command format:

`BRIDGE_APPROVED: <requested cross-scope action>`

Required response behavior before any bridge action:
1. Restate requested access/action
2. State data boundary and intended output destination
3. Confirm one-time scope and completion logging
4. Execute only after explicit approval message

---

## Logging and Audit

Every bridge event (if any) must be logged in:
- `memory/YYYY-MM-DD.md` (event summary)
- Optional cross-reference in `docs/FEEDBACK-ACTION-REGISTER.md` if operationally significant

Minimum log fields:
- timestamp (UTC)
- requester
- approved scope
- accessed systems
- output path(s)
- closure note

---

## Incident Handling (Spill Risk)

If cross-scope spill risk is detected:
1. Stop execution immediately
2. Notify Luiz with concise incident summary
3. Record in daily memory log
4. Apply fix before resuming related workflow

---

## Review Cadence

- Weekly during rollout phase
- Monthly after stable operations
- Mandatory review before dedicated ReFi BCN instance cutover
