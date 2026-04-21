---
id: hermes-telegram-agent
title: "Hermes Agent: Telegram Bot + Local Agent Runtime"
status: queued
priority: 8
scope: refi-bcn-os
depends_on: []
created: 2026-04-15
started: null
completed: null
estimated_sessions: 3-4
tags: [agent, telegram, hermes, infrastructure, runtime]
category: integrations
related_to:
  - type: area
    id: knowledge-infrastructure
  - type: workfront
    id: telegram-topic-aware-rollout
---

## Goal

Replace OpenClaw with Hermes Agent as the org-os agent runtime. Deploy Scenario C: one shared `ReFiBCNOpsBot` on a VPS handling group Telegram + cron, with optional personal agents per team member on their own machines.

## Context

- Current runtime: OpenClaw on `srv1342683` at `/root/` — requires root access, security concerns (138 CVEs tracked in 2026)
- Hermes Agent (Nous Research): open-source, runs as user, no Docker, native Telegram gateway + cron, self-improving skills, Claude API support
- Bot already exists: `ReFiBCNOpsBot`, group ID `-1002370445342`, 15 topics mapped in `data/telegram-topic-routing.yaml`
- Team: Luiz, Giulio, Andrea — all authorized on the shared bot
- Research doc: this plan derives from brainstorming session 2026-04-14/15

## Architecture

```
Scenario C: Hybrid — shared bot + personal agents

┌─────────────────────────────────┐
│  Telegram: TEAM ReFi BCN 🌱     │
│  15 topics, @ReFiBCNOpsBot      │
│  All 3 team members authorized  │
└──────────────┬──────────────────┘
               │
       ┌───────▼────────┐
       │  Hermes Agent   │    VPS or Mac (shared instance)
       │  profile: ops   │
       │                 │
       │  CWD: refi-bcn-os/
       │  SOUL.md → repo SOUL.md
       │  Skills: heartbeat, funding, meetings, capital, knowledge
       │  Cron: heartbeat (6h), funding scan (weekly), standups
       │                 │
       │  Reads/writes:  │
       │  · HEARTBEAT.md │
       │  · data/*.yaml  │
       │  · memory/      │
       └────────┬────────┘
                │ git push/pull
       ┌────────▼────────┐
       │  refi-bcn-os    │    Git repo (shared source of truth)
       └────────┬────────┘
                │ git pull
    ┌───────────┼───────────┐
    │           │           │
┌───▼───┐  ┌───▼───┐  ┌───▼───┐
│ Luiz  │  │Giulio │  │Andrea │    Optional personal agents
│hermes │  │hermes │  │hermes │    on own machines
│local  │  │local  │  │local  │
└───────┘  └───────┘  └───────┘
```

## Open Questions

- **Topic routing**: Hermes Telegram gateway doesn't have documented `message_thread_id` routing. Options: (a) custom Hermes skill that reads thread ID and dispatches, (b) thin grammY wrapper in front of Hermes, (c) start without per-topic routing (bot responds to @mentions anywhere)
- **VPS vs Mac**: Shared instance needs 24/7 uptime. Mac with launchd works for personal use but not reliable for team bot. Cheap VPS (€5/mo) is likely needed.
- **Git sync**: Shared agent writes to workspace → needs to commit/push. Personal agents pull. Conflict resolution strategy needed for HEARTBEAT.md and data files.
- **API costs**: Hermes uses Claude API directly — usage goes against Anthropic API billing, not Pro/Max plan. Budget estimate needed.

## Phases

### Phase 1: Shared bot on VPS (core)

- [ ] Install Hermes on VPS (or Mac for testing)
- [ ] Configure Anthropic API key, model provider
- [ ] Write agent SOUL.md (adapt from repo `SOUL.md`)
- [ ] Set CWD to refi-bcn-os workspace
- [ ] Configure `ReFiBCNOpsBot` token + all 3 team member user IDs
- [ ] Disable Telegram privacy mode, re-add bot to group
- [ ] Test: bot responds to @mention in group
- [ ] Test: bot responds to DMs from authorized users
- [ ] Set up 2-3 cron jobs: heartbeat check (6h), funding scan (weekly)
- [ ] Validate cron results deliver to Telegram

### Phase 2: Skill bridging

- [ ] Expose existing org-os skills via `skills.external_dirs` config
- [ ] Test skill discovery — does Hermes find and use heartbeat-monitor, funding-scout, etc.?
- [ ] If needed, write adapter skills in Hermes format that call existing npm scripts
- [ ] Bridge memory: configure agent (via AGENTS.md / CLAUDE.md) to read/write workspace MEMORY.md + memory/ instead of Hermes' internal memory

### Phase 3: Topic routing (if needed)

- [ ] Investigate Hermes' raw message metadata — does `message_thread_id` come through?
- [ ] Write a `topic-router` skill that reads `data/telegram-topic-routing.yaml` and dispatches
- [ ] Test per-topic behavior: message in #add-to-crm triggers CRM skill, #funding triggers funding-scout, etc.
- [ ] Fallback: if Hermes can't access thread IDs, evaluate thin grammY middleware in front

### Phase 4: Personal agents (optional, later)

- [ ] Document personal agent setup guide for team members
- [ ] Each member: `hermes profile create <name>`, configure own API key
- [ ] Personal agents work on local clone of refi-bcn-os
- [ ] Coordination via git — no direct agent-to-agent communication needed initially

## Verification

- [ ] Bot responds to @mentions in Telegram group
- [ ] Cron jobs fire and deliver results to Telegram
- [ ] Agent can read HEARTBEAT.md and answer "what's pending?"
- [ ] Agent can read data/funding-opportunities.yaml and summarize pipeline
- [ ] Agent runs as non-root user
- [ ] No OpenClaw dependency remains

## References

- [Hermes Agent GitHub](https://github.com/nousresearch/hermes-agent)
- [Hermes Telegram setup](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/telegram)
- [Team Telegram Assistant tutorial](https://hermes-agent.nousresearch.com/docs/guides/team-telegram-assistant)
- [Hermes Profiles](https://hermes-agent.nousresearch.com/docs/user-guide/profiles)
- [Hermes Cron](https://hermes-agent.nousresearch.com/docs/user-guide/features/cron)
- Existing: `data/telegram-topic-routing.yaml`, `docs/TELEGRAM-TOPIC-INTEGRATION-PLAN.md`
