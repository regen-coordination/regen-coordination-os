# Regen Coordination OS — Agent Guide

This repo serves as a Git-based coordination layer for regenerative network nodes,
and embeds selected repos under `packages/` via git subtree.

---

## Repository Structure

**Root (Coordination Hub):**
- `knowledge/` — Aggregated knowledge by domain
- `skills/` — Shared skills distributed to nodes
- `data/` — Network registries (funding, nodes, funds)
- `.github/workflows/` — Automation (knowledge aggregation, skill distribution)

**Embedded repos (`packages/`):**
- `packages/coop/` — Browser knowledge commons monorepo
- `packages/regen-toolkit/` — Toolkit/content repo (source remote: explorience)

**Coop monorepo internals (`packages/coop/`):**
- `packages/extension/` — Chromium extension (Manifest V3)
- `packages/pwa/` — Mobile companion PWA (React + Vite)
- `packages/anchor/` — Node backend (Fastify + WebSocket)
- `packages/shared/` — Types, protocols, storage abstractions
- `packages/contracts/` — On-chain registry contracts (Solidity/Forge)
- `packages/org-os/` — Organizational OS schemas

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
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm check
pnpm format
```

**Individual coop packages:**
```bash
# Inside packages/coop/packages/<name>/
pnpm dev
pnpm build
pnpm check
pnpm lint
```

**Coop contracts (Forge):**
```bash
cd packages/coop/packages/contracts
forge build
forge test
```

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

---

## Integration Points

**Downstream nodes** (see `federation.yaml` and `MEMBERS.md`):
- ReFi BCN, Regenerant Catalunya, Local ReFi Toolkit, NYC Node, Bloom, GreenPill Network

**Tool integrations** — See `integrations/` for profiles and specs.

**Upstream base conventions**:
- `https://github.com/regen-coordination/organizational-os` (`packages/template`)

---

## Communication

- **Forum:** hub.regencoordination.xyz — API: `/latest.json`
- **Telegram:** RC Council (governance), RC Open (community)
- **Weekly calls:** Fridays (recorded, processed via meeting-processor)

---

## Automation

- `aggregate-knowledge.yml` — Weekly aggregation from nodes
- `distribute-skills.yml` — Push skill updates to downstream nodes
