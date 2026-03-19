---
categories: [Planning, Agents, Continuity]
projects:
  - "[[260101 Regen Coordination]]"
  - "[[250701 Regen Coordination]]"
date: 2026-03-11
status: "[IDEA: Develop]"
---

# RC Agent Training Continuity Stub

## Purpose
Set up a reliable context-training loop that always outputs usable artifacts.

## Problem
Previous training run produced no usable written output.

## Target outputs
1. Prompt-ready RC context brief
2. Canonical source hierarchy (priority order)
3. Delivery checklist with file-path verification

## Canonical source hierarchy (draft)
1. Current day/week/month notes for RC
2. Current planning docs in `regen-coordination-os/docs/`
3. Council sync meeting notes
4. Data registries (`federation.yaml`, `data/*.yaml`)
5. Integrations and partner docs

## Run protocol
- Keep prompt narrow (single objective per run)
- Require explicit deliverable path in prompt
- Verify file exists before run closure
- Add short summary + open questions section

## Next work session checklist
- [ ] Write one strict training prompt template
- [ ] Run training against one scoped objective (Narrative Pack)
- [ ] Validate artifact exists and meets minimum structure
- [ ] Reuse template for Website + Artizen tasks
