---
name: knowledge-curator
version: 1.0.0
description: Aggregate and curate knowledge from Discourse forum, meeting notes, and network sources
author: regen-coordination
category: operations
metadata:
  openclaw:
    requires:
      env: []
      bins: []
      config: []
---

# Knowledge Curator (Regen Coordination)

## What This Is

Network-specific knowledge curator for Regen Coordination. Fetches content from the Discourse forum and meeting notes, extracts insights, and updates the cross-network directory (`knowledge/network/`) and data registries (`data/`).

## Discourse API

### Endpoints

- **Latest posts:** `https://hub.regencoordination.xyz/latest.json`
- **Category:** `https://hub.regencoordination.xyz/c/regen-coordination/4.json`
- **Topic:** `https://hub.regencoordination.xyz/t/{id}.json`

### Key Categories

| ID | Slug | Purpose |
|----|------|---------|
| 4 | regen-coordination | Main RC category |
| 20 | greenpill | Greenpill Network |
| 21 | refi-dao | ReFi DAO |
| 33 | regen-commons | Regen Commons |

### Fetch Workflow

1. GET `/latest.json` or `/c/regen-coordination/4.json`
2. Parse `topic_list.topics` for new/updated topics
3. For each topic: extract title, excerpt, posters, created_at, reply_count
4. Identify: action items, proposals, new node announcements, funding opportunities
5. Update relevant `knowledge/network/` files and `data/*.yaml` registries

## Update Targets

### When New Nodes/Chapters Announced

- Add to `data/nodes.yaml`
- Update `knowledge/network/nodes/refi-dao-nodes.md`, `greenpill-chapters.md`, or `bloom-nodes.md`
- Cross-reference `MEMBERS.md` if RC implementation node

### When Funding Opportunities Surface

- Add to `data/funding-opportunities.yaml`
- Update `knowledge/network/funding/index.md`

### When Funds Deploy

- Add to `data/funds.yaml` (Safe address, Gardens pool ID, Octant vault)
- Update `knowledge/network/funds/index.md`

### When Initiatives Launch

- Add to `data/initiatives.yaml`
- Update `knowledge/network/initiatives/index.md`

### When Cross-Network Threads Identified

- Note in `knowledge/network/ecosystem-map/index.md`
- Tag by network (refi-dao, greenpill, bloom)

## Regen Coordination Terminology

Apply consistent terminology (see `SOUL.md`, `IDENTITY.md`):

- **Names:** Luiz (not Luis), Mary, Magenta, Afo/Alpha, Monty
- **Orgs:** "ReFi DAO", "Greenpill Network", "Regen Coordination"
- **Programs:** "Regenerant Catalunya", "Local ReFi Toolkit"

## Sync Cadence

- **On-demand:** When user asks for forum summary or network update
- **Weekly:** After council call; check for new topics since last sync
- **Event-driven:** After major announcements (Artisan season, new round, merger)

## Integration Points

- `integrations/profiles/discourse-forum.md` — full forum spec
- `integrations/profiles/telegram.md` — Telegram (via OpenClaw when deployed)
- `federation.yaml` — `channels.forum` and `channels.telegram` config
