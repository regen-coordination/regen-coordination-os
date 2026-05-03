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
| `--gradient-night` | _(defined in §2.5 dark theme)_ | Subtle vertical wash for dark dashboard headers |

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

### 3.1 Type families

| Family | Role | Source |
|---|---|---|
| **Poppins** | Display + headlines | Confirmed from Figma export (display sizes 24–220, weights 400/500/600/700) |
| **Inter** | Body text + UI labels | Confirmed from Figma export (sizes ~13–25, weights 400/700) |
| **JetBrains Mono** | Code, addresses, numerical data | shadcn convention; matches the technical surface (fund addresses, on-chain identifiers) |

Loaded via `@fontsource/poppins`, `@fontsource/inter`, `@fontsource/jetbrains-mono` (subset variants only — Latin + Latin-Ext for ES/PT/CA support).

### 3.2 Type scale (modular, ratio 1.250 — major third)

Base: `1rem = 16px` at default browser settings.

| Token | rem | px | Use |
|---|---|---|---|
| `--text-xs` | 0.64rem | 10.24px | Caption, micro-labels |
| `--text-sm` | 0.8rem | 12.8px | Helper text, secondary metadata |
| `--text-base` | 1rem | 16px | Body default |
| `--text-md` | 1.25rem | 20px | Lead paragraphs, prominent body |
| `--text-lg` | 1.563rem | 25px | Card titles, subsection headings |
| `--text-xl` | 1.953rem | 31.25px | Section headings (h3) |
| `--text-2xl` | 2.441rem | 39.06px | Page sub-headings (h2) |
| `--text-3xl` | 3.052rem | 48.83px | Page titles (h1) |
| `--text-4xl` | 3.815rem | 61.04px | Hero secondary lines |
| `--text-5xl` | 4.768rem | 76.29px | Hero display |
| `--text-6xl` | 5.96rem | 95.37px | Marketing hero (rare, top of homepage only) |

### 3.3 Line height + letter spacing

| Role | Line-height | Letter-spacing |
|---|---|---|
| Display (4xl–6xl) | 1.05 | -0.025em |
| Headings (xl–3xl) | 1.2 | -0.015em |
| Body (base–lg) | 1.55 | 0 |
| UI labels (xs–sm) | 1.4 | 0.01em |
| Mono | 1.45 | 0 |

### 3.4 Weight pairings

| Pairing | Display | Body |
|---|---|---|
| Hero | Poppins 700 | Inter 400 |
| Headline | Poppins 600 | Inter 400 |
| Body | Inter 400 | Inter 400 |
| Caption | Inter 500 | — |
| Mono inline | JetBrains Mono 400 | — |

---

## 4. Spatial System

### 4.1 Spacing scale

Base unit: `0.25rem = 4px`. Multipliers form a doubling-friendly scale.

| Token | rem | px |
|---|---|---|
| `--space-0` | 0 | 0 |
| `--space-px` | 0.0625rem | 1 |
| `--space-0.5` | 0.125rem | 2 |
| `--space-1` | 0.25rem | 4 |
| `--space-1.5` | 0.375rem | 6 |
| `--space-2` | 0.5rem | 8 |
| `--space-3` | 0.75rem | 12 |
| `--space-4` | 1rem | 16 |
| `--space-5` | 1.25rem | 20 |
| `--space-6` | 1.5rem | 24 |
| `--space-8` | 2rem | 32 |
| `--space-10` | 2.5rem | 40 |
| `--space-12` | 3rem | 48 |
| `--space-16` | 4rem | 64 |
| `--space-20` | 5rem | 80 |
| `--space-24` | 6rem | 96 |
| `--space-32` | 8rem | 128 |

### 4.2 Border radius

| Token | rem | px | Use |
|---|---|---|---|
| `--radius-none` | 0 | 0 | Tables, full-width sections |
| `--radius-sm` | 0.25rem | 4 | Inputs, small buttons |
| `--radius-md` | 0.5rem | 8 | Standard buttons, badges, small cards |
| `--radius-lg` | 0.75rem | 12 | Cards, modals |
| `--radius-xl` | 1.25rem | 20 | Hero cards, large surfaces |
| `--radius-pill` | 9999px | — | Pills, network-color badges |
| `--radius-full` | 50% | — | Avatars, the orb mark, circular icons |

### 4.3 Shadow

Light-theme shadows (dark theme inverts opacity per tokens.css):

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 2px 0 oklch(0% 0 0 / 0.05)` | Subtle button lift |
| `--shadow-md` | `0 4px 6px -1px oklch(0% 0 0 / 0.07), 0 2px 4px -2px oklch(0% 0 0 / 0.05)` | Cards, popovers |
| `--shadow-lg` | `0 10px 15px -3px oklch(0% 0 0 / 0.07), 0 4px 6px -4px oklch(0% 0 0 / 0.05)` | Modals, command palette |
| `--shadow-xl` | `0 20px 25px -5px oklch(0% 0 0 / 0.10), 0 8px 10px -6px oklch(0% 0 0 / 0.06)` | Featured cards, drawers |
| `--shadow-glow` | `0 0 30px oklch(74% 0.125 77 / 0.30)` | Sun-deep glow for primary CTAs (use sparingly) |

### 4.4 Container widths

| Token | px | Use |
|---|---|---|
| `--container-xs` | 480 | Single-column forms, login |
| `--container-sm` | 640 | Narrow content (article body) |
| `--container-md` | 768 | Standard prose pages |
| `--container-lg` | 1024 | Browser pages (initiative grid, council timeline) |
| `--container-xl` | 1280 | Dashboards, wide tables |
| `--container-2xl` | 1536 | Marketing heroes, full-width visualizations |
| `--prose-max` | `65ch` | Long-form reading (council records, blog posts) — overrides container width for inner text columns |

---

## 5. Iconography

### 5.1 Primary icon set

**Lucide React** (`lucide-react` npm package). Matches shadcn convention — every shadcn example uses Lucide. Stroke-based, consistent 24px grid.

Stroke width: `1.75px` default (slightly heavier than Lucide's `1.5` default for better legibility on the warm gradient backdrop).

### 5.2 Icon sizes

| Token | rem | px | Use |
|---|---|---|---|
| `--icon-xs` | 0.75rem | 12 | Inline annotations, badges |
| `--icon-sm` | 1rem | 16 | Inline with body text, table cells |
| `--icon-md` | 1.25rem | 20 | Buttons, nav items |
| `--icon-lg` | 1.5rem | 24 | Section headers, card icons |
| `--icon-xl` | 2rem | 32 | Empty states, feature highlights |
| `--icon-2xl` | 3rem | 48 | Marketing surfaces, large empty states |

### 5.3 Brand mark variants

The orb mark serves three purposes; each gets its own asset:

| Variant | File | Use |
|---|---|---|
| Full orb (gradient + nodes) | `brand/logo-orb.jpg` (raster), `brand/orb-mark.svg` (vector) | Hero, favicon, large surfaces |
| Mark-only (white nodes, no gradient) | `brand/orb-mark-white.svg` | Nav header, watermarks, dark-theme overlays |
| Outline (single-color stroke) | `brand/orb-mark-outline.svg` | Print, monochrome contexts |

### 5.4 Network-mark family

Each federation peer (Bloom, Greenpill, ReFi DAO, etc.) gets a node-styled mark using its network color:

```css
.node-mark { fill: var(--network-color, var(--text-muted)); }
.node-mark[data-network="refi-dao"] { --network-color: #4571e1; }
.node-mark[data-network="greenpill"] { --network-color: #71e3ba; }
.node-mark[data-network="bloom"]    { --network-color: #de9ae9; }
.node-mark[data-network="rc"]       { --network-color: var(--brand-sun-deep); }
```

These appear in the Network page node-graph (§8 NodeOrb pattern) and in inline network badges throughout.

---

## 6. Motion

### 6.1 Easing curves

| Token | CSS | Use |
|---|---|---|
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Element exits, dismissal |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Element entrances, emphasis |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Continuous motion (toggles, accordions) |
| `--ease-emphasis` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Springy reveals (stat counters, hero entry) |

### 6.2 Duration scale

| Token | ms | Use |
|---|---|---|
| `--duration-instant` | 0 | No animation (prefers-reduced-motion default) |
| `--duration-fast` | 150 | Hover states, micro-feedback |
| `--duration-base` | 240 | Standard transitions (panels, tabs) |
| `--duration-slow` | 400 | Page transitions, large reveals |
| `--duration-deliberate` | 600 | Hero entrance, gradient hue-shift |

### 6.3 Reduced-motion default

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This is the **base** behavior. Motion below is opt-in via `:not([data-reduced-motion])` or by querying `prefers-reduced-motion: no-preference` explicitly.

### 6.4 Signature motions

**Hero gradient hue-shift** — the brand gradient subtly drifts hue (sky cools, sun warms) over 60s, mimicking a long sunset. Disabled under reduced-motion.

```css
@keyframes brand-gradient-drift {
  0%   { --grad-hue-shift: 0deg; }
  50%  { --grad-hue-shift: -8deg; }
  100% { --grad-hue-shift: 0deg; }
}
.gradient-hero[data-animate="true"] {
  animation: brand-gradient-drift 60s var(--ease-in-out) infinite;
}
```

**Orb node-pulse on hover** — when a network node in the orb mark is hovered, that node pulses (scale 1 → 1.15 → 1) with a soft glow.

```css
.node-mark:hover { animation: node-pulse 800ms var(--ease-emphasis); }
@keyframes node-pulse {
  0%   { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
  50%  { transform: scale(1.15); filter: drop-shadow(0 0 8px var(--network-color)); }
  100% { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
}
```

**Stat counter roll-in** — homepage stats count up from 0 over 1.2s with `--ease-emphasis`. Triggered by IntersectionObserver entry; respects reduced-motion.

### 6.5 Library

Use `cmd-animate` from `impeccable.style` for keyframe utilities (entrance/exit primitives) when shadcn's `tailwindcss-animate` doesn't cover the case. Don't ship `framer-motion` — overkill for our motion budget.

---

## 7. Component Primitives (shadcn-aligned)

> All primitives use shadcn/ui as the architectural baseline. We re-export shadcn components from `packages/aggregator-ui/primitives/<Component>.tsx` with our token CSS classes layered on. When shadcn updates, our primitives stay in sync via the shadcn CLI.

### 7.1 Button

**Anatomy:** `[icon? | label | icon?]` inside a styled `<button>`. Min height 44px (touch target).

**Variants:**

| Variant | Use | Visual |
|---|---|---|
| `primary` | Single primary action per surface | `--brand-sun-deep` bg, white fg, shadow-glow on hover |
| `secondary` | Companion actions | Surface-2 bg, text-primary fg |
| `outline` | Tertiary actions, in-card actions | Transparent bg, border-default, text-primary |
| `ghost` | In-row actions, nav items | Transparent bg + transparent border, text-primary, surface-2 on hover |
| `destructive` | Delete, irreversible actions | Danger bg, danger-foreground fg |

**Sizes:** `sm` (h-8 / 32px), `md` (h-11 / 44px, default), `lg` (h-14 / 56px).

**States:** default, hover, active (pressed), focus-visible (ring), disabled (50% opacity + cursor-not-allowed), loading (spinner replaces leading icon, label dimmed).

**Do:**
- One `primary` per surface
- Match icon size to button size (`md` button → `--icon-md` icon)

**Don't:**
- Stack two `primary` buttons side by side
- Use `destructive` for "Cancel" — that's `outline` or `ghost`
- Pair `--shadow-glow` with `secondary` (overuses the brand action color)

### 7.2 Card

**Anatomy:** `[header? | media? | body | footer?]` inside a bordered container.

**Variants:**

| Variant | Background | Border | Use |
|---|---|---|---|
| `default` | surface-1 | border-default | Standard card |
| `elevated` | surface-1 | shadow-md, no border | Featured cards (homepage active programs) |
| `glass` | gradient-cool tint at 8% opacity, `backdrop-filter: blur(12px)` | border-subtle | Hero overlays, hovered state highlights |

Padding: `--space-6` (24px) default, `--space-4` (16px) compact variant.

**States:** static (default), interactive (`role="button"` or wrapped in `<a>` — adds hover surface-2 lift + cursor-pointer), selected (`border-primary` + `bg-primary/5`).

### 7.3 Badge

**Anatomy:** `[icon? | label]` in a pill or rounded rectangle.

**Variants:**

| Variant | Style | Use |
|---|---|---|
| `default` | surface-2 bg, text-primary fg | Generic tag |
| `network` | Network color fill at 10% opacity, network color text | Per-network labels (ReFi DAO, Greenpill, Bloom, RC) |
| `status` | Color-coded by status | 🟢 active, 🟡 bootstrapping, ⚪ observer, 🔴 paused |
| `count` | Surface-3 bg, text-primary fg, mono numeric | Counter (e.g., "23 meetings") |

Sizes: `sm` (h-5 / 20px, text-xs), `md` (h-6 / 24px, text-sm, default).

### 7.4 Input

**Anatomy:** `[label | hint? | <input> | error?]` stacked.

States: default, focus (ring + border-primary), error (border-danger + danger hint), disabled (50% opacity), readonly (no border, surface-2 bg).

Always pair with `<label>` (visible) — placeholder is not a label substitute.

### 7.5 Select / Combobox

**Select:** Native `<select>` styled to match Input — for ≤7 options, deterministic.

**Combobox:** shadcn Combobox primitive (Radix Popover + Command) — for searchable lists, async results, or >7 options.

Anatomy (Combobox): `[trigger button (label + caret) | popover (search input + result list + empty state + footer hint)]`.

States: closed (default), open, searching (input focused), no-results, selected (chevron replaced by check on row).

**Use Combobox when:** the user might search by partial match (initiative names, fund names, node names).
**Use Select when:** the option set is small and well-known (status filter, sort order).

### 7.6 Command (⌘K palette)

shadcn Command primitive (`cmdk`). Triggered by `⌘K` / `Ctrl+K` from anywhere. Provides global navigation + actions.

**Anatomy:** `[search input | grouped result list (Pages, Initiatives, Funds, Council Meetings, Recent) | empty state | footer (keyboard hints)]`.

Result groups query the same data sources the pages use (see `packages/aggregator-data/`). Recent: last 5 visited pages from localStorage.

### 7.7 Tabs

**Anatomy:** `[tab list (horizontal) | tab panel]`.

Variants: `underline` (default — bottom border under active), `pill` (active tab: `bg-primary/10` fill), `segmented` (button-group style for binary/ternary toggles).

Use `underline` for content-heavy pages (Network page sub-views), `pill` for filter-style switching, `segmented` for view-mode toggles (map ↔ list).

### 7.8 Accordion

**Anatomy:** `[trigger row (label + caret) | collapsed panel]` × N. Single-expand or multi-expand mode.

Use for: FAQ, governance decisions, council meeting summaries (each meeting an accordion item; expand to see decisions + attendees).

### 7.9 Dialog

shadcn Dialog (Radix Dialog). Modal — blocks page interaction. Use sparingly: confirmations, focused workflows, contributor forms.

**Anatomy:** `[overlay (semi-opaque scrim) | panel ([header | body | footer (action buttons, primary right-aligned)])]`.

Min width: 320px, max width: 600px (one-column) or 1024px (multi-step wizards). Close on overlay click + Escape.

### 7.10 Popover

shadcn Popover (Radix Popover). Non-modal — page remains interactive. Use for: filters, in-context details (hover an initiative to see funding breakdown), small forms.

Width: content-width default, max 480px.

### 7.11 Tooltip

shadcn Tooltip (Radix Tooltip). Show on hover after 500ms delay. Use only when extra context is needed beyond label — never for critical info (touch users won't see it).

Max width: 320px. Plain text or simple inline markup only.

### 7.12 Table

For sorting/filtering structured rows (Nodes, Funds, Initiatives table views, Council Meeting list).

**Anatomy:** `[caption | thead (sortable column headers with sort indicator) | tbody (rows, optional row-click) | tfoot (pagination)]`.

Variants: `default` (zebra-striped, generous padding), `compact` (no stripes, tight padding — for dense data like fund-amount lists), `card-rows` (each row is a Card — for mobile responsive fallback).

Sort: client-side for ≤500 rows, server-pagination beyond. Filter: faceted via Combobox in column header. Empty state: helpful message + suggested action.

---

## 8. Composite Patterns (aggregator-specific)

> Composite patterns combine primitives into the recurring aggregator-specific shapes. Each lives in `packages/aggregator-ui/components/<PatternName>.tsx`.

### 8.1 GradientHero

The signature opening surface — every Home page (RC and ecosystem instances) uses this pattern.

**Anatomy:** Full-bleed gradient backdrop (`--gradient-brand`) with the orb mark left-aligned, wordmark + tagline center-set, optional 4-stat row below, optional CTA button.

Variants: `full` (h-screen, marketing only), `compact` (h-[60vh], default), `slim` (h-[40vh], dashboard surfaces).

The gradient subtly hue-shifts per §6.4 motion (60s loop). Disable on dashboards (`<GradientHero animate={false} />`).

### 8.2 NodeOrb

Interactive network graph using the orb mark scaled up. Each node is a federation peer; edges show coordination relationships.

**Anatomy:** SVG `<g>` with `<circle>` nodes (color-coded per network) and `<path>` edges. Each node clickable → opens node-detail Popover. Hover triggers `node-pulse` animation (§6.4).

Data shape: `{ nodes: NetworkNode[], edges: NetworkEdge[] }` from `aggregator-data/adapters/federation.ts`.

Used on: RC Network page (large), Home (small preview).

### 8.3 InitiativeCard

Card pattern for displaying an initiative on the Initiatives page or Home active-programs row.

**Anatomy:** Card variant `default` containing:
- Header: name + network badge(s)
- Body: 2–3 line description, status badge, key metric (e.g., "$84k routed", "23 meetings")
- Footer: outbound link to project's own site/repo + inbound link to canonical RC project page

### 8.4 FundingCard

Card pattern for funding pools / opportunities.

**Anatomy:** Card variant `elevated` containing:
- Header: pool/opportunity name + status badge (active, applied, closed)
- Body: amount available, deadline (with countdown when <30 days), eligibility one-liner
- Footer: "Apply →" CTA (primary) + Karma GAP link

### 8.5 EventCard

Card pattern for calls/events on Calendar pages.

**Anatomy:** Card variant `default` containing:
- Header: date + time (with timezone), recurrence indicator (weekly/monthly icon)
- Body: title, attendees/network badge(s), location (link or "online")
- Footer: "Add to calendar →" (iCal/Google links) + RSVP link if external

### 8.6 FilterBar

Faceted filter surface for any browser page (Initiatives, Funding, Calls & Events, Nodes).

**Anatomy:** Horizontal row of Combobox filters + active-filter pills below. Each active filter is a removable Badge variant `default` with an `×` icon. "Clear all" link appears when ≥1 filter active.

### 8.7 CapitalFlowDiagram

Inflow → outflow visualization for the Capital page.

**Anatomy:** Sankey-style diagram (D3 + svg) showing capital sources (Bread Coop, Octant, Impact Stake, grants) on the left and destinations (per-network, per-initiative funding) on the right. Edge thickness proportional to amount. Hover highlights edge + endpoints.

Library: `@nivo/sankey` (React, ~30KB) — only loaded on Capital page (Astro island).

### 8.8 CouncilTimelineEntry

Timeline pattern for the Activity page council corpus (23+ meetings).

**Anatomy:** Vertical timeline with date markers; each entry is an Accordion item:
- Trigger row: date + meeting title + attendee count + key-decisions count
- Expanded panel: attendees list, decisions extracted, link to canonical record (`packages/operations/meetings/`), link to KOI export (when available)

Sorted reverse-chronological. Filter Combobox above: by attendee, by decision keyword, by date range.

---

## 9. Layout Templates

Each template is a top-level layout in `apps/<app>/src/layouts/`. Pages compose by extending one.

### 9.1 Marketing layout

For Home pages and any landing surface.

```
[ Header (logo + nav + theme-toggle) ]
[ GradientHero ]
[ Section (alternating bg / surface-1) × N ]
[ Footer (links + federation peers + license) ]
```

Container: `--container-2xl`, edge-padding `--space-8` (mobile `--space-4`).

### 9.2 Browser layout

For filterable index pages (Initiatives, Funding, Calls & Events, Nodes).

```
[ Header ]
[ Page title row + breadcrumb + view-mode toggle ]
[ FilterBar ]
[ Grid (cards) | List (table) ]   ← view-mode determines
[ Pagination ]
[ Footer ]
```

Container: `--container-xl`, two-column on `xl+` (filter sidebar left, grid right).

### 9.3 Detail layout

For per-entity pages (single initiative, single fund, single meeting, single node).

```
[ Header ]
[ Breadcrumb ]
[ Entity hero (name + status + key metadata) ]
[ Content (sections) ]
[ Sidebar (related, links, contact) — sticky on lg+ ]
[ Footer ]
```

Container: `--prose-max` (65ch) for the content column on `lg+`; full-width on mobile.

### 9.4 Dashboard layout (future internal surfaces)

For Phase 3+ when internal dashboards land (capital flow control panel, council ops view).

```
[ Header ]
[ Stat row (4–6 stat cards) ]
[ Chart grid (2 × 2 on lg, stacked on mobile) ]
[ Table ]
[ Footer ]
```

Container: `--container-xl`, dense padding `--space-3`.

---

## 10. Responsive

### 10.1 Breakpoints

| Token | Min-width | Use |
|---|---|---|
| `sm` | 640px | Larger phones, small tablets in portrait |
| `md` | 768px | Tablets in landscape |
| `lg` | 1024px | Small desktops, sidebar layouts |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops, marketing heroes at full width |

Mobile-first: write rules at base, override at `min-width` breakpoints. Avoid `max-width` queries.

### 10.2 Grid

Default 12-column grid on `lg+`, 4-column on mobile (`<lg`). Gap `--space-6` (24px) on `lg+`, `--space-4` (16px) on mobile.

```css
.grid-12 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); }
@media (min-width: 1024px) { .grid-12 { grid-template-columns: repeat(12, 1fr); gap: var(--space-6); } }
```

### 10.3 Touch targets

Minimum 44×44px tap area for any interactive element on touch surfaces (mobile, tablet). Apply via min-height/min-width on the interactive box, not the visual content (e.g., a 24px icon button has 10px padding to reach 44px total).

### 10.4 Responsive patterns per layout

| Layout | Mobile (<lg) | Desktop (lg+) |
|---|---|---|
| Marketing | Single column, hero h-[60vh], stat row stacks 2×2 | Multi-column sections, hero h-screen, stat row 1×4 |
| Browser | Filter accordion above grid, grid 1-col, no pagination dropdown (just prev/next) | Filter sidebar left, grid 2–3 col, pagination dropdown + page numbers |
| Detail | Sidebar collapses to bottom of content column | Sidebar sticky right, content prose-max width |
| Dashboard | Stat cards 2×3, charts stack, table → card-rows variant | Stat row 1×4–6, charts 2×2 grid, table full table |

---

## 11. Accessibility

_(Task 11)_

---

## 12. Implementation

_(Task 11)_

---

## Changelog

- **1.0.0** (2026-05-03) — Initial draft, Phase 1 of aggregator initiative.
