---
id: superpowers-integration
title: "Superpowers Plugin Integration"
status: completed
priority: 7
scope: refi-bcn-os
depends_on: []
created: 2026-04-09
started: 2026-04-09
completed: 2026-04-15
estimated_sessions: 1
tags: [tooling, agentic, development-methodology]
category: infrastructure
related_to:
  - type: area
    id: refi-bcn-os
---

## Goal

Integrate the [obra/superpowers](https://github.com/obra/superpowers) framework into the workspace as a Claude Code plugin. Superpowers provides structured software development methodology (brainstorming, planning, TDD, debugging, verification, code review) for OS development work, complementing the existing org-os operational skills.

## Done

- [x] Install superpowers from Claude Code marketplace (v5.0.7)
- [x] Add "Development Methodology" section to CLAUDE.md scoping superpowers to dev work
- [x] Add `docs/superpowers/` to `.gitignore` (ephemeral tactical plans)
- [x] Create plan tracking file
- [x] Update QUEUE.md

## Remaining

- [x] Verify in a fresh session: superpowers skills load, /initialize works, /close works
- [x] Test one superpowers skill invocation (brainstorm or write-plan)

## Verification

- [x] `claude plugins list` shows superpowers@claude-plugins-official enabled
- [x] New session loads superpowers skills (SessionStart hook fires)
- [x] `/initialize` dashboard renders correctly (no conflict)
- [x] `/close` protocol works correctly (no conflict)
- [x] CLAUDE.md has Development Methodology section
- [x] `docs/superpowers/` is in `.gitignore`
