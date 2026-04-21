---
id: knowledge-processing
title: "Knowledge Base v2 — Structure & Content"
status: completed
priority: 5
scope: refi-bcn-os
depends_on: [v2-data-registries]
created: 2026-04-06
started: 2026-04-08
completed: 2026-04-15
estimated_sessions: 2
tags: [v2, knowledge, content, quartz]
category: knowledge
related_to:
  - type: area
    id: knowledge-commons
---

## Goal

Clean, well-structured knowledge base at `knowledge/` (symlinked into Quartz site at `repos/refi-bcn-knowledge/content/`). Only real content — no AI-generated placeholders, no empty stubs.

## Done

### Phase 1 — Initial migration (2026-04-08)
- [x] Renamed repo: ReFi-Barcelona → refi-bcn-knowledge
- [x] Reorganized content/ from numbered folders to domain structure
- [x] Deleted Old/ (57 duplicate BioFi book files)
- [x] Flattened global/global/ double nesting
- [x] Normalized frontmatter (106 files: 79 added, 25 updated, 23 fields stripped)
- [x] Added aliases for all renamed files (wiki-link resolution)
- [x] Set up knowledge/ symlink → repos/refi-bcn-knowledge/content
- [x] Updated federation.yaml, quartz.config.ts, quartz.layout.ts
- [x] Added npm scripts: build:site, serve:site

### Phase 2 — Restructuring (2026-04-15)
- [x] Deleted 11 compiled digest files (pipeline-generated placeholders with LLM-SYNTHESIZE markers)
- [x] Deleted 9 stub pages (draft:true placeholders) — topics moved to content queue in `_meta/content-map.md`
- [x] Restructured from 4-level nesting to max 2-level flat structure
- [x] `articles/bioregionalism/` → `research/bioregionalism/` (original analysis)
- [x] `articles/cooperative/` merged into `cooperative/` (theory + practical unified)
- [x] `ecosystem/bioregional/case-studies/` → `biofi/` (top-level topic)
- [x] `ecosystem/bioregional/catalunya/` → `ecosystem/catalunya/` (flattened)
- [x] `ecosystem/bioregional/international/` → `ecosystem/international/` (flattened)
- [x] `wip/` → `drafts/` (flattened)
- [x] `operations/` → `_meta/` (non-published)
- [x] Updated content-map with new structure and content queue

## Remaining

- [x] Update Quartz config (`quartz.config.ts`, `quartz.layout.ts`) to match new directory structure
- [x] Update/prune index pages to reflect new hierarchy
- [x] Fix wiki-links broken by file moves (homepage rewritten, index pages updated)
- [x] Disable `compile-knowledge.mjs` compiled output (domain digest generation removed)
- [x] Update `knowledge-manifest.yaml` domain definitions
- [x] Verify Quartz build succeeds (119 files parsed, 361 emitted)
- [x] Update `knowledge/index.md` (homepage) to reflect new structure
- [x] Update `knowledge/README.md`

## Verification

- [x] `cd repos/refi-bcn-knowledge && npx quartz build` succeeds
- [x] `ls -la knowledge` shows symlink
- [x] Wiki-links from homepage resolve (rewritten to point to existing pages)
- [x] 124 markdown files in content/ (no compiled/stub files)
- [x] No `<!-- LLM-SYNTHESIZE -->` markers in any file
- [x] No `draft: true` stub files remain (only example in `_meta/style-guide.md`)
