# Plan Queue — org-os (framework + regen-coord instance)

> Last updated: 2026-04-26

## Active

_(none — pick one of the queued plans below to activate)_

## Queued — regen-coord-instance plans

1. [regen-coord-vault-bootstrap](regen-coord-vault-bootstrap.md) — **Plan A.** Process Regen Coord/network meetings from personal vault (~15 meetings) into `regen-coordination-os` via `meeting-processor`. Outputs canonical `packages/operations/meetings/` records, `data/meetings.yaml` entries, project-page updates, memory logs.

## Queued — earlier (network/framework)

2. [regen-toolkit-org-os-embed](regen-toolkit-org-os-embed.md) — _**Superseded by branch `feature/org-os-overlay`**_ on `explorience/regen-toolkit` (PR #310 closed without merge — operating from the branch directly).
3. [future-instance-specs](future-instance-specs.md) — Write specs for regen-coordination-os and regen-toolkit
4. [federation-protocol](federation-protocol.md) — End-to-end federation exchange testing and docs

## Scoping

- [non-tech-onboarding](non-tech-onboarding.md) — Web wizard bootstrap + GitHub Actions backend
- [framework-dashboard-template](framework-dashboard-template.md) — Reusable dashboard package template

## Completed

- ~~[v2-phase1-framework](v2-phase1-framework.md)~~ — Framework standards, docs, skills, data model, session lifecycle

---

## Toolkit-instance plans (canonical home: regen-toolkit repo)

The 4 toolkit-specific plans previously drafted here have moved to their canonical home in the regen-toolkit repo. They live alongside the master doc and the org-os overlay they apply to. Track them at:

| Plan | Toolkit-side path | Status |
|---|---|---|
| Vault bootstrap | `repos/regen-toolkit/docs/plans/vault-bootstrap.md` | **completed 2026-04-26** |
| Org-os one-pager + LAYERS.md | `repos/regen-toolkit/docs/plans/onepager-and-layers.md` | **completed 2026-04-26** |
| Public sharing pack | `repos/regen-toolkit/docs/plans/public-sharing-pack.md` | queued (decisions resolved by mirroring CSIS + KOI docs into toolkit, db741a9 on `feature/org-os-overlay`) |
| Contributions pipeline (brainstorm) | `repos/regen-toolkit/docs/plans/contributions-pipeline.md` | open |

The toolkit's own plan QUEUE: `repos/regen-toolkit/docs/plans/QUEUE.md`.

---

## Cross-instance plans (canonical home: peer org-os instances)

| Plan | Canonical home | Status | Notes |
|---|---|---|---|
| Bread Co-op OS bootstrap | `03 Libraries/bread-coop-os/docs/QUEUE.md` | queued | Triggered by 2026-04-23 toolkit planning call. Luiz + Durgadas (CSIS power-distribution standards + AI prompts to counter Josh power-concentration concern flagged by Rather). Dependency: validate Durgadas's standards application approach on next call. |

---

## Cross-cutting context

- **KOI federation** (gated): see `memory/koi_intake_blocked_on_refi_dao.md`. Plan A intentionally uses manual `meeting-processor` for now; designed to be replaceable by KOI sensors when refi-dao-os Wave 2 ships and extracts to `org-os/packages/koi/`.
- **superpowers + karpathy**: now active in this instance as submodules (`.agents/skills/superpowers`, `.agents/skills/karpathy-skills`) — matches the regen-toolkit overlay pattern.
- **Toolkit overlay**: 5 commits on `feature/org-os-overlay` of `explorience/regen-toolkit`. Operating from the branch directly — PR #310 closed (no merge gate). The team works against the branch; merge to `main` is a future decision, not a blocker.
