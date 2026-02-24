# Discourse Forum Integration

## What it is

- Discourse forum at `https://hub.regencoordination.xyz` — the Regen Coordination Hub.
- Public REST API for reading topics, categories, and latest posts.
- Categories: Regen Coordination (4), Greenpill (20), ReFi DAO (21), Regen Commons (33).

## Why it matters for regen-coordination-os

- Primary community forum for proposals, announcements, and cross-network discussions.
- Source for new node/chapter announcements, funding opportunities, and initiative updates.
- Enables agents to track and analyze past and current posts for context consolidation.

## API Endpoints

- **Latest:** `https://hub.regencoordination.xyz/latest.json`
- **Category:** `https://hub.regencoordination.xyz/c/{slug}/{id}.json` (e.g., `/c/regen-coordination/4.json`)
- **Topic:** `https://hub.regencoordination.xyz/t/{id}.json`

## Integration modes

- **Read (passive monitoring):** Fetch latest topics and replies; summarize new content since last check.
- **Analyze:** Extract action items, proposals, funding opportunities, new node announcements; update `knowledge/network/` and `data/` registries.

## Suggested sync cadence

- **On-demand:** When user requests forum summary or network update.
- **Weekly:** After council call; check for new topics.
- **Event-driven:** After major announcements (Artisan season, new round, merger).

## Used by

- `skills/knowledge-curator/SKILL.md` — primary consumer; fetches, parses, updates registries.

## Risks/blockers

- API rate limits (if any); respect caching for frequent checks.
- Private categories not accessible via public API.

## Next actions

1. Document any API authentication requirements (if added).
2. Add GitHub Action for weekly forum digest (optional).
