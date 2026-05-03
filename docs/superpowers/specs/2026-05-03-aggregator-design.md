---
title: Regen Coordination Aggregator(s) — Design Spec
date: 2026-05-03
status: design-approved
fidelity: style-guide-grade
spec_for: |
  Two paired aggregator apps (RC-canonical + open ecosystem fork) sharing a
  monorepo, a shadcn-anchored UI package, and a YAML-driven design system,
  built on Astro + React islands.
related:
  - docs/AGGREGATOR-SCOPE.md
  - docs/DUAL-TRACK-COORDINATION.md
  - docs/260311 RC Website - MASTERPLAN.md
  - docs/design-source/brand-extract.json
  - "../../03 Libraries/org-os/skills/skills-curator/SKILL.md"
---

# Regen Coordination Aggregator(s) — Design Spec

## 0. Source-of-truth pointers

- **Brand:** `docs/design-source/brand/` (logo + banner) and `docs/design-source/brand-extract.json` (sampled OKLCH stops)
- **Figma reference:** `docs/design-source/figma-extract.json` (brand-asset frames; not a design system file)
- **Earlier scoping (superseded by this spec):** `docs/AGGREGATOR-SCOPE.md`, `docs/DUAL-TRACK-COORDINATION.md`, `docs/260311 RC Website - MASTERPLAN.md`
- **Phase 0 skill:** `org-os/skills/skills-curator/SKILL.md`

This spec **supersedes** the three prior docs above for any aggregator design decision. They remain for historical context.

---

## 1. Context & decisions made during brainstorm

| Decision | Choice | Reason |
|---|---|---|
| Architecture pairing | (a) MASTERPLAN site IS the RC aggregator (reframed); the open ecosystem aggregator is its sibling forkable shell | Avoid building three artifacts (MASTERPLAN site + RC aggregator + open aggregator) when two suffice |
| Fidelity of DESIGN.md | (b) Style-guide-grade (~10–15 pages — tokens + 8–12 key components + voice/tone) | Balance between rigor and time-to-build; allows improvisation in implementation |
| Theme strategy | (b) Light + Dark, light-default | Brand is inherently a light sky-to-sun gradient; dark is a derived "Regen Coordination at night" variant |
| Tech stack | (a) Astro + React islands + shadcn/ui | Static-first matches data-driven content; React islands give shadcn its native home; deploys clean to GitHub Pages or Vercel |
| Repo structure | (ii) Monorepo with shared UI package | The shared package is the natural unit to extract back to org-os; supports multiple apps + future org-os instances as consumers |
| Surfaces in both apps | Add Calls & Events as first-class | Time-sensitive aggregation is high-leverage and absent from the ecosystem today |
| Skills curation | Standardized as Phase 0 of any non-trivial initiative | Decided during brainstorm; new `skills-curator` skill added to org-os framework |

---

## 2. Monorepo architecture

```
regen-coordination-os/
├── apps/
│   ├── regen-coordination/          # The RC aggregator (canonical fork; reframes MASTERPLAN site)
│   │   └── astro.config + 6 nav pages + footer
│   │
│   ├── regen-ecosystem/             # The open forkable ecosystem aggregator
│   │   └── astro.config + 5 nav pages + examples/
│   │
│   ├── regen-ecosystem-starter/     # Thin extracted template for `npx degit` forks
│   │
│   └── storybook/                   # (or Astro-based showcase) renders every primitive
│
├── packages/
│   ├── aggregator-ui/               # ✦ Shared UI package — fed back to org-os in Phase 6
│   │   ├── components/              # shadcn-based primitives + composite patterns
│   │   ├── theme/                   # tokens.css (OKLCH), dark.css, gradients.css
│   │   └── primitives/              # Wrappers around shadcn-ui (Button, Dialog, Combobox, Command, Tabs)
│   │
│   ├── aggregator-data/             # ✦ Shared data adapters
│   │   ├── adapters/                # federation, gitcoin, github, csv, koi (stub), events, luma (later)
│   │   ├── schemas/                 # Zod schemas for normalized initiative/funding/node/event types
│   │   └── transform/               # Dedupe, geocode, merge, snapshot builders
│   │
│   └── aggregator-config/           # ✦ Shared config schema for instance configuration
│       └── schema.ts                # Zod schema for instance config (theme, sources, features)
│
├── docs/
│   ├── DESIGN.md                    # ✦ Phase 1 deliverable — the canonical design system doc
│   ├── design-source/               # Brand assets, figma extracts, color samples
│   ├── plans/                       # Implementation plans + skills-curation doc
│   └── superpowers/specs/           # Design specs (this doc)
│
├── pnpm-workspace.yaml
└── package.json (workspace root)
```

**Tooling:** pnpm workspace manager · TypeScript · Vitest · Prettier · ESLint · Changesets for versioning.

**Promotion contract:** after v1 ships, the three `packages/` are extracted to `org-os/packages/` so any future `*-os` instance can `pnpm add @org-os/aggregator-ui @org-os/aggregator-data @org-os/aggregator-config` and configure its own aggregator app in a day. Decision documented in the Phase 6 retrospective.

---

## 3. RC aggregator scope (`apps/regen-coordination/`)

Reframes the MASTERPLAN's 8-page IA in light of (i) Coy's pass-through pivot from the 2026-04-24 council sync, (ii) the 23 council meetings now processed into canonical records, (iii) KOI implementation in motion via Block Science, (iv) the open ecosystem aggregator now carrying multi-source aggregation.

**Top navigation (6 pages):**

| Page | Replaces / merges | Primary purpose | Data source |
|---|---|---|---|
| **Home** | Home | Identity + 60-sec orientation. Hero = brand sky-to-sun gradient + orb mark + tagline ("Collaborative Pathways to Regeneration") + 4 stat cards (nodes, funding routed, council meetings, partner networks). Below: pass-through framing block, 3 active programs, latest activity. | `networkSnapshot.json` (built) |
| **Network** | Federation + Nodes | Who's in the network and how it's governed. Top: hub model + governance cadence. Middle: interactive node graph (the orb mark scaled up). Bottom: full nodes table (filterable, color-coded by network). | `federation.yaml`, `data/nodes.yaml` |
| **Capital** | Funds & Domains | Primary value surface under pass-through framing. Active funding pools (Octant, Impact Stake, Gardens), live opportunities (Artizen, Gitcoin GG), capital flow diagram (inflows → outflows by network). | `data/funds.yaml`, `data/programs.yaml`, `data/funding-opportunities.yaml` |
| **Initiatives** | Initiatives | Cross-network programs RC supports/operates. Cards: Coop, Regen Web3 Toolkit, Bread Coop, Earth.live, Impact Stake, Regenerant Catalunya. Each card → standalone detail page. | `data/initiatives.yaml`, `data/projects.yaml` |
| **Activity** | Activities | Backward-looking proof of execution. **Council corpus timeline** (auto-generated from 23+ processed meetings), 2025 report, Bread Coop integration timeline, 2026 vision. KOI export embed (when refi-dao Wave 2 lands). | `data/meetings.yaml`, `packages/operations/meetings/*.md` |
| **Calendar** | (new) | Forward-looking + recent. Upcoming RC council calls, partner-network syncs, conferences/hackathons (May hackathon, GG24 prep). Past 30 days inline. iCal/Google export, RSS. | `data/events.yaml`, `data/meetings.yaml`, optional partner-federation event feeds |

**Footer / secondary:** Join (onboarding pathway) · Integrations (interop matrix: Coop, Karma GAP, Common Approach, Region Atlas, Gardens, OpenClaw, KOI) · About / Governance (council structure, decision model, treasury)

**Activity vs Calendar separation:** Activity = backward-looking narrative (full corpus, with case-study framing). Calendar = forward-leaning schedule + recent occurrences. Past meetings appear in both, framed differently.

**Key design decisions:**

1. **Council corpus is a first-class surface** — the 23 meetings already in `packages/operations/meetings/` populate the Activity timeline as cards (date, attendees, decisions extracted, link to canonical record). Major credibility lift the MASTERPLAN didn't anticipate.
2. **KOI is designed-in as adapter, not built yet** — `aggregator-data/adapters/koi.ts` exists as a stub. When refi-dao Wave 2 ships and KOI intake unblocks (per memory), the Activity surface gains the live feed without retrofit.
3. **Pass-through framing on Home** — explicit copy block reflecting Coy's pivot proposal.
4. **Initiatives links inward and outward** — RC view + outbound to project's own site/repo. Doesn't try to be source of truth on Coop, just RC's view of it.
5. **No "Knowledge Hub" page** — that artifact pivoted to ecosystem-wide thinking; lives in Activity (RC slice) and on the open ecosystem aggregator (full ecosystem).

---

## 4. Open ecosystem aggregator scope (`apps/regen-ecosystem/`)

Forkable, instance-configurable sibling. Same shared UI package as RC, but **brand-neutral defaults** that any bioregion / sector can override.

**Top navigation (5 pages):**

| Page | Purpose | Data source |
|---|---|---|
| **Home** | "What's happening in *this* ecosystem?" — config-driven hero, 4 stat cards, latest-activity feed, "fork this aggregator" CTA. | Multi-source aggregation |
| **Initiatives** | Searchable catalog. Cards (name, stage, location, funding, impact area). Filters (geography, category, stage, funding status). CSV/JSON export. | All adapters: federation feeds, GitHub orgs, CSV/Sheets, optional Gitcoin |
| **Funding** | Live regen funding rounds across the ecosystem. Octant, Artizen, Gitcoin GG, Superfluid, Gardens. Deadlines, amounts, eligibility, historical payouts. | Federation feeds + Gitcoin API |
| **Calls & Events** | Cross-network regen calendar — community calls aggregated from all configured federation feeds, public events curated via CSV/Sheets. Filters: location, type, network, date range. iCal/Google export per filter. | All federation feeds' `data/events.yaml`, instance CSV, optional Luma/Eventbrite |
| **Get Involved** | Add-your-initiative workflow (PR or web form), find-peers, resource links, contributor guidelines, fork-this-aggregator quickstart. | Static + GitHub PR template |

**Why Calls & Events is high-leverage:** no one currently has a unified regen calendar. Each network maintains its own. The aggregator becomes the canonical "what's happening across regen this week" surface — strong recurring-traffic driver and contribution magnet.

**Instance configuration (`config.yml` schema):**

```yaml
instance:
  name: "Bay Area ReFi Aggregator"
  description: "Local initiatives in Northern California"
  region: { city: "San Francisco", country: "US" }
  url: "https://refi-bay-area.org"

branding:
  # Each instance overrides the brand tokens; RC's sky-to-sun gradient is
  # the default if omitted.
  gradient_stops:
    - { pos: 0.0, oklch: "oklch(78% 0.02 236)" }     # sky
    - { pos: 0.5, oklch: "oklch(84% 0.026 75)" }      # horizon
    - { pos: 1.0, oklch: "oklch(74% 0.125 77)" }      # sun
  mark: "./brand/orb.svg"
  wordmark: "ReFi Bay Area"
  font_display: "Poppins"
  font_body: "Inter"

data_sources:
  - type: federation
    url: "https://raw.githubusercontent.com/regen-coordination/regen-coordination-os/main/federation.yaml"
    filter: { region: "bay-area" }
  - type: github
    repos: ["refi-bay-area/initiatives", "greenpill-sf/projects"]
  - type: csv
    url: "https://docs.google.com/spreadsheets/.../export?format=csv"
    auto_refresh: true
    interval_hours: 24
  - type: gitcoin
    enabled: true
    pull_active_rounds: true
  - type: luma
    enabled: true
    calendar_id: "refi-bay-area"

features:
  show_governance: false
  show_impact_stories: true
  allow_contributions: true
  enable_search: true
  enable_filters: true
  enable_map: true
```

**Three example instances** ship in `apps/regen-ecosystem/examples/` to prove forkability:

1. **`bay-area/`** — Northern California ReFi (GitHub + Gitcoin + CSV)
2. **`mediterranean/`** — Bioregional, multi-federation aggregation (refi-bcn + refi-med + greenpill-mediterranean)
3. **`global-regen/`** — RC-as-default config (proof RC could theoretically run on the open shell with full branding override)

**Fork-and-deploy workflow** (the "15 min" promise):

```bash
npx degit regen-coordination/regen-coordination-os/apps/regen-ecosystem-starter my-aggregator
cd my-aggregator
# Edit config.yml (5 min)
# Add brand assets to ./brand/ (5 min, optional)
npm install && npm run build && npx vercel deploy
```

**Differences from RC aggregator:**

| | RC | Ecosystem |
|---|---|---|
| Brand | Fixed (sky-to-sun, orb, "Regen Coordination") | Configurable per instance |
| Data sources | RC's own (federation.yaml + meetings + projects) | Multi-source via adapters |
| Pages | 6 + footer | 5 |
| Governance content | Yes | No |
| Council corpus | Yes (23+ meetings, KOI-ready) | No |
| Customization | None — RC's canonical instance | YAML-config-driven |
| Deploy target | `regencoordination.xyz` | Per-instance hosting |

---

## 5. Design system & `DESIGN.md` structure

`docs/DESIGN.md` is the canonical design system doc — style-guide-grade, anchored on the actual brand extract.

### 5.1 Canonical brand palette (from `brand-extract.json`)

**Signature gradient — Sky to Sun:**

| Stop | Hex | OKLCH | Role |
|---|---|---|---|
| Sky | `#aab8c1` | `oklch(78% 0.02 236)` | Cool slate-blue, top |
| Horizon-cool | `#c3c7ca` | `oklch(82.7% 0.006 240)` | Neutral transition (upper) |
| Horizon-warm | `#c5c1b8` | `oklch(81% 0.013 87)` | Neutral transition (lower) |
| Earth | `#d4c8b8` | `oklch(84% 0.026 75)` | Pale warm sand |
| Pasture | `#e3dd91` | `oklch(88.5% 0.097 104)` | Warm-yellow band (subtle) |
| Sand | `#d8bb9b` | `oklch(81% 0.055 70)` | Warm sand mid |
| Sun | `#e0b789` | `oklch(80.5% 0.077 70)` | Sun-warm bottom |
| Sun-deep | `#d69f44` | `oklch(74% 0.125 77)` | Most-saturated brand hue (logo bottom) — primary action color |

**Wordmark / tagline:** "Regen Coordination" / "Collaborative Pathways to Regeneration"

**Mark:** the orb — connected white nodes (8–9) on the gradient circle.

### 5.2 DESIGN.md outline (Phase 1 deliverable)

```
docs/DESIGN.md
├── 0. Source of truth (pointer to brand-extract.json + brand/)
├── 1. Brand foundations (wordmark, tagline, mark, voice & tone, naming rules)
├── 2. Color tokens (OKLCH-first)
│   ├── Brand palette (semantic names + raw OKLCH + hex fallback)
│   ├── Semantic tokens (bg, surface, text, border, primary, accent, success/warning/danger/info)
│   ├── Light theme (canonical) — full token table
│   ├── Dark theme (derived by inverting OKLCH lightness, shifting chroma) — full token table
│   ├── Contrast verification (every fg/bg pair certified WCAG AA)
│   └── Gradient utilities (signature sky-to-sun + cool-only + warm-only + dark-night)
├── 3. Typography (Poppins display + Inter body, modular type scale 1.250)
├── 4. Spatial system (4px base spacing, radii, shadow, container widths, max-prose 65ch)
├── 5. Iconography (Lucide primary + brand mark variants + network-mark family)
├── 6. Motion (easing, duration scale, prefers-reduced-motion default, signature motions)
├── 7. Component primitives (shadcn-aligned: Button, Card, Badge, Input, Select, Combobox,
│                           Command, Tabs, Accordion, Dialog, Popover, Tooltip, Table)
├── 8. Composite patterns (GradientHero, NodeOrb, InitiativeCard, FundingCard, EventCard,
│                          FilterBar, CapitalFlowDiagram, CouncilTimelineEntry)
├── 9. Layout templates (marketing, browser, detail, dashboard)
├── 10. Responsive (sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536)
├── 11. Accessibility (WCAG 2.1 AA baseline, focus rings, keyboard nav)
└── 12. Implementation (tokens.css location, shadcn integration, oklch skill, cmd-animate, storybook)
```

**Built-in principles:**

1. **OKLCH-first** — perceptual uniformity matches brand-extract.json source
2. **Brand gradient as first-class design element** — used as hero backdrop, glass-card tints, hover states on primary actions, brand-mark fills
3. **Two themes from one source** — dark inverts lightness rather than parallel hand-curated palette
4. **Component spec format mirrors shadcn** — anatomy + variants + code example + do/don't pairs
5. **Inspirations explicitly named, not implicit** — Supabase (layout polish), shadcn (component architecture), awesome-design-md (doc structure), cmd-animate (motion utilities)

---

## 6. Skills & tooling stack

### 6.1 Agent skills

**Process skills (already installed via superpowers):** brainstorming · writing-plans · executing-plans · dispatching-parallel-agents · test-driven-development · verification-before-completion · requesting-code-review

**Implementation skills to install** (final list set by Phase 0 — `skills-curator`):

| Skill | Source | Why |
|---|---|---|
| oklch-color | oklch.fyi/skill | Entire DESIGN.md uses OKLCH; need derivation, scale generation, contrast checking |
| design-md template | github.com/VoltAgent/awesome-design-md | Use template as structural skeleton for `docs/DESIGN.md` |
| shadcn-installer | agentskills.io / skills.sh (browse) | Wraps `npx shadcn-ui@latest add` workflows |
| astro-bootstrap | marketplaces (browse) | Bootstraps the monorepo correctly first time |
| frontend-design | marketplaces (browse) | Generic design-system audit skill |
| a11y-audit | marketplaces (browse) | Verifies WCAG AA compliance |

### 6.2 npm dependencies

**Workspace root:** `pnpm`, `typescript`, `prettier`, `eslint`, `vitest`

**`packages/aggregator-ui`:** `@radix-ui/*`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss`, `tailwindcss-animate`, `cmd-animate` (from impeccable.style), `lucide-react`, `react`, `react-dom`

**`packages/aggregator-data`:** `zod`, `js-yaml`, `octokit`, `papaparse`, `node-ical`

**`packages/aggregator-config`:** `zod`, `js-yaml`

**`apps/*`:** `astro`, `@astrojs/react`, `@astrojs/tailwind`, `@astrojs/sitemap`, `@astrojs/rss`

### 6.3 Inspiration references (cited in DESIGN.md, not installed)

| Reference | Cited in | Use |
|---|---|---|
| Supabase (`supabase.com`) | DESIGN.md §9 | Reference for clean-utility dashboard polish, content density |
| shadcn/ui docs | DESIGN.md §7 | Component anatomy + variant philosophy |
| awesome-design-md repos | DESIGN.md overall | Doc skeleton inspiration |
| OKLCH explainer (`oklch.com`) | DESIGN.md §2 | OKLCH-first reasoning |
| Region Atlas | DESIGN.md §8 + RC Network page | Reference for node-graph viz; possibly embed |

### 6.4 Promotion contract (post-launch)

After v1 ships, each chosen package + skill gets a verdict in the retrospective:
- **Promote** — works as expected → standard org-os skill / `@org-os/*` package
- **Improve-then-promote** — needs fix or fork before promotion
- **Drop** — didn't deliver value; uninstall

Retrospective lives at `docs/plans/2026-XX-XX-aggregator-retrospective.md`.

---

## 7. Build, deploy, data refresh

**Build pipeline:**

```
data/*.yaml + federation.yaml + meeting corpus
              ↓
   packages/aggregator-data (parse · validate · normalize · dedupe · geocode · merge)
              ↓
   build/networkSnapshot.json (per app)
              ↓
   astro build → dist/
              ↓
   deploy → GitHub Pages or Vercel
```

**Deploy targets:**

| App | Domain | Host | Trigger |
|---|---|---|---|
| `regen-coordination` | `regencoordination.xyz` (or `.org`) | GitHub Pages (Vercel fallback if ISR needed) | Push to `main` touching `apps/regen-coordination/**`, `data/**`, `federation.yaml`, `packages/*` |
| `regen-ecosystem` (canonical hosted) | `aggregator.regencoordination.xyz` (or `regen-aggregator.org`) | Vercel (better preview-deploys) | Same as RC |
| `regen-ecosystem` instance forks | Per-fork | Per-fork | Per-fork |

**Data refresh:**

| Data class | Refresh mode | Reason |
|---|---|---|
| `federation.yaml`, `data/nodes.yaml`, `data/funds.yaml`, `data/meetings.yaml` | Build-time (rebuild on push) | Authoritative, edited via PR |
| GitHub adapter | Daily cron (`0 6 * * *`) | Catch new repos / commits without push dependency |
| Gitcoin adapter | Daily cron | Active rounds change between manual edits |
| CSV/Sheets adapter | Per-instance config (`auto_refresh: true, interval_hours: 24`) | Instance owners control |
| Luma/Eventbrite adapters | Hourly cron | Events have tighter timeliness expectations |
| KOI feed (when ready) | Webhook | KOI pushes deltas |

**CI/CD (`.github/workflows/`):**

- `deploy-rc.yml` — builds + deploys regen-coordination on push
- `deploy-ecosystem.yml` — builds + deploys regen-ecosystem on push
- `data-refresh.yml` — cron: pull external sources → commit snapshot → trigger deploy
- `schema-check.yml` — on PR: validate `data/*.yaml` against Zod schemas (extends existing `npm run validate:schemas`)
- `a11y-audit.yml` — on PR: axe-core CI check across key pages
- `visual-regression.yml` — on PR: Playwright screenshot diffs vs baseline (defer to Phase 5 if scope tight)

**Versioning:** Changesets — each PR touching a package adds a `.changeset` markdown file. Each package versioned independently (semver). Apps don't publish.

---

## 8. Phasing & deliverables

### Phase 0 — Skills curation (½ – 1 day)

- **Deliverable:** `docs/plans/2026-05-03-skills-curation.md`
- **Process:** Single dispatched agent task, brief in §6.1
- **Skill invoked:** `org-os/skills/skills-curator/`
- **Checkpoint:** Operator approves chosen skill list before installation

### Phase 1 — DESIGN.md + brand assets organization (2–4 days)

- `docs/DESIGN.md` written per outline §5.2
- `docs/design-source/brand/` cleaned + supplemented (logo SVG if available)
- `docs/design-source/brand-extract.json` finalized as canonical token source
- `docs/design-source/inspiration-references.md` — citations + screenshots
- One reference image per major component pattern
- **Checkpoint:** Operator reviews DESIGN.md before code starts

### Phase 2 — Monorepo scaffold + `aggregator-ui` foundation (3–5 days)

- Monorepo bootstrapped (`pnpm-workspace.yaml`, root `package.json`, `tsconfig.base.json`)
- `packages/aggregator-ui/` scaffolded: `theme/tokens.css`, `theme/dark.css`, `theme/gradients.css`
- shadcn initialized via chosen installer skill
- Storybook (or Astro showcase) at `apps/storybook/`
- `packages/aggregator-config/` with Zod schema for instance config
- CI: PR-time schema validation extends existing `npm run validate:schemas`
- **Checkpoint:** Storybook renders all primitives in both themes; operator eyeball-approves

### Phase 3 — `aggregator-data` + RC app (2 weeks)

- Adapters: `federation.ts`, `nodes.ts`, `meetings.ts`, `events.ts`, `koi.ts` (stub), `github.ts`, `csv.ts`
- Adapter test coverage (Vitest, integration vs real `data/*.yaml`)
- Full Zod schema set
- `apps/regen-coordination/` built: 6 nav pages + footer pages
- All RC pages render real data from snapshot
- Council corpus timeline live from 23 processed meetings
- Deployed to staging URL
- **Sub-phasing:** dispatch parallel agents for the 3 most independent pages (Network, Initiatives, Activity) once shared layout + components are stable
- **Checkpoint:** End-to-end staging review before Phase 4

### Phase 4 — Open ecosystem app + example instances (1–2 weeks)

- `apps/regen-ecosystem/` built: 5 nav pages
- Multi-source aggregation working (federation + GitHub + Gitcoin + CSV + events)
- 3 example configs: `examples/{bay-area, mediterranean, global-regen}/`
- Each example deploys to own preview URL (Vercel)
- `apps/regen-ecosystem-starter/` extracted as `npx degit`-able template
- `apps/regen-ecosystem/QUICKSTART.md` written
- **Checkpoint:** Fresh fork of starter deploys in ≤15 min using only QUICKSTART; operator verifies by doing it

### Phase 5 — Polish + a11y + launch (1 week)

- a11y audit pass (axe-core CI green; manual keyboard-nav audit on top 5 pages)
- Performance: Lighthouse ≥ 95 RC home, ≥ 90 ecosystem home (mobile)
- SEO + social previews per page
- Visual regression baseline (Playwright)
- Production deploy to canonical domains
- Launch announcement drafted (council + community channels)
- **Checkpoint:** Approved launch

### Phase 6 — Org-os promotion retrospective (post-launch, async)

- For each package + skill + starter template: `promote / improve-then-promote / drop` decision documented in `docs/plans/2026-XX-XX-aggregator-retrospective.md`
- Approved promotions PR'd into the org-os framework (`03 Libraries/org-os/packages/`)
- Updated org-os onboarding docs to reference new packages

**Total estimated effort:** 6–8 weeks elapsed, with significant subagent parallelization in Phase 3+.

---

## 9. Open questions (non-blocking, resolve during phases)

| # | Question | Resolution phase | Default if unresolved |
|---|---|---|---|
| 1 | Final domain strategy: `regencoordination.xyz` vs `.org` vs both? | Phase 5 | `.xyz` (current placeholder) |
| 2 | Hosting: GitHub Pages for both apps, or Vercel for ecosystem (better preview deploys for forks)? | Phase 5 | GitHub Pages for RC, Vercel for ecosystem |
| 3 | License for `apps/regen-ecosystem-starter/`: MIT vs Apache 2.0? | Phase 4 | MIT (matches existing repo) |
| 4 | Should the storybook app be public or only internal? | Phase 2 | Internal first; public consideration in Phase 6 |
| 5 | Visual regression in CI from day one or deferred? | Phase 5 | Deferred to Phase 5 unless scope easy |
| 6 | iCal vs only RSS for Calendar exports? | Phase 3 | Both (low marginal cost) |

---

## 10. References

- **Supersedes:** `docs/AGGREGATOR-SCOPE.md`, `docs/DUAL-TRACK-COORDINATION.md`, `docs/260311 RC Website - MASTERPLAN.md`
- **Brand inputs:** `docs/design-source/brand/` (logo, banner), `docs/design-source/brand-extract.json` (sampled OKLCH stops + dominant hues), `docs/design-source/figma-extract.json` (Figma file metadata; brand-asset frames, no design system)
- **Council context:** 2026-04-24 Council Sync (Coy's pass-through pivot; KOI-by-Block-Science motion) per `memory/2026-04-29.md` and `packages/operations/meetings/260424 Regen Coordination Council Sync.md`
- **Skill (org-os framework):** `03 Libraries/org-os/skills/skills-curator/SKILL.md`
- **Phase 0 documented in:** `03 Libraries/org-os/docs/PLANS.md` (last section)

---

_Spec written 2026-05-03 in collaboration with operator via `superpowers:brainstorming`. Next: Phase 0 (skills curation) → Phase 1 (DESIGN.md drafting)._
