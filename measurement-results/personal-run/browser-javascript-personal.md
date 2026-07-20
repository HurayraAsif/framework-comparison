# Personal browser-JavaScript measurement

Measured: 2026-07-20T17:05:02.711Z

Environment: win32 x64; Node v24.16.0; Playwright 1.61.1; Chromium 149.0.7827.55

| Framework | Route | Runs | External JS requests | External transfer KiB | Decoded external JS KiB | Executable inline JS KiB | Total JS source KiB | Non-executable script data KiB | Total page transfer KiB |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Astro | / | 3 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 1.62 |
| Astro | /products | 3 | 0.00 | 0.00 | 0.00 | 0.64 | 0.64 | 0.00 | 19.89 |
| Astro | /products/1 | 3 | 0.00 | 0.00 | 0.00 | 0.68 | 0.68 | 0.00 | 3.00 |
| SvelteKit | / | 3 | 9.00 | 34.35 | 80.03 | 0.46 | 80.49 | 0.00 | 38.98 |
| SvelteKit | /products | 3 | 10.00 | 36.48 | 84.53 | 0.46 | 84.99 | 0.00 | 57.93 |
| SvelteKit | /products/1 | 3 | 10.00 | 36.52 | 84.71 | 0.46 | 85.18 | 0.00 | 42.27 |
| Qwik | / | 3 | 11.00 | 37.78 | 76.08 | 0.79 | 76.87 | 1.57 | 43.59 |
| Qwik | /products | 3 | 16.00 | 42.74 | 82.37 | 1.09 | 83.46 | 13.41 | 69.35 |
| Qwik | /products/1 | 3 | 14.00 | 39.94 | 77.69 | 0.96 | 78.65 | 2.25 | 46.92 |

External transfer is CDP encoded transfer. Decoded external bodies, executable inline scripts, and non-executable script data are UTF-8/source byte measurements. Transfer and source bytes are not added together.

