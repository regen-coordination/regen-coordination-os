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

_(populated by Tasks 2–4 — raw research output preserved for audit)_
