# OpenClaw Integration

## What it is

- Primary agent runtime for Organizational OS workspaces.
- Runs skills (meeting-processor, funding-scout, knowledge-curator) and responds to operator requests via Telegram, Google Meet, GitHub.

## Why it matters for regen-coordination-os

- Enables nodes to process meetings, scout funding, and curate knowledge without manual workflows.
- Deployed on ReFi BCN (DePIN) and NYC Node (VPS); primary runtime for the network.

## Integration modes

- **Content:** agent outputs feed knowledge/, memory/, HEARTBEAT.md.
- **Workflow:** council calls → transcript → meeting-processor → curated knowledge → sync to hub.
- **Technical:** federation.yaml declares agent.runtime openclaw; nodes install and configure per PILOT-DEPLOYMENT.

## Suggested sync cadence

- **Continuous** — agent runs on operator requests and scheduled heartbeat.
- **Weekly** — council call processing and knowledge sync.

## Risks/blockers

- Google Meet integration requires Granola or manual transcript paste.
- Hub sync requires GitHub PAT with push access.
- Safe API is read-only; transactions require Safe UI for signing.

## Next actions

1. Document validation checklist for new node OpenClaw deployment.
2. Align skill versions across nodes via distribute-skills workflow.
3. Add KOI event emission from agent-curated outputs when KOI is ready.
