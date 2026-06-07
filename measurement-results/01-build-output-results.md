# Build Output Results

This file records the build output measurements for the three Product Explorer implementations: Astro, SvelteKit, and Qwik.

The measurements were collected on the same local machine using PowerShell. Each application was built after removing its previous production output folder to make the build measurement cleaner.

## Measurement Method

The following method was used:

1. Navigate into each framework project folder.
2. Remove the previous build output folder.
3. Run the production build command.
4. Record the build time using PowerShell `Measure-Command`.
5. Measure the output folder size using `Get-ChildItem` and `Measure-Object`.
6. Measure separate JavaScript and CSS file output.

## Build Commands

| Framework | Build command   | Output folder measured                          |
| --------- | --------------- | ----------------------------------------------- |
| Astro     | `npm run build` | `astro-product-explorer/dist`                   |
| SvelteKit | `npm run build` | `sveltekit-product-explorer/.svelte-kit/output` |
| Qwik      | `npm run build` | `qwik-product-explorer/dist`                    |

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

## Observations

Astro produced the smallest measured total output folder. The Astro build generated 17 static pages and did not produce separate JavaScript or CSS files in the measured `dist` folder for this implementation.

SvelteKit had the fastest measured build time in this run, but its measured output folder was the largest. This is because the `.svelte-kit/output` folder includes generated client and server output artifacts. The build completed successfully, although the adapter-auto message appeared because no specific deployment adapter was configured.

Qwik produced a total output folder size close to Astro but generated separate JavaScript and CSS assets. Its build time was the longest in this run. The build completed successfully with type checking and lint checking, although Qwik showed warnings and the message about a missing integration for preview/deployment configuration.

## Notes

The measurements should be interpreted as local build output measurements for this controlled thesis application, not as universal framework benchmarks. The same dataset, same product images, same route structure, and similar UI functionality were used across all three implementations to keep the comparison fair.
