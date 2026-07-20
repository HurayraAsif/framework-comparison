# Personal browser-JavaScript measurement (Windows)

This tool is for the Product Explorer thesis repository. It runs locally on Windows, uses Playwright's pinned Chromium build, and does not modify application source files.

It measures `/`, `/products`, and `/products/1` for Astro, SvelteKit, and Qwik. Each route/run uses a fresh headless Chromium process and context. Cache is disabled, service workers are blocked, the page waits for network idle plus 500 ms, and no interaction is performed.

Recorded values:

- external JavaScript response count;
- CDP `encodedDataLength` for external JavaScript responses;
- decoded external JavaScript response-body bytes;
- executable inline script bytes;
- non-executable script-data bytes;
- derived total JavaScript source bytes; and
- total page encoded transfer.

Transfer bytes and source bytes answer different questions and are never added together.

## Repository layout

Copy this complete `measurement-tools` directory into the root of `framework-comparison`, beside the three framework project directories.

## First-time setup

From the VS Code PowerShell terminal:

```powershell
Push-Location measurement-tools
npm ci 2>&1 | Tee-Object "..\measurement-results\personal-run\measurement-tools-npm-ci.log"
npx playwright install chromium
Pop-Location
```

Do not run `npm audit fix` or change application dependencies during the measurement pass.

## Run

Pause OneDrive sync, close unnecessary applications, and run from the repository root:

```powershell
Push-Location measurement-tools
npm run measure 2>&1 | Tee-Object "..\measurement-results\personal-run\browser-measurement-terminal.log"
Pop-Location
```

The tool builds each application before testing. Qwik also receives its preview-server build. It then writes the following personally generated files to `measurement-results/personal-run/`:

- `browser-javascript-personal.json` — metadata, raw runs, and resource records;
- `browser-javascript-personal.csv` — one row per framework/route/run;
- `browser-javascript-personal-summary.csv` — route averages;
- `browser-javascript-personal.md` — readable summary.

Keep the full terminal output and the four result files. Do not edit the raw JSON or per-run CSV.

These are your experimental results only when you personally execute the command on your machine and retain the raw outputs. Read this README and the measurement script before running it.
