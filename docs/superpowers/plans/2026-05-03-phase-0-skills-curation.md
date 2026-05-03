# Phase 0 Skills Curation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Curate the agent skills + library candidates needed to build the Regen Coordination aggregators (per `docs/superpowers/specs/2026-05-03-aggregator-design.md`), producing a single ranked decision doc that every later phase audits against.

**Architecture:** Three parallel research agents scan public skill marketplaces (`agentskills.io`, `skills.sh`, `github.com/VoltAgent/awesome-design-md`) against the design spec's domain list. Their structured reports feed a single triage step that produces install/defer/drop verdicts. Operator approves the install set before any installation runs. Outputs a curation doc + a session log entry.

**Tech Stack:** Pure research + decision phase — no code. Tools: Agent dispatch (Task / Explore subagents), WebFetch for marketplace pages, Read/Write/Edit for doc creation, Bash for skill installation commands.

---

## File Structure

| File | Created/Modified | Responsibility |
|---|---|---|
| `docs/plans/2026-05-03-skills-curation.md` | **Create** | The canonical curation doc — ranked candidates + chosen install set + deferred list + dropped list + promotion contract |
| `memory/2026-05-03.md` | **Modify** (append) | Session log entry recording curation results |
| `.agents/skills/<skill-name>/` | **Create** (per chosen skill) | Skill files installed into this instance |
| `docs/plans/QUEUE.md` | **Modify** | Mark Phase 0 active when started, completed when done; queue Phase 1 |

---

## Task 1: Create the curation doc skeleton

**Files:**
- Create: `docs/plans/2026-05-03-skills-curation.md`

- [ ] **Step 1: Write the doc skeleton with all sections empty**

```markdown
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
```

- [ ] **Step 2: Verify file written**

Run: `wc -l "docs/plans/2026-05-03-skills-curation.md"`
Expected: ~60 lines (skeleton)

- [ ] **Step 3: Commit**

```bash
git add docs/plans/2026-05-03-skills-curation.md
git commit -m "phase-0: scaffold skills-curation doc skeleton"
```

---

## Task 2: Dispatch research agent — agentskills.io

**Files:**
- Modify: `docs/plans/2026-05-03-skills-curation.md` (append agent report under "Research agent reports")

- [ ] **Step 1: Dispatch a `general-purpose` agent**

Use the Agent tool with `subagent_type: "general-purpose"`. Prompt:

```
Research task — read-only, structured report only.

Context: I'm curating agent skills (Claude/Cursor/Copilot-style skills with SKILL.md files) for an Astro + React + shadcn/ui + OKLCH design-system project. Domain list (from design spec §6):
  - Frontend (Astro)
  - Component library (shadcn/ui)
  - Design system (OKLCH color, type scale, spacing, motion)
  - Data adapters (federation YAML, GitHub, Gitcoin, CSV, iCal)
  - Schema validation (Zod)
  - Deploy (GitHub Pages, Vercel, GitHub Actions)
  - Accessibility (WCAG AA)
  - Testing (Vitest, Playwright)
  - Documentation (design-md template, storybook)

Your job: scan agentskills.io for skills matching any of these domains.

For each candidate (cap at 8), return as a structured table with these columns:
  | name | domain match | source URL | install command (if shown) | one-line fitness assessment | compatibility notes |

Rank by fitness for our domains. If the site has a search/filter UI, use it to find candidates per domain. If a skill is for a non-shadcn / non-Astro stack, note it but don't drop yet — assessment is the triage step's job.

Brief format: under 600 words. Do not editorialize beyond fitness lines. Do not propose to install or modify anything.

If the site is unreachable or returns errors, report that clearly with the exact error and stop.
```

- [ ] **Step 2: Append the agent's report to the curation doc**

Edit `docs/plans/2026-05-03-skills-curation.md` — under "Research agent reports", add:

```markdown
### agentskills.io scan (Task 2)

_Dispatched: 2026-05-03 [HH:MM]_
_Agent: general-purpose_

[paste the agent's structured report here verbatim]
```

- [ ] **Step 3: Commit**

```bash
git add docs/plans/2026-05-03-skills-curation.md
git commit -m "phase-0: agentskills.io scan results"
```

---

## Task 3: Dispatch research agent — skills.sh

**Files:**
- Modify: `docs/plans/2026-05-03-skills-curation.md`

- [ ] **Step 1: Dispatch a `general-purpose` agent**

Use the Agent tool with `subagent_type: "general-purpose"`. Same prompt as Task 2 but substitute the source:

```
[same context block as Task 2]

Your job: scan skills.sh for skills matching any of these domains.

[same table format, ranking, and constraints as Task 2]
```

- [ ] **Step 2: Append the agent's report to the curation doc**

Add a `### skills.sh scan (Task 3)` section under "Research agent reports".

- [ ] **Step 3: Commit**

```bash
git add docs/plans/2026-05-03-skills-curation.md
git commit -m "phase-0: skills.sh scan results"
```

---

## Task 4: Dispatch research agent — awesome-design-md + Anthropic catalog + oklch.fyi

**Files:**
- Modify: `docs/plans/2026-05-03-skills-curation.md`

- [ ] **Step 1: Dispatch a `general-purpose` agent**

Use the Agent tool with `subagent_type: "general-purpose"`. Prompt:

```
[same context block as Task 2]

Your job: scan THREE sources and return one combined report:

1. github.com/VoltAgent/awesome-design-md — find:
   - design.md templates suitable for a style-guide-grade design system doc (~10–15 pages, OKLCH colors, shadcn-aligned components)
   - any design-system skills referenced

2. github.com/anthropics/skills (Anthropic's official skill catalog if it exists) — find skills matching our domain list

3. oklch.fyi (the operator referenced "oklch.fyi/skill" — find the actual skill page or its install instructions)

For each candidate (cap at 8 total across all 3 sources), return:
  | name | source | source URL | install command | one-line fitness | compatibility notes |

Rank by fitness for our domains.

Brief format: under 700 words.
```

- [ ] **Step 2: Append the agent's report to the curation doc**

Add a `### awesome-design-md + Anthropic + oklch.fyi scan (Task 4)` section.

- [ ] **Step 3: Commit**

```bash
git add docs/plans/2026-05-03-skills-curation.md
git commit -m "phase-0: awesome-design-md + Anthropic + oklch.fyi scan results"
```

---

## Task 5: Triage candidates and produce ranked install/defer/drop lists

**Files:**
- Modify: `docs/plans/2026-05-03-skills-curation.md`

- [ ] **Step 1: Read all three research agent reports from the doc**

Read `docs/plans/2026-05-03-skills-curation.md` end-to-end. Note all unique candidates across the three reports.

- [ ] **Step 2: Apply triage criteria**

For each candidate, assign a verdict:

- **INSTALL** if all of:
  1. Domain match is direct (covers a spec §6 need with no overlap with already-installed skills)
  2. No major framework conflict (works with Astro/React/shadcn or is framework-agnostic)
  3. Active maintenance signal (recent commits OR official source)
  4. License is permissive (MIT, Apache 2.0, BSD)

- **DEFER** if:
  - Domain match is real but covered by a Phase 3+ need (not immediately blocking)
  - Or works but adds non-trivial peer-dep weight; revisit when needed
  - Or two skills cover the same domain — pick one, defer the alternate

- **DROP** if:
  - Wrong framework (e.g., Vue-only when we're on React)
  - Abandoned (no commits in 12+ months)
  - Redundant with an already-installed superpowers skill
  - License incompatible (GPL, proprietary)

Target distribution: **4–6 INSTALL, 4–8 DEFER, rest DROP.**

- [ ] **Step 3: Fill the three sections in the curation doc**

Edit `docs/plans/2026-05-03-skills-curation.md`. Replace the placeholders:

```markdown
## Implementation skills — INSTALL

| Skill | Source | Install command | Why |
|---|---|---|---|
| <name> | <url> | `<cmd>` | <one-line fitness — why this and not alternates> |
| ... | ... | ... | ... |

## Implementation skills — DEFER

| Skill | Source | Reason to defer | Revisit at |
|---|---|---|---|
| <name> | <url> | <reason> | Phase X |
| ... | ... | ... | ... |

## Candidates dropped

| Skill | Source | Reason dropped |
|---|---|---|
| <name> | <url> | <reason> |
| ... | ... | ... |
```

Also update the "Inspiration / library references" section if research surfaced any new ones not already in spec §6.3.

- [ ] **Step 4: Self-check the triage**

Verify:
- Each INSTALL row has a clear "why this and not alternates" line
- Each DEFER row names the phase to revisit
- Each DROP row has a verifiable reason
- Total counts are in the target range (4–6 / 4–8 / rest)

If counts are off:
- Too few INSTALL → the design spec may have under-specified domains; surface back
- Too few candidates → re-run Tasks 2–4 with broader prompts (add "GitHub topic searches", "package registries")

- [ ] **Step 5: Commit**

```bash
git add docs/plans/2026-05-03-skills-curation.md
git commit -m "phase-0: triage candidates — install/defer/drop verdicts"
```

---

## Task 6: Operator approval gate

**Files:**
- (none — this is a synchronous checkpoint)

- [ ] **Step 1: Present the INSTALL list to the operator**

Output to terminal a tight summary:

```
Phase 0 triage complete. Proposed installs (N skills):

  1. <skill-1> — <one-line why>
  2. <skill-2> — <one-line why>
  ...

Defer: N skills (revisit Phase 3/4/5)
Drop: N candidates (incompatible / abandoned / redundant)

Full doc: docs/plans/2026-05-03-skills-curation.md

Approve install list as-is, or flag changes (add/remove specific skills)?
```

- [ ] **Step 2: Wait for operator response**

If operator approves → proceed to Task 7.
If operator requests changes → adjust the INSTALL/DEFER/DROP table per their input, re-commit (`phase-0: adjust install list per operator feedback`), and re-present until approved.

---

## Task 7: Install the chosen skills

**Files:**
- Create: one directory per chosen skill under `.agents/skills/<skill-name>/` (or platform-equivalent location)

- [ ] **Step 1: For each row in INSTALL, run its install command**

For each skill in the INSTALL table (use the `install command` cell verbatim):

```bash
# Example install command shape — actual commands per cell:
# git clone https://github.com/<owner>/<skill-repo>.git .agents/skills/<skill-name>
# OR npx <some-cli> install <skill-name>
# OR a manual file copy if the skill is a single SKILL.md
```

Run each one. Capture stdout/stderr.

- [ ] **Step 2: Verify each install**

For each installed skill, confirm:

```bash
ls -la ".agents/skills/<skill-name>/SKILL.md"
```

Expected: file exists, non-zero size.

If a skill is in a different platform-specific location (e.g., `.claude/skills/`, `~/.claude/skills/`), use that path instead — but document the actual install path in the curation doc.

- [ ] **Step 3: Update the INSTALL table with verification status**

Edit `docs/plans/2026-05-03-skills-curation.md`. Add an "Installed at" column to the INSTALL table:

```markdown
| Skill | Source | Install command | Why | Installed at |
|---|---|---|---|---|
| <name> | <url> | `<cmd>` | <why> | `.agents/skills/<name>/` |
```

If any install **failed**, move that row to DEFER with reason `install failed: <error>`.

- [ ] **Step 4: Commit**

```bash
git add .agents/skills/ docs/plans/2026-05-03-skills-curation.md
git commit -m "phase-0: install chosen skills + verify paths"
```

---

## Task 8: Log to memory and update plan queue

**Files:**
- Modify: `memory/2026-05-03.md` (append session entry)
- Modify: `docs/plans/QUEUE.md` (mark Phase 0 completed; queue Phase 1)

- [ ] **Step 1: Append memory entry**

Append to `memory/2026-05-03.md`:

```markdown
## Phase 0 — Skills curation (aggregator)

- Initiative: Regen Coordination aggregator(s) — see `docs/superpowers/specs/2026-05-03-aggregator-design.md`
- Curation doc: `docs/plans/2026-05-03-skills-curation.md`
- Sources scanned: agentskills.io, skills.sh, github.com/VoltAgent/awesome-design-md, github.com/anthropics/skills, oklch.fyi
- Installed: <N> skills (<comma-separated names>)
- Deferred: <N>
- Dropped: <N>
- Time: ~<N> hours
- Next: Phase 1 — DESIGN.md drafting (see spec §8)
```

If `memory/2026-05-03.md` doesn't exist yet, create it with the standard header from the org-os memory convention.

- [ ] **Step 2: Update plan queue**

Edit `docs/plans/QUEUE.md`:
- If Phase 0 entry exists, change its status to `completed`
- Add a Phase 1 entry under Active or Queued (per QUEUE.md conventions)

If QUEUE.md doesn't have explicit aggregator-phase entries yet, add this block at the top of the active/queued section:

```markdown
### Aggregator initiative (per `docs/superpowers/specs/2026-05-03-aggregator-design.md`)

- ✅ Phase 0: Skills curation — completed 2026-05-03 — see `docs/plans/2026-05-03-skills-curation.md`
- ⏭ Phase 1: DESIGN.md drafting — queued (next plan to write)
- ⏭ Phase 2: Monorepo scaffold + aggregator-ui foundation
- ⏭ Phase 3: aggregator-data + RC app
- ⏭ Phase 4: Open ecosystem app + 3 example instances
- ⏭ Phase 5: Polish + a11y + launch
- ⏭ Phase 6: Org-os promotion retrospective
```

- [ ] **Step 3: Commit**

```bash
git add memory/2026-05-03.md docs/plans/QUEUE.md
git commit -m "phase-0: memory log + queue update"
```

- [ ] **Step 4: Report completion**

Output to terminal:

```
Phase 0 complete.

  Installed:  <N> skills
  Deferred:   <N>
  Dropped:    <N>
  Curation:   docs/plans/2026-05-03-skills-curation.md
  Memory:     memory/2026-05-03.md
  Queue:      docs/plans/QUEUE.md (Phase 1 queued)

Ready to write Phase 1 implementation plan (DESIGN.md drafting).
Run: invoke writing-plans against the design spec, scoped to Phase 1.
```

---

## Self-review checklist (run after writing the plan)

- [x] **Spec coverage:** Every Phase 0 deliverable in spec §8 is implemented by a task above (curation doc → Tasks 1–7; promotion contract → Task 1 + Task 5; memory log → Task 8; operator approval → Task 6)
- [x] **No placeholders:** All steps contain actual content. Templates use angle-bracket placeholders that get filled by agent reports — these are intentional template slots, not "TODO"-style placeholders
- [x] **Type / name consistency:** Curation doc filename consistent across all tasks (`docs/plans/2026-05-03-skills-curation.md`); skill install path consistent (`.agents/skills/<name>/`); commit message prefixes consistent (`phase-0: ...`)
- [x] **Bite-sized:** Each step is 2–5 minutes; no step combines two distinct actions
- [x] **TDD adaptation:** Phase 0 is research+decisions+install rather than code, so TDD doesn't apply — replaced with verify-after-each-action pattern (verify-file-written, verify-install-paths)
- [x] **Frequent commits:** Each task ends with a commit; 8 commits total for Phase 0

---

## Out of scope for this plan

- **Phase 1 (DESIGN.md drafting)** — gets its own plan after Phase 0 completes. The chosen design-md template + oklch skill in Phase 0 will shape its structure.
- **Phase 2+ (build phases)** — get plans written iteratively as the prior phase completes. Each phase plan is informed by what's actually installed.
- **Skill marketplace registration** — installing skills here doesn't publish them. That's part of Phase 6 (org-os promotion retrospective).
- **License audit** — we check licenses during triage (Task 5) but a full SBOM-style audit is out of scope until Phase 5 launch prep.
