# Projects Database Task Force — Notion Update

**Created:** 2026-03-19  
**Target:** [Notion Projects DB](https://www.notion.so/1386ed0845cb81beae81cc3a24e72199?v=1386ed0845cb819fb4a9000cfb1427d5)  
**Status:** Planning — Ready for Execution  
**Related:** [[docs/T5-ARCHIVE-RECOMMENDATIONS-DRAFT]], [[docs/SOURCE-OF-TRUTH-MATRIX]], HEARTBEAT T5–T9

---

## Executive Summary

The Notion Projects database is outdated: ~39 entries from Mar 10 export, with stale statuses, archive drift (7 pre-approved for Done/Canceled), and projects in Notion not reflected in local `data/projects.yaml`. This task force coordinates a full sweep to align Notion with operational reality.

---

## Current State Snapshot

### Local vs Notion (as of 2026-03-19)

| Source | Count | Notes |
|-------|-------|-------|
| **Local** `data/projects.yaml` | 15 projects | 8 active, 7 archived (pending Notion sync) |
| **Notion** (Mar 10 export) | 39 projects | Mixed statuses; many Backlog/Paused/Done |
| **Archive recommended** (T5) | 7 projects | Draft approved, awaiting Luiz sign-off |

### Known Issues

1. **Archive drift** — 7 projects marked archived locally still show "In Progress"/"Backlog" in Notion
2. **Status mismatch** — e.g. Finances Management: local "On-going" vs Notion "Backlog"
3. **Missing in local** — Several Notion projects not in `data/projects.yaml` (LicitaCoop 2026, Canvas Social, Hum Community, etc.)
4. **Duplicate/superseded** — Some 2023 projects may have been restructured; ID mapping may need refresh
5. **Owner/Assignee gaps** — Many Notion projects have `owner_count: 0`

---

## Task Force Phases

### Phase 1: Archive Batch (T5 Execution)
**Owner:** Luiz approval → Agent execution  
**Effort:** ~30 min  
**Prerequisite:** Luiz approval on `docs/T5-ARCHIVE-RECOMMENDATIONS-DRAFT.md`

- [ ] Luiz approves 7-project archive batch
- [ ] Update each project in Notion: Status → "Done" or "Canceled" + archive note in description
- [ ] Verify local YAML reflects archived
- [ ] Log in FEEDBACK-ACTION-REGISTER.md

**Projects to archive:**
| Notion ID | Name | Action |
|-----------|------|--------|
| 1386ed08-45cb-81ae-a83d-dfe3f0b3e23b | ReFi BCN <> Gitcoin GR18 | Done |
| 1386ed08-45cb-81de-b6ab-d25878d0cf14 | ReFi DAO Local Nodes Beta Cohort | Done |
| 1386ed08-45cb-814c-a668-ea42c2db06ce | Outreach List | Done |
| 1386ed08-45cb-81e8-811d-c189bafdd978 | Content & Communications Plan | Done |
| 1386ed08-45cb-81e4-8d84-c2b8d1309496 | Ecosystem Mapping & Research Plan | Done |
| 1386ed08-45cb-815c-8cff-ef1b6d761f04 | IRL Events Plan | Done |
| 1386ed08-45cb-814b-8064-d18e4f942982 | Coordination & Governance Plan | Done |

*Note: Some IDs may map to restructured pages — verify in Notion before update.*

---

### Phase 2: Status + Owner Sync
**Owner:** Luiz + Agent  
**Effort:** ~45 min

For each **active** project in Notion, align:
- **Status** (Backlog | Paused | Planning | In Progress | Done | Canceled)
- **Owner** (assign if empty)
- **Dates** (start/end where applicable)

**Priority projects to sync first:**
| Project | Current Notion Status | Target | Owner |
|---------|------------------------|--------|-------|
| Regenerant Catalunya GG24 | In Progress | ✅ Keep | — |
| Incubació Cooperativa Bloc4 | In Progress | ✅ Keep | — |
| New Cooperative Brand | Backlog | In Progress (active work) | Andrea |
| Finances Management | Backlog | On-going | Luiz |
| Col·laboració amb Miceli | — | On-going | Luiz |
| 2026 Network Plans | In Progress | ✅ Keep | — |

---

### Phase 3: Add Missing Projects to Local
**Owner:** Agent  
**Effort:** ~20 min

Projects in Notion that should be added to `data/projects.yaml`:

| Notion Project | Status | Recommendation |
|----------------|--------|----------------|
| LicitaCoop 2026 | In Progress | Add — active ops |
| Canvas Social | In Progress | Add — if still active |
| Hum Community Implementation Plan | — | Review — add or archive |
| Course on Entrepreneurship, for Teachers | Backlog | Add if in scope |
| Event proposal for Miceli (Catalunya Place) | Backlog | Consider merging with Col·laboració Miceli |
| Catalunya BFF plans 2026 | Backlog | Add if in scope |
| ReFi BCN & GG24 Websites | Planning | Add — links to website project |

---

### Phase 4: Cleanup & Consolidation
**Owner:** Luiz + Agent  
**Effort:** ~30 min

- [ ] **Merge candidates** — Decidim Fest thread, ReFi BCN One Pager V2 (per T5 decision required)
- [ ] **Backlog review** — Decide: keep as Backlog, move to Done/Canceled, or archive
- [ ] **Duplicate detection** — IRL Events vs IRL Events Plan; Content & Communications vs Content & Communications Plan (different IDs in export — may be same or restructured)
- [ ] **Update `data/projects.yaml`** with final notion_ids after any page merges

---

### Phase 5: Establish Weekly Sync
**Owner:** Agent  
**Effort:** One-time setup + ongoing

- [ ] Document sync protocol in `docs/SOURCE-OF-TRUTH-MATRIX.md` (T8)
- [ ] Run first sync cycle (T9)
- [ ] Add to Monday ops ritual: Projects + Tasks status check

---

## Execution Checklist

### Pre-Task-Force
- [ ] Luiz reviews this doc + T5 draft
- [ ] Confirm Phase 1 approval (archive batch)
- [ ] Block 2h for focused sweep (or split across 2 sessions)

### During
- [ ] Work in Notion first (source of truth for status)
- [ ] After each batch: run `npm run generate:schemas && npm run validate:schemas`
- [ ] Log actions in `memory/YYYY-MM-DD.md`

### Post
- [ ] Update HEARTBEAT T5–T9 status
- [ ] Update FEEDBACK-ACTION-REGISTER.md
- [ ] Notion ↔ local drift: target 0

---

## Data Source Reference

| Resource | Location |
|----------|----------|
| Notion Projects DB | https://www.notion.so/1386ed0845cb81beae81cc3a24e72199 |
| Local registry | `data/projects.yaml` |
| Full Notion export (Mar 10) | `docs/exports/notion-projects-full-2026-03-10.json` |
| T5 Archive draft | `docs/T5-ARCHIVE-RECOMMENDATIONS-DRAFT.md` |
| Sync protocol | `docs/SOURCE-OF-TRUTH-MATRIX.md` |

---

## Quick Start

**To begin:**

1. Open [Notion Projects](https://www.notion.so/1386ed0845cb81beae81cc3a24e72199?v=1386ed0845cb819fb4a9000cfb1427d5)
2. Review Phase 1 archive list — approve or adjust
3. Reply with "approved" or specific changes
4. Agent executes Phase 1 → Phase 2 → Phase 3 in sequence

---

_Last updated: 2026-03-19_
