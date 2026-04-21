---
id: v2-agentic-completion
title: "Agentic Completion — Skills, Modes, Agent Files"
status: completed
priority: 3
scope: refi-bcn-os
depends_on: [v2-structure-alignment]
created: 2026-04-06
started: 2026-04-07
completed: 2026-04-07
estimated_sessions: 1
tags: [v2, agentic, skills]
category: infrastructure
related_to:
  - type: area
    id: refi-bcn-os
---

## Goal

Complete the agentic layer: copy missing core skills, update CLAUDE.md, ensure Telegram bot persona is accessible as agent mode.

## Tasks

- [x] Review MASTERPLAN.md — 4 workfronts with Q2 2026 activations verified
- [x] Verify AGENTS.md references MASTERPLAN.md — 7 references found
- [x] Update CLAUDE.md to reference /initialize and /close commands — already documented
- [x] Core skills present (all from prior sessions):
  - `skills/bootstrap-interviewer/SKILL.md` — identical to framework
  - `skills/idea-scout/SKILL.md` — identical to framework
  - `skills/workspace-improver/SKILL.md` — BCN-customized (knowledge pipeline)
  - `skills/org-os-init/SKILL.md` — BCN-customized (IDEA stages, MEMORY.md)
- [x] cooperative-ops accessible as `.claude/agents/cooperative-ops.md`
- [x] Telegram bot persona accessible as `.claude/agents/telegram-bot.md`
- [x] federation.yaml: "claude" already in agent.runtime, webapps: true covers dashboard

## Verification

- [x] All 11 core skills present in `skills/` with SKILL.md
- [x] 2 agent modes accessible via `.claude/agents/` (cooperative-ops, telegram-bot)
- [x] CLAUDE.md references /initialize and /close
