# Notion Seamless Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Notion integration work seamlessly both via MCP (agent sessions) and via API key (scripts/CI), with clear setup docs and loud warnings when misconfigured.

**Architecture:** Two-path design. The `initialize.mjs` script tries `NOTION_API_KEY` env var first (for terminal/CI use). When the key is missing, it outputs a clear warning with setup instructions. For agent sessions (Claude Code/Cursor), MCP Notion tools are always available and the `/initialize` skill supplements any gaps. A `.env.example` file documents required/optional env vars. The setup script (`setup-org-os.mjs`) gains a Notion setup step.

**Tech Stack:** Node.js (ESM), `@notionhq/client`, `dotenv`, Notion MCP tools, `@clack/prompts`

---

### Task 1: Add `.env.example` and `dotenv` support

**Files:**
- Create: `.env.example`
- Modify: `package.json`
- Modify: `scripts/initialize.mjs:1-20`

- [ ] **Step 1: Create `.env.example`**

```bash
# .env.example — ReFi BCN OS environment configuration
# Copy to .env and fill in values: cp .env.example .env

# Notion API key (for script-based Notion access)
# Get yours: https://www.notion.so/profile/integrations → create integration → copy key
# Then share your Notion databases with the integration
# Optional if using Claude Code/Cursor (MCP handles auth automatically)
NOTION_API_KEY=
```

- [ ] **Step 2: Install dotenv**

Run: `npm install dotenv`
Expected: Added to `dependencies` in `package.json`

- [ ] **Step 3: Add dotenv import to `initialize.mjs`**

At the top of `scripts/initialize.mjs`, after the existing imports (line 6), add:

```javascript
import "dotenv/config";
```

This auto-loads `.env` if present. No other code changes — `process.env.NOTION_API_KEY` now reads from `.env` or shell environment.

- [ ] **Step 4: Verify `.env` is in `.gitignore`**

Check that `.gitignore` already contains `.env` (it does — line 24). No changes needed.

- [ ] **Step 5: Commit**

```bash
git add .env.example package.json package-lock.json scripts/initialize.mjs
git commit -m "feat: add .env.example and dotenv support for Notion API key"
```

---

### Task 2: Add clear warning when `NOTION_API_KEY` is missing

**Files:**
- Modify: `scripts/initialize.mjs:946-966` (the `fetchNotionData` function)
- Modify: `scripts/initialize.mjs:1153-1166` (the main function Notion handling)

- [ ] **Step 1: Update `fetchNotionData` to return a status object instead of just `null`**

Replace the early return in `fetchNotionData` (lines 947-948):

```javascript
// OLD:
const apiKey = process.env.NOTION_API_KEY;
if (!apiKey) return null;

// NEW:
const apiKey = process.env.NOTION_API_KEY;
if (!apiKey) {
  return { status: "no-key", projects: [], meetings: [], members: [] };
}
```

- [ ] **Step 2: Update the main function to handle the status and warn clearly**

Replace the Notion handling block in `main()` (around lines 1153-1166):

```javascript
// OLD:
const notionData = await Promise.race([
  fetchNotionData(toolsMd),
  new Promise((resolve) => setTimeout(() => {
    process.stderr.write("[warn] Notion API timed out after 8s\n");
    resolve(null);
  }, 8000)),
]);
if (notionData) {
  state = mergeData(state, notionData);
  state.status.notionConnected = true;
} else {
  state.status.notionConnected = false;
  if (process.env.NOTION_API_KEY) warnings.push("Notion API returned no data");
}

// NEW:
const notionData = await Promise.race([
  fetchNotionData(toolsMd),
  new Promise((resolve) => setTimeout(() => {
    process.stderr.write("[warn] Notion API timed out after 8s\n");
    resolve(null);
  }, 8000)),
]);
if (notionData?.status === "no-key") {
  state.status.notionConnected = false;
  process.stderr.write(
    "[info] NOTION_API_KEY not set — Notion data skipped. " +
    "Copy .env.example to .env and add your key, or use Claude Code (MCP handles auth).\n"
  );
} else if (notionData && notionData.status !== "no-key") {
  state = mergeData(state, notionData);
  state.status.notionConnected = true;
} else {
  state.status.notionConnected = false;
  if (process.env.NOTION_API_KEY) warnings.push("Notion API returned no data");
}
```

- [ ] **Step 3: Test with and without API key**

Run without key:
```bash
unset NOTION_API_KEY && node scripts/initialize.mjs --format=markdown 2>&1 | head -5
```
Expected: stderr shows `[info] NOTION_API_KEY not set` message. Dashboard still renders.

Run with key (if available):
```bash
export NOTION_API_KEY=ntn_... && node scripts/initialize.mjs --format=markdown 2>&1 | head -5
```
Expected: No warning, Notion data merged.

- [ ] **Step 4: Commit**

```bash
git add scripts/initialize.mjs
git commit -m "feat: clear warning when NOTION_API_KEY missing, with setup instructions"
```

---

### Task 3: Fix the API key path (re-share Notion databases)

**Files:**
- None (Notion workspace configuration, not code)

This task requires the operator (Luiz) to act in Notion. The agent should present the instructions and confirm.

- [ ] **Step 1: Verify which integration name is configured**

Check `TOOLS.md` — the integration is called `refi-bcn-openclaw`. The operator needs to verify this integration exists at https://www.notion.so/profile/integrations.

- [ ] **Step 2: Re-share the Projects database with the integration**

In Notion:
1. Open the Projects database page
2. Click "..." menu → "Connections" → find `refi-bcn-openclaw`
3. If not connected, click "Connect to" and add it
4. Confirm access

- [ ] **Step 3: Test the API key path**

```bash
node scripts/initialize.mjs --format=markdown 2>&1 | grep -i "notion\|warn"
```
Expected: No `[warn] Notion projects DB` error. Dashboard shows Notion data.

- [ ] **Step 4: Document the fix in NOTION-INTEGRATION-LOG.md**

Append to `docs/NOTION-INTEGRATION-LOG.md`:

```markdown
## 2026-04-15 — Re-shared databases with integration

- Projects DB re-shared with `refi-bcn-openclaw` integration
- Root cause: integration lost access (Notion permissions drift)
- Verified: `initialize.mjs` now queries Projects DB successfully
```

- [ ] **Step 5: Commit**

```bash
git add docs/NOTION-INTEGRATION-LOG.md
git commit -m "docs: log Notion integration re-sharing fix"
```

---

### Task 4: Add Notion setup step to `setup-org-os.mjs`

**Files:**
- Modify: `scripts/setup-org-os.mjs` (add Notion setup section after existing org setup)

- [ ] **Step 1: Read the full current setup script**

Read `scripts/setup-org-os.mjs` to understand its structure and where to insert the Notion step.

- [ ] **Step 2: Add Notion setup prompt after existing setup steps**

After the existing setup flow (packages selection, file writes), add:

```javascript
// ── Notion Integration (optional) ──────────────────────────────────────────

const setupNotion = await confirm({
  message: "Set up Notion integration? (optional — Claude Code/Cursor users get this via MCP)",
  initialValue: false,
});

if (isCancel(setupNotion)) {
  cancel("Setup cancelled");
  process.exit(0);
}

if (setupNotion) {
  const notionKey = await text({
    message: "Notion API key (from https://www.notion.so/profile/integrations):",
    placeholder: "ntn_...",
    validate: (value) => {
      if (!value) return "API key is required if setting up Notion";
      if (!value.startsWith("ntn_") && !value.startsWith("secret_"))
        return 'Key should start with "ntn_" or "secret_"';
    },
  });

  if (isCancel(notionKey)) {
    cancel("Setup cancelled");
    process.exit(0);
  }

  // Write .env file
  const envPath = path.join(rootDir, ".env");
  const envContent = `# ReFi BCN OS — local environment\nNOTION_API_KEY=${notionKey}\n`;
  fs.writeFileSync(envPath, envContent);
  console.log("  ✓ Wrote .env with NOTION_API_KEY");
  console.log("  → Now share your Notion databases with the integration in Notion settings");
}
```

- [ ] **Step 3: Commit**

```bash
git add scripts/setup-org-os.mjs
git commit -m "feat: add optional Notion setup step to setup-org-os.mjs"
```

---

### Task 5: Update documentation for fresh clones

**Files:**
- Modify: `TOOLS.md:49-70` (Notion section)
- Modify: `CLAUDE.md` (Quick Start section)

- [ ] **Step 1: Update TOOLS.md Notion section**

Replace the existing Notion Integration subsection with clearer setup instructions:

```markdown
### Notion Integration (for /initialize dashboard)

**Two access paths — both work:**

1. **MCP (Claude Code / Cursor):** Automatic. Notion MCP handles auth via Claude's native connection. No setup needed.
2. **API Key (scripts, terminal, CI):** Set `NOTION_API_KEY` in `.env`:
   ```bash
   cp .env.example .env
   # Edit .env and paste your key from https://www.notion.so/profile/integrations
   ```
   Then share each database below with your integration in Notion.

Integration name: `refi-bcn-openclaw`
API Key env var: NOTION_API_KEY

Database IDs:

- Projects: 1386ed08-45cb-8185-a48b-000bc4a72d53
- Tasks: 1386ed08-45cb-8142-801b-000b2cb5c615
- Notes & Documents: 1386ed08-45cb-81ed-b055-000ba5b70a6b

### All Connected Data Sources

- ReFi BCN CRM: 2156ed08-45cb-815c-9a3a-000b46e37cb7
- Empenta work Hours count: 2f16ed08-45cb-8035-a2fc-000bb5e6f970
- Research & Reading List DB: 1386ed08-45cb-814b-9193-000b605eb1e7

### Notes

- Never store API keys/tokens in tracked files. Use `.env` (gitignored).
- If `NOTION_API_KEY` is missing, `initialize.mjs` warns and continues with local data only.
```

- [ ] **Step 2: Add setup note to CLAUDE.md Quick Start**

After the "Read `MASTERPLAN.md` first" line, add:

```markdown
**Optional: Notion API access.** Copy `.env.example` to `.env` and add your `NOTION_API_KEY` for script-based Notion access. Not needed if using Claude Code/Cursor (MCP handles auth automatically).
```

- [ ] **Step 3: Commit**

```bash
git add TOOLS.md CLAUDE.md
git commit -m "docs: clarify Notion dual-path setup (MCP + API key) for fresh clones"
```

---

### Task 6: Verify end-to-end

**Files:** None (verification only)

- [ ] **Step 1: Test fresh-clone simulation (no env var)**

```bash
unset NOTION_API_KEY
node scripts/initialize.mjs --format=markdown 2>&1
```
Expected: Dashboard renders with local data. Stderr shows `[info] NOTION_API_KEY not set` message. No crash.

- [ ] **Step 2: Test with `.env` file**

```bash
# Ensure .env has NOTION_API_KEY set
node scripts/initialize.mjs --format=markdown 2>&1
```
Expected: Dashboard renders with Notion data merged. No warnings about Notion.

- [ ] **Step 3: Test MCP path**

Use `notion-fetch` MCP tool to query the Projects database ID `1386ed08-45cb-8185-a48b-000bc4a72d53`.
Expected: Returns full database schema and data.

- [ ] **Step 4: Verify `.env.example` is tracked, `.env` is not**

```bash
git status
```
Expected: `.env.example` tracked. `.env` not shown (gitignored).
