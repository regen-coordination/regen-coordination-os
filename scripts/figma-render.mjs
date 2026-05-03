#!/usr/bin/env node
// Render selected Figma node IDs as PNGs into docs/design-source/renders/
// Usage: node scripts/figma-render.mjs <id> [<id> ...] [--scale=0.5]

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
const TOKEN = env.FIGMA_TOKEN;
const FILE_KEY = env.FIGMA_FILE_KEY;

const args = process.argv.slice(2);
const ids = args.filter((a) => !a.startsWith("--"));
const scaleArg = args.find((a) => a.startsWith("--scale="));
const scale = scaleArg ? scaleArg.split("=")[1] : "0.5";

if (!ids.length) {
  console.error("Pass node IDs (e.g. 592:139 870:1529)");
  process.exit(1);
}

const outDir = resolve(repoRoot, "docs/design-source/renders");
mkdirSync(outDir, { recursive: true });

const headers = { "X-Figma-Token": TOKEN };

(async () => {
  const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${ids.join(",")}&format=png&scale=${scale}`;
  console.log("→", url);
  const res = await fetch(url, { headers });
  const body = await res.json();
  if (body.err) {
    console.error("Render error:", body);
    process.exit(1);
  }
  for (const [id, imgUrl] of Object.entries(body.images || {})) {
    if (!imgUrl) {
      console.warn(`  ${id}: no URL returned`);
      continue;
    }
    const safeId = id.replace(/[^a-zA-Z0-9]/g, "_");
    const dest = resolve(outDir, `${safeId}.png`);
    const r = await fetch(imgUrl);
    const buf = Buffer.from(await r.arrayBuffer());
    writeFileSync(dest, buf);
    console.log(`  ✓ ${id} → ${dest} (${(buf.length / 1024).toFixed(1)} KB)`);
  }
})();
