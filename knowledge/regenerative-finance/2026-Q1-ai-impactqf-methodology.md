# AI ImpactQF Methodology — 2026 Q1 Context

Date: 2026-03-06  
Domain: regenerative-finance  
Status: active methodology

---

## What

AI ImpactQF is Regen Coordination's hybrid funding methodology that combines:

1. COCM-based quadratic funding signal from Gitcoin.
2. Impact evaluation from an AI + human review process.

In GG23, the round operated with a **50/50 split**:

- 50% of matching from standard COCM outcomes.
- 50% of matching from impact scoring derived from dual-model AI reports and Coordination Council review.

Core GG23 figures documented in the retrospective:

- $96,000 matching pool for Regen Coordination Global.
- 50 projects evaluated.
- 579 unique donors.
- $10,817 contributions.
- $90,000 distributed in matching, plus a $6,000 DeepGov bonus allocation track.
- $159,732 allocated across coordinated programs in 2025 (global + parallel rounds).

Source: `03 Libraries/Regen Coordination/Regen Coordination Docs/ai-impactqf-regen-coordination-retrospective.md`

---

## Why

The methodology addresses a known issue in standard QF rounds: allocations can over-reward projects with stronger marketing reach and donor mobilization rather than stronger demonstrated impact.

The hybrid model is used as a transition mechanism to:

- preserve community signaling from donor behavior;
- add evidence-based impact weighting;
- reduce popularity-only distortions;
- maintain human oversight in final scoring.

---

## How

### Impact data layer

- Uses Common Approach / CIDS-aligned reporting through Karma GAP.
- Projects submit activities, outputs, and supporting impact evidence in structured formats.

### Evaluation layer

- Two model evaluations per project (GPT-4o and Claude 3.7) run independently.
- Scores are generated against five criteria aligned with RC north stars and delivery quality.
- Coordination Council reviewers add human judgment, and final impact scores are consolidated.

### Allocation layer

- Hybrid ImpactQF applies final impact score alongside COCM results for matching distribution.
- Current implementation is a stepping-stone toward deeper impact embedding in future formulas.

---

## Learnings from GG23

- Distribution was more equitable and avoided extreme concentration.
- Some variance was flattened; exceptional projects may have been under-differentiated.
- A single rubric struggled to fully fit both software/public-goods infra teams and local place-based initiatives.
- AI + human evaluation quality was strong but operations were still manual and time-intensive.
- Reporting infrastructure (CIDS in Karma GAP) proved viable, with expected early-stage UX and consistency gaps.

---

## Now

Current direction from retrospective and council context:

- Continue operating ImpactQF as a live methodology, not a one-off pilot.
- Productize and automate workflows with ecosystem partners (Karma GAP, DeepGov, others).
- Improve evaluator throughput and consistency via agent-assisted review pipelines.
- Keep impact reporting onboarding support as a priority for participating communities.

---

## Next

Near-term strategy linked to GG24:

- Position Regen Coordination as a domain expert for Ethereum Localism funding design.
- Run additional local and bioregional implementations using the methodology.
- Evolve from hybrid weighting toward stronger impact-embedded allocation as data quality and tooling mature.

Related references:

- `knowledge/network/programs/index.md`
- `data/programs.yaml`
