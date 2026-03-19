# Regen Coordination OS — Agent Guide

This repo serves as a Git-based coordination layer for regenerative network nodes, and embeds selected repos under `packages/` via git subtree.

---

## Repository Structure

**Root (Coordination Hub):**
- `knowledge/` — Aggregated knowledge by domain (regenerative-finance/, local-governance/, knowledge-infrastructure/, network/)
- `skills/` — Shared skills distributed to nodes (meeting-processor, funding-scout, knowledge-curator)
- `data/` — Network registries (funding-opportunities.yaml, funds.yaml, nodes.yaml, channels.yaml, initiatives.yaml, programs.yaml)
- `funding/` — Funding pool configurations by domain
- `memory/` — Agent memory and context files
- `docs/` — Network documentation and guides
- `integrations/` — Tool integration profiles and specs
- `.github/workflows/` — Automation (knowledge aggregation, skill distribution)

**Important Root Files:**
- `IDENTITY.md` — Hub identity manifest
- `MEMORY.md` — Persistent agent memory
- `MEMBERS.md` — Network member registry
- `SOUL.md` — Organizational values and principles
- `federation.yaml` — Network federation manifest v3.0

**Embedded repos (`packages/`):**
- `packages/coop/` — Browser knowledge commons monorepo
- `packages/regen-toolkit/` — Educational Web3 toolkit (source: explorience)

**Coop monorepo internals (`packages/coop/`):**
- `packages/extension/` — Chromium extension (Manifest V3)
- `packages/pwa/` — Mobile companion PWA (React 19 + Vite)
- `packages/anchor/` — Node backend (Fastify + WebSocket)
- `packages/shared/` — Types, protocols, storage abstractions
- `packages/contracts/` — On-chain registry contracts (Solidity/Forge)
- `packages/org-os/` — Organizational OS schemas

**Config Files:**
- `pnpm-workspace.yaml` — Workspace package definitions
- `turbo.json` — Task orchestration (build, dev, lint, check)
- `biome.json` — Formatter: 2-space indent, 100 char line width
- `tsconfig.base.json` — Shared TypeScript config (ES2022, ESNext, strict mode)

---

## Build, Lint, and Test Commands

**Root (Coordination Hub):**
```bash
# Root has no single package-manager workspace for all embedded repos.
# Use repo-specific commands in each embedded directory.
```

**Coop workspace commands:**
```bash
# Inside packages/coop
pnpm install      # Install dependencies
pnpm dev          # Start dev servers (parallel via turbo)
pnpm build        # Build all packages
pnpm lint         # Biome lint all packages
pnpm check        # TypeScript type check all packages
pnpm format       # Biome format all files
```

**Individual coop packages:**
```bash
# Inside packages/coop/packages/<name>/
pnpm dev          # Package-specific dev (vite or node --watch)
pnpm build        # Build package
pnpm check        # TypeScript check (tsc --noEmit)
pnpm lint         # Biome check src/
```

**Coop contracts (Forge):**
```bash
cd packages/coop/packages/contracts
forge build       # Build Solidity contracts
forge test        # Run contract tests
```

**No test runner currently configured** — Would need Vitest or Jest for unit tests.

---

## Code Style Guidelines

**TypeScript Configuration:**
- Target: ES2022, Module: ESNext, Resolution: Bundler
- Strict mode enabled, SkipLibCheck: true
- Extends `tsconfig.base.json` in each package

**Formatting (Biome):**
- Indent: 2 spaces
- Line width: 100 characters
- Run `pnpm format` before committing

**Naming Conventions:**
- Types/Interfaces: PascalCase (`CoopMember`, `StorageLayer`)
- Functions: camelCase (`replicateToAllLayers`)
- Constants: UPPER_SNAKE for true constants
- File names: kebab-case (`three-layer.ts`, `membrane.ts`)

**Code Patterns:**
- Prefer explicit types over inference for public APIs
- Use `type` for simple unions, `interface` for extensible objects
- Async/await for async operations (no callback chains)
- Export from index.ts using star exports: `export * from './types'`

**Error Handling:**
- Use explicit error types where possible
- Return `null` for missing data (not undefined)
- Prefer early returns over nested conditionals

**Imports:**
- Group: external deps → internal workspace deps (`@coop/shared`) → local
- No default exports (prefer named exports)
- Use workspace protocol: `workspace:*` for internal deps

---

## Subtree Maintenance

Embedded repos are maintained with `git subtree`.

**Pull updates:**
```bash
git subtree pull --prefix packages/coop https://github.com/regen-coordination/coop.git main --squash
git subtree pull --prefix packages/regen-toolkit https://github.com/explorience/regen-toolkit.git main --squash
```

**Push updates:**
```bash
git subtree push --prefix packages/coop https://github.com/regen-coordination/coop.git main
git subtree push --prefix packages/regen-toolkit https://github.com/explorience/regen-toolkit.git main
```

Use subtree (not submodules) so a single clone contains both embedded repos.

---

## Working with Hub Content

**Adding Knowledge:**
- Node contributions: `knowledge/<domain>/from-nodes/<node>/YYYY-MM-DD-contribution.md`
- Hub aggregations: `knowledge/<domain>/YYYY-MM-DD-topic.md`
- Never edit `from-nodes/` — that's node-owned content

**Updating Registry:**
- Nodes: `MEMBERS.md` + `federation.yaml`
- Funding: `data/funding-opportunities.yaml`
- Funds: `data/funds.yaml`

**Skill Distribution:**
- Skills: `skills/<skill-name>/SKILL.md` with frontmatter (name, version, description, category)
- References: `skills/<skill-name>/references/` for supporting docs
- Index: `skills/INDEX.md` — consolidated catalog
- Workflow: `distribute-skills.yml` pushes to downstream nodes on skill changes

---

## Integration Points

**Downstream nodes** (see `federation.yaml` and `MEMBERS.md`):
- ReFi BCN (anchor node), Regenerant Catalunya, Local ReFi Toolkit
- NYC Node, Bloom, GreenPill Network (bootstrapping)
- Coop (product node)

**Tool integrations** — See `integrations/` for profiles and specs.
- koi-net (real-time knowledge sync)
- regen-toolkit (educational content)
- openclaw (agent runtime)
- coop (browser knowledge commons)

**Upstream base conventions:**
- `https://github.com/regen-coordination/organizational-os` (`packages/template`)

---

## Communication

- **Forum:** hub.regencoordination.xyz — API: `/latest.json`, `/c/regen-coordination/4.json`
- **Telegram:** RC Council (governance, private), RC Open (community, public)
- **Weekly calls:** Fridays (recorded, processed via meeting-processor)

---

## Automation

**GitHub Actions:**
- `aggregate-knowledge.yml` — Runs Mondays 6am UTC to aggregate node knowledge
  - Scans `knowledge/<domain>/from-nodes/<node>/` for new contributions
  - Updates hub-curated aggregations in `knowledge/<domain>/`
  
- `distribute-skills.yml` — Runs when `skills/` changes
  - Pushes skill updates to downstream nodes via git
  - Target: ReFi BCN (configured in workflow)
  - Requires: `NODE_PUSH_TOKEN` secret for push access
  - Preserves node-specific additions (skill body replaced, node additions kept)

**Workflow triggers:**
- Manual (workflow_dispatch) or on push to main for skills
- Scheduled weekly for knowledge aggregation
