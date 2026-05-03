# Token derivation scripts

`derive-light-tokens.mjs` and `derive-dark-tokens.mjs` produced the §2.2 / §2.4 semantic-token tables and the `docs/design-source/contrast-report.json` pairs in Phase 1. Run with `node scripts/derive-light-tokens.mjs` (requires `culori` — install via `npm install --no-save culori`).

These are frozen v1 helpers, not part of the build. The canonical source of truth is `docs/DESIGN.md` (Phase 1 includes a precision pass at commit `bfa4820` aligning §2.1 and §2.2 `--primary` to `brand-extract.json`'s exact percentages). Re-running these scripts will produce values within ~0.2% L of canonical — sub-perceptual but not byte-identical. For exact regeneration, update the script literals from `brand-extract.json` first.
