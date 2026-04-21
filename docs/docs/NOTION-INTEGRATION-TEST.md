# Notion Integration Test Report — ReFi BCN

**Date:** 2026-04-06
**Status:** Assessment
**Test Type:** Notion Workspace Integration Validation

---

## Summary

ReFi BCN has a **fully architected but partially activated** Notion integration:
- ✓ Code complete: initialize.mjs has full Notion API client integration
- ✓ Configuration documented: Database IDs, workspace URL, sync protocol
- ⚠️ Activation blocked: Missing @notionhq/client dependency + API key not set
- ❌ Data stale: Last sync 2026-03-19 (18 days old, protocol calls for weekly)

**Integration Readiness: 80%** — Code and docs ready, needs dependency + key activation.

---

## Architecture Assessment

### ✓ Code Level

`scripts/initialize.mjs` contains complete Notion integration:

**Notion Client Setup (lines 769-794)**
- Uses `@notionhq/client` library (if available)
- Reads `NOTION_API_KEY` from environment
- Graceful fallback if key not set

**Data Fetchers (lines 795-853)**
- `fetchNotionData()` queries two databases:
  - Projects DB: `1386ed08-45cb-8185-a48b-000bc4a72d53`
  - Meetings DB: `1386ed08-45cb-8142-801b-000b2cb5c615`
- Extracts properties: title, status, lead, date, URL
- Returns structured data for merging

**Data Merge (lines 887-920)**
- `mergeData(local, notion)` combines Notion data with local YAML
- Notion data takes precedence for Projects and Meetings
- Handles missing data gracefully

**Status Reporting (line 1032)**
- Sets `notionConnected: true/false` in JSON output
- Visible in initialize dashboard

### ✓ Configuration Level

**TOOLS.md documents** (lines 42-71):
- Workspace URL: https://www.notion.so/ReFi-Barcelona-1386ed0845cb80d99ab8e7de7ad5fb16
- Integration name: `refi-bcn-openclaw`
- API Key env variable: `NOTION_API_KEY`
- Database IDs for Projects, Tasks, CRM, Research

**SOURCE-OF-TRUTH-MATRIX.md documents** (lines 1-74):
- Weekly sync schedule (Monday 09:00)
- Sync protocol: Notion Projects → `data/projects.yaml`
- Conflict resolution rules (Notion is source-of-truth for projects)
- Last sync: 2026-03-19
- Data validation metrics

**NOTION-WORKSPACE-MAP.md documents** (6 main databases):
- CRM: Partner/contact pipeline
- Projects: Active project portfolio
- Tasks: Execution queue
- Notes & Documents: Operational documentation
- Research & Reading: Knowledge base
- Empenta Hours: Time tracking

---

## Issues Found

### 1. **Missing Dependency (Blocking)**

❌ **`@notionhq/client` not in `package.json`**

Current dependencies:
- @clack/prompts, gray-matter, js-yaml, prettier (dev)
- Missing: @notionhq/client

**Impact:**
- If `NOTION_API_KEY` is set, line 792 will fail: `await import("@notionhq/client")`
- Script will fall back to local-only mode (gracefully)
- Notion sync cannot activate

**Fix:** Add to package.json:
```json
{
  "dependencies": {
    "@notionhq/client": "^3.1.0"
  }
}
```

### 2. **Stale Data (18 days old)**

⚠️ **Last sync: 2026-03-19, protocol requires weekly**

Per `SOURCE-OF-TRUTH-MATRIX.md`:
- Sync frequency: Weekly (Monday morning)
- Last documented sync: 2026-03-19
- Current date: 2026-04-06 (18 days old)
- Next sync overdue by ~11 days

**What's missing in local YAML:**
From meeting records (2026-03-12 live work session):
1. ReFi DAO Service Framework — NEW active
2. Misselli Position — NEW active
3. Event Organization (June) — NEW active
4. EU €20M Grant — NEW active
5. Decidim Partnership — NEW active

**Impact:**
- `npm run initialize` will report 8 active projects (from YAML)
- Actual portfolio has 13 active projects per latest meetings
- Dashboard will be incomplete

### 3. **Notion Workspace Drift**

⚠️ **33 projects in Notion, only 15 in local YAML**

Per `notion-infra-review-t3-t4-analysis-2026-03-16.md` (March 16 analysis):
- Total Notion projects: 33
- Local YAML projects: 15 (8 active + 7 archived)
- 18 projects in Notion not in local YAML
- Many stale (no updates 4+ months)

**Active project distribution in Notion (by status):**
- In Progress: 5 projects
- Planning: 5 projects (mostly stale)
- Backlog: 17 projects (mostly stale)
- Paused: 3 projects
- Done: 3 projects

**Concern:** Notion is accumulating stale projects. Not clear which are truly active vs. awaiting archive.

### 4. **Database Query Verification Needed**

⚠️ **Script references "Meetings" but may need "Tasks"**

Current script (line 827):
```javascript
// Fetches "meetings" with the database ID for Tasks (8142...)
const response = await notion.databases.query({
  database_id: "1386ed08-45cb-8142-801b-000b2cb5c615",
  // ...
});
```

**Issue:** Database ID `8142` is documented as **Tasks DB** in TOOLS.md, not Meetings DB.
- Script assumes Meetings DB ID
- May be extracting wrong data structure
- Need to verify: Are meeting notes in Projects database or separate?

**Verification steps:**
1. Check which database ID actually contains meetings
2. Verify property names (Date, Lead, Type) exist in target DB
3. Test extraction of sample records

### 5. **API Key Not Set (Blocking)**

❌ **`NOTION_API_KEY` environment variable not found**

Current state:
```
env | grep -i notion  # No output
```

**Impact:**
- Line 771 checks: `if (!apiKey) { ... return null; }`
- Falls back to local-only mode silently
- No error messages, integration just dormant

**Required to activate:**
1. Create Notion integration in workspace (if not done)
2. Generate API key from integration settings
3. Store in secure location (environment, GitHub secrets, etc.)
4. Export before running initialize: `export NOTION_API_KEY=...`

---

## Test Results

### Local Mode (Current)
```
node scripts/initialize.mjs

Expected output:
- Status: "notionConnected": false
- Projects: 8 active (from data/projects.yaml)
- No Notion data merged
- Result: Stale dashboard
```

### With Notion (When Activated)
```
export NOTION_API_KEY=<key>
npm install @notionhq/client
node scripts/initialize.mjs

Expected output:
- Status: "notionConnected": true
- Projects: merged from Notion + local
- Fresh data if Notion is current
- Risk: May see stale/archived projects if Notion not cleaned up
```

---

## Recommendations

### Priority 1: Enable Integration (1-2 hours)

**Steps:**
1. Add @notionhq/client to package.json dependencies
2. Run `npm install`
3. Obtain NOTION_API_KEY from Notion workspace integration
4. Test: `export NOTION_API_KEY=...; node scripts/initialize.mjs`
5. Verify `"notionConnected": true` in output

**Files to change:**
- `package.json` — Add dependency

### Priority 2: Sync Fresh Data (2-3 hours)

**Steps:**
1. Query Notion Projects database via Notion UI (or API)
2. Identify 5 new active projects from meeting records
3. Add to `data/projects.yaml` with `schema_version: "2.0"` header
4. Verify 7 stale archived projects are marked `status: archived`
5. Run `npm run validate:structure` to ensure YAML valid
6. Commit: "sync: update projects.yaml from Notion (5 new, 7 archived)"

**New projects to add:**
```yaml
- id: refi-dao-service-framework
  name: ReFi DAO Service Framework
  status: active
  priority: high
  owner: luiz
  start_date: "2026-03"

- id: misselli-position
  name: Misselli Position
  status: active
  priority: medium
  owner: luiz
  start_date: "2026-03"

# ... (3 more from meeting notes)
```

### Priority 3: Fix Database Mapping (1 hour)

**Verification:**
1. Check TOOLS.md database IDs are correct
2. Verify which DB has "meetings" (Projects DB or separate?)
3. Confirm property names (Date vs Created Time, Lead vs Owner)
4. Update script if database mapping is wrong

**Test:**
```bash
# Manual Notion API query (using curl + key)
curl -X POST https://api.notion.com/v1/databases/1386ed08-45cb-8185-a48b-000bc4a72d53/query \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  -d '{}' | jq '.results[0].properties'
```

### Priority 4: Automate Sync Schedule (2-3 hours, future)

**Steps (not yet implemented):**
1. Create `.github/workflows/notion-sync.yml`
2. Trigger: Weekly Monday 08:00 UTC
3. Run: `node scripts/initialize.mjs --format=json > projects.json`
4. Extract new/changed projects
5. Auto-commit if drift detected
6. Notify if >5 items changed

**Benefits:**
- Weekly sync happens automatically
- Dashboard always current
- Drift detected early

### Priority 5: Document Sync Procedure (30 minutes)

**In CLAUDE.md Quick Start:**
```markdown
### Notion Sync

Projects sync from Notion workspace weekly (Monday).
- Source: https://www.notion.so/ReFi-Barcelona-...
- Integration: refi-bcn-openclaw
- Protocol: See docs/SOURCE-OF-TRUTH-MATRIX.md

To manually sync:
1. Verify NOTION_API_KEY is set
2. Run: node scripts/initialize.mjs --format=markdown
3. Review dashboard output
4. If drift > 5 items, run conflict resolution process
```

---

## Validation Checklist

Before declaring Notion integration "ready for production":

- [ ] `@notionhq/client` added to package.json
- [ ] `npm install` completes successfully
- [ ] NOTION_API_KEY set in environment
- [ ] `node scripts/initialize.mjs` runs without error
- [ ] Output includes `"notionConnected": true`
- [ ] Projects in output match Notion workspace (spot check 3-5)
- [ ] 5 new active projects added to data/projects.yaml
- [ ] 7 stale projects archived in Notion
- [ ] `npm run validate:structure` passes
- [ ] Database property mapping verified (Date, Lead, Status, Type)
- [ ] Weekly sync documented in CLAUDE.md

---

## Files Involved

**Code:**
- `scripts/initialize.mjs` — Notion client + merge logic

**Configuration:**
- `TOOLS.md` — Database IDs, workspace URL, API key reference
- `SOURCE-OF-TRUTH-MATRIX.md` — Sync protocol, freshness metrics
- `NOTION-WORKSPACE-MAP.md` — Database structure, relationships

**Data:**
- `data/projects.yaml` — Project registry (sync target)
- `data/members.yaml` — Team (future: sync from CRM)
- `data/meetings.yaml` — Meeting records (future: sync from Notion)

**Workflows (future):**
- `.github/workflows/notion-sync.yml` — Weekly sync automation

---

## Appendix: Notion Workspace Structure

```
ReFi Barcelona Workspace
├── CRM (Contact Pipeline)
│   └── 2156ed08-45cb-815c-9a3a-000b46e37cb7
├── Projects (Portfolio)
│   └── 1386ed08-45cb-8185-a48b-000bc4a72d53 ← Syncs to data/projects.yaml
├── Tasks (Execution Queue)
│   └── 1386ed08-45cb-8142-801b-000b2cb5c615
├── Notes & Documents
│   └── 1386ed08-45cb-81ed-b055-000ba5b70a6b
├── Research & Reading
│   └── 1386ed08-45cb-814b-9193-000b605eb1e7
└── Empenta Hours
    └── 2f16ed08-45cb-8035-a2fc-000bb5e6f970
```

**Data Flow:**
```
Notion Projects DB
    ↓ (via API, NOTION_API_KEY)
fetchNotionData()
    ↓ (extract + transform)
mergeData()
    ↓ (combine with local YAML)
initialize.mjs output
    ├── JSON (for agents)
    ├── Markdown (for /initialize dashboard)
    └── Status: notionConnected=true/false
```

---

**Status:** Ready for implementation. Next action: add dependency + set API key.
