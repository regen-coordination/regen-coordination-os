---
id: notion-integration
title: "Bidirectional Notion ↔ YAML Sync"
status: queued
priority: 6
scope: refi-bcn-os
depends_on: [v2-data-registries]
created: 2026-04-06
started: null
completed: null
estimated_sessions: 2
tags: [v2, notion, sync, integration]
category: integrations
related_to:
  - type: area
    id: refi-bcn-os
---

## Goal

Create bidirectional sync between ReFi BCN's Notion workspace and `data/*.yaml` files.

## Tasks

- [ ] Document BCN Notion workspace map in `docs/NOTION-WORKSPACE-MAP.md`
- [ ] Create `scripts/sync-notion.mjs` — bidirectional sync for BCN Notion workspace
- [ ] Map BCN-specific Notion databases (members, projects, finances)
- [ ] Add `"sync:notion"` to package.json
- [ ] Configure Notion MCP in `.claude/settings.json`
- [ ] Test sync for each mapped DB

## Verification

- [ ] `npm run sync:notion` runs without errors
- [ ] Changes in Notion appear in `data/*.yaml` after sync
