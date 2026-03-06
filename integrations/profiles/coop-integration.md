# Coop Integration

## What it is

- Browser-based knowledge commons for bioregional and local community coordination.
- Chromium extension + PWA for low-friction capture (tab dumping, voice dictation).
- Three-layer storage: local node, P2P shared membrane, Filecoin cold storage.
- Anchor nodes for strong AI inference; at least one agent per Coop.
- On-chain Coop registry with smart accounts (Pimlico) for agentic wallets.
- Launched under Regen Coordination as a business entity (equal co-op structure).

## Why it matters for regen-coordination-os

- Provides an accessible interface for local nodes (ReFi BCN, NYC, etc.) to participate in knowledge commons without requiring repository or OpenClaw expertise.
- Complements OpenClaw: Coop is the browser-facing capture layer; OpenClaw runs on anchor nodes for processing.
- Enables experimentation-first approach: get demonstrable product out, iterate on design based on use-case validation.
- Integrates with Green Goods (impact attestation), Gardens (governance proposals), and organizational OS schemas.

## Integration modes

- **Content:** Coop artifacts (impact reports, meeting summaries, coordination outputs) can feed `knowledge/` domains when Coops are linked to network nodes.
- **Workflow:** Local node creates Coop → members capture tabs/voice → anchor processes via skills → approved artifacts to cold storage; optional sync to hub knowledge commons.
- **Technical:** Coop uses organizational-os schemas; federation.yaml declares coop as tool integration; nodes can adopt Coop as capture interface.

## Key decisions (from 260305 Luiz x Afo Coffee)

- Bioregional tool focus; tab input + voice dictation as primary UX.
- Four pillars: impact reporting, coordination, governance, capital formation.
- Anchor nodes handle strong AI; standard nodes do light in-browser AI.
- Monorepo structure; organizational OS framework merged into Coop codebase.
- Telegram and Blue Sky removed from MVP scope.
- On-chain registry with Pimlico smart accounts for agent permissions.
- Meeting notes from Coop creation call used as onboarding input.

## Suggested sync cadence

- **Continuous** — Coop members capture and process locally.
- **On approval** — Key artifacts promoted to cold storage (Storacha/Filecoin).
- **Optional** — Hub can aggregate Coop outputs into knowledge commons when Coops are network-affiliated.

## Risks/blockers

- Coop is in-development; first prototype target was Monday post-meeting.
- Product vs service presentation still needs clarification (good only vs good + onboarding calls).
- Extension build and anchor node deployment require setup.

## Next actions

1. Track Coop development in `knowledge/knowledge-infrastructure/`.
2. When Coop is stable, document node adoption path (create Coop, link to network).
3. Align Coop skill outputs with hub knowledge domain structure.
4. Consider Coop as capture interface for ReFi BCN and other local nodes.

## Source

- Meeting notes: [[260305 Luiz X Afo Coffee]]
- Coop repo: `03 Libraries/coop`
- Component plans: `03 Libraries/coop/docs/coop-component-plans.md`
