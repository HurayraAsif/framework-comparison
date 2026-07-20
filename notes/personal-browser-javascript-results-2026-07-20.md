# Personal browser JavaScript measurement — 20 July 2026

## Purpose

I ran this measurement locally to record the initial browser JavaScript delivery of the Astro, SvelteKit, and Qwik Product Explorer implementations. The same three routes were tested in each implementation:

- `/`
- `/products`
- `/products/1`

This was an initial route-load test. No search, filtering, favorite-button, or other user interaction was performed.

## Environment and procedure

- Operating system: Windows x64
- Node.js: v24.16.0
- Playwright: 1.61.1
- Chromium: 149.0.7827.55
- Measurement start: 2026-07-20T17:05:02.711Z
- Measurement finish: 2026-07-20T17:06:08.003Z
- Runs: three per framework and route, 27 route loads in total
- Serving mode: local production preview
- Browser isolation: fresh Chromium process and browser context for every run
- Browser cache: disabled through the Chrome DevTools Protocol
- Service workers: blocked
- Page-ready condition: network idle followed by 500 ms
- Interaction during measurement: none

The script built each application before measurement. Astro produced 17 static pages. SvelteKit completed its build with the expected adapter-auto environment notice. Qwik completed its type check and lint step with zero errors and three existing warnings.

## Route-level averages

The values below are arithmetic means of the three runs. KiB values use 1 KiB = 1,024 bytes.

| Framework | Route | Runs | External JS requests | External transfer KiB | Decoded external JS KiB | Executable inline JS KiB | Total JS source KiB | Non-executable script data KiB | Total page transfer KiB |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Astro | `/` | 3 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 1.62 |
| Astro | `/products` | 3 | 0.00 | 0.00 | 0.00 | 0.64 | 0.64 | 0.00 | 19.89 |
| Astro | `/products/1` | 3 | 0.00 | 0.00 | 0.00 | 0.68 | 0.68 | 0.00 | 3.00 |
| SvelteKit | `/` | 3 | 9.00 | 34.35 | 80.03 | 0.46 | 80.49 | 0.00 | 38.98 |
| SvelteKit | `/products` | 3 | 10.00 | 36.48 | 84.53 | 0.46 | 84.99 | 0.00 | 57.93 |
| SvelteKit | `/products/1` | 3 | 10.00 | 36.52 | 84.71 | 0.46 | 85.18 | 0.00 | 42.27 |
| Qwik | `/` | 3 | 11.00 | 37.78 | 76.08 | 0.79 | 76.87 | 1.57 | 43.59 |
| Qwik | `/products` | 3 | 16.00 | 42.74 | 82.37 | 1.09 | 83.46 | 13.41 | 69.35 |
| Qwik | `/products/1` | 3 | 14.00 | 39.94 | 77.69 | 0.96 | 78.65 | 2.25 | 46.92 |

`External transfer` is the encoded data length reported by the Chrome DevTools Protocol for external JavaScript responses. `Decoded external JS` and the inline-script columns are UTF-8/source byte measurements. `Total JS source` is decoded external JavaScript plus executable inline JavaScript. Transfer values and source values answer different questions and must not be added together.

Qwik's `qwik/json` serialization blocks are recorded as non-executable script data. They are not counted as executable JavaScript or included in `Total JS source`.

## Main observations

1. Astro made no external JavaScript requests on the three tested routes. The listing and detail routes still contained small executable inline scripts of approximately 0.64 KiB and 0.68 KiB. The correct conclusion is therefore “no external JavaScript requests,” not “no JavaScript.”
2. SvelteKit made 9–10 external JavaScript requests and recorded 34.35–36.52 KiB of encoded external JavaScript transfer.
3. Qwik made 11–16 external JavaScript requests and recorded 37.78–42.74 KiB of encoded external JavaScript transfer.
4. Qwik used more external requests and slightly more encoded external JavaScript transfer than SvelteKit, but its decoded total JavaScript source was slightly smaller on all three routes.
5. The product listing route produced the highest total page transfer for every framework.

## Integrity and consistency checks

- All 27 expected framework/route/run records are present and unique.
- No HTTP response failures were recorded.
- No external JavaScript response body failed to decode.
- The request counts and byte totals agree with the underlying resource records.
- The generated route averages were recalculated from the raw runs and matched exactly.
- Astro and SvelteKit were byte-for-byte stable across the three runs.
- Qwik varied by at most two bytes in total JavaScript source and three bytes in total page transfer.

The terminal shows each preview process exiting with code 1 after its nine route measurements. This was produced by the Windows process-tree termination used to stop the local preview server after testing. It happened after all expected measurements for the framework and did not remove or invalidate any route record.

## Scope and limitations

- These values describe initial loading under local production-preview conditions.
- They do not measure JavaScript loaded after search, filtering, favorite-button interaction, navigation after the initial load, or other delayed execution.
- This distinction is especially important for Qwik because code may be loaded on demand after interaction.
- The results come from one Windows machine, one pinned Chromium version, and one measurement session.
- The results are not universal benchmarks for all Astro, SvelteKit, or Qwik applications.
- Total build-folder size, browser transfer, decoded JavaScript source size, and runtime execution cost are separate measurements and should not be treated as interchangeable.

## Evidence files

The personal run produced these files under `measurement-results/personal-run/`:

- `browser-javascript-personal.json` — environment metadata, route summaries, all raw runs, inline-script records, and network-resource records
- `browser-javascript-personal.csv` — one row per framework, route, and run
- `browser-javascript-personal-summary.csv` — route-level averages
- `browser-javascript-personal.md` — generated readable summary
- `browser-measurement-terminal.log` — complete build and measurement terminal output

The measurement instrument is stored at:

- `measurement-tools/measure-browser-javascript-windows.mjs`
- `measurement-tools/package.json`
- `measurement-tools/package-lock.json`

## Evidence hashes

- Personal evidence archive SHA-256: `F993A45ED87263B3E1B1A35EA0DB0548D4F3283BBFBC6098C99D0646EAF19E49`
- Measurement script SHA-256: `0C11979F5DAA8ADDC8D142BB203DEBDCFC63062E472748A293B8309CF0F0C42A`
- Measurement `package.json` SHA-256: `E338EBA0145DDD43B8B6A579A6E45892444843608BA7CABDB3B30DCF31C6381B`
- Measurement lockfile SHA-256: `B62B7114496A50C207C6205514EB8DCAE643921B374B3B60816177406B58CE67`

The archive is retained locally as evidence but is not required in Git because its contents are committed separately.

## Reproduction

From the repository root in Windows PowerShell:

```powershell
Push-Location measurement-tools
npm ci
npx playwright install chromium
npm run measure
Pop-Location
```

The measurement command rebuilds the three applications, starts their local preview servers, runs the route measurements, and writes new output files under `measurement-results/personal-run/`.
