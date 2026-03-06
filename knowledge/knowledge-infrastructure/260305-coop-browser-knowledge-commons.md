# Coop: Browser-Based Knowledge Commons

**Date:** 2026-03-05  
**Source:** Luiz x Afo Coffee meeting  
**Domain:** Knowledge Infrastructure  
**Status:** In development

---

## Summary

Coop is a browser-based knowledge commons for bioregional and local community coordination, launched under Regen Coordination. The strategy shifts from ontology-architecting to immediate experimentation: use AI agents and existing tooling to synthesize discussions for skill execution, get a demonstrable product out quickly, and iterate on design based on use-case validation.

---

## Architecture

- **Interface:** Chromium extension (primary) + PWA (mobile voice companion)
- **Storage:** Three layers — local node (IndexedDB), P2P shared membrane, Filecoin cold storage (Storacha)
- **Compute:** Anchor nodes (strong AI inference, API keys, external posting); standard nodes (information sourcing, light in-browser AI)
- **On-chain:** Coop registry with smart accounts (Pimlico) for agent permissions; integrates with Green Goods and Gardens

---

## Four Pillars

1. **Impact reporting** — Evidence synthesis, attestation drafts, Green Goods integration
2. **Coordination** — Meeting notes, action items, calendar synthesis
3. **Governance** — Proposal drafting, decision logging, Gardens proposals
4. **Capital formation** — Funding opportunity matching, application outlines

---

## Key Decisions

- Bioregional and local community hyperfocus; tab dumping + voice dictation as primary input
- At least one agent per Coop, hosted on anchor node
- Monorepo structure; organizational OS framework merged into Coop codebase
- Organizational OS repos transferred to Regen Coordination; kept separate for forking
- Telegram and Blue Sky removed from MVP scope
- Coop launched as business entity under Regen Coordination; equal co-op structure among founding council (Afolabi, Luiz, Antonio)
- Meeting notes from Coop creation call used as onboarding input

---

## Team and Timeline

- **Core team:** Afolabi (lead engineer), Luiz (architecture), Antonio (marketing)
- **Hackathon:** PL Genesis: Frontiers of Collaboration (Mar 2026)
- **Target:** First prototype by Monday post-meeting; spec finalized by end of week

---

## Relationship to Regen Coordination OS

- Coop is a **tool integration** — browser-facing capture layer for network nodes
- Complements OpenClaw (agent runtime); Coop captures, anchor processes
- Coop outputs can feed hub knowledge commons when Coops are network-affiliated
- ReFi BCN and other local nodes can adopt Coop as capture interface

---

## See Also

- [Coop integration profile](../../integrations/profiles/coop-integration.md)
- [Coop initiative](../../data/initiatives.yaml) (data/initiatives.yaml)
- [Coop component plans](../../../coop/docs/coop-component-plans.md) (03 Libraries/coop)
- Meeting notes: [[260305 Luiz X Afo Coffee]]
