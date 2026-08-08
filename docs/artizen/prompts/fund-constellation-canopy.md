# Artifact prompt — "Constellation Canopy" (FUND, direction D)

Fourth direction — a second, more constellation-forward take alongside
[`fund-constellation-of-groves`](fund-constellation-of-groves.md).

**How this differs from direction A.** In A the clusters float over a fully-rendered valley; the
landscape carries roughly half the frame and the network reads as something *above* it. Here the
network **is** the subject: it fills the sky as a single wide canopy woven from many
sub-constellations, and the land drops to a low silhouette along the bottom edge. A is a valley
with constellations in it. D is a sky with a valley under it.

That change is worth testing because RC's mark is the orb — *"connected white nodes (8–9) with
edges, on the brand sky-to-sun gradient circle"* (`DESIGN.md` §1.1). A sky-dominant composition
puts the nodes on the gradient, which is the mark's own construction, rather than beside it.

**Risk this direction runs, stated up front:** pushing the land to silhouette removes the greens
that anchored A at ~50% brand hue. If the sky doesn't carry the full ramp, the frame can go flat
and cool. The prompt therefore specifies the full five-stop gradient across a tall sky, and the
gate to watch is brand-hue share, not drift.

> No count hard-coded — "many sub-clusters," never eight. The curated list is provisional per the
> action plan §5.

```bash
npm run artifact -- -p docs/artizen/prompts/fund-constellation-canopy.md \
  --ref docs/artizen/reference/rc-2026-04-10-CHOSEN-network-over-valley.png \
  --model flash --size 1K --n 3
```

---

Create a new image in exactly the visual style of the reference image: a flat, modern editorial
vector illustration with clean shapes, soft luminous glows, a fine film-grain texture over the
whole image, and a warm graduated sky.

The composition is **sky-dominant**: the horizon sits low, in the bottom fifth of the frame. Below
it, a simple silhouette of rolling forested hills in deep layered greens, with a thin ribbon of
pale river catching the light — quiet, low-contrast, clearly secondary.

The sky fills the rest and carries the full gradient: a cool slate-blue (#aab8c1) at the very top,
easing down through a pale warm sand (#d4c8b8), into a soft yellow-green (#e3dd91), then a warm
sand-orange (#e0b789), and finally a deeper amber-gold (#d69f44) glowing just above the horizon
where the sun is rising.

Spanning the whole sky: **a single wide canopy of glowing white points connected by fine white
lines**, arching gently from the left edge to the right like a vault. The canopy is not uniform —
it is visibly woven from **many smaller sub-constellations**, each a denser knot of nodes with its
own character, joined to its neighbours by longer, fainter connecting lines. Some knots are large
and bright, some small and faint. The weave is denser toward the top of the arch and opens out,
sparser and looser, toward both edges of the frame.

The nodes vary in size and brightness, the largest sitting at the centres of the sub-constellations.
Fine scattered points of light drift in the gaps between knots. The whole structure is
semi-transparent, so the gradient reads clearly through it, and it glows warmest where it passes
low over the rising sun.

The canopy casts no shadow and touches nothing. It should feel like a sky that has organised
itself, not a diagram laid over one.

Mood: expansive, plural, luminous, held. Many gatherings under one sky.

Absolutely no text, no letters, no numbers, no logos, no watermarks, no buildings, no vehicles,
no human figures, no constellation figures or zodiac shapes.

Square composition, high detail, smooth gradients, fine grain texture.
