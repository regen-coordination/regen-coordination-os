# Phase 1 — DESIGN.md Drafting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce `docs/DESIGN.md` — the style-guide-grade design system spec for the Regen Coordination aggregator(s) — plus the supporting `docs/design-source/inspiration-references.md`, anchored on the brand extract from Phase 0 and informed by the 5 newly-installed skills (oklch-skill, frontend-design, brand-guidelines).

**Architecture:** Twelve sections written in dependency order: brand foundations → tokens (color/type/spacing/icons/motion) → primitives → composites → layouts → responsive/a11y → implementation pointer. Each section pulls from a defined inspiration source (Vercel/Linear DESIGN.md templates, shadcn docs, Supabase, brand-guidelines skill template). Color tokens derived programmatically via oklch-skill against `brand-extract.json` stops. Component sections drafted via frontend-design skill. Final operator review gates Phase 2.

**Tech Stack:** Pure documentation phase — no runtime code, no tests. Tools: agent skills (oklch-skill, frontend-design, brand-guidelines), Read/Write/Edit, WebFetch (for one-time reference template fetches), Bash (for color contrast scripts the oklch-skill produces).

---

## Pre-flight: Skills availability check

Before Task 1, verify the 5 Phase 0 skills are loaded in the session running this plan. If they aren't (Claude Code may need a restart for newly-installed skills):

```bash
ls .agents/skills/{oklch-skill,frontend-design,brand-guidelines,webapp-testing,deploy-to-vercel}/SKILL.md
```

Expected: 5 paths exist. If skills are present in the filesystem but the harness doesn't surface them in the `Skill` tool listing, restart the harness session before continuing. If running in a worktree off a fresh `main`, the skills are merged in (commit `68787f9`) — they'll appear after harness reload.

---

## File Structure

| File | Created/Modified | Responsibility |
|---|---|---|
| `docs/DESIGN.md` | **Create** | Canonical design system spec — 12 sections (brand foundations through implementation pointer) |
| `docs/design-source/inspiration-references.md` | **Create** | Citations + screenshot pointers for Supabase, shadcn, Vercel/Linear DESIGN.md, awesome-design-md picks |
| `docs/design-source/brand/orb-mark.svg` | **Create** (if extractable) | Vector orb mark for inline use; optional if PNG suffices |
| `docs/design-source/brand-extract.json` | **Modify** (refine) | Already exists from Phase 0; ensure all OKLCH stops used in DESIGN.md §2 are present + verified |
| `docs/design-source/contrast-report.json` | **Create** | WCAG AA contrast verification output for every fg/bg pair in light + dark themes |
| `docs/plans/QUEUE.md` | **Modify** | Mark Phase 1 active when started, completed when done; queue Phase 2 |
| `memory/2026-05-03.md` (or next-day file) | **Modify** | Append Phase 1 session log |

---

## Task 1: Bootstrap DESIGN.md skeleton + §0 source-of-truth pointer

**Files:**
- Create: `docs/DESIGN.md`

- [ ] **Step 1: Fetch the Vercel DESIGN.md template as structural reference (one-time)**

Run: `WebFetch` against `https://getdesign.md/vercel/design-md` to get the Stitch-format 9-section structure. Note the headings; we'll adapt to our 12-section outline. Don't paste verbatim — use as reference for tone and section conventions.

- [ ] **Step 2: Write the DESIGN.md skeleton with §0 fully populated and §1–§12 stubbed**

Create `docs/DESIGN.md`:

```markdown
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

_(Task 2)_

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
```

- [ ] **Step 3: Verify file written**

Run: `wc -l docs/DESIGN.md`
Expected: ~80 lines (skeleton).

- [ ] **Step 4: Commit**

```bash
git add docs/DESIGN.md
git commit -m "phase-1: scaffold DESIGN.md skeleton + §0 source-of-truth pointer"
```

---

## Task 2: §1 Brand Foundations

**Files:**
- Modify: `docs/DESIGN.md` (replace `_(Task 2)_` placeholder under §1)

**Skill invoked:** `brand-guidelines` (template for encoding RC brand). Read its SKILL.md at `.agents/skills/brand-guidelines/SKILL.md` first to understand the template structure. Adapt — don't follow Anthropic-specific defaults.

- [ ] **Step 1: Read the brand-guidelines skill SKILL.md**

Run: `cat .agents/skills/brand-guidelines/SKILL.md`
Note the structure: identity → wordmark rules → mark usage → voice/tone → naming conventions.

- [ ] **Step 2: Read the brand extract JSON for canonical inputs**

Run: `cat docs/design-source/brand-extract.json | head -40`
Note the wordmark, tagline, and mark description fields.

- [ ] **Step 3: Write §1 in DESIGN.md**

Replace the `_(Task 2)_` line under `## 1. Brand Foundations` with:

```markdown
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
```

- [ ] **Step 4: Self-check against §1 outline (spec §5.2)**

Verify §1 covers: wordmark, tagline, mark + variants, voice & tone, naming rules. ✓ All present.

- [ ] **Step 5: Commit**

```bash
git add docs/DESIGN.md
git commit -m "phase-1: §1 Brand Foundations (identity, voice & tone, naming rules)"
```

---

## Task 3: §2 Color Tokens — Light Theme

**Files:**
- Modify: `docs/DESIGN.md` (under §2)
- Create: `docs/design-source/contrast-report.json` (light-theme half — Task 4 appends dark)

**Skill invoked:** `oklch-skill` — for OKLCH derivation, palette generation, contrast checking.

- [ ] **Step 1: Invoke the oklch-skill to generate the light-theme palette from brand stops**

Open the skill (in Claude Code: `/oklch-skill`). Provide it with the 5 stop OKLCH values from `brand-extract.json`:

| Stop | OKLCH |
|---|---|
| sky | oklch(78% 0.02 236) |
| horizon | oklch(84% 0.026 75) |
| sun | oklch(74% 0.125 77) |
| sun-deep (action) | oklch(73.8% 0.125 77.1) |
| pasture (subtle band) | oklch(88.5% 0.097 104) |

Ask the skill to derive a full semantic-token palette (bg, surface-1, surface-2, surface-3, text-primary, text-muted, border, primary, primary-hover, accent, success, warning, danger, info) for **light theme**. Constraint: every token must reference one of the 5 brand stops (or a derived shade with hue/chroma constrained to the brand palette).

- [ ] **Step 2: Write §2 light-theme token table in DESIGN.md**

Replace `_(Task 3 — light theme, Task 4 — dark theme + contrast verification)_` with:

```markdown
### 2.1 Brand palette (canonical, from `brand-extract.json`)

The brand is a **sky-to-sun gradient**. Every other token in the system derives from these 5 stops.

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `--brand-sky` | `oklch(78% 0.02 236)` | `#aab8c1` | Cool slate-blue (top of gradient) |
| `--brand-horizon` | `oklch(84% 0.026 75)` | `#d4c8b8` | Pale warm sand (middle transition) |
| `--brand-pasture` | `oklch(88.5% 0.097 104)` | `#e3dd91` | Subtle yellow-green band (lower-mid) |
| `--brand-sun` | `oklch(80.5% 0.077 70)` | `#e0b789` | Warm sand-orange (lower) |
| `--brand-sun-deep` | `oklch(74% 0.125 77)` | `#d69f44` | Most-saturated brand hue — primary action color |

### 2.2 Light theme — semantic tokens

[Insert the table generated by oklch-skill in Step 1. Each row: token name, OKLCH expression, hex fallback, role/usage note. Tokens to include: bg, surface-1, surface-2, surface-3, text-primary, text-muted, border-default, border-subtle, primary, primary-hover, primary-active, accent, success, warning, danger, info — and their `-foreground` (on-color text) variants.]

### 2.3 Light theme — gradient utilities

| Utility | Stops | Use |
|---|---|---|
| `--gradient-brand` | sky → horizon → sun | Hero backdrops, large brand surfaces |
| `--gradient-cool` | sky → horizon (truncate) | Secondary heroes, glass card tints |
| `--gradient-warm` | horizon → sun-deep | CTA buttons (subtle), accent fills |
| `--gradient-night` | _(defined in §2.5 dark theme)_ | Dark-theme equivalent of brand |
```

- [ ] **Step 3: Run contrast verification on every fg/bg pair (light theme)**

Use oklch-skill's contrast-checking action. Pair every `text-*` and `*-foreground` token against every `bg`, `surface-*`, and color token. Output a JSON report listing each pair with WCAG ratio.

Save output as `docs/design-source/contrast-report.json` with this shape:

```json
{
  "theme": "light",
  "verified_at": "2026-05-03",
  "pairs": [
    {"fg": "text-primary", "bg": "bg", "ratio": 14.2, "wcag": "AAA"},
    {"fg": "text-primary", "bg": "surface-1", "ratio": 12.1, "wcag": "AAA"},
    ...
  ],
  "violations": []
}
```

If any pair fails AA (ratio < 4.5 for normal text, < 3 for large text/UI), the violation goes in `violations[]`. Adjust the offending token's OKLCH lightness and re-verify until `violations` is empty.

- [ ] **Step 4: Append a "verified WCAG AA" line under §2.2 in DESIGN.md**

Add after the §2.2 token table:

```markdown
**WCAG verification:** Every fg/bg pair certified AA (≥ 4.5:1 normal text, ≥ 3:1 large/UI). Full report: [`docs/design-source/contrast-report.json`](design-source/contrast-report.json) (light theme + dark theme combined after Task 4).
```

- [ ] **Step 5: Commit**

```bash
git add docs/DESIGN.md docs/design-source/contrast-report.json
git commit -m "phase-1: §2 Color Tokens — light theme (semantic + gradients + WCAG AA verified)"
```

---

## Task 4: §2 Color Tokens — Dark Theme + Contrast Verification

**Files:**
- Modify: `docs/DESIGN.md` (append §2.4 + §2.5 under §2)
- Modify: `docs/design-source/contrast-report.json` (append dark-theme pairs)

**Skill invoked:** `oklch-skill` — derive dark theme by inverting OKLCH lightness with chroma adjustment.

- [ ] **Step 1: Invoke oklch-skill to derive dark-theme tokens**

Provide it with the light-theme semantic token table from Task 3. Ask it to derive the dark-theme equivalent using the principle: **invert lightness (L → 100−L), preserve hue, dampen chroma by ~25% to avoid neon glow on dark backgrounds**. Brand stops in dark theme become "Regen Coordination at night" — same story, inverted lightness:

| Brand token | Light OKLCH | Dark OKLCH (proposed) |
|---|---|---|
| `--brand-sky` | `oklch(78% 0.02 236)` | `oklch(22% 0.02 236)` |
| `--brand-horizon` | `oklch(84% 0.026 75)` | `oklch(16% 0.026 75)` |
| `--brand-sun` | `oklch(80.5% 0.077 70)` | `oklch(35% 0.10 70)` |
| `--brand-sun-deep` | `oklch(74% 0.125 77)` | `oklch(58% 0.155 77)` (action color stays vibrant) |

Ask the skill to apply the same logic to all semantic tokens.

- [ ] **Step 2: Write §2.4 dark-theme token table in DESIGN.md**

Append under §2.3 in DESIGN.md:

```markdown
### 2.4 Dark theme — semantic tokens

The dark theme is **derived**, not hand-curated. Lightness inverted (L → 100−L), chroma dampened by ~25% to avoid neon glow. Same brand story (sky → sun) presented as "Regen Coordination at night."

[Insert the dark-theme token table generated by oklch-skill in Step 1. Same row structure as §2.2.]

### 2.5 Dark theme — gradient utilities

| Utility | Stops | Use |
|---|---|---|
| `--gradient-brand-dark` | sky-dark → horizon-dark → sun-dark | Hero backdrops on dark surfaces |
| `--gradient-night` | sky-dark → bg | Subtle vertical wash for dashboard headers |
| `--gradient-cta-dark` | sun-dark → sun-deep-dark | CTA button gradient on dark |

### 2.6 Theme switching

CSS variables defined under `:root` (light defaults) and `[data-theme="dark"]` (dark overrides). User preference stored in `localStorage.theme`; `prefers-color-scheme: dark` is the initial signal if no preference set. Surfaces opt out by adding `data-theme-lock="light"` or `data-theme-lock="dark"` to a parent (e.g., council-corpus pages may lock to light for legibility of long-form text).
```

- [ ] **Step 3: Run contrast verification on dark theme + append to JSON**

Run oklch-skill contrast checker against all dark-theme pairs. Append to `docs/design-source/contrast-report.json`:

```json
{
  "theme": "dark",
  "verified_at": "2026-05-03",
  "pairs": [...],
  "violations": []
}
```

If the file is now an array (light + dark), restructure as:

```json
{
  "verified_at": "2026-05-03",
  "themes": {
    "light": { "pairs": [...], "violations": [] },
    "dark":  { "pairs": [...], "violations": [] }
  }
}
```

- [ ] **Step 4: Update §2.2 WCAG verification line to reference both themes**

Replace the line added at end of Task 3 Step 4 with:

```markdown
**WCAG verification:** Every fg/bg pair certified AA (≥ 4.5:1 normal text, ≥ 3:1 large/UI) in both light and dark themes. Full report: [`docs/design-source/contrast-report.json`](design-source/contrast-report.json).
```

- [ ] **Step 5: Commit**

```bash
git add docs/DESIGN.md docs/design-source/contrast-report.json
git commit -m "phase-1: §2 Color Tokens — dark theme (derived from light, WCAG AA verified)"
```

---

## Task 5: §3 Typography + §4 Spatial System

**Files:**
- Modify: `docs/DESIGN.md` (replace `_(Task 5)_` placeholders under §3 and §4)

These two sections are paired because both are foundational scales drawn from established conventions; together they fit one writing session.

- [ ] **Step 1: Write §3 Typography**

Replace the `_(Task 5)_` line under `## 3. Typography` with:

```markdown
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
```

- [ ] **Step 2: Write §4 Spatial System**

Replace the `_(Task 5)_` line under `## 4. Spatial System` with:

```markdown
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
```

- [ ] **Step 3: Self-check both sections against spec §5.2 §3 + §4**

Verify §3 covers: families, scale, line-heights, letter-spacing, weight pairings. ✓
Verify §4 covers: spacing, radii, shadow, container widths + max-prose. ✓

- [ ] **Step 4: Commit**

```bash
git add docs/DESIGN.md
git commit -m "phase-1: §3 Typography + §4 Spatial System"
```

---

## Task 6: §5 Iconography + §6 Motion

**Files:**
- Modify: `docs/DESIGN.md` (replace `_(Task 6)_` placeholders under §5 and §6)

- [ ] **Step 1: Write §5 Iconography**

Replace the `_(Task 6)_` line under `## 5. Iconography` with:

```markdown
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
.node-mark[data-network="rc"]       { --network-color: oklch(74% 0.125 77); }
```

These appear in the Network page node-graph (§8 NodeOrb pattern) and in inline network badges throughout.
```

- [ ] **Step 2: Write §6 Motion**

Replace the `_(Task 6)_` line under `## 6. Motion` with:

```markdown
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
```

- [ ] **Step 3: Self-check both sections**

§5: primary set, sizes, brand mark variants, network-mark family. ✓
§6: easing, duration, reduced-motion default, signature motions, library choice. ✓

- [ ] **Step 4: Commit**

```bash
git add docs/DESIGN.md
git commit -m "phase-1: §5 Iconography + §6 Motion"
```

---

## Task 7: §7 Component Primitives — First Half (Button, Card, Badge, Input, Select, Combobox)

**Files:**
- Modify: `docs/DESIGN.md` (replace `_(Task 7 — first half...)_` under §7)

**Skill invoked:** `frontend-design` — outline shadcn-aligned component anatomy.

- [ ] **Step 1: Read frontend-design skill SKILL.md**

Run: `cat .agents/skills/frontend-design/SKILL.md`
Note: anatomy → variants → states → do/don't pattern.

- [ ] **Step 2: Write §7 first-half components in DESIGN.md**

Replace the `_(Task 7 — first half, Task 8 — second half)_` line under `## 7. Component Primitives` with:

```markdown
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

**States:** static (default), interactive (`role="button"` or wrapped in `<a>` — adds hover surface-2 lift + cursor-pointer), selected (`border-primary` + `bg-primary/5%`).

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
```

- [ ] **Step 3: Self-check first-half components**

Covered: Button, Card, Badge, Input, Select, Combobox — each with anatomy, variants, states, key do/don't. ✓

- [ ] **Step 4: Commit**

```bash
git add docs/DESIGN.md
git commit -m "phase-1: §7 Component Primitives (first half — Button, Card, Badge, Input, Select, Combobox)"
```

---

## Task 8: §7 Component Primitives — Second Half (Command, Tabs, Accordion, Dialog, Popover, Tooltip, Table)

**Files:**
- Modify: `docs/DESIGN.md` (append §7.6–§7.12 under §7)

- [ ] **Step 1: Write §7 second-half components**

Append to `docs/DESIGN.md` after §7.5:

```markdown
### 7.6 Command (⌘K palette)

shadcn Command primitive (`cmdk`). Triggered by `⌘K` / `Ctrl+K` from anywhere. Provides global navigation + actions.

**Anatomy:** `[search input | grouped result list (Pages, Initiatives, Funds, Council Meetings, Recent) | empty state | footer (keyboard hints)]`.

Result groups query the same data sources the pages use (see `packages/aggregator-data/`). Recent: last 5 visited pages from localStorage.

### 7.7 Tabs

**Anatomy:** `[tab list (horizontal) | tab panel]`.

Variants: `underline` (default — bottom border under active), `pill` (active tab fills with primary at 10%), `segmented` (button-group style for binary/ternary toggles).

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
```

- [ ] **Step 2: Self-check second-half**

Covered: Command, Tabs, Accordion, Dialog, Popover, Tooltip, Table — each with anatomy + variants + use guidance. ✓

- [ ] **Step 3: Commit**

```bash
git add docs/DESIGN.md
git commit -m "phase-1: §7 Component Primitives (second half — Command, Tabs, Accordion, Dialog, Popover, Tooltip, Table)"
```

---

## Task 9: §8 Composite Patterns (aggregator-specific)

**Files:**
- Modify: `docs/DESIGN.md` (replace `_(Task 9)_` under §8)

**Skill invoked:** `frontend-design` — composite pattern discipline.

- [ ] **Step 1: Write §8 in DESIGN.md**

Replace the `_(Task 9)_` line under `## 8. Composite Patterns` with:

```markdown
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
```

- [ ] **Step 2: Self-check §8**

Covered: GradientHero, NodeOrb, InitiativeCard, FundingCard, EventCard, FilterBar, CapitalFlowDiagram, CouncilTimelineEntry — all 8 patterns from spec §5.2. ✓

- [ ] **Step 3: Commit**

```bash
git add docs/DESIGN.md
git commit -m "phase-1: §8 Composite Patterns (8 aggregator-specific patterns)"
```

---

## Task 10: §9 Layout Templates + §10 Responsive

**Files:**
- Modify: `docs/DESIGN.md` (replace `_(Task 10)_` placeholders under §9 and §10)

- [ ] **Step 1: Write §9 Layout Templates**

Replace the `_(Task 10)_` line under `## 9. Layout Templates` with:

```markdown
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
```

- [ ] **Step 2: Write §10 Responsive**

Replace the `_(Task 10)_` line under `## 10. Responsive` with:

```markdown
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
.grid-12 { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--space-6); }
@media (max-width: 1023px) { .grid-12 { grid-template-columns: repeat(4, 1fr); gap: var(--space-4); } }
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
```

- [ ] **Step 3: Self-check §9 + §10**

§9: marketing, browser, detail, dashboard. ✓
§10: breakpoints, grid, touch targets, responsive patterns per layout. ✓

- [ ] **Step 4: Commit**

```bash
git add docs/DESIGN.md
git commit -m "phase-1: §9 Layout Templates + §10 Responsive"
```

---

## Task 11: §11 Accessibility + §12 Implementation

**Files:**
- Modify: `docs/DESIGN.md` (replace `_(Task 11)_` placeholders under §11 and §12)

- [ ] **Step 1: Write §11 Accessibility**

Replace the `_(Task 11)_` line under `## 11. Accessibility` with:

```markdown
### 11.1 Baseline

WCAG 2.1 AA across both themes. AAA where text is < 18pt and the surface allows.

**Verified by:**
- Color contrast: `docs/design-source/contrast-report.json` (auto-generated by oklch-skill — see §2)
- CI: `axe-core` against staging URL on every PR (`a11y-audit.yml` workflow per spec §7)
- Manual: keyboard-only navigation pass on top 5 pages each release

### 11.2 Focus management

Visible focus ring on every interactive element. Default: 2px outline using `--brand-sun-deep` at 60% opacity, 2px offset.

```css
*:focus-visible {
  outline: 2px solid oklch(74% 0.125 77 / 0.6);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

Never `outline: none` without a replacement. Don't rely on color alone — focus-visible adds outline AND may add subtle bg/border change.

### 11.3 Keyboard navigation

- `Tab` / `Shift+Tab` walks every interactive element in document order
- `Esc` closes modals, popovers, command palette
- `Enter` / `Space` activates buttons; `Enter` only on links
- Arrow keys for grid/list traversal where natural (cmd-K results, table rows in a focused tbody)
- Skip-to-content link as first element of every page (`<a href="#main" class="skip-link">Skip to content</a>`)

### 11.4 Semantic HTML

- One `<h1>` per page; subsequent headings descend without skipping levels
- `<main>`, `<nav>`, `<aside>`, `<footer>` landmarks on every page
- Lists are `<ul>` / `<ol>` (not divs); buttons are `<button>` (not divs); links are `<a>` (not buttons)
- `aria-label` only when no visible label is available
- `aria-live="polite"` on stat counters and async result regions

### 11.5 Reduced motion / contrast / language preferences

| Pref | Behavior |
|---|---|
| `prefers-reduced-motion: reduce` | All non-essential motion → `0.01ms` (per §6.3) |
| `prefers-contrast: more` | Darken body text, increase border weights, disable transparent surfaces |
| `prefers-color-scheme` | Initial theme signal if no `localStorage.theme` |
| `lang` attribute | Set on `<html>`; affects font (Latin-Ext for ES/PT/CA), date formatting, screen-reader voice |

### 11.6 Form a11y

- Every `<input>` has a visible `<label for="…">`
- Required fields marked `aria-required="true"` AND with visible asterisk
- Errors associated via `aria-describedby` to the field; announced via `aria-live="polite"` on the error region
- No client-side-only validation that's not also enforced server-side
```

- [ ] **Step 2: Write §12 Implementation**

Replace the `_(Task 11)_` line under `## 12. Implementation` with:

```markdown
### 12.1 Where the tokens live

| Token category | File | Format |
|---|---|---|
| Color (light + dark) | `packages/aggregator-ui/theme/tokens.css` | CSS custom properties under `:root` and `[data-theme="dark"]` |
| Gradients | `packages/aggregator-ui/theme/gradients.css` | CSS custom properties + utility classes |
| Typography | `packages/aggregator-ui/theme/typography.css` | CSS custom properties + `@font-face` imports |
| Spacing / radius / shadow | `packages/aggregator-ui/theme/spacing.css` | CSS custom properties |
| Tailwind config (consumes the above) | `packages/aggregator-ui/tailwind.config.ts` | Theme extension reading from CSS vars |

### 12.2 shadcn integration

shadcn/ui consumes our tokens via `tailwind.config.ts` theme extension. Run `npx shadcn@latest init` in `packages/aggregator-ui/` once during Phase 2; it generates the boilerplate. Then add components via `npx shadcn@latest add button card badge ...`.

The Phase 0 research found no skill-installer for shadcn. The manual `npx shadcn@latest` flow stays. Document it here so future contributors don't reinvent.

### 12.3 OKLCH manipulation

Use the installed `oklch-skill` (`/oklch-skill` in Claude Code) for:
- Deriving new shades when designing new components
- Generating accessible color pairs
- Verifying contrast on any token change
- Setting hex fallbacks for older browsers (CSS variables auto-emit hex via the skill)

### 12.4 Motion utilities

Default: `tailwindcss-animate` (shadcn convention).

Extension: `cmd-animate` from `impeccable.style` for entrance/exit primitives shadcn doesn't cover.

Don't ship `framer-motion` — current motion budget is well below where it pays off.

### 12.5 Storybook (or Astro-based showcase)

Phase 2 deliverable: `apps/storybook/` (Astro showcase) renders every primitive and composite pattern in both themes at every breakpoint. Updates on every PR via `visual-regression.yml` workflow (Playwright snapshot diffs vs baseline).

### 12.6 Token change protocol

1. Edit DESIGN.md (this file) — bump version + add changelog entry
2. Regenerate `tokens.css` via codemod or manual sync
3. Re-run `oklch-skill` contrast check; update `contrast-report.json` if any pair shifts
4. Run a11y CI suite
5. Bump `packages/aggregator-ui` version (Changesets — adds `.changeset/<slug>.md` describing the change)
6. Open PR; visual-regression CI flags any unintended downstream changes
```

- [ ] **Step 3: Self-check §11 + §12**

§11: WCAG baseline + verification, focus, keyboard, semantic HTML, prefers-* behavior, form a11y. ✓
§12: token locations, shadcn integration, oklch usage, motion libraries, storybook, change protocol. ✓

- [ ] **Step 4: Commit**

```bash
git add docs/DESIGN.md
git commit -m "phase-1: §11 Accessibility + §12 Implementation"
```

---

## Task 12: Inspiration references doc + final review checkpoint

**Files:**
- Create: `docs/design-source/inspiration-references.md`
- Modify: `docs/DESIGN.md` (verify §0 inspiration-references link resolves)
- Modify: `docs/plans/QUEUE.md` (mark Phase 1 completed; queue Phase 2)
- Modify: `memory/2026-05-03.md` (or `memory/<phase-1-end-date>.md` if spans days) — append Phase 1 completion entry

- [ ] **Step 1: Write `docs/design-source/inspiration-references.md`**

Create `docs/design-source/inspiration-references.md`:

```markdown
# Inspiration References — Aggregator Design System

Citations for sources informing `docs/DESIGN.md`. Each entry: what we drew from it, where it's cited in DESIGN.md.

## Layout & polish

### Supabase (https://supabase.com)
- **Drew:** Layout polish, content density, hover treatments on dashboard surfaces
- **Cited in DESIGN.md:** §9 Layout templates, §7.5 Combobox treatment
- **Specifically:** the way Supabase pairs warm accent fills with restrained neutral surfaces; the dashboard layout's clear stat row → chart grid → table descent

## Component architecture

### shadcn/ui (https://ui.shadcn.com)
- **Drew:** Component anatomy + variant philosophy; the entire primitive layer
- **Cited in DESIGN.md:** §7 (every primitive), §12.2 (integration approach)
- **Specifically:** the shadcn pattern of composing Radix primitives with Tailwind utilities, exposing variants via `class-variance-authority`

## Document structure

### awesome-design-md (https://github.com/VoltAgent/awesome-design-md)
- **Drew:** Doc skeleton inspiration; section ordering convention
- **Cited in DESIGN.md:** Overall structure, §0 source-of-truth pointer pattern
- **Specifically reviewed:** Vercel DESIGN.md (https://getdesign.md/vercel/design-md), Linear DESIGN.md (https://getdesign.md/linear.app/design-md)
- **What we adapted vs. didn't:**
  - Adapted: 9-section Stitch format → expanded to 12 sections (added Motion, Composite Patterns, Implementation as first-class sections rather than appendices)
  - Didn't adopt: hex-only token format (we use OKLCH-first per spec)

## Color philosophy

### OKLCH explainer (https://oklch.com)
- **Drew:** Reasoning behind OKLCH-first choice (perceptual uniformity, predictable lightness ramps, future-CSS support)
- **Cited in DESIGN.md:** §2 (token system), §12.3 (oklch-skill usage)

## Visualization

### Region Atlas (per RC Council Sync 2026-02-06)
- **Drew:** Node-graph viz reference; possibly direct embed for production
- **Cited in DESIGN.md:** §8.2 NodeOrb pattern (architectural reference)
- **Possibly embed:** Phase 3 RC Network page — see spec §8.5 deliverable

## Brand foundations

### `brand-guidelines` skill (anthropics/skills)
- **Drew:** Template structure for §1 Brand Foundations
- **Cited in DESIGN.md:** §1 (entire section is structured per the skill's template, with Anthropic-specific defaults replaced by RC's wordmark/tagline/mark)

## Motion utilities

### cmd-animate (https://impeccable.style/#cmd-animate)
- **Drew:** Lightweight CSS-keyframe motion primitives that don't require framer-motion
- **Cited in DESIGN.md:** §6.5 (library), §12.4 (motion utilities)
- **Used for:** entrance/exit primitives shadcn's tailwindcss-animate doesn't cover

## Brand inputs (canonical)

These are the source assets — not external inspiration but the actual brand we're building from. Listed here for completeness:

- Logo: `docs/design-source/brand/logo-orb.jpg`
- Banner: `docs/design-source/brand/banner-hero.jpg`
- Sampled OKLCH stops: `docs/design-source/brand-extract.json`
- Figma reference (brand-asset frames only): `docs/design-source/figma-extract.json`

---

_Update this doc whenever a new inspiration source meaningfully shapes a DESIGN.md decision._
```

- [ ] **Step 2: Verify the §0 inspiration-references link resolves**

Run: `grep -n "inspiration-references" docs/DESIGN.md`
Expected: at least one match in §0 pointing to `design-source/inspiration-references.md`.

If the link doesn't exist, add it under §0 Inputs:

```markdown
- Inspiration references: [`docs/design-source/inspiration-references.md`](design-source/inspiration-references.md)
```

(Already present per Task 1's skeleton — this step is a verification.)

- [ ] **Step 3: Update QUEUE.md — mark Phase 1 completed, Phase 2 queued**

Edit `docs/plans/QUEUE.md`. Find the aggregator initiative block under `## Active`. Update the Phase 1 entry from `⏭` to `✅`:

```markdown
- ✅ **Phase 1** — DESIGN.md drafting — completed YYYY-MM-DD — see [`docs/DESIGN.md`](../DESIGN.md), [`docs/plans/2026-05-03-skills-curation.md`](2026-05-03-skills-curation.md)
- ⏭ **Phase 2** — Monorepo scaffold + `aggregator-ui` foundation — **next plan to write** (invoke `superpowers:writing-plans` against spec §8 Phase 2)
```

- [ ] **Step 4: Append Phase 1 completion entry to memory log**

Open the most recent `memory/YYYY-MM-DD.md` (or create today's if older). Append:

```markdown
## Phase 1 — DESIGN.md drafting (aggregator) — complete

- DESIGN.md: 12 sections, ~10–15 pages, style-guide-grade
- Brand pivot from MASTERPLAN's dark-tech to actual sky-to-sun gradient locked in
- Color tokens OKLCH-first; both light + dark themes WCAG AA verified (`docs/design-source/contrast-report.json`)
- Component primitives: 12 shadcn-aligned (Button, Card, Badge, Input, Select, Combobox, Command, Tabs, Accordion, Dialog, Popover, Tooltip, Table)
- Composite patterns: 8 aggregator-specific (GradientHero, NodeOrb, InitiativeCard, FundingCard, EventCard, FilterBar, CapitalFlowDiagram, CouncilTimelineEntry)
- Inspiration sources documented at `docs/design-source/inspiration-references.md`
- Phase 0 skills used: oklch-skill (color), frontend-design (components), brand-guidelines (template)
- Next: Phase 2 — monorepo scaffold + aggregator-ui foundation (write plan, then execute)
```

- [ ] **Step 5: Commit**

```bash
git add docs/design-source/inspiration-references.md docs/plans/QUEUE.md memory/2026-05-03.md docs/DESIGN.md
git commit -m "phase-1: inspiration references + queue update + memory log (Phase 1 complete)"
```

- [ ] **Step 6: Operator review checkpoint**

Output to terminal:

```
Phase 1 complete. Deliverables:

  docs/DESIGN.md                                ~10–15 pages, 12 sections
  docs/design-source/inspiration-references.md  ~50 lines, 7 source citations
  docs/design-source/contrast-report.json       light + dark, all pairs WCAG AA verified
  docs/plans/QUEUE.md                            Phase 1 ✅, Phase 2 queued
  memory/<date>.md                               session log entry appended

Please review docs/DESIGN.md before Phase 2 starts.
Specifically check:
  - §1 Brand voice — does it sound like the network?
  - §2 Color tokens — do the dark-theme stops feel like "Regen Coordination at night"?
  - §7 Component primitives — anything missing for our planned page IA?
  - §8 Composite patterns — anything missing for the 6 RC + 5 ecosystem nav surfaces?

Once approved, run: invoke writing-plans against spec §8 Phase 2.
```

Wait for operator response. If changes requested, edit inline and re-commit per change. Phase 2 plan does not start until Phase 1 is approved.

---

## Self-review checklist (run after writing the plan)

- [x] **Spec coverage:** Each of the 12 DESIGN.md sections in spec §5.2 maps to a task above (§0→T1, §1→T2, §2→T3+T4, §3+§4→T5, §5+§6→T6, §7→T7+T8, §8→T9, §9+§10→T10, §11+§12→T11, supporting docs+review→T12). All Phase 1 deliverables in spec §8 covered (DESIGN.md ✓, brand assets ✓ already exist, brand-extract.json ✓ already exists, inspiration-references.md ✓ T12, reference images per pattern → adequately covered by the brand assets + hyperlinks; if needed, can add an addendum task during execution).
- [x] **No placeholders:** Every step contains actual content. The `[Insert table generated by oklch-skill]` placeholders in T3+T4 are intentional — they reference a tool's output that's deterministic only at runtime; the surrounding section structure and the constraint set are fully specified.
- [x] **Type / name consistency:** Token names consistent across tasks (`--brand-sky`, `--brand-horizon`, `--brand-pasture`, `--brand-sun`, `--brand-sun-deep`); component names PascalCase consistent (`GradientHero`, `NodeOrb`, etc.); file paths consistent (`packages/aggregator-ui/theme/tokens.css`, `docs/design-source/contrast-report.json`).
- [x] **Bite-sized:** For a writing phase, each task is one DESIGN.md section (or two paired small ones); steps within tasks remain 2–5 minute units (read reference → draft → self-check → commit). Heavier tasks (color tokens) split across two tasks (light, then dark).
- [x] **TDD adaptation:** Phase 1 is documentation, not code — TDD doesn't apply. Replaced with self-check-against-spec pattern after each section.
- [x] **Frequent commits:** 12 commits, one per task, each tagged `phase-1: §<n> <name>`.
- [x] **Skill usage explicit:** Tasks 2, 3, 4, 7, 9 explicitly invoke installed skills (brand-guidelines, oklch-skill, frontend-design). Tasks not requiring a skill don't fake one.

---

## Out of scope for this plan

- **Token CSS generation** — Phase 2 deliverable. DESIGN.md defines the tokens; `packages/aggregator-ui/theme/tokens.css` implements them (next plan).
- **Actual shadcn component code** — Phase 2 deliverable. DESIGN.md specs the primitives; the components themselves arrive in Phase 2.
- **Storybook setup** — Phase 2 deliverable. DESIGN.md mentions storybook in §12.5; the app itself is built next phase.
- **Screenshots / visual mockups beyond the existing brand assets** — out of scope unless a section is genuinely unclear without one. Most sections are token-definition or component-anatomy work, where text + tables suffice. If during execution a section would benefit from a mockup, add a small task; otherwise text-only.
