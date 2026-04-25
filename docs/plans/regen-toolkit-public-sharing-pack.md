---
title: "Toolkit Team — Public Sharing Pack (3 docs + sharing message)"
project: regen-toolkit
date: 2026-04-25
status: queued — has open decision
related:
  - docs/plans/regen-toolkit-onepager-and-layers.md
  - https://github.com/explorience/regen-toolkit/pull/310
methodology:
  - "superpowers:writing-plans (this doc)"
---

# Plan D — Public Sharing Pack for the Toolkit Team

> **Has an open decision** — see §1. Don't execute past §1 until the decision is made.

**Goal:** Produce a sharing pack for the toolkit team (Matt, Heenal, Rather, Brandon, Durgadas, Drew, Monty, Caue, Trinity, et al.) consisting of three publicly-accessible links and a short framing message ready to drop in the planning-call Telegram / Discord / email thread.

**Three target docs:**

1. **260423 Regen Web3 Toolkit — Master Doc Briefing** — Luiz's personal briefing on the master doc state going into the 2026-04-23 call. Useful for new contributors / the team to align on what the master doc currently *is*.
2. **260423 CSIS × org-os Alignment Report** — Luiz's mapping of the CSIS structural standards against the org-os framework. Useful for Durgadas to see the alignment work and for the team to understand the CSIS conformance posture.
3. **KOI Integration Design Spec** (from refi-dao-os) — Sean/Gregory/Luiz's joint design for KOI integration. Useful because the toolkit will eventually consume KOI federation; the team should see the architecture.

---

## §1 — Open decision: how to handle the privacy + unpushed problems

| Doc | Current location | Issue | Options |
|---|---|---|---|
| **Master Doc Briefing** | regen-toolkit PR #310 `docs/briefings/` | None — toolkit repo is public, file is in PR | ✅ shareable as-is once PR merges (or via PR's branch link) |
| **CSIS × org-os Alignment Report** | regen-coord-os local only (`docs/260423 CSIS × org-os Alignment Report.md`); not pushed to remote | Not yet on github.com/regen-coordination/regen-coordination-os main | (a) push it to regen-coord-os main; (b) copy into toolkit repo; (c) both |
| **KOI Integration Design Spec** | refi-dao-os local + remote, but **refi-dao-os is private** | Not publicly accessible via direct GitHub link | (a) ask refi-dao-os to publish a redacted spec; (b) wait for refi-dao Wave 1 Task 8's `koi-one-pager.md` (which is designed to be the public-facing doc); (c) copy the spec into a public repo (regen-coord-os or toolkit) with refi-dao-os's permission; (d) write a derivative one-pager in toolkit/regen-coord referencing the private spec |

**Recommended resolution (operator confirms before executing):**

- **CSIS report:** option (c) — push to regen-coord-os main AND copy into toolkit repo. Two locations because it's relevant to both contexts; toolkit team will look in toolkit, network observers will look in regen-coord-os. Low duplication cost.
- **KOI spec:** option (b) — wait for refi-dao Wave 1 Task 8 to produce the public `koi-one-pager.md`. That doc is *designed* to be the public-facing entry point per the design spec §6 deliverable #7. Once it lands publicly (when refi-dao-os goes public, OR a public mirror is set up, OR the one-pager is copied into a public repo), share that link instead of the spec. **In the meantime**, the sharing message can describe KOI in 2-3 sentences and link the public BlockScience/koi-net repo + the regen-koi-mcp repo, deferring the spec link until refi-dao publishes.

**Operator decisions needed:**
1. Confirm CSIS report can be pushed to regen-coord-os main + copied to toolkit. **Y/N**
2. Confirm waiting on refi-dao Wave 1 Task 8 for the KOI public link. **Y/N** (if N: which alternative from option (a)/(c)/(d)?)

---

## §2 — Once decisions made, execute

### Task 1: Push CSIS report to regen-coord-os main (if §1.1 = Y)

**Files:**
- Already exists: `regen-coord-os/docs/260423 CSIS × org-os Alignment Report.md`

- [ ] **1.1** Commit the CSIS report from current local state in regen-coord-os: `git add "docs/260423 CSIS × org-os Alignment Report.md" && git commit -m "docs: add 260423 CSIS × org-os Alignment Report"`
- [ ] **1.2** Push to origin/main: `git push origin main`
- [ ] **1.3** Verify public URL resolves: open `https://github.com/regen-coordination/regen-coordination-os/blob/main/docs/260423%20CSIS%20%C3%97%20org-os%20Alignment%20Report.md` in a browser.

### Task 2: Copy CSIS report into toolkit repo

**Files:**
- Create: `repos/regen-toolkit/docs/CSIS-org-os-alignment.md` (renamed for URL-friendliness)

- [ ] **2.1** Branch from current toolkit branch (or main, depending on PR #310 status): `git checkout -b feature/csis-alignment-doc`
- [ ] **2.2** Copy: `cp "regen-coord-os/docs/260423 CSIS × org-os Alignment Report.md" "repos/regen-toolkit/docs/CSIS-org-os-alignment.md"`
- [ ] **2.3** Add a header note: "_Original from regen-coordination-os 2026-04-23. Copied here for toolkit-team accessibility. See also: `docs/CSIS.md` (the CSIS reference page)._"
- [ ] **2.4** Update `docs/CSIS.md` with a "See also" link to the new alignment doc.
- [ ] **2.5** Commit: `git add docs/CSIS-org-os-alignment.md docs/CSIS.md && git commit -m "docs: add CSIS × org-os alignment report (mirror from regen-coord-os)"`
- [ ] **2.6** Push branch and either extend PR #310 or open a follow-up PR.

### Task 3: KOI link strategy (per §1.2 decision)

If §1.2 = Y (wait for refi-dao Wave 1 Task 8):

- [ ] **3.1** Watch for refi-dao Wave 1 completion (per their plan `2026-04-25-koi-integration-wave-1.md`). The deliverable is `refi-dao-os/docs/koi-one-pager.md`.
- [ ] **3.2** When ready: ask refi-dao-os whether the doc can be made public. If refi-dao-os stays private but the one-pager is shareable, request a public mirror or excerpt.
- [ ] **3.3** Once available, swap the placeholder in the sharing message (Task 4) with the real link.

### Task 4: Draft sharing message

**Files:**
- Create: a draft (no commit needed; this is a message to send via Telegram/Discord/email)

- [ ] **4.1** Draft along these lines:

  ```
  Hey all — three docs to share following the org-os overlay landing
  in the toolkit repo (PR #310):

  1. Master Doc Briefing (260423) — my personal briefing on where
     the master doc was going into our last call. Useful context for
     anyone catching up:
     <link to docs/briefings/260423 Regen Web3 Toolkit - Master Doc Briefing.md>

  2. CSIS × org-os Alignment Report (260423) — Durgadas, this is the
     mapping I did between CSIS standards and the org-os framework.
     Where they converge, where they diverge, where the framework
     needs additions. Curious what holes you spot:
     <link to CSIS-org-os-alignment.md>

  3. KOI Integration — there's a federated knowledge-graph protocol
     (KOI) being implemented by Sean's team in refi-dao-os. The
     toolkit will eventually consume it (so we can query the master
     doc + meeting notes via MCP, federate with peer orgs). Wave 1
     setup happening now in refi-dao; once their public one-pager
     lands I'll share. In the meantime, the upstream protocol:
     - BlockScience/koi-net: https://github.com/BlockScience/koi-net
     - Regen federation MCP: https://github.com/gaiaaiagent/regen-koi-mcp
     I'll send the design spec link once it's reachable from a public
     repo.

  Org-os overlay PR (still open, pre-merge):
  https://github.com/explorience/regen-toolkit/pull/310

  Questions / comments / "this is wrong" — please drop in the PR or
  Telegram. The overlay is additive — easy to revert any piece.
  ```

- [ ] **4.2** Present draft to operator for approval before sending.
- [ ] **4.3** Operator sends via preferred channel (Telegram of the planning call group is most likely).

---

## Acceptance criteria

- [ ] CSIS report publicly accessible (regen-coord-os main URL resolves)
- [ ] CSIS report mirrored into toolkit repo
- [ ] KOI sharing strategy decided and either link provided OR placeholder + upstream protocol links in the message
- [ ] Sharing message drafted, presented, sent
- [ ] Reply / discussion in the planning call group monitored; substantial responses captured in `MEMORY.md`

---

## Out of scope

- Making refi-dao-os public — that's a refi-dao-os decision, not this plan's
- Publishing the master doc itself publicly (it's already public via the toolkit repo PR)
- Building a documentation site for these — they live in their repos as markdown

---

## Estimated effort

- §1 decision: 5 min (operator)
- Task 1 (CSIS push): 5 min
- Task 2 (CSIS copy + cross-link in toolkit): 15 min
- Task 3 (KOI watch + future link swap): ongoing background
- Task 4 (sharing message draft + send): 15–30 min including approval
- **Total active: ~45 min** (excluding background watch)

---

## References

- PR #310: https://github.com/explorience/regen-toolkit/pull/310
- regen-coord-os: https://github.com/regen-coordination/regen-coordination-os (public)
- refi-dao-os: github.com/ReFiDAO/refi-dao-os (PRIVATE — that's the constraint)
- KOI design spec (private): `refi-dao-os/docs/superpowers/specs/2026-04-25-koi-integration-design.md`
- KOI Wave 1 plan (private): `refi-dao-os/docs/superpowers/plans/2026-04-25-koi-integration-wave-1.md`
- Upstream KOI protocol (public): https://github.com/BlockScience/koi-net
- Regen KOI MCP (public): https://github.com/gaiaaiagent/regen-koi-mcp
