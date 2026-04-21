# Data Model Alignment — Notion ↔ ReFi BCN OS

Date: 2026-03-07  
Status: Draft v1 (WS2)

## Objective
Align IDs, statuses, and entity semantics between Notion operational databases and local Organizational OS registries.

---

## 1) Canonical Entity IDs

## Current State
- Local OS uses stable IDs (e.g., `did:refibcn:*`, `project-*`, `meeting-*`).
- Notion uses UUID page IDs and data source IDs.

## Alignment Rule
- Keep **local IDs as canonical** for public/portable data.
- Store Notion IDs as foreign keys when syncing to local.

### Proposed Foreign-Key Fields (local)

```yaml
# example extension pattern
notion_ref:
  page_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  data_source_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

Apply to:
- `data/members.yaml` (for CRM-backed members/orgs)
- `data/projects.yaml` (for Notion Projects records)
- `data/meetings.yaml` (for Notes & Documents records)

---

## 2) Alias & Naming Rules

## Canonical naming policy
- Use normalized names in local machine-readable files.
- Preserve source variant names in notes/aliases when relevant.

### Required aliases to preserve
- `ReFi BCN` ↔ `ReFi Barcelona`
- `La Fundició` ↔ `La Fundicio` ↔ `La Fundicio / Keras Buti`
- `Hum Community` ↔ `Home Community` (if encountered in old docs)

### Rule
If a new variant appears in Notion, add it to normalization log if it changes interpretation.

---

## 3) Status Normalization

## Projects: Notion → IDEA mapping

| Notion Status | IDEA Stage | Notes |
|---|---|---|
| Backlog | Integrate | Early intake or unscheduled work |
| Planning | Develop | Scoping/architecture phase |
| In Progress | Execute | Active implementation |
| On-going | Execute | Continuous delivery |
| Paused | Develop (paused) | Keep context, blocked for now |
| Done | Archive | Completed |
| Canceled | Archive (canceled) | Closed without completion |

## Tasks: Notion → HEARTBEAT mapping

| Notion Task Status | HEARTBEAT treatment |
|---|---|
| Backlog / Icebox | Upcoming (optional, only if strategic) |
| Not Started | Active Tasks (planned) |
| In Progress | Active Tasks (in execution) |
| Done | Recently Completed (if meaningful) |
| Archived | Do not surface unless relevant for audit |

## Notes & Documents: Notion → Meetings registry

| Notion record | Local mapping |
|---|---|
| Weekly Ops / meeting notes | `packages/operations/meetings/*.md` + `data/meetings.yaml` |
| Internal planning doc | keep in Notion + optional local summary in `memory/` |
| Public-facing synthesis | `knowledge/` or `packages/operations/projects/` |

---

## 4) Schema Mismatches Identified

1. **CRM breadth vs local members scope**
   - Notion CRM includes broad ecosystem contacts; local members file is currently core + key partners only.
   - Recommendation: split local concept into `members` (governance relevant) and optional `contacts` registry if needed.

2. **Project portfolio mismatch**
   - Notion Projects has many records; local projects has 3 canonical entries.
   - Recommendation: sync only projects with strategic relevance and maintain explicit selection criteria.

3. **Task model mismatch**
   - Notion tasks are granular; HEARTBEAT is strategic checklist.
   - Recommendation: promote only high-priority cross-team tasks into HEARTBEAT.

4. **Meetings index lag**
   - Notion holds many operational notes; local meetings registry currently sparse.
   - Recommendation: weekly processing routine from Notion notes into structured local meeting records.

---

## 5) Migration / Implementation Plan

## Phase A (now)
- Define sync filters (which Notion records qualify for local sync).
- Add `notion_ref` fields to selected local entries.

## Phase B (next)
- Update `meeting-processor` skill to ingest Notes & Documents records by query.
- Update `heartbeat-monitor` skill to ingest urgent Notion tasks.
- Update `funding-scout` skill to use CRM funding fields as discovery signals.

## Phase C (stabilize)
- Add QA checklist for sync quality (IDs, statuses, source refs, schema regen).
- Review monthly and refine filters.

---

## 6) Open Decisions for Luiz

1. Should local `data/members.yaml` stay "core actors only" or expand to full CRM subset?
2. Do we create a separate `data/contacts.yaml` for wider ecosystem tracking?
3. For paused projects, should local status remain IDEA-only or include a secondary state field?
