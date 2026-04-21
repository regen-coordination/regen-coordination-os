# Source of Truth Matrix — ReFi BCN

Last updated: 2026-03-17

---

## Data Sources Overview

| Data Type | Primary Source | Secondary/Mirror | Sync Direction | Frequency | Owner |
|-----------|---------------|------------------|----------------|-----------|-------|
| Projects | Notion Projects DB | `data/projects.yaml` | Notion → Local | Weekly (Mon) | Agent |
| Tasks | Notion Tasks DB | `HEARTBEAT.md` | Notion → Local | Weekly (Mon) | Agent |
| Members | `data/members.yaml` | Notion (manual) | Local → Notion | As needed | Luiz |
| Funding | `data/funding-opportunities.yaml` | Notion CRM | Local ↔ Notion | Bi-weekly | Agent |
| Finances | `data/finances.yaml` | Notion (manual) | Local primary | Monthly | Luiz |
| Meeting Notes | `packages/operations/meetings/` | Notion (optional) | Local primary | Per meeting | Agent |

---

## Weekly Sync Protocol

### Monday Morning (Ops Agent)
1. **09:00** — Query Notion Projects for status changes
2. **09:30** — Query Notion Tasks for new/completed items
3. **10:00** — Update local YAML files
4. **10:30** — Update `HEARTBEAT.md` priorities
5. **11:00** — Generate reconciliation report if drift detected

### Wednesday (Ops Sync)
- Review drift reports
- Resolve conflicts
- Update archive decisions

---

## Conflict Resolution Rules

1. **Project Status:** Trust Notion (operations source)
2. **Member Data:** Trust local YAML (canonical identity)
3. **Funding Data:** Trust local YAML + Notion CRM combined
4. **Financial Data:** Trust local YAML (treasury source)

**If drift > 5 items:** Flag for Luiz review immediately

---

## Data Source IDs (Notion)

| Database | ID | Purpose |
|----------|-----|---------|
| Projects | 1386ed08-45cb-8185-a48b-000bc4a72d53 | Project tracking |
| Tasks | 1386ed08-45cb-8142-801b-000b2cb5c615 | Task management |
| CRM | 2156ed08-45cb-815c-9a3a-000b46e37cb7 | Contact/partner registry |
| Research & Reading | 1386ed08-45cb-814b-9193-000b605eb1e7 | Knowledge base |

---

## Automation Notes

- Current sync is **manual** via agent execution
- Notion API rate limit: ~3 requests/second
- Recommended batch size: 100 items per query
- Notion Status property type: `status` (not `select`) — use status-based filters in API queries
- Future: Consider GitHub Actions for scheduled sync

## Sync Quality Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Projects sync freshness | < 7 days | ✅ 2026-03-19 |
| Archive drift | 0 | ⚠️ 7 pending approval |
| Tasks with due dates | > 50% | ⚠️ ~30% |
| Data validation | Pass | ✅ T9 complete |
