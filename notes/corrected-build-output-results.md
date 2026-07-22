# Corrected Production Build Results

This note records the production build measurements used in Chapter 5 of the thesis. I collected these results locally using the Astro, SvelteKit, and Qwik implementations of the same Product Explorer application.

## Measurement procedure

Each framework was built three times on the same Windows machine. Before each measurement, the previous production output was removed and a new production build was generated using `npm run build`. All nine recorded builds completed successfully.

The raw measurements are stored in:

- `astro-build-times.csv`
- `sveltekit-build-times.csv`
- `qwik-build-times.csv`

## Build-time results

| Framework | Runs | Mean (s) | Median (s) | Minimum (s) | Maximum (s) | All passed |
| --------- | ---: | -------: | ---------: | ----------: | ----------: | ---------- |
| Astro     |    3 |    4.653 |      4.638 |       4.552 |       4.768 | Yes        |
| SvelteKit |    3 |    6.220 |      6.267 |       5.753 |       6.641 | Yes        |
| Qwik      |    3 |   10.448 |     10.397 |       9.041 |      11.906 | Yes        |

The arithmetic mean is used in the thesis comparison. The individual measurements are retained in the raw CSV files.

## Client-artifact measurement scope

The generated client-facing production directories were inspected after the builds:

- Astro: `astro-product-explorer/dist`
- SvelteKit: `sveltekit-product-explorer/.svelte-kit/output/client`
- Qwik: `qwik-product-explorer/dist`

The SvelteKit measurement therefore covers its client output rather than the complete `.svelte-kit/output` directory, which also contains server-side build artifacts.

## Client-artifact results

| Framework | Category                  | Files |  Bytes |    KiB |
| --------- | ------------------------- | ----: | -----: | -----: |
| Astro     | Complete client directory |    34 | 135079 | 131.91 |
| Astro     | JavaScript                |     0 |      0 |   0.00 |
| Astro     | CSS                       |     0 |      0 |   0.00 |
| Astro     | HTML                      |    17 | 119119 | 116.33 |
| SvelteKit | Complete client directory |    34 | 115236 | 112.54 |
| SvelteKit | JavaScript                |    12 |  90834 |  88.71 |
| SvelteKit | CSS                       |     4 |   6519 |   6.37 |
| SvelteKit | HTML                      |     0 |      0 |   0.00 |
| Qwik      | Complete client directory |    56 | 152653 | 149.08 |
| Qwik      | JavaScript                |    35 |  96401 |  94.14 |
| Qwik      | CSS                       |     1 |   5319 |   5.19 |
| Qwik      | HTML                      |     0 |      0 |   0.00 |

The absence of separate JavaScript or CSS files in Astro’s build directory does not mean that the rendered application contained no JavaScript or styling. The browser-delivery measurement separately recorded executable inline JavaScript on the interactive Astro routes.

## Supporting evidence

The following files support these results:

- `build-time-summary.csv`
- `client-artifact-files.csv`
- `client-artifact-summary.csv`
- `environment.txt`
- `dataset-hashes.csv`
- Framework-specific build-time CSV files
- Framework-specific package-list files

These measurements replace the preliminary values recorded in the earlier Chapter 5 evaluation draft.
