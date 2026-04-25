---
title: "Regen Coordination — Vault Context Bootstrap"
project: regen-coordination-os
date: 2026-04-25
status: queued
related:
  - docs/plans/regen-toolkit-vault-bootstrap.md  # parallel plan for toolkit
  - memory/koi_intake_blocked_on_refi_dao.md     # KOI gate
methodology:
  - "superpowers:writing-plans (this doc)"
  - "superpowers:executing-plans (when run)"
  - "skills/meeting-processor (per-meeting execution)"
---

# Plan A — Vault → Regen Coordination Bootstrap

> **For agentic workers:** Use `superpowers:executing-plans` (or subagent-driven if parallelism makes sense) to work through tasks in order. Steps use `- [ ]` for tracking.

**Goal:** Process all Regen Coordination network meetings from the personal Zettelkasten vault into `regen-coordination-os/`, so future agent sessions have full historical context (decisions, action items, participants, signals) available via `packages/operations/meetings/`, `data/meetings.yaml`, and the daily memory log.

**Why now:** The instance has only one processed meeting in `packages/operations/meetings/` (260423 toolkit planning call); the actual decision history of the network sits in the vault. Until KOI federation lands (gated on refi-dao-os Wave 1+2), the manual `meeting-processor` skill is the path. Designed so the resulting structured records are KOI-ready (RID-friendly frontmatter, consent layer, registry-aligned schemas).

**Strategy:** Process oldest → newest. Each meeting goes through the meeting-processor skill end-to-end (note → registry entry → memory log → project-page action items → updates if anything new about projects/people/funding). Light-touch: don't rewrite history, just capture it.

**KOI integration note:** Once refi-dao-os ships Wave 1 (`regen-koi-mcp`), this instance can install it as a consumer to query the federated graph. Once Wave 2 lands, sensors emit our own meetings into the federation. This plan's structured outputs (canonical paths, frontmatter, RID-ready IDs) are designed to make sensor extraction trivial later.

---

## Source meetings (vault inventory, 2026-04-25)

Sorted oldest → newest. `.bak` and `.termbak` files excluded (older copies).

**Regen Coordination Council**
- [ ] `251003 Regen Coordination Council Sync.md`
- [ ] `260206 Regen Coordination Council Sync.md`
- [ ] `260424 Regen Coordination Council Sync.md`

**ReFi DAO (network-relevant — Monty + global calls)**
- [ ] `251001 ReFi DAO.md`
- [ ] `251030 ReFi DAO Meeting with Monty.md` (only `.bak` exists — confirm)
- [ ] `251105 ReFi DAO Global monthly call 🌐.md` (only `.bak` exists — confirm)
- [ ] `260106 ReFi DAO Meeting with Monty.md`
- [ ] `260113 ReFi DAO Meeting with Monty.md`
- [ ] `260114 ReFi DAO - Monty meeting with John.md` (only `.bak` exists — confirm)
- [ ] `260120 ReFi DAO Global monthly call.md` (only `.termbak` exists — confirm)
- [ ] `260204 ReFi DAO Global monthly call.md` (only `.bak` exists — confirm)
- [ ] `260210 ReFi DAO Meeting with Monty.md` (only `.termbak` exists — confirm)
- [ ] `260217 ReFi DAO Meeting with Monty.md` (only `.termbak` exists — confirm)
- [ ] `260401 ReFi DAO Global monthly call 🌐.md`
- [ ] `260401 ReFi DAO Global monthly call 🌐 - ACTION ITEMS.md` (companion to 260401)

**Regenerant Catalunya** (network-tangential — process if relevant context, skip otherwise)
- [ ] `251031 Regenerant Catalunya.md`
- [ ] `251022 Regenerant Catalunya meeting with partners.md` (only `.bak` exists)

---

## Pre-flight

- [ ] **Read this plan and the spec** for context. The spec is `MEMORY.md` + `IDENTITY.md` + the recent `memory/2026-04-24.md` session log + `data/projects.yaml`.

- [ ] **Confirm working directory:** `pwd` must be `/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/regen-coordination-os`.

- [ ] **Confirm clean git state on these paths:** `git status --short packages/operations/ data/meetings.yaml data/projects.yaml memory/ MEMORY.md`. If anything is dirty, ask before continuing.

- [ ] **Verify the meeting-processor skill is loaded:** `cat skills/meeting-processor/SKILL.md | head -20`. Should show `name: meeting-processor` and the 6-step workflow.

---

## Per-meeting workflow (apply to each source meeting in order)

For each `YYMMDD <Title>.md` in the inventory above:

- [ ] **1. Read the source.** Note: date (reconcile filename vs. transcript header), participants, type (sync | council | global-call | partner-meeting), main topics, key decisions, action items.

- [ ] **2. Fix the source frontmatter** if malformed (date empty, projects empty, conflicts). Mark `processed: true` and `processed_to: regen-coordination-os/packages/operations/meetings/<filename>`. (Mirrors the pattern used for 260423 Regen Web3 Toolkit Planning Call.)

- [ ] **3. Write the structured note** at `packages/operations/meetings/YYMMDD <Title>.md`. Use the template in `skills/meeting-processor/SKILL.md` §3. **Frontmatter must include**:
  - `id: meeting-YYYYMMDD-<slug>`
  - `type:` (sync/council/global-call/partner-meeting)
  - `date: YYYY-MM-DD` (full ISO)
  - `participants:` array
  - `projects:` array of `[[project-id]]` cross-refs
  - `signals:` array of tags
  - `source_file:` original vault path
  - `transcript_url:` if present (Granola/Otter link)
  - `koi:` block with `public: true|false` (default council = private; global calls = public; per-meeting override)

- [ ] **4. Add to `data/meetings.yaml`** — registry entry following the existing schema (`id, title, date, type, participants, summary, decisions, action_items, tags, transcript_path, recording_url`). Validate: `node -e "require('js-yaml').load(require('fs').readFileSync('data/meetings.yaml','utf8'))"`.

- [ ] **5. Update `data/projects.yaml`** if the meeting reveals new projects, status changes, or new contributors. Don't rewrite — append/edit conservatively.

- [ ] **6. Update or create the project page** at `packages/operations/projects/<project-id>.md` for any project mentioned. Add a "Recent meetings" entry pointing to the new note + relevant action items from this meeting.

- [ ] **7. Append to today's `memory/YYYY-MM-DD.md`** — meeting summary block (per the pattern in `memory/2026-04-24.md`):
  ```markdown
  ## Meeting: YYMMDD <Title>
  - Participants: ...
  - Key decisions: ...
  - Action items created: N
  - Related projects: ...
  - Source: vault/YYMMDD <Title>.md
  - Processed to: packages/operations/meetings/YYMMDD <Title>.md
  - New signals: <bullets if anything novel>
  ```

- [ ] **8. Update `MEMORY.md`** if the meeting introduced a key decision worth indexing (one-line entry under "Key Decisions" with date).

---

## Acceptance criteria

- [ ] Every confirmed-existing meeting in the inventory has a structured note in `packages/operations/meetings/`
- [ ] `data/meetings.yaml` has corresponding registry entries
- [ ] `data/projects.yaml` reflects any new projects/contributors discovered
- [ ] Each project mentioned has updated project page with "Recent meetings" cross-references
- [ ] Today's `memory/YYYY-MM-DD.md` (or split across days if processing spans sessions) has the meeting summary blocks
- [ ] `MEMORY.md` "Key Decisions" reflects new historical decisions worth permanent index
- [ ] `npm run validate:schemas` exits 0
- [ ] `npm run generate:schemas` re-run after data/ changes
- [ ] Commit per logical batch (e.g., one commit per quarter of meetings, or one commit per meeting if substantial)

---

## Out of scope (defer)

- Building any KOI sensors or processors — gated on refi-dao-os Wave 2 (see `memory/koi_intake_blocked_on_refi_dao.md`)
- Publishing meeting summaries publicly (council notes default private; global-call notes can be marked public per-meeting via the `koi.public:true` frontmatter pattern from the KOI design spec §2)
- Cleaning the vault `.bak`/`.termbak` files — separate housekeeping plan if desired

---

## Estimated effort

- Per meeting (well-formed transcript): 5–15 min
- Per meeting (sparse notes only): 3–5 min  
- Total inventory: ~15 confirmed meetings × ~10 min avg = **2–4 hours of focused processing**, splittable across sessions

Recommend: process Council meetings first (highest decision density), then ReFi DAO global calls, then Monty 1:1s, then Regenerant.

---

## References

- Skill: `skills/meeting-processor/SKILL.md`
- Pattern reference: `packages/operations/meetings/260423 Regen Web3 Toolkit Planning Call.md` (the canonical processed example)
- KOI design (future federation target): `refi-dao-os/docs/superpowers/specs/2026-04-25-koi-integration-design.md`
- KOI gate memory: `memory/koi_intake_blocked_on_refi_dao.md`
