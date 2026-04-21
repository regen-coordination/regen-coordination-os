# Notion Infrastructure Review — T3/T4 Analysis
**Date:** 2026-03-16  
**Status:** Complete  
**Project:** notion-infra-review-2026

---

## Executive Summary

Cross-reference analysis of 33 Notion Projects against local `data/projects.yaml` and recent meeting records (2026-01 to 2026-03). Identified 4 locally tracked projects vs. 33 in Notion. Found significant drift: many Notion projects are stale (no activity 4+ months), while active work is not fully reflected in either system.

---

## T3: Cross-Reference Analysis

### Local YAML Projects (4)
| ID | Name | Status | In Notion? | Match Quality |
|----|------|--------|------------|---------------|
| project-notion-infra-review-2026 | Notion Infrastructure Review | Integrate | ❌ No | Not tracked in Notion |
| project-refi-bcn-core-coordination | ReFi BCN Core Coordination | Execute | ❌ No | Implicit in multiple Notion projects |
| project-regenerant-catalunya-2025 | Regenerant Catalunya 2025 | Execute | ⚠️ Partial | Matches "Regenerant Catalunya GG24" |
| project-refi-bcn-ecosystem-map | ReFi BCN Ecosystem Map | Develop | ❌ No | Notion has separate "Ecosystem Mapping & Research" |

**Gap Analysis:**
- Only 1 of 4 local projects has a clear Notion counterpart
- Local projects use `project-` prefix IDs; Notion uses UUIDs
- No bidirectional linking between systems
- `project-refi-bcn-core-coordination` is fragmented across multiple Notion projects (Coordination & Governance, Internal workshops, Comms)

### Notion Projects by Status (33 total)

#### In Progress (5) — ACTIVE
| Project | Last Edit | Tasks | Assessment |
|---------|-----------|-------|------------|
| Incubació i Constitució de la Cooperativa (Bloc4) | 2026-02-16 | 9 | ✅ Active — cooperative formation ongoing |
| Canvas Social | 2025-08-18 | 0 | ⚠️ Stale — 7 months no activity |
| Regenerant Catalunya GG24 | 2026-02-23 | 20 | ✅ Active — Phase 2 in progress |
| LicitaCoop 2026 | 2026-03-10 | 0 | ✅ Active — recently updated |
| 2026 Network Plans | 2025-12-15 | 0 | ⚠️ Stale — 3 months no activity |

#### Planning (5) — REQUIRES VALIDATION
| Project | Last Edit | Assessment |
|---------|-----------|------------|
| ReFi BCN & GG24 Websites | 2025-10-13 | 🔴 Stale — 5 months; GG24 completed |
| Regen Funding Support | 2025-11-11 | 🔴 Stale — 4 months |
| Cycles Collaboration | 2025-11-21 | 🔴 Stale — 4 months |
| Resilience Earth | 2025-10-08 | 🔴 Stale — 5 months |
| 2026 Plans Outline | 2025-12-15 | ⚠️ Stale — 3 months |

#### Backlog (17) — MOSTLY STALE
| Project | Last Edit | Assessment |
|---------|-----------|------------|
| IRL Events | 2024-11-10 | 🔴 Stale — 4+ months |
| Ecosystem Mapping & Research | 2024-11-10 | 🔴 Stale — 4+ months |
| ReFi Unconference BCN Article | 2025-09-10 | 🔴 Stale — 6 months |
| Content & Communications | 2024-11-10 | 🔴 Stale — 4+ months |
| Coordination & Governance | 2024-11-10 | 🔴 Stale — 4+ months |
| Comms | 2025-09-23 | 🔴 Stale — 6 months |
| RBCN Internationalization Services | 2025-07-01 | 🔴 Stale — 8 months |
| Giveth (Profile&Cause) | 2025-09-08 | 🔴 Stale — 6 months |
| Public Good Staking Squad | 2025-11-21 | 🔴 Stale — 4 months |
| New Cooperative Brand | 2026-01-09 | ⚠️ Recent activity — may be active |
| Catalunya BFF plans 2026 | 2026-02-04 | ✅ Recently active |
| Collab SFFF & FCAC | 2025-11-21 | 🔴 Stale — 4 months |
| Olla development support | 2025-11-21 | 🔴 Stale — 4 months |
| Sergi's networks funding support | 2025-11-24 | 🔴 Stale — 4 months |
| Finances Management | 2026-02-03 | ⚠️ Recently active |
| Course on Entrepreneurship | 2026-02-27 | ⚠️ Recently active |
| Event proposal for Miceli | 2026-03-01 | ✅ Recently active |

#### Paused (3)
| Project | Last Edit | Assessment |
|---------|-----------|------------|
| Internal workshops | 2025-03-19 | 🔴 Stale — 1 year |
| Mapa de empatía | 2025-08-18 | 🔴 Stale — 7 months |
| ReFAI BCN Agent | 2025-03-19 | 🔴 Stale — 1 year |

#### Done (3)
| Project | Assessment |
|---------|------------|
| Q1'25 | ✅ Legitimately completed |
| GG23 | ✅ Legitimately completed |
| BioFi Barcelona '25 event | ✅ Legitimately completed |

---

## T4: Reality Check Against Meetings

### Active Per Meeting Records (Last 60 Days)

**From 2026-03-12 Live Work Sesh:**
1. **Cooperative Formation** — Active (Incubació i Constitució de la Cooperativa)
2. **Regenerant Catalunya Phase 2** — Active (Safe workshops, Hum Community)
3. **ReFi DAO Service Framework** — NEW — Not tracked in Notion
4. **Misselli Position** — Active — Not tracked in Notion
5. **Event Organization (June)** — NEW — Not tracked in Notion
6. **Rebrand/Website** — Active — Related to "New Cooperative Brand"
7. **EU €20M Grant** — NEW — Not tracked in Notion
8. **Decidim Partnership** — NEW — Not tracked in Notion

**From 2026-02-03 Weekly Ops:**
1. Phase 2 planning — Confirmed active
2. Wallet workshops — Active
3. Content calendar — Active

**From 2026-01-28 Phase 2 Planning:**
1. IDK Mini-Program — Active
2. Safe implementation — Active (Miceli)
3. Hum Community — Active (La Fundició)

### Stale Projects (No Meeting Mentions + Old Edit Dates)

**Definitively Stale (recommend archive):**
- IRL Events (2024-11-10)
- ReFi Unconference BCN Article (2025-09-10)
- RBCN Internationalization Services (2025-07-01)
- ReFAI BCN Agent (2025-03-19)
- Internal workshops (2025-03-19)
- Mapa de empatía (2025-08-18)
- Public Good Staking Squad (2025-11-21)
- GG23 project (done but still in Done)

**Likely Stale (verify before archive):**
- ReFi BCN & GG24 Websites (GG24 completed)
- Resilience Earth (2025-10-08)
- Ecosystem Mapping & Research (may merge with active work)
- Giveth (Profile&Cause) (2025-09-08)

---

## Recommendations

### Immediate Actions (T5-T7)

1. **Archive 8 definitively stale projects** (move to "Archived" status or delete)
2. **Update 3 "Done" projects** — verify if Q1'25, GG23, BioFi '25 should remain visible or be archived
3. **Merge or clarify:**
   - "Ecosystem Mapping & Research" + "ReFi BCN Ecosystem Map" (local)
   - "Coordination & Governance" + "Internal workshops" + "Comms" → merge into single "Core Operations"
4. **Create missing projects in Notion:**
   - ReFi DAO Service Framework (3 pillars)
   - Misselli Position (partnership track)
   - June Event Organization
   - EU €20M Grant Coordination
   - Decidim Partnership
5. **Sync active projects to local YAML** (T6):
   - Add project IDs and Notion URLs to `data/projects.yaml`
   - Update status fields to match

### Source-of-Truth Matrix (T8 Preview)

| Data Type | Notion (Live) | Local YAML (Canonical) | Resolution |
|-----------|---------------|------------------------|------------|
| Project names/titles | ✅ Master | ❌ Mirror | Notion → YAML sync |
| Project status | ✅ Master | ⚠️ Lagging | Weekly reconciliation |
| Budget/funding | ❌ Incomplete | ✅ Canonical | YAML → Notion sync |
| Source references | ❌ Missing | ✅ Required | Manual entry |
| Meeting links | ❌ Inconsistent | ✅ Structured | Notion → YAML extract |

### Next Steps

1. [ ] Execute T5: Archive stale projects in Notion
2. [ ] Execute T6: Sync active projects to local YAML
3. [ ] Execute T7: Extract urgent tasks to HEARTBEAT.md
4. [ ] Execute T8: Document full source-of-truth matrix
5. [ ] Execute T9: Test first sync cycle (schedule weekly)

---

## Evidence

- Notion Projects Export: `docs/exports/notion-projects-full-2026-03-10.json`
- Notion Tasks Export: `docs/exports/notion-tasks-full-2026-03-10.json`
- Meeting Records: `packages/operations/meetings/260312*.md`, `260203*.md`, `260128*.md`
- Local Projects: `data/projects.yaml`
