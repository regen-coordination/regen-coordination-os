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
