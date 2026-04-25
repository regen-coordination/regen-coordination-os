# Plan Queue — org-os (framework + regen-coord instance)

> Last updated: 2026-04-25

## Active

_(none — pick one of the queued plans below to activate)_

## Queued — 2026-04-25 batch (vault bootstrap + toolkit follow-ups)

1. [regen-coord-vault-bootstrap](regen-coord-vault-bootstrap.md) — **Plan A.** Process Regen Coord/network meetings from personal vault (~15 meetings) into `regen-coordination-os` via `meeting-processor`. Outputs canonical `packages/operations/meetings/` records, `data/meetings.yaml` entries, project-page updates, memory logs.
2. [regen-toolkit-vault-bootstrap](regen-toolkit-vault-bootstrap.md) — **Plan B.** Bootstrap toolkit meeting history from vault (5 toolkit meetings) + migrate the 2 pre-overlay records in `repos/regen-toolkit/docs/meeting-notes/` into the canonical org-os layout. Branch off `feature/org-os-overlay` (PR #310) or `main` after merge.
3. [regen-toolkit-onepager-and-layers](regen-toolkit-onepager-and-layers.md) — **Plan C.** Write `docs/ORG-OS.md` (operator one-pager) + `docs/LAYERS.md` (per-layer status) for the toolkit. Operator entry point + at-a-glance master-doc-as-architecture view.
4. [regen-toolkit-public-sharing-pack](regen-toolkit-public-sharing-pack.md) — **Plan D.** Produce 3 publicly-shareable links (Master Doc Briefing, CSIS × org-os Alignment Report, KOI integration doc) + draft sharing message for the toolkit team. **Has open decision in §1** — refi-dao-os is private, CSIS report unpushed; resolve before executing past §1.
5. [contributions-pipeline](contributions-pipeline.md) — **Plan E (brainstorm).** Catalog of other valuable contributions (Resources lift to Layer 1, frame-language audit, CSIS conformance posture, ontology V1+V2b overlay, KOI-ready frontmatter, etc.). Triage candidates → promote to named plans as bandwidth allows.

## Queued — earlier

6. [regen-toolkit-org-os-embed](regen-toolkit-org-os-embed.md) — _**Superseded by PR #310**_ (in-flight at https://github.com/explorience/regen-toolkit/pull/310). Mark complete when PR merges.
7. [future-instance-specs](future-instance-specs.md) — Write specs for regen-coordination-os and regen-toolkit
8. [federation-protocol](federation-protocol.md) — End-to-end federation exchange testing and docs

## Scoping
- [non-tech-onboarding](non-tech-onboarding.md) — Web wizard bootstrap + GitHub Actions backend
- [framework-dashboard-template](framework-dashboard-template.md) — Reusable dashboard package template

## Completed
- ~~[v2-phase1-framework](v2-phase1-framework.md)~~ — Framework standards, docs, skills, data model, session lifecycle

---

## Cross-cutting context

- **KOI federation** (gated): see `memory/koi_intake_blocked_on_refi_dao.md`. Plans A/B intentionally use manual `meeting-processor` for now; designed to be replaceable by KOI sensors when refi-dao-os Wave 2 ships and extracts to `org-os/packages/koi/`.
- **superpowers + karpathy**: now active in this instance as submodules (`.agents/skills/superpowers`, `.agents/skills/karpathy-skills`) — matches the regen-toolkit overlay pattern.
