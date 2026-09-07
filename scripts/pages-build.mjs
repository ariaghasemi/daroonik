#!/usr/bin/env node
/**
 * Build the static bundle that Cloudflare Pages hosts (`out/`).
 *
 * The app ships Node-only route handlers under `src/app/api` (contact / newsletter /
 * orders / search) for the Postgres deployment. A static export cannot contain them, so
 * this script parks that folder outside the app router for the duration of the build and
 * puts it back afterwards — the repo is left untouched and `npm run build` (Node mode)
 * keeps working exactly as before.
 *
 * Afterwards it finishes the small bits Pages expects: a real `404.html`, `200.html`
 * fallback for unknown product slugs is intentionally NOT generated (a proper 404 status
 * is better for SEO), and a build report.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const apiDir = join(root, "src/app/api");
const stashDir = join(root, ".static-build/api");
const outDir = join(root, "out");

function log(...args) {
  console.log("[pages]", ...args);
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
  const nextBin = join(root, "node_modules/next/dist/bin/next");
  const result = spawnSync(process.execPath, [nextBin, "build"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "1", NEXT_TELEMETRY_DISABLED: "1" },
  });
  status = result.status ?? 1;
} finally {
  if (stashed) {
    rmSync(apiDir, { recursive: true, force: true });
    renameSync(stashDir, apiDir);
    rmSync(join(root, ".static-build"), { recursive: true, force: true });
    log("restored src/app/api");
  }
}

if (status !== 0) {
  console.error("[pages] build failed");
  process.exit(status);
}

// Pages serves `404.html` for unknown paths; Next emits `_not-found.html` on export.
const notFound = join(outDir, "_not-found.html");
const fourOhFour = join(outDir, "404.html");
if (existsSync(notFound) && !existsSync(fourOhFour)) {
  cpSync(notFound, fourOhFour);
  log("copied _not-found.html -> 404.html");
}

function count(dir) {
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

const { files, bytes } = count(outDir);
log(`out/ ready — ${files} files, ${(bytes / 1024 / 1024).toFixed(1)} MB`);
log('Cloudflare Pages → output directory: "out"');
