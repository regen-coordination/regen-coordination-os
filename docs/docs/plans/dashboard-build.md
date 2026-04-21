---
id: dashboard-build
title: "Build Organizational Health Dashboard"
status: backlog
priority: 4
scope: refi-bcn-os
depends_on: [v2-data-registries]
created: 2026-04-06
started: null
completed: null
estimated_sessions: 2
tags: [v2, packages, dashboard, webapp]
category: infrastructure
related_to:
  - type: area
    id: refi-bcn-os
---

## Goal

Build `packages/dashboard/` — organizational health overview customized for BCN cooperative context.

## Tasks

- [ ] Copy dashboard package from refi-dao-os (if built first) or build from framework template
- [ ] Customize for BCN identity (cooperative, Celo chain, local node)
- [ ] Create `scripts/generate-dashboard-data.mjs` (or adapt from refi-dao-os)
- [ ] Include BCN-specific data: pending payouts, Telegram routing
- [ ] Add BCN-specific events/channels to dashboard data generation
- [ ] Add `"generate:dashboard"` to package.json
- [ ] Verify ideation-board works with BCN data
- [ ] Verify aggregator works with BCN sources

## Verification

- [ ] Dashboard dev server starts and renders all sections with BCN data
- [ ] `npm run deploy:pages dashboard` builds static output
