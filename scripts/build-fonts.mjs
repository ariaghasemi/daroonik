#!/usr/bin/env node
/**
 * TTF → WOFF2 for the self-hosted Persian webfonts (~55% smaller, same glyph coverage).
 *
 * Turbopack/webpack copy whatever file you hand `next/font/local`, so we pre-convert the
 * source TTFs in `src/fonts` and ship the resulting `.woff2` files. Re-run this after
 * swapping a font file in:  `npm run fonts:build`
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { compress } from "wawoff2";

const fontsDir = resolve(dirname(fileURLToPath(import.meta.url)), "../src/fonts");
const files = readdirSync(fontsDir).filter((f) => /\.(ttf|otf)$/i.test(f));

let total = 0;
for (const file of files) {
  const input = readFileSync(join(fontsDir, file));
  // Some vendors ship a woff2 payload with a .ttf extension; that face is already optimized.
  const alreadyWoff2 = input.subarray(0, 4).toString("latin1") === "wOF2";
  const out = alreadyWoff2 ? input : Buffer.from(await compress(new Uint8Array(input)));
  const target = join(fontsDir, file.replace(/\.(ttf|otf)$/i, ".woff2"));
  writeFileSync(target, out);
  if (alreadyWoff2) console.log(`(note) ${file} was already woff2 internally — copied as-is`);
  const saved = ((input.length - out.length) / input.length) * 100;
  total += out.length;
  console.log(
    `${file} → ${out.length} bytes (from ${input.length}, -${saved.toFixed(0)}%)`,
  );
}
console.log(`\n${files.length} faces converted, ${total} bytes of woff2 in src/fonts`);
void statSync;
