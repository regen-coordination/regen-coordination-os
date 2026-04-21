# AGGREGATOR-SCOPE.md — Regen Aggregator Project Definition

**Created:** 2026-03-27 23:51 UTC  
**Branch:** `feature/regen-aggregator`  
**Parallel Track:** `feature/website-build-260327` (Regen Coordination full site)

---

## 🌍 Regen Aggregator — Project Overview

**Mission:** Build a **lightweight, open-source aggregator** of regenerative finance initiatives, funding, and ecosystem data that *anyone* can fork, deploy, and customize for their own bioregion or community.

**Philosophy:**
- **Open by design** — source code public, data sources transparent
- **Decentralized deployment** — communities run their own instances
- **Plug-and-play** — minimal setup, maximum flexibility
- **Data-driven** — pulls from multiple sources, easy to extend
- **Use-value first** — stripped of institutional branding, focused on utility

**Target Users:**
- Local ReFi nodes wanting ecosystem visibility
- Bioregional aggregators tracking funding & initiatives
- Researchers analyzing regenerative networks
- Communities building local Web3 coordination infrastructure

---

## 🏗️ Regen Aggregator Architecture

### Four Core Pages

1. **Aggregator Home** — What's happening in *this* ecosystem?
   - Configurable title/branding (local node, bioregion, sector)
   - Quick stats (active initiatives, total funding, member count)
   - Latest updates feed (funding rounds, events, announcements)
   - "Get Started" CTA

2. **Initiative Browser** — Searchable, filterable catalog
   - Cards: name, stage, location, funding, impact area
   - Filters: geography, category, stage, funding status
   - Multi-source: pull from federation.yaml, Gitcoin, GitHub, CSV imports
   - Export options (JSON, CSV for analysis)

3. **Funding Pool Tracker** — What funding is available now?
   - Live funding rounds (Octant, Artizen, GG, etc.)
   - Application deadlines, amounts, eligibility
   - Historical data (previous rounds, payout amounts)
   - Community tips/guides per funding source

4. **Getting Involved** — How do I join?
   - "Add Your Initiative" workflow (GitHub PR or form)
   - "Find Peers" (filter by location/interest, connect)
   - Resource links (docs, tutorials, community channels)
   - Contributor guidelines (data quality, curation, moderation)

### What's NOT Included (vs. Regen Coordination)

| Feature | Regen Coord | Aggregator |
|---------|-------------|-----------|
| Governance processes | ✅ Detailed | ❌ Minimal |
| Council/leadership | ✅ Full roster | ❌ Omitted |
| Impact stories | ✅ Case studies | ❌ Links only |
| Knowledge domains | ✅ Rich library | ⚡ Curated links |
| Custom branding | ❌ Fixed | ✅ Configurable |
| Public code | ❌ Closed | ✅ Open-source |
| Deployment docs | ❌ Single instance | ✅ Fork & deploy |

---

## 💾 Data Layer

### Primary Sources
1. **federation.yaml** — Regen Coordination's authoritative network
2. **GitHub** — Pull from community repos (issues, discussions, projects)
3. **CSV/JSON imports** — Local communities add their own data
4. **Gitcoin API** — Live funding rounds, projects, donations
5. **Custom webhooks** — communities push updates (Discord bot, form submission)

### Data Schema (Standardized)
```yaml
initiative:
  id: unique-slug
  name: string
  stage: [ideation|pilot|active|archived]
  category: [node|program|product|partnership|working-group]
  location: {city, region, country, coordinates}
  website: url
  contact: {name, email, discord}
  funding: {total_raised, active_rounds, sources}
  impact_area: [agriculture|energy|governance|finance|infrastructure]
  last_updated: ISO-8601
```

### Aggregator Configuration
```yaml
# config.yml (instance-level customization)
instance:
  name: "Bay Area ReFi Aggregator"
  description: "Local initiatives in Northern California"
  region: {city: "San Francisco", country: "US"}
  color_scheme: "forest" # design theme
  
data_sources:
  - type: "federation"
    url: "https://raw.githubusercontent.com/regen-coordination/..."
    filter: {region: "bay-area"} # optional
  
  - type: "github"
    repos:
      - "refi-bay-area/initiatives"
      - "greenpill-sf/projects"
  
  - type: "csv"
    url: "https://docs.google.com/spreadsheets/.../export?format=csv"
    auto_refresh: true
    interval_hours: 24
  
  - type: "gitcoin"
    enabled: true
    pull_active_rounds: true

features:
  show_governance: false # omit council/process docs
  show_impact_stories: true
  allow_contributions: true # "add initiative" workflow
  enable_search: true
  enable_filters: true
```

---

## 🛠️ Tech Stack

**Same as Regen Coordination v1, optimized for simplicity:**

- **Frontend:** HTML/CSS/JS (vanilla, no framework dependencies)
- **Data processing:** Node.js scripts (data-fetch, transform, validate)
- **Deployment:** Static site generation → Git → hosting (GitHub Pages, Vercel, self-hosted)
- **Search/filter:** Client-side (lightweight, no backend needed)
- **Customization:** YAML config + optional CSS overrides

**Why minimal:** Easy to fork, understand, and modify. No vendor lock-in.

---

## 📊 Scope: Phase 1 (8 Weeks)

### Week 1-2: Foundation & Scope
- [ ] **Define config system** — YAML structure, validation
- [ ] **Design data schema** — initiatives, funding, metadata
- [ ] **Plan data sources** — federation.yaml, GitHub, CSV, Gitcoin API
- [ ] **Sketch information architecture** — 4 pages, user flows
- [ ] **Create wireframes** — desktop + mobile

### Week 3-4: Data Pipeline & Backend
- [ ] **Build data-fetch service** — pull from multiple sources
- [ ] **Data transformation** — normalize schemas, geocode locations
- [ ] **Aggregation logic** — dedupe, merge, validate, handle conflicts
- [ ] **Local dev environment** — test data, sample instances
- [ ] **Configuration system** — YAML parsing, theme/region customization

### Week 5-6: Frontend & UX
- [ ] **Homepage** — quick stats, latest updates, CTA
- [ ] **Initiative browser** — cards, search, filters, export
- [ ] **Funding tracker** — round listing, deadline alerts
- [ ] **Getting involved** — contribution workflows, resources
- [ ] **Responsive design** — mobile-first, accessibility (a11y)

### Week 7-8: Deployment & Launch
- [ ] **Deployment pipeline** — GitHub Actions, auto-build/deploy
- [ ] **Documentation** — fork guide, config guide, data schema docs
- [ ] **Example instances** — 2-3 demo regions (Bay Area, Mediterranean, Africa)
- [ ] **Community guidelines** — how to contribute, data quality standards
- [ ] **Public launch** — open-source release, announce

---

## 🎯 Success Criteria

**By end of Phase 1:**
- ✅ Anyone can fork repo + update `config.yml` → have working aggregator in 15 min
- ✅ Aggregator pulls live data from 3+ sources (federation, GitHub, Gitcoin)
- ✅ Search + filters work client-side (no backend required)
- ✅ 2-3 example instances deployed (demonstrate forkability)
- ✅ All code public on GitHub with MIT or Apache 2.0 license
- ✅ <2 second page load, mobile responsive, a11y compliant

---

## 🔄 Relationship to Regen Coordination

**Regen Coordination Website** (feature/website-build-260327)
- Institutional hub for Regen Coordination as a *network*
- Showcase governance, impact stories, council, knowledge library
- Brand identity: Regen Coordination's voice + three-layer architecture
- Deployment: Single instance at regencoordination.xyz (or similar)
- Audience: External visitors, funders, prospective members

**Regen Aggregator** (feature/regen-aggregator)
- Open-source tool that Regen Coordination can deploy internally
- Forkable by any community/region/sector
- Brand identity: Minimal, customizable, transparent
- Deployment: Distributed (many instances, community-controlled)
- Audience: Builders, researchers, communities wanting aggregation

**Synergy:**
- Regen Coordination uses Aggregator internally (feeds its initiative list, funding tracker)
- Aggregator references Regen Coordination as upstream data source
- Shared data schema + standards reduce friction
- Regen Coordination can be first "canonical" instance of Aggregator

---

## 📝 Decisions Needed

### Regen Aggregator-Specific
1. **License** — MIT (simpler) or Apache 2.0 (tighter IP protection)?
2. **Hosting recommendation** — GitHub Pages (free), Vercel (free tier), or self-hosted docs?
3. **Data refresh cadence** — On-demand, daily, or weekly?
4. **Search backend** — Client-side only, or optional backend (for advanced queries)?
5. **Contribution workflow** — GitHub PR only, web form, or both?

### Shared with Regen Coordination
1. **Domain** — regencoordination.io/.org? (main) + aggregator.regencoordination.xyz? (sub)
2. **Design tokens** — bioregional dark theme applies to both
3. **Deployment pipeline** — GitHub Actions + same hosting provider?

---

## 📂 Repo Structure

```
regen-coordination-os/
├── feature/website-build-260327/          # Regen Coordination main site
│   ├── WEBSITE-PLAN.md
│   ├── src/
│   ├── docs/
│   └── ...
│
├── feature/regen-aggregator/              # NEW: Aggregator fork
│   ├── AGGREGATOR-SCOPE.md                # ← THIS FILE
│   ├── AGGREGATOR-PLAN.md                 # (to be created)
│   ├── config.example.yml
│   ├── src/
│   │   ├── data-fetch/
│   │   ├── transform/
│   │   └── frontend/
│   ├── examples/
│   │   ├── bay-area/config.yml
│   │   ├── mediterranean/config.yml
│   │   └── africa/config.yml
│   ├── docs/
│   │   ├── FORK-GUIDE.md
│   │   ├── CONFIG-REFERENCE.md
│   │   ├── DATA-SCHEMA.md
│   │   └── CONTRIBUTE.md
│   └── README.md (prominent fork button, quick-start)
```

---

## 🚀 Next Steps

1. **Confirm Aggregator strategy** — is this the right split?
2. **Prioritize open questions** — which decisions block progress?
3. **Create AGGREGATOR-PLAN.md** — detailed technical spec + task breakdown
4. **Set up dual-track coordination** — how to manage both branches?

---

_Scope document initialized_  
_Branch: feature/regen-aggregator_  
_Ready for scoping discussion_
