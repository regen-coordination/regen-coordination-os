# Notion Infrastructure Review — Reconciliation Report
**Date:** 2026-03-17  
**Scope:** T3-T9 Completion — Cross-reference, archive decisions, sync, and protocol documentation

---

## Executive Summary

Completed cross-reference of Notion Projects/Tasks databases against local `data/projects.yaml`. Key findings:
- **62 projects** in Notion Projects database
- **~50 tasks** reviewed in Tasks database
- **Significant drift** between Notion status and operational reality
- **5 active projects** identified for local sync
- **12+ stale projects** recommended for archival

---

## T3: Cross-Reference Results (Notion vs Local)

### Local Projects (data/projects.yaml)
| Project | Local Status | Notion Status | Drift |
|---------|--------------|---------------|-------|
| refi-bcn-os | active | Not tracked | **GAP** |
| website | active | Not tracked | **GAP** |
| regenerant-catalunya | active | Partial (RegCat related) | **PARTIAL** |
| knowledge-system | active | Not tracked | **GAP** |

**Finding:** Local active projects lack corresponding Notion entries. Notion contains many historical projects not in local registry.

---

## T4: Reality Check — Active vs Stale Projects

### Truly Active (In Progress + Recent Activity)
| Project | Notion ID | Owner | Last Activity | Status |
|---------|-----------|-------|---------------|--------|
| Regenerant Catalunya | 21c6ed08-45cb-8050-88e6-c743b4ed53dc | Commons Agency/Luiz | 2026-02 | ✅ Active |
| ReFi BCN One Pager V2 | 1a66ed08-45cb-8004-8a58-dddf685687e4 | Luiz | 2025-02 | ⚠️ Stale |
| Phase #2 Plan | 2fc6ed08-45cb-80ad-a8d0-da3f47d0b57b | — | 2026-02 | ⚠️ Needs review |

### Stale Projects (Archive Recommended)
| Project | Notion ID | Status | Last Edit | Action |
|---------|-----------|--------|-----------|--------|
| ReFi BCN <> Gitcoin GR18 | 1386ed08-45cb-81ae-a83d-dfe3f0b3e23b | In Progress | 2023-08 | **Archive** |
| ReFi DAO Local Nodes Beta | 1386ed08-45cb-81de-b6ab-d25878d0cf14 | In Progress | 2023 | **Archive** |
| Outreach List | 1386ed08-45cb-814c-a668-ea42c2db06ce | In Progress | 2023 | **Archive** |
| Content & Communications Plan | 1386ed08-45cb-81e8-811d-c189bafdd978 | In Progress | 2023 | **Archive** |
| Ecosystem Mapping Plan | 1386ed08-45cb-81e4-8d84-c2b8d1309496 | In Progress | 2023 | **Archive** |
| Q3 Grants | 1386ed08-45cb-81f8-a055-e25fa25ebaa1 | Archived | 2024 | Verify |
| Decidim Fest Thread | 13c6ed08-45cb-80fd-b786-fb97bf93422a | In Progress | 2025 | **Review** |
| ReFi BCN Boards Collection | 13e6ed08-45cb-80ca-a5b3-f7c54494a6ed | In Progress | 2025 | **Review** |
| Brand Strategy Mini Qs | 2886ed08-45cb-8046-992f-ed1a1c839fa6 | In Progress | 2025 | **Active** |

---

## T5: Archive Recommendations

**Immediate Archive (Pre-2024, no recent activity):**
1. ReFi BCN <> Gitcoin GR18 (1386ed08-45cb-81ae-a83d-dfe3f0b3e23b)
2. ReFi DAO Local Nodes Beta Cohort (1386ed08-45cb-81de-b6ab-d25878d0cf14)
3. Outreach List (1386ed08-45cb-814c-a668-ea42c2db06ce)
4. Content & Communications Plan (1386ed08-45cb-81e8-811d-c189bafdd978)
5. Ecosystem Mapping & Research Plan (1386ed08-45cb-81e4-8d84-c2b8d1309496)
6. IRL Events Plan (1386ed08-45cb-815c-8cff-ef1b6d761f04)
7. Coordination & Governance Plan (1386ed08-45cb-814b-8064-d18e4f942982)

**Decision Required (Luiz):**
- Decidim Fest Thread — still relevant post-fest?
- ReFi BCN One Pager V2 — merged into Brand Strategy?

---

## T6: Active Projects Synced to Local

Updated `data/projects.yaml` with current status:

```yaml
- id: regenerant-catalunya
  name: Regenerant Catalunya
  notion_id: 21c6ed08-45cb-8050-88e6-c743b4ed53dc
  status: active
  priority: high
  owner: luiz
  last_sync: "2026-03-17"

- id: brand-strategy
  name: Brand Strategy & One Pager
  notion_id: 2886ed08-45cb-80ce-ae81-f75800e6d192
  status: active
  priority: high
  owner: luiz
  last_sync: "2026-03-17"

- id: refi-bcn-os
  name: ReFi BCN OS
  notion_id: null
  status: active
  priority: high
  owner: luiz
  last_sync: "2026-03-17"
```

---

## T7: Urgent Tasks Extracted to HEARTBEAT

From Notion Tasks (Status: In Progress + Due Soon):

| Task | Assignee | Due | Priority | Added to HEARTBEAT |
|------|----------|-----|----------|-------------------|
| Introducing Regenerant Catalunya Article | Luiz | 2025-11-17 | Medium | ✅ |
| Phase #2 Plan | — | — | High | ✅ |
| Legal Specs (Priori Advocats) | Luiz | — | High | ✅ |
| ReFi BCN One Pager V2 | Luiz | — | Medium | ✅ |

**Note:** Most tasks lack due dates — recommend adding deadlines for accountability.

---

## T8: Weekly Sync Protocol

### SOURCE-OF-TRUTH-MATRIX.md

Created protocol document at `docs/SOURCE-OF-TRUTH-MATRIX.md`:

```markdown
# Source of Truth Matrix — ReFi BCN

| Data Type | Primary Source | Secondary/Mirror | Sync Direction | Frequency |
|-----------|---------------|------------------|----------------|-----------|
| Projects | Notion Projects DB | data/projects.yaml | Notion → Local | Weekly (Mon) |
| Tasks | Notion Tasks DB | HEARTBEAT.md | Notion → Local | Weekly (Mon) |
| Members | data/members.yaml | Notion (manual) | Local → Notion | As needed |
| Funding | data/funding-opportunities.yaml | Notion CRM | Local → Notion | Bi-weekly |
| Finances | data/finances.yaml | Notion (manual) | Local primary | Monthly |

## Sync Protocol (Weekly)
1. **Monday 09:00** — Query Notion Projects for status changes
2. **Monday 09:30** — Query Notion Tasks for new/completed items
3. **Monday 10:00** — Update local YAML files
4. **Monday 10:30** — Update HEARTBEAT.md priorities
5. **Monday 11:00** — Generate reconciliation report if drift detected

## Conflict Resolution
- If Notion and local differ: Trust Notion for project status (ops source)
- If local has data Notion lacks: Evaluate if it belongs in Notion
- If drift > 5 items: Flag for Luiz review
```

---

## T9: First Sync Cycle Test

**Test Executed:** 2026-03-17  
**Results:**
- ✅ Successfully queried Notion Projects DB (62 items)
- ✅ Successfully queried Notion Tasks DB (50+ items)
- ✅ Successfully queried Notion CRM (99+ contacts)
- ✅ Generated reconciliation report
- ✅ Updated local projects.yaml
- ✅ Extracted urgent tasks to HEARTBEAT

**Issues Found:**
1. Many tasks lack due dates — limits urgency assessment
2. Project-to-task linking in Notion is inconsistent
3. No automatic sync mechanism (manual process required)

**Recommendations:**
1. Add due dates to all active tasks in Notion
2. Review and archive stale projects (list above)
3. Consider automation via Notion API + cron

---

## Blockers Requiring Luiz Decision

| Blocker | Context | Decision Needed |
|---------|---------|-----------------|
| Archive old GR18/GR19 projects | 2023-era Gitcoin rounds | Confirm archive |
| Decidim Fest Thread status | Event completed Nov 2024 | Archive or keep? |
| One Pager V2 vs Brand Strategy | Duplicate/similar scopes | Merge or separate? |
| Miceli workshop materials | Workshop Wed 10 AM | Confirm readiness |

---

## Next Actions

1. **Immediate:** Archive 7 stale projects in Notion (listed in T5)
2. **By Wed:** Confirm Miceli workshop readiness (materials staged)
3. **Weekly:** Execute sync protocol every Monday
4. **Ongoing:** Add due dates to active tasks for better tracking

---

**Report Generated By:** ReFi BCN Operations Agent  
**Review Required By:** Luiz  
**Next Review:** 2026-03-24 (weekly)

---
---

# Notion ↔ Local YAML Reconciliation Snapshot #1

**Date:** 2026-04-15  
**Scope:** First formal reconciliation — document all data domains, sync freshness, access issues, and gaps  
**Prior reference:** T3-T9 report above (2026-03-17), NOTION-INTEGRATION-LOG.md, NOTION-INTEGRATION-TEST.md

---

## 1. Data Domain Inventory

### Local YAML Files (data/)

| File | Domain | Record Count | Schema Version | Has Notion IDs | Primary Source |
|------|--------|-------------|----------------|----------------|----------------|
| `projects.yaml` | Projects & Areas | 25 entries (7 areas, 6 active projects, 2 backlog, 1 paused, 1 done, 8 archived) | 2.0 | Yes (23 of 25) | Notion → Local |
| `members.yaml` | Core Team | 3 members | 2.0 | No | Local primary |
| `meetings.yaml` | Meeting Notes | 38 meetings (Oct 2025 – Apr 2026) | 2.0 | No | Local primary |
| `events.yaml` | Events & Deadlines | 6 events | 2.0 | No | Local primary |
| `funding-opportunities.yaml` | Funding Pipeline | 20 opportunities | 2.0 | No | Local primary |
| `finances.yaml` | Budgets & Treasury | Multiple budgets | 2.0 | No | Local primary |
| `relationships.yaml` | Stakeholder Map | Multiple entities | 2.0 | No | Local primary |
| `ideas.yaml` | Ideation Board | Unknown | — | — | Local only |
| `pending-payouts.yaml` | Payout Queue | Unknown | — | — | Local only |
| `governance.yaml` | Governance | Unknown | — | — | Local only |
| `channels.yaml` | Comms Channels | Unknown | — | — | Local only |
| `assets.yaml` | Assets | Unknown | — | — | Local only |
| `sources.yaml` | Source Registry | Unknown | — | — | Local only |
| `knowledge-manifest.yaml` | Knowledge Index | Unknown | — | — | Local only |
| `telegram-topic-routing.yaml` | Telegram Config | Unknown | — | — | Local only |

### Notion Databases (Connected)

| Database | Notion ID | Local Mirror | Status |
|----------|-----------|-------------|--------|
| Projects | `1386ed08-45cb-8185-a48b-000bc4a72d53` | `data/projects.yaml` | Last synced 2026-04-06 |
| Tasks | `1386ed08-45cb-8142-801b-000b2cb5c615` | `HEARTBEAT.md` | Not actively synced |
| CRM | `2156ed08-45cb-815c-9a3a-000b46e37cb7` | `data/relationships.yaml` | Not synced |
| Research | `1386ed08-45cb-814b-9193-000b605eb1e7` | `knowledge/` | Not synced |

---

## 2. Sync Freshness Assessment

| Domain | Last Sync Date | Days Stale (as of 2026-04-15) | Protocol Target | Status |
|--------|---------------|-------------------------------|-----------------|--------|
| Projects (Notion → Local) | 2026-04-06 | **9 days** | Weekly (Mon) | OVERDUE — missed 2026-04-13 sync |
| Tasks (Notion → HEARTBEAT) | Never formally synced | N/A | Weekly (Mon) | NOT ACTIVE |
| Members (Local primary) | N/A (local is source) | N/A | As needed | OK |
| Meetings (Local primary) | 2026-04-14 (latest entry) | 1 day | Per meeting | OK |
| Events (Local primary) | 2026-04-14 (recent edits) | 1 day | Per event | OK |
| Funding (Local primary) | 2026-04-14 (3 items updated) | 1 day | Bi-weekly | OK |
| Finances (Local primary) | Unknown | Unknown | Monthly | NEEDS CHECK |
| CRM/Relationships (Local primary) | Unknown | Unknown | As needed | NOT SYNCED |

---

## 3. Known Issues and Blockers

### A. Notion Integration Access (CRITICAL)

- **Problem:** On 2026-04-09, the Notion DB `1386ed08-45cb-8185-a48b-000bc4a72d53` (Projects) returned "not shared with integration" error during `initialize.mjs` execution.
- **Root cause:** The Notion integration (`refi-bcn-openclaw`) needs to be explicitly shared with each database page. This sharing may have been revoked or was never set for the current API key.
- **Impact:** Automated Notion → Local sync is blocked. The 2026-04-06 sync was the last successful pull.
- **Action required:** Luiz must re-share the Projects DB (and Tasks, CRM, Research DBs) with the `refi-bcn-openclaw` integration in Notion settings.

### B. Overdue Projects Sync

- **Protocol says:** Weekly Monday sync (SOURCE-OF-TRUTH-MATRIX.md).
- **Reality:** Last sync was 2026-04-06. The `next_sync: "2026-04-13"` in projects.yaml was missed.
- **Drift risk:** 9 days without sync. Any project status changes in Notion (new projects, status updates, reassignments) are not reflected locally.
- **Two projects have local-only sync dates of 2026-04-13:** `knowledge-and-infrastructure` and `communications` — these appear to have been updated locally without a Notion pull (local-primary edits, not synced from Notion).

### C. Tasks DB Never Formally Synced

- The T7 section of the prior report (2026-03-17) extracted urgent tasks from Notion to HEARTBEAT, but no recurring sync pipeline exists.
- `scripts/sync-notion.mjs` was planned but never created.
- Tasks remain manually tracked in HEARTBEAT.md without Notion bidirectional sync.

### D. CRM Not Synced

- Notion CRM (`2156ed08-45cb-815c-9a3a-000b46e37cb7`) contains 99+ contacts (per T9 test).
- Local `data/relationships.yaml` is a manually maintained stakeholder map, structurally different from the Notion CRM.
- No sync pipeline exists. The SOURCE-OF-TRUTH-MATRIX says Funding sync is "Local <-> Notion" but this is aspirational.

### E. Meetings and Events Have No Notion Counterpart

- `data/meetings.yaml` (38 entries) and `data/events.yaml` (6 entries) are local-primary.
- The NOTION-INTEGRATION-TEST.md mentions a Meetings DB mapped to `1386ed08-45cb-8142-801b-000b2cb5c615` — but this is the same ID as the Tasks DB. Possible mismapping.
- No evidence of meetings ever being synced from Notion.

### F. Funding Opportunities Local-Only

- 20 opportunities tracked locally with detailed pipeline fields.
- No Notion mirror exists. SOURCE-OF-TRUTH-MATRIX says "Local <-> Notion" for funding but this is not implemented.
- 3 opportunities were updated on 2026-04-14 (status changed to `archived`), indicating active local maintenance.

---

## 4. Data Quality Observations

| Observation | Severity | Domain |
|-------------|----------|--------|
| `projects.yaml` has well-structured `notion_id`, `notion_status`, `notion_url`, and `source_refs` per entry | Good | Projects |
| `members.yaml` has only 3 entries — no Notion IDs, no notion_status fields | Info | Members |
| `meetings.yaml` has inconsistent `key_outcomes` — many entries contain `'true'`, `'false'`, or `'null'` as string values instead of actual outcomes | Data quality issue | Meetings |
| `events.yaml` has a date mismatch: `event-work-session-20260417` has `date: "2026-04-16"` (ID says 17, date says 16) | Minor | Events |
| `funding-opportunities.yaml` is well maintained with `last_updated` per entry, clear `status` taxonomy, and `fit_assessment` scores | Good | Funding |
| `sync_info` block at bottom of `projects.yaml` provides machine-readable sync metadata — good practice | Good | Projects |

---

## 5. Reconciliation Summary

```
DATA DOMAINS:        15 local YAML files
NOTION-CONNECTED:     4 databases (Projects, Tasks, CRM, Research)
ACTIVELY SYNCED:      1 domain (Projects — but currently blocked)
LOCAL-PRIMARY:        11 domains (Members, Meetings, Events, Funding, Finances, + 6 config files)
NOT SYNCED:           3 Notion DBs (Tasks, CRM, Research — mapped but not active)
SYNC OVERDUE:         Projects (9 days past protocol target)
ACCESS BLOCKED:       Notion integration sharing revoked/missing
```

---

## 6. Recommended Next Actions

| # | Action | Priority | Owner | Dependency |
|---|--------|----------|-------|------------|
| 1 | **Re-share Notion databases with integration** — Go to each DB in Notion → Connections → Share with `refi-bcn-openclaw` | Critical | Luiz | None |
| 2 | **Execute overdue Projects sync** — Once access restored, pull current Notion state into `data/projects.yaml` | High | Agent | Action 1 |
| 3 | **Fix meetings key_outcomes data quality** — Replace `'true'`/`'false'`/`'null'` string values with actual meeting outcomes or remove placeholder values | Medium | Agent | None |
| 4 | **Clarify Tasks vs Meetings DB ID** — The ID `1386ed08-45cb-8142-801b-000b2cb5c615` appears mapped to both "Tasks" and "Meetings" in different docs. Verify which DB it actually is. | Medium | Luiz | Action 1 |
| 5 | **Update SOURCE-OF-TRUTH-MATRIX.md** — Current version dated 2026-03-17. Update "Sync Quality Metrics" to reflect actual state (freshness is now 27+ days stale, not "2026-03-19") | Low | Agent | None |
| 6 | **Scope sync-notion.mjs script** — Currently planned but nonexistent. Decide if manual agent-driven sync is sufficient or if a script is needed. | Low | Luiz | None |

---

**Snapshot Generated By:** ReFi BCN Operations Agent  
**Review Required By:** Luiz  
**Next Reconciliation:** 2026-04-22 (or upon Notion access restoration, whichever comes first)
