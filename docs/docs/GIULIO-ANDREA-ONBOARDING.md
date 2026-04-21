# Giulio + Andrea Onboarding Brief
## ReFi BCN OS & Miceli Workshop Context

**For:** Giulio (coordination) + Andrea (documentation)  
**Date:** Tuesday, March 17, 2026  
**Context:** You're joining the Miceli Safe Workshop team Wed 11 AM; this brief brings you up to speed

---

## WHAT'S HAPPENING WEDNESDAY

**Miceli Safe Workshop** — 90-minute online session to deploy Safe multisig for democratic treasury management

**Your roles:**
- **Giulio:** Technical support (help signers if wallet issues, be ready with backup device)
- **Andrea:** Documentation (capture screenshots, transaction hashes, decisions, evidence for runbook v1)

**Timeline:**
- 10:50 AM: Arrive/tech check
- 11:00 AM: Start workshop
- 11:05–11:25: Play video (NotebookLM-generated, 20 min)
- 11:25–11:55: Live Safe deployment (Oriol creates Safe, all signers verify access)
- 11:55–12:20: Fund transfer + test transaction (ReFi BCN → Miceli, all signers approve + execute)
- 12:20–12:30: Governance briefing (lock operating rules)
- 12:30: Done + handoff

---

## CONTEXT IN 60 SECONDS

### The Problem
- Miceli is a rural regenerative network (6 projects)
- They need to manage shared treasury funds democratically
- Traditional banking = centralized, opaque, expensive, extractive
- Web3 + multisig = distributed, transparent, fast, community-controlled

### The Solution
- **Safe:** Open-source multisig wallet (app.safe.global)
- **Multisig:** 5 signers required, 3 needed to approve any transaction
- **Benefits:** No single point of failure, everyone sees everything, decisions are collective
- **Wednesday:** Deploy it + do a test transaction so Miceli can operate independently

### Why This Matters
- Miceli gets infrastructure to govern €30k+ in Phase 2 funds collectively
- Real case study for Regenerant Catalunya + ReFi DAO
- Proof that Web3 + democracy works in practice
- Foundation for future network governance (La Fundición, others)

---

## YOUR ROLES (DETAILED)

### GIULIO: Technical Support

**Before workshop (Tue):**
- [ ] Charge laptop + phone
- [ ] Test Zoom/meeting link
- [ ] Have app.safe.global open in browser (test it works)
- [ ] Know where MetaMask is installed (backup if Rabby fails)
- [ ] Have block explorer link ready: https://celoscan.io

**During workshop:**
- **11:00–11:25:** Monitor the video playing (make sure it plays smoothly)
- **11:25–11:55:** Be ready to help if a signer's wallet won't connect
  - First: Refresh browser, check MetaMask extension enabled
  - Second: Try different browser (Chrome vs Firefox)
  - Third: Note the issue, continue without them (we can add later)
- **11:55–12:20:** Watch the transfer flow, verify it executes on blockchain
- **General:** If something breaks, ask Luiz — don't panic, we have contingencies

**Key mindset:** You're a safety net. Probably won't be needed, but you're there if things go wrong.

---

### ANDREA: Documentation

**Before workshop (Tue):**
- [ ] Have phone ready for photos (with storage space)
- [ ] Have screenshot tool ready (Mac: Cmd+Shift+4, Windows: Win+Shift+S)
- [ ] Prepare a simple spreadsheet or doc with headers:
  - Date/Time
  - Action (created Safe / added signer / executed transaction)
  - Screenshot link / transaction hash
  - Notes
- [ ] Get consent forms if you're photographing people (optional but good)

**During workshop (CRITICAL):**
- **11:25–11:55:** Screenshot each step of Safe creation
  - Safe created
  - Signers added
  - Threshold set
  - Each signer verifies they can see it
  - Take group photo (all 5 signers + Luiz visible)

- **11:55–12:20:** Capture the test transaction
  - Transaction proposed (screenshot)
  - Signatures flowing in (screenshot at 1 sig, 2 sigs, 3 sigs)
  - Transaction executed (screenshot)
  - **Get the transaction hash** from block explorer
  - Screenshot the confirmation on celoscan.io

- **12:20–12:30:** Document governance decisions
  - Write down what Miceli decided for:
    - Who can propose
    - Approval SLA (24h / 48h?)
    - Required info per transaction
    - Emergency protocol
  - Get a photo or name the person who explained each rule

**Output you're creating:**
- Photo evidence (5–10 good shots)
- Screenshots (10–15)
- Transaction hashes (3–5)
- Governance decisions (documented)

**This becomes:** "Runbook v1" + case study + proof it worked

**Key mindset:** You're building the institutional memory. Future networks will use what you document. Quality matters.

---

## CONTEXT: HOW WE GOT HERE

### Materials Prepared

**Video (plays Wed 11:05):**
- 20-minute NotebookLM-generated video
- Spanish + Catalan versions available
- Topic: Safe multisig for democratic treasury management
- Source: Bread Cooperative PDF (real cooperative practices)
- Why: Explains the "what" + "why" before we do the "how"

**Pre-workshop:**
- Miceli signers confirmed ready (wallets installed, CELO funded, recovery phrases backed up)
- Safe configuration locked (5 signers, 3 threshold or 2 of 3)
- ReFi BCN Safe ready to propose transfer to Miceli

**Post-workshop:**
- D+1: Share Safe address + operating guide with Miceli
- D+7: Retrospective call, finalize runbook v1.1
- Later: Case study published, used for future networks

---

## CONTINGENCY: IF X HAPPENS

### "A signer's wallet won't connect"
**Action:** Troubleshoot 5 min max, then skip them, continue with 4 signers (adjust threshold)
**Andrea:** Note what failed, take screenshot for debug

### "Video fails to play"
**Action:** Luiz narrates the concepts live using slides (less ideal, but works)
**Andrea:** Document this as "video playback issue" for later

### "Safe creation fails"
**Action:** Try Gnosis Chain instead of Celo (different blockchain, same Safe)
**Giulio:** Verify block explorer works for whichever chain we use

### "Transaction won't execute"
**Action:** Wait 2 min (blockchain can be slow), then try again
**Andrea:** Document exact error message, timestamp

### "Someone has to leave early"
**Action:** Proceed with fewer signers (adjust threshold to 2 of 3 if needed)
**All:** Flexibility > perfection

---

## DAY-OF CHECKLIST (WEDNESDAY)

### Arrive 10:50 AM

**Luiz brings:**
- [ ] Laptop with videos (both ES-ES + CAT)
- [ ] Safe Implementation Plan (printed)
- [ ] Governance template (printed)
- [ ] Signer addresses list

**Giulio brings:**
- [ ] Laptop (fully charged)
- [ ] Phone (fully charged)
- [ ] Charger/power bank
- [ ] Browser bookmarks ready (app.safe.global, celoscan.io)

**Andrea brings:**
- [ ] Phone (fully charged + storage space)
- [ ] Notebook + pen
- [ ] Screenshot tool tested
- [ ] Spreadsheet template ready

### 10:50–11:00: Tech Check

- [ ] Zoom/meeting link working?
- [ ] All participants present (or known if remote)?
- [ ] Video loads + plays audio clear?
- [ ] Luiz can access ReFi BCN Safe?
- [ ] Everyone can see Safe app (app.safe.global)?

### 11:00: Go

- Luiz: Welcome + context
- Play video
- Deployment begins

### 12:30: Wrap

- Luiz: Next steps + follow-up call schedule
- Andrea: Photos + screenshots handed to Luiz
- Giulio: Tech teardown
- Luiz: Send Safe address + docs to Miceli

---

## SUCCESS LOOKS LIKE

**By end of workshop:**
- ✅ Safe deployed with 5 signers (or 4, or 3 — whatever was ready)
- ✅ All signers can access it (verified)
- ✅ Test transaction executed + on blockchain
- ✅ Governance rules documented (even draft version)
- ✅ Evidence captured (photos + screenshots + transaction hash)
- ✅ Team knows next steps (D+7 call, first real transaction, etc.)

**Quality bar:** Not perfect, but functional. Miceli can operate independently after this.

---

## MICELI CONTEXT (WHO YOU'RE WORKING WITH)

**Network:** Miceli Social  
**Location:** Rural Catalunya (Osona, Ripollès, Alt Empordà)  
**Focus:** Ecological restoration + regenerative agriculture  
**Leadership:** Oriol (tech-forward, comfortable with Web3)  
**Culture:** Experimental, open to trying new things, fast decisions  
**Size:** ~5 signers, 6 projects  
**Language:** Spanish (primary), Catalan (local), English (Oriol fluent)

**They're not:**
- ❌ Crypto enthusiasts (they care about treasury, not Web3 hype)
- ❌ Technophobes (they're genuinely interested in how it works)
- ❌ Passive learners (they'll ask questions, propose improvements)

**They are:**
- ✅ Mission-driven (regenerative — they care about outcomes)
- ✅ Collaborative (they work as a network)
- ✅ Practical (they want something that works, not theory)

**Your approach:**
- Be warm + direct
- Answer their questions
- Show them you care about their success (not just tech deployment)
- Respect that they're learning too

---

## FILES TO KNOW ABOUT

**In the repo:**
- `Safe Implementation Plan` — Strategic framework
- `Network-Specific Adaptations` — How to work with different network cultures
- `Bread Cooperative Guide` — Real practices (reference)
- `NotebookLM Video Scripts` — What the video covers

**Reference links:**
- Safe: https://app.safe.global
- Block explorer: https://celoscan.io
- Bread Coop guide: `/docs/260223 Bread Cooperative Guide...ES.md`

---

## QUESTIONS FOR LUIZ BEFORE WEDNESDAY

**Ask Tuesday during ops sync:**
- What if X happens? (any new scenarios)
- Who's the emergency contact if I can't reach Luiz?
- Should we have a backup time slot if tech fails badly?
- Are there backup signers if someone doesn't show?

**Ask anytime:**
- "I'm not sure what to do..." → Ask Luiz
- "Can I take this photo?" → Ask Luiz
- "Should I write this down?" → YES, always

---

## AFTER WEDNESDAY

**D+1 (Thu):** Luiz sends Safe address + runbook template to Miceli

**D+7:** Retrospective call (30 min)
- What went well?
- What was confusing?
- How do we make the runbook better?
- Miceli tries first real transaction, we help

**Later:** Case study published, future networks learn from this

---

## FINAL NOTE

You're not "support staff" — you're co-creators of institutional knowledge. What you document, what you notice, what you ask questions about — all of it becomes part of how ReFi BCN operates.

Giulio: Your technical readiness prevents disasters.  
Andrea: Your documentation enables the future.

Both matter equally.

---

**Prepared by:** ReFi BCN agent  
**For:** Giulio + Andrea  
**Date:** Prepared Mon 2026-03-16, for Tue/Wed work  
**Status:** Ready to onboard

---

## QUICK LINKS

| What | Where |
|------|-------|
| Safe app | https://app.safe.global |
| Block explorer | https://celoscan.io |
| Bread guide | `/Regenerant-Catalunya/docs/260223 Bread Cooperative...ES.md` |
| Video scripts | `/Regenerant-Catalunya/docs/phase-2/workshops/safe-setup-miceli/` |
| Safe plan | `/Regenerant-Catalunya/docs/phase-2/tools/safe-implementation-plan.md` |

**Print this page. Share with Giulio + Andrea. Reference during workshop.**
