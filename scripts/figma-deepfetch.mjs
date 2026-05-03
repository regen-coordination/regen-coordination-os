#!/usr/bin/env node
// Deep-fetch specific Figma node IDs and extract colors/fonts.
// Usage: node scripts/figma-deepfetch.mjs <id> [<id> ...]

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

function loadEnv() {
  const raw = readFileSync(resolve(repoRoot, ".env"), "utf8");
  const env = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

const env = loadEnv();
const ids = process.argv.slice(2);
if (!ids.length) {
  console.error("Pass node IDs");
  process.exit(1);
}

const headers = { "X-Figma-Token": env.FIGMA_TOKEN };

function rgbToHex({ r, g, b }) {
  return "#" + [r, g, b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("");
}

(async () => {
  const url = `https://api.figma.com/v1/files/${env.FIGMA_FILE_KEY}/nodes?ids=${ids.join(",")}`;
  console.log("→", url);
  const res = await fetch(url, { headers });
  const body = await res.json();
  if (!res.ok) {
    console.error("Failed:", body);
    process.exit(1);
  }

  const colors = new Map();
  const gradients = [];
  const fonts = new Map();
  const textSamples = [];

  function walk(n) {
    if (!n) return;
    if (n.fills) {
      for (const f of n.fills) {
        if (f.visible === false) continue;
        if (f.type === "SOLID" && f.color) {
          const hex = rgbToHex(f.color);
          const a = f.opacity ?? f.color.a ?? 1;
          const key = a < 1 ? `${hex}@${a.toFixed(2)}` : hex;
          colors.set(key, (colors.get(key) || 0) + 1);
        } else if (f.type?.startsWith("GRADIENT") && f.gradientStops) {
          gradients.push({
            type: f.type,
            stops: f.gradientStops.map((s) => ({ pos: s.position, color: rgbToHex(s.color) })),
          });
        }
      }
    }
    if (n.strokes) {
      for (const s of n.strokes) {
        if (s.type === "SOLID" && s.color) {
          const hex = rgbToHex(s.color);
          colors.set(hex + "·stroke", (colors.get(hex + "·stroke") || 0) + 1);
        }
      }
    }
    if (n.style?.fontFamily) {
      const k = `${n.style.fontFamily} ${n.style.fontWeight || ""} ${n.style.fontSize || ""}`.trim();
      fonts.set(k, (fonts.get(k) || 0) + 1);
    }
    if (n.characters && textSamples.length < 30) {
      textSamples.push({
        text: n.characters.slice(0, 100),
        font: n.style?.fontFamily,
        size: n.style?.fontSize,
        weight: n.style?.fontWeight,
      });
    }
    (n.children || []).forEach(walk);
  }

  for (const id of ids) {
    const node = body.nodes?.[id]?.document;
    if (!node) {
      console.warn(`No data for ${id}`);
      continue;
    }
    walk(node);
  }

  // Dedupe gradients by stop signature
  const gradSig = new Set();
  const uniqueGradients = gradients.filter((g) => {
    const k = g.type + ":" + g.stops.map((s) => s.color).join(",");
    if (gradSig.has(k)) return false;
    gradSig.add(k);
    return true;
  });

  const out = {
    fetchedAt: new Date().toISOString(),
    nodeIds: ids,
    colors: [...colors.entries()].sort((a, b) => b[1] - a[1]).map(([c, n]) => ({ color: c, count: n })),
    gradients: uniqueGradients.slice(0, 30),
    fonts: [...fonts.entries()].sort((a, b) => b[1] - a[1]).map(([f, n]) => ({ font: f, count: n })),
    textSamples,
  };

  const outFile = resolve(repoRoot, "docs/design-source/figma-deep.json");
  writeFileSync(outFile, JSON.stringify(out, null, 2));

  console.log(`\n✓ ${outFile}`);
  console.log(`\nTop colors:`);
  out.colors.slice(0, 25).forEach((c) => console.log(`  ${c.color.padEnd(20)} × ${c.count}`));
  console.log(`\nGradients (${out.gradients.length} unique):`);
  out.gradients.slice(0, 10).forEach((g) => console.log(`  ${g.type}: ${g.stops.map((s) => s.color).join(" → ")}`));
  console.log(`\nFonts:`);
  out.fonts.forEach((f) => console.log(`  ${f.font.padEnd(40)} × ${f.count}`));
  console.log(`\nText samples (first 5):`);
  out.textSamples.slice(0, 5).forEach((t) => console.log(`  "${t.text}" (${t.font} ${t.size}/${t.weight})`));
})();
