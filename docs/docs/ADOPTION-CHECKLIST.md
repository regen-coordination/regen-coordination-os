# ReFi BCN OS Adoption Checklist

Date: 2026-03-06

Use this checklist to activate `refi-bcn-os` for ongoing operations.

---

## 1) Identity and Core Setup

- [ ] Confirm `federation.yaml` identity and platform values (domain, chain, safe, maintainers).
- [ ] Confirm `IDENTITY.md`, `SOUL.md`, `USER.md`, and `TOOLS.md` reflect current team and infrastructure reality.
- [ ] Confirm `.well-known/dao.json` and `.well-known/dao.json.template` remain aligned.

## 2) Operational Data Backbone

- [ ] Validate stakeholder entries in `data/members.yaml` against current active participants.
- [ ] Validate project statuses and IDEA stages in `data/projects.yaml`.
- [ ] Validate funding and accounting entries in `data/finances.yaml`.
- [ ] Validate meeting index continuity in `data/meetings.yaml`.

## 3) Articulation and Governance Coherence

- [ ] Review `knowledge/refi-bcn-articulation-map.md` with core team.
- [ ] Review `data/relationships.yaml` and confirm relationship semantics.
- [ ] Validate ReFi DAO alignment references are still current.

## 4) Conflict and Canonical Value Management

- [ ] Review all entries in `knowledge/normalization-log.md`.
- [ ] Confirm which items are still pending vs confirmed.
- [ ] For each resolved conflict, update all dependent data files in the same commit.

## 5) Operations Cadence Activation

- [ ] Start daily updates using `packages/operations/meetings/templates/standup-template.md`.
- [ ] Start weekly coordination using `packages/operations/meetings/templates/meeting-template.md`.
- [ ] Start monthly retrospective using `packages/operations/meetings/templates/retrospective-template.md`.
- [ ] Use `packages/operations/projects/templates/project-idea.md` for all new project entries.

## 6) Validation Routine

- [ ] Run `npm run generate:schemas`.
- [ ] Run `npm run validate:schemas`.
- [ ] Confirm `.well-known` outputs are regenerated and committed when changed.

## 7) First Operational Review (Recommended within 7 days)

- [ ] Hold a first OS review session with Luiz, Giulio, Andrea.
- [ ] Confirm canonical funding values and compliance route status.
- [ ] Approve any terminology normalization updates.
- [ ] Confirm source-sync owners for each upstream repository.
