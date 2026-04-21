# Quartz Frontend Spec — ReFi BCN

_Scope document for a Quartz-based public knowledge site for ReFi Barcelona._

## Purpose

Build a public-facing knowledge site at `refibcn.cat` (or subdomain) using [Quartz](https://quartz.jzhao.xyz/) — a fast, batteries-included static site generator for Obsidian/Markdown content.

## Content Structure

### Source: `knowledge/` → Quartz Pages

```
knowledge/
├── regenerative-finance/
│   └── index.md          → /regenerative-finance/
├── local-governance/
│   └── index.md          → /local-governance/
├── cooperative-web3-bridging/
│   └── index.md          → /cooperative-web3-bridging/
├── regenerant-catalunya/
│   └── index.md          → /regenerant-catalunya/
���── normalization-log.md  → /normalization-log/
```

### Source: `data/` → Structured Views

Quartz can render structured data as read-only views:

| Data File | View |
|-----------|------|
| `data/projects.yaml` | Projects directory page |
| `data/members.yaml` | Team page |
| `data/events.yaml` | Events calendar |
| `data/ideas.yaml` | Ideas pipeline |
| `data/funding-opportunities.yaml` | Funding tracker |

### Additional Content

- `SOUL.md` → About / Mission page
- `IDENTITY.md` → Organization identity page
- Selected `docs/` pages → Reference documentation

## Starting Point

Use `quartz-refi-template` as the base:
- Repository: `github.com/organizational-os/quartz-refi-template`
- Already configured for org-os content structure
- Includes ReFi-themed styling

## Technical Requirements

1. **Static generation** — Build to `_site/` for GitHub Pages deployment
2. **Markdown-native** — Render all `.md` files from `knowledge/`
3. **YAML data views** — Custom Quartz plugin to render `data/*.yaml` as pages
4. **Graph view** — Leverage Quartz's built-in graph for knowledge interconnections
5. **Search** — Built-in full-text search across all knowledge pages
6. **EIP-4824 link** — Include `.well-known/dao.json` in build output

## Deployment

- GitHub Pages at `refibcn.cat` (or `knowledge.refibcn.cat`)
- CI via GitHub Actions on push to `main`
- Build command: `npx quartz build`

## Scope Boundaries

- This is a **separate sub-project** for a future session
- Phase 1: Knowledge pages only (no data views)
- Phase 2: Add YAML data views and project pages
- Phase 3: Graph view customization and search tuning

## Dependencies

- `quartz-refi-template` — Base template
- `knowledge/` — Content source (must be populated first via C3-K)
- `data/knowledge-manifest.yaml` — Domain registry for navigation

---

_This is a specification document. Implementation is deferred to a dedicated session._
