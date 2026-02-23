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

**Tool integrations** (see `federation.yaml` integrations block):
- [opengrants-os](../opengrants-os/) — funding platform for network grants
- [koi-net-integration](../koi-net-integration/) — real-time knowledge sync across nodes

**Upstream**: [organizational-os-template](../organizational-os-template/) — base conventions

**Cross-repo map**: [ECOSYSTEM-MAP.md](../ECOSYSTEM-MAP.md)

---

## Communication

- **Telegram:** @regen_coordination (council channel)
- **GitHub:** PRs for adding nodes, modifying pool configs, updating skills
- **Weekly calls:** Every Friday — recorded and processed via meeting-processor
