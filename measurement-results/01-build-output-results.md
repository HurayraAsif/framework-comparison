# Build Output Results

## Purpose

This file records the production build output measurements for the three Product Explorer implementations: Astro, SvelteKit, and Qwik.

The purpose of this file is to document the measured build-level evidence used later in the evaluation chapter. Interpretation is kept limited here so that the measurement file remains a clear evidence record rather than a discussion chapter.

## Measurement Method

The measurements were collected on the same local machine using PowerShell. Before each measurement, the previous production output folder was removed to avoid including old build artifacts.

The following method was used:

1. Navigate into the framework project folder.
2. Remove the previous production output folder.
3. Run the production build command.
4. Record the build time using PowerShell `Measure-Command`.
5. Measure the output folder file count and size using `Get-ChildItem` and `Measure-Object`.
6. Measure JavaScript and CSS output files separately.

The byte-to-KiB approximation uses 1 KiB = 1024 bytes.

## Build Commands and Output Folders

| Framework | Build command   | Build status | Output folder measured                          |
| --------- | --------------- | ------------ | ----------------------------------------------- |
| Astro     | `npm run build` | Passed       | `astro-product-explorer/dist`                   |
| SvelteKit | `npm run build` | Passed       | `sveltekit-product-explorer/.svelte-kit/output` |
| Qwik      | `npm run build` | Passed       | `qwik-product-explorer/dist`                    |

## Build Time Results

| Framework |    Build time |
| --------- | ------------: |
| Astro     |  6.61 seconds |
| SvelteKit |  4.59 seconds |
| Qwik      | 11.83 seconds |

## Total Output Folder Size

| Framework | Output file count |   Output size | Output size approx. |
| --------- | ----------------: | ------------: | ------------------: |
| Astro     |                34 | 135,079 bytes |          131.91 KiB |
| SvelteKit |                62 | 538,105 bytes |          525.49 KiB |
| Qwik      |                56 | 152,653 bytes |          149.08 KiB |

## JavaScript Output

| Framework | JavaScript file count | JavaScript size | JavaScript size approx. |
| --------- | --------------------: | --------------: | ----------------------: |
| Astro     |                     0 |         0 bytes |                0.00 KiB |
| SvelteKit |                    35 |   503,578 bytes |              491.78 KiB |
| Qwik      |                    35 |    96,401 bytes |               94.14 KiB |

## CSS Output

| Framework | CSS file count |     CSS size | CSS size approx. |
| --------- | -------------: | -----------: | ---------------: |
| Astro     |              0 |      0 bytes |         0.00 KiB |
| SvelteKit |              8 | 13,038 bytes |        12.73 KiB |
| Qwik      |              1 |  5,319 bytes |         5.19 KiB |

## Build Output Observations

All three implementations completed the production build successfully.

SvelteKit had the fastest measured build time at 4.59 seconds. Astro completed in 6.61 seconds, while Qwik had the longest measured build time at 11.83 seconds.

Astro produced the smallest measured output folder, with 34 files and a total size of 135,079 bytes. Qwik produced a slightly larger output folder, with 56 files and 152,653 bytes. SvelteKit produced the largest measured output folder, with 62 files and 538,105 bytes.

In the measured `dist` folder, Astro did not produce separate JavaScript or CSS files for this implementation. This result should be understood as a measurement of the generated output folder for this specific Astro prototype, not as a general claim about every Astro application.

SvelteKit generated the largest measured JavaScript output, with 35 JavaScript files and 503,578 bytes. Qwik generated the same number of JavaScript files, but the total measured JavaScript size was lower at 96,401 bytes.

The SvelteKit build completed successfully, although an adapter-related message appeared because no specific deployment adapter was configured. The Qwik build also completed successfully, including type checking and lint checking, although framework-specific preview or deployment configuration messages were shown.

## Notes

These measurements should be interpreted as local build output measurements for the controlled Product Explorer thesis prototype. They are not universal benchmark results for Astro, SvelteKit, or Qwik.

The same product dataset, similar route structure, comparable visual design, and similar functional requirements were used across all three implementations to support a fair comparison.
