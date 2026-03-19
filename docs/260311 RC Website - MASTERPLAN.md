---
categories: [Planning, Website, Masterplan]
projects:
  - "[[260101 Regen Coordination]]"
  - "[[250701 Regen Coordination]]"
date: 2026-03-11
status: "[IDEA: Develop → Execute]"
---

# Regen Coordination Website — MASTERPLAN

**Version:** 0.1  
**Date:** March 11, 2026  
**Status:** Draft for Review  
**Location:** `03 Libraries/regen-coordination-os/docs/`

---

## Executive Summary

This masterplan outlines the development of a **hybrid-light website** for Regen Coordination that aggregates and makes visible the key aspects of our network: nodes/chapters, funds, domains, and initiatives. The website serves as both a **public credibility surface** and a **coordination entry point** for the regenerative finance ecosystem.

**Core Philosophy:**
- **Lightweight by design** — static-first, minimal infrastructure, maximum portability
- **Data-driven** — content rendered from canonical YAML sources (`federation.yaml`, `data/*.yaml`)
- **Mapping-first** — visualize network topology, not just list entities
- **Integration-aware** — surface connections to Green Goods, Bloom, Coop, Karma, Common Approach

---

## 1. Strategic Context

### 1.1 Why This Website Now

From recent council discussions (Feb 6-13, 2026):
- **Coordination visibility gap:** "People don't see the network we're building"
- **Credibility for funding:** Artizen, Octant Vaults, Impact Stake all need public proof surfaces
- **Network entanglement:** Need to show ReFi DAO ↔ Greenpill ↔ Bloom ↔ Regen Coordination relationships
- **Regional Atlas integration:** Council agreed to explore Region Atlas for visualization before building custom

### 1.2 Success Criteria

| Criterion | Metric |
|-----------|--------|
| **Credibility** | External funders can verify RC's network, activities, and partners in <2 minutes |
| **Discovery** | New nodes can understand federation structure and join pathway |
| **Transparency** | All funding pools, nodes, and governance decisions are publicly documented |
| **Integration** | Clear status badges for Coop, Green Goods, Bloom, Karma, Common Approach |

---

## 2. Information Architecture

### 2.1 Page Structure (v0)

```
/
├── Home                    # Mission + network stats + entry points
├── Federation              # Hub manifest, governance, upstream/downstream
├── Nodes                   # Local nodes, chapters, program nodes (interactive map/list)
├── Funds & Domains         # Funding pools, programs, opportunities
├── Initiatives             # Cross-network programs (Green Goods, Bloom, etc.)
├── Activities              # 2025 activities, Bread Coop, 2026 vision
├── Integrations            # Matrix of tools, partners, interoperability status
└── Join                    # Onboarding pathway for new nodes
```

### 2.2 Data Sources (Canonical)

All pages render from these source files (single source of truth):

| Source File | Purpose | Target Pages |
|-------------|---------|--------------|
| `federation.yaml` | Hub identity, network structure, governance | Federation, Home |
| `data/nodes.yaml` | Cross-network node registry | Nodes |
| `data/funds.yaml` | On-chain fund instances | Funds & Domains |
| `data/programs.yaml` | Active funding/coordination programs | Funds & Domains |
| `data/initiatives.yaml` | Cross-network initiatives | Initiatives |
| `data/channels.yaml` | Communication channels | Footer, Join |
| `data/funding-opportunities.yaml` | Available funding | Funds & Domains |
| `MEMBERS.md` | Human-readable member directory | Nodes (supplemental) |

### 2.3 Derived Data (Build-time)

```
scripts/build-network-snapshot.js → site/data/networkSnapshot.json
├── federation (from federation.yaml)
├── nodes (from data/nodes.yaml)
├── funds (from data/funds.yaml)
├── programs (from data/programs.yaml)
├── initiatives (from data/initiatives.yaml)
├── stats (computed: node count, fund totals, etc.)
└── lastUpdated (timestamp)
```

---

## 3. Design System

### 3.1 Visual Identity (from IDENTITY.md + SOUL.md)

**Core Values to Express:**
- Bioregional autonomy (decentralized, not corporate)
- Open knowledge (transparent, legible)
- Regenerative capital (living systems, not extractive)
- Federated commons (connected but independent)

**Tone:**
- Direct and grounded (no crypto-hype)
- Technical where needed, human-first always
- Multilingual ready (EN primary; ES, PT, CA for local nodes)

### 3.2 Color Palette (Adapted from ReFi-DAO-Website)

```css
/* Regen Coordination Design Tokens */
:root {
  /* Background */
  --color-bg: #172027;           /* Deep slate */
  --color-bg-deep: #11181d;
  --color-bg-surface: rgba(255, 255, 255, 0.03);
  
  /* Text */
  --color-text: #F1F0FF;
  --color-text-muted: rgba(241, 240, 255, 0.6);
  
  /* Accents - Regen Coordination specific */
  --color-blue: #4571E1;         /* Primary action */
  --color-green: #71E3BA;        /* Regenerative / success */
  --color-teal: #2DD4BF;         /* RC brand accent */
  
  /* Network colors (for visual differentiation) */
  --color-refi-dao: #4571E1;
  --color-greenpill: #71E3BA;
  --color-bloom: #DE9AE9;
  --color-regen-coord: #2DD4BF;
}
```

### 3.3 Typography

- **Headings:** Space Grotesk (same as ReFi DAO for continuity)
- **Body:** Inter
- **Monospace (data):** JetBrains Mono (for fund addresses, technical data)

---

## 4. Page Specifications

### 4.1 Home

**Purpose:** Immediate credibility + network overview

**Sections:**
1. **Hero:** "Coordination Infrastructure for Regenerative Finance" + animated ring visual (adapted from ReFi DAO)
2. **Network Stats:** Live counts from snapshot (nodes, funds raised, countries, partners)
3. **Federation Preview:** Hub + 3-4 key downstream nodes with status
4. **Active Programs:** Cards for Regenerant Catalunya, Local ReFi Toolkit, Coop
5. **Latest Activities:** Pull from Activities page (2025 highlights)
6. **CTA:** "Join the Network" / "Explore the Federation"

**Data Source:** `networkSnapshot.json`

---

### 4.2 Federation

**Purpose:** Explain the hub model and governance

**Sections:**
1. **What is Regen Coordination:** Hub identity from `federation.yaml`
2. **Network Topology:** Visual diagram showing:
   - Upstream: organizational-os template/framework
   - Hub: Regen Coordination OS
   - Downstream: All member nodes (color-coded by network affiliation)
3. **Governance:** Council structure, decision model, meeting cadence
4. **Knowledge Commons:** Shared domains (regenerative-finance, local-governance, etc.)
5. **Integration Ecosystem:** Tool stack (OpenClaw, koi-net, Gardens, etc.)

**Data Source:** `federation.yaml` primarily

---

### 4.3 Nodes

**Purpose:** Discover and navigate the network of local nodes

**Features:**
- **Map View:** Interactive visualization (Region Atlas embed OR custom D3/SVG)
  - Color pins by network: ReFi DAO (blue), Greenpill (green), Bloom (pink), RC (teal)
  - Status indicators: 🟢 Active, 🟡 Bootstrapping, 👀 Observer
- **List View:** Filterable, sortable table
  - Filters: Network, Status, Type (local-node/chapter/program/product)
  - Columns: Name, Location, Network, Status, Links
- **Node Detail Modal:** 
  - Description, focus areas
  - Contact/telegram
  - GitHub repo
  - Active programs
  - Skills/tools used

**Data Source:** `data/nodes.yaml` + `MEMBERS.md`

**Key Requirement from Council:**
> "Use Region Atlas first before building anything new — they already have data for Greenpill chapters and ReFi DAO nodes" (Feb 6 sync)

**Approach:**
- Phase 1: Embed Region Atlas with RC-specific styling
- Phase 2: Build custom map if gaps exist (Prosperity Pass, podcasts not in Atlas)

---

### 4.4 Funds & Domains

**Purpose:** Transparent view of funding infrastructure

**Sections:**
1. **Active Funding Pools:**
   - Octant Vaults (planned/pilot)
   - Impact Stake (active)
   - Gardens Pools (active)
   - Safe Treasuries (active/planned)
2. **Funding Programs:**
   - Artisan Season 6
   - Gitcoin GG rounds
   - Domain-based pools (regenerative-finance, waste-management, etc.)
3. **Funding Opportunities:**
   - Open opportunities from `funding-opportunities.yaml`
   - Status: active, pipeline, research
4. **Capital Flows Visualization:** Simple diagram showing:
   - Inflows (Bread Coop, Octant, Impact Stake, grants)
   - Outflows (node funding, program support)

**Data Source:** `data/funds.yaml`, `data/programs.yaml`, `data/funding-opportunities.yaml`

---

### 4.5 Initiatives

**Purpose:** Cross-network programs and collaborations

**Grid Layout:** Cards for each initiative with:
- Name + logo/icon
- Networks involved (badges)
- Status (active, bootstrapping, planning)
- Description
- Links (website, repo, documentation)

**First-Class Initiatives (from council discussions):**
| Initiative | Networks | Status | Integration |
|------------|----------|--------|-------------|
| Coop | Regen Coordination | Bootstrapping | Full profile |
| Green Goods | Greenpill | Active | Full profile |
| Bloom | Bloom Network | Active | Full profile |
| Prosperity Pass | Multiple | Active | Reference |
| ReFi Podcast | ReFi DAO | Active | Reference |
| Greenpill Podcast | Greenpill | Active | Reference |
| Local ReFi Toolkit | Regen Coordination | Active | Full profile |
| Regenerant Catalunya | Regen Coordination | Active | Full profile |

**Data Source:** `data/initiatives.yaml` + manual curation for missing entities

---

### 4.6 Activities

**Purpose:** Proof of execution + credibility for external applications

**Sections:**
1. **2025 Activities Report:**
   - GG23 coordination ($84k matching funds)
   - Common Impact Data Standard research
   - Hub model infrastructure
   - Council operations (13 meetings)
   - Partnership facilitation ($236k raised 2024)
2. **Bread Coop Integration:**
   - Membership transition from ReFi DAO to RC
   - Governance participation
   - 2026 collaboration roadmap
3. **2026 Vision:**
   - "A Call for Coordination" summary
   - Strategic priorities (infrastructure > tools, network entanglement)
4. **Impact Metrics:**
   - Karma GAP integration
   - Common Approach alignment
   - AI + ImpactQF methodology

**Content Source:** 
- `260101 Regen Coordination/Regen Coordination - Karma Activities Report.md`
- `260101 RC <> Bread Coop/Regen Coordination - Bread Coop Executive Summary.md`
- `260101 Regen Coordination/Regen 2026 - A Call for Coordination.md`

---

### 4.7 Integrations

**Purpose:** Interoperability transparency

**Matrix Layout:**

| System | Purpose | Status | Owner |
|--------|---------|--------|-------|
| Green Goods | Funding + governance | 🟡 Integrating | Greenpill |
| Coop | Knowledge commons | 🟢 Active | RC |
| Bloom Network | Regional coordination | 🟢 Active | Bloom |
| Karma GAP | Impact reporting | 🟢 Active | RC |
| Common Approach | Impact standards | 🟢 Active | RC |
| Region Atlas | Node visualization | 🟡 Exploring | RC |
| Gardens | Conviction voting | 🟢 Active | Multiple |
| OpenClaw | Agent runtime | 🟢 Active | RC |

**Each integration card includes:**
- What it is
- How RC uses it
- Current status
- Contact/link

---

### 4.8 Join

**Purpose:** Onboarding pathway for new nodes

**Sections:**
1. **Who Can Join:** Local nodes, chapters, program nodes, product nodes
2. **Process:** 
   - Fork organizational-os-template
   - Configure federation.yaml
   - Open PR to MEMBERS.md
   - Attend council call
3. **Requirements:**
   - Alignment with RC values
   - Active coordination (not just branding)
   - Willingness to share knowledge
4. **Benefits:**
   - Shared skills (meeting-processor, funding-scout)
   - Knowledge commons access
   - Funding round coordination
   - Network entanglement

---

## 5. Technical Architecture

### 5.1 Hybrid-Light Approach

```
┌─────────────────────────────────────────────────────────────┐
│                     STATIC SITE                             │
│  (HTML/CSS/JS — no server runtime required)                 │
├─────────────────────────────────────────────────────────────┤
│  BUILD STEP (local or CI)                                   │
│  ┌──────────────┐    ┌──────────────────┐                  │
│  │ Source YAML  │───▶│ build-snapshot.js│                  │
│  │ Files        │    │ (Node/Python)    │                  │
│  └──────────────┘    └────────┬─────────┘                  │
│                               ▼                             │
│                        networkSnapshot.json                 │
│                               │                             │
│                               ▼                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Template Engine (lightweight)                      │   │
│  │ - Replace {{stats.nodeCount}} with actual values   │   │
│  │ - Generate static HTML pages                       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Static Hosting │
                    │  GitHub Pages   │
                    │  or Netlify     │
                    └─────────────────┘
```

### 5.2 Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Base** | HTML5 + CSS3 + Vanilla JS | Zero dependencies, maximum longevity |
| **Styling** | CSS Custom Properties | Theming support, easy brand adaptation |
| **Build** | Node.js script | YAML parsing, JSON generation |
| **Templating** | Simple string replacement OR lightweight JS template | No heavy framework needed |
| **Map** | Region Atlas embed (Phase 1) OR D3.js (Phase 2) | Region Atlas already has Greenpill + ReFi DAO data |
| **Hosting** | GitHub Pages | Free, version-controlled, automatic deploy |

### 5.3 File Structure

```
regen-coordination-os/
├── site/                          # Website source
│   ├── data/
│   │   └── networkSnapshot.json   # Generated at build time
│   ├── pages/
│   │   ├── index.html
│   │   ├── federation.html
│   │   ├── nodes.html
│   │   ├── funds.html
│   │   ├── initiatives.html
│   │   ├── activities.html
│   │   ├── integrations.html
│   │   └── join.html
│   ├── styles/
│   │   ├── design-tokens.css      # RC brand variables
│   │   ├── base.css               # Reset, typography
│   │   ├── components.css         # Cards, buttons, badges
│   │   ├── navigation.css         # Header, mobile menu
│   │   ├── pages/                 # Page-specific styles
│   │   └── utilities.css
│   ├── scripts/
│   │   ├── main.js                # Core functionality
│   │   ├── navigation.js          # Mobile menu, scroll
│   │   ├── data-loader.js         # Load networkSnapshot.json
│   │   ├── nodes-map.js           # Map visualization
│   │   └── stats-counter.js       # Animated counters
│   └── assets/
│       ├── logo.svg
│       ├── favicon.png
│       └── images/
├── scripts/
│   └── build-snapshot.js          # YAML → JSON generator
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Pages deployment
└── package.json                   # Build dependencies only
```

---

## 6. Build & Deploy

### 6.1 Local Development

```bash
# Clone repo
git clone https://github.com/regen-coordination/regen-coordination-os.git
cd regen-coordination-os

# Install build dependencies (Node.js 20+)
npm install

# Build data snapshot
npm run build:snapshot

# Serve locally (any static server)
npx serve site -p 3000
# OR
python3 -m http.server 3000 --directory site
```

### 6.2 Production Deploy

**GitHub Pages (Recommended):**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
    paths:
      - 'site/**'
      - 'data/**'
      - 'federation.yaml'
      - 'scripts/build-snapshot.js'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build:snapshot
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./site
```

---

## 7. Implementation Phases

### Phase 1: Foundation (Week 1)

**Goal:** Working static site with basic pages

- [ ] Scaffold `site/` directory structure
- [ ] Create design tokens CSS (adapted from ReFi DAO)
- [ ] Build `scripts/build-snapshot.js` (YAML → JSON)
- [ ] Create base layout with navigation
- [ ] Implement Home page with stats
- [ ] Set up GitHub Pages deployment

**Deliverable:** Live site at `regen-coordination.github.io` with Home page

### Phase 2: Core Pages (Week 2)

**Goal:** All primary content pages functional

- [ ] Federation page (from federation.yaml)
- [ ] Nodes page (list view from nodes.yaml)
- [ ] Funds & Domains page
- [ ] Activities page (2025 + Bread content)
- [ ] Mobile-responsive navigation
- [ ] SEO meta tags + social preview

**Deliverable:** Complete v0.1 site with all pages

### Phase 3: Visualization (Week 3)

**Goal:** Interactive network visualization

- [ ] Research Region Atlas embed options
- [ ] Implement map view on Nodes page
- [ ] Color-code pins by network affiliation
- [ ] Add status filters (active/bootstrapping)
- [ ] Fallback list view for accessibility

**Deliverable:** Interactive node map or embedded Region Atlas

### Phase 4: Integration & Polish (Week 4)

**Goal:** Integration matrix + final polish

- [ ] Integrations page with status matrix
- [ ] Initiatives page (Green Goods, Coop, Bloom cards)
- [ ] Join page with onboarding pathway
- [ ] Performance optimization (lazy loading)
- [ ] Accessibility audit (contrast, keyboard nav)
- [ ] Cross-browser testing

**Deliverable:** v1.0 launch-ready site

---

## 8. Reference & Inspiration

### 8.1 Model: ReFi-DAO-Website

**What to adopt:**
- Design token architecture (colors, spacing, typography)
- Component patterns (glass cards, pill badges, gradient text)
- Navigation structure (responsive, mobile-first)
- File organization (`site/pages/`, `site/styles/`, `site/scripts/`)

**What to adapt:**
- Color palette (shift from pure ReFi blue to RC teal accent)
- Hero section (replace ring with network/federation visual)
- Content focus (coordination infrastructure vs. local nodes)

**Source:** `03 Libraries/ReFi-DAO-Website/`

### 8.2 Inspiration: Gitcoin 3.0 (gitcoin_co_30)

**What to learn from:**
- Content-driven directory model
- GitHub Issues → Content workflow (for future)
- Banner generation aesthetic (Chladni patterns)
- Clear categorization (apps, mechanisms, campaigns, research)

**What not to replicate:**
- Next.js complexity (overkill for RC needs)
- Heavy build pipeline
- AI chat integration (out of scope)

**Reference:** `03 Libraries/gitcoin_co_30/` (cloned for reference)

### 8.3 Integration: Region Atlas

**From Feb 6 Council Sync:**
> "Region Coordination website will use existing Region Atlas tool for visualizing all network nodes (Greenpill, ReFi DAO, Bloom). Option exists for adding bioregion overlay."

**Action:** Contact Region Atlas team for embed API or iframe options before building custom map.

---

## 9. Open Questions & Decisions

| Question | Options | Recommendation |
|----------|---------|----------------|
| **Map visualization** | Region Atlas embed vs. custom D3 | Start with Region Atlas; build custom only if gaps exist |
| **Node status indicators** | Simple badges vs. traffic lights | Use emoji + color: 🟢 Active, 🟡 Bootstrapping, 👀 Observer |
| **Multi-language** | v1 English only vs. i18n framework | v1 English; i18n in v2 (content volume too low now) |
| **Blog/News** | Include vs. defer | Defer; link to hub.regencoordination.xyz for dynamic content |
| **Donation button** | Include vs. defer | Include — link to Impact Stake / Octant Vault |

---

## 10. Related Documents

- `03 Libraries/regen-coordination-os/docs/260309 Regen Coordination Website - Masterplan Dashboard.md`
- `03 Libraries/regen-coordination-os/docs/260311 RC Task Scoping Dashboard.md`
- `03 Libraries/regen-coordination-os/docs/260311 RC Narrative Pack Stub (2025 Activities + Bread + 2026).md`
- `03 Libraries/regen-coordination-os/IDENTITY.md`
- `03 Libraries/regen-coordination-os/SOUL.md`
- `03 Libraries/regen-coordination-os/federation.yaml`
- Meeting notes: `260206 Regen Coordination Council Sync.md`, `260213 Regen Coordination Council Sync.md`

---

## 11. Next Actions

### Immediate (This Session)
1. [ ] Create `site/` directory scaffold
2. [ ] Create `scripts/build-snapshot.js` YAML parser
3. [ ] Generate first `networkSnapshot.json`
4. [ ] Create design tokens CSS file

### This Week
5. [ ] Build Home page with live data
6. [ ] Build Federation page
7. [ ] Set up GitHub Pages deployment

### Pending Decisions
8. [ ] Confirm Region Atlas embed approach
9. [ ] Get node location data for map pins (many nodes lack coordinates)
10. [ ] Finalize color palette with council feedback

---

*This masterplan is a living document. Update as implementation progresses and council decisions are made.*
