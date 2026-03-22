# Synthesis Hackathon — Coop Registration Update

**Project:** Coop (Browser-Native Knowledge Commons)  
**Team:** Regen Coordination (Afo, Luiz, + contributors)  
**Date:** March 22, 2026  
**Repo:** https://github.com/regen-coordination/coop

---

## Executive Summary

Coop has evolved from an MVP prototype into a production-ready browser-native knowledge commons with a 16-skill local AI agent, peer-to-peer sync, on-chain coordination via Safe multisigs, and permanent Filecoin archiving. This registration synthesizes 2 weeks of intensive development across 5 major commit phases.

---

## Key Developments (From Afo's Latest Commits)

### 1. Extension Redesign — Optimistic UI & Theme System
**Commit:** `962211a` - feat(extension): redesign popup with optimistic UI, home aggregation, and theme system

**What's New:**
- Completely redesigned popup with optimistic UI patterns
- Home aggregation dashboard showing coop overview
- Full theme system with customizable colors
- Persistent popup state across sessions
- Navigation hooks and overlay focus management
- Comprehensive test coverage (PopupApp.test.tsx)

**Impact:** Extension now feels like a polished product, not a prototype.

---

### 2. Sidepanel Restructure — Dashboard Context & Background Handlers
**Commit:** `7968ceb` - refactor(extension): restructure sidepanel tabs, dashboard context, and background handlers

**What's New:**
- Restructured tab system with cleaner separation of concerns
- Dashboard context for shared state management
- Modular background handlers (actions, capture, coop, heartbeat, receiver, review)
- Archive setup wizard for Storacha/Filecoin configuration
- Coop switcher for multi-coop management
- Onboarding overlay for new users
- Operator console for anchor node management

**Impact:** Architecture supports complex multi-coop workflows and trusted node operations.

---

### 3. Shared Module — Design Tokens & Member Accounts
**Commit:** `5b2c4e3` - feat(shared): update member accounts, safe owners, icon state, capture exclusions, and design tokens

**What's New:**
- Centralized design tokens (colors, typography, spacing)
- Member account management with Safe owner integration
- Dynamic icon states (idle, watching, review-needed, error-offline)
- Capture exclusion patterns for privacy
- Comprehensive test coverage for all shared modules

**Impact:** Consistent UI/UX across extension, PWA, and future surfaces.

---

### 4. Media Infrastructure — Compression, Blob Store, Peer Sync, Transcription
**Commit:** `7ce6015` - feat(shared,extension,app): add media compression, blob store, peer sync, transcription, and Yjs per-artifact migration

**What's New (4-Phase Implementation):**

**Phase 1 — Compression + Blob Store:**
- Image compression to WebP (OffscreenCanvas + HTMLCanvasElement fallback)
- Encrypted blob store (AES-GCM) with LRU pruning
- Dexie v15 migration with coopBlobs table
- Screenshot/photo capture with automatic compression

**Phase 2 — Attachment Schema + Peer Sync:**
- Attachment schema for artifacts and drafts
- Blob sync protocol (64KB chunked transfer via WebRTC)
- Three-tier resolver: local Dexie → peer WebRTC → IPFS gateway

**Phase 3 — Audio Transcription:**
- Local Whisper via @huggingface/transformers (MV3-CSP safe)
- Fire-and-forget transcription after audio capture
- Transcript-enriched draft seeds with category/tag inference
- Eager/lazy sync policies

**Phase 4 — Durable Archive + Yjs Evolution:**
- Archive bundles with blob manifest
- Storacha uploads with per-blob CIDs
- Yjs per-artifact Y.Map with dual-write backward compatibility
- Horizon compaction (200 count / 90 days)

**Impact:** Full media pipeline from capture → compression → sync → transcription → archive.

---

### 5. Agent Infrastructure — Eval Harness, Memory, Quality Detection
**Commit:** `153b555` - feat(shared,extension): add agent eval harness, decision-context memory, and quality-based stall detection

**What's New (5-Phase Implementation):**

**Phase 1:** Full eval fixture coverage for all 16 skills + CI pipeline
**Phase 2:** Semantic assertion types (string-min-length, number-range, regex-match, semantic-word-count) with weighted quality scoring
**Phase 3:** Decision-context memory capturing WHY decisions were made
**Phase 4:** Post-execution confidence recalculation via computeOutputConfidence
**Phase 5:** Quality-based stall detection with rolling quality window and trend computation

**Impact:** Agent can now self-evaluate, remember decision rationale, and stall when quality degrades.

---

### 6. Dependency Cleanup & Testing Infrastructure
**Commit:** `a5ea19a` - chore: remove unused deps, migrate stealth to ox, swap jsdom for happy-dom

**What's New:**
- Removed @noble/secp256k1 (migrated to ox/Secp256k1.noble)
- Removed clsx (replaced with template literals)
- Removed concurrently (using spawn in dev.ts)
- Swapped jsdom for happy-dom (90% smaller, faster startup)
- Fixed all test assertions for new defaults

**Impact:** Cleaner dependency tree, faster tests, smaller bundle.

---

### 7. Feature Restoration — ManageTab Complete
**Commit:** `0bb824c` - fix(extension): restore missing ManageTab features from NestTab and NestToolsTab

**What's New:**
- Complete create coop form (space type, capture mode, summary, seed contribution, lens grid, Green Goods garden checkbox, Storacha archive)
- Green Goods member impact reports and work submission forms
- Settings: passkey display, agent cadence, sound toggle/test, round-up button
- Preferences: notifications toggle, export method selector

**Impact:** All previously missing features now fully implemented and wired.

---

## Architecture Overview (Post-Update)

```
┌─────────────────────────────────────────────────────────────────┐
│                        COOP ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐    │
│  │  EXTENSION  │    │     APP     │    │      API        │    │
│  │  (MV3)      │    │    (PWA)    │    │   (Hono/Bun)    │    │
│  ├─────────────┤    ├─────────────┤    ├─────────────────┤    │
│  │ • Popup     │    │ • Landing   │    │ • Signaling     │    │
│  │ • Sidepanel │    │ • Pair      │    │ • Yjs Sync      │    │
│  │ • Background│◄──►│ • Receiver  │◄──►│ • Health        │    │
│  │ • Offscreen│    │ • Inbox     │    │                 │    │
│  └──────┬──────┘    └──────┬──────┘    └─────────────────┘    │
│         │                  │                                    │
│         └──────────────────┘                                    │
│                   │                                             │
│         ┌─────────▼──────────┐                                 │
│         │      SHARED        │                                 │
│         │    (@coop/shared)  │                                 │
│         ├────────────────────┤                                 │
│         │ • 16+ Modules      │                                 │
│         │ • Agent Runtime    │                                 │
│         │ • Storage (Dexie)  │                                 │
│         │ • Sync (Yjs)       │                                 │
│         │ • Archive (Storacha│                                 │
│         │ • Privacy (ZK)     │                                 │
│         │ • Onchain (Safe)   │                                 │
│         └────────────────────┘                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 16-Skill Agent Pipeline

| Skill | Purpose | Status |
|-------|---------|--------|
| tab-router | Route captures to correct processing lane | ✅ |
| opportunity-extractor | Identify funding opportunities | ✅ |
| grant-fit-scorer | Score opportunities against criteria | ✅ |
| theme-clusterer | Group related captures | ✅ |
| ecosystem-entity-extractor | Extract orgs/people/funds | ✅ |
| capital-formation-brief | Draft funding briefs | ✅ |
| publish-readiness-check | Validate before publish | ✅ |
| review-digest | Weekly summary generation | ✅ |
| memory-insight-synthesizer | Cross-session insights | ✅ |
| erc8004-register | Register on-chain agent | ✅ |
| erc8004-feedback | Submit agent feedback | ✅ |
| green-goods-garden-bootstrap | Create on-chain garden | ✅ |
| green-goods-garden-sync | Sync garden state | ✅ |
| green-goods-assessment | Impact assessment | ✅ |
| green-goods-work-approval | Approve work for payment | ✅ |
| green-goods-gap-admin-sync | Sync GAP admin state | ✅ |

---

## Technical Specifications

### Local-First Stack
- **Storage:** Dexie (IndexedDB wrapper)
- **Sync:** Yjs CRDTs + y-webrtc
- **State:** Zustand (lightweight stores)
- **Compression:** WebP (images), native APIs (audio)

### AI/Inference
- **Pipeline:** 16 skills with quality scoring
- **Execution:** WebGPU → WASM → Heuristics (three-tier cascade)
- **Transcription:** Whisper via @huggingface/transformers
- **Memory:** Decision-context persistence with confidence recalculation

### On-Chain
- **Identity:** WebAuthn passkeys → Safe smart accounts (ERC-4337)
- **Contracts:** CoopRegistry.sol (Foundry)
- **Privacy:** Semaphore ZK proofs + ERC-5564 stealth addresses
- **Agent Registry:** ERC-8004 compliant

### Archiving
- **Cold Storage:** Storacha → Filecoin
- **Encryption:** AES-GCM for blobs
- **Provenance:** CID chains with receipts

### Testing
- **Unit:** Vitest (happy-dom)
- **E2E:** Playwright
- **Contract:** Forge
- **Coverage:** Comprehensive (100+ test files)

---

## Demo Flow (Updated)

### Person A: Extension Operator
1. Open sidepanel, check Settings → Nest Runtime
2. Create coop with preset (friends/family/personal/project/community)
3. Enable Green Goods garden if needed
4. Generate receiver pairing in Coops tab
5. Watch Feed tab for incoming sync
6. Run Manual round-up, review Roost, publish
7. Use Operator Console for session key management

### Person B: Receiver
1. Open `/pair` on PWA (local or production)
2. Accept pairing payload or QR
3. Capture voice note, photo, or link at `/receiver`
4. Check `/inbox` for queued/synced items

### Closing
1. Person A confirms intake arrival
2. Convert to Roost draft, edit, publish
3. Open board route for visualization
4. Archive coop snapshot
5. Export receipt with CID provenance

---

## Hackathon Categories & Alignment

| Category | Coop Fit | Evidence |
|----------|----------|----------|
| **DeFi / ReFi** | Safe multisig integration, capital formation workflows | Green Goods gardens, work approvals, impact reporting |
| **Privacy / ZK** | Semaphore membership proofs, stealth addresses | Anonymous publish, ERC-5564 integration |
| **Local-First / P2P** | Yjs CRDTs, WebRTC sync, no cloud required | Peer-to-peer coop sync, offline capable |
| **AI / ML** | 16-skill local agent, Whisper transcription, quality scoring | Browser-native inference, eval harness |
| **Developer Tools** | Open source, modular architecture, comprehensive docs | MIT license, monorepo, 100+ test files |
| **Infrastructure** | ERC-8004 agent registry, passkey-to-Safe bridge | On-chain agent identity, reusable patterns |

---

## Achievements Since Last Registration

| Metric | Before | After |
|--------|--------|-------|
| Test Files | ~10 | 100+ |
| Skills | 4 stubs | 16 fully implemented |
| AI Inference | None | WebGPU/WASM + heuristics |
| Transcription | None | Local Whisper |
| Media Pipeline | None | WebP + AES-GCM + WebRTC sync |
| Agent Quality | Hardcoded | Dynamic scoring + stall detection |
| Bundle Size | Unknown | Optimized (removed clsx, jsdom) |
| Documentation | Basic | Comprehensive (30+ docs) |

---

## Links & Resources

- **Repo:** https://github.com/regen-coordination/coop
- **Docs:** https://coop-docs.vercel.app (deployed)
- **Landing:** https://coop-landing.vercel.app
- **Demo Video:** [To be recorded]
- **Team:** 
  - Afo (Afolabi Aiyeloja) — Lead Developer
  - Luiz Fernando — Regen Coordination

---

## Next Steps

1. Record final demo video showing complete flow
2. Deploy production PWA to owned domain
3. Submit to Chrome Web Store (unlisted first)
4. Apply for grants (NLnet NGI Zero — April 1 deadline)

---

*Registration updated March 22, 2026 to reflect Afo's latest developments (commits 0bb824c through 62ad740)*
