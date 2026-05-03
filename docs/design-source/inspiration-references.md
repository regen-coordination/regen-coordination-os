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
