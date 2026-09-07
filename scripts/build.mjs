#!/usr/bin/env node
/**
 * One build entry point, two deployment targets.
 *
 *   • Cloudflare Pages (and any static host) → a fully prerendered site in `out/`.
 *   • Node/VPS/containers                    → the normal `next build` output (`.next/`),
 *     which additionally exposes the `/api/*` route handlers and Postgres writes.
 *
 * The static path is chosen automatically when `CF_PAGES=1` (Pages sets it), when
 * `STATIC_EXPORT=1`, or with the `--pages` flag. Everything below the static build is
 * mechanical: the Node-only `src/app/api` folder cannot live inside `output: "export"`,
 * so it is parked outside the app router for the duration of the build and restored
 * afterwards, leaving git status untouched.
 *
 * `PAGES_ALLOW_SERVER_BUILD=1` forces the Node build even on Pages (e.g. a Worker-backed
 * deploy of the same repo).
 */
import { cpSync, existsSync, mkdirSync, readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const apiDir = join(root, "src/app/api");
const stashDir = join(root, ".static-build/api");
const outDir = join(root, "out");

const argv = process.argv.slice(2);
const forcePages = argv.includes("--pages");
const forceNode = argv.includes("--node");
const onCloudflarePages = process.env.CF_PAGES === "1";
const wantStatic =
  !forceNode &&
  (forcePages || onCloudflarePages || process.env.STATIC_EXPORT === "1") &&
  process.env.PAGES_ALLOW_SERVER_BUILD !== "1";

const log = (...args) => console.log("[build]", ...args);

function runNext(extraEnv = {}) {
  const nextBin = join(root, "node_modules/next/dist/bin/next");
  const result = spawnSync(process.execPath, [nextBin, "build"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, ...extraEnv, NEXT_TELEMETRY_DISABLED: "1" },
  });
  return result.status ?? 1;
}

function sizeOf(dir) {
  let files = 0;
  let bytes = 0;
  const walk = (d) => {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, entry.name);
      if (entry.isDirectory()) walk(p);
      else {
        files += 1;
        bytes += statSync(p).size;
      }
    }
  };
  walk(dir);
  return { files, bytes };
}

if (!wantStatic) {
  log("server build (Node runtime: .next/, includes /api route handlers)");
  // Keep next.config's "Pages must be static" guard out of the way when the server build was
  // requested explicitly (e.g. `npm run build:node` run inside a Pages pipeline for a Worker deploy).
  process.exit(runNext(forceNode ? { PAGES_ALLOW_SERVER_BUILD: "1" } : {}));
}

let stashed = false;
if (existsSync(apiDir)) {
  mkdirSync(dirname(stashDir), { recursive: true });
  rmSync(stashDir, { recursive: true, force: true });
  renameSync(apiDir, stashDir);
  stashed = true;
  log("parked src/app/api (route handlers are Node-only)");
}

let status = 1;
try {
  status = runNext({ STATIC_EXPORT: "1" });
} finally {
  if (stashed) {
    rmSync(apiDir, { recursive: true, force: true });
    renameSync(stashDir, apiDir);
    rmSync(join(root, ".static-build"), { recursive: true, force: true });
    log("restored src/app/api");
  }
}

if (status !== 0) {
  console.error("[build] static build failed");
  process.exit(status);
}

// Pages serves `404.html` for unknown paths.
const notFound = join(outDir, "_not-found.html");
const fourOhFour = join(outDir, "404.html");
if (existsSync(notFound) && !existsSync(fourOhFour)) {
  cpSync(notFound, fourOhFour);
  log("copied _not-found.html -> 404.html");
}

const { files, bytes } = sizeOf(outDir);
log(`out/ ready — ${files} files, ${(bytes / 1024 / 1024).toFixed(1)} MB`);
log('Cloudflare Pages → build output directory: "out"');
process.exit(0);
