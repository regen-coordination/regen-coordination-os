---
name: meeting-processor
version: 1.0.0
description: Process meeting transcripts into structured organizational records
author: regen-coordination
category: operations
metadata:
  openclaw:
    requires:
      env: []
      bins: []
      config: []
---

# Meeting Processor (Regen Coordination)

## What This Is

Network-specific meeting processor for Regen Coordination council calls and node meetings. Follows the base meeting-processor skill with network-specific terminology and conventions.

## Regen Coordination Terminology

Apply consistent terminology (check `SOUL.md` and `IDENTITY.md` for local overrides):

### Names (use exactly)
- Luiz (not Luis)
- _(add council members as they join)_

### Organizations (use exactly)
- "Regen Coordination" (not "RegenCoord" or "RC")
- "ReFi BCN" or "ReFi Barcelona" (not "refi bcn")
- "GreenPill Network" (not "greenpill")
- "ReFi DAO" with space

### Programs (use exactly)
- "Regenerant Catalunya" (not translated)
- "Local ReFi Toolkit" (capitalized)
- "Knowledge Commons" (capitalized when referring to the commons concept)

### Technical Terms
- "DePIN" (not "depin")
- "OpenClaw" (not "openclaw" or "open claw")
- "KOI-net" (not "koi-net" or "KOI Net")
- "EIP-4824" (not "EIP4824" or "eip-4824")
- "Safe" for Gnosis Safe (not "gnosis" alone)

## Council Meeting Format

For weekly council syncs, use this meeting type: `type: council`

Typical structure:
```markdown
---
categories: [Meetings]
projects:
  - "[[260220 Regen Coordination]]"
date: YYYY-MM-DD
attendees: [names]
type: council
---
# Regen Coordination Council Sync — YYYY-MM-DD

## Key Decisions
...

## Action Items
...
```

## For Full Instructions

See base skill in `organizational-os-template/skills/meeting-processor/SKILL.md` for complete workflow.
