# Skills Curation — Regen Coordination Aggregators

**Date:** 2026-05-03
**Initiative:** [Aggregator Design Spec](../superpowers/specs/2026-05-03-aggregator-design.md)
**Curated by:** skills-curator skill (org-os/skills/skills-curator/SKILL.md), dispatched research agents

## Domains in scope

Pulled from §6 of the design spec:

- **Frontend framework**: Astro + React islands
- **Component library**: shadcn/ui
- **Design system**: OKLCH color tokens, modular type scale, spatial system, motion
- **Data adapters**: federation YAML, GitHub API, Gitcoin API, CSV, iCal/events
- **Schema validation**: Zod
- **Deploy**: GitHub Pages + Vercel, GitHub Actions cron
- **Accessibility**: WCAG 2.1 AA verification
- **Testing**: Vitest, Playwright (visual regression — Phase 5)
- **Documentation**: design-md template, storybook

## Process skills (already available, no install)

| Skill | Used for | Phase |
|---|---|---|
| superpowers:brainstorming | Already used | Phase 1 brainstorm (done) |
| superpowers:writing-plans | This document | Phase 1+ planning |
| superpowers:executing-plans | Per-phase execution | All build phases |
| superpowers:dispatching-parallel-agents | Phase 0 research, Phase 3 page parallelization | Phase 0, Phase 3 |
| superpowers:test-driven-development | Adapter tests, schema validation | Phase 3+ |
| superpowers:verification-before-completion | Per-phase checkpoints | All phases |
| superpowers:requesting-code-review | Pre-merge | All phases |

## Implementation skills — INSTALL

_(populated by Task 5)_

## Implementation skills — DEFER

_(populated by Task 5)_

## Candidates dropped

_(populated by Task 5)_

## Inspiration / library references (npm deps, not skills)

_(populated by Task 5 — copied from spec §6.3 with any additions found during research)_

## Promotion contract

After v1 of the aggregator ships (per spec §8 Phase 6 retrospective), each installed skill gets a verdict:

- **Promote** — works as expected → standard org-os skill in `org-os/skills/`
- **Improve-then-promote** — needs fix or fork before promotion
- **Drop** — didn't deliver value; uninstall

Retrospective doc: `docs/plans/2026-XX-XX-aggregator-retrospective.md` (created by retrospective skill at v1 launch)

## Sources scanned

- agentskills.io
- skills.sh
- github.com/VoltAgent/awesome-design-md
- github.com/anthropics/skills (Anthropic catalog, if discoverable)
- oklch.fyi/skill (specific skill the operator referenced)

## Research agent reports

### agentskills.io scan (Task 2)

_Dispatched: 2026-05-03_
_Agent: general-purpose (sonnet)_

**Result: NO CANDIDATES.**

agentskills.io is a documentation/specification hub for the Agent Skills open format, **not a skill marketplace**. It contains 9 documentation pages across 3 categories (overview, implementation, skill creation) and a client showcase of ~35 agent tools that support the format. No catalog, no registry, no browse page, no search functionality. All domain queries (`?q=astro`, `?q=shadcn`, etc.) returned the homepage unchanged. `/skills`, `/registry`, `/catalog` all 404.

The linked GitHub repo (`github.com/agentskills/agentskills`) contains only the format spec and a Python reference library — no skill directory.

**Conclusion:** agentskills.io cannot be used as a curation source. Listed in the spec §6.1 in error; should be removed from default sources in `skills-curator` skill (action item for retrospective).

---

### skills.sh scan (Task 3)

_Dispatched: 2026-05-03_
_Agent: general-purpose (sonnet)_

**Site summary:** skills.sh is a Vercel-hosted directory of 91,000+ agent skills installable via `npx skills add <owner/repo/skill>`, covering frontend, cloud, design, and testing domains across Claude Code, Cursor, Copilot, and 20+ other agents.

| name | domain match | source URL | install command | one-line fitness assessment | compatibility notes |
|---|---|---|---|---|---|
| **web-design-guidelines** (vercel-labs) | Design system, Accessibility | https://skills.sh/vercel-labs/agent-skills/web-design-guidelines | `npx skills add vercel-labs/agent-skills/web-design-guidelines` | Audits UI code against Vercel's interface guidelines for design + accessibility compliance; closest match for WCAG 2.1 AA enforcement in a React/component context | React-centric, no explicit Astro or OKLCH coverage; accessibility audit is heuristic-based not automated runner |
| **frontend-design** (anthropics) | Design system, OKLCH-adjacent, Motion | https://skills.sh/anthropics/skills/frontend-design | `npx skills add anthropics/skills/frontend-design` | Enforces bold color/typography/motion choices with CSS-variable theming; useful for design-token authoring discipline | No OKLCH, Astro, or shadcn specifics; covers CSS-var patterns applicable to any framework |
| **webapp-testing** (anthropics) | Playwright, Visual regression | https://skills.sh/anthropics/skills/webapp-testing | `npx skills add anthropics/skills/webapp-testing` | Playwright automation with server lifecycle management; covers the Playwright half of the test stack | Python-based scripts; no Vitest, no accessibility assertions, no visual-diff runner out of the box |
| **vercel-react-best-practices** (vercel-labs) | React component patterns | https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices | `npx skills add vercel-labs/agent-skills/vercel-react-best-practices` | 70 rules across bundle, SSR, re-render, and async patterns; useful if Astro islands use React | React/Next.js only; no shadcn, Zod, accessibility, or design-system rules |
| **deploy-to-vercel** (vercel-labs) | Deploy: Vercel, GitHub Actions | https://skills.sh/vercel-labs/agent-skills/deploy-to-vercel | `npx skills add vercel-labs/agent-skills/deploy-to-vercel` | Handles git-push, CLI, and sandbox deployment paths with preview URL generation; covers Vercel target | Astro is listed as a supported framework; no GitHub Pages or cron workflow coverage |
| **theme-factory** (anthropics) | Design tokens, Color palettes | https://skills.sh/anthropics/skills/theme-factory | `npx skills add anthropics/skills/theme-factory` | Provides hex-coded color palettes with font pairings; weak fit but closest to token-level color curation | No OKLCH, no shadcn CSS-var integration, scoped to presentation decks/docs rather than component libraries |
| **vercel-react-view-transitions** (vercel-labs) | Motion / animation | https://skills.sh/vercel-labs/agent-skills/vercel-react-view-transitions | `npx skills add vercel-labs/agent-skills/vercel-react-view-transitions` | Covers browser-native `startViewTransition` patterns in React; partially addresses motion | Astro has its own `<ViewTransitions>` primitive; this skill is React-specific and won't map cleanly |
| **vercel-composition-patterns** (vercel-labs) | Component library patterns | https://skills.sh/vercel-labs/agent-skills/vercel-composition-patterns | `npx skills add vercel-labs/agent-skills/vercel-composition-patterns` | Component architecture patterns (157.6K installs); no description returned, likely covers compound components/slots | No detail available on shadcn compatibility; React-focused |

**Noteworthy gaps:** No skills for Astro (as a first-class framework), shadcn/ui specifics, OKLCH color tokens, Zod, Vitest, GitHub Pages, iCal/data adapters, or Storybook. The search endpoint renders client-side only — gaps may reflect actual absence rather than retrieval failure.

---

### awesome-design-md + Anthropic catalog + oklch.fyi scan (Task 4)

_Dispatched: 2026-05-03_
_Agent: general-purpose (sonnet)_

**Source 1 — VoltAgent/awesome-design-md:** Reachable. A curated collection of 71 DESIGN.md files extracted from real websites (Vercel, Linear, etc.); no agent skills, only ready-to-copy design-system documents in the Google Stitch DESIGN.md format. No OKLCH-specific file exists, but several entries document modular type/spacing/color in formats LLMs consume directly.

**Source 2 — anthropics/skills:** Reachable. Repo at `github.com/anthropics/skills` with 17 skill folders; installable via `/plugin marketplace add anthropics/skills` in Claude Code or via the Skills API. Most relevant for our domains: `frontend-design`, `theme-factory`, `webapp-testing`, `brand-guidelines`, `canvas-design`.

**Source 3 — oklch.fyi/skill:** Page renders correctly. Skill exists, authored by `jakubkrehel`. Install: `npx skills add jakubkrehel/oklch-skill`. Actions: color conversion to OKLCH, palette generation, contrast checking, gamut clamping, fallback setup. Works across Claude Code, Codex, and Cursor Agent.

| name | source | source URL | install command | one-line fitness | compatibility notes |
|---|---|---|---|---|---|
| **oklch-skill** | oklch.fyi | https://oklch.fyi/skill | `npx skills add jakubkrehel/oklch-skill` | Converts project colors to OKLCH, generates palettes, checks contrast, clamps gamut, sets fallbacks — direct match for OKLCH design-system token work | Claude Code, Codex, Cursor; run `/oklch-skill` after install |
| **frontend-design** | anthropics/skills | https://github.com/anthropics/skills/tree/main/skills/frontend-design | `/plugin install example-skills@anthropic-agent-skills` | Production-grade UI generation with explicit accessibility/typography/spacing discipline; covers Astro + React component output | Claude Code plugin marketplace; Apache 2.0 |
| **theme-factory** | anthropics/skills | https://github.com/anthropics/skills/tree/main/skills/theme-factory | `/plugin install example-skills@anthropic-agent-skills` | Applies color/font themes to any artifact; 10 presets + on-the-fly generation; useful for shadcn theme variants | Claude Code; Apache 2.0 |
| **webapp-testing** | anthropics/skills | https://github.com/anthropics/skills/tree/main/skills/webapp-testing | `/plugin install example-skills@anthropic-agent-skills` | Playwright-based frontend testing: visual verification, screenshot capture, browser logs — covers Playwright visual regression requirement | Claude Code; Apache 2.0; requires local Python + Playwright |
| **canvas-design** | anthropics/skills | https://github.com/anthropics/skills/tree/main/skills/canvas-design | `/plugin install example-skills@anthropic-agent-skills` | Generates static visual artifacts (PNG/PDF) from design-philosophy prompts; useful for design-system preview generation | Claude Code; Apache 2.0; outputs .md/.pdf/.png only |
| **brand-guidelines** | anthropics/skills | https://github.com/anthropics/skills/tree/main/skills/brand-guidelines | `/plugin install example-skills@anthropic-agent-skills` | Applies a defined brand's color + typography to any artifact; template for encoding our own OKLCH + shadcn token set | Claude Code; Apache 2.0; Anthropic-specific defaults, needs replacement |
| **Vercel DESIGN.md** | VoltAgent/awesome-design-md | https://getdesign.md/vercel/design-md | Manual copy into project root | Precision black-and-white design system aligned with Geist font; sections cover color roles, type scale, component states, spacing, responsive — 9-section Stitch format, ~style-guide grade | Any LLM/agent reading project root; hex tokens only, no OKLCH |
| **Linear DESIGN.md** | VoltAgent/awesome-design-md | https://getdesign.md/linear.app/design-md | Manual copy into project root | Ultra-minimal, purple-accent system with strong component-state and spacing coverage; closest available to shadcn/ui aesthetic | Any LLM/agent reading project root; hex tokens only, no OKLCH |

**oklch.fyi specific note:** Skill exists and is live. Author: `jakubkrehel`. Install: `npx skills add jakubkrehel/oklch-skill`. A companion skill ("Make Interfaces Feel Better") is also referenced on the same page but has a separate URL with no install command in visible content.

**Noteworthy gaps:**
- No skill found for Zod schema validation, GitHub/Gitcoin API adapters, or iCal/CSV data parsing.
- No skill found for Astro-specific patterns (islands architecture, content collections, SSG/SSR config).
- No skill found for GitHub Actions cron or Vercel deploy pipeline automation (other than `deploy-to-vercel` from skills.sh).
- DESIGN.md files in awesome-design-md use hex tokens, not OKLCH; manual conversion required to align with our token spec.
