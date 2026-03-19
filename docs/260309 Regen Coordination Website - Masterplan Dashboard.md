---
categories: [Planning, Dashboard, Website]
projects:
  - "[[260101 Regen Coordination]]"
  - "[[250701 Regen Coordination]]"
date: 2026-03-09
status: "[IDEA: Develop]"
---

# Regen Coordination Website — Masterplan Dashboard

## Executive Snapshot

Goal: launch a simple public website in `regen-coordination-os` that aggregates **nodes/chapters**, **funds**, **domains**, **federation structure**, and **weekly coordination activity** while staying interoperable with Green Goods / Coop / Bloom / Karma / Common Approach.

Current state:
- ✅ Strong data foundation already exists in `regen-coordination-os` (`federation.yaml`, `data/*.yaml`, `funding/*/pool-config.yaml`, `MEMBERS.md`).
- ✅ Strategic intent already documented in RC notes (website + toolkit + canvas stack).
- ⚠️ No web runtime scaffold exists yet at root of `regen-coordination-os`.
- ⚠️ No container/dev-collab setup exists yet (no Docker/compose/devcontainer currently present).

---

## Priority Workstreams

### WS1 — Website foundation (using ReFi-DAO-Website as base pattern)
- [ ] Choose implementation path:
  - Option A: Quartz-first content site (fastest to ship)
  - Option B: hybrid static + data dashboard (better for YAML federation rendering)
- [ ] Create `website/` (or `site/`) scaffold inside `regen-coordination-os`
- [ ] Define page IA v0:
  - Home
  - Federation map
  - Nodes/Chapters
  - Funds & Domains
  - Activities Reports
  - Bread Coop docs
  - Integrations
- [ ] Reuse ReFi-DAO-Website patterns for:
  - local nodes visualization concept
  - section layout and navigation

### WS2 — Federation/data aggregation layer
- [ ] Build data adapters from:
  - `federation.yaml`
  - `data/nodes.yaml`
  - `data/funds.yaml`
  - `data/programs.yaml`
  - `data/initiatives.yaml`
  - `data/channels.yaml`
- [ ] Normalize to one website-facing schema (`networkSnapshot.json`)
- [ ] Add weekly auto-refresh plan (GitHub Action or manual script)

### WS3 — Activities + Bread visibility
- [ ] Add content source list for website display:
  - `260101 Regen Coordination/Regen Coordination - Karma Activities Report.md`
  - `260101 RC <> Bread Coop/Regen Coordination - Bread Coop Executive Summary.md`
  - current week activity notes (`260309 Semana 09.03 – 15.03.md` + weekly RC updates)
- [ ] Define “This Week in Regen Coordination” section template
- [ ] Add “Bread Coop coordination” section with concise funding/accountability narrative

### WS4 — Artizen scoping + activation tasks
- [ ] Research + publish internal explainer: “How Artizen works for RC”
- [ ] Decide what to open first on Artizen:
  - fund, project, or artifact-first approach
- [ ] Prepare application pack:
  - project description
  - domain framing (theme-based, e.g. regen farming & tech)
  - activity evidence links
- [ ] Add website section for Artizen status:
  - active season
  - pools targeted
  - artifacts published

### WS5 — Collaboration containers for forum/articles flow
- [ ] Decide container strategy:
  - devcontainer + VS Code
  - docker-compose for local content preview + tooling
- [ ] Create minimum `docker-compose.yml` for:
  - web preview service
  - optional content processor service
- [ ] Add contributor workflow for forum posts/articles:
  - draft intake
  - review
  - publish

### WS6 — Integration guarantees (must-have)
- [ ] Green Goods integration profile surfaced on website + status badge
- [ ] Coop integration surfaced (product-node + capability scope)
- [ ] Bloom interoperability surfaced (reporting/API mapping intent)
- [ ] Karma Gap linkage surfaced for impact accounting
- [ ] Common Approach / CIDS alignment surfaced in impact methodology page
- [ ] Create one integration matrix page (system x purpose x status x owner)

---

## Immediate Task Board (Now → Next 7 days)

## P0 (next 48h)
- [ ] Finalize website architecture decision (WS1)
- [ ] Generate website data schema draft from existing YAML (WS2)
- [ ] Publish Artizen scoping memo + open-item checklist (WS4)
- [ ] Lock RC call for decision-making (Friday regular time; fallback Thu 14:00 CET)

## P1 (this week)
- [ ] Create initial website scaffold and navigation
- [ ] Implement federation + nodes + funds pages with real data
- [ ] Add activities + bread doc sections and first content pull
- [ ] Draft integration matrix (Green Goods / Coop / Bloom / Karma / Common Approach)
- [ ] Define containerized collaboration setup and create first config

## P2 (next 2 weeks)
- [ ] Launch v0 internal preview
- [ ] Publish first forum/article collaboration workflow
- [ ] Open first Artizen entity (based on call decision)
- [ ] Add weekly update automation for “This Week in RC”

---

## Open Decisions Required

1. **Website stack choice** (Quartz-first vs hybrid dashboard)
2. **Artizen entry strategy** (fund-first vs project/artifact-first)
3. **Public map source** (Region Atlas embed vs native RC rendering first)
4. **Container scope** (just web preview vs full collab toolchain)
5. **Impact page framing** (Karma + Common Approach + Bloom interoperability depth)

---

## Definition of Done (v0)

- Public RC website in `regen-coordination-os` showing:
  - federation structure
  - nodes/chapters
  - funds/domains
  - integrations status
  - weekly activities + bread docs
- Artizen scope documented + first action initiated
- Basic containerized collaboration environment running
- Integration matrix published and aligned with RC language

---

## Notes from latest discussion context (for continuity)

- Theme-based fund framing is currently preferred over strict domain-path-only framing.
- Green Goods should be framed as funding + governance + reputation (not just impact).
- Bloom interoperability hinges on common impact measurement + API field matching.
- Friday call window is preferred for alignment and decision closure.
