// Verify that the exported HTML/CSS uses the required sub-path and that all
// referenced local pages and assets are present before creating the cPanel ZIP.
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const base = "/daroonik";
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.isFile() && /\.(html|css)$/.test(file)) files.push(file);
  }
}
try { await walk(root); } catch { console.error("Export not found. Run npm run build first."); process.exit(1); }
const existsCache = new Map();
const problems = [];
let references = 0;
async function check(file, raw) {
  const url = raw.replaceAll("&amp;", "&");
  if (!url.startsWith("/") || url.startsWith("//")) return;
  references++;
  const pathname = decodeURIComponent(new URL(url, "https://example.invalid").pathname);
  if (pathname !== base && !pathname.startsWith(base + "/")) {
    problems.push(`${path.relative(root, file)}: wrong path ${url}`); return;
  }
  const target = path.resolve(root, "." + pathname.slice(base.length));
  if (target !== root && !target.startsWith(root + path.sep)) {
    problems.push(`${path.relative(root, file)}: unsafe path ${url}`); return;
  }
  let found = existsCache.get(target);
  if (found === undefined) {
    try {
      const info = await stat(target);
      found = info.isDirectory() ? (await stat(path.join(target, "index.html"))).isFile() : info.isFile();
    } catch { found = false; }
    existsCache.set(target, found);
  }
  if (!found) problems.push(`${path.relative(root, file)}: missing ${url}`);
}
for (const file of files) {
  const content = await readFile(file, "utf8");
  if (file.endsWith(".html")) {
    for (const tag of content.matchAll(/<(?:a|link|img|script)\b[^>]*>/gi)) {
      const attr = tag[0].match(/\b(?:href|src)="([^"]+)"/i);
      if (attr) await check(file, attr[1]);
    }
  } else {
    for (const match of content.matchAll(/url\(["']?(\/[^"')]+)["']?\)/g)) await check(file, match[1]);
  }
}
if (problems.length) {
  console.error(`${problems.length} broken local reference(s):\n${problems.slice(0, 50).join("\n")}`);
  process.exit(1);
}
console.log(`Verified ${files.length} HTML/CSS files and ${references} local references (${existsCache.size} unique paths).`);
