# Regen Coordination OS — Agent Guide

_This repo is primarily a Git-based coordination layer, not an active agent workspace. Coordination happens through GitHub Actions and weekly council calls. This file documents conventions for AI assistants working with this content._

---

## Purpose

This OS repo:
1. **Aggregates** knowledge from nodes into searchable domains
2. **Distributes** shared skills to all nodes
3. **Coordinates** funding pools at network level
4. **Lists** network members and their status

This repo does NOT run an active agent. Automation is via GitHub Actions.

---

## Working with Hub Content

### Adding Knowledge from a Node

Place node contributions in:
```
knowledge/<domain>/from-nodes/<node-name>/YYYY-MM-DD-contribution.md
```

Never edit `from-nodes/` content — that's the node's contribution, not this repo's.

Hub-curated aggregations go directly in `knowledge/<domain>/`:
```
knowledge/regenerative-finance/2026-Q1-aggregation.md
```

### Updating MEMBERS.md

When a node joins, changes status, or leaves:
1. Update the table in `MEMBERS.md`
2. Update the node profile section
3. Update `federation.yaml` downstream list

### Adding a Funding Pool

1. Create `funding/<domain>/pool-config.yaml`
2. Add domain to `federation.yaml` `knowledge-commons.shared-domains`
3. Announce via council call and Telegram

### Updating Shared Skills

When improving a shared skill:
1. Edit `skills/<skill-name>/SKILL.md`
2. Bump the version in the frontmatter
3. The `distribute-skills.yml` action will push to nodes

---

## File Conventions

- Hub knowledge files: `knowledge/<domain>/YYYY-MM-DD-topic.md`
- Node contributions: `knowledge/<domain>/from-nodes/<node>/`
- Aggregations: `knowledge/<domain>/aggregated/`
- Meeting notes (council): `packages/operations/meetings/YYMMDD Council Sync.md`

---

## GitHub Actions

- `aggregate-knowledge.yml` — Runs weekly to aggregate node knowledge
- `distribute-skills.yml` — Runs when `skills/` changes, pushes to all nodes

---

## Integration Points

**Downstream nodes** (see `federation.yaml` and `MEMBERS.md`):
- ReFi BCN, Regenerant Catalunya, Local ReFi Toolkit, NYC Node, Bloom, GreenPill Network

**Tool integrations** — See [integrations/](integrations/) for profiles and specs. Declared in federation.yaml: koi-net, regen-toolkit, openclaw, funding platforms.

**Upstream**: [organizational-os](https://github.com/regen-coordination/organizational-os) (`packages/template`) — base conventions

**Cross-repo map**: [ECOSYSTEM-MAP.md](../ECOSYSTEM-MAP.md)

---

## Communication Channels

- **Discourse Forum:** [hub.regencoordination.xyz](https://hub.regencoordination.xyz) — API: `/latest.json`, `/c/regen-coordination/4.json`
- **Telegram:** RC Council (private, governance), RC Open (public, community)
- **Usage:** Use `knowledge-curator` skill to fetch forum posts, extract action items, and update `knowledge/network/` and `data/` registries. When OpenClaw is deployed on nodes, Telegram context flows via meeting notes and forum cross-posts.

---

## Network Directory

- **Location:** [knowledge/network/](knowledge/network/) and [data/](data/)
- **Purpose:** Cross-network aggregation layer — nodes, chapters, initiatives, events, programs, channels, funding, funds
- **Responsibility:** RC agents keep this current from forum posts, meeting notes, and partner announcements.

---

## Funding Opportunities

- **Registry:** [data/funding-opportunities.yaml](data/funding-opportunities.yaml)
- **Human view:** [knowledge/network/funding/](knowledge/network/funding/)
- **Usage:** `funding-scout` skill reads from this registry and updates it when new opportunities are announced on the forum or in council calls.

---

## Funds (On-Chain)

- **Registry:** [data/funds.yaml](data/funds.yaml)
- **Human view:** [knowledge/network/funds/](knowledge/network/funds/)
- **Distinction:** funding-opportunities = platforms/mechanisms; funds = actual deployed instances (Safe treasuries with addresses, Gardens pools, Octant/Artisan vaults). Agents can read treasury addresses for capital-flow operations and track pool balances.

---

## Communication

- **Telegram:** @regen_coordination (council channel)
- **GitHub:** PRs for adding nodes, modifying pool configs, updating skills
- **Weekly calls:** Every Friday — recorded and processed via meeting-processor
