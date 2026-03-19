---
categories: [Planning, Website, Data, Integrations]
projects:
  - "[[260101 Regen Coordination]]"
  - "[[250701 Regen Coordination]]"
date: 2026-03-11
status: "[IDEA: Develop]"
---

# RC Website + Initiatives Mapping Stub (merged 3+4)

## Purpose
Merged workstream for:
- Website v0 build
- Initiative mapping normalization + rendering

## Core references
- `03 Libraries/regen-coordination-os/docs/260309 Regen Coordination Website - Masterplan Dashboard.md`
- `03 Libraries/regen-coordination-os/federation.yaml`
- `03 Libraries/regen-coordination-os/data/nodes.yaml`
- `03 Libraries/regen-coordination-os/data/funds.yaml`
- `03 Libraries/regen-coordination-os/data/programs.yaml`
- `03 Libraries/regen-coordination-os/data/initiatives.yaml`

## v0 pages (must ship)
- Home
- Federation
- Nodes/Chapters
- Funds/Domains
- Activities & Bread
- Integrations Matrix

## Initiative map entities (first-class)
- Coop
- Green Goods
- Bloom
- Prosperity Pass
- ReFi Podcast
- Greenpill podcast

## Data normalization checklist
- [ ] Confirm canonical schema for initiatives
- [ ] Add missing entities (Prosperity Pass + podcasts)
- [ ] Add status/owner/source-link fields
- [ ] Generate website-facing snapshot JSON

## Rendering priorities
1. Trust/credibility first (clear status + evidence links)
2. Federation relationships second
3. Visual sophistication later

## Next work session checklist
- [ ] Finalize initiative schema extension
- [ ] Scaffold pages/routes in website base
- [ ] Render nodes/funds/domains from source files
- [ ] Add integration badges/status and source links
