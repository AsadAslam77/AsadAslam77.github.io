/**
 * npm run placeholders
 *
 * Lists every unresolved item in lib/content.ts, plus any file the site
 * expects that is not in the repo yet.
 *
 * It imports the TypeScript file directly. Node 24 strips type annotations
 * itself, so there is no build step and no second copy of the data to keep
 * in sync.
 *
 * Always exits 0. This is a report, not a gate: it must never be able to
 * fail a build or a deploy.
 */

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// pathToFileURL, because a bare Windows path such as D:\... is not a valid
// import specifier.
const contentPath = path.join(root, "lib", "content.ts");
const content = await import(pathToFileURL(contentPath).href);

/**
 * Walks a value and collects every object carrying an `unresolved` key,
 * recording the path it was found at.
 */
function walk(value, where, found) {
  if (value === null || typeof value !== "object") return;

  if ("unresolved" in value) {
    found.push({ where, item: value });
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((entry, i) => walk(entry, `${where}[${i}]`, found));
    return;
  }

  for (const [key, entry] of Object.entries(value)) {
    walk(entry, where ? `${where}.${key}` : key, found);
  }
}

const found = [];
for (const [name, value] of Object.entries(content)) {
  walk(value, name, found);
}

// Files the data points at that are not committed yet.
const missingFiles = Object.entries(content.assets ?? {})
  .filter(([, asset]) => !existsSync(path.join(root, asset.path)))
  .map(([name, asset]) => ({ name, path: asset.path }));

const fillIns = found.filter((f) => f.item.unresolved === "fill-in");
const confirms = found.filter((f) => f.item.unresolved === "confirm");

const column = Math.max(
  0,
  ...found.map((f) => f.where.length),
  ...missingFiles.map((f) => f.path.length),
);

function line(label, where, note) {
  console.log(`  ${label.padEnd(9)}${where.padEnd(column + 3)}${note}`);
}

console.log("\nUnresolved content in lib/content.ts\n");

if (fillIns.length > 0) {
  console.log("No value yet:\n");
  for (const f of fillIns) line("FILL IN", f.where, f.item.note);
  console.log("");
}

if (confirms.length > 0) {
  console.log("Has a value, unverified:\n");
  for (const f of confirms) {
    line("CONFIRM", f.where, `${f.item.note} — currently "${f.item.value}"`);
  }
  console.log("");
}

if (missingFiles.length > 0) {
  console.log("Files not in the repo yet:\n");
  for (const f of missingFiles) line("MISSING", f.path, "file does not exist");
  console.log("");
}

const total = fillIns.length + confirms.length + missingFiles.length;

if (total === 0) {
  console.log("Nothing unresolved. All content is confirmed.\n");
} else {
  console.log(
    `${fillIns.length} to fill in, ${confirms.length} to confirm, ` +
      `${missingFiles.length} missing ${missingFiles.length === 1 ? "file" : "files"} — ` +
      `${total} total.\n`,
  );
}

process.exit(0);
