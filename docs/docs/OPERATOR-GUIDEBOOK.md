# ReFi BCN Operator Guidebook

Date: 2026-03-06  
Purpose: Define practical operating workflows for running ReFi BCN Organizational OS in active coordination.

---

## Operating Rhythm

### Daily (15-20 min)

- Use `packages/operations/meetings/templates/standup-template.md`.
- Capture blockers, owners, and source-sync touchpoints.
- Record action items in standard format so extraction works.

### Weekly (60-90 min)

- Run one coordination meeting using `meeting-template.md`.
- Update:
  - `data/members.yaml` for stakeholder changes,
  - `data/projects.yaml` for project status and IDEA stage,
  - `data/finances.yaml` for any confirmed financial updates,
  - `knowledge/normalization-log.md` when conflicts emerge.

### Bi-weekly or Monthly

- Run retrospective using `retrospective-template.md`.
- Verify articulation coherence:
  - `knowledge/refi-bcn-articulation-map.md`,
  - `data/relationships.yaml`.

---

## Stakeholder Update Workflow

1. Detect updates from meetings, partner calls, or new source docs.
2. Add or update entities in `data/members.yaml`.
3. Add relationship changes in `data/relationships.yaml`.
4. If naming or role ambiguity appears, add entry to `knowledge/normalization-log.md`.
5. Regenerate schemas and verify that member IDs remain stable.

---

## Funding and Program Update Workflow

1. Check source docs for confirmed financial or program changes.
2. Update project-level entries in `data/projects.yaml`.
3. Update funding entries in `data/finances.yaml`.
4. If values conflict across sources, do not overwrite silently:
   - log conflict in `knowledge/normalization-log.md`,
   - choose canonical working value with rationale,
   - mark review status.
5. Regenerate schemas and ensure outputs remain consistent.

---

## Source-Sync Protocol (Upstream Repositories)

Upstreams:

- `03 Libraries/ReFi-Barcelona`
- `03 Libraries/ReFi-BCN-Website`
- `03 Libraries/Regenerant-Catalunya`
- `03 Libraries/ReFi DAO`

Sync sequence:

1. Scan changed source files relevant to governance, stakeholders, funding, and programs.
2. Update OS artifacts in this order:
   - `knowledge/normalization-log.md`
   - `data/members.yaml`
   - `data/projects.yaml`
   - `data/finances.yaml`
   - `data/relationships.yaml`
   - `knowledge/refi-bcn-articulation-map.md`
3. Regenerate schemas and confirm no breaking changes.
4. Record key changes in `HEARTBEAT.md`.

---

## Core Quality Gates

- Every material statement has `source_refs`.
- Terminology uses canonical naming:
  - ReFi DAO
  - ReFi BCN / ReFi Barcelona
  - Regenerant Catalunya
- Funding and allocation values are either:
  - reconciled and canonical, or
  - explicitly marked as pending in normalization log.
- IDEA status exists for all active projects.

---

## Quick Command Checklist

```bash
npm run generate:schemas
npm run validate:schemas
```

If validation fails, fix data or template consistency before continuing operational updates.
