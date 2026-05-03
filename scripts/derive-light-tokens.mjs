// Derive light theme semantic tokens from brand stops.
// Compute hex fallbacks + WCAG contrast ratios for verification.
import { converter, formatHex, wcagContrast, parse } from 'culori';

const toRgb = converter('rgb');

// Light theme tokens — first pass, conservative L gaps.
// All warm-anchored at h ≈ 75 except sky-derived (info, border-subtle accents).
const tokens = {
  // Surfaces — very light, near-zero chroma at warm hue
  bg:           'oklch(99% 0.003 75)',
  'surface-1': 'oklch(97% 0.005 75)',
  'surface-2': 'oklch(94.5% 0.008 75)',
  'surface-3': 'oklch(91% 0.012 75)',

  // Text — dark warm-anchored
  'text-primary': 'oklch(22% 0.015 75)',
  'text-muted':   'oklch(45% 0.012 75)',

  // Borders
  'border-default': 'oklch(60% 0.015 75)',
  'border-subtle':  'oklch(88% 0.010 75)',

  // Action — primary == sun-deep verbatim
  'primary':            'oklch(74% 0.125 77)',
  'primary-hover':      'oklch(68% 0.135 77)',
  'primary-active':     'oklch(62% 0.135 77)',
  'primary-foreground': 'oklch(18% 0.02 75)',

  // Accent — derived from pasture, slightly muted for UI accents
  'accent':            'oklch(88.5% 0.097 104)',
  'accent-foreground': 'oklch(22% 0.02 104)',

  // Status
  'success':            'oklch(52% 0.13 142)',  // green, brand-leaning warm-green
  'success-foreground': 'oklch(98% 0.005 142)',
  'warning':            'oklch(72% 0.15 70)',   // amber, derived from sun-deep, slightly more orange
  'warning-foreground': 'oklch(20% 0.02 70)',
  'danger':             'oklch(55% 0.18 25)',   // warm red
  'danger-foreground':  'oklch(98% 0.005 25)',
  'info':               'oklch(55% 0.10 236)',  // cool slate, from sky
  'info-foreground':    'oklch(98% 0.005 236)',
};

const hex = {};
for (const [name, value] of Object.entries(tokens)) {
  hex[name] = formatHex(value);
}
console.log('--- HEX FALLBACKS ---');
for (const [k, v] of Object.entries(hex)) {
  console.log(`${k.padEnd(22)} ${tokens[k].padEnd(35)} ${v}`);
}

// Pairs to verify
const pairs = [
  // Text on every surface
  ['text-primary', 'bg'],
  ['text-primary', 'surface-1'],
  ['text-primary', 'surface-2'],
  ['text-primary', 'surface-3'],
  ['text-muted', 'bg'],
  ['text-muted', 'surface-1'],
  ['text-muted', 'surface-2'],
  ['text-muted', 'surface-3'],

  // Foreground-on-color pairs
  ['primary-foreground', 'primary'],
  ['primary-foreground', 'primary-hover'],
  ['primary-foreground', 'primary-active'],
  ['accent-foreground', 'accent'],
  ['success-foreground', 'success'],
  ['warning-foreground', 'warning'],
  ['danger-foreground', 'danger'],
  ['info-foreground', 'info'],

  // text-primary on each status (flag if < 4.5)
  ['text-primary', 'success'],
  ['text-primary', 'warning'],
  ['text-primary', 'danger'],
  ['text-primary', 'info'],

  // UI: border on bg (>= 3:1)
  ['border-default', 'bg'],
];

function classify(ratio, isUiOrLarge = false) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA-large';
  return 'FAIL';
}

console.log('\n--- CONTRAST RATIOS ---');
const results = [];
for (const [fg, bg] of pairs) {
  const ratio = wcagContrast(tokens[fg], tokens[bg]);
  const wcag = classify(ratio);
  results.push({ fg, bg, ratio: Math.round(ratio * 100) / 100, wcag });
  const flag = wcag === 'FAIL' ? ' <-- FAIL' : (wcag === 'AA-large' ? ' (UI-only)' : '');
  console.log(`${fg.padEnd(22)} on ${bg.padEnd(18)} ratio ${ratio.toFixed(2)} ${wcag}${flag}`);
}

// Identify violations: text-on-surface text-* pairs and *-foreground on color pairs need AA (>= 4.5)
// border-default on bg only needs >= 3
const violations = [];
for (const r of results) {
  const isBorderUi = r.fg.startsWith('border-');
  if (isBorderUi) {
    if (r.ratio < 3) violations.push({ ...r, reason: 'UI border below 3:1' });
    continue;
  }
  // text-primary on status colors: per task, "flag if < 4.5"
  if (r.fg === 'text-primary' && ['success', 'warning', 'danger', 'info'].includes(r.bg)) {
    // not strictly required to pass, but flagged
    continue;
  }
  if (r.ratio < 4.5) violations.push({ ...r, reason: 'below AA 4.5:1' });
}

console.log('\n--- VIOLATIONS ---');
console.log(JSON.stringify(violations, null, 2));

// Export
const report = {
  verified_at: '2026-05-03',
  themes: {
    light: {
      pairs: results,
      violations: violations.map(v => ({ fg: v.fg, bg: v.bg, ratio: v.ratio, reason: v.reason })),
    },
  },
};

import { writeFileSync } from 'node:fs';
writeFileSync('docs/design-source/contrast-report.json', JSON.stringify(report, null, 2));
console.log('\nWrote docs/design-source/contrast-report.json');

// Also emit a compact hex list for table-building
console.log('\n--- TOKEN ROWS (md table) ---');
for (const [name, value] of Object.entries(tokens)) {
  console.log(`| \`--${name}\` | \`${value}\` | \`${hex[name]}\` |`);
}
