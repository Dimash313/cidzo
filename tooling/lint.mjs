import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const errors = [];
const files = ["package.json", "pnpm-workspace.yaml", "tsconfig.json"];
function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink()) {
      errors.push(relative(root, path) + ": symbolic link not allowed in tooling");
    } else if (entry.isDirectory()) {
      if (!["dist", "node_modules"].includes(entry.name)) walk(path);
    } else if (entry.isFile() && /\.(?:mjs|ts|json|yaml|yml|md)$/.test(entry.name)) {
      files.push(relative(root, path));
    }
  }
}
walk(join(root, "tooling"));
for (const path of files.sort()) {
  const text = readFileSync(join(root, path), "utf8");
  if (!text.endsWith("\n") || text.includes("\r") || text.includes("\t")) {
    errors.push(path + ": require final LF, LF line endings and spaces");
  }
  if (text.split("\n").some((line) => /[ \t]+$/.test(line))) {
    errors.push(path + ": trailing whitespace");
  }
  if (path.endsWith(".ts") && /@ts-(?:ignore|nocheck|expect-error)\b/.test(text)) {
    errors.push(path + ": TypeScript suppression is not allowed");
  }
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Foundation style checks passed for " + files.length + " files");
}
