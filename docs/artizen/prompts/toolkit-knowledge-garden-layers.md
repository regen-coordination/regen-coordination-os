# Artifact prompt — "Knowledge Garden, Layered" (PRIMARY)

For the **Regen Web3 Toolkit** Artizen project.

The Toolkit describes itself as *"a regenerative web3 knowledge garden that doubles as a design
and deployment framework"* — and its architecture is explicitly **10 stacked layers** (Ontology →
Knowledge Commons → Resource Graph → Concept & Idea Ecology → Option Library → Deployment →
Tracks → Implementation & Learning Memory → Evolution, with Infrastructure & Substrate sitting
*under* the whole sequence). Garden above, structured substrate below. That is a cross-section,
not a landscape.

> **Layer count** per [`repos/regen-toolkit/docs/LAYERS.md`](../../../repos/regen-toolkit/docs/LAYERS.md):
> the 2026-05-15 stabilization draft restored Tracks and added Infrastructure & Substrate, taking
> the set from 8 to 10. The rendered prompt below deliberately asks for *"several distinct
> strata"* with **no count** — image models render an exact band count badly, and an artifact
> that hard-codes one would need reissuing at the next architecture iteration.

**Reference the mycelial-soil alternate, not the valley one.** Of the three artifacts generated
for Regen Coordination on 2026-04-10, `rc-2026-04-10-alt-mycelial-soil.png` was *not* chosen for
RC — but it is the closest visual match to what the Toolkit actually is: growth above ground,
a connected knowledge network below it.

```bash
npm run artifact -- -p docs/artizen/prompts/toolkit-knowledge-garden-layers.md \
  --ref docs/artizen/reference/rc-2026-04-10-alt-mycelial-soil.png \
  --model flash --size 1K --n 4
```

Palette is pulled to Regen Coordination's own **sky-to-sun gradient** (`docs/DESIGN.md` §2):
`--brand-sky #aab8c1` → `--brand-horizon #d4c8b8` → `--brand-pasture #e3dd91` →
`--brand-sun #e0b789` → `--brand-sun-deep #d69f44`.

---

Create a new image in the illustration style of the reference image: a rich, luminous
cross-section view, painterly and detailed, with a fine grain texture over the whole image.

The scene is a cross-section of living ground, seen from the side. Above the surface line, in the
upper third of the frame: a garden of young plants and seedlings in fresh greens, growing at
varied heights, some just sprouting, some with broad open leaves — vigorous, tended, alive. The
sky behind them is a soft warm gradient, pale cool slate-blue (#aab8c1) at the top blending down
through a pale warm sand (#d4c8b8) into a soft yellow-green (#e3dd91) near the horizon line.

Below the surface, filling the lower two thirds: the earth shown as **several distinct horizontal
strata** — layers of soil in warm sand-orange (#e0b789) and deeper amber-gold (#d69f44) toward
the top, cooling into deeper, darker tones at the bottom of the frame. The layers are clearly
readable as separate bands, but organic and irregular, not ruled lines.

Threading through all of the strata: a glowing network of fine pale filaments, branching and
interconnecting like mycelium, with small luminous nodes where filaments meet. The network is
denser near the surface and spreads wider and sparser toward the bottom, and it **crosses every
layer** — binding the strata into one connected system. Some filaments rise up through the
surface line to meet the roots of the plants above.

The whole image glows softly from within, warmest just below the surface.

Mood: fertile, structured, patient, alive. Something being cultivated rather than constructed.

Absolutely no text, no letters, no numbers, no logos, no watermarks, no diagrams or labels, no
human figures, no tools or machinery.

Square composition, high detail, smooth gradients, fine grain texture.
