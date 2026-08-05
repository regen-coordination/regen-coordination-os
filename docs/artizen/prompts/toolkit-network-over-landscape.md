# Artifact prompt — "Toolkit, Network Over Landscape" (VARIANT)

Second direction for the **Regen Web3 Toolkit** artifact. Continues the visual language of the
artifact Regen Coordination actually shipped — `rc-2026-04-10-CHOSEN-network-over-valley.png` —
so the Toolkit entry reads as visibly part of the same family as the RC project entry.

Worth noting from `docs/DESIGN.md` §1.1: RC's own mark is *"connected white nodes (8–9) with edges,
on the brand sky-to-sun gradient circle."* The April artifact was on-brand by construction — a
node network on a sky-to-sun sky. This prompt keeps that and changes the subject.

**The Toolkit's difference from RC's version.** RC's lattice is one undifferentiated mesh. The
Toolkit is **10 named layers** with a defined flow through them, so this asks for the network to
be organised in *tiers* — readable strata of nodes, stacked, with traffic running between them.
A stack, not a cloud.

> **Layer count** per [`repos/regen-toolkit/docs/LAYERS.md`](../../../repos/regen-toolkit/docs/LAYERS.md):
> 8 → 10 in the 2026-05-15 stabilization draft (Tracks restored, Infrastructure & Substrate
> added). As in the primary prompt, the rendered text asks for *"several clearly readable
> tiers"* with **no count** — deliberately, so the artifact survives the next iteration.

```bash
npm run artifact -- -p docs/artizen/prompts/toolkit-network-over-landscape.md \
  --ref docs/artizen/reference/rc-2026-04-10-CHOSEN-network-over-valley.png \
  --model flash --size 1K --n 3
```

---

Create a new image in exactly the visual style of the reference image: a flat, modern editorial
vector illustration with clean shapes, soft luminous glows, a fine film-grain texture over the
whole image, and a warm graduated sky.

The scene: a wide, serene landscape at dawn seen from a high vantage point. Rolling hills in
layered greens receding into soft atmospheric haze, with cultivated terraces stepping down one
hillside and a river winding through the valley floor. The horizon sits low in the frame. The sky
graduates from a cool slate-blue (#aab8c1) at the top, through a pale warm sand (#d4c8b8), into a
soft yellow-green (#e3dd91) and then a warm sand-orange (#e0b789) near the horizon where the sun
is rising.

Suspended in the sky above the landscape, a large luminous network of glowing white points
connected by fine white lines, semi-transparent so the sky reads through it. Unlike a uniform
mesh, this network is arranged in **several clearly readable horizontal tiers stacked one above
another** — each tier a loose band of nodes, the bands varying in density and width, with fine
vertical lines running between the tiers so they read as one connected system flowing from top to
bottom. The lowest tier sits closest to the land and glows slightly warmer.

The network casts no shadow. It should feel like a structure the landscape supports, not a
technological overlay imposed on it.

Mood: hopeful, calm, spacious, ordered without being rigid.

Absolutely no text, no letters, no numbers, no logos, no watermarks, no buildings, no vehicles,
no human figures.

Square composition, high detail, smooth gradients, fine grain texture.
