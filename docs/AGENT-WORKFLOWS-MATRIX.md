# Agent Workflows Matrix — Regen Coordination Hub Operational Workflows

**Purpose:** Comprehensive mapping of all hub-level operational workflows: triggers, ownership, inputs/outputs, approval gates, skills involved, and duration estimates.

**Version:** 1.0.0  
**Date:** 2026-03-19  
**Related:** `MASTERPROMPT.md`, `AGENTS.md`, `AGENT-CONTEXT-LAYERS.md`

---

## Workflow Matrix

| # | Workflow Name | Trigger | Owner | Inputs | Outputs | Approval Gate? | Skills Involved | Est. Duration |
|---|---------------|---------|-------|--------|---------|----------------|-----------------|---------------|
| 1 | Weekly Council Coordination Call | Weekly (Friday) / Event (urgent decision needed) | **Collaborative** (Agent prep + Human facilitate) | Council agenda requests, node status updates, open decisions from MEMORY.md, HEARTBEAT.md urgent items | Council session notes, ratified decisions, action items, HEARTBEAT.md updates | Yes — council consensus for decisions | `meeting-processor`, `heartbeat-monitor` | 90-120 min (call + processing) |
| 2 | Knowledge Intake from Nodes | Weekly (Mondays 6am UTC — automated) / Event (node push) | **Agent** (auto-collect) → **Human** (curate for hub) | `knowledge/<domain>/from-nodes/<node>/`, node schemas, forum contributions | Aggregated knowledge per domain, hub-curated synthesis, HEARTBEAT.md signal alerts | Yes — for hub publication | `knowledge-curator` | 60-90 min |
| 3 | Shared Skill Distribution | Event (push to `skills/` branch) / Manual (scheduled update) | **Agent** (auto-distribute) → **Human** (validate) | `skills/<name>/SKILL.md`, `skills/INDEX.md`, `federation.yaml` (downstream nodes) | Skill push to downstream nodes, distribution log, node notification | No — autonomous for ReFi BCN; Yes — if changing distribution protocol | `schema-generator` (validation), skill distribution workflow | 15-30 min |
| 4 | Funding Pool Allocation | Event (proposal submission) / Monthly review | **Collaborative** (Agent track, Human decide) | `funding/<domain>/pool-config.yaml`, proposals, `data/funding-opportunities.yaml`, council decisions | Allocation decisions, `data/funds.yaml` updates, HEARTBEAT.md tracking, distribution schedule | **YES — council consensus required** | `funding-scout`, `capital-flow` (tracking) | 2-3 hours (spread over decision period) |
| 5 | Node Health Check | Weekly (automated scan) / Event (node alert) | **Agent** (monitor) → **Human** (respond if 🔴) | `MEMBERS.md` status, `federation.yaml` sync data, GitHub Actions status, last contribution timestamps | Health report, status updates (🟢🟡🔴), support requests to HEARTBEAT.md | No for monitoring, Yes for status change to 🔴 | `heartbeat-monitor` | 15-20 min |
| 6 | Commons Curation | Weekly (curation cycle) / Event (knowledge signal accumulation) | **Agent** (auto) → **Human** (review for quality) | `knowledge/<domain>/from-nodes/`, `packages/coop/` knowledge (if relevant), forum posts | Curated domain files, indexed knowledge, hub-level synthesis, publish-ready artifacts | Yes — for hub publication | `knowledge-curator` | 45-60 min |
| 7 | Federation Sync | Weekly (Monday aggregation triggers) / Event (material hub update) | **Agent** (auto) → **Human** (approve major changes) | Hub knowledge updates, skill changes, node registry updates, `federation.yaml` | Sync broadcast to nodes, node update collection, network state reconciliation | No for routine, Yes for topology changes | `knowledge-curator`, `schema-generator` | 30-45 min |
| 8 | New Node Onboarding | Event (node application) / Quarterly (growth target) | **Collaborative** (Agent guide, Human execute, Council approve) | Onboarding request, `organizational-os-template` fork, node details | Updated `MEMBERS.md`, `federation.yaml` (downstream), access provisioning, welcome package, training schedule | **YES — council approval required** | `meeting-processor` (training), `schema-generator` | 4-6 hours (spread over 2-4 weeks) |
| 9 | Treasury Reconciliation | Monthly (1st of month) / Event (payout need) | **Collaborative** (Agent draft, Human execute) | `data/funds.yaml`, pool tracking, allocation verification, Safe API (when multi-sig enabled) | Treasury report, `data/pending-payouts.yaml`, reconciliation log, HEARTBEAT.md tracking | **YES — all financial actions require council consensus** | `capital-flow` | 60-90 min |
| 10 | Council Decision Propagation | Event (council ratification) | **Agent** (broadcast) → **Human** (confirm delivery) | Ratified decisions from `MEMORY.md`, council session notes | Decision broadcast to nodes, implementation tracking, feedback collection | No for broadcast, Yes for implementation interpretation | `meeting-processor`, `heartbeat-monitor` | 30-45 min |
| 11 | Network Integrity Check | Monthly (last day) / Event (suspected drift) | **Collaborative** (Agent audit, Human decide) | All `data/*.yaml`, `MEMBERS.md` vs `federation.yaml`, knowledge commons consistency, skill distribution logs | Integrity report, drift fixes, archived stale items, updated indexes, network health score | Yes — for structural changes | All skills (comprehensive check) | 2-3 hours |
| 12 | Hub-to-Node Communication | Event (per node inquiry) / Weekly (newsletter rhythm) | **Agent** (route/draft) → **Human** (complex decisions) | Node request, routing rules, `MEMBERS.md` contact info | Routed response, escalation if needed, `memory/` log | No for routine info, Yes for funding/governance decisions | `heartbeat-monitor` (routing) | 10-30 min per inquiry |

---

## Workflow Interdependencies

### Sequential Dependencies (Must complete A before B)

| A | B | Notes |
|---|---|-------|
| Knowledge Intake | Commons Curation | Raw intake must complete before curation |
| Council Coordination Call | Decision Propagation | Decisions must be ratified before broadcast |
| Treasury Reconciliation | Schema Generation | Financial data updates trigger schema regen |
| Commons Curation | Federation Sync | Curated knowledge feeds hub sync |
| Node Health Check | New Node Onboarding | Health status informs onboarding priority |

### Parallelizable Workflows (Can run simultaneously)

- Knowledge Intake + Skill Distribution (different data sources)
- Funding Opportunity Synthesis + Node Health Check
- Schema Generation + Knowledge Intake (if no meeting data changes)

### Trigger Cascades (One workflow triggers another)

| Trigger Workflow | Triggered Workflow | Condition |
|------------------|-------------------|-----------|
| Knowledge Intake | Commons Curation | If new content collected |
| Commons Curation | Federation Sync | If publish: true and quality approved |
| Council Coordination Call | Decision Propagation | If network-affecting decisions ratified |
| Treasury Reconciliation | Schema Generation | If finances.yaml updated |
| Data File Update | Schema Generation | Automatic (via GitHub Actions or manual) |
| New Node Onboarding | Skill Distribution | Push skills to new node |
| Node Health Check (🔴) | Hub-to-Node Communication | Send support offer |

---

## Approval Gate Reference

| Gate Type | Workflows | Approver | Response Time |
|-----------|-----------|----------|---------------|
| None (autonomous) | Knowledge Intake (collection), Skill Distribution (to configured targets), Node Health Check (monitoring), Schema Generation | N/A | Immediate |
| Review only | Commons Curation (publication), Federation Sync | Luiz or delegate | 24-48 hours |
| Approval required | Council Coordination (all decisions), Funding Pool Allocation, Treasury Reconciliation (payouts), New Node Onboarding, Council Decision Propagation (interpretation) | Council consensus | 7 days |
| Consensus required | Quarterly Network Effectiveness Review, Coop Product Coordination (resource allocation), Funding applications | Core team / Council | 7-14 days |
| Multisig execution | Treasury payouts (execution) | Safe signers | 1-3 days |

---

_Last updated: 2026-03-19_
