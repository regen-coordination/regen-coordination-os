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

| Skill | Path | Description | Category |
|-------|------|-------------|----------|
| **Meeting Processor** | [meeting-processor/](meeting-processor/) | Process meeting transcripts into structured organizational records | operations |
| **Funding Scout** | [funding-scout/](funding-scout/) | Network-wide funding opportunity tracking for nodes | coordination |
| **Knowledge Curator** | [knowledge-curator/](knowledge-curator/) | Aggregate and curate knowledge from Discourse forum, meeting notes, and network sources | operations |

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

- **2026-02-20** — Created INDEX; integrated Afo's skills from [coop/CLAUDE.md](https://github.com/regen-coordination/coop/blob/main/CLAUDE.md)
