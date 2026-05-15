# Aggregator Home — Mockup

Canonical static HTML mockup of the Regen Coordination aggregator home page. This is the visual reference Phase 2 (Astro monorepo + `aggregator-ui`) implements against.

**File:** `aggregator-home.html` — single self-contained HTML file. Open with `file://` directly, or serve with any static server.

**Design context:** Built on `docs/DESIGN.md` tokens (OKLCH-first), realises the "continuous gradient + frosted glass" treatment chosen during the 2026-05-05 brainstorm. Section IA is the single-page-Home pivot from the original 6-page IA in `docs/superpowers/specs/2026-05-03-aggregator-design.md`.

## Sections (9, merged from earlier 11)

1. Hero — container-bound, no topbar, orb mark + wordmark + tagline
2. About — small block, pull-quote framing + 3-pillar grid
3. Networks & partners — leading networks (5 governing partners) + partners marquee with category filter
4. Nodes & chapters — interactive constellation map (20 nodes from `data/nodes.yaml`) + list view toggle
5. Initiatives & funds — initiatives grid (9 from `data/initiatives.yaml`) with status filter + funds tabs (Pools / Opportunities / Flow)
6. Events / calls — Lu.ma-aggregated feed with source attribution per event
7. Resources — categorised (Records / Tools & templates / Knowledge & community)
8. Get involved — three doors with numbered steps (forum / become-a-node / fund-a-pool)
9. Contact / footer — brand + channels + contact (mail, multilingual note)

## Interactions

- **Theme toggle** — floating button top-right; persisted to `localStorage.rc-theme`
- **Reveal on scroll** — IntersectionObserver fades sections in as they enter the viewport
- **Partners marquee** — auto-scrolls; pauses on hover
- **Map tooltips** — hover over a node dot to see name + meta
- **Smooth scroll** — anchor links scroll smoothly between sections
- **Reduced motion respected** — `prefers-reduced-motion: reduce` kills animations

## Knowledge cards (deferred)

Every data-driven card has a small `ⓘ` affordance in its top-right corner. v1 shows tooltip "Knowledge card · coming soon"; wiring to `/knowledge` is the subsequent plan referenced in the brainstorm.

## What's NOT in scope here

- No real partner logo SVGs — placeholder glyph chips with brand-derived colours
- No real geographic basemap — stylised continent silhouettes (decorative, not cartographic)
- No live data adapters — content hard-coded from a snapshot of `data/*.yaml` at 2026-05-05
- No multi-page IA — deeper pages (Network, Capital, Initiatives, Activity, Calendar) referenced via "see all" links but not implemented

These are addressed when the mockup is converted to the Astro monorepo per the spec's Phase 2-4.

## Edits

If you change a section, also update:
- `docs/superpowers/specs/2026-05-05-aggregator-home-mockup.md` — design notes for this mockup
- The Phase 2 implementation plan once written

The mockup is the visual contract; if it changes meaningfully, downstream artifacts must follow.
