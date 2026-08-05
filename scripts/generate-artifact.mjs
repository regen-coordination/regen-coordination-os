#!/usr/bin/env node
/**
 * generate-artifact.mjs — brand-artifact image generation via the Gemini image API.
 *
 * Replaces the `nano-banana` MCP, which is pinned to `gemini-2.5-flash-image-preview`
 * (404 NOT_FOUND since Google retired the preview alias; package unmaintained since
 * 2025-09-05). Prompts live in files so a good result is reproducible next season.
 *
 * Usage:
 *   node scripts/generate-artifact.mjs --prompt-file docs/artizen/prompts/orb-constellation.md
 *   node scripts/generate-artifact.mjs -p prompts/x.md --model pro --size 2K --n 3
 *   node scripts/generate-artifact.mjs -p prompts/x.md --ref docs/artizen/reference/a.png,b.png
 *
 * `--ref` passes one or more images in alongside the prompt, so the model can carry a style
 * across rather than re-derive it from words. Written for the recovered 2026-04-10 Regen
 * Coordination artifacts — the visual language is in those files and nowhere else, since no
 * prompt for them survives.
 *
 * Models (verified available on the configured key, 2026-08-04):
 *   flash      gemini-3.1-flash-image       "Nano Banana 2"    ~$0.067 / 1K image
 *   flash-lite gemini-3.1-flash-lite-image                     ~$0.034 / 1K image
 *   pro        gemini-3-pro-image           "Nano Banana Pro"  ~$0.134 / 1K–2K image
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const MODELS = {
  flash: 'gemini-3.1-flash-image',
  'flash-lite': 'gemini-3.1-flash-lite-image',
  pro: 'gemini-3-pro-image',
};

const REPO_ROOT = path.resolve(import.meta.dirname, '..');

function parseArgs(argv) {
  const opts = { model: 'flash', size: '2K', aspect: '1:1', n: 1, out: 'docs/artizen/assets' };
  const alias = { p: 'prompt-file', m: 'model', o: 'out' };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('-')) continue;
    const key = alias[arg.replace(/^-+/, '')] ?? arg.replace(/^-+/, '');
    opts[key] = argv[++i];
  }
  opts.n = Number(opts.n) || 1;
  return opts;
}

/**
 * The key is only ever set in the nano-banana MCP block of ~/.claude.json on this
 * machine, so fall back to reading it there rather than making the operator export it.
 */
function resolveApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const configPath = path.join(os.homedir(), '.claude.json');
  if (!fs.existsSync(configPath)) return null;
  let found = null;
  const walk = (node) => {
    if (found || !node || typeof node !== 'object') return;
    for (const [key, value] of Object.entries(node)) {
      if (key === 'mcpServers' && value && typeof value === 'object') {
        for (const server of Object.values(value)) {
          const candidate = server?.env?.GEMINI_API_KEY;
          if (candidate) return void (found = candidate);
        }
      } else walk(value);
    }
  };
  walk(JSON.parse(fs.readFileSync(configPath, 'utf8')));
  return found;
}

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };

function loadRefs(spec) {
  if (!spec) return [];
  return spec.split(',').map((entry) => {
    const file = path.resolve(REPO_ROOT, entry.trim());
    const mimeType = MIME[path.extname(file).toLowerCase()];
    if (!mimeType) throw new Error(`unsupported reference image type: ${entry.trim()}`);
    return { inlineData: { mimeType, data: fs.readFileSync(file).toString('base64') } };
  });
}

async function generate({ apiKey, model, prompt, aspect, size, refs }) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        // Reference images go before the text — the model reads them as the thing being
        // described, rather than as an afterthought to an already-complete instruction.
        contents: [{ parts: [...refs, { text: prompt }] }],
        generationConfig: {
          responseModalities: ['IMAGE'],
          imageConfig: { aspectRatio: aspect, imageSize: size },
        },
      }),
    },
  );

  const body = await res.json();
  if (!res.ok) throw new Error(`${res.status} ${body?.error?.message ?? JSON.stringify(body)}`);

  const parts = body.candidates?.[0]?.content?.parts ?? [];
  const image = parts.find((part) => part.inlineData?.data);
  if (!image) {
    const finish = body.candidates?.[0]?.finishReason ?? 'no candidates';
    const text = parts.find((part) => part.text)?.text;
    throw new Error(`no image returned (${finish})${text ? ` — model said: ${text.slice(0, 300)}` : ''}`);
  }
  return Buffer.from(image.inlineData.data, 'base64');
}

const opts = parseArgs(process.argv.slice(2));
const model = MODELS[opts.model] ?? opts.model;

const apiKey = resolveApiKey();
if (!apiKey) {
  console.error('No GEMINI_API_KEY — export it, or configure the nano-banana MCP in ~/.claude.json.');
  process.exit(1);
}

if (!opts['prompt-file']) {
  console.error('Missing --prompt-file <path>');
  process.exit(1);
}
const promptPath = path.resolve(REPO_ROOT, opts['prompt-file']);
// Prompt files are markdown so they read well in the repo; everything after the first
// `---` fence separates commentary from the prompt actually sent.
const raw = fs.readFileSync(promptPath, 'utf8');
const prompt = raw.includes('\n---\n') ? raw.split('\n---\n').slice(1).join('\n---\n').trim() : raw.trim();

const outDir = path.resolve(REPO_ROOT, opts.out);
fs.mkdirSync(outDir, { recursive: true });

const slug = path.basename(promptPath).replace(/\.md$/, '');
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

const refs = loadRefs(opts.ref);

console.log(`model: ${model} · ${opts.size} · ${opts.aspect} · ${opts.n} image(s)`);
console.log(`prompt: ${promptPath} (${prompt.length} chars)`);
if (refs.length) console.log(`refs:   ${opts.ref}`);
console.log('');

for (let i = 1; i <= opts.n; i++) {
  try {
    const png = await generate({ apiKey, model, prompt, aspect: opts.aspect, size: opts.size, refs });
    const file = path.join(outDir, `${slug}-${stamp}-${i}.png`);
    fs.writeFileSync(file, png);
    console.log(`  ✓ ${path.relative(REPO_ROOT, file)}  (${(png.length / 1024).toFixed(0)} KB)`);
  } catch (err) {
    console.error(`  ✗ ${i}/${opts.n}: ${err.message}`);
  }
}
