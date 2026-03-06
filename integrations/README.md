# Integrations

Purpose: map and operationalize integrations between Regen Coordination OS and external systems (knowledge infra, content, agent runtimes, funding platforms).

## What goes here

- Integration profiles (what system, why integrate, how, status)
- Sync plans (manual, semi-automated, automated)
- Crosswalks (taxonomy/tag mappings where relevant)
- Backlog and next actions per integration

## Core files

- `profiles/` — one file per system (`<system>-integration.md`)
- `sync/` — sync procedures and SOPs
- `crosswalks/` — taxonomy and content type mappings

## Integration targets (priority-tiered)

### P0 — Active / high leverage

| System | Local Path / Source | Profile |
|--------|---------------------|---------|
| KOI-net | `03 Libraries/koi-net` | [koi-net-integration](profiles/koi-net-integration.md) |
| Regen Toolkit | `03 Libraries/regen-toolkit` | [regen-toolkit-integration](profiles/regen-toolkit-integration.md) |
| OpenClaw | `03 Libraries/openclaw-source` | [openclaw-integration](profiles/openclaw-integration.md) |
| Funding platforms | `skills/funding-scout/references/funding-platforms.yaml` | [funding-platforms-integration](profiles/funding-platforms-integration.md) |
| Coop | `03 Libraries/coop` | [coop-integration](profiles/coop-integration.md) |

## Status model

- `planned`
- `mapping`
- `prototype`
- `active`
- `blocked`
