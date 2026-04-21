---
id: v2-data-registries
title: "Populate v2 Data Registries"
status: completed
priority: 2
scope: refi-bcn-os
depends_on: [v2-structure-alignment]
created: 2026-04-06
started: 2026-04-07
completed: 2026-04-07
estimated_sessions: 1
tags: [v2, data, registries]
category: infrastructure
related_to:
  - type: area
    id: refi-bcn-os
---

## Goal

Create and populate the v2 data registries with BCN-specific data. Ensure all existing registries have `schema_version: "2.0"` headers.

## Tasks

- [x] Create `data/events.yaml` — local events (already existed, 75 lines)
- [x] Create `data/channels.yaml` — Telegram topics, forum, website, email (already existed, 59 lines)
- [x] Create `data/assets.yaml` — domains, registration docs, tools (already existed, 65 lines)
- [x] Add `schema_version: "2.0"` headers to all existing data/*.yaml files (all 15 files had it)
- [x] Create `data/ideas.yaml` — seed from knowledge analysis (already existed, 26 lines)
- [x] Create `data/sources.yaml` — BCN sources (already existed, 60 lines)
- [x] Create `data/knowledge-manifest.yaml` — BCN knowledge domains (already existed, 56 lines)
- [x] Review custom data files — pending-payouts.yaml (170 lines) and telegram-topic-routing.yaml (196 lines) kept as custom registries
- [x] Copy updated `scripts/generate-all-schemas.mjs` from framework (improved YAML parsing, dao.json template)
- [x] Regenerate all `.well-known/` schemas (10 schemas generated, validation passed)

## Verification

- [x] `npm run generate:schemas` succeeds (10 schemas)
- [x] All `data/*.yaml` files have `schema_version: "2.0"` (15/15)
- [x] Custom data files (pending-payouts, telegram-topic-routing) documented as BCN-specific registries
