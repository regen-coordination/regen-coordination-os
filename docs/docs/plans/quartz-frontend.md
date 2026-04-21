---
id: quartz-frontend
title: "Knowledge Base Frontend — Quartz Customization"
status: backlog
priority: 11
scope: refi-bcn-os
depends_on: [knowledge-processing]
created: 2026-04-06
started: null
completed: null
estimated_sessions: 2-3
tags: [quartz, frontend, knowledge, design]
category: knowledge
related_to:
  - type: project
    id: website
---

## Goal

Customize the Quartz v4.5.1 frontend for the ReFi BCN knowledge base. The content migration is done (repos/refi-bcn-knowledge) — this plan handles theme, components, deployment, and custom domain.

## Tasks

### Theme & Design
- [ ] Refine color scheme (currently navy blue — review for ReFi BCN brand)
- [ ] Update typography if needed
- [ ] Customize graph view styling
- [ ] Add ReFi BCN logo/favicon

### Components
- [ ] Customize explorer sidebar (section ordering, folding behavior)
- [ ] Configure tag pages and tag taxonomy
- [ ] Review and customize OG images generation
- [ ] Add bilingual support (Catalan/English toggle or language tags)

### Deployment
- [ ] Configure GitHub Actions for automated builds
- [ ] Handle symlink/content-copy strategy for CI (content lives in org-os repo)
- [ ] Set up custom domain (refibcn.cat subdomain or similar)
- [ ] Configure Plausible analytics

### Content Views
- [ ] Consider YAML data views (projects, members, events from data/*.yaml)
- [ ] Design landing page layout
- [ ] Configure RSS feed content scope

## References

- `docs/QUARTZ-FRONTEND-SPEC.md` — existing spec document
- `repos/refi-bcn-knowledge/quartz.config.ts` — current config
- `repos/refi-bcn-knowledge/quartz.layout.ts` — current layout
