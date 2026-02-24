# Knowledge Commons: Network Directory

**Domain:** Cross-Network Aggregation  
**Network:** Regen Coordination  
**Maintained by:** Hub (aggregated from ReFi DAO, Greenpill, Bloom nodes)

---

## Purpose

Regen Coordination OS is the aggregation layer for the cross-network directory. This domain consolidates nodes, chapters, initiatives, events, programs, channels, funding opportunities, and on-chain funds from across ReFi DAO, Greenpill Network, and Bloom Network.

---

## Scope

- **Nodes:** All ReFi DAO local nodes, Greenpill chapters, Bloom nodes
- **Initiatives:** Cross-network initiatives (Localism Fund, Regenerant Catalunya, Local ReFi Toolkit)
- **Events:** Recurring and upcoming events (council calls, network showcases, GG rounds)
- **Programs:** Active funding/coordination programs
- **Channels:** Communication channels across networks
- **Funding:** Funding opportunities (platforms and mechanisms)
- **Funds:** On-chain fund instances (Safe treasuries, Gardens pools, Octant vaults)

---

## Update Cadence

- **Manual:** When new nodes join, initiatives launch, or funds deploy
- **Agent-assisted:** `knowledge-curator` skill updates from Discourse forum and meeting notes
- **Sync:** Weekly council call context; on-demand after major announcements

---

## Sources

- Local repos in `03 Libraries/` (ReFi-BCN-Website, ReFi-Mediterranean, ReFi-Provence)
- Meeting notes (RC Council Sync, Luiz <> Matty sync)
- Discourse forum: https://hub.regencoordination.xyz
- `data/` YAML registries (nodes.yaml, initiatives.yaml, programs.yaml, channels.yaml, funding-opportunities.yaml, funds.yaml)

---

## Structure

```
knowledge/network/
├── README.md           # This file
├── nodes/              # refi-dao-nodes.md, greenpill-chapters.md, bloom-nodes.md
├── initiatives/        # index.md
├── events/             # index.md
├── programs/           # index.md
├── channels/           # index.md
├── funding/            # index.md (opportunities)
├── funds/              # index.md (on-chain instances)
└── ecosystem-map/      # index.md (network of networks)
```
