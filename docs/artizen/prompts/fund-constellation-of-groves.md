# Artifact prompt — "Constellation of Groves" (FUND, direction A)

Prototype for the **Regen Coordination Fund** entry (formerly the Collective Governance Fund).

The Fund is the one August-drive entity without an artifact: the RC *project* shipped
`rc-2026-04-10-CHOSEN-network-over-valley.png` in April, the Toolkit's is committed at
[`toolkit-knowledge-garden-layers-CHOSEN-2026-08-05.png`](toolkit-knowledge-garden-layers-CHOSEN-2026-08-05.png),
and ReFi DAO's candidates were generated in `refi-dao-os`.

**The idea.** A fund is not one project — it is *several distinct projects held in one field*
(Afo's initial curated list runs to eight: ReFi DAO · Greenpill Network · Bread Coop · Bloom
Network · Regen Commons · Grassroot Economics · Regen Coordination · Regen Toolkit). RC's shipped
artifact is a single lattice, which reads as one thing. This direction breaks that lattice into
**separate glowing clusters**, each whole on its own, sharing one sky and one connecting ground
line.

> **No count in the rendered prompt.** The curated list is explicitly provisional — "subject to Q3
> dilution check" per the action plan §5 — so the prompt asks for *"several"* clusters, never
> eight. Same discipline as the Toolkit prompts: an artifact that hard-codes a membership number
> expires the moment curation changes.

Reference is RC's shipped artifact, so the Fund reads as family to the RC project entry.
Palette per [`docs/DESIGN.md`](../../DESIGN.md) §2.1: `--brand-sky #aab8c1` → `--brand-horizon
#d4c8b8` → `--brand-pasture #e3dd91` → `--brand-sun #e0b789` → `--brand-sun-deep #d69f44`.

```bash
npm run artifact -- -p docs/artizen/prompts/fund-constellation-of-groves.md \
  --ref docs/artizen/reference/rc-2026-04-10-CHOSEN-network-over-valley.png \
  --model flash --size 1K --n 3
```

---

Create a new image in exactly the visual style of the reference image: a flat, modern editorial
vector illustration with clean shapes, soft luminous glows, a fine film-grain texture over the
whole image, and a warm graduated sky.

The scene: a wide, serene landscape at dawn seen from a high vantage point. Rolling hills in
layered greens receding into soft atmospheric haze, with a broad open valley floor and scattered
groves of trees. The horizon sits low in the frame. The sky graduates from a cool slate-blue
(#aab8c1) at the top, through a pale warm sand (#d4c8b8), into a soft yellow-green (#e3dd91) and
then a warm sand-orange (#e0b789) near the horizon where the sun is rising.

Suspended in the sky above the landscape: **several separate clusters of glowing white points
connected by fine white lines** — not one single mesh, but distinct constellations of varying size
and density, spaced apart across the width of the frame, each one clearly its own complete little
network. Some clusters are larger and denser, some small and sparse. They sit at slightly
different heights.

Running beneath them, close to the horizon, a single long horizontal band of fainter light with
fine vertical threads rising from it to touch the base of every cluster — so the separate
constellations read as **held together by one shared foundation**. The band glows warmest at the
centre, near the rising sun.

The clusters are semi-transparent so the sky reads through them. They cast no shadow. It should
feel like a gathering the landscape supports, not a technological overlay imposed on it.

Mood: plural, generous, calm, spacious. Many things held well.

Absolutely no text, no letters, no numbers, no logos, no watermarks, no buildings, no vehicles,
no human figures.

Square composition, high detail, smooth gradients, fine grain texture.
