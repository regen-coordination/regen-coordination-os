---
id: hermes-integration
title: "Hermes Agent: Local runtime replacing OpenClaw"
status: queued
priority: 8
scope: refi-bcn-os
depends_on: []
created: 2026-04-15
started: null
completed: null
estimated_sessions: 2
tags: [hermes, agent, runtime, infrastructure]
category: infrastructure
related_to:
  - type: area
    id: knowledge-infrastructure
  - type: plan
    id: telegram-agent-bot
---

## Goal

Install and configure Hermes Agent as the org-os agent runtime, replacing OpenClaw. Runs as non-root user, supports Claude API, provides gateway for messaging platforms and cron scheduling. Foundation for the Telegram bot and future personal agents.

## Context

- Current: OpenClaw on `srv1342683` at `/root/` — root access, 138 CVEs, Docker dependency
- Target: Hermes Agent — no root, no Docker, `pip install`, native cron + Telegram gateway
- Hermes supports Claude API (`model.provider: "anthropic"`), self-improving skills, profiles for multi-agent
- Workspace: `refi-bcn-os/` with CLAUDE.md, AGENTS.md (auto-discovered by Hermes)
- Team: 3 core members, Scenario C architecture (shared bot + optional personal agents)
- Research doc: brainstorming session 2026-04-14/15

## Open Questions

- **VPS vs Mac**: Shared instance needs 24/7 for team bot. Mac with launchd for personal use. Likely need a cheap VPS (Hetzner/Contabo, ~5/mo) for the shared instance.
- **API costs**: Hermes calls Claude API directly (Anthropic billing, not Pro/Max plan). Need to estimate monthly usage for cron jobs + team interactions.
- **Git sync strategy**: Agent writes HEARTBEAT.md, data/*.yaml, memory/ — needs to commit/push without conflicts when team members also work on the repo.
- **Memory bridging**: Hermes has its own MEMORY.md (2,200 char cap) at `~/.hermes/memories/`. Org-os has a richer system. Need to bridge or redirect.
- **Skill format compatibility**: Org-os skills use SKILL.md with YAML frontmatter. Hermes uses similar but not identical format. Need to test `skills.external_dirs` discovery.

## Tasks

### Phase 1: Install and configure

- [ ] Install Hermes on Mac (local testing first): `curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash`
- [ ] Run `hermes setup` — configure Anthropic as provider, set API key
- [ ] Run `hermes doctor` — verify installation health
- [ ] Test basic CLI interaction: `hermes` → ask it to read a file in the workspace
- [ ] Set `terminal.cwd` (or `MESSAGING_CWD`) to refi-bcn-os directory
- [ ] Verify Hermes auto-discovers CLAUDE.md and AGENTS.md from CWD

### Phase 2: Workspace integration

- [ ] Write Hermes SOUL.md adapted from repo SOUL.md (or symlink if format is compatible)
- [ ] Configure `skills.external_dirs` to point at `refi-bcn-os/skills/`
- [ ] Test skill discovery: does `hermes skills` list heartbeat-monitor, funding-scout, etc.?
- [ ] If skills aren't discovered: write thin adapter skills in Hermes format that invoke the org-os skills
- [ ] Bridge memory: add instructions in CLAUDE.md / AGENTS.md telling agent to use workspace memory/ instead of Hermes internal memory
- [ ] Test: ask agent "what's in HEARTBEAT.md?" — verify it reads from workspace

### Phase 3: Gateway and cron

- [ ] Configure Telegram gateway: `hermes gateway setup` with ReFiBCNOpsBot token
- [ ] Add team member Telegram user IDs to allowed users
- [ ] Start gateway: `hermes gateway start`
- [ ] Test: send message to bot on Telegram, verify response
- [ ] Create cron: heartbeat check every 6h, deliver to Telegram
- [ ] Create cron: funding deadline scan weekly, deliver to Telegram
- [ ] Install gateway as persistent service: `hermes gateway install` (launchd on Mac, systemd on VPS)

### Phase 4: Production deployment (VPS)

- [ ] Provision VPS (Hetzner/Contabo, Ubuntu, ~5/mo)
- [ ] Clone refi-bcn-os repo on VPS
- [ ] Install Hermes as non-root user
- [ ] Transfer config from Mac testing to VPS
- [ ] Set up systemd service for gateway
- [ ] Configure git credentials for auto-push (deploy key, read-write)
- [ ] Test full loop: Telegram message → agent processes → writes workspace → pushes to git
- [ ] Decommission OpenClaw on srv1342683

### Phase 5: Personal agents (optional, later)

- [ ] Write team setup guide: install steps, profile creation, API key config
- [ ] Each member: `hermes profile create <name> --clone`
- [ ] Personal agents use local clone of refi-bcn-os, git pull to sync
- [ ] No shared bot token — personal agents are CLI or personal bot only

## Verification

- [ ] `hermes doctor` passes on target machine
- [ ] Agent reads workspace files correctly (HEARTBEAT.md, data/*.yaml)
- [ ] Skills from `skills/` are discovered or adapted
- [ ] Gateway starts and stays running (launchd/systemd)
- [ ] Cron jobs fire on schedule and deliver to Telegram
- [ ] Runs as non-root user
- [ ] Memory writes go to workspace `memory/` directory
- [ ] OpenClaw fully decommissioned

## References

- [Hermes Agent GitHub](https://github.com/nousresearch/hermes-agent)
- [Installation](https://hermes-agent.nousresearch.com/docs/)
- [Telegram setup](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/telegram)
- [Profiles](https://hermes-agent.nousresearch.com/docs/user-guide/profiles)
- [Cron](https://hermes-agent.nousresearch.com/docs/user-guide/features/cron)
- [Team Telegram Assistant](https://hermes-agent.nousresearch.com/docs/guides/team-telegram-assistant)
- Current runtime: `TOOLS.md` (Node Infrastructure section)
