# Framework Comparison: Astro, SvelteKit, and Qwik

This repository contains the implementation and measurement evidence for the master’s thesis:

**A Comparative Study of Disappearing Frameworks: Astro, SvelteKit, and Qwik**

The study compares three implementations of the same controlled Product Explorer prototype.

## Implementations

- `astro-product-explorer/` — Astro implementation
- `sveltekit-product-explorer/` — SvelteKit implementation
- `qwik-product-explorer/` — Qwik implementation

Each implementation includes the same main routes:

- `/`
- `/products`
- `/products/1`

## Measurement Evidence

Final verified measurement results are stored in:

- `measurement-results/personal-run/`

This folder contains the verified production build results, browser JavaScript measurements, environment information, and final Lighthouse score summary.

## Raw Lighthouse Reports

The 27 raw Lighthouse JSON reports are stored in:

- `lighthouse-reports/final-rerun-2026-07-26/`

The reports are organised by framework:

- `astro/`
- `sveltekit/`
- `qwik/`

Each framework was tested on three routes with three runs per route.

## Measurement Scripts

The scripts used for browser-level measurement and result processing are included in the repository.

## Important Note

Earlier draft notes and preliminary measurements are retained only for transparency where clearly marked as superseded. The files in `measurement-results/personal-run/` and `lighthouse-reports/final-rerun-2026-07-26/` represent the final verified evidence used in the thesis.
