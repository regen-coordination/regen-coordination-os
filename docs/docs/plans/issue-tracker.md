---
id: issue-tracker
title: "Issue/Bug Logging System"
status: queued
priority: 7
scope: refi-bcn-os
depends_on: []
created: 2026-04-09
started: null
completed: null
estimated_sessions: 1
tags: [ops, issues, bugs, quality]
category: infrastructure
related_to:
  - type: area
    id: refi-bcn-os
---

## Goal

Implement a lightweight issue/bug tracking system within the org-os workspace. Agents and operators can log issues as they encounter them, and the backlog feeds into session work planning.

## Tasks

- [ ] Design `data/issues.yaml` schema (id, title, severity, status, reporter, created, context, related files)
- [ ] Create `data/issues.yaml` with initial entries (seed from known issues like broken git submodule, Notion DB not found warning)
- [ ] Add issue-logging skill or convention so agents can append issues during sessions
- [ ] Surface open issues in `/initialize` dashboard (new section or integrated into Tasks)
- [ ] Add `issues` section to `dashboard.yaml` with options (max, severity filter, show_resolved)
- [ ] Update HEARTBEAT.md to reference critical/urgent issues
- [ ] Document the issue lifecycle: open → triaged → in-progress → resolved → closed

## Verification

- [ ] `data/issues.yaml` validates against schema
- [ ] Dashboard renders issue count and top-severity items
- [ ] Agent can log a new issue during a session and it persists
