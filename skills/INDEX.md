# Skills Index — Regen Coordination OS

Consolidated skills catalog for the Regen Coordination network. Use this for backlog, scoping, and agent capability planning.

**Source:** Merged from existing network skills + [regen-coordination/coop CLAUDE.md](https://github.com/regen-coordination/coop/blob/main/CLAUDE.md) (Afo).

---

## Status Legend

| Status | Meaning |
|--------|---------|
| **Implemented** | SKILL.md exists, deployed to nodes |
| **Backlog** | Scoped, not yet built |
| **Scoping** | Under consideration, needs design |
| **Reference** | External protocol/tool — skill would wrap or integrate |

---

## Implemented Skills

### Org-OS Framework (canonical from `../org-os`)

| Skill | Path | Category |
|-------|------|----------|
| **bootstrap-interviewer** | [bootstrap-interviewer/](bootstrap-interviewer/) | onboarding |
| **capital-flow** | [capital-flow/](capital-flow/) | finance |
| **funding-scout** | [funding-scout/](funding-scout/) | coordination |
| **heartbeat-monitor** | [heartbeat-monitor/](heartbeat-monitor/) | operations |
| **idea-scout** | [idea-scout/](idea-scout/) | operations |
| **initialize** | [initialize/](initialize/) | session-lifecycle |
| **knowledge-curator** | [knowledge-curator/](knowledge-curator/) | operations |
| **meeting-processor** | [meeting-processor/](meeting-processor/) | operations |
| **org-os-init** | [org-os-init/](org-os-init/) | session-lifecycle |
| **schema-generator** | [schema-generator/](schema-generator/) | data |
| **skills-curator** | [skills-curator/](skills-curator/) | meta |
| **workspace-improver** | [workspace-improver/](workspace-improver/) | meta |

### Cross-cutting (from `../refi-bcn-os` & `../refi-dao-os`)

| Skill | Source | Path | Category |
|-------|--------|------|----------|
| **artifacts-builder** | refi-bcn-os | [artifacts-builder/](artifacts-builder/) | content |
| **mcp-builder** | refi-bcn-os | [mcp-builder/](mcp-builder/) | tooling |
| **research** | refi-bcn-os | [research/](research/) | research |
| **skill-creator** | refi-bcn-os | [skill-creator/](skill-creator/) | meta |
| **meeting-notes-transcription-fixer** | refi-dao-os | [meeting-notes-transcription-fixer/](meeting-notes-transcription-fixer/) | operations |

### Methodology — Karpathy / Feynman expert lenses

| Skill | Path | Category |
|-------|------|----------|
| **expert-feynman** | [expert-feynman/](expert-feynman/) | research |
| **karpathy-guidelines** | [karpathy-guidelines/](karpathy-guidelines/) | engineering |

### Superpowers (Claude Code disciplines)

| Skill | Path | Category |
|-------|------|----------|
| **superpowers-brainstorming** | [superpowers-brainstorming/](superpowers-brainstorming/) | discipline |
| **superpowers-executing-plans** | [superpowers-executing-plans/](superpowers-executing-plans/) | discipline |
| **superpowers-finishing-a-development-branch** | [superpowers-finishing-a-development-branch/](superpowers-finishing-a-development-branch/) | discipline |
| **superpowers-requesting-code-review** | [superpowers-requesting-code-review/](superpowers-requesting-code-review/) | discipline |
| **superpowers-subagent-driven-development** | [superpowers-subagent-driven-development/](superpowers-subagent-driven-development/) | discipline |
| **superpowers-systematic-debugging** | [superpowers-systematic-debugging/](superpowers-systematic-debugging/) | discipline |
| **superpowers-test-driven-development** | [superpowers-test-driven-development/](superpowers-test-driven-development/) | discipline |
| **superpowers-using-git-worktrees** | [superpowers-using-git-worktrees/](superpowers-using-git-worktrees/) | discipline |
| **superpowers-writing-plans** | [superpowers-writing-plans/](superpowers-writing-plans/) | discipline |

### Instance-specific (Phase 0 design curation, kept local)

| Skill | Path | Category |
|-------|------|----------|
| **brand-guidelines** | [brand-guidelines/](brand-guidelines/) | design |
| **deploy-to-vercel** | [deploy-to-vercel/](deploy-to-vercel/) | tooling |
| **frontend-design** | [frontend-design/](frontend-design/) | design |
| **oklch-skill** | [oklch-skill/](oklch-skill/) | design |
| **webapp-testing** | [webapp-testing/](webapp-testing/) | tooling |

---

## Backlog (from Afo's list)

Skills scoped for future development. Order reflects suggested priority; adjust as network needs evolve.

| Skill | Status | Notes |
|-------|--------|-------|
| **Meeting Notetaker** | Implemented (as meeting-processor) | Alias for meeting-processor |
| **Octant Vaults** | Backlog | Integrate with funding-scout; vault strategy TBD |
| **Gardens Conviction Voting** | Backlog | Governance tool under evaluation |
| **Hats Protocol** | Backlog | Role-based access for nodes |
| **Unlock Protocol** | Backlog | Gated access / membership |
| **Greenpill Impact Framework** | Backlog | Impact reporting alignment |
| **Green Goods Impact Reporting** | Backlog | Domain-specific impact tracking |
| **Flow State Streaming** | Scoping | Streaming payments / capital flows |

---

## Reference Skills (protocols / infrastructure)

These are protocols or tools the network may integrate. Skills would wrap or document usage.

| Skill | Type | Notes |
|-------|------|-------|
| **Ethereum** | Reference | Base chain; Gnosis Chain (eip155:100) primary |
| **Decentralized Identifiers** | Reference | DID support for node identity |
| **Zero Knowledge Proofs** | Reference | Privacy-preserving verification |
| **Obol DVT** | Reference | Distributed validator technology |
| **Lido CSM** | Reference | Consensus layer staking |

---

## By Category

### Coordination
- funding-scout (implemented)
- Octant Vaults (backlog)
- Gardens Conviction Voting (backlog)

### Operations
- meeting-processor (implemented)

### Governance & Access
- Hats Protocol (backlog)
- Unlock Protocol (backlog)

### Impact & Reporting
- Greenpill Impact Framework (backlog)
- Green Goods Impact Reporting (backlog)

### Infrastructure / Reference
- Ethereum, DIDs, ZKPs, Obol DVT, Lido CSM

---

## Adding a New Skill

1. Create `skills/<skill-name>/SKILL.md` with frontmatter (name, version, description, category)
2. Add to this INDEX under the appropriate status
3. Update `federation.yaml` `agent.skills` if the hub should distribute it
4. Add to `distribute-skills.yml` scope if nodes should receive it

---

## Changelog

- **2026-05-15** — Sync from network: +18 framework skills (org-os canonical: 4 new + 9 superpowers; refi-bcn: 4; refi-dao: 1) + bumped org-os-init to v2.2.0 (Hermes/OpenCode platform support)
- **2026-02-20** — Created INDEX; integrated Afo's skills from [coop/CLAUDE.md](https://github.com/regen-coordination/coop/blob/main/CLAUDE.md)
