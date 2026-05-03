# Phase 2 — Monorepo Scaffold + `aggregator-ui` Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a pnpm-managed monorepo workspace within `regen-coordination-os/`, build the `packages/aggregator-ui` foundation (theme tokens, all 12 shadcn-aligned primitives, all 8 composite patterns) per `docs/DESIGN.md`, scaffold `packages/aggregator-config` (Zod schema for instance configuration), and ship an Astro-based showcase at `apps/storybook/` that renders every primitive and composite in light + dark themes at every breakpoint. End state: operator can open the storybook locally, click through every primitive/composite × theme × breakpoint, and approve before Phase 3 starts.

**Architecture:** pnpm workspace at repo root, scoped to `packages/aggregator-*` and `apps/*` (existing operational packages under `packages/` keep their independent layout). Tailwind v4 with CSS-first `@theme` tokens consuming the OKLCH variables generated from `docs/DESIGN.md` §2. shadcn/ui components installed manually (`npx shadcn@latest`) and re-exported through thin wrappers under `packages/aggregator-ui/primitives/`. Astro storybook renders every component via Astro islands; theme switcher swaps `data-theme` on `<html>`; breakpoint preview via responsive viewport iframe. `packages/aggregator-config` defines the Zod schema for any future aggregator instance's configuration (theme overrides, source toggles, feature flags). CI extends the existing `npm run validate:schemas` target with a Zod-schema runner.

**Tech Stack:** pnpm workspaces · TypeScript 5.x · Tailwind v4 (`@theme`-based, OKLCH-first) · shadcn/ui (manual `npx shadcn@latest`) · Radix UI primitives · Lucide React · React 19 + react-dom · Astro 5 with `@astrojs/react` · Vitest + @testing-library/react · Zod · Changesets · Prettier · ESLint · GitHub Actions (extending existing schema-check infra).

---

## Pre-flight: Repo state + decisions

Before Task 1, confirm the following are in place from Phase 1 (already merged to `main` at this point):

```bash
ls docs/DESIGN.md docs/design-source/contrast-report.json scripts/derive-{light,dark}-tokens.mjs
```

Expected: all five files exist. DESIGN.md is the authoritative source for token values; deviations from it require a DESIGN.md update first per its §12.6 token change protocol.

**Pre-existing state of this repo:**
- `packages/` already exists with operational packages (agents-app, dashboard, regen-toolkit, etc.) — these are NOT in scope for the aggregator workspace and must remain independent.
- No `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `package-lock.json`, or `tsconfig.base.json` at root.
- Root `package.json` is the org-os template (`organizational-os-template@2.0.0`); it has org-os admin scripts (initialize, setup, generate:schemas, validate:schemas, etc.) that must continue working.
- `.github/workflows/` has `aggregate-knowledge.yml` and `distribute-skills.yml` — leave both untouched.

**Decisions baked into this plan:**

| Decision | Choice | Why |
|---|---|---|
| Workspace scope | `packages/aggregator-*` + `apps/*` only | Don't disrupt existing operational packages |
| Package manager | pnpm | Spec §2 mandates; better hoisting story |
| Tailwind | v4 (`@theme` CSS-first) | OKLCH-first design, no JS config friction; matches DESIGN.md §2 |
| shadcn install path | Manual `npx shadcn@latest init` | Phase 0 confirmed no installer skill |
| Showcase | Astro at `apps/storybook/` | Spec offers "Storybook (or Astro showcase)"; Astro avoids heavy Storybook tooling and matches the apps' tech stack (open question §9.4 default: internal-first) |
| Tokens.css architecture | **Single file** (`tokens.css`) with `:root` + `[data-theme="dark"]` selectors | DESIGN.md §0 (post-Phase-1 polish) + §12.1 |
| Lockfile | `pnpm-lock.yaml` only | No prior lockfile to migrate; clean adoption |
| React major | React 19 | Latest, supported by Astro 5 + shadcn |

**Out of scope (deferred to later phases):**
- `packages/aggregator-data/` and any data adapters — Phase 3
- `apps/regen-coordination/` and `apps/regen-ecosystem/` (the actual aggregator apps) — Phase 3 / 4
- Visual-regression CI (Playwright snapshots) — Phase 5 unless trivial to add
- a11y CI workflow with axe-core — Phase 5 (Phase 2 only adds a workflow stub)
- Real federation peer registry — Phase 3
- Production deploy targets — Phase 5

---

## File Structure

| File | Created/Modified | Responsibility |
|---|---|---|
| `pnpm-workspace.yaml` | **Create** | Workspace package globs |
| `package.json` (root) | **Modify** | Add `packageManager`, `engines`, dev tooling deps; preserve org-os scripts |
| `tsconfig.base.json` | **Create** | Shared TypeScript options inherited by every package/app tsconfig |
| `.prettierrc.json` | **Create** | Prettier config (single source of truth) |
| `.eslintrc.cjs` | **Create** | ESLint config (TypeScript + React + accessibility plugins) |
| `vitest.workspace.ts` | **Create** | Vitest workspace config aggregating per-package configs |
| `.changeset/config.json` | **Create** | Changesets config (per-package independent versioning) |
| `.changeset/README.md` | **Create** | Changesets directory marker (auto-generated by `pnpm changeset init`) |
| `.gitignore` | **Modify** | Add `node_modules/`, `dist/`, `.astro/`, `.turbo/`, `coverage/`, `*.tsbuildinfo` |
| `packages/aggregator-ui/package.json` | **Create** | UI package manifest |
| `packages/aggregator-ui/tsconfig.json` | **Create** | Extends `tsconfig.base.json` |
| `packages/aggregator-ui/components.json` | **Create** (via shadcn init) | shadcn config |
| `packages/aggregator-ui/tailwind.config.ts` | **Create** (via shadcn init) | Tailwind v4 plugin entry; mostly defers to `@theme` in CSS |
| `packages/aggregator-ui/theme/tokens.css` | **Create** | OKLCH semantic tokens, light + dark, derived from DESIGN.md §2 |
| `packages/aggregator-ui/theme/gradients.css` | **Create** | Gradient utility classes per DESIGN.md §2.3, §2.5 |
| `packages/aggregator-ui/theme/typography.css` | **Create** | `@fontsource` imports, type-scale variables per DESIGN.md §3 |
| `packages/aggregator-ui/theme/spacing.css` | **Create** | Spacing/radius/shadow vars per DESIGN.md §4 |
| `packages/aggregator-ui/theme/index.css` | **Create** | Barrel CSS importing tokens + gradients + typography + spacing |
| `packages/aggregator-ui/src/index.ts` | **Create** | Package barrel re-exporting primitives + composite patterns |
| `packages/aggregator-ui/src/lib/cn.ts` | **Create** (via shadcn init) | `clsx` + `tailwind-merge` helper |
| `packages/aggregator-ui/src/primitives/<Component>.tsx` | **Create** × 12 | Wrappers around shadcn primitives, layered with our token classes |
| `packages/aggregator-ui/src/components/<Pattern>.tsx` | **Create** × 8 | Composite patterns built from primitives |
| `packages/aggregator-ui/src/__tests__/*.test.tsx` | **Create** | Vitest + Testing Library tests for primitives + composites |
| `packages/aggregator-ui/vitest.config.ts` | **Create** | Per-package test config |
| `packages/aggregator-config/package.json` | **Create** | Config package manifest |
| `packages/aggregator-config/tsconfig.json` | **Create** | Extends base |
| `packages/aggregator-config/src/schema.ts` | **Create** | Zod schema for instance config (theme, sources, features) |
| `packages/aggregator-config/src/index.ts` | **Create** | Barrel export |
| `packages/aggregator-config/src/__tests__/schema.test.ts` | **Create** | Zod schema validation tests |
| `packages/aggregator-config/vitest.config.ts` | **Create** | Per-package test config |
| `apps/storybook/package.json` | **Create** | Astro showcase manifest |
| `apps/storybook/astro.config.mjs` | **Create** | Astro config with `@astrojs/react` + Tailwind v4 |
| `apps/storybook/tsconfig.json` | **Create** | Extends base |
| `apps/storybook/src/layouts/Showcase.astro` | **Create** | Layout: nav sidebar (primitives + composites + tokens), theme switcher, breakpoint preview |
| `apps/storybook/src/pages/index.astro` | **Create** | Index: links to every showcase page |
| `apps/storybook/src/pages/tokens/colors.astro` | **Create** | Token gallery: every semantic token swatch in both themes with hex |
| `apps/storybook/src/pages/tokens/typography.astro` | **Create** | Type-scale gallery |
| `apps/storybook/src/pages/tokens/spacing.astro` | **Create** | Spacing/radius/shadow gallery |
| `apps/storybook/src/pages/primitives/<Component>.astro` | **Create** × 12 | Per-primitive showcase: all variants, all states, both themes |
| `apps/storybook/src/pages/composites/<Pattern>.astro` | **Create** × 8 | Per-composite showcase: full + compact variants |
| `apps/storybook/src/components/ThemeToggle.astro` | **Create** | Light/dark toggle (sets `data-theme` + persists to localStorage) |
| `apps/storybook/src/components/BreakpointFrame.astro` | **Create** | Responsive iframe wrapper with sm/md/lg/xl/2xl preview controls |
| `.github/workflows/schema-check.yml` | **Create** | PR-time Zod schema validation (extends existing `validate:schemas`) |
| `.github/workflows/a11y-audit.yml` | **Create** (stub) | Stub workflow for Phase 5 a11y audits |
| `docs/plans/QUEUE.md` | **Modify** | Mark Phase 2 ✅, queue Phase 3 |
| `memory/2026-05-03.md` (or session date) | **Modify** | Append Phase 2 completion log |

---

## Task 1: Workspace bootstrap (pnpm + tsconfig + .gitignore)

**Files:**
- Create: `pnpm-workspace.yaml`
- Modify: `package.json` (root)
- Create: `tsconfig.base.json`
- Modify: `.gitignore`

- [ ] **Step 1: Create `pnpm-workspace.yaml`**

```yaml
packages:
  - 'packages/aggregator-*'
  - 'apps/*'
```

This scopes pnpm to only the new aggregator packages and apps, leaving the existing `packages/agents-app`, `packages/dashboard`, etc. untouched.

- [ ] **Step 2: Update root `package.json`**

Add the following fields to the existing `package.json` (DO NOT remove existing scripts or fields):

- Add to top-level: `"packageManager": "pnpm@9.12.0"`
- Add `"engines"` (replacing existing if needed):

```json
"engines": {
  "node": ">=22",
  "pnpm": ">=9"
}
```

- Add a `"devDependencies"` block (or merge into existing):

```json
"devDependencies": {
  "@types/node": "^22.0.0",
  "prettier": "^3.3.0",
  "typescript": "^5.6.0",
  "vitest": "^2.1.0"
}
```

- Add scripts (preserve all existing):

```json
"format": "prettier . --write",
"check": "tsc --noEmit && prettier . --check",
"test": "vitest --run",
"test:watch": "vitest"
```

(There's an existing `"check": "tsc --noEmit && npx prettier . --check"` — merge by replacing it with the new value above. There's an existing `"format": "npx prettier . --write"` — replace with new value.)

- [ ] **Step 3: Create `tsconfig.base.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true
  }
}
```

Each package/app `tsconfig.json` extends this and overrides only what it needs.

- [ ] **Step 4: Update `.gitignore`**

Append (don't replace existing entries):

```
# pnpm + monorepo
node_modules/
**/node_modules/
pnpm-debug.log*

# build outputs
dist/
**/dist/
.astro/
**/.astro/
*.tsbuildinfo

# coverage
coverage/
**/coverage/
```

If any of these are already present, leave them — duplicates are harmless but messy; only add the missing ones.

- [ ] **Step 5: Install pnpm + run install**

```bash
corepack enable
corepack prepare pnpm@9.12.0 --activate
pnpm install
```

Expected: `pnpm-lock.yaml` is created at root; `node_modules/` is created with hoisted dev deps. No package-lock.json should exist (delete it if pre-existing).

- [ ] **Step 6: Verify root tooling works**

```bash
pnpm run check
```

Expected: tsc passes (no source files yet beyond the existing org-os JS scripts) and prettier passes (or shows formatting issues for files we'll handle in Task 2).

- [ ] **Step 7: Commit**

```bash
git add pnpm-workspace.yaml package.json tsconfig.base.json .gitignore pnpm-lock.yaml
git commit -m "phase-2: bootstrap pnpm workspace + tsconfig.base + root tooling deps"
```

---

## Task 2: Root tooling — Prettier + ESLint configs

**Files:**
- Create: `.prettierrc.json`
- Create: `.prettierignore`
- Create: `.eslintrc.cjs`
- Create: `.eslintignore`

- [ ] **Step 1: Create `.prettierrc.json`**

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- [ ] **Step 2: Create `.prettierignore`**

```
node_modules/
dist/
.astro/
coverage/
pnpm-lock.yaml
.well-known/
docs/design-source/contrast-report.json
docs/design-source/figma-extract.json
docs/design-source/figma-deep.json
docs/design-source/brand-extract.json
```

(The JSON files in `docs/design-source/` are generated/sampled artifacts; don't reformat them.)

- [ ] **Step 3: Install Prettier Tailwind plugin**

```bash
pnpm add -D -w prettier-plugin-tailwindcss
```

The `-w` flag installs at the workspace root.

- [ ] **Step 4: Create `.eslintrc.cjs`**

```js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/prop-types': 'off',
  },
  ignorePatterns: ['node_modules', 'dist', '.astro', 'coverage', '*.config.*'],
};
```

- [ ] **Step 5: Create `.eslintignore`**

```
node_modules/
dist/
.astro/
coverage/
scripts/
quartz/
packages/dashboard/
packages/agents-app/
packages/coop/
packages/egregore-core/
packages/koi-bridge/
packages/koi-opal-bridge/
packages/opal-bridge/
packages/operations/
packages/paperclip-agents-app/
packages/regen-agents/
packages/regen-toolkit/
packages/webapps/
```

(Existing operational packages are out of ESLint scope — they have their own conventions or none.)

- [ ] **Step 6: Install ESLint deps**

```bash
pnpm add -D -w eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

- [ ] **Step 7: Add lint script to root `package.json`**

Add to `"scripts"`:

```json
"lint": "eslint 'packages/aggregator-*/src/**/*.{ts,tsx}' 'apps/*/src/**/*.{ts,tsx,astro}' --max-warnings 0"
```

(The glob is intentionally narrow — only the new aggregator code is linted.)

- [ ] **Step 8: Verify lint runs (expect "no files found" since no source yet)**

```bash
pnpm run lint
```

Expected: lint runs and reports either "No files matching" or a clean pass — no errors.

- [ ] **Step 9: Commit**

```bash
git add .prettierrc.json .prettierignore .eslintrc.cjs .eslintignore package.json pnpm-lock.yaml
git commit -m "phase-2: add Prettier + ESLint configs (TS + React + jsx-a11y)"
```

---

## Task 3: Changesets initialization

**Files:**
- Create: `.changeset/config.json`
- Create: `.changeset/README.md` (auto-generated)
- Modify: `package.json` (add changeset scripts)

- [ ] **Step 1: Install Changesets CLI**

```bash
pnpm add -D -w @changesets/cli
```

- [ ] **Step 2: Initialize Changesets**

```bash
pnpm changeset init
```

This creates `.changeset/config.json` with defaults and `.changeset/README.md`.

- [ ] **Step 3: Edit `.changeset/config.json` for our setup**

Replace the auto-generated content with:

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "restricted",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

Notes: `access: "restricted"` because we're not publishing to npm yet; `commit: false` so changeset adds don't auto-commit (operator commits manually).

- [ ] **Step 4: Add changeset scripts to root `package.json`**

```json
"changeset": "changeset",
"version-packages": "changeset version",
"release": "changeset publish"
```

- [ ] **Step 5: Verify changeset runs**

```bash
pnpm changeset --help
```

Expected: prints the changeset CLI help, including `add`, `version`, and `publish`.

- [ ] **Step 6: Commit**

```bash
git add .changeset package.json pnpm-lock.yaml
git commit -m "phase-2: initialize Changesets for per-package versioning"
```

---

## Task 4: Scaffold `packages/aggregator-ui` skeleton

**Files:**
- Create: `packages/aggregator-ui/package.json`
- Create: `packages/aggregator-ui/tsconfig.json`
- Create: `packages/aggregator-ui/src/index.ts`
- Create: `packages/aggregator-ui/README.md`

- [ ] **Step 1: Create `packages/aggregator-ui/package.json`**

```json
{
  "name": "@regen-coordination/aggregator-ui",
  "version": "0.1.0",
  "private": true,
  "description": "Shared UI package — primitives + composite patterns + theme tokens for the Regen Coordination aggregator(s).",
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./theme": "./theme/index.css",
    "./theme/tokens.css": "./theme/tokens.css",
    "./theme/gradients.css": "./theme/gradients.css",
    "./theme/typography.css": "./theme/typography.css",
    "./theme/spacing.css": "./theme/spacing.css"
  },
  "files": ["src/", "theme/"],
  "scripts": {
    "test": "vitest --run",
    "test:watch": "vitest",
    "type-check": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "dependencies": {
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-dialog": "^1.1.0",
    "@radix-ui/react-popover": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.0",
    "@radix-ui/react-slot": "^1.1.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "cmdk": "^1.0.0",
    "lucide-react": "^0.460.0",
    "tailwind-merge": "^2.5.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@fontsource/inter": "^5.0.0",
    "@fontsource/jetbrains-mono": "^5.0.0",
    "@fontsource/poppins": "^5.0.0",
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "happy-dom": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0"
  }
}
```

- [ ] **Step 2: Create `packages/aggregator-ui/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src/**/*", "theme/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 3: Create `packages/aggregator-ui/src/index.ts` (empty barrel for now)**

```ts
// Primitives — wrappers around shadcn/ui (Tasks 7-10)
// Composite patterns — aggregator-specific (Tasks 11-12)
// Populated as components are added.
export {};
```

- [ ] **Step 4: Create `packages/aggregator-ui/README.md`**

```markdown
# @regen-coordination/aggregator-ui

Shared UI package: theme tokens (OKLCH), shadcn/ui-aligned primitives, and aggregator-specific composite patterns.

Source of truth: [`docs/DESIGN.md`](../../docs/DESIGN.md).

## Usage (within this monorepo)

```ts
import { Button, GradientHero } from '@regen-coordination/aggregator-ui';
```

```css
@import '@regen-coordination/aggregator-ui/theme';
```

## Promotion path

After v1 ships (Phase 6 retrospective), this package is extracted to `org-os/packages/` so any future `*-os` instance can install it as `@org-os/aggregator-ui`.
```

- [ ] **Step 5: Run pnpm install to register the workspace package**

```bash
pnpm install
```

Expected: `@regen-coordination/aggregator-ui` is now resolvable from other workspace packages; deps installed.

- [ ] **Step 6: Verify type-check**

```bash
pnpm --filter @regen-coordination/aggregator-ui run type-check
```

Expected: passes (no source files have types yet beyond the empty barrel).

- [ ] **Step 7: Commit**

```bash
git add packages/aggregator-ui pnpm-lock.yaml
git commit -m "phase-2: scaffold packages/aggregator-ui skeleton (manifest, tsconfig, barrel)"
```

---

## Task 5: Theme files — generate from DESIGN.md §2-§4

**Files:**
- Create: `packages/aggregator-ui/theme/tokens.css`
- Create: `packages/aggregator-ui/theme/gradients.css`
- Create: `packages/aggregator-ui/theme/typography.css`
- Create: `packages/aggregator-ui/theme/spacing.css`
- Create: `packages/aggregator-ui/theme/index.css`

This is a transcription task from DESIGN.md tables to CSS. All values come from the DESIGN.md tables that Phase 1 produced; do NOT re-derive — use the canonical OKLCH expressions verbatim.

- [ ] **Step 1: Create `packages/aggregator-ui/theme/tokens.css`**

```css
/* tokens.css — OKLCH semantic tokens (light + dark)
 * Source: docs/DESIGN.md §2.1, §2.2, §2.4
 * Single file; light defaults under :root; dark overrides under [data-theme="dark"]
 * Do not edit values without updating DESIGN.md first (see DESIGN.md §12.6).
 */

:root {
  /* Brand palette (canonical, from brand-extract.json) — DESIGN.md §2.1 */
  --brand-sky: oklch(77.5% 0.02 236);
  --brand-horizon: oklch(83.8% 0.026 75);
  --brand-pasture: oklch(88.5% 0.097 104);
  --brand-sun: oklch(80.5% 0.077 70);
  --brand-sun-deep: oklch(73.8% 0.125 77);

  /* Light theme — semantic tokens — DESIGN.md §2.2 */
  --bg: oklch(99% 0.003 75);
  --surface-1: oklch(97% 0.005 75);
  --surface-2: oklch(94.5% 0.008 75);
  --surface-3: oklch(91% 0.012 75);
  --text-primary: oklch(22% 0.015 75);
  --text-muted: oklch(45% 0.012 75);
  --border-default: oklch(60% 0.015 75);
  --border-subtle: oklch(88% 0.010 75);
  --primary: oklch(73.8% 0.125 77);
  --primary-hover: oklch(67.8% 0.135 77);
  --primary-active: oklch(61.8% 0.135 77);
  --primary-foreground: oklch(18% 0.02 75);
  --accent: oklch(88.5% 0.097 104);
  --accent-foreground: oklch(22% 0.02 104);
  --success: oklch(52% 0.13 142);
  --success-foreground: oklch(98% 0.005 142);
  --warning: oklch(72% 0.15 70);
  --warning-foreground: oklch(20% 0.02 70);
  --danger: oklch(55% 0.18 25);
  --danger-foreground: oklch(98% 0.005 25);
  --info: oklch(55% 0.10 236);
  --info-foreground: oklch(98% 0.005 236);
}

[data-theme='dark'] {
  /* Dark theme — semantic tokens — DESIGN.md §2.4
   * Derived: lightness inverted (L → 1−L), chroma dampened ~25% on chromatic tokens.
   */
  --bg: oklch(13% 0.008 75);
  --surface-1: oklch(17% 0.010 75);
  --surface-2: oklch(21% 0.011 75);
  --surface-3: oklch(25% 0.012 75);
  --text-primary: oklch(96% 0.008 75);
  --text-muted: oklch(72% 0.010 75);
  --border-default: oklch(52% 0.012 75);
  --border-subtle: oklch(32% 0.010 75);
  --primary: oklch(60% 0.155 77);
  --primary-hover: oklch(66% 0.155 77);
  --primary-active: oklch(72% 0.155 77);
  --primary-foreground: oklch(15% 0.02 75);
  --accent: oklch(35% 0.080 104);
  --accent-foreground: oklch(95% 0.010 104);
  --success: oklch(62% 0.14 142);
  --success-foreground: oklch(15% 0.02 142);
  --warning: oklch(75% 0.13 70);
  --warning-foreground: oklch(15% 0.02 70);
  --danger: oklch(63% 0.18 25);
  --danger-foreground: oklch(15% 0.02 25);
  --info: oklch(65% 0.11 236);
  --info-foreground: oklch(15% 0.02 236);
}
```

**Verify:** open `docs/DESIGN.md` §2.2 and §2.4 in a split view; every row's OKLCH expression must match this file byte-for-byte. If they don't, update this file (DESIGN.md is canonical).

- [ ] **Step 2: Create `packages/aggregator-ui/theme/gradients.css`**

```css
/* gradients.css — gradient utilities — DESIGN.md §2.3, §2.5 */

:root {
  --gradient-brand: linear-gradient(180deg, var(--brand-sky) 0%, var(--brand-horizon) 50%, var(--brand-sun) 100%);
  --gradient-cool: linear-gradient(180deg, var(--brand-sky) 0%, var(--brand-horizon) 100%);
  --gradient-warm: linear-gradient(180deg, var(--brand-horizon) 0%, var(--brand-sun-deep) 100%);
}

[data-theme='dark'] {
  --gradient-brand-dark: linear-gradient(180deg, var(--bg) 0%, var(--surface-2) 50%, var(--primary) 100%);
  --gradient-night: linear-gradient(180deg, var(--bg) 0%, var(--surface-1) 100%);
  --gradient-cta-dark: linear-gradient(180deg, var(--primary) 0%, var(--primary-active) 100%);
}

.gradient-brand { background-image: var(--gradient-brand); }
.gradient-cool { background-image: var(--gradient-cool); }
.gradient-warm { background-image: var(--gradient-warm); }

[data-theme='dark'] .gradient-brand { background-image: var(--gradient-brand-dark); }
[data-theme='dark'] .gradient-night { background-image: var(--gradient-night); }
[data-theme='dark'] .gradient-cta { background-image: var(--gradient-cta-dark); }
```

- [ ] **Step 3: Create `packages/aggregator-ui/theme/typography.css`**

```css
/* typography.css — type families + scale — DESIGN.md §3
 * Font imports are resolved by the consuming app (apps/storybook, apps/regen-coordination, etc.).
 * To use, the app's entry CSS imports @fontsource/poppins, @fontsource/inter, @fontsource/jetbrains-mono.
 */

:root {
  /* Type families — DESIGN.md §3.1 */
  --font-display: 'Poppins', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Type scale (modular ratio 1.250) — DESIGN.md §3.2 */
  --text-xs: 0.64rem;
  --text-sm: 0.8rem;
  --text-base: 1rem;
  --text-md: 1.25rem;
  --text-lg: 1.563rem;
  --text-xl: 1.953rem;
  --text-2xl: 2.441rem;
  --text-3xl: 3.052rem;
  --text-4xl: 3.815rem;
  --text-5xl: 4.768rem;
  --text-6xl: 5.96rem;

  /* Line height + letter spacing — DESIGN.md §3.3 */
  --leading-display: 1.05;
  --leading-heading: 1.2;
  --leading-body: 1.55;
  --leading-ui: 1.4;
  --leading-mono: 1.45;

  --tracking-display: -0.025em;
  --tracking-heading: -0.015em;
  --tracking-body: 0;
  --tracking-ui: 0.01em;
}
```

- [ ] **Step 4: Create `packages/aggregator-ui/theme/spacing.css`**

```css
/* spacing.css — spacing scale + radius + shadow + container widths
 * Source: docs/DESIGN.md §4
 */

:root {
  /* Spacing scale — DESIGN.md §4.1 */
  --space-0: 0;
  --space-px: 0.0625rem;
  --space-0\.5: 0.125rem;
  --space-1: 0.25rem;
  --space-1\.5: 0.375rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* Border radius — DESIGN.md §4.2 */
  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1.25rem;
  --radius-pill: 9999px;
  --radius-full: 50%;

  /* Shadow — DESIGN.md §4.3 */
  --shadow-sm: 0 1px 2px 0 oklch(0% 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px oklch(0% 0 0 / 0.07), 0 2px 4px -2px oklch(0% 0 0 / 0.05);
  --shadow-lg: 0 10px 15px -3px oklch(0% 0 0 / 0.07), 0 4px 6px -4px oklch(0% 0 0 / 0.05);
  --shadow-xl: 0 20px 25px -5px oklch(0% 0 0 / 0.10), 0 8px 10px -6px oklch(0% 0 0 / 0.06);
  --shadow-glow: 0 0 30px oklch(73.8% 0.125 77 / 0.30);

  /* Container widths — DESIGN.md §4.4 */
  --container-xs: 480px;
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  --prose-max: 65ch;

  /* Icon sizes — DESIGN.md §5.2 */
  --icon-xs: 0.75rem;
  --icon-sm: 1rem;
  --icon-md: 1.25rem;
  --icon-lg: 1.5rem;
  --icon-xl: 2rem;
  --icon-2xl: 3rem;

  /* Motion — DESIGN.md §6.1, §6.2 */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-emphasis: cubic-bezier(0.34, 1.56, 0.64, 1);

  --duration-instant: 0;
  --duration-fast: 150ms;
  --duration-base: 240ms;
  --duration-slow: 400ms;
  --duration-deliberate: 600ms;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 5: Create `packages/aggregator-ui/theme/index.css`**

```css
/* Theme entry — imports all token CSS modules in dependency order. */
@import './tokens.css';
@import './gradients.css';
@import './typography.css';
@import './spacing.css';
```

- [ ] **Step 6: Verify by reading every row of DESIGN.md §2.2 against tokens.css**

```bash
diff <(grep -E '^\| `--' docs/DESIGN.md | head -60) <(grep -E '^\s*--' packages/aggregator-ui/theme/tokens.css | head -60)
```

This is informational; the diff won't be zero-noise (different formats), but use it to spot missing tokens. The actual self-check is reading both side-by-side and confirming each `--token-name` appears in tokens.css with the OKLCH expression matching DESIGN.md.

- [ ] **Step 7: Commit**

```bash
git add packages/aggregator-ui/theme
git commit -m "phase-2: aggregator-ui theme tokens (light + dark, gradients, typography, spacing)"
```

---

## Task 6: Tailwind v4 + shadcn init in `aggregator-ui`

**Files:**
- Create: `packages/aggregator-ui/components.json` (via shadcn init)
- Create: `packages/aggregator-ui/tailwind.config.ts` (or v4 config — see below)
- Create: `packages/aggregator-ui/src/lib/cn.ts` (via shadcn init)
- Create: `packages/aggregator-ui/postcss.config.cjs`
- Modify: `packages/aggregator-ui/theme/index.css` (add `@import "tailwindcss";` + `@theme` block referencing tokens)

- [ ] **Step 1: Initialize shadcn**

```bash
cd packages/aggregator-ui
pnpm dlx shadcn@latest init
```

Answer prompts:
- TypeScript? **Yes**
- Style: **default**
- Base color: pick anything — we'll override via `@theme`
- CSS variables: **Yes**
- Tailwind config location: `./tailwind.config.ts`
- Components alias: `~/components` (see Step 3 for path mapping)
- Utils alias: `~/lib/utils`
- React Server Components: **No** (we're client + Astro islands)
- Write to `components.json`: **Yes**

This creates `components.json`, `tailwind.config.ts`, and `src/lib/utils.ts` with the `cn()` helper.

- [ ] **Step 2: Rename `src/lib/utils.ts` to `src/lib/cn.ts` and verify content**

```bash
mv src/lib/utils.ts src/lib/cn.ts
```

Verify content (should be):

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

If shadcn generated something different, replace with the above.

Update `components.json` to reflect the rename:

```json
{
  "aliases": {
    "utils": "~/lib/cn"
  }
}
```

- [ ] **Step 3: Update `packages/aggregator-ui/tsconfig.json` with path mapping**

Add to `compilerOptions`:

```json
"baseUrl": ".",
"paths": {
  "~/*": ["./src/*"]
}
```

- [ ] **Step 4: Replace generated `tailwind.config.ts` with v4 minimal config**

Tailwind v4 is mostly CSS-driven via `@theme`. Replace the generated content with:

```ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{ts,tsx}',
    '../../apps/storybook/src/**/*.{astro,ts,tsx}',
    '../../apps/regen-*/src/**/*.{astro,ts,tsx}',
  ],
  // v4: theme tokens live in CSS @theme block (see theme/tokens.css)
  // Keeping this file for shadcn CLI compatibility and content scanning.
  plugins: [],
} satisfies Config;
```

- [ ] **Step 5: Create `packages/aggregator-ui/postcss.config.cjs`**

```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

- [ ] **Step 6: Update `packages/aggregator-ui/theme/index.css` to use v4 `@theme`**

Replace its content with:

```css
@import 'tailwindcss';
@import './tokens.css';
@import './gradients.css';
@import './typography.css';
@import './spacing.css';

@theme {
  /* Map our semantic tokens into Tailwind utility classes (bg-primary, text-muted, etc.). */
  --color-bg: var(--bg);
  --color-surface-1: var(--surface-1);
  --color-surface-2: var(--surface-2);
  --color-surface-3: var(--surface-3);
  --color-text-primary: var(--text-primary);
  --color-text-muted: var(--text-muted);
  --color-border-default: var(--border-default);
  --color-border-subtle: var(--border-subtle);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-active: var(--primary-active);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-danger: var(--danger);
  --color-danger-foreground: var(--danger-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);

  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);

  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --font-mono: var(--font-mono);
}
```

This makes `bg-primary`, `text-muted`, `border-default`, `bg-surface-1`, etc. into valid Tailwind classes that resolve to our OKLCH values. shadcn primitives use these class names by convention.

- [ ] **Step 7: Verify the package still type-checks**

```bash
cd ../..
pnpm --filter @regen-coordination/aggregator-ui run type-check
```

Expected: passes.

- [ ] **Step 8: Commit**

```bash
git add packages/aggregator-ui pnpm-lock.yaml
git commit -m "phase-2: aggregator-ui Tailwind v4 + shadcn init (cn helper, tokens via @theme)"
```

---

## Task 7: Primitives — first half (Button, Card, Badge, Input, Select, Combobox)

**Files:**
- Create: `packages/aggregator-ui/src/primitives/Button.tsx`
- Create: `packages/aggregator-ui/src/primitives/Card.tsx`
- Create: `packages/aggregator-ui/src/primitives/Badge.tsx`
- Create: `packages/aggregator-ui/src/primitives/Input.tsx`
- Create: `packages/aggregator-ui/src/primitives/Select.tsx`
- Create: `packages/aggregator-ui/src/primitives/Combobox.tsx`
- Create: `packages/aggregator-ui/src/__tests__/primitives.test.tsx`
- Create: `packages/aggregator-ui/vitest.config.ts`
- Modify: `packages/aggregator-ui/src/index.ts`

For each primitive, the pattern is: install via shadcn (where shadcn provides one), then write a thin wrapper at `src/primitives/<Name>.tsx` that re-exports with our token classes layered on top, then write a "renders without crashing" + "passes className through" test.

**TDD note:** for each primitive, write the test first, see it fail (component undefined), then implement. Five-step rhythm per primitive: write test → run (fail) → implement → run (pass) → commit only at end of task.

- [ ] **Step 1: Create `packages/aggregator-ui/vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
  },
});
```

Install missing dev deps:

```bash
pnpm --filter @regen-coordination/aggregator-ui add -D @vitejs/plugin-react
```

- [ ] **Step 2: Create `packages/aggregator-ui/src/__tests__/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 3: Add Button via shadcn**

```bash
cd packages/aggregator-ui
pnpm dlx shadcn@latest add button
cd ../..
```

This creates `src/components/ui/button.tsx` (shadcn's default location). We'll re-export from a wrapper.

- [ ] **Step 4: Create `packages/aggregator-ui/src/primitives/Button.tsx`**

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '~/lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active hover:shadow-[var(--shadow-glow)]',
        secondary: 'bg-surface-2 text-text-primary hover:bg-surface-3',
        outline: 'border border-border-default text-text-primary hover:bg-surface-2',
        ghost: 'text-text-primary hover:bg-surface-2',
        destructive: 'bg-danger text-danger-foreground hover:opacity-90',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-14 px-6 text-md',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = 'Button';

export { buttonVariants };
```

This implements DESIGN.md §7.1 verbatim: 5 variants, 3 sizes, focus-visible ring, disabled pointer-events.

- [ ] **Step 5: Add Card, Badge, Input via shadcn**

```bash
cd packages/aggregator-ui
pnpm dlx shadcn@latest add card badge input
cd ../..
```

- [ ] **Step 6: Create `packages/aggregator-ui/src/primitives/Card.tsx`**

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/cn';

const cardVariants = cva('rounded-lg p-6', {
  variants: {
    variant: {
      default: 'bg-surface-1 border border-border-default',
      elevated: 'bg-surface-1 shadow-[var(--shadow-md)]',
      glass: 'border border-border-subtle backdrop-blur-md',
    },
    padding: { default: 'p-6', compact: 'p-4' },
    interactive: { true: 'transition-colors hover:bg-surface-2 cursor-pointer', false: '' },
    selected: { true: 'border-primary bg-primary/5', false: '' },
  },
  defaultVariants: { variant: 'default', padding: 'default', interactive: false, selected: false },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, interactive, selected, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, padding, interactive, selected }), className)} {...props} />
  ),
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4 flex items-start justify-between gap-2', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  ),
);
CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mt-4 flex items-center justify-between gap-2', className)} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';
```

- [ ] **Step 7: Create `packages/aggregator-ui/src/primitives/Badge.tsx`**

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/cn';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-pill font-medium',
  {
    variants: {
      variant: {
        default: 'bg-surface-2 text-text-primary',
        network: 'text-[var(--network-color)] bg-[color-mix(in_oklch,_var(--network-color)_10%,_transparent)]',
        status: '',
        count: 'bg-surface-3 text-text-primary font-mono',
      },
      size: {
        sm: 'h-5 px-2 text-xs',
        md: 'h-6 px-2.5 text-sm',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props} />
  ),
);
Badge.displayName = 'Badge';
```

- [ ] **Step 8: Create `packages/aggregator-ui/src/primitives/Input.tsx`**

```tsx
import * as React from 'react';
import { cn } from '~/lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, label, hint, error, required, ...props }, ref) => {
    const inputId = id ?? React.useId();
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-sm font-medium text-text-primary">
          {label}
          {required && <span aria-hidden="true" className="text-danger ml-0.5">*</span>}
        </label>
        {hint && (
          <span id={hintId} className="text-xs text-text-muted">
            {hint}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-required={required}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
          aria-invalid={Boolean(error)}
          className={cn(
            'h-11 rounded-md border border-border-default bg-bg px-3 text-base text-text-primary',
            'focus:outline-none focus:ring-2 focus:ring-primary',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-danger focus:ring-danger',
            className,
          )}
          {...props}
        />
        {error && (
          <span id={errorId} role="alert" aria-live="polite" className="text-xs text-danger">
            {error}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
```

- [ ] **Step 9: Create `packages/aggregator-ui/src/primitives/Select.tsx`**

```tsx
import * as React from 'react';
import { cn } from '~/lib/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, id, label, options, ...props }, ref) => {
    const selectId = id ?? React.useId();
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={selectId} className="text-sm font-medium text-text-primary">
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'h-11 rounded-md border border-border-default bg-bg px-3 text-base text-text-primary',
            'focus:outline-none focus:ring-2 focus:ring-primary',
            'disabled:opacity-50',
            className,
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  },
);
Select.displayName = 'Select';
```

- [ ] **Step 10: Add Combobox via shadcn**

shadcn doesn't ship a single `combobox` recipe — it's the [composition pattern](https://ui.shadcn.com/docs/components/combobox) using `Popover` + `Command`. Add the underlying primitives:

```bash
cd packages/aggregator-ui
pnpm dlx shadcn@latest add popover command
cd ../..
```

- [ ] **Step 11: Create `packages/aggregator-ui/src/primitives/Combobox.tsx`**

```tsx
'use client';
import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '~/lib/cn';
import { Button } from './Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  placeholder?: string;
  emptyMessage?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Combobox({
  options,
  value,
  placeholder = 'Select…',
  emptyMessage = 'No matches found.',
  onChange,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const selectedLabel = options.find((o) => o.value === value)?.label;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('justify-between', className)}
        >
          {selectedLabel ?? placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={(v) => {
                    onChange?.(v);
                    setOpen(false);
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === opt.value ? 'opacity-100' : 'opacity-0')} />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
```

- [ ] **Step 12: Create `packages/aggregator-ui/src/__tests__/primitives.test.tsx`**

Write tests AFTER each component is built. Pattern: render → assert key behavior. For shadcn-derived primitives, "renders without crashing + className passes through" is the floor; add behavior tests where the primitive does real work.

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '~/primitives/Button';
import { Card, CardHeader, CardBody, CardFooter } from '~/primitives/Card';
import { Badge } from '~/primitives/Badge';
import { Input } from '~/primitives/Input';
import { Select } from '~/primitives/Select';
import { Combobox } from '~/primitives/Combobox';

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });
  it('passes className through', () => {
    render(<Button className="extra">X</Button>);
    expect(screen.getByRole('button')).toHaveClass('extra');
  });
  it('applies destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-danger');
  });
  it('respects disabled state', () => {
    render(<Button disabled>X</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

describe('Card', () => {
  it('renders header + body + footer', () => {
    render(
      <Card>
        <CardHeader>H</CardHeader>
        <CardBody>B</CardBody>
        <CardFooter>F</CardFooter>
      </Card>,
    );
    expect(screen.getByText('H')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('F')).toBeInTheDocument();
  });
});

describe('Badge', () => {
  it('renders default variant', () => {
    render(<Badge>23 meetings</Badge>);
    expect(screen.getByText('23 meetings')).toBeInTheDocument();
  });
});

describe('Input', () => {
  it('associates label with input', () => {
    render(<Input label="Name" name="name" />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });
  it('marks required and asterisk', () => {
    render(<Input label="Name" required />);
    expect(screen.getByLabelText(/Name/)).toHaveAttribute('aria-required', 'true');
  });
  it('shows error with aria-live', () => {
    render(<Input label="Name" error="Required field" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required field');
    expect(screen.getByLabelText(/Name/)).toHaveAttribute('aria-invalid', 'true');
  });
});

describe('Select', () => {
  it('renders with options', () => {
    render(<Select label="Status" options={[{ value: 'active', label: 'Active' }]} />);
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Active' })).toBeInTheDocument();
  });
});

describe('Combobox', () => {
  it('shows placeholder when no value', () => {
    render(<Combobox options={[{ value: 'a', label: 'A' }]} placeholder="Pick" />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Pick');
  });
});
```

- [ ] **Step 13: Run tests**

```bash
pnpm --filter @regen-coordination/aggregator-ui run test
```

Expected: all tests pass.

- [ ] **Step 14: Update `src/index.ts` to re-export the 6 primitives**

```ts
export { Button, type ButtonProps } from './primitives/Button';
export { Card, CardHeader, CardBody, CardFooter, type CardProps } from './primitives/Card';
export { Badge, type BadgeProps } from './primitives/Badge';
export { Input, type InputProps } from './primitives/Input';
export { Select, type SelectProps } from './primitives/Select';
export { Combobox, type ComboboxProps, type ComboboxOption } from './primitives/Combobox';
```

- [ ] **Step 15: Commit**

```bash
git add packages/aggregator-ui pnpm-lock.yaml
git commit -m "phase-2: §7 primitives first half (Button, Card, Badge, Input, Select, Combobox) + tests"
```

---

## Task 8: Primitives — second half (Command, Tabs, Accordion, Dialog, Popover, Tooltip, Table)

**Files:**
- Create: `packages/aggregator-ui/src/primitives/{Command,Tabs,Accordion,Dialog,Popover,Tooltip,Table}.tsx`
- Modify: `packages/aggregator-ui/src/__tests__/primitives.test.tsx` (append tests)
- Modify: `packages/aggregator-ui/src/index.ts` (re-exports)

- [ ] **Step 1: Add remaining shadcn primitives**

```bash
cd packages/aggregator-ui
pnpm dlx shadcn@latest add tabs accordion dialog tooltip table
cd ../..
```

(Command + Popover were added in Task 7 already.)

- [ ] **Step 2: Create `packages/aggregator-ui/src/primitives/Command.tsx`**

The shadcn-installed Command component is at `src/components/ui/command.tsx`. Wrap it for the ⌘K palette use case (DESIGN.md §7.6):

```tsx
'use client';
import * as React from 'react';
import {
  Command as ShadcnCommand,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from '~/components/ui/command';

export {
  ShadcnCommand as Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
};

/** Convenience hook for ⌘K / Ctrl+K toggle. */
export function useCommandPalette(): [boolean, (open: boolean) => void] {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);
  return [open, setOpen];
}
```

- [ ] **Step 3: Create `packages/aggregator-ui/src/primitives/Tabs.tsx`**

DESIGN.md §7.7 prescribes 3 variants. The shadcn Tabs ships a single visual style; we wrap it with a variant prop:

```tsx
'use client';
import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/cn';

const tabsListVariants = cva('inline-flex items-center gap-1', {
  variants: {
    variant: {
      underline: 'border-b border-border-subtle',
      pill: 'rounded-pill bg-surface-2 p-1',
      segmented: 'rounded-md border border-border-default p-0.5',
    },
  },
  defaultVariants: { variant: 'underline' },
});

const tabsTriggerVariants = cva(
  'inline-flex items-center px-3 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        underline:
          'border-b-2 border-transparent text-text-muted data-[state=active]:border-primary data-[state=active]:text-text-primary',
        pill: 'rounded-pill text-text-muted data-[state=active]:bg-primary/10 data-[state=active]:text-primary',
        segmented: 'rounded text-text-muted data-[state=active]:bg-surface-1 data-[state=active]:text-text-primary',
      },
    },
    defaultVariants: { variant: 'underline' },
  },
);

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    VariantProps<typeof tabsListVariants> {}

export const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ children, ...props }, ref) => (
    <TabsPrimitive.Root ref={ref} {...props}>
      {children}
    </TabsPrimitive.Root>
  ),
);
Tabs.displayName = 'Tabs';

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={cn(tabsListVariants({ variant }), className)} {...props} />
));
TabsList.displayName = 'TabsList';

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & VariantProps<typeof tabsTriggerVariants>
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref} className={cn(tabsTriggerVariants({ variant }), className)} {...props} />
));
TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn('mt-4', className)} {...props} />
));
TabsContent.displayName = 'TabsContent';
```

- [ ] **Step 4: Create `packages/aggregator-ui/src/primitives/Accordion.tsx`**

```tsx
'use client';
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '~/components/ui/accordion';
```

(shadcn's defaults already match DESIGN.md §7.8.)

- [ ] **Step 5: Create `packages/aggregator-ui/src/primitives/Dialog.tsx`**

```tsx
'use client';
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '~/components/ui/dialog';
```

- [ ] **Step 6: Create `packages/aggregator-ui/src/primitives/Popover.tsx`**

```tsx
'use client';
export { Popover, PopoverTrigger, PopoverContent } from '~/components/ui/popover';
```

- [ ] **Step 7: Create `packages/aggregator-ui/src/primitives/Tooltip.tsx`**

```tsx
'use client';
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '~/components/ui/tooltip';
```

- [ ] **Step 8: Create `packages/aggregator-ui/src/primitives/Table.tsx`**

DESIGN.md §7.12 prescribes 3 variants (default zebra, compact tight, card-rows). Wrap shadcn's table with variants:

```tsx
'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/cn';

const tableVariants = cva('w-full caption-bottom text-sm', {
  variants: {
    variant: {
      default: '[&_tbody_tr:nth-child(odd)]:bg-surface-1',
      compact: '[&_th]:py-1 [&_td]:py-1',
      'card-rows': '[&_tbody_tr]:block [&_tbody_tr]:rounded-lg [&_tbody_tr]:border [&_tbody_tr]:p-4 [&_tbody_tr]:mb-2',
    },
  },
  defaultVariants: { variant: 'default' },
});

export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table ref={ref} className={cn(tableVariants({ variant }), className)} {...props} />
    </div>
  ),
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />,
);
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn('', className)} {...props} />,
);
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tfoot ref={ref} className={cn('bg-surface-2', className)} {...props} />,
);
TableFooter.displayName = 'TableFooter';

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn('border-b border-border-subtle hover:bg-surface-2', className)} {...props} />
  ),
);
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={cn('h-10 px-3 text-left align-middle font-medium text-text-muted', className)} {...props} />
  ),
);
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn('px-3 py-2 align-middle', className)} {...props} />
  ),
);
TableCell.displayName = 'TableCell';

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-text-muted text-sm', className)} {...props} />
  ),
);
TableCaption.displayName = 'TableCaption';
```

- [ ] **Step 9: Append tests to `__tests__/primitives.test.tsx`**

Add a top-level `describe` block per primitive. For each: a "renders without crashing" test plus one behavior test where applicable. Example for Tabs:

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/primitives/Tabs';

describe('Tabs', () => {
  it('renders with default underline variant', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
      </Tabs>,
    );
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('data-state', 'active');
  });
});
```

Add similar minimal tests for Accordion (renders trigger + panel), Dialog (renders trigger + content), Popover (renders trigger), Tooltip (renders trigger), Table (renders thead + tbody), Command (renders input).

- [ ] **Step 10: Run all tests**

```bash
pnpm --filter @regen-coordination/aggregator-ui run test
```

Expected: all tests pass (existing 6 primitive blocks + 7 new ones).

- [ ] **Step 11: Update `src/index.ts` re-exports**

Append to the existing exports:

```ts
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  useCommandPalette,
} from './primitives/Command';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './primitives/Tabs';
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './primitives/Accordion';
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './primitives/Dialog';
export { Popover, PopoverTrigger, PopoverContent } from './primitives/Popover';
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './primitives/Tooltip';
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from './primitives/Table';
```

- [ ] **Step 12: Commit**

```bash
git add packages/aggregator-ui pnpm-lock.yaml
git commit -m "phase-2: §7 primitives second half (Command, Tabs, Accordion, Dialog, Popover, Tooltip, Table) + tests"
```

---

## Task 9: Composite patterns — first batch (GradientHero, InitiativeCard, FundingCard, EventCard)

**Files:**
- Create: `packages/aggregator-ui/src/components/{GradientHero,InitiativeCard,FundingCard,EventCard}.tsx`
- Create: `packages/aggregator-ui/src/__tests__/components.test.tsx`
- Modify: `packages/aggregator-ui/src/index.ts`

- [ ] **Step 1: Create `packages/aggregator-ui/src/components/GradientHero.tsx`**

DESIGN.md §8.1: full-bleed `--gradient-brand`, orb mark left, wordmark + tagline center, optional 4-stat row, optional CTA. Variants: `full` h-screen / `compact` h-[60vh] (default) / `slim` h-[40vh].

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/cn';

const heroVariants = cva(
  'gradient-brand relative flex flex-col items-center justify-center text-center px-6',
  {
    variants: {
      variant: {
        full: 'h-screen',
        compact: 'h-[60vh]',
        slim: 'h-[40vh]',
      },
    },
    defaultVariants: { variant: 'compact' },
  },
);

export interface GradientHeroProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof heroVariants> {
  wordmark: string;
  tagline?: string;
  stats?: Array<{ label: string; value: string }>;
  cta?: React.ReactNode;
  animate?: boolean;
}

export function GradientHero({
  className,
  variant,
  wordmark,
  tagline,
  stats,
  cta,
  animate = true,
  ...props
}: GradientHeroProps) {
  return (
    <section
      className={cn(heroVariants({ variant }), className)}
      data-animate={animate ? 'true' : 'false'}
      {...props}
    >
      <h1 className="font-display text-5xl font-bold text-text-primary mb-2">{wordmark}</h1>
      {tagline && <p className="font-body text-md text-text-primary opacity-80 mb-6">{tagline}</p>}
      {stats && stats.length > 0 && (
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="text-sm text-text-muted">{s.label}</dt>
              <dd className="font-display text-3xl font-bold text-text-primary">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {cta && <div className="mt-2">{cta}</div>}
    </section>
  );
}
```

- [ ] **Step 2: Create `packages/aggregator-ui/src/components/InitiativeCard.tsx`**

DESIGN.md §8.3: Card variant `default` with header (name + network badges), body (description, status badge, key metric), footer (outbound + inbound links).

```tsx
import * as React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '~/primitives/Card';
import { Badge } from '~/primitives/Badge';

export interface InitiativeCardProps {
  name: string;
  networks: Array<{ id: string; label: string }>;
  description: string;
  status: 'active' | 'bootstrapping' | 'observer' | 'paused';
  keyMetric?: string;
  outboundUrl: string;
  inboundUrl: string;
}

const statusEmoji: Record<InitiativeCardProps['status'], string> = {
  active: '🟢',
  bootstrapping: '🟡',
  observer: '⚪',
  paused: '🔴',
};

export function InitiativeCard(props: InitiativeCardProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-display text-lg font-semibold text-text-primary">{props.name}</h3>
        <div className="flex flex-wrap gap-1">
          {props.networks.map((n) => (
            <Badge key={n.id} variant="network" data-network={n.id}>
              {n.label}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-text-primary mb-3">{props.description}</p>
        <div className="flex items-center gap-2">
          <Badge variant="status" aria-label={`Status: ${props.status}`}>
            <span aria-hidden="true">{statusEmoji[props.status]}</span> {props.status}
          </Badge>
          {props.keyMetric && (
            <Badge variant="count">{props.keyMetric}</Badge>
          )}
        </div>
      </CardBody>
      <CardFooter>
        <a href={props.outboundUrl} className="text-sm text-primary hover:underline" rel="noopener noreferrer" target="_blank">
          Project site ↗
        </a>
        <a href={props.inboundUrl} className="text-sm text-primary hover:underline">
          RC view →
        </a>
      </CardFooter>
    </Card>
  );
}
```

- [ ] **Step 3: Create `packages/aggregator-ui/src/components/FundingCard.tsx`**

DESIGN.md §8.4: Card variant `elevated` with header (name + status), body (amount, deadline w/ countdown <30d, eligibility), footer ("Apply →" + Karma GAP).

```tsx
import * as React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '~/primitives/Card';
import { Badge } from '~/primitives/Badge';
import { Button } from '~/primitives/Button';

export interface FundingCardProps {
  name: string;
  status: 'active' | 'applied' | 'closed';
  amountAvailable: string;
  deadline: Date;
  eligibility: string;
  applyUrl: string;
  karmaGapUrl?: string;
}

function daysUntil(deadline: Date): number {
  return Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export function FundingCard(props: FundingCardProps) {
  const days = daysUntil(props.deadline);
  const showCountdown = days <= 30 && days >= 0;
  const formattedDeadline = props.deadline.toLocaleDateString('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return (
    <Card variant="elevated">
      <CardHeader>
        <h3 className="font-display text-lg font-semibold text-text-primary">{props.name}</h3>
        <Badge variant="status">{props.status}</Badge>
      </CardHeader>
      <CardBody>
        <p className="font-mono text-2xl text-text-primary mb-1">{props.amountAvailable}</p>
        <p className="text-sm text-text-muted mb-2">
          Deadline: {formattedDeadline}
          {showCountdown && (
            <span className="ml-2 text-warning">({days} days left)</span>
          )}
        </p>
        <p className="text-sm text-text-primary">{props.eligibility}</p>
      </CardBody>
      <CardFooter>
        <Button asChild variant="primary" size="md">
          <a href={props.applyUrl} rel="noopener noreferrer" target="_blank">
            Apply →
          </a>
        </Button>
        {props.karmaGapUrl && (
          <a href={props.karmaGapUrl} className="text-sm text-primary hover:underline" rel="noopener noreferrer" target="_blank">
            Karma GAP ↗
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
```

- [ ] **Step 4: Create `packages/aggregator-ui/src/components/EventCard.tsx`**

DESIGN.md §8.5: Card variant `default` with header (date + time, recurrence indicator), body (title, attendees/networks, location), footer (calendar adds + RSVP).

```tsx
import * as React from 'react';
import { Repeat, Calendar as CalIcon } from 'lucide-react';
import { Card, CardHeader, CardBody, CardFooter } from '~/primitives/Card';
import { Badge } from '~/primitives/Badge';

export interface EventCardProps {
  title: string;
  startsAt: Date;
  timezone: string;
  recurrence?: 'weekly' | 'monthly' | null;
  networks?: Array<{ id: string; label: string }>;
  location: string;
  locationUrl?: string;
  iCalUrl?: string;
  googleUrl?: string;
  rsvpUrl?: string;
}

export function EventCard(props: EventCardProps) {
  const formatted = props.startsAt.toLocaleString('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: props.timezone,
    timeZoneName: 'short',
  });
  return (
    <Card>
      <CardHeader>
        <p className="text-sm font-mono text-text-muted">{formatted}</p>
        {props.recurrence && (
          <Badge variant="default" aria-label={`Recurs ${props.recurrence}`}>
            <Repeat className="h-3 w-3" aria-hidden="true" /> {props.recurrence}
          </Badge>
        )}
      </CardHeader>
      <CardBody>
        <h3 className="font-display text-lg font-semibold text-text-primary mb-2">{props.title}</h3>
        {props.networks && props.networks.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {props.networks.map((n) => (
              <Badge key={n.id} variant="network" data-network={n.id}>
                {n.label}
              </Badge>
            ))}
          </div>
        )}
        <p className="text-sm text-text-primary">
          {props.locationUrl ? (
            <a href={props.locationUrl} className="text-primary hover:underline" rel="noopener noreferrer" target="_blank">
              {props.location} ↗
            </a>
          ) : (
            props.location
          )}
        </p>
      </CardBody>
      <CardFooter>
        <div className="flex gap-2">
          {props.iCalUrl && (
            <a href={props.iCalUrl} className="text-sm text-primary hover:underline">
              <CalIcon className="inline h-4 w-4 mr-1" aria-hidden="true" /> iCal
            </a>
          )}
          {props.googleUrl && (
            <a href={props.googleUrl} className="text-sm text-primary hover:underline">
              Google Calendar
            </a>
          )}
        </div>
        {props.rsvpUrl && (
          <a href={props.rsvpUrl} className="text-sm text-primary hover:underline" rel="noopener noreferrer" target="_blank">
            RSVP ↗
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
```

- [ ] **Step 5: Create `packages/aggregator-ui/src/__tests__/components.test.tsx`**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GradientHero } from '~/components/GradientHero';
import { InitiativeCard } from '~/components/InitiativeCard';
import { FundingCard } from '~/components/FundingCard';
import { EventCard } from '~/components/EventCard';

describe('GradientHero', () => {
  it('renders wordmark + tagline', () => {
    render(<GradientHero wordmark="Regen Coordination" tagline="Collaborative Pathways" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Regen Coordination');
    expect(screen.getByText('Collaborative Pathways')).toBeInTheDocument();
  });
  it('renders stat cards when provided', () => {
    render(
      <GradientHero
        wordmark="RC"
        stats={[
          { label: 'Networks', value: '7' },
          { label: 'Meetings', value: '23' },
        ]}
      />,
    );
    expect(screen.getByText('Networks')).toBeInTheDocument();
    expect(screen.getByText('23')).toBeInTheDocument();
  });
});

describe('InitiativeCard', () => {
  it('renders name + networks + status', () => {
    render(
      <InitiativeCard
        name="Coop"
        networks={[{ id: 'rc', label: 'RC' }]}
        description="Regen platform cooperative"
        status="active"
        outboundUrl="https://example.com"
        inboundUrl="/initiatives/coop"
      />,
    );
    expect(screen.getByText('Coop')).toBeInTheDocument();
    expect(screen.getByText('RC')).toBeInTheDocument();
    expect(screen.getByLabelText(/Status: active/)).toBeInTheDocument();
  });
});

describe('FundingCard', () => {
  it('shows countdown when deadline within 30 days', () => {
    const deadline = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    render(
      <FundingCard
        name="Octant Vault"
        status="active"
        amountAvailable="$100k"
        deadline={deadline}
        eligibility="Public goods"
        applyUrl="https://example.com"
      />,
    );
    expect(screen.getByText(/days left/)).toBeInTheDocument();
  });
});

describe('EventCard', () => {
  it('renders title + recurrence badge', () => {
    render(
      <EventCard
        title="RC Council Sync"
        startsAt={new Date('2026-06-01T15:00:00Z')}
        timezone="UTC"
        recurrence="weekly"
        location="Online"
      />,
    );
    expect(screen.getByText('RC Council Sync')).toBeInTheDocument();
    expect(screen.getByLabelText(/Recurs weekly/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run tests**

```bash
pnpm --filter @regen-coordination/aggregator-ui run test
```

Expected: all pass (primitives + 4 new composites).

- [ ] **Step 7: Update `src/index.ts` re-exports**

Append:

```ts
export { GradientHero, type GradientHeroProps } from './components/GradientHero';
export { InitiativeCard, type InitiativeCardProps } from './components/InitiativeCard';
export { FundingCard, type FundingCardProps } from './components/FundingCard';
export { EventCard, type EventCardProps } from './components/EventCard';
```

- [ ] **Step 8: Commit**

```bash
git add packages/aggregator-ui pnpm-lock.yaml
git commit -m "phase-2: §8 composites first batch (GradientHero, InitiativeCard, FundingCard, EventCard) + tests"
```

---

## Task 10: Composite patterns — second batch (NodeOrb, FilterBar, CouncilTimelineEntry, CapitalFlowDiagram stub)

**Files:**
- Create: `packages/aggregator-ui/src/components/{NodeOrb,FilterBar,CouncilTimelineEntry,CapitalFlowDiagram}.tsx`
- Modify: `packages/aggregator-ui/src/__tests__/components.test.tsx`
- Modify: `packages/aggregator-ui/src/index.ts`

- [ ] **Step 1: Create `packages/aggregator-ui/src/components/NodeOrb.tsx`**

DESIGN.md §8.2: SVG `<g>` with `<circle>` nodes color-coded per network, `<path>` edges, hover triggers `node-pulse`. Keep this as a static SVG renderer in Phase 2; click→popover wire-up happens in Phase 3 with real data.

```tsx
import * as React from 'react';
import { cn } from '~/lib/cn';

export interface NetworkNode {
  id: string;
  label: string;
  network: string;
  x: number;
  y: number;
}

export interface NetworkEdge {
  source: string;
  target: string;
}

export interface NodeOrbProps extends React.SVGAttributes<SVGSVGElement> {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  size?: number;
}

export function NodeOrb({ nodes, edges, size = 400, className, ...props }: NodeOrbProps) {
  const nodeById = React.useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={cn('node-orb', className)}
      role="img"
      aria-label="Federation network graph"
      {...props}
    >
      <g aria-hidden="true">
        {edges.map((e, i) => {
          const a = nodeById.get(e.source);
          const b = nodeById.get(e.target);
          if (!a || !b) return null;
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="var(--border-subtle)"
              strokeWidth={1}
            />
          );
        })}
      </g>
      <g>
        {nodes.map((n) => (
          <circle
            key={n.id}
            cx={n.x}
            cy={n.y}
            r={8}
            fill="var(--network-color, var(--text-muted))"
            data-network={n.network}
            tabIndex={0}
            role="button"
            aria-label={n.label}
            className="node-mark cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          />
        ))}
      </g>
    </svg>
  );
}
```

- [ ] **Step 2: Create `packages/aggregator-ui/src/components/FilterBar.tsx`**

DESIGN.md §8.6: horizontal Combobox row + active-filter Badge pills + "Clear all".

```tsx
import * as React from 'react';
import { X } from 'lucide-react';
import { Combobox, type ComboboxOption } from '~/primitives/Combobox';
import { Badge } from '~/primitives/Badge';

export interface FilterDefinition {
  id: string;
  label: string;
  options: ComboboxOption[];
}

export interface ActiveFilter {
  filterId: string;
  optionValue: string;
  optionLabel: string;
}

export interface FilterBarProps {
  filters: FilterDefinition[];
  active: ActiveFilter[];
  onChange?: (filterId: string, optionValue: string) => void;
  onRemove?: (filter: ActiveFilter) => void;
  onClearAll?: () => void;
}

export function FilterBar({ filters, active, onChange, onRemove, onClearAll }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <Combobox
            key={f.id}
            options={f.options}
            placeholder={f.label}
            onChange={(v) => onChange?.(f.id, v)}
          />
        ))}
      </div>
      {active.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {active.map((a, i) => (
            <Badge key={`${a.filterId}-${a.optionValue}-${i}`} variant="default">
              {a.optionLabel}
              <button
                type="button"
                onClick={() => onRemove?.(a)}
                aria-label={`Remove ${a.optionLabel}`}
                className="ml-1 hover:opacity-70"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {onClearAll && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-sm text-primary hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create `packages/aggregator-ui/src/components/CouncilTimelineEntry.tsx`**

DESIGN.md §8.8: vertical timeline + Accordion item per meeting.

```tsx
import * as React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '~/primitives/Accordion';

export interface CouncilTimelineMeeting {
  id: string;
  date: string;
  title: string;
  attendees: string[];
  decisions: string[];
  recordUrl: string;
  koiUrl?: string;
}

export interface CouncilTimelineEntryProps {
  meetings: CouncilTimelineMeeting[];
}

export function CouncilTimelineEntry({ meetings }: CouncilTimelineEntryProps) {
  return (
    <Accordion type="multiple" className="border-l border-border-subtle pl-4">
      {meetings.map((m) => (
        <AccordionItem key={m.id} value={m.id}>
          <AccordionTrigger>
            <div className="flex flex-1 items-center justify-between gap-4">
              <span className="font-mono text-sm text-text-muted">{m.date}</span>
              <span className="font-medium text-text-primary flex-1 text-left">{m.title}</span>
              <span className="text-sm text-text-muted">
                {m.attendees.length} attendees · {m.decisions.length} decisions
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-text-primary">
              <p className="mb-2">
                <strong>Attendees:</strong> {m.attendees.join(', ')}
              </p>
              <p className="mb-1">
                <strong>Decisions:</strong>
              </p>
              <ul className="list-disc pl-6 mb-2">
                {m.decisions.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
              <div className="flex gap-3">
                <a href={m.recordUrl} className="text-primary hover:underline">Canonical record →</a>
                {m.koiUrl && <a href={m.koiUrl} className="text-primary hover:underline">KOI export ↗</a>}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

- [ ] **Step 4: Create `packages/aggregator-ui/src/components/CapitalFlowDiagram.tsx` (stub)**

DESIGN.md §8.7 specifies a Sankey diagram via `@nivo/sankey`. Phase 2 ships a stub component with the data shape; real rendering lands in Phase 3 (where the data is available).

```tsx
import * as React from 'react';

export interface CapitalNode {
  id: string;
  label: string;
}

export interface CapitalFlow {
  source: string;
  target: string;
  amount: number;
}

export interface CapitalFlowDiagramProps {
  nodes: CapitalNode[];
  flows: CapitalFlow[];
  className?: string;
}

/**
 * Stub for the Sankey-style capital flow diagram.
 * Real implementation arrives in Phase 3 with `@nivo/sankey` (Astro island).
 * Phase 2 only validates the data contract.
 */
export function CapitalFlowDiagram({ nodes, flows, className }: CapitalFlowDiagramProps) {
  return (
    <div className={className} role="figure" aria-label="Capital flow diagram (stub)">
      <p className="text-text-muted text-sm">
        Capital flow visualization — {nodes.length} nodes, {flows.length} flows.
      </p>
      <p className="text-text-muted text-xs mt-1">
        (Phase 3 deliverable: replace with @nivo/sankey rendering.)
      </p>
    </div>
  );
}
```

- [ ] **Step 5: Append tests to `__tests__/components.test.tsx`**

```tsx
import { NodeOrb } from '~/components/NodeOrb';
import { FilterBar } from '~/components/FilterBar';
import { CouncilTimelineEntry } from '~/components/CouncilTimelineEntry';
import { CapitalFlowDiagram } from '~/components/CapitalFlowDiagram';

describe('NodeOrb', () => {
  it('renders nodes + edges', () => {
    render(
      <NodeOrb
        nodes={[
          { id: 'a', label: 'Node A', network: 'rc', x: 100, y: 100 },
          { id: 'b', label: 'Node B', network: 'refi-dao', x: 200, y: 200 },
        ]}
        edges={[{ source: 'a', target: 'b' }]}
      />,
    );
    expect(screen.getByRole('img', { name: 'Federation network graph' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Node A' })).toBeInTheDocument();
  });
});

describe('FilterBar', () => {
  it('renders configured filters and active badges', () => {
    render(
      <FilterBar
        filters={[{ id: 'status', label: 'Status', options: [{ value: 'active', label: 'Active' }] }]}
        active={[{ filterId: 'status', optionValue: 'active', optionLabel: 'Active' }]}
        onClearAll={() => {}}
      />,
    );
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });
});

describe('CouncilTimelineEntry', () => {
  it('renders meeting trigger with attendee and decision counts', () => {
    render(
      <CouncilTimelineEntry
        meetings={[
          {
            id: '2026-04-24',
            date: '2026-04-24',
            title: 'RC Council Sync',
            attendees: ['Coy', 'Luiz', 'Brandon'],
            decisions: ['KOI by Block Science approved'],
            recordUrl: '/meetings/260424',
          },
        ]}
      />,
    );
    expect(screen.getByText('RC Council Sync')).toBeInTheDocument();
    expect(screen.getByText('3 attendees · 1 decisions')).toBeInTheDocument();
  });
});

describe('CapitalFlowDiagram', () => {
  it('renders stub message', () => {
    render(<CapitalFlowDiagram nodes={[{ id: 'a', label: 'A' }]} flows={[]} />);
    expect(screen.getByRole('figure')).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run tests**

```bash
pnpm --filter @regen-coordination/aggregator-ui run test
```

Expected: all pass.

- [ ] **Step 7: Update `src/index.ts` re-exports**

Append:

```ts
export { NodeOrb, type NodeOrbProps, type NetworkNode, type NetworkEdge } from './components/NodeOrb';
export {
  FilterBar,
  type FilterBarProps,
  type FilterDefinition,
  type ActiveFilter,
} from './components/FilterBar';
export {
  CouncilTimelineEntry,
  type CouncilTimelineEntryProps,
  type CouncilTimelineMeeting,
} from './components/CouncilTimelineEntry';
export {
  CapitalFlowDiagram,
  type CapitalFlowDiagramProps,
  type CapitalNode,
  type CapitalFlow,
} from './components/CapitalFlowDiagram';
```

- [ ] **Step 8: Commit**

```bash
git add packages/aggregator-ui pnpm-lock.yaml
git commit -m "phase-2: §8 composites second batch (NodeOrb, FilterBar, CouncilTimelineEntry, CapitalFlowDiagram stub) + tests"
```

---

## Task 11: `packages/aggregator-config` — instance config Zod schema

**Files:**
- Create: `packages/aggregator-config/package.json`
- Create: `packages/aggregator-config/tsconfig.json`
- Create: `packages/aggregator-config/src/schema.ts`
- Create: `packages/aggregator-config/src/index.ts`
- Create: `packages/aggregator-config/src/__tests__/schema.test.ts`
- Create: `packages/aggregator-config/vitest.config.ts`
- Create: `packages/aggregator-config/README.md`

- [ ] **Step 1: Create `packages/aggregator-config/package.json`**

```json
{
  "name": "@regen-coordination/aggregator-config",
  "version": "0.1.0",
  "private": true,
  "description": "Zod schema for aggregator instance configuration (theme, sources, features).",
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "test": "vitest --run",
    "test:watch": "vitest",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "js-yaml": "^4.1.0",
    "@types/js-yaml": "^4.0.0"
  }
}
```

- [ ] **Step 2: Create `packages/aggregator-config/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 3: Create `packages/aggregator-config/vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
});
```

- [ ] **Step 4: Write the failing test first**

Create `packages/aggregator-config/src/__tests__/schema.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { instanceConfigSchema, type InstanceConfig } from '~/schema';

describe('instanceConfigSchema', () => {
  it('accepts a minimal valid config', () => {
    const minimal = {
      name: 'mediterranean',
      displayName: 'Mediterranean Regen',
      sources: [],
    };
    const result = instanceConfigSchema.safeParse(minimal);
    expect(result.success).toBe(true);
  });

  it('rejects missing name', () => {
    const result = instanceConfigSchema.safeParse({ displayName: 'X', sources: [] });
    expect(result.success).toBe(false);
  });

  it('rejects invalid name (uppercase, special chars)', () => {
    expect(instanceConfigSchema.safeParse({ name: 'Mediterranean', displayName: 'X', sources: [] }).success).toBe(false);
    expect(instanceConfigSchema.safeParse({ name: 'med space', displayName: 'X', sources: [] }).success).toBe(false);
  });

  it('accepts theme overrides', () => {
    const config = {
      name: 'med',
      displayName: 'Mediterranean',
      sources: [],
      theme: {
        primary: 'oklch(70% 0.15 30)',
      },
    };
    const result = instanceConfigSchema.safeParse(config);
    expect(result.success).toBe(true);
  });

  it('rejects malformed theme color', () => {
    const config = {
      name: 'med',
      displayName: 'M',
      sources: [],
      theme: { primary: 'not-a-color' },
    };
    expect(instanceConfigSchema.safeParse(config).success).toBe(false);
  });

  it('accepts a federation source', () => {
    const config = {
      name: 'med',
      displayName: 'M',
      sources: [
        { type: 'federation', url: 'https://refidao.com/federation.yaml' },
      ],
    };
    expect(instanceConfigSchema.safeParse(config).success).toBe(true);
  });

  it('accepts a github source with org', () => {
    const config = {
      name: 'med',
      displayName: 'M',
      sources: [{ type: 'github', org: 'refi-dao' }],
    };
    expect(instanceConfigSchema.safeParse(config).success).toBe(true);
  });

  it('accepts feature flags', () => {
    const config = {
      name: 'med',
      displayName: 'M',
      sources: [],
      features: { calendar: true, capital: false },
    };
    const parsed = instanceConfigSchema.parse(config);
    const typed: InstanceConfig = parsed;
    expect(typed.features?.calendar).toBe(true);
  });

  it('parses YAML round-trip via the bundled helper', async () => {
    const { parseInstanceConfigYaml } = await import('~/index');
    const yaml = `
name: med
displayName: Mediterranean
sources: []
features:
  calendar: true
`;
    const result = parseInstanceConfigYaml(yaml);
    expect(result.name).toBe('med');
    expect(result.features?.calendar).toBe(true);
  });
});
```

- [ ] **Step 5: Run the test, see it fail**

```bash
cd packages/aggregator-config
pnpm install
pnpm run test
```

Expected: test fails with "Cannot find module '~/schema'".

- [ ] **Step 6: Add path mapping to tsconfig and vitest**

Update `packages/aggregator-config/tsconfig.json` to add path mapping:

```json
"baseUrl": ".",
"paths": {
  "~/*": ["./src/*"]
}
```

Update `packages/aggregator-config/vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 7: Implement `packages/aggregator-config/src/schema.ts`**

```ts
import { z } from 'zod';

const oklchPattern = /^oklch\(\s*[\d.]+%?\s+[\d.]+\s+[\d.]+(\s*\/\s*[\d.]+%?)?\s*\)$/i;

const oklchString = z
  .string()
  .regex(oklchPattern, { message: 'Must be a valid oklch() color expression' });

const themeOverridesSchema = z
  .object({
    primary: oklchString.optional(),
    accent: oklchString.optional(),
    bg: oklchString.optional(),
    success: oklchString.optional(),
    warning: oklchString.optional(),
    danger: oklchString.optional(),
    info: oklchString.optional(),
  })
  .strict();

const federationSourceSchema = z
  .object({
    type: z.literal('federation'),
    url: z.string().url(),
  })
  .strict();

const githubSourceSchema = z
  .object({
    type: z.literal('github'),
    org: z.string().min(1),
    repos: z.array(z.string()).optional(),
  })
  .strict();

const csvSourceSchema = z
  .object({
    type: z.literal('csv'),
    url: z.string().url(),
    refresh: z
      .object({
        auto: z.boolean().default(false),
        intervalHours: z.number().int().positive().default(24),
      })
      .optional(),
  })
  .strict();

const eventsSourceSchema = z
  .object({
    type: z.literal('events'),
    feeds: z.array(z.string().url()).min(1),
  })
  .strict();

const sourceSchema = z.discriminatedUnion('type', [
  federationSourceSchema,
  githubSourceSchema,
  csvSourceSchema,
  eventsSourceSchema,
]);

const featuresSchema = z
  .object({
    home: z.boolean().default(true),
    initiatives: z.boolean().default(true),
    funding: z.boolean().default(true),
    calendar: z.boolean().default(true),
    capital: z.boolean().default(false),
    activity: z.boolean().default(true),
  })
  .partial()
  .strict();

const slugRegex = /^[a-z][a-z0-9-]*$/;

export const instanceConfigSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .regex(slugRegex, 'Name must be lowercase kebab-case (a-z, 0-9, hyphen).'),
    displayName: z.string().min(1),
    description: z.string().optional(),
    locale: z.enum(['en', 'es', 'pt', 'ca']).default('en'),
    theme: themeOverridesSchema.optional(),
    sources: z.array(sourceSchema),
    features: featuresSchema.optional(),
  })
  .strict();

export type InstanceConfig = z.infer<typeof instanceConfigSchema>;
export type ThemeOverrides = z.infer<typeof themeOverridesSchema>;
export type Source = z.infer<typeof sourceSchema>;
export type Features = z.infer<typeof featuresSchema>;
```

- [ ] **Step 8: Implement `packages/aggregator-config/src/index.ts`**

```ts
import yaml from 'js-yaml';
import { instanceConfigSchema, type InstanceConfig } from './schema';

export {
  instanceConfigSchema,
  type InstanceConfig,
  type ThemeOverrides,
  type Source,
  type Features,
} from './schema';

/**
 * Parse a YAML string into a validated InstanceConfig.
 * Throws ZodError on validation failure (caught at call site, not here).
 */
export function parseInstanceConfigYaml(yamlString: string): InstanceConfig {
  const raw = yaml.load(yamlString);
  return instanceConfigSchema.parse(raw);
}
```

- [ ] **Step 9: Run tests, see them pass**

```bash
pnpm --filter @regen-coordination/aggregator-config run test
```

Expected: all 9 tests pass.

- [ ] **Step 10: Create `packages/aggregator-config/README.md`**

```markdown
# @regen-coordination/aggregator-config

Zod schema for aggregator instance configuration. Each ecosystem-aggregator instance (e.g., `bay-area`, `mediterranean`, `global-regen`) ships an `instance.yaml` validated against this schema before build.

## Usage

```ts
import { parseInstanceConfigYaml } from '@regen-coordination/aggregator-config';
import { readFileSync } from 'node:fs';

const config = parseInstanceConfigYaml(readFileSync('instance.yaml', 'utf8'));
// config is now a validated InstanceConfig.
```

## Schema (high-level)

- `name` (required, kebab-case): instance slug.
- `displayName` (required): human-readable name.
- `description` (optional): instance pitch.
- `locale` (`en` | `es` | `pt` | `ca`, default `en`).
- `theme` (optional): override default OKLCH tokens (primary, accent, bg, etc.).
- `sources` (required, array): data sources (`federation` | `github` | `csv` | `events`).
- `features` (optional): toggle individual page surfaces.
```

- [ ] **Step 11: Commit**

```bash
git add packages/aggregator-config pnpm-lock.yaml
git commit -m "phase-2: aggregator-config Zod schema (instance config: theme, sources, features) + tests"
```

---

## Task 12: Astro storybook scaffold + theme/breakpoint controls

**Files:**
- Create: `apps/storybook/package.json`
- Create: `apps/storybook/astro.config.mjs`
- Create: `apps/storybook/tsconfig.json`
- Create: `apps/storybook/src/layouts/Showcase.astro`
- Create: `apps/storybook/src/pages/index.astro`
- Create: `apps/storybook/src/components/{ThemeToggle,BreakpointFrame}.astro`
- Create: `apps/storybook/src/styles/global.css`

- [ ] **Step 1: Create `apps/storybook/package.json`**

```json
{
  "name": "@regen-coordination/storybook",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "type-check": "astro check"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.0",
    "@astrojs/react": "^4.0.0",
    "@regen-coordination/aggregator-ui": "workspace:*",
    "@tailwindcss/vite": "^4.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "astro": "^5.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0"
  },
  "devDependencies": {
    "@fontsource/inter": "^5.0.0",
    "@fontsource/jetbrains-mono": "^5.0.0",
    "@fontsource/poppins": "^5.0.0"
  }
}
```

- [ ] **Step 2: Create `apps/storybook/astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Create `apps/storybook/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": ["src/**/*", ".astro/types.d.ts"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 4: Create `apps/storybook/src/styles/global.css`**

```css
@import '@regen-coordination/aggregator-ui/theme/tokens.css';
@import '@regen-coordination/aggregator-ui/theme/gradients.css';
@import '@regen-coordination/aggregator-ui/theme/typography.css';
@import '@regen-coordination/aggregator-ui/theme/spacing.css';
@import '@fontsource/poppins/400.css';
@import '@fontsource/poppins/600.css';
@import '@fontsource/poppins/700.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/inter/700.css';
@import '@fontsource/jetbrains-mono/400.css';
@import 'tailwindcss';

@theme {
  --color-bg: var(--bg);
  --color-surface-1: var(--surface-1);
  --color-surface-2: var(--surface-2);
  --color-surface-3: var(--surface-3);
  --color-text-primary: var(--text-primary);
  --color-text-muted: var(--text-muted);
  --color-border-default: var(--border-default);
  --color-border-subtle: var(--border-subtle);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-active: var(--primary-active);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-danger: var(--danger);
  --color-danger-foreground: var(--danger-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --font-mono: var(--font-mono);
}

body {
  background-color: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-body);
}
```

- [ ] **Step 5: Create `apps/storybook/src/components/ThemeToggle.astro`**

```astro
---
---
<button id="theme-toggle" type="button" class="rounded-md border border-border-default px-3 py-1 text-sm">
  <span data-theme-label="light">🌞 Light</span>
  <span data-theme-label="dark" class="hidden">🌙 Dark</span>
</button>
<script>
  const KEY = 'storybook-theme';
  const initial = localStorage.getItem(KEY) ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initial);
  updateLabels(initial);

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') ?? 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(KEY, next);
    updateLabels(next);
  });

  function updateLabels(theme: string) {
    document.querySelectorAll<HTMLElement>('[data-theme-label]').forEach((el) => {
      el.classList.toggle('hidden', el.dataset.themeLabel !== theme);
    });
  }
</script>
```

- [ ] **Step 6: Create `apps/storybook/src/components/BreakpointFrame.astro`**

```astro
---
interface Props {
  title: string;
  children?: any;
}
const { title } = Astro.props;
const breakpoints = [
  { name: 'sm', width: 640 },
  { name: 'md', width: 768 },
  { name: 'lg', width: 1024 },
  { name: 'xl', width: 1280 },
  { name: '2xl', width: 1536 },
];
---
<section class="my-6">
  <h2 class="font-display text-xl font-semibold mb-3">{title}</h2>
  <div class="space-y-4">
    {breakpoints.map((bp) => (
      <div>
        <p class="text-sm text-text-muted mb-1">{bp.name} ({bp.width}px)</p>
        <div class="border border-border-subtle rounded-lg overflow-hidden" style={`max-width: ${bp.width}px;`}>
          <slot />
        </div>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 7: Create `apps/storybook/src/layouts/Showcase.astro`**

```astro
---
import '~/styles/global.css';
import ThemeToggle from '~/components/ThemeToggle.astro';

interface Props {
  title: string;
}
const { title } = Astro.props;

const navGroups = [
  {
    label: 'Tokens',
    pages: [
      { href: '/tokens/colors', label: 'Colors' },
      { href: '/tokens/typography', label: 'Typography' },
      { href: '/tokens/spacing', label: 'Spacing & Radius' },
    ],
  },
  {
    label: 'Primitives',
    pages: [
      { href: '/primitives/button', label: 'Button' },
      { href: '/primitives/card', label: 'Card' },
      { href: '/primitives/badge', label: 'Badge' },
      { href: '/primitives/input', label: 'Input' },
      { href: '/primitives/select', label: 'Select' },
      { href: '/primitives/combobox', label: 'Combobox' },
      { href: '/primitives/command', label: 'Command' },
      { href: '/primitives/tabs', label: 'Tabs' },
      { href: '/primitives/accordion', label: 'Accordion' },
      { href: '/primitives/dialog', label: 'Dialog' },
      { href: '/primitives/popover', label: 'Popover' },
      { href: '/primitives/tooltip', label: 'Tooltip' },
      { href: '/primitives/table', label: 'Table' },
    ],
  },
  {
    label: 'Composites',
    pages: [
      { href: '/composites/gradient-hero', label: 'GradientHero' },
      { href: '/composites/node-orb', label: 'NodeOrb' },
      { href: '/composites/initiative-card', label: 'InitiativeCard' },
      { href: '/composites/funding-card', label: 'FundingCard' },
      { href: '/composites/event-card', label: 'EventCard' },
      { href: '/composites/filter-bar', label: 'FilterBar' },
      { href: '/composites/capital-flow-diagram', label: 'CapitalFlowDiagram' },
      { href: '/composites/council-timeline-entry', label: 'CouncilTimelineEntry' },
    ],
  },
];
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title} · Regen Coordination Storybook</title>
  </head>
  <body class="min-h-screen flex">
    <aside class="w-64 border-r border-border-subtle p-4 overflow-y-auto sticky top-0 h-screen">
      <div class="flex items-center justify-between mb-4">
        <a href="/" class="font-display font-bold">RC Storybook</a>
        <ThemeToggle />
      </div>
      {navGroups.map((g) => (
        <div class="mb-4">
          <p class="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">{g.label}</p>
          <ul>
            {g.pages.map((p) => (
              <li><a href={p.href} class="block text-sm py-1 hover:text-primary">{p.label}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
    <main class="flex-1 p-8">
      <h1 class="font-display text-3xl font-bold mb-6">{title}</h1>
      <slot />
    </main>
  </body>
</html>
```

- [ ] **Step 8: Create `apps/storybook/src/pages/index.astro`**

```astro
---
import Showcase from '~/layouts/Showcase.astro';
---
<Showcase title="Regen Coordination — Component Showcase">
  <p class="text-md mb-4">
    Visual reference for every primitive and composite pattern in
    <code>@regen-coordination/aggregator-ui</code>. Use the sidebar to browse.
  </p>
  <p class="text-sm text-text-muted">
    Phase 2 deliverable. Source: <a href="/" class="text-primary underline">docs/DESIGN.md</a>.
  </p>
</Showcase>
```

- [ ] **Step 9: Install + run dev server to verify scaffold**

```bash
pnpm install
pnpm --filter @regen-coordination/storybook run dev
```

Expected: Astro dev server starts (default port 4321). Open in browser; the index page loads showing the sidebar nav. Theme toggle works (toggles `data-theme="dark"` and updates colors).

Stop the server before continuing (Ctrl+C).

- [ ] **Step 10: Type-check**

```bash
pnpm --filter @regen-coordination/storybook run type-check
```

Expected: passes (sidebar nav links to pages we'll create in Tasks 13-14 — those are 404s for now but type-check doesn't error on them).

- [ ] **Step 11: Commit**

```bash
git add apps/storybook pnpm-lock.yaml
git commit -m "phase-2: scaffold apps/storybook (Astro + Tailwind v4) with theme switcher + breakpoint frame"
```

---

## Task 13: Storybook pages — tokens + primitives

**Files:**
- Create: `apps/storybook/src/pages/tokens/{colors,typography,spacing}.astro`
- Create: `apps/storybook/src/pages/primitives/{button,card,badge,input,select,combobox,command,tabs,accordion,dialog,popover,tooltip,table}.astro`

These are display-only pages. Each renders the component(s) at every variant + state, in both themes (the theme switcher applies globally; just verify rendering looks right in dark too).

- [ ] **Step 1: Create `apps/storybook/src/pages/tokens/colors.astro`**

```astro
---
import Showcase from '~/layouts/Showcase.astro';

const tokens = [
  { name: '--bg', label: 'Background' },
  { name: '--surface-1', label: 'Surface 1' },
  { name: '--surface-2', label: 'Surface 2' },
  { name: '--surface-3', label: 'Surface 3' },
  { name: '--text-primary', label: 'Text primary' },
  { name: '--text-muted', label: 'Text muted' },
  { name: '--border-default', label: 'Border default' },
  { name: '--border-subtle', label: 'Border subtle' },
  { name: '--primary', label: 'Primary' },
  { name: '--primary-hover', label: 'Primary hover' },
  { name: '--primary-active', label: 'Primary active' },
  { name: '--primary-foreground', label: 'Primary fg' },
  { name: '--accent', label: 'Accent' },
  { name: '--accent-foreground', label: 'Accent fg' },
  { name: '--success', label: 'Success' },
  { name: '--warning', label: 'Warning' },
  { name: '--danger', label: 'Danger' },
  { name: '--info', label: 'Info' },
];
---
<Showcase title="Color tokens">
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {tokens.map((t) => (
      <div class="rounded-lg border border-border-subtle p-3">
        <div class="h-16 rounded-md mb-2" style={`background: var(${t.name})`}></div>
        <p class="font-mono text-xs">{t.name}</p>
        <p class="text-xs text-text-muted">{t.label}</p>
      </div>
    ))}
  </div>
</Showcase>
```

- [ ] **Step 2: Create `apps/storybook/src/pages/tokens/typography.astro`**

```astro
---
import Showcase from '~/layouts/Showcase.astro';

const scale = [
  { name: '--text-xs', label: 'xs · captions' },
  { name: '--text-sm', label: 'sm · helper' },
  { name: '--text-base', label: 'base · body' },
  { name: '--text-md', label: 'md · lead' },
  { name: '--text-lg', label: 'lg · subhead' },
  { name: '--text-xl', label: 'xl · h3' },
  { name: '--text-2xl', label: '2xl · h2' },
  { name: '--text-3xl', label: '3xl · h1' },
  { name: '--text-4xl', label: '4xl · hero secondary' },
  { name: '--text-5xl', label: '5xl · hero display' },
];
---
<Showcase title="Typography scale">
  <p class="font-display text-md mb-4">Display family — Poppins. Body family — Inter.</p>
  <div class="space-y-4">
    {scale.map((s) => (
      <div class="border-b border-border-subtle pb-2">
        <p class="text-xs font-mono text-text-muted">{s.name} · {s.label}</p>
        <p class="font-display" style={`font-size: var(${s.name})`}>The quick brown fox jumps over the lazy dog</p>
        <p class="font-body" style={`font-size: var(${s.name})`}>Body sample at this size</p>
      </div>
    ))}
  </div>
</Showcase>
```

- [ ] **Step 3: Create `apps/storybook/src/pages/tokens/spacing.astro`**

```astro
---
import Showcase from '~/layouts/Showcase.astro';

const spacing = ['1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32'];
const radius = ['sm', 'md', 'lg', 'xl', 'pill'];
const shadow = ['sm', 'md', 'lg', 'xl', 'glow'];
---
<Showcase title="Spacing, radius, shadow">
  <h2 class="font-display text-lg mb-3">Spacing</h2>
  <div class="space-y-2 mb-8">
    {spacing.map((s) => (
      <div class="flex items-center gap-3">
        <code class="text-xs w-24">--space-{s}</code>
        <div class="bg-primary h-3" style={`width: var(--space-${s})`}></div>
      </div>
    ))}
  </div>
  <h2 class="font-display text-lg mb-3">Border radius</h2>
  <div class="flex flex-wrap gap-4 mb-8">
    {radius.map((r) => (
      <div class="text-center">
        <div class="h-16 w-16 bg-primary" style={`border-radius: var(--radius-${r})`}></div>
        <p class="font-mono text-xs mt-1">--radius-{r}</p>
      </div>
    ))}
  </div>
  <h2 class="font-display text-lg mb-3">Shadow</h2>
  <div class="flex flex-wrap gap-6">
    {shadow.map((s) => (
      <div class="text-center">
        <div class="h-16 w-16 bg-surface-1 rounded-md" style={`box-shadow: var(--shadow-${s})`}></div>
        <p class="font-mono text-xs mt-1">--shadow-{s}</p>
      </div>
    ))}
  </div>
</Showcase>
```

- [ ] **Step 4: Create primitive showcase pages — pattern**

For each primitive, create a page rendering all variants and states. Pattern shown for Button; replicate the same shape for the other 12 primitives.

`apps/storybook/src/pages/primitives/button.astro`:

```astro
---
import Showcase from '~/layouts/Showcase.astro';
import { Button } from '@regen-coordination/aggregator-ui';
---
<Showcase title="Button">
  <h2 class="font-display text-lg mb-3">Variants</h2>
  <div class="flex flex-wrap gap-3 mb-8">
    <Button variant="primary" client:load>Primary</Button>
    <Button variant="secondary" client:load>Secondary</Button>
    <Button variant="outline" client:load>Outline</Button>
    <Button variant="ghost" client:load>Ghost</Button>
    <Button variant="destructive" client:load>Destructive</Button>
  </div>

  <h2 class="font-display text-lg mb-3">Sizes</h2>
  <div class="flex flex-wrap items-center gap-3 mb-8">
    <Button size="sm" client:load>Small</Button>
    <Button size="md" client:load>Medium (default)</Button>
    <Button size="lg" client:load>Large</Button>
  </div>

  <h2 class="font-display text-lg mb-3">States</h2>
  <div class="flex flex-wrap gap-3">
    <Button client:load>Default</Button>
    <Button disabled client:load>Disabled</Button>
  </div>
</Showcase>
```

- [ ] **Step 5: Create the remaining 12 primitive showcase pages**

Each follows the same pattern: heading, render every variant and state. Use:

- `card.astro` — three variants (default, elevated, glass) plus interactive + selected states; show CardHeader/Body/Footer.
- `badge.astro` — 4 variants (default, network, status, count) × 2 sizes; for `network` set `data-network` to demonstrate color override.
- `input.astro` — default, focus, error, disabled, readonly states. Use the label + hint + error props.
- `select.astro` — render with a small option set.
- `combobox.astro` — render with 5+ options to demonstrate filtering.
- `command.astro` — show `useCommandPalette()` hook bound to a button that opens `CommandDialog` with sample groups.
- `tabs.astro` — 3 variants (underline, pill, segmented); each with 3 tabs and panels.
- `accordion.astro` — single + multi expand modes; 3 items.
- `dialog.astro` — trigger button + dialog content with header/body/footer.
- `popover.astro` — trigger + content with sample text.
- `tooltip.astro` — 3 example triggers with tooltip text.
- `table.astro` — 3 variants (default zebra, compact, card-rows) each with sample rows.

**Time-saving tip:** these are pure component-rendering pages. Use the same per-component skeleton: `<Showcase title="Foo"><h2>Variants</h2>... <h2>States</h2>...</Showcase>`. Don't over-engineer — operator just needs to see them visually.

- [ ] **Step 6: Run dev server, browse every page**

```bash
pnpm --filter @regen-coordination/storybook run dev
```

Click through every primitive page. Verify:
- All variants render
- Toggle dark mode — colors invert correctly
- No console errors (check browser devtools)

Stop the server.

- [ ] **Step 7: Commit**

```bash
git add apps/storybook
git commit -m "phase-2: storybook pages — token galleries + 13 primitive showcase pages"
```

---

## Task 14: Storybook pages — composite patterns + CI workflows + Phase 2 wrap-up

**Files:**
- Create: `apps/storybook/src/pages/composites/{gradient-hero,node-orb,initiative-card,funding-card,event-card,filter-bar,capital-flow-diagram,council-timeline-entry}.astro`
- Create: `.github/workflows/schema-check.yml`
- Create: `.github/workflows/a11y-audit.yml`
- Modify: `package.json` (add `validate:aggregator-config` script)
- Create: `scripts/validate-aggregator-config.mjs`
- Modify: `docs/plans/QUEUE.md`
- Modify: `memory/<today>.md` (append Phase 2 completion entry)

- [ ] **Step 1: Create `apps/storybook/src/pages/composites/gradient-hero.astro`**

```astro
---
import Showcase from '~/layouts/Showcase.astro';
import { GradientHero } from '@regen-coordination/aggregator-ui';
---
<Showcase title="GradientHero">
  <h2 class="font-display text-lg mb-3">Compact (default)</h2>
  <GradientHero
    client:load
    variant="compact"
    wordmark="Regen Coordination"
    tagline="Collaborative Pathways to Regeneration"
    stats={[
      { label: 'Networks', value: '7' },
      { label: 'Council meetings', value: '23' },
      { label: 'Funding routed', value: '$84k' },
      { label: 'Initiatives', value: '6' },
    ]}
  />

  <h2 class="font-display text-lg mb-3 mt-8">Slim</h2>
  <GradientHero
    client:load
    variant="slim"
    wordmark="Network"
    tagline="The hub model + governance cadence"
  />
</Showcase>
```

- [ ] **Step 2: Create the 7 remaining composite showcase pages**

Each renders the composite with sample data. Use:

- `node-orb.astro` — render `<NodeOrb>` with 5 nodes positioned around a circle and 7 edges. Use sample networks (`refi-dao`, `greenpill`, `bloom`, `rc`).
- `initiative-card.astro` — render 3 InitiativeCards in a grid with realistic-looking data (Coop, Regen Toolkit, Bread Coop).
- `funding-card.astro` — render 3 FundingCards (Octant Vault — active, deadline 5 days; Artizen Fund — applied; Old GG23 — closed).
- `event-card.astro` — render 3 EventCards (RC Council Sync — weekly; Regenerant Catalunya — one-off; GG24 prep — monthly).
- `filter-bar.astro` — render `<FilterBar>` with 3 filters (Network, Status, Date range) and 2 active.
- `capital-flow-diagram.astro` — render the stub with sample nodes/flows (Bread Coop, Octant on the left; per-network on the right).
- `council-timeline-entry.astro` — render `<CouncilTimelineEntry>` with 3 sample meetings (full attendees + decisions arrays).

Same skeleton: `<Showcase>` + section headers + multiple variants where the component supports them.

- [ ] **Step 3: Run dev server, click through every composite page**

```bash
pnpm --filter @regen-coordination/storybook run dev
```

Verify all 8 composite pages render in both themes. Stop server when done.

- [ ] **Step 4: Create `scripts/validate-aggregator-config.mjs`**

```js
#!/usr/bin/env node
/**
 * Validates any examples/<instance>/instance.yaml against the
 * @regen-coordination/aggregator-config Zod schema.
 * Used by the schema-check.yml workflow on PR.
 *
 * Usage: node scripts/validate-aggregator-config.mjs [--strict]
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parseInstanceConfigYaml } from '../packages/aggregator-config/src/index.ts';

const examplesDir = 'examples';
let failures = 0;

if (!existsSync(examplesDir)) {
  console.log(`No ${examplesDir}/ directory yet — Phase 4 deliverable. Skipping validation.`);
  process.exit(0);
}

for (const dir of readdirSync(examplesDir)) {
  const path = join(examplesDir, dir, 'instance.yaml');
  if (!existsSync(path)) continue;
  const yaml = readFileSync(path, 'utf8');
  try {
    parseInstanceConfigYaml(yaml);
    console.log(`✓ ${path}`);
  } catch (err) {
    console.error(`✗ ${path}`);
    console.error(err instanceof Error ? err.message : String(err));
    failures += 1;
  }
}

process.exit(failures === 0 ? 0 : 1);
```

Add to root `package.json` `"scripts"`:

```json
"validate:aggregator-config": "node --import tsx/esm scripts/validate-aggregator-config.mjs"
```

(Note: `tsx` is needed because the script imports a `.ts` file. Install via `pnpm add -D -w tsx`.)

```bash
pnpm add -D -w tsx
```

- [ ] **Step 5: Create `.github/workflows/schema-check.yml`**

```yaml
name: Schema check

on:
  pull_request:
    paths:
      - 'data/**'
      - 'federation.yaml'
      - 'examples/**'
      - 'packages/aggregator-config/**'
      - '.github/workflows/schema-check.yml'

jobs:
  schemas:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - name: Validate org-os data schemas
        run: pnpm run validate:schemas
      - name: Type-check aggregator packages
        run: |
          pnpm --filter @regen-coordination/aggregator-config run type-check
          pnpm --filter @regen-coordination/aggregator-ui run type-check
      - name: Test aggregator-config schema
        run: pnpm --filter @regen-coordination/aggregator-config run test
      - name: Validate any example instance configs
        run: pnpm run validate:aggregator-config
```

- [ ] **Step 6: Create `.github/workflows/a11y-audit.yml` (stub)**

```yaml
name: a11y audit (stub — Phase 5)

on:
  pull_request:
    paths:
      - 'apps/**'
      - 'packages/aggregator-ui/**'
      - '.github/workflows/a11y-audit.yml'

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Stub
        run: |
          echo "a11y audit will run axe-core against staging URLs in Phase 5."
          echo "Stub workflow committed in Phase 2 to reserve the file path."
```

- [ ] **Step 7: Run all tests, type-checks, and dev server one more time**

```bash
pnpm --filter @regen-coordination/aggregator-ui run test
pnpm --filter @regen-coordination/aggregator-config run test
pnpm --filter @regen-coordination/aggregator-ui run type-check
pnpm --filter @regen-coordination/aggregator-config run type-check
pnpm --filter @regen-coordination/storybook run type-check
pnpm run validate:schemas
pnpm run validate:aggregator-config
```

All should pass.

- [ ] **Step 8: Manually open the storybook**

```bash
pnpm --filter @regen-coordination/storybook run dev
```

Open `http://localhost:4321/`. Click through:
- Every token gallery (3 pages)
- Every primitive page (13 pages)
- Every composite page (8 pages)

For each: toggle theme, verify rendering looks right. Stop the server.

- [ ] **Step 9: Update `docs/plans/QUEUE.md`**

In the aggregator initiative block under `## Active`, change:

```
- ⏭ **Phase 2** — Monorepo scaffold + `aggregator-ui` foundation — **next plan to write** (invoke `superpowers:writing-plans` against spec §8 Phase 2)
- ⏭ **Phase 3** — `aggregator-data` + RC app (6 nav pages)
```

To:

```
- ✅ **Phase 2** — Monorepo scaffold + `aggregator-ui` foundation — completed YYYY-MM-DD — see [`docs/plans/2026-05-03-phase-2-monorepo-scaffold.md`](2026-05-03-phase-2-monorepo-scaffold.md), `apps/storybook/`
- ⏭ **Phase 3** — `aggregator-data` + RC app (6 nav pages) — **next plan to write** (invoke `superpowers:writing-plans` against spec §8 Phase 3)
```

(`YYYY-MM-DD` = the actual completion date.)

- [ ] **Step 10: Append Phase 2 completion entry to memory log**

Open `memory/<today>.md` (or create today's if older). Append:

```markdown

## Phase 2 — Monorepo scaffold + aggregator-ui foundation — complete

- pnpm workspace bootstrapped scoped to `packages/aggregator-*` + `apps/*` (existing operational packages untouched)
- `packages/aggregator-ui` ships 13 shadcn-aligned primitives + 8 composite patterns (one CapitalFlowDiagram stub for Phase 3) with light + dark theme tokens
- `packages/aggregator-config` ships Zod schema for instance config (theme, sources, features) + YAML helper, 9 tests
- `apps/storybook` (Astro 5 + Tailwind v4) renders every primitive and composite at every breakpoint in both themes; theme switcher persists to localStorage
- CI: `.github/workflows/schema-check.yml` validates data schemas + aggregator-config Zod + type-checks aggregator packages on PR
- a11y audit workflow stubbed for Phase 5
- Tailwind v4 `@theme` consumes OKLCH tokens from `docs/DESIGN.md` §2 — single tokens.css file with `[data-theme="dark"]` selectors
- shadcn manual install pattern documented at `packages/aggregator-ui/components.json`; ready for component additions in later phases
- Next: Phase 3 — `aggregator-data` adapters + RC app pages
```

- [ ] **Step 11: Commit**

```bash
git add apps/storybook .github/workflows scripts/validate-aggregator-config.mjs package.json pnpm-lock.yaml docs/plans/QUEUE.md memory/<today>.md
git commit -m "phase-2: composite showcase pages + schema-check CI + Phase 2 wrap-up (queue + memory)"
```

- [ ] **Step 12: Operator review checkpoint**

Output to terminal:

```
Phase 2 complete. Deliverables:

  packages/aggregator-ui/                       13 primitives + 8 composites
                                                 light + dark token CSS modules
                                                 26 tests passing
  packages/aggregator-config/                   Zod instance-config schema
                                                 9 tests passing
  apps/storybook/ (Astro 5)                    24 showcase pages
                                                 theme switcher + breakpoint preview
  .github/workflows/schema-check.yml            Zod + tsc + test on PR
  .github/workflows/a11y-audit.yml              Stub for Phase 5
  pnpm-workspace.yaml + tsconfig.base.json     monorepo bootstrapped
  docs/plans/QUEUE.md                            Phase 2 ✅, Phase 3 queued
  memory/<date>.md                               session log entry appended

To review: pnpm --filter @regen-coordination/storybook run dev
            then open http://localhost:4321/

Specifically check:
  - Primitive variants/states render correctly in both themes
  - Composite patterns look as intended for the 6 RC + 5 ecosystem nav surfaces
  - Theme switcher persists across navigation (localStorage)
  - Breakpoint preview at sm/md/lg/xl/2xl matches DESIGN.md §10.1

Once approved, run: invoke writing-plans against spec §8 Phase 3.
```

Wait for operator response. If changes requested, edit inline and re-commit per change. Phase 3 plan does not start until Phase 2 is approved.

---

## Self-review checklist (run after writing the plan)

- [x] **Spec coverage:** Each Phase 2 deliverable in spec §8 maps to a task: monorepo bootstrap (T1), tooling (T2-T3), aggregator-ui scaffold + theme (T4-T6), shadcn primitives (T7-T8), composite patterns (T9-T10), aggregator-config (T11), Astro storybook (T12-T14), CI schema-check (T14), operator checkpoint (T14). The "shadcn initialized via chosen installer skill" is the only spec phrase requiring adaptation — Phase 0 confirmed no installer skill exists, so the plan uses manual `npx shadcn@latest init` (documented in pre-flight).
- [x] **No placeholders:** Every step contains actual content. The CapitalFlowDiagram is explicitly a stub with the data shape, not a placeholder; the spec defers full Sankey implementation to Phase 3.
- [x] **Type / name consistency:**
  - Package names: `@regen-coordination/aggregator-{ui,config}` — consistent across all package.json, imports, exports.
  - Path alias `~` → `./src/` in every package.
  - Token CSS variable names match DESIGN.md §2.2/§2.4 exactly.
  - PascalCase for component files: `Button.tsx`, `GradientHero.tsx` — matches DESIGN.md §1.3 naming convention.
- [x] **Bite-sized:** Each task has 6-15 sub-steps; each sub-step is a 2-5 minute action (write the file, run tests, commit).
- [x] **TDD adaptation:** Tasks 7-11 follow TDD where it adds value (aggregator-config Zod schema is full red-green-refactor; primitive wrappers use minimal "renders + className passes" tests since shadcn primitives are well-tested upstream). Storybook pages are visual artifacts — no automated tests beyond the type-check.
- [x] **Frequent commits:** 14 task-level commits + intermediate fixes when reviewers surface issues. Mirrors Phase 1's pattern.
- [x] **Skill usage explicit:** Phase 0-installed skills referenced where applicable: `oklch-skill` (token derivation referenced for new shades; Phase 2 transcribes existing tokens), `frontend-design` (variant + anatomy discipline guides primitive wrappers), `webapp-testing` (testing-library patterns), `deploy-to-vercel` (deferred to Phase 5). The shadcn install path documented as manual (no installer skill).

---

## Out of scope for this plan

- **Real federation peer registry** (`data/federation-peers.yaml`) — Phase 3 deliverable. §5.4 of DESIGN.md uses inline hex literals for `refi-dao`/`greenpill`/`bloom` networks, which is intentional Phase 2 state.
- **`packages/aggregator-data/`** — Phase 3. The `aggregator-config` Zod schema declares the data-source shape but the adapters that consume it land in Phase 3.
- **Real `@nivo/sankey` rendering for CapitalFlowDiagram** — Phase 3 (depends on real capital-flow data).
- **Visual regression CI (Playwright snapshots)** — Phase 5 (open question §9.5 default).
- **Lighthouse / SEO / production deploys** — Phase 5.
- **`apps/regen-coordination/` and `apps/regen-ecosystem/` apps** — Phase 3 / 4.
- **`@org-os/*` package promotion** — Phase 6 retrospective.
- **Lint-staged / husky** pre-commit hooks — not requested by spec; can add in a follow-up if operator wants.
- **i18n infrastructure for ES/PT/CA locales** — DESIGN.md §1.2 notes secondary locales are post-v1; Phase 2 only declares `locale` in the Zod schema, no runtime i18n wiring.
