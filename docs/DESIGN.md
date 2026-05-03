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

### 2.1 Brand palette (canonical, from `brand-extract.json`)

The brand is a **sky-to-sun gradient**. Every other token in the system derives from these 5 stops.

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `--brand-sky` | `oklch(77.5% 0.02 236)` | `#aab8c1` | Cool slate-blue (top of gradient) |
| `--brand-horizon` | `oklch(83.8% 0.026 75)` | `#d4c8b8` | Pale warm sand (middle transition) |
| `--brand-pasture` | `oklch(88.5% 0.097 104)` | `#e3dd91` | Subtle yellow-green band (lower-mid) |
| `--brand-sun` | `oklch(80.5% 0.077 70)` | `#e0b789` | Warm sand-orange (lower) |
| `--brand-sun-deep` | `oklch(73.8% 0.125 77)` | `#d69f44` | Most-saturated brand hue — primary action color |

### 2.2 Light theme — semantic tokens

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `--bg` | `oklch(99% 0.003 75)` | `#fdfbfa` | App background — warm off-white, not stark white |
| `--surface-1` | `oklch(97% 0.005 75)` | `#f7f5f1` | First elevation (cards, panels) |
| `--surface-2` | `oklch(94.5% 0.008 75)` | `#f0ece7` | Second elevation (modals, popovers) |
| `--surface-3` | `oklch(91% 0.012 75)` | `#e6e0d9` | Third elevation (sticky headers, nav rails) |
| `--text-primary` | `oklch(22% 0.015 75)` | `#1f1a13` | Body text, headings — warm-anchored near-black |
| `--text-muted` | `oklch(45% 0.012 75)` | `#59544e` | Secondary text, captions, metadata |
| `--border-default` | `oklch(60% 0.015 75)` | `#867f77` | Default border for inputs, dividers, card outlines |
| `--border-subtle` | `oklch(88% 0.010 75)` | `#dbd7d0` | Hairline divider for low-emphasis separation |
| `--primary` | `oklch(73.8% 0.125 77)` | `#d69f44` | Primary action color — equals `--brand-sun-deep` |
| `--primary-hover` | `oklch(67.8% 0.135 77)` | `#c68b1b` | Primary hover state (darker, slightly more saturated) |
| `--primary-active` | `oklch(61.8% 0.135 77)` | `#b27900` | Primary pressed/active state |
| `--primary-foreground` | `oklch(18% 0.02 75)` | `#171008` | Text/icons on `--primary` backgrounds — warm near-black |
| `--accent` | `oklch(88.5% 0.097 104)` | `#e3dd91` | Accent surface — equals `--brand-pasture` |
| `--accent-foreground` | `oklch(22% 0.02 104)` | `#1c1b10` | Text/icons on `--accent` backgrounds |
| `--success` | `oklch(52% 0.13 142)` | `#367b30` | Success status (warm-leaning brand-native green) |
| `--success-foreground` | `oklch(98% 0.005 142)` | `#f7f9f6` | Text/icons on `--success` backgrounds |
| `--warning` | `oklch(72% 0.15 70)` | `#df911a` | Warning status (orange-shifted from sun-deep) |
| `--warning-foreground` | `oklch(20% 0.02 70)` | `#1c140c` | Text/icons on `--warning` backgrounds |
| `--danger` | `oklch(55% 0.18 25)` | `#c53637` | Danger/error status (warm red, modest chroma — no neon) |
| `--danger-foreground` | `oklch(98% 0.005 25)` | `#fcf7f7` | Text/icons on `--danger` backgrounds |
| `--info` | `oklch(55% 0.10 236)` | `#2a7aa4` | Info status (derived from `--brand-sky`, deepened) |
| `--info-foreground` | `oklch(98% 0.005 236)` | `#f5f9fb` | Text/icons on `--info` backgrounds |

**On status hues:** `success` (h=142) and `danger` (h=25) use conventional semantic hues rather than the brand axis (h=70–104). Status legibility is universal-convention-driven (green=success, red=danger); brand-anchored status colors would compromise scannability. `info` (h=236) and `warning` (h=70/77) stay on the brand axis since cool-blue and warm-amber are both already brand-native and read correctly as their semantic roles.

**WCAG verification:** Every fg/bg pair certified AA (≥ 4.5:1 normal text, ≥ 3:1 large/UI) in both light and dark themes. Full report: [`docs/design-source/contrast-report.json`](design-source/contrast-report.json).

### 2.3 Light theme — gradient utilities

| Utility | Stops | Use |
|---|---|---|
| `--gradient-brand` | sky → horizon → sun | Hero backdrops, large brand surfaces |
| `--gradient-cool` | sky → horizon (truncate) | Secondary heroes, glass card tints |
| `--gradient-warm` | horizon → sun-deep | CTA buttons (subtle), accent fills |
| `--gradient-night` | _(defined in §2.5 dark theme)_ | Dark-theme equivalent of brand |

### 2.4 Dark theme — semantic tokens

The dark theme is **derived**, not hand-curated. Lightness inverted (L → 100−L), chroma dampened by ~25% to avoid neon glow. Same brand story (sky → sun) presented as "Regen Coordination at night."

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `--bg` | `oklch(13% 0.008 75)` | `#090705` | App background — very dark warm-anchored neutral |
| `--surface-1` | `oklch(17% 0.010 75)` | `#120f0b` | First elevation (cards, panels) |
| `--surface-2` | `oklch(21% 0.012 75)` | `#1c1812` | Second elevation (modals, popovers) |
| `--surface-3` | `oklch(25% 0.014 75)` | `#26211a` | Third elevation (sticky headers, nav rails) |
| `--text-primary` | `oklch(96% 0.008 75)` | `#f5f1ec` | Body text, headings — warm-anchored near-white |
| `--text-muted` | `oklch(72% 0.010 75)` | `#a8a49e` | Secondary text, captions, metadata |
| `--border-default` | `oklch(52% 0.012 75)` | `#6d6861` | Default border for inputs, dividers, card outlines |
| `--border-subtle` | `oklch(32% 0.010 75)` | `#36322d` | Hairline divider for low-emphasis separation |
| `--primary` | `oklch(60% 0.155 77)` | `#b37000` | Primary action color — vibrant warm-orange (visibility on dark) |
| `--primary-hover` | `oklch(66% 0.150 77)` | `#c58300` | Primary hover state (lighter — dark-theme convention) |
| `--primary-active` | `oklch(72% 0.140 77)` | `#d59725` | Primary pressed/active state (lighter still) |
| `--primary-foreground` | `oklch(15% 0.015 75)` | `#0f0a05` | Text/icons on `--primary` backgrounds — near-black for vibrancy |
| `--accent` | `oklch(28% 0.072 104)` | `#2f2a00` | Accent surface — dark-derived from `--brand-pasture` |
| `--accent-foreground` | `oklch(96% 0.008 104)` | `#f2f2ec` | Text/icons on `--accent` backgrounds |
| `--success` | `oklch(62% 0.14 142)` | `#4f9b48` | Success status (lifted L for legibility on dark) |
| `--success-foreground` | `oklch(15% 0.015 142)` | `#080d07` | Text/icons on `--success` backgrounds |
| `--warning` | `oklch(75% 0.155 70)` | `#eb9a1f` | Warning status (vibrant amber stays bright) |
| `--warning-foreground` | `oklch(18% 0.020 70)` | `#171008` | Text/icons on `--warning` backgrounds |
| `--danger` | `oklch(63% 0.18 25)` | `#e1514e` | Danger/error status (lifted L for dark backgrounds) |
| `--danger-foreground` | `oklch(15% 0.020 25)` | `#130807` | Text/icons on `--danger` backgrounds |
| `--info` | `oklch(65% 0.11 236)` | `#4199c9` | Info status (cool slate, lifted from light theme) |
| `--info-foreground` | `oklch(15% 0.015 236)` | `#060c11` | Text/icons on `--info` backgrounds |

### 2.5 Dark theme — gradient utilities

| Utility | Stops | Use |
|---|---|---|
| `--gradient-brand-dark` | sky-dark → horizon-dark → sun-dark | Hero backdrops on dark surfaces |
| `--gradient-night` | sky-dark → bg | Subtle vertical wash for dashboard headers |
| `--gradient-cta-dark` | sun-dark → sun-deep-dark | CTA button gradient on dark |

### 2.6 Theme switching

CSS variables defined under `:root` (light defaults) and `[data-theme="dark"]` (dark overrides). User preference stored in `localStorage.theme`; `prefers-color-scheme: dark` is the initial signal if no preference set. Surfaces opt out by adding `data-theme-lock="light"` or `data-theme-lock="dark"` to a parent (e.g., council-corpus pages may lock to light for legibility of long-form text).

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
