# Telegram Integration

## What it is

- Two Telegram groups for Regen Coordination:
  - **RC Council** — private; governance discussions, action items.
  - **RC Open** — public; community engagement, partner announcements.

## Why it matters for regen-coordination-os

- Primary internal channels for council coordination and community communication.
- Context source for knowledge-curator when OpenClaw is deployed with Telegram gateway.
- Complements Discourse forum (async, long-form) with real-time chat.

## Integration modes

- **Passive read:** Monitor council channel for action items, decisions; open channel for announcements.
- **Active messaging:** Node coordination, announcements (via OpenClaw when deployed).

## Runtime

- OpenClaw has native Telegram gateway; when deployed on a node, agents can read and send messages.
- Hub does not run an agent by default; Telegram context flows from node agents to hub via meeting notes and forum cross-posts.

## Used by

- OpenClaw runtime when deployed on nodes (ReFi BCN DePIN, NYC VPS).
- `skills/knowledge-curator/SKILL.md` — references Telegram as context source; actual read requires OpenClaw + Telegram gateway.

## Configuration

- Declared in `federation.yaml` under `channels.telegram`.
- No public API; access requires bot token and group membership.

## Risks/blockers

- Telegram API requires bot setup and group admin approval.
- Private council channel: access restricted to council members.

## Next actions

1. Document bot setup for nodes running OpenClaw.
2. Define which messages from council channel should be summarized into meeting notes.
