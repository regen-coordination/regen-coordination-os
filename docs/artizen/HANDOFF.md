---
categories: [Funding, Artizen, Handoff, Toolkit]
projects:
  - "[[regen-web3-toolkit]]"
date: 2026-08-05
status: "[ACTIVE] Artizen drive closes Thu 2026-08-06"
source_instance: refi-dao-os
---

# Handoff — Artizen artifact pipeline → Regen Web3 Toolkit

> Ported from `refi-dao-os`, where this pipeline was built and run on 2026-08-05 for the ReFi DAO
> Artizen entry. **Everything needed is already in this repo.** This document is the brief.

---

## 1. What this is for

The **Regen Web3 Toolkit** needs an Artizen artifact — the `$10` open-edition NFT image that
carries a project entry.

Per `docs/260803 Artizen August Drive - Action Plan.md` §5, the Toolkit project is targeted at
**Rather** as owner (`R1a` — confirm as owner; `R2a` — stand up the profile, needing handover from
Matt and Luiz). ⚠️ **`R4` is unresolved**: the 260724 council decision had Luiz's existing entry
converting to the Toolkit, while Matt's 08-01 message has Rather owning it. `M1` (Matt) settles
that. **The artifact does not depend on `M1`** — build it regardless; only the entry creation waits.

---

## 2. What was recovered, and why it matters

All three artifacts generated for Regen Coordination on **2026-04-10** were believed lost. They
were **recovered** from commit `63c3d11c` — the untracked-files tree (`^3`) of a stash created
2026-04-25, the incident date — and are now in [`reference/`](reference/):

| file | what it shows |
|---|---|
| `rc-2026-04-10-CHOSEN-network-over-valley.png` | White node lattice over a dawn-lit forested valley. **The one RC shipped**, embedded at §3 of the submission form. |
| `rc-2026-04-10-alt-geodesic-turbines.png` | Geodesic network sphere over hills and wind turbines. |
| `rc-2026-04-10-alt-mycelial-soil.png` | Cross-section — seedlings above, glowing mycelial network below the soil. |

**No prompt for any of them survives** — no sidecar in the stash tree, no PNG `tEXt` metadata,
no session transcript from that date. The images are the only record, which is why the pipeline
passes them to the model with `--ref` and why every prompt from here lives in
[`prompts/`](prompts/) beside its output.

**The useful discovery:** the alternate RC *didn't* choose — `alt-mycelial-soil` — is the closest
visual match to what the Toolkit actually is. Growth above ground, a connected knowledge network
below it. See §4.

---

## 3. The pipeline (already installed here)

| | |
|---|---|
| `scripts/generate-artifact.mjs` | Direct Gemini image API. Ported verbatim from `refi-dao-os`. |
| `npm run artifact` | Wired into `package.json`. |
| `docs/artizen/prompts/` | Two Toolkit prompts, below. |
| `docs/artizen/reference/` | The three recovered RC artifacts. |
| `docs/artizen/assets/` | Output lands here. |

**Do not use the `nano-banana` MCP.** It is pinned to `gemini-2.5-flash-image-preview`, which
returns **404** (retired alias), and the package is unmaintained since 2025-09-05. That — not
remote access — is why image generation failed in June.

### Auth

Free tier is **`limit: 0` for every image model** as of 2026-08, so this needs a billed key. One
was set up on 2026-08-05 against a dedicated Google Cloud project (`gemini-api-credits-2026-08`,
logged in `refi-dao-os/data/finances.yaml`).

```bash
export GEMINI_API_KEY="<key from AI Studio — the billed project>"
```

⚠️ **Never commit the key.** The script reads `GEMINI_API_KEY` from env, falling back to the
nano-banana block in `~/.claude.json`.

**Verify before a batch:**
```bash
curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" -H "content-type: application/json" \
  -d '{"contents":[{"parts":[{"text":"a red circle"}]}],"generationConfig":{"responseModalities":["IMAGE"]}}' | head -c 200
```
`"inlineData"` → good. `free_tier_requests, limit: 0` → wrong key/project.

### Cost

`flash` (Nano Banana 2) ≈ **$0.067**/1K image · `pro` (Nano Banana Pro) ≈ **$0.134**/2K.
A 7-draft batch plus a Pro master ≈ **$0.60**.

⚠️ **Cost allocation.** The credits were bought by Luiz personally and logged as a ReFi DAO
expense. Toolkit renders are **Regen Coordination** usage — note the count so the expense can be
split on actuals rather than pre-split on a guess.

---

## 4. The two prompts

| | prompt | ref | idea | renders |
|---|---|---|---|---|
| **1** | [`toolkit-knowledge-garden-layers`](prompts/toolkit-knowledge-garden-layers.md) **← PRIMARY** | `alt-mycelial-soil` | Cross-section: garden above, layered strata below, a knowledge network threading through every layer. Matches the Toolkit's **10-layer architecture** (8 → 10 in the 2026-05-15 stabilization draft) and its own self-description — *"a regenerative web3 knowledge garden."* | 4 |
| 2 | [`toolkit-network-over-landscape`](prompts/toolkit-network-over-landscape.md) | `CHOSEN-network-over-valley` | RC's shipped language, network arranged in **readable stacked tiers** rather than one mesh. Makes the Toolkit entry visibly part of the same family as RC's. | 3 |

Both pull the palette to RC's own **sky-to-sun gradient** (`docs/DESIGN.md` §2): `#aab8c1` →
`#d4c8b8` → `#e3dd91` → `#e0b789` → `#d69f44`.

Worth knowing (`DESIGN.md` §1.1): RC's mark is *"connected white nodes (8–9) with edges, on the
brand sky-to-sun gradient circle"* — so the April artifact was on-brand by construction. Staying
in that language is not a shortcut; it's the identity.

```bash
npm run artifact -- -p docs/artizen/prompts/toolkit-knowledge-garden-layers.md \
  --ref docs/artizen/reference/rc-2026-04-10-alt-mycelial-soil.png --model flash --size 1K --n 4

npm run artifact -- -p docs/artizen/prompts/toolkit-network-over-landscape.md \
  --ref docs/artizen/reference/rc-2026-04-10-CHOSEN-network-over-valley.png --model flash --size 1K --n 3
```

---

## 5. Review gates

Discard failures before showing the operator. Learned from the ReFi DAO batch, where **all six
abstract candidates failed the palette gate** while all four style-transferred ones passed:

- **No text.** Image models hallucinate glyphs constantly. Any stray mark → discard.
- **Fine grain present** — carried by the reference and by RC `DESIGN.md`.
- **Smooth, unbanded gradients.**
- **Palette is RC's sky-to-sun**, not generic pastel. The single most common failure: the model
  drifts to soft lilac/peach and loses the brand hues entirely.
- **Prompt 1:** are the strata *readable as distinct layers*, and does the network cross all of
  them? That's the Toolkit's architecture — an undifferentiated blob misses the point.
- **Prompt 2:** are the tiers actually stacked and legible, not one cloud? Same test.

Then master: `--model pro --size 2K --n 2`. Commit the chosen image **beside its prompt** — that
record is exactly what April lacked.

---

## 6. Also needed for the entry (not the artifact)

The artifact is one input. The entry also needs copy, and `refi-dao-os/docs/artizen/refi-dao-project-entry.md`
is the worked template — including a **claims-scrub table** where every number is traced to a
public, linkable source. Four ReFi DAO claims were cut under that discipline (an unresolvable
podcast domain, a gated site, an over-stated council number, an untraceable country count).

RC set that bar in April (`260421` handoff: verified-stats table with Gitcoin governance links).
**Apply it to the Toolkit.** The obvious exposure: article counts. The project doc claims *"254
articles in inventory, 67 drafted and deployed, 5 learning paths"* — verify against
[regen-toolkit-site.vercel.app](https://regen-toolkit-site.vercel.app) before publishing any of it,
since a Vercel preview URL is weak evidence for a funder.

Field limits are carried from RC's April form — **re-verify against the live Artizen form.**

---

## 7. Open, not decided here

1. **Owner** — Rather, pending `R1a` + Matt's `M1` (`R4`).
2. **Fundraising goal** — no costed ask on file for the Toolkit.
3. **Payout destination** — season funds release **~January 2027**, and RC targets wind-down at
   **end of Q3 2026**. Risk `R3`: capital returns roughly three months after the council stops
   existing. A named custodian and written reimbursement terms are a Thursday agenda item (`T5`)
   and should be settled **before** an entry names a recipient.
4. **Boosts are out of scope.** Allocation is `L6`, gated on Afo's threshold numbers, contested
   between the RC Fund and the Green Goods ask. Creating a Toolkit entry commits none of it.
