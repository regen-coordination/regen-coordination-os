# Regen Coordination — Design System

**Version:** 1.0.0
**Last updated:** 2026-05-03
**Status:** Draft — Phase 1 of aggregator initiative
**Spec:** [`docs/superpowers/specs/2026-05-03-aggregator-design.md`](superpowers/specs/2026-05-03-aggregator-design.md)

---

## 0. Source of Truth

This document is the canonical design system for the Regen Coordination aggregator(s). It is derived from the brand assets at `docs/design-source/brand/` and the pixel-sampled extract at `docs/design-source/brand-extract.json`.

**Versioning:** any token change (color value, type scale step, spacing unit) requires a version bump in this file's header AND a changelog entry. Backward-incompatible changes bump the major version.

**Inputs:**
- Logo: `docs/design-source/brand/logo-orb.jpg`
- Banner: `docs/design-source/brand/banner-hero.jpg`
- Sampled OKLCH stops: `docs/design-source/brand-extract.json` (signature gradient + dominant hues)
- Figma reference (brand assets only, not design system): `docs/design-source/figma-extract.json`
- Inspiration references: [`docs/design-source/inspiration-references.md`](design-source/inspiration-references.md)

**Consumers:**
- `packages/aggregator-ui/theme/tokens.css` — generated from §2 (color), §3 (typography), §4 (spacing)
- `packages/aggregator-ui/theme/dark.css` — generated from §2 dark-theme tokens
- `packages/aggregator-ui/components/` — shadcn-based components implementing §7 primitives
- `apps/regen-coordination/`, `apps/regen-ecosystem/` — both apps consume the above

If the design must change, edit this file first, then regenerate token CSS, then update components.

---

## 1. Brand Foundations

### 1.1 Identity

**Wordmark:** Regen Coordination
- Always two words, both capitalized
- Never "RegenCoordination" / "regen-coordination" / "Regen CoordiNATION" (the all-caps NATION variant from earlier Figma exploration is deprecated)
- Allowed shorthands in body copy: "RC" (after first full mention), "the network"

**Tagline:** Collaborative Pathways to Regeneration
- Use as a subtitle under the wordmark in hero treatments
- Don't vary, paraphrase, or split across lines mid-phrase
- Acceptable alternatives in long-form copy ONLY: "regeneration through coordination" (lowercase, descriptive)

**Mark — the orb:** Connected white nodes (8–9) with edges, on the brand sky-to-sun gradient circle.
- File: `docs/design-source/brand/logo-orb.jpg` (sampled), `docs/design-source/brand/orb-mark.svg` (vector, when extracted)
- Stands for: connection across networks; the federation topology made visible
- Variants:
  - **Full orb** — gradient + nodes — for hero, favicon, large surfaces
  - **Mark-only** — white nodes on transparent — for nav header, watermarks
  - **Outline** — single-color stroke version — for monochrome contexts (print, faxed forms)
- **Don't** rotate, recolor the gradient, add drop shadows, or place over busy photography.

### 1.2 Voice & Tone

| Trait | Do | Don't |
|---|---|---|
| Direct | "We coordinate funding across 7 networks." | "Our innovative cross-network funding orchestration platform leverages..." |
| Grounded | "Council meets every two weeks. 23 meetings in 2026 so far." | "Continuously evolving governance touchpoints." |
| Multilingual-ready | Plain syntax, short sentences, avoid idioms | Wordplay, US-cultural metaphors, jargon |
| Anti-crypto-hype | "Funding routes through Octant vaults to vetted projects." | "Cutting-edge ReFi tokenomics unlock value flows." |

**Pronouns:** "we" for the network speaking collectively; "you" for the operator/visitor. Avoid royal "we" in technical docs (use "this app" / "the aggregator").

**Languages (by surface):**
- Primary: English (EN)
- Secondary, post-v1: Spanish (ES), Portuguese (PT), Catalan (CA) — for local nodes
- All copy must be translatable: avoid English-specific puns, alliteration, idioms

### 1.3 Naming Rules (system-wide)

- **App names:** `regen-coordination` (RC instance), `regen-ecosystem` (open ecosystem fork) — kebab-case
- **Package names:** `aggregator-ui`, `aggregator-data`, `aggregator-config` — kebab-case, no `@org-os/` prefix until Phase 6 promotion
- **Page titles in nav:** Title Case, single word where possible (Home, Network, Capital, Initiatives, Activity, Calendar)
- **Filename convention:** `kebab-case` for code, `Title Case` for content/markdown destined for direct human reading (council records, plans)
- **Component names in code:** PascalCase (`<GradientHero />`, `<NodeOrb />`)

---

## 2. Color Tokens (OKLCH-first)

_(Task 3 — light theme, Task 4 — dark theme + contrast verification)_

---

## 3. Typography

_(Task 5)_

---

## 4. Spatial System

_(Task 5)_

---

## 5. Iconography

_(Task 6)_

---

## 6. Motion

_(Task 6)_

---

## 7. Component Primitives (shadcn-aligned)

_(Task 7 — first half, Task 8 — second half)_

---

## 8. Composite Patterns (aggregator-specific)

_(Task 9)_

---

## 9. Layout Templates

_(Task 10)_

---

## 10. Responsive

_(Task 10)_

---

## 11. Accessibility

_(Task 11)_

---

## 12. Implementation

_(Task 11)_

---

## Changelog

- **1.0.0** (2026-05-03) — Initial draft, Phase 1 of aggregator initiative.
