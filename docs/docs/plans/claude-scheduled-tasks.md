---
id: claude-scheduled-tasks
title: "Claude Code Scheduled Tasks: automated org-os routines"
status: queued
priority: 8
scope: refi-bcn-os
depends_on: []
created: 2026-04-15
started: null
completed: null
estimated_sessions: 1-2
tags: [claude-code, automation, scheduled-tasks, infrastructure]
category: infrastructure
related_to:
  - type: area
    id: knowledge-infrastructure
  - type: plan
    id: hermes-integration
  - type: plan
    id: telegram-agent-bot
---

## Goal

Set up Claude Code scheduled tasks (Desktop local + cloud Routines) to automate recurring org-os operations: heartbeat checks, funding scans, knowledge maintenance, schema validation. Zero new infrastructure — uses tools already installed.

## Context

Claude Code offers three scheduling tiers:

| Method | Runs on | Local files | Always-on | Min interval |
|--------|---------|-------------|-----------|--------------|
| **Desktop Scheduled Tasks** | Your Mac | Yes | No (app must be open) | 1 min |
| **Routines (cloud)** | Anthropic servers | No (clones repo) | Yes (24/7) | 1 hour |
| **`/loop`** | Active session | Yes | No (session-scoped) | 1 min |

- Desktop tasks: full access to local workspace, MCP servers, skills, plugins. Catch up on missed runs (up to 7 days). Worktree isolation available.
- Routines: run on Anthropic cloud infra even when laptop is closed. Need GitHub repo connected. Can use connectors (Slack, Linear, etc.). Trigger via schedule, API webhook, or GitHub events. Counts against Pro/Max plan usage.
- Both can be managed from Desktop app sidebar (Schedule page) or CLI (`/schedule`).

### Why this matters alongside Hermes

- **Complementary, not competing.** Hermes handles Telegram gateway + interactive bot. Claude scheduled tasks handle autonomous workspace maintenance that doesn't need Telegram.
- **No new infra.** Already installed. Desktop tasks run as your user on your Mac.
- **Cloud Routines for reliability.** When laptop is closed, Routines keep running against the GitHub repo — useful for time-sensitive checks (funding deadlines, PR reviews).
- **Can coexist.** Hermes cron handles Telegram-facing jobs. Claude tasks handle internal workspace jobs. Clear separation.

## Tasks

### Phase 1: Desktop Scheduled Tasks (local, immediate)

These run on your Mac while Claude Desktop is open. Full workspace + MCP access.

- [ ] Open Claude Desktop → Schedule page → New task → New local task
- [ ] Create: **Daily heartbeat check** (daily, 9am)
  - Prompt: "Read HEARTBEAT.md. List any tasks overdue or due today. If funding deadlines are within 7 days, flag them. Write a summary to memory/{date}.md."
  - Working folder: `refi-bcn-os/`
  - Enable worktree isolation
- [ ] Create: **Weekly funding scan** (weekly, Monday 9am)
  - Prompt: "Read data/funding-opportunities.yaml. Check deadlines approaching within 30 days. Cross-reference with HEARTBEAT.md funding section. If any deadlines are new or changed, update HEARTBEAT.md."
  - Working folder: `refi-bcn-os/`
- [ ] Create: **Weekly schema validation** (weekly, Sunday 8pm)
  - Prompt: "Run `npm run validate:schemas` and `npm run validate:structure`. If validation fails, log the errors to memory/{date}.md with details."
  - Working folder: `refi-bcn-os/`
- [ ] Test each task with "Run now" button
- [ ] Verify outputs land in correct files (memory/, HEARTBEAT.md)

### Phase 2: Cloud Routines (24/7, GitHub-based)

These run on Anthropic servers against the GitHub repo. Work even when laptop is closed.

- [ ] Ensure refi-bcn-os is pushed to GitHub and accessible
- [ ] Run `/web-setup` in CLI if GitHub not connected
- [ ] Create environment with env vars: `NOTION_API_KEY` (if needed for Notion MCP)
- [ ] Create: **Nightly HEARTBEAT audit** (daily, 11pm)
  - Prompt: "Read HEARTBEAT.md. Check for tasks that are overdue based on dates. Create a branch with updated status markers if any tasks need attention. Open a PR with the changes."
  - Repo: refi-bcn-os, branch push: `claude/` prefix only
- [ ] Create: **Funding deadline watchdog** (daily, 8am)
  - Prompt: "Read data/funding-opportunities.yaml. If any deadline is within 48 hours and status is not 'applied' or 'archived', create a branch updating HEARTBEAT.md with an urgent flag."
  - Trigger: schedule (daily) + API (so Hermes bot can trigger on-demand)
- [ ] Optionally: **PR review routine** (GitHub trigger: `pull_request.opened`)
  - Prompt: "Review this PR against CLAUDE.md rules. Check schema validation, data file consistency, SOUL.md alignment. Leave inline comments."

### Phase 3: Connect to Telegram (via Hermes)

- [ ] Hermes cron jobs can trigger Claude Routines via API endpoint — chain them:
  - Hermes receives "@bot run funding check" in Telegram
  - Hermes calls Routine API endpoint with bearer token
  - Routine runs on cloud, opens PR or writes results
  - Hermes posts result link back to Telegram
- [ ] Document the webhook URLs and tokens in TOOLS.md (without secrets)

## Open Questions

- **Plan usage**: How much Pro/Max quota do daily Routines consume? Need to monitor during first week.
- **Local vs cloud split**: Which tasks benefit from 24/7 cloud vs. local-only? Start local, promote to cloud only what needs reliability.
- **Git conflicts**: Cloud Routines push to `claude/` branches. Desktop tasks write to local workspace. Need clear separation of what each touches.
- **Notion MCP in cloud**: Does the Notion connector work in Routines? Or only via env var + API key?

## Verification

- [ ] Desktop task fires at scheduled time and produces correct output
- [ ] Desktop task catches up after missed run (close app, reopen)
- [ ] Cloud Routine fires while laptop is closed
- [ ] Cloud Routine creates branch/PR with correct changes
- [ ] API trigger works (curl test with bearer token)
- [ ] No duplicate work between Desktop tasks, Routines, and Hermes cron

## References

- [Desktop Scheduled Tasks docs](https://code.claude.com/docs/en/desktop-scheduled-tasks)
- [Routines (cloud) docs](https://code.claude.com/docs/en/web-scheduled-tasks)
- [Three scheduling methods compared](https://dev.classmethod.jp/en/articles/claude-code-schedule-comparison/)
- [Claude Code Scheduled Tasks guide](https://claudefa.st/blog/guide/development/scheduled-tasks)
- `/schedule` CLI command for managing routines
- Existing: `HEARTBEAT.md`, `data/funding-opportunities.yaml`, `npm run validate:schemas`
