---
id: telegram-agent-bot
title: "Telegram Agent Bot: ReFiBCNOpsBot ↔ org-os bridge"
status: queued
priority: 8
scope: refi-bcn-os
depends_on: [hermes-integration]
created: 2026-04-15
started: null
completed: null
estimated_sessions: 2
tags: [telegram, bot, agent, communication]
category: integrations
related_to:
  - type: workfront
    id: telegram-topic-aware-rollout
  - type: plan
    id: hermes-integration
---

## Goal

Wire `ReFiBCNOpsBot` to the org-os so that team members (Luiz, Giulio, Andrea) can interact with organizational data, trigger skills, and receive automated updates via the Telegram group.

## Context

- Bot exists: `ReFiBCNOpsBot`, group `TEAM ReFi Barcelona Coop`, ID `-1002370445342`
- 15 topics mapped with thread IDs in `data/telegram-topic-routing.yaml`
- Bot persona defined in `AGENTS.md` Section F (refi-bcn-bot)
- Privacy mode must be off for group message access
- Depends on agent runtime being operational (see `hermes-integration` plan)

## Architecture

```
┌─────────────────────────────────────┐
│  Telegram: TEAM ReFi BCN 🌱         │
│                                      │
│  #general ──────────┐  @mention or   │
│  #add-to-crm ───────┤  topic-based   │
│  #funding ───────────┤  routing       │
│  #cycles ────────────┤               │
│  #emails-meetings ───┤               │
│  #daily-standups ────┘               │
│         (15 topics)                  │
└──────────────┬───────────────────────┘
               │
       ┌───────▼────────┐
       │  Agent Runtime  │  (Hermes gateway)
       │                 │
       │  Routes by:     │
       │  · @mention → general skill
       │  · thread_id → topic-specific skill
       │  · DM → personal session
       │                 │
       │  Responds via:  │
       │  · reply in same thread
       │  · cron → home channel
       └───────┬─────────┘
               │
       ┌───────▼─────────┐
       │  refi-bcn-os/   │
       │  HEARTBEAT.md   │
       │  data/*.yaml    │
       │  skills/        │
       │  memory/        │
       └─────────────────┘
```

## Done

- [x] Map 15 Telegram topics with thread IDs in `data/telegram-topic-routing.yaml`
- [x] Define bot persona in `AGENTS.md` Section F
- [x] Create `data/relationships.yaml` for CRM local mirror (128 lines, 8 entities, 8 relationships)
- [x] Create `data/pending-payouts.yaml` for treasury drafts (170 lines, 6 pending payouts)
- [x] Document gap analysis (22 gaps) in `docs/TELEGRAM-TOPIC-INTEGRATION-PLAN.md`

## Tasks

### Prerequisites (depends on hermes-integration)

- [ ] Prepare OpenClaw → Hermes Agent migration checklist and cutover plan
- [ ] Verify agent runtime is operational and can receive Telegram webhooks

### Bot configuration

- [ ] Verify `ReFiBCNOpsBot` token is active and accessible
- [ ] Disable privacy mode in BotFather (required for group topic access)
- [ ] Remove and re-add bot to group after privacy mode change
- [ ] Collect Telegram user IDs for Luiz, Giulio, Andrea
- [ ] Configure all 3 as authorized users

### Topic routing

- [ ] Validate Telegram bot receives topic messages (4 priority topics) — owner: Luiz
- [ ] Investigate whether agent runtime exposes `message_thread_id` from incoming messages
- [ ] If yes: write topic-router skill that reads `data/telegram-topic-routing.yaml` and dispatches to the correct org-os skill per topic
- [ ] If no: evaluate thin grammY middleware that handles routing and forwards to agent
- [ ] Fallback for v1: bot responds to @mentions in any topic with general-purpose agent (no per-topic dispatch)

### Interaction patterns

- [ ] Status queries: "@bot what's pending?" → reads HEARTBEAT.md, summarizes
- [ ] CRM intake: message in #add-to-crm → extracts contact/org, writes to data/relationships.yaml
- [ ] Meeting logging: message in #emails-meetings → creates entry in packages/operations/meetings/
- [ ] Funding alerts: message in #funding → updates data/funding-opportunities.yaml
- [ ] Boundary enforcement: refuse out-of-scope requests per AGENTS.md Section G

### End-to-end routing cycle

- [ ] Execute boundary acceptance tests (group scope refusal + Luiz DM bridge protocol)
- [ ] Execute first constrained end-to-end routing cycle (`add to crm`, `check later`, `emails & meetings`, `cycles`)

### Scheduled outputs (cron → Telegram)

- [ ] Heartbeat check (every 6h) → post overdue/critical tasks to #daily-standups-requests
- [ ] Funding scan (weekly) → post approaching deadlines to #general
- [ ] Configure home channel for cron delivery

### Voice and behavior

- [ ] Adapt SOUL.md for chat context (shorter, more direct, per AGENTS.md bot persona)
- [ ] Configure emoji usage: minimal (per AGENTS.md)
- [ ] Set escalation triggers: external comms, financial decisions, boundary violations → flag for Luiz

## Verification

- [ ] Bot responds to @mention in #general with accurate HEARTBEAT summary
- [ ] Bot responds to DM from each authorized user
- [ ] Cron heartbeat fires and delivers to correct Telegram topic
- [ ] Message in #add-to-crm is processed (contact extracted, logged)
- [ ] Out-of-scope request is correctly refused
- [ ] Bot does NOT respond to unauthorized users

## References

- `data/telegram-topic-routing.yaml` — topic registry with thread IDs and skill mappings
- `AGENTS.md` Section F — Telegram bot persona definition
- `AGENTS.md` Section G — approval matrix and safety guardrails
- `docs/TELEGRAM-TOPIC-INTEGRATION-PLAN.md` — original integration plan
- `SOUL.md` — voice and values (adapt for chat)
