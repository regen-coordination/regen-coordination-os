# Agent Spawning Templates — ReFi BCN

**Purpose:** Reusable templates for spawning subagents with clear context, success criteria, and model recommendations. Ensures consistent briefing and predictable outputs.

**Version:** 1.0.0  
**Date:** 2026-03-19  
**Source:** AGENT-TRAINING-MASTERPLAN Week 4 specification

---

## Template Selection Guide

| Template | Use When | Model | Token Budget |
|----------|----------|-------|--------------|
| Research Task | External data gathering, ecosystem scanning | Kimi-2.5 / Big-Pickle | 50K–100K |
| Writing Task | Drafting proposals, reports, communications | Claude-Sonnet / Kimi-2.5 | 30K–80K |
| Data Processing | Notion sync, YAML updates, schema generation | Big-Pickle / Kimi-2.5 | 30K–60K |
| Analysis Task | Gap analysis, cross-validation, status assessment | Claude-Sonnet / Kimi-2.5 | 40K–80K |
| Coordination Task | Meeting prep, stakeholder summaries, timeline tracking | Kimi-2.5 | 20K–50K |

---

## Template 1: Research Task

### Task Description Pattern

```
**Research Task: [TOPIC]**

Research and map [SPECIFIC_DOMAIN] relevant to ReFi BCN operations.

**Research Questions:**
1. [Question 1 — specific, answerable]
2. [Question 2 — specific, answerable]
3. [Question 3 — specific, answerable]

**Scope:**
- Include: [INCLUSION_CRITERIA]
- Exclude: [EXCLUSION_CRITERIA]
- Timeframe: [TIME_RANGE]
- Geography: [GEOGRAPHIC_SCOPE if relevant]

**Deliverables:**
1. Structured summary of findings
2. List of [ENTITIES] with key attributes
3. Recommendations for next steps
4. Source references for all claims

**Success Criteria:**
- [ ] All research questions answered
- [ ] Minimum [N] sources identified
- [ ] Relevance to ReFi BCN priorities explained
- [ ] Source refs included for traceability
```

### Required Context Files

| File | Purpose |
|------|---------|
| `data/projects.yaml` | Current project context |
| `docs/AGENT-KNOWLEDGE-GRAPH.md` | Organizational priorities |
| `docs/OPERATIONAL-VOCABULARY.md` | Terminology alignment |
| `HEARTBEAT.md` | Active priorities to consider |
| `SOUL.md` | Values alignment check |

### Model Recommendation

**Primary:** Kimi-2.5 (cost-efficient, good for structured research)  
**Alternative:** Big-Pickle (if synthesis across multiple domains needed)  
**Escalate to Claude-Sonnet if:** High-stakes external communication or complex governance implications

### Expected Output Format

```markdown
# Research: [Topic] — Findings Report
**Date:** YYYY-MM-DD  
**Subagent:** [session_id]  
**Sources:** [N] references

## Executive Summary
2-3 paragraph synthesis of key findings

## Detailed Findings

### [Category 1]
- Finding 1 — Source: [ref]
- Finding 2 — Source: [ref]

### [Category 2]
- Finding 3 — Source: [ref]

## Recommendations
1. [Actionable recommendation with rationale]
2. [Actionable recommendation with rationale]

## Source References
1. [URL or file path] — [Brief description]
2. [URL or file path] — [Brief description]

## Open Questions
- [Question for operator follow-up]
```

### Success Criteria Checklist

- [ ] All research questions answered (or flagged why not)
- [ ] Minimum source count met
- [ ] Source refs provided for every key claim
- [ ] Relevance to ReFi BCN explicit
- [ ] Recommendations are actionable
- [ ] Report written in SOUL.md voice

### Token Budget Estimate

- Small research (< 10 sources): 30K–50K tokens
- Medium research (10–20 sources): 50K–80K tokens
- Large research (20+ sources, multi-domain): 80K–120K tokens

---

## Template 2: Writing Task

### Task Description Pattern

```
**Writing Task: [DOCUMENT_TYPE]**

Draft [DOCUMENT_TYPE] for [AUDIENCE/PURPOSE].

**Purpose:** [ONE_SENTENCE_GOAL]

**Key Points to Include:**
1. [Point 1]
2. [Point 2]
3. [Point 3]

**Tone:** [TONE_DESCRIPTOR — e.g., "professional but warm", "technical", "advocacy"]
**Length:** [APPROXIMATE_WORD_COUNT or "concise/max 2 pages"]
**Format:** [FORMAT — e.g., "markdown", "email", "Notion page"]

**Must Reference:**
- [Specific file or data point]
- [Specific project or context]

**Constraints:**
- Do not include: [EXCLUSIONS]
- Avoid: [STYLE_GUIDANCE]
```

### Required Context Files

| File | Purpose |
|------|---------|
| `SOUL.md` | Voice and values alignment |
| `IDENTITY.md` | Organizational identity details |
| `MASTERPLAN.md` | Current priorities and workfronts |
| `data/projects.yaml` | Active project context |
| `docs/OPERATIONAL-VOCABULARY.md` | Terminology consistency |
| [Specific docs for topic] | e.g., meeting notes, prior proposals |

### Model Recommendation

**Primary:** Claude-Sonnet (excellent prose, nuance, alignment)  
**Alternative:** Kimi-2.5 (cost-efficient for routine drafting)  
**Escalate to GPT-4 if:** Public-facing high-stakes (grant applications, partnership MOUs)

### Expected Output Format

```markdown
# Draft: [Document Title]
**Type:** [email/proposal/report/etc.]  
**Audience:** [Target audience]  
**Status:** DRAFT — pending operator review

---

[CONTENT]

---

## Notes for Reviewer
- [Specific point needing confirmation]
- [Alternative phrasing option]
- [Known gap or assumption]
```

### Success Criteria Checklist

- [ ] All key points addressed
- [ ] Tone matches SOUL.md voice
- [ ] Length within constraints
- [ ] Format as specified
- [ ] Must-reference items included
- [ ] Exclusions respected
- [ ] Marked as DRAFT (not final)
- [ ] Notes for reviewer included

### Token Budget Estimate

- Short email/message: 15K–25K tokens
- 1-2 page proposal: 30K–50K tokens
- Full report/document: 50K–80K tokens

---

## Template 3: Data Processing Task

### Task Description Pattern

```
**Data Processing Task: [OPERATION]**

Process [DATA_SOURCE] and update [TARGET_DESTINATION].

**Source:** [FILE_PATH or API]
**Destination:** [FILE_PATH]
**Operation:** [SYNC/TRANSFORM/VALIDATE/GENERATE]

**Transformation Rules:**
1. [Rule 1 — e.g., "Map Notion Status → local status"]
2. [Rule 2 — e.g., "Add source_refs for every entry"]
3. [Rule 3 — e.g., "Skip archived items"]

**Validation Requirements:**
- [Validation 1 — e.g., "All entries have id field"]
- [Validation 2 — e.g., "No duplicate IDs"]
- [Validation 3 — e.g., "Schema validation passes"]

**Quality Gates:**
- [ ] Source data completeness check
- [ ] Transformation accuracy check
- [ ] Destination format validation
- [ ] Schema generation (if applicable)
```

### Required Context Files

| File | Purpose |
|------|---------|
| `data/[target_file].yaml` | Target structure reference |
| `docs/SOURCE-OF-TRUTH-MATRIX.md` | Sync protocol rules |
| `docs/OPERATIONAL-VOCABULARY.md` | Field naming conventions |
| `AGENTS.md` | Data write safety policies |
| Source files | Data to process |

### Model Recommendation

**Primary:** Big-Pickle (structured data handling, deterministic)  
**Alternative:** Kimi-2.5 (cost-efficient for simple transforms)  
**Escalate to Claude-Sonnet if:** Complex cross-references or ambiguous mappings

### Expected Output Format

```markdown
# Data Processing Report: [Operation]
**Date:** YYYY-MM-DD  
**Source:** [path]  
**Destination:** [path]

## Summary
- Items processed: [N]
- Items added: [N]
- Items updated: [N]
- Items skipped: [N] (reason)
- Errors: [N]

## Transformations Applied
1. [Rule 1] — Applied to [N] items
2. [Rule 2] — Applied to [N] items

## Validation Results
- [Validation 1]: ✅ PASS / ❌ FAIL (details)
- [Validation 2]: ✅ PASS / ❌ FAIL (details)

## Issues Requiring Review
1. [Issue 1 — e.g., "5 items had missing required fields"]
2. [Issue 2 — e.g., "Status mapping ambiguous for 'In Review'"]

## Files Modified
- `[path]` — [description of change]
```

### Success Criteria Checklist

- [ ] All transformation rules applied correctly
- [ ] All validation checks pass (or issues flagged)
- [ ] Source refs included for all entries
- [ ] No data loss (or documented gaps)
- [ ] Schema validation passes (if applicable)
- [ ] Human review items clearly flagged

### Token Budget Estimate

- Simple sync (< 50 items): 20K–30K tokens
- Complex transform (50–200 items): 30K–60K tokens
- Large dataset (200+ items): 60K–100K tokens

---

## Template 4: Analysis Task

### Task Description Pattern

```
**Analysis Task: [ANALYSIS_TYPE]**

Perform [ANALYSIS_TYPE] on [SUBJECT] and identify gaps, inconsistencies, or improvement opportunities.

**Analysis Scope:**
- Primary focus: [MAIN_FOCUS]
- Secondary checks: [ADDITIONAL_CHECKS]
- Time constraint: [TIME_BOUND if applicable]

**Comparison Baselines:**
- Expected state: [REFERENCE_STANDARD]
- Current state: [CURRENT_SOURCE]

**Gap Severity Levels:**
- Critical: [DEFINITION — e.g., "Blocks operations or violates safety"]
- High: [DEFINITION — e.g., "Major inconsistency, near-term fix needed"]
- Medium: [DEFINITION — e.g., "Minor inconsistency, schedule fix"]
- Low: [DEFINITION — e.g., "Cosmetic or nice-to-have"]

**Deliverables:**
1. Gap list with severity ratings
2. Root cause analysis for Critical/High gaps
3. Recommended fixes with priorities
4. Effort estimates for fixes
```

### Required Context Files

| File | Purpose |
|------|---------|
| `docs/AGENT-TRAINING-MASTERPLAN.md` | Expected deliverable specs |
| `docs/AGENT-KNOWLEDGE-GRAPH.md` | Organizational knowledge baseline |
| Source files to analyze | Current state |
| Related docs | Cross-reference validation |

### Model Recommendation

**Primary:** Claude-Sonnet (nuanced analysis, good at identifying subtle gaps)  
**Alternative:** Kimi-2.5 (cost-efficient for straightforward gap checks)  
**Use both for:** Complex cross-validation (spawn parallel agents, compare findings)

### Expected Output Format

```markdown
# Analysis Report: [Subject] — [Analysis Type]
**Date:** YYYY-MM-DD  
**Scope:** [Description]

## Executive Summary
[2-3 sentences on overall health + critical findings count]

## Findings by Severity

### 🔴 Critical ([N] items)
1. **[Gap description]**
   - Location: `[file:line]`
   - Expected: [what should be]
   - Actual: [what is]
   - Impact: [operational consequence]
   - Recommended fix: [specific action]
   - Effort: [small/medium/large]

### 🟠 High ([N] items)
1. **[Gap description]**
   - [Same structure as Critical]

### 🟡 Medium ([N] items)
1. **[Gap description]**
   - [Same structure]

### 🟢 Low ([N] items)
1. **[Gap description]**
   - [Same structure]

## Cross-Cutting Issues
[Patterns across multiple gaps]

## Recommended Priority Order
1. [Fix 1 — rationale]
2. [Fix 2 — rationale]
```

### Success Criteria Checklist

- [ ] All scope items reviewed
- [ ] Gaps categorized by severity
- [ ] Root cause identified for Critical/High
- [ ] Specific fixes recommended (not just "fix this")
- [ ] Effort estimates provided
- [ ] Location citations specific (file:line where possible)
- [ ] No false positives (or flagged for confirmation)

### Token Budget Estimate

- Targeted analysis (1–3 files): 30K–50K tokens
- Cross-validation (multiple sources): 50K–80K tokens
- Comprehensive audit (entire workspace): 80K–150K tokens

---

## Template 5: Coordination Task

### Task Description Pattern

```
**Coordination Task: [COORDINATION_TYPE]**

Prepare materials for [EVENT/PURPOSE] involving [PARTICIPANTS].

**Purpose:** [ONE_SENTENCE_GOAL]
**Date/Time:** [WHEN]
**Participants:** [WHO]
**Owner:** [LEAD_NAME]

**Preparation Needs:**
1. [Need 1 — e.g., "Agenda with timeboxed items"]
2. [Need 2 — e.g., "Status summary of active projects"]
3. [Need 3 — e.g., "Decision items with context"]

**Materials to Prepare:**
- [ ] [Material 1]
- [ ] [Material 2]
- [ ] [Material 3]

**Success Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]
```

### Required Context Files

| File | Purpose |
|------|---------|
| `HEARTBEAT.md` | Active priorities and deadlines |
| `data/projects.yaml` | Project status context |
| `MEMORY.md` | Key decisions to reference |
| `docs/AGENT-KNOWLEDGE-GRAPH.md` | Participant roles and relationships |
| Recent meeting notes | Context from last sync |

### Model Recommendation

**Primary:** Kimi-2.5 (efficient for structured coordination tasks)  
**Alternative:** Big-Pickle (if complex multi-stakeholder synthesis needed)

### Expected Output Format

```markdown
# Coordination Package: [Event/Purpose]
**Date:** YYYY-MM-DD  
**Prepared for:** [Participants]

---

## 1. Agenda

| Time | Item | Owner | Purpose |
|------|------|-------|---------|
| 0:00 | [Item 1] | [Name] | [Goal] |
| 0:15 | [Item 2] | [Name] | [Goal] |

## 2. Status Summary

### Active Projects
- **[Project 1]**: [Status] — [Key update]
- **[Project 2]**: [Status] — [Key update]

### Upcoming Deadlines
- [Deadline 1]: [Date] — [Owner]
- [Deadline 2]: [Date] — [Owner]

## 3. Decision Items

1. **[Decision topic]**
   - Context: [Background]
   - Options: [A, B, C]
   - Recommendation: [If applicable]

## 4. Action Items Pending Review
- [Item 1]: [Owner] — [Due] — [Status]
- [Item 2]: [Owner] — [Due] — [Status]

## 5. Preparation Notes
- [Any logistics, pre-reads, etc.]
```

### Success Criteria Checklist

- [ ] All preparation needs addressed
- [ ] Agenda timeboxed and realistic
- [ ] Status summary accurate and current
- [ ] Decision items framed with context
- [ ] Materials ready for distribution
- [ ] Action items linked to HEARTBEAT

### Token Budget Estimate

- Standard meeting prep: 20K–35K tokens
- Complex multi-stakeholder coordination: 35K–60K tokens

---

## Spawning Protocol

### Step 1: Select Template
Choose template based on task type from selection guide above.

### Step 2: Fill Template
Replace all [BRACKETED] placeholders with specific content.

### Step 3: Identify Context
List all required context files from template's context table.

### Step 4: Choose Model
Select recommended model based on complexity and stakes.

### Step 5: Set Budget
Estimate token budget; add 20% buffer for unexpected complexity.

### Step 6: Spawn Subagent

```
**Subagent Brief:**

[Insert filled template here]

**Context Files:**
- [List each file with full path]

**Constraints:**
- Do not [specific prohibition]
- Always [specific requirement]
- Escalate if [escalation trigger]

**Output:** Write deliverable to [file_path]

**Success Criteria:** [Checklist from template]
```

### Step 7: Review Output

When subagent completes:
1. Check success criteria
2. Verify output location and format
3. Review for completeness and accuracy
4. Provide feedback to subagent if gaps found
5. Integrate into main workspace if accepted

---

## Example: Complete Spawn Request

```
**Research Task: Celo Public Goods Funding Ecosystem**

Research and map current Celo Public Goods funding opportunities relevant to ReFi BCN operations.

**Research Questions:**
1. What Celo PG funding rounds are currently open or upcoming in 2026?
2. What are the eligibility requirements for each round?
3. What are typical award amounts and success rates?
4. How does ReFi BCN/Regenerant Catalunya align with Celo PG priorities?

**Scope:**
- Include: All Celo PG rounds (Peach, Anchor, Retroactive, etc.)
- Exclude: Non-Celo funding sources (covered separately)
- Timeframe: 2026 calendar year
- Geography: Global (ReFi BCN eligible as local node)

**Deliverables:**
1. Structured summary of Celo PG funding landscape
2. List of open/upcoming rounds with deadlines
3. Eligibility assessment for ReFi BCN
4. Recommended application priorities
5. Source references for all claims

**Success Criteria:**
- [ ] All research questions answered
- [ ] Minimum 5 funding rounds identified
- [ ] Relevance to ReFi BCN priorities explained
- [ ] Source refs included for traceability

**Context Files:**
- data/projects.yaml (Regenerant Catalunya context)
- docs/AGENT-KNOWLEDGE-GRAPH.md (organizational priorities)
- docs/OPERATIONAL-VOCABULARY.md (terminology)
- HEARTBEAT.md (funding priorities)
- SOUL.md (values alignment)

**Constraints:**
- Do not draft applications (research only)
- Always cite sources
- Escalate if eligibility unclear

**Model:** Kimi-2.5
**Token Budget:** 60K
**Output:** Write to `packages/operations/funding/celo-pg-landscape-research.md`
```

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-03-19 | Initial templates created | Agent Training Swarm — Package D |

---

_These templates standardize subagent spawning for consistent, predictable results._
