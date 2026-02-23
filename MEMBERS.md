# Network Members

**Regen Coordination Network — Active Nodes**

Last updated: 2026-02-20

---

## Active Nodes

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
| _(more to be added)_ | — | — |

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
