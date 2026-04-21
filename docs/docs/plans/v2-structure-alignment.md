---
id: v2-structure-alignment
title: "Align to org-os v2.0.0 File Structure"
status: completed
priority: 1
scope: refi-bcn-os
depends_on: []
created: 2026-04-06
started: 2026-04-07
completed: 2026-04-07
estimated_sessions: 1
tags: [v2, alignment, structure]
category: infrastructure
related_to:
  - type: area
    id: refi-bcn-os
---

## Goal

Bring refi-bcn-os directory structure, commands, and scripts in line with the org-os v2.0.0 canonical spec.

## Current State

- MASTERPLAN.md exists (v2.0.0, 788 lines) — already aligned
- No `.claude/agents/` directory
- No `.claude/commands/` (initialize, close)
- No `scripts/initialize.mjs` or `scripts/validate-structure.mjs`
- HEARTBEAT.md is 12K+ lines (needs cleanup/archival)

## Tasks

- [x] Verify MASTERPLAN.md has v2 structure (Activations, Research Directions, Metrics, Boundaries)
- [x] Create `.claude/agents/` with agent modes:
  - `cooperative-ops.md` — BCN cooperative operations agent
  - `telegram-bot.md` — Telegram bot persona (from AGENTS.md)
- [x] Create `.claude/commands/initialize.md` (copy from framework)
- [x] Create `.claude/commands/close.md` (copy from framework)
- [x] Copy `scripts/initialize.mjs` from org-os framework
- [x] Copy `scripts/validate-structure.mjs` from framework
- [x] Copy `scripts/deploy-pages.mjs` from framework
- [x] Add scripts to package.json: `initialize`, `validate:structure`, `deploy:pages`
- [x] Run `npm run validate:structure` and fix failures
- [x] Clean up HEARTBEAT.md — archive completed items to `memory/` or separate archive file

## Verification

- [x] `npm run validate:structure` passes (46 passed, 0 failed)
- [x] `/initialize` renders a session dashboard
- [x] HEARTBEAT.md is under 500 lines (140 lines, active items only)
