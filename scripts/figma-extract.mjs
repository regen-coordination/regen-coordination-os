#!/usr/bin/env node
// Pulls structure, styles, variables, and components from a Figma file
// into docs/design-source/ so we have a stable artifact to design from.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const outDir = resolve(repoRoot, "docs/design-source");

function loadEnv() {
  const envPath = resolve(repoRoot, ".env");
  const raw = readFileSync(envPath, "utf8");
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
if (!TOKEN || !FILE_KEY) {
  console.error("Missing FIGMA_TOKEN or FIGMA_FILE_KEY in .env");
  process.exit(1);
}

const headers = { "X-Figma-Token": TOKEN };

async function get(url) {
  const res = await fetch(url, { headers });
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = { raw: text };
  }
  return { ok: res.ok, status: res.status, body };
}

function summarizeNode(node, depth = 0, maxDepth = 3) {
  const out = {
    id: node.id,
    name: node.name,
    type: node.type,
  };
  if (node.absoluteBoundingBox) {
    const { x, y, width, height } = node.absoluteBoundingBox;
    out.bounds = { x, y, width, height };
  }
  if (node.backgroundColor) out.backgroundColor = node.backgroundColor;
  if (node.fills?.length) out.fills = node.fills;
  if (node.strokes?.length) out.strokes = node.strokes;
  if (node.style) out.textStyle = node.style;
  if (node.characters) out.characters = node.characters.slice(0, 200);
  if (node.children && depth < maxDepth) {
    out.children = node.children.map((c) => summarizeNode(c, depth + 1, maxDepth));
  } else if (node.children) {
    out.childCount = node.children.length;
  }
  return out;
}

(async () => {
  mkdirSync(outDir, { recursive: true });
  const result = { fetchedAt: new Date().toISOString(), fileKey: FILE_KEY };

  // 1. Metadata + page-level structure (depth=2 = pages → top-level frames only)
  console.log("→ Fetching file (depth=2)...");
  const file = await get(`https://api.figma.com/v1/files/${FILE_KEY}?depth=2`);
  if (!file.ok) {
    console.error(`File fetch failed (${file.status}):`, file.body);
    process.exit(1);
  }
  result.fileMeta = {
    name: file.body.name,
    lastModified: file.body.lastModified,
    version: file.body.version,
    role: file.body.role,
    editorType: file.body.editorType,
  };
  result.pages = (file.body.document?.children || []).map((page) => summarizeNode(page, 0, 2));
  result.styleRefs = file.body.styles || {};
  result.componentRefs = file.body.components || {};
  result.componentSetRefs = file.body.componentSets || {};

  // 2. Resolved styles (paint, text, effect, grid)
  console.log("→ Fetching styles...");
  const styles = await get(`https://api.figma.com/v1/files/${FILE_KEY}/styles`);
  result.styles = styles.ok ? styles.body.meta?.styles : { error: styles.body, status: styles.status };

  // 3. Components
  console.log("→ Fetching components...");
  const components = await get(`https://api.figma.com/v1/files/${FILE_KEY}/components`);
  result.components = components.ok
    ? components.body.meta?.components
    : { error: components.body, status: components.status };

  // 4. Variables (Enterprise plan only — handle 403 gracefully)
  console.log("→ Fetching variables (may require Enterprise)...");
  const variables = await get(`https://api.figma.com/v1/files/${FILE_KEY}/variables/local`);
  result.variables = variables.ok
    ? variables.body.meta
    : { unavailable: true, status: variables.status, hint: variables.status === 403 ? "Variables endpoint requires Figma Enterprise plan; will derive tokens from styles + frames instead." : variables.body };

  // Write artifact
  const outFile = resolve(outDir, "figma-extract.json");
  writeFileSync(outFile, JSON.stringify(result, null, 2));

  // Summary
  const pageCount = result.pages.length;
  const styleCount = Object.keys(result.styles || {}).length || (Array.isArray(result.styles) ? result.styles.length : 0);
  const componentCount = Array.isArray(result.components) ? result.components.length : Object.keys(result.components || {}).length;
  const topFrameCount = result.pages.reduce((n, p) => n + (p.children?.length || 0), 0);

  console.log("");
  console.log("✓ Extract written:", outFile);
  console.log(`  File: "${result.fileMeta.name}" (last modified ${result.fileMeta.lastModified})`);
  console.log(`  Pages: ${pageCount}`);
  console.log(`  Top-level frames: ${topFrameCount}`);
  console.log(`  Published styles: ${styleCount}`);
  console.log(`  Published components: ${componentCount}`);
  console.log(`  Variables: ${result.variables.unavailable ? `unavailable (${result.variables.status})` : "loaded"}`);
})();
