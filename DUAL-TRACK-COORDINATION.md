# DUAL-TRACK-COORDINATION.md — Managing Two Website Projects

**Created:** 2026-03-28 00:08 UTC  
**Repo:** `/root/Zettelkasten/03 Libraries/regen-coordination-os`

---

## 🎯 Two Parallel Initiatives

### Track 1: Regen Coordination Website (feature/website-build-260327)

**What:** Institutional hub for Regen Coordination network  
**Audience:** Visitors, funders, prospective members, councils  
**Branding:** Full Regen Coordination identity + philosophy  
**Scope:** 8 pages (Homepage, About, Initiatives, Network, Knowledge, Join, Impact, Governance)  
**Deployment:** Single instance (regencoordination.xyz)  
**Status:** ✅ Design spec complete (WEBSITE-PLAN.md), ready for Phase 1

**Focus Areas:**
- Governance visibility (Council, decision-making)
- Impact stories (funded projects, case studies)
- Knowledge library (ReFi, governance, infrastructure domains)
- Cultural narrative (Coordi-nation concept, three-layer architecture)

---

### Track 2: Regen Aggregator (feature/regen-aggregator)

**What:** Lightweight, open-source aggregator tool  
**Audience:** Communities, researchers, local nodes  
**Branding:** Minimal, customizable (YAML-driven)  
**Scope:** 4 pages (Home, Initiative Browser, Funding Tracker, Getting Involved)  
**Deployment:** Distributed (fork & deploy instances)  
**Status:** 🟡 Scope defined (AGGREGATOR-SCOPE.md), planning phase

**Focus Areas:**
- Data aggregation (multiple sources: federation.yaml, GitHub, Gitcoin, CSV)
- Forkability (fork-deploy in 15 minutes)
- Transparency (open-source, standards-based)
- Extensibility (config-driven customization)

---

## 📊 Project Comparison

| Aspect | Regen Coordination | Regen Aggregator |
|--------|-------------------|------------------|
| **Purpose** | Network hub | Community tool |
| **Audience** | External + internal | Builders + communities |
| **Branding** | Full identity | Minimal/customizable |
| **Governance** | Detailed | Omitted |
| **Pages** | 8 | 4 |
| **Data sources** | Internal (federation) | Multi-source (API aggregation) |
| **Deployment** | Single instance | Many instances (forkable) |
| **Code visibility** | May be closed | Public open-source |
| **Timeline** | 8 weeks | 8 weeks (parallel) |
| **Effort** | ~40-50% dev | ~40-50% dev |

---

## 🔄 Synergy & Separation

### How They Support Each Other

1. **Data Schema Alignment** — Both use same initiative/funding schema
   - Shared YAML structure reduces friction
   - Aggregator's multi-source approach informs Regen Coord's data model

2. **Regen Coordination Uses Aggregator Internally**
   - Regen Coord website can embed Aggregator instance
   - Pulls live funding data, initiative listings
   - Demonstrates Aggregator utility to external communities

3. **Aggregator References Regen Coordination**
   - Uses federation.yaml as canonical data source
   - Links to Regen Coord for governance/context
   - Positions Regen Coordination as upstream authority

### Clean Separation

1. **Independent Branches** — feature/website-build-260327 and feature/regen-aggregator
   - Can work in parallel without blocking
   - Merge independently to main when ready

2. **Distinct Codebases**
   - Regen Coordination: monolithic, opinionated
   - Aggregator: modular, forkable, extensible

3. **Different Deployment Targets**
   - Regen Coordination: regencoordination.xyz
   - Aggregator: aggregator.regencoordination.xyz (+ community instances)

---

## 🗓️ Parallel Timeline (8 Weeks)

### Weeks 1-2: Definition & Design

**Regen Coordination**
- [ ] Answer open questions (domain, platforms, newsletter, analytics)
- [ ] Design tokens (colors, typography, spacing)
- [ ] Wire Homepage + About pages
- [ ] Set up main deployment pipeline

**Regen Aggregator**
- [ ] Finalize data schema (initiatives, funding, metadata)
- [ ] Define config system (YAML structure, validation rules)
- [ ] Design 4-page information architecture
- [ ] Create wireframes (desktop + mobile)

**Shared Decision Points:**
- Domain strategy (regencoordination.io/.org vs subdomains)
- Design theme alignment (bioregional dark applies to both)
- Hosting provider (GitHub Pages vs Vercel vs self-hosted)

---

### Weeks 3-4: Data & Infrastructure

**Regen Coordination**
- [ ] Populate Knowledge domains (ReFi, governance, infrastructure)
- [ ] Build Node map (query federation.yaml, render interactive UI)
- [ ] Create Funding pools tracker (Octant, Artizen, Impact Stake)
- [ ] Set up Quartz docs site

**Regen Aggregator**
- [ ] Build data-fetch service (federation, GitHub, CSV, Gitcoin API)
- [ ] Data transformation layer (normalize schemas, geocode)
- [ ] Aggregation logic (dedupe, merge, validate, conflict resolution)
- [ ] Local dev environment + sample data

**Shared Dependencies:**
- federation.yaml structure (both depend on this)
- Data schema standards (coordinate format)
- Hosting infrastructure (same provider?)

---

### Weeks 5-6: Frontend & UX

**Regen Coordination**
- [ ] Initiatives page (8 active initiatives listed)
- [ ] Network page (node map, ecosystem visualization)
- [ ] Join page (contributor pathways, onboarding flows)
- [ ] Impact page (metrics, case studies, funded projects)

**Regen Aggregator**
- [ ] Initiative Browser (cards, search, filters, export)
- [ ] Funding Tracker (live rounds, deadlines, historical data)
- [ ] Getting Involved page (contribution workflows, resources)
- [ ] Homepage (configurable, multi-instance support)

**Shared Work:**
- Design components (buttons, cards, filters)
- Responsive design patterns
- Accessibility standards (WCAG 2.1)

---

### Weeks 7-8: Polish & Launch

**Regen Coordination**
- [ ] Content review & copywriting
- [ ] Mobile responsiveness audit
- [ ] Performance optimization (<3s load)
- [ ] SEO & accessibility final pass
- [ ] Public launch + announce to community

**Regen Aggregator**
- [ ] Documentation (fork guide, config reference, data schema)
- [ ] Example instances (2-3 regions: Bay Area, Mediterranean, Africa)
- [ ] Deployment pipeline (GitHub Actions, auto-build)
- [ ] Community guidelines (contribution standards, data quality)
- [ ] Open-source release (public GitHub, MIT/Apache 2.0 license)

**Shared Launch Activities:**
- Coordinated announcement (both sites ship same week)
- Cross-linking (Regen Coord features Aggregator)
- Community feedback loop (gather suggestions from first users)

---

## 👥 Roles & Coordination

### Agent Responsibilities

**Track 1 Lead (Regen Coordination Website)**
- Owns feature/website-build-260327
- Coordinates with Council on governance/story content
- Manages integration with hub.regencoordination.xyz
- Timeline: 8 weeks → regencoordination.xyz launch

**Track 2 Lead (Regen Aggregator)**
- Owns feature/regen-aggregator
- Manages data schema, API integrations, config system
- Creates example instances for communities
- Timeline: 8 weeks → open-source release + demo instances

**Shared Coordination Role**
- Resolves data schema conflicts
- Manages domain/hosting decisions
- Ensures both projects align on design tokens + standards
- Facilitates weekly sync between tracks

### Decision Escalation

**Track-specific decisions:** Lead decides + documents  
**Shared decisions:** Both leads + human input  
**Blocking issues:** Escalate immediately with context

---

## 📋 Open Questions

### For Both Tracks
1. **Domain strategy** — single domain with subpaths/subdomains?
2. **Hosting** — GitHub Pages (free), Vercel (free tier), or self-hosted?
3. **Design theme** — confirm bioregional dark palette for both?
4. **Analytics** — Plausible for both, or different approaches?

### Regen Coordination Specific
1. **Newsletter platform** — Substack, Buttondown, or Ghost?
2. **Treasury transparency** — what level of detail?
3. **Quartz fork** — modify existing template or fresh build?
4. **Council profiles** — full bios, short descriptions, or links only?

### Regen Aggregator Specific
1. **License** — MIT (simpler) or Apache 2.0 (IP protection)?
2. **Data refresh cadence** — on-demand, daily, or weekly?
3. **Search backend** — client-side only, or optional backend option?
4. **Contribution workflow** — GitHub PR, web form, or both?
5. **First three example instances** — which regions/communities?

---

## 🎯 Success Criteria

### By End of Phase 1 (Week 8)

**Regen Coordination Website**
- ✅ 8-page site publicly accessible
- ✅ Live node map, initiative listing, funding tracker
- ✅ Council profiles + governance documentation
- ✅ 10+ impact stories/case studies
- ✅ <3s load time, mobile responsive, a11y compliant
- ✅ Integrated with hub.regencoordination.xyz

**Regen Aggregator**
- ✅ Open-source on GitHub (MIT or Apache 2.0)
- ✅ Anyone can fork + deploy in 15 minutes
- ✅ Pulls live data from 3+ sources (federation, GitHub, Gitcoin)
- ✅ 2-3 example instances live (Bay Area, Mediterranean, Africa)
- ✅ Full documentation (fork guide, config reference, data schema)
- ✅ <2s page load, mobile responsive, a11y compliant

**Shared Outcomes**
- ✅ Data schema standardized + documented
- ✅ Both sites use same design tokens + theme
- ✅ Both deployed on same infrastructure (or documented alternatives)
- ✅ Community feedback integrated
- ✅ Clear ownership + maintenance plan for post-launch

---

## 📂 File Structure

```
regen-coordination-os/
│
├── CONTAINER_POIESIS_260327.md           # Main session container
├── DUAL-TRACK-COORDINATION.md            # ← THIS FILE
├── AGGREGATOR-SCOPE.md                   # Aggregator project definition
│
├── feature/website-build-260327/
│   ├── WEBSITE-PLAN.md
│   ├── WEBSITE-SPEC.md                   # (to create)
│   ├── src/
│   ├── docs/
│   └── assets/
│
├── feature/regen-aggregator/
│   ├── AGGREGATOR-SCOPE.md
│   ├── AGGREGATOR-PLAN.md                # (to create)
│   ├── config.example.yml
│   ├── src/
│   │   ├── data-fetch/
│   │   ├── transform/
│   │   └── frontend/
│   ├── examples/
│   │   ├── bay-area/
│   │   ├── mediterranean/
│   │   └── africa/
│   ├── docs/
│   └── README.md
│
└── shared/
    ├── DATA-SCHEMA.md                    # Shared initiative/funding schema
    ├── DESIGN-TOKENS.md                  # Shared colors, typography
    └── DEPLOYMENT-GUIDE.md               # Shared infrastructure docs
```

---

## 🚀 Next Steps

1. **Review & confirm project split** — is this the right division?
2. **Prioritize open questions** — what blocks progress?
3. **Create detailed specs** — WEBSITE-SPEC.md + AGGREGATOR-PLAN.md
4. **Assign roles** — who leads each track?
5. **Set up coordination cadence** — weekly syncs? async updates?

---

_Dual-track coordination framework_  
_Two branches ready for parallel development_  
_Standing by for human direction on priorities & decisions_
