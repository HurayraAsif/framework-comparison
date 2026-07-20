import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

import { chromium } from 'playwright';

const toolDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryDirectory = resolve(toolDirectory, '..');
const outputDirectory = join(repositoryDirectory, 'measurement-results', 'personal-run');
const runCount = Number.parseInt(
  process.argv.find((argument) => argument.startsWith('--runs='))?.split('=')[1] ?? '3',
  10,
);

if (!Number.isInteger(runCount) || runCount < 1) {
  throw new Error('--runs must be a positive integer.');
}

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const viteCli = (projectDirectory) => join(projectDirectory, 'node_modules', 'vite', 'bin', 'vite.js');

const projects = [
  {
    framework: 'Astro',
    directory: join(repositoryDirectory, 'astro-product-explorer'),
    port: 4301,
    buildCommands: [[npmCommand, ['run', 'build']]],
    previewCommand: [
      npmCommand,
      [
        'exec',
        '--',
        'astro',
        'preview',
        '--host',
        '127.0.0.1',
        '--port',
        '4301',
      ],
    ],
  },
  {
    framework: 'SvelteKit',
    directory: join(repositoryDirectory, 'sveltekit-product-explorer'),
    port: 4302,
    buildCommands: [[npmCommand, ['run', 'build']]],
    previewCommand: [
      process.execPath,
      [viteCli(join(repositoryDirectory, 'sveltekit-product-explorer')), 'preview', '--host', '127.0.0.1', '--port', '4302', '--strictPort'],
    ],
  },
  {
    framework: 'Qwik',
    directory: join(repositoryDirectory, 'qwik-product-explorer'),
    port: 4303,
    buildCommands: [
      [npmCommand, ['run', 'build']],
      [npmCommand, ['run', 'build.preview']],
    ],
    previewCommand: [
      process.execPath,
      [viteCli(join(repositoryDirectory, 'qwik-product-explorer')), 'preview', '--host', '127.0.0.1', '--port', '4303', '--strictPort'],
    ],
  },
];

const routes = ['/', '/products', '/products/1'];
const childProcesses = [];
const startedAt = new Date().toISOString();
let browserVersion = null;

const environment = {
  ...process.env,
  ASTRO_TELEMETRY_DISABLED: '1',
  CI: '1',
  FORCE_COLOR: '0',
  NO_COLOR: '1',
};

function runCommand(command, arguments_, options = {}) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, arguments_, {
      cwd: options.cwd,
      env: environment,
      shell: process.platform === 'win32' && command.toLowerCase().endsWith('.cmd'),
      stdio: options.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    });

    let stdout = '';
    let stderr = '';
    child.stdout?.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr?.on('data', (chunk) => {
      stderr += chunk;
    });
    child.once('error', rejectPromise);
    child.once('exit', (code, signal) => {
      if (code === 0) {
        resolvePromise({ stdout, stderr });
        return;
      }
      rejectPromise(
        new Error(
          `${command} ${arguments_.join(' ')} failed with ${signal ?? `exit code ${code}`}.\n${stdout}${stderr}`,
        ),
      );
    });
  });
}

async function waitForServer(port) {
  const url = `http://127.0.0.1:${port}/`;
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Preview process may still be starting.
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 150));
  }
  throw new Error(`Preview server did not become ready: ${url}`);
}

async function startPreview(project) {
  const [command, arguments_] = project.previewCommand;
  const child = spawn(command, arguments_, {
    cwd: project.directory,
    env: environment,
    shell: process.platform === 'win32' && command.toLowerCase().endsWith('.cmd'),
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  childProcesses.push(child);

  let log = '';
  child.stdout.on('data', (chunk) => {
    log += chunk;
  });
  child.stderr.on('data', (chunk) => {
    log += chunk;
  });
  child.once('exit', (code, signal) => {
    if (code !== null && code !== 0 && !child.killed) {
      process.stderr.write(
        `${project.framework} preview stopped with ${signal ?? `exit code ${code}`}\n${log}`,
      );
    }
  });

  await waitForServer(project.port);
  return child;
}

async function stopPreview(child) {
  if (!child || child.killed) return;
  if (process.platform === 'win32' && child.pid) {
    try {
      await runCommand('taskkill.exe', ['/pid', String(child.pid), '/T', '/F'], { capture: true });
    } catch {
      child.kill();
    }
  } else {
    child.kill('SIGTERM');
  }
}

function isJavaScriptResponse(response) {
  const mimeType = response.mimeType.toLowerCase();
  let pathname = response.url.toLowerCase();
  try {
    pathname = new URL(response.url).pathname.toLowerCase();
  } catch {
    // Keep original URL text.
  }
  return (
    response.type === 'Script' ||
    mimeType.includes('javascript') ||
    mimeType.includes('ecmascript') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.mjs')
  );
}

function scriptTypeClassification(type) {
  const normalized = type.trim().toLowerCase();
  const executable = new Set([
    '',
    'module',
    'text/javascript',
    'application/javascript',
    'application/ecmascript',
    'text/ecmascript',
  ]);
  return executable.has(normalized) ? 'executable' : 'non-executable';
}

async function measureRoute(project, route, run) {
  const browser = await chromium.launch({ headless: true });
  browserVersion ??= browser.version();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  const session = await context.newCDPSession(page);

  await session.send('Network.enable', {
    maxTotalBufferSize: 100_000_000,
    maxResourceBufferSize: 50_000_000,
  });
  await session.send('Network.setCacheDisabled', { cacheDisabled: true });

  const resources = new Map();
  session.on('Network.responseReceived', (event) => {
    resources.set(event.requestId, {
      requestId: event.requestId,
      url: event.response.url,
      status: event.response.status,
      mimeType: event.response.mimeType ?? '',
      type: event.type ?? '',
      encodedDataLength: 0,
      decodedBodyBytes: null,
      bodyReadError: null,
    });
  });
  session.on('Network.loadingFinished', (event) => {
    const resource = resources.get(event.requestId);
    if (resource) resource.encodedDataLength = event.encodedDataLength ?? 0;
  });

  const url = `http://127.0.0.1:${project.port}${route}`;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForLoadState('networkidle', { timeout: 60_000 });
    await page.waitForTimeout(500);

    const inlineScripts = await page.locator('script:not([src])').evaluateAll((scripts) =>
      scripts.map((script) => ({
        type: script.getAttribute('type') ?? '',
        text: script.textContent ?? '',
      })),
    );

    for (const resource of resources.values()) {
      if (!isJavaScriptResponse(resource)) continue;
      try {
        const body = await session.send('Network.getResponseBody', { requestId: resource.requestId });
        const buffer = body.base64Encoded
          ? Buffer.from(body.body, 'base64')
          : Buffer.from(body.body, 'utf8');
        resource.decodedBodyBytes = buffer.length;
      } catch (error) {
        resource.bodyReadError = error instanceof Error ? error.message : String(error);
      }
    }

    const allResources = [...resources.values()];
    const externalJavaScript = allResources.filter(isJavaScriptResponse);
    const executableInline = inlineScripts.filter(
      (script) => scriptTypeClassification(script.type) === 'executable',
    );
    const nonExecutableInline = inlineScripts.filter(
      (script) => scriptTypeClassification(script.type) === 'non-executable',
    );

    const externalJsTransferBytes = externalJavaScript.reduce(
      (sum, resource) => sum + resource.encodedDataLength,
      0,
    );
    const decodedExternalJsBytes = externalJavaScript.reduce(
      (sum, resource) => sum + (resource.decodedBodyBytes ?? 0),
      0,
    );
    const executableInlineJsBytes = executableInline.reduce(
      (sum, script) => sum + Buffer.byteLength(script.text, 'utf8'),
      0,
    );
    const nonExecutableScriptBytes = nonExecutableInline.reduce(
      (sum, script) => sum + Buffer.byteLength(script.text, 'utf8'),
      0,
    );
    const totalPageTransferBytes = allResources.reduce(
      (sum, resource) => sum + resource.encodedDataLength,
      0,
    );

    return {
      framework: project.framework,
      route,
      run,
      url,
      externalJsRequests: externalJavaScript.length,
      externalJsTransferBytes,
      decodedExternalJsBytes,
      executableInlineJsBytes,
      totalJsSourceBytes: decodedExternalJsBytes + executableInlineJsBytes,
      nonExecutableScriptBytes,
      totalPageTransferBytes,
      inlineScripts: inlineScripts.map((script) => ({
        type: script.type,
        classification: scriptTypeClassification(script.type),
        bytes: Buffer.byteLength(script.text, 'utf8'),
      })),
      resources: allResources.map((resource) => ({
        ...resource,
        isJavaScript: isJavaScriptResponse(resource),
      })),
    };
  } finally {
    await session.detach().catch(() => {});
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}

function average(rows, property) {
  return rows.reduce((sum, row) => sum + row[property], 0) / rows.length;
}

function kib(bytes) {
  return bytes / 1024;
}

function csvEscape(value) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const rawResults = [];

try {
  await mkdir(outputDirectory, { recursive: true });
  for (const project of projects) {
    process.stdout.write(`\n=== ${project.framework}: building ===\n`);
    for (const [command, arguments_] of project.buildCommands) {
      await runCommand(command, arguments_, { cwd: project.directory });
    }

    process.stdout.write(`=== ${project.framework}: starting preview on ${project.port} ===\n`);
    const preview = await startPreview(project);
    try {
      for (const route of routes) {
        for (let run = 1; run <= runCount; run += 1) {
          process.stdout.write(`${project.framework} ${route} run ${run}/${runCount}\n`);
          rawResults.push(await measureRoute(project, route, run));
        }
      }
    } finally {
      await stopPreview(preview);
    }
  }
} finally {
  for (const child of childProcesses) {
    await stopPreview(child).catch(() => {});
  }
}

const summary = [];
for (const project of projects) {
  for (const route of routes) {
    const rows = rawResults.filter(
      (result) => result.framework === project.framework && result.route === route,
    );
    summary.push({
      framework: project.framework,
      route,
      runs: rows.length,
      externalJsRequests: average(rows, 'externalJsRequests'),
      externalJsTransferBytes: average(rows, 'externalJsTransferBytes'),
      decodedExternalJsBytes: average(rows, 'decodedExternalJsBytes'),
      executableInlineJsBytes: average(rows, 'executableInlineJsBytes'),
      totalJsSourceBytes: average(rows, 'totalJsSourceBytes'),
      nonExecutableScriptBytes: average(rows, 'nonExecutableScriptBytes'),
      totalPageTransferBytes: average(rows, 'totalPageTransferBytes'),
    });
  }
}

const metadata = {
  startedAt,
  finishedAt: new Date().toISOString(),
  operatingSystem: `${process.platform} ${process.arch}`,
  nodeVersion: process.version,
  playwrightVersion: '1.61.1',
  chromiumVersion: browserVersion,
  runCount,
  routes,
  conditions: {
    browserProcess: 'fresh process for every framework/route/run',
    browserContext: 'fresh context; service workers blocked',
    cache: 'disabled through Chrome DevTools Protocol',
    wait: 'network idle plus 500 ms',
    interaction: 'none',
  },
};

const jsonPath = join(outputDirectory, 'browser-javascript-personal.json');
await writeFile(jsonPath, `${JSON.stringify({ metadata, summary, rawResults }, null, 2)}\n`);

const rawColumns = [
  'framework',
  'route',
  'run',
  'externalJsRequests',
  'externalJsTransferBytes',
  'decodedExternalJsBytes',
  'executableInlineJsBytes',
  'totalJsSourceBytes',
  'nonExecutableScriptBytes',
  'totalPageTransferBytes',
];
const rawCsv = [
  rawColumns.join(','),
  ...rawResults.map((row) => rawColumns.map((column) => csvEscape(row[column])).join(',')),
].join('\n');
await writeFile(join(outputDirectory, 'browser-javascript-personal.csv'), `${rawCsv}\n`);

const summaryColumns = [
  'framework',
  'route',
  'runs',
  'externalJsRequests',
  'externalJsTransferBytes',
  'decodedExternalJsBytes',
  'executableInlineJsBytes',
  'totalJsSourceBytes',
  'nonExecutableScriptBytes',
  'totalPageTransferBytes',
];
const summaryCsv = [
  summaryColumns.join(','),
  ...summary.map((row) => summaryColumns.map((column) => csvEscape(row[column])).join(',')),
].join('\n');
await writeFile(join(outputDirectory, 'browser-javascript-personal-summary.csv'), `${summaryCsv}\n`);

const markdown = [
  '# Personal browser-JavaScript measurement',
  '',
  `Measured: ${metadata.startedAt}`,
  '',
  `Environment: ${metadata.operatingSystem}; Node ${metadata.nodeVersion}; Playwright ${metadata.playwrightVersion}; Chromium ${metadata.chromiumVersion}`,
  '',
  '| Framework | Route | Runs | External JS requests | External transfer KiB | Decoded external JS KiB | Executable inline JS KiB | Total JS source KiB | Non-executable script data KiB | Total page transfer KiB |',
  '| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
  ...summary.map((row) =>
    `| ${row.framework} | ${row.route} | ${row.runs} | ${row.externalJsRequests.toFixed(2)} | ${kib(row.externalJsTransferBytes).toFixed(2)} | ${kib(row.decodedExternalJsBytes).toFixed(2)} | ${kib(row.executableInlineJsBytes).toFixed(2)} | ${kib(row.totalJsSourceBytes).toFixed(2)} | ${kib(row.nonExecutableScriptBytes).toFixed(2)} | ${kib(row.totalPageTransferBytes).toFixed(2)} |`,
  ),
  '',
  'External transfer is CDP encoded transfer. Decoded external bodies, executable inline scripts, and non-executable script data are UTF-8/source byte measurements. Transfer and source bytes are not added together.',
  '',
];
await writeFile(join(outputDirectory, 'browser-javascript-personal.md'), `${markdown.join('\n')}\n`);

process.stdout.write(`\nMeasurement complete. Results written to ${relative(repositoryDirectory, outputDirectory)}\n`);
process.stdout.write(`${markdown.slice(6).join('\n')}\n`);
