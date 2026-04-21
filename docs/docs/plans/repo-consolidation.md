---
id: repo-consolidation
title: "Consolidate All Org Repos"
status: completed
priority: 5
scope: refi-bcn-os
depends_on: [v2-structure-alignment]
created: 2026-04-06
updated: 2026-04-07
started: 2026-04-07
completed: 2026-04-07
estimated_sessions: 1
tags: [v2, repos, consolidation]
category: infrastructure
related_to:
  - type: area
    id: refi-bcn-os
---

## Goal

Consolidate all ReFi BCN repos under `refi-bcn-os/repos/`, managed by `repos.manifest.json`, with `repos/` gitignored. Migrate from submodules to manifest-managed clones.

## Key Decisions

- **Local YAML = source of truth** — propagate to external systems
- **`repos/` gitignored** — manifest manages clones, repos are ephemeral
- **No info loss** — content counts verified before removing parallel dirs
- **Submodules already removed** — no `.gitmodules` existed at execution time

## Findings

- `.gitmodules` was already removed (no submodule migration needed)
- `repos/` was already gitignored
- Only 1 of 3 BCN repos (`ReFi-Barcelona`) exists on GitHub as standalone repo
- `refi-bcn-website` and `regenerant-catalunya` are Zettelkasten monorepo dirs, not standalone repos — removed from manifest
- `refi-dao-os` and `Local-ReFi-Toolkit` don't exist on GitHub — removed from manifest
- Manifest cleaned from 9 → 5 repos (3 framework, 1 network peer, 1 BCN org repo)

## Tasks

### Phase 1: Inventory & Preparation

- [x] Inventory all ReFi BCN repos — GitHub, 03 Libraries/, repos/, .gitmodules
- [x] Verified: no local-only content needing GitHub backup
- [x] Content counts verified (Regenerant-Catalunya had 31 files, canonical copy in 03 Libraries/)

### Phase 2: Manifest & Infrastructure

- [x] `repos/` already in `.gitignore`
- [x] Updated `repos.manifest.json` — cleaned to 5 verified repos with correct URLs
- [x] Fixed clone script — added try/catch, error collection, empty-dir cleanup for re-clone
- [x] Copied `scripts/index-linked-repos.mjs` from refi-dao-os, added `index:repos` npm script
- [x] Created `repos.index.manifest.json` with include/exclude rules and priority paths

### Phase 3: Clone & Migrate

- [x] `npm run clone:repos` — 5 repos cloned successfully
- [x] No submodules to migrate (already removed)
- [x] Removed orphan dirs (ReFi-BCN-Website empty dir, Regenerant-Catalunya working files)

### Phase 4: Documentation & Cleanup

- [x] Updated `repos/README.md` with current manifest and commands
- [x] `npm run index:repos` — generated `docs/indexes/repos-index-full.json` (280 files from ReFi-Barcelona)

## Verification

- [x] All 5 declared repos exist in `repos/`
- [x] `repos.manifest.json` matches actual GitHub repos (verified with `gh repo view`)
- [x] `repos/` is in `.gitignore`
- [x] No submodules (`.gitmodules` doesn't exist)
- [x] No duplicate clones between `repos/` and `03 Libraries/`
- [x] `npm run index:repos` succeeds
