# Regen Coordination OS

**Operational infrastructure for the Regen Coordination network**

This repository is the coordination layer (OS) for the Regen Coordination federation — a network of local nodes (ReFi BCN, NYC, Bloom, GreenPill, and others) working on regenerative finance, knowledge commons, and regional coordination.

---

## What This OS Does

- **Lists all participating nodes** and their status
- **Aggregates shared knowledge** from nodes into searchable domains
- **Distributes shared skills** to all nodes (meeting-processor, funding-scout, etc.)
- **Coordinates domain-based funding pools** for the network
- **Maintains the federation manifest** declaring network structure

---

## Network Members

See [MEMBERS.md](MEMBERS.md) for current node status.

| Node | Type | Status | Agent Runtime |
|------|------|--------|---------------|
| ReFi BCN | LocalNode | 🟢 Active | OpenClaw (DePIN) |
| NYC | LocalNode | 🟢 Active | OpenClaw (VPS) |
| Bloom | LocalNode | 🟢 Active | — |
| GreenPill | Network | 🟡 Bootstrapping | — |

---

## Repository Structure

```
regen-coordination-os/
├── README.md              # This file
├── MEMBERS.md             # Active nodes and status
├── federation.yaml        # Hub's federation manifest
├── AGENTS.md              # Hub operating instructions
├── SOUL.md                # Network values and mission
├── IDENTITY.md            # Hub identity
├── MEMORY.md              # Network memory index
│
├── skills/                # Shared skills for all nodes
│   ├── meeting-processor/
│   │   └── SKILL.md
│   └── funding-scout/
│       ├── SKILL.md
│       └── references/
│           └── funding-platforms.yaml
│
├── knowledge/             # Aggregated knowledge commons
│   ├── regenerative-finance/
│   │   ├── README.md
│   │   └── [from-nodes/*/]
│   ├── local-governance/
│   └── knowledge-infrastructure/
│
├── funding/               # Domain-based funding pools
│   ├── regenerative-finance/
│   │   └── pool-config.yaml
│   └── waste-management/
│       └── pool-config.yaml
│
└── .github/
    └── workflows/
        ├── aggregate-knowledge.yml
        └── distribute-skills.yml
```

---

## For Network Nodes

### Join the Network

1. Fork `organizational-os/organizational-os-template`
2. Run `npm run setup` and select `regen-coordination` as your network
3. Configure `federation.yaml` with hub pointing to this repo
4. Submit a PR to add your node to [MEMBERS.md](MEMBERS.md)

### Sync with Hub

```bash
# Add hub as remote
git remote add hub https://github.com/regen-coordination/regen-coordination-os

# Pull shared skills from hub
git fetch hub
git checkout hub/main -- skills/

# Push knowledge contributions
git clone https://github.com/regen-coordination/regen-coordination-os hub-repo
cp memory/YYYY-MM-DD.md hub-repo/knowledge/[domain]/from-nodes/[node-name]/
cd hub-repo && git commit -am "sync: [node-name] YYYY-MM-DD" && git push
```

---

## Funding Pools

The network is developing domain-based funding pools using Octant, Artisan, and Impact Stake.

See [funding/](funding/) for pool configurations.

**Current domains under development:**
- Regenerative Finance
- Waste Management

---

## Governance

The Regen Coordination Council (weekly sync calls) governs this OS:
- Consensus required for network-level decisions
- Any node can propose additions via PR
- Hub maintainers review and merge contributions

Weekly calls: Every Friday — see [MEMBERS.md](MEMBERS.md) for participants.

---

## Related

- [organizational-os-template](../organizational-os-template/) — The template all nodes fork
- [organizational-os-framework](../organizational-os-framework/) — Standards reference
- [dao-os](../dao-os/) — DAO-specific implementation layer
