// Derive dark theme semantic tokens from the light theme.
// Principle: invert lightness (L → 1 − L), preserve hue, dampen chroma ~25%
// on chromatic tokens. Status hues match light-theme but adjusted L+C for
// dark-background legibility. Verify all pairs with culori `wcagContrast`.
import { converter, formatHex, wcagContrast, parseHex } from 'culori';

// ---------- Brand stops (anchor) ----------
const brand = {
  light: {
    'brand-sky':       'oklch(77.5% 0.02 236)',
    'brand-horizon':   'oklch(83.8% 0.026 75)',
    'brand-pasture':   'oklch(88.5% 0.097 104)',
    'brand-sun':       'oklch(80.5% 0.077 70)',
    'brand-sun-deep':  'oklch(73.8% 0.125 77)',
  },
  dark: {
    // Anchored exactly per task spec.
    'brand-sky':       'oklch(22% 0.02 236)',
    'brand-horizon':   'oklch(16% 0.026 75)',
    'brand-pasture':   'oklch(18% 0.072 104)',  // L≈100−88.5≈11.5 → bumped a hair, C dampened ~25%
    'brand-sun':       'oklch(35% 0.10 70)',
    'brand-sun-deep':  'oklch(58% 0.155 77)',   // action color stays vibrant
  },
};

// ---------- Dark theme semantic tokens ----------
// Same names + same order as §2.2.
// Surfaces: very dark warm-anchored neutrals (L 0.05–0.20, near-zero C).
// Text: light L (0.92–0.97).
// Borders: L ≈ 0.30–0.40 to be visible without glaring.
// Primary: anchored to the dark brand-sun-deep above.
// *-foreground: pick light or very-dark to maximize contrast — verified below.
// Status: hues 142 / 70 / 25 / 236, L ≈ 0.55–0.65, modestly higher C than dampened brand.
const tokens = {
  // Surfaces — very dark, warm-anchored, near-zero chroma
  bg:           'oklch(13% 0.008 75)',
  'surface-1': 'oklch(17% 0.010 75)',
  'surface-2': 'oklch(21% 0.012 75)',
  'surface-3': 'oklch(25% 0.014 75)',

  // Text — light warm-anchored
  'text-primary': 'oklch(96% 0.008 75)',
  'text-muted':   'oklch(72% 0.010 75)',

  // Borders — visible on dark surfaces but not glaring
  'border-default': 'oklch(52% 0.012 75)',
  'border-subtle':  'oklch(32% 0.010 75)',

  // Action — primary == dark brand-sun-deep (stays vibrant)
  'primary':            'oklch(60% 0.155 77)',
  'primary-hover':      'oklch(66% 0.150 77)',  // lighter on hover (dark theme convention)
  'primary-active':     'oklch(72% 0.140 77)',  // even lighter on press
  'primary-foreground': 'oklch(15% 0.015 75)',  // dark text on vibrant orange

  // Accent — derived from dark brand-pasture
  'accent':            'oklch(28% 0.072 104)',
  'accent-foreground': 'oklch(96% 0.008 104)',

  // Status — same hues as light, dark-bg appropriate L+C
  'success':            'oklch(62% 0.14 142)',  // green, lighter for dark bg
  'success-foreground': 'oklch(15% 0.015 142)',
  'warning':            'oklch(75% 0.155 70)',  // amber stays vibrant
  'warning-foreground': 'oklch(18% 0.020 70)',
  'danger':             'oklch(63% 0.18 25)',   // red, lifted L for dark
  'danger-foreground':  'oklch(15% 0.020 25)',
  'info':               'oklch(65% 0.11 236)',  // cool slate, lifted
  'info-foreground':    'oklch(15% 0.015 236)',
};

const hex = {};
for (const [name, value] of Object.entries(tokens)) {
  hex[name] = formatHex(value);
}

console.log('--- DARK TOKEN HEX FALLBACKS ---');
for (const [k, v] of Object.entries(hex)) {
  console.log(`${k.padEnd(22)} ${tokens[k].padEnd(35)} ${v}`);
}

// ---------- Verification pairs (parallel to light) ----------
const pairs = [
  ['text-primary', 'bg'],
  ['text-primary', 'surface-1'],
  ['text-primary', 'surface-2'],
  ['text-primary', 'surface-3'],
  ['text-muted', 'bg'],
  ['text-muted', 'surface-1'],
  ['text-muted', 'surface-2'],
  ['text-muted', 'surface-3'],

  ['primary-foreground', 'primary'],
  ['primary-foreground', 'primary-hover'],
  ['primary-foreground', 'primary-active'],
  ['accent-foreground', 'accent'],
  ['success-foreground', 'success'],
  ['warning-foreground', 'warning'],
  ['danger-foreground', 'danger'],
  ['info-foreground', 'info'],

  // text-primary on each status (information density, mark AA-UI / FAIL based on ratio)
  ['text-primary', 'success'],
  ['text-primary', 'warning'],
  ['text-primary', 'danger'],
  ['text-primary', 'info'],

  // UI: border on bg
  ['border-default', 'bg'],
];

// Classify with the new vocabulary (per Task-3 polish 1).
// - AAA      ≥ 7
// - AA       ≥ 4.5
// - AA-UI    ≥ 3, fg is a UI element (border/icon) — WCAG SC 1.4.11 (Non-text Contrast)
// - AA-large ≥ 3, fg is large-only text (≥ 18pt or ≥ 14pt bold)
// - FAIL     < 3, OR < 4.5 for body-text tokens that aren't UI nor flagged large.
//
// Decision: `text-primary` is body-text-styled; on status backgrounds it's marked FAIL
// for normal-text usage. Status backgrounds are paired with `*-foreground` (which all pass AA).
const UI_FG = new Set(['border-default', 'border-subtle']);
const BODY_TEXT_FG = new Set(['text-primary', 'text-muted']);
function classify(ratio, fg) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) {
    if (UI_FG.has(fg)) return 'AA-UI';
    if (BODY_TEXT_FG.has(fg)) return 'FAIL'; // body-text below 4.5 is FAIL for normal use
    return 'AA-large'; // explicitly large-text-only foregrounds
  }
  return 'FAIL';
}

console.log('\n--- DARK CONTRAST RATIOS ---');
const results = [];
for (const [fg, bg] of pairs) {
  const ratio = wcagContrast(tokens[fg], tokens[bg]);
  const wcag = classify(ratio, fg);
  results.push({ fg, bg, ratio: Math.round(ratio * 100) / 100, wcag });
  const flag = wcag === 'FAIL' ? ' <-- FAIL' : (wcag === 'AA-large' ? ' (large-text)' : (wcag === 'AA-UI' ? ' (UI-only)' : ''));
  console.log(`${fg.padEnd(22)} on ${bg.padEnd(18)} ratio ${ratio.toFixed(2)} ${wcag}${flag}`);
}

// Required: AA for normal text fg/bg pairs, AA for *-foreground on color pairs.
// Allowed AA-UI: border-default on bg (>= 3).
// text-primary on status: tracked but not required (matches light-theme treatment).
const violations = [];
for (const r of results) {
  if (r.fg === 'border-default') {
    if (r.ratio < 3) violations.push({ ...r, reason: 'UI border below 3:1' });
    continue;
  }
  if (r.fg === 'text-primary' && ['success', 'warning', 'danger', 'info'].includes(r.bg)) {
    continue; // tracked, not required
  }
  if (r.ratio < 4.5) violations.push({ ...r, reason: 'below AA 4.5:1' });
}

console.log('\n--- DARK VIOLATIONS ---');
console.log(JSON.stringify(violations, null, 2));

// Emit dark token rows for the §2.4 markdown table
console.log('\n--- DARK TOKEN ROWS (md table) ---');
for (const [name, value] of Object.entries(tokens)) {
  console.log(`| \`--${name}\` | \`${value}\` | \`${hex[name]}\` |`);
}

// Emit the JSON pairs block (for hand-merging into contrast-report.json)
console.log('\n--- DARK PAIRS (JSON) ---');
console.log(JSON.stringify({ pairs: results, violations }, null, 2));
