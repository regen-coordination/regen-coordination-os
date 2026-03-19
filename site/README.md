# Regen Coordination Website (Hybrid-Light)

Static-first website scaffold for `regen-coordination-os`.

## Commands

```bash
npm install
npm run build:snapshot
npm run dev
```

## Data flow

Canonical sources:
- `federation.yaml`
- `data/*.yaml`

Build step:
- `scripts/build-snapshot.js` -> `site/data/networkSnapshot.json`

Website consumes `networkSnapshot.json` at runtime.
