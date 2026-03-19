---
categories: [Planning, Dashboard, Execution]
projects:
  - "[[260101 Regen Coordination]]"
  - "[[250701 Regen Coordination]]"
date: 2026-03-11
status: "[IDEA: Develop]"
---

# Regen Coordination — Task Scoping Dashboard (Round 1)

## Scope Order (agreed)
1. Artizen application/profile strategy
2. RC 2025 activities + Bread Coop + 2026 vision package
3. Website in `regen-coordination-os` with network initiatives mapping
4. Agent training for continuity + delivery

---

## 1) Artizen application/profile strategy

### Objective
Decide **how RC enters Artizen now** and prepare application/profile package.

### Strategy Recommendation (current)
**Hybrid staged strategy**:
- **Stage 1 (now): project/artifact-first** to move fast, validate demand, and build credibility evidence.
- **Stage 2 (after proof): fund-first** once curation bandwidth + governance + reporting rhythm are stable.

### Why
- Current RC docs already support project-level narrative and evidence.
- Fund-first requires stronger ongoing curation/governance operations.
- Telegram discussion points toward theme-based framing and interoperability; this can start at project level before scaling to fund manager role.

### Deliverables
- [ ] Artizen Decision Brief (`fund-first vs artifact-first vs hybrid`)
- [ ] Application/profile copy deck (short + long versions)
- [ ] Evidence bundle links (activities, bread docs, vision)

### Dependencies
- Confirm call outcome on framing (theme-based fund narrative + RC role)
- Finalize impact/accountability section references (Karma + Common Approach)

---

## 2) RC 2025 activities + Bread Coop + 2026 vision package

### Objective
Produce one cohesive public-facing package that proves execution capacity.

### Inputs already available
- `260101 Regen Coordination/Regen Coordination - Karma Activities Report.md`
- `260101 RC <> Bread Coop/Regen Coordination - Bread Coop Executive Summary.md`
- `260101 Regen Coordination/Regen 2026 - A Call for Coordination.md`
- `260123 Regen Coordination Council Sync.md` (Bread integration planning)

### Deliverables
- [ ] `RC Narrative Pack` (single concise doc):
  - 2025 activities highlights
  - Bread Coop collaboration model
  - 2026 direction + strategic priorities
- [ ] “Proof links” appendix for external applications (Artizen + website)

### Open decisions
- Which version is canonical for external/public reuse (full vs concise)
- Whether to publish as one doc or three linked docs with a cover page

---

## 3) Website (`regen-coordination-os`) + initiative mapping

### Objective
Ship a simple website that renders federation + initiatives + reporting surfaces.

### Minimum v0 pages
- [ ] Home
- [ ] Federation (from `federation.yaml`)
- [ ] Nodes/Chapters (from `data/nodes.yaml`)
- [ ] Funds/Domains (from `data/funds.yaml` + `funding/*/pool-config.yaml`)
- [ ] Activities & Bread
- [ ] Integrations matrix

### Initiative mapping requirements
Must include first-class entries for:
- [ ] Coop
- [ ] Green Goods
- [ ] Bloom
- [ ] Prosperity Pass
- [ ] ReFi Podcast
- [ ] Greenpill podcast

### Data gap notice
- Current `regen-coordination-os` data files already include Coop/Green Goods/Bloom.
- Prosperity Pass and podcast entities are not yet clearly normalized in current registry files.
- Need a registry extension pass before rendering complete initiative map.

### Deliverables
- [ ] Site scaffold in `regen-coordination-os`
- [ ] Data normalizer (YAML → website snapshot)
- [ ] Initiatives map section with status/owner/source links

---

## 4) Agent training

### Objective
Create reusable context for faster execution of RC tasks (content, website, funding, reporting).

### Deliverables
- [ ] RC Context Training Brief (prompt-ready)
- [ ] Source hierarchy for RC-related work (which files are canonical)
- [ ] Re-run training pipeline with explicit file-output verification

### Notes
- Previous training run produced no output.
- Training prompts should be narrower and require explicit written artifacts.

---

## 7-Day execution board

### Day 1-2
- [ ] Close Artizen strategy decision (hybrid staged unless blocked)
- [ ] Draft Artizen profile/application copy + evidence links

### Day 3-4
- [ ] Consolidate RC 2025 + Bread + 2026 into one narrative pack
- [ ] Finalize website IA + data fields to render first

### Day 5-6
- [ ] Build website scaffold and render federation/nodes/funds pages
- [ ] Add initiative registry gaps (Prosperity Pass + podcasts)

### Day 7
- [ ] Publish internal v0 preview + task review
- [ ] Run agent training pass and validate outputs exist

---

## Stub/reference pages opened (2026-03-11)
- ✅ `260311 RC Narrative Pack Stub (2025 Activities + Bread + 2026).md`
- ✅ `260311 Artizen Submission Assets Stub.md`
- ✅ `260311 RC Website + Initiatives Mapping Stub.md` *(merged 3+4)*
- ✅ `260311 RC Agent Training Continuity Stub.md`

## Current status snapshot
- Artizen strategy: **Decision brief completed**
- RC narrative package: **Stub opened, drafting pending**
- Website build + initiative mapping: **Merged stub opened, implementation pending**
- Agent training: **Stub opened, rerun pending**
