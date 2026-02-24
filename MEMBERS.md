# Network Members

**Regen Coordination Network**

Last updated: 2026-02-20

For the full cross-network directory of all nodes, chapters, and initiatives, see `knowledge/network/`.

---

## Governing Partners

Organizations that articulate with Regen Coordination at the governance level:

| Partner | Role | URL |
|---------|------|-----|
| ReFi DAO | Articulation org — ReFi DAO chapters are RC-aligned nodes | https://refi.dao |
| Greenpill Network | Articulation org — Greenpill chapters are RC-aligned nodes | https://greenpill.network |
| Bloom Network | Governing partner | — |
| Bread Coop | Invited governing partner | — |

---

## Partner Organizations

For the full list of partner organizations, see [Regen Coordination Partnerships](https://docs.google.com/document/d/18I8XOK8hcaLDG_OQlSC0A0rQJnPEnz4gknGCY543STQ/edit?tab=t.omy4u5bb4br).

---

## Implementation Nodes

| Node | Type | Location | Agent | Last Sync | Status |
|------|------|----------|-------|-----------|--------|
| [ReFi BCN](https://github.com/regen-coordination/refi-bcn) | LocalNode | Barcelona, Spain | OpenClaw (DePIN) | 2026-02-20 | 🟢 Active |
| [Regenerant Catalunya](https://github.com/regen-coordination/regenerant-catalunya) | Program Node | Catalonia, Spain | Planned | — | 🟢 Active |
| [Local ReFi Toolkit](https://github.com/regen-coordination/local-refi-toolkit) | Resource Node | Global | — | — | 🟢 Active |
| [NYC Node](https://github.com/regen-coordination/nyc-node) | LocalNode | New York, USA | Pending | — | 🟡 Bootstrapping |
| [Bloom](https://github.com/regen-coordination/bloom) | LocalNode | Global | Pending | — | 🟡 Bootstrapping |
| [GreenPill Network](https://github.com/regen-coordination/greenpill) | Network | Global | Pending | — | 🟡 Observer |

---

## Node Profiles

### ReFi BCN 🌱
- **Type:** Local node — cooperative model
- **Location:** Barcelona, Catalonia / Spain
- **Focus:** Regenerant Catalunya pilot, knowledge commons, regional coordination
- **Contact:** @refibcn (Telegram)
- **GitHub:** github.com/regen-coordination/refi-bcn
- **Agent:** OpenClaw on DePIN node
- **Skills:** meeting-processor, funding-scout, knowledge-curator, capital-flow
- **Domains:** regenerative-finance, local-governance

### NYC Node
- **Type:** Local node
- **Location:** New York, USA
- **Status:** Bootstrapping — workspace setup in progress
- **Contact:** TBD

### Bloom
- **Type:** Local node / initiative
- **Status:** Bootstrapping
- **Integration:** Earth.live partnership, MOU with ReFi BCN
- **Contact:** TBD

### GreenPill Network
- **Type:** Network node (aggregated chapters)
- **Status:** Observer — evaluating federation model
- **Contact:** TBD

### Regenerant Catalunya 🌱
- **Type:** Program node — bioregional funding program
- **Location:** Catalonia, Spain
- **Focus:** Participatory funding for regenerative projects in Catalonia
- **Upstream:** organizational-os-template, quartz-refi-template
- **Contact:** ReFi BCN
- **GitHub:** github.com/regen-coordination/regenerant-catalunya

### Local ReFi Toolkit
- **Type:** Resource node — playbooks and frameworks
- **Focus:** Case studies, playbooks, frameworks for local ReFi nodes
- **Upstream:** quartz-refi-template
- **GitHub:** github.com/regen-coordination/local-refi-toolkit

---

## Council Members

The Regen Coordination Council governs this OS:

| Name | Node | Role |
|------|------|------|
| Luiz Fernando | ReFi BCN | Coordinator |
| Mary | NYC Node | — |
| Magenta | Bloom | — |
| Afo (Alpha) | Greenpill | — |
| Monty | ReFi DAO | — |

---

## Join the Network

To join as a node:

1. Fork `organizational-os/organizational-os-template`
2. Configure `federation.yaml`:
   ```yaml
   network: "regen-coordination"
   hub: "github.com/regen-coordination/regen-coordination-os"
   ```
3. Open a PR to this file adding your node entry
4. Attend a council call to introduce your node
5. Receive write access to this repo's `knowledge/` directory

---

## Node Status Key

- 🟢 Active — Regular sync, agent operational
- 🟡 Bootstrapping — Setup in progress, limited activity
- 🔴 Inactive — No recent activity (> 60 days)
- 👀 Observer — Participating without full node commitment
