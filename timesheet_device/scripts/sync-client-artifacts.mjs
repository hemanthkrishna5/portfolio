import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDir = path.resolve(__dirname, "../dist/client");

const artifacts = [
  { source: "index.js", target: "index.mjs" },
  { source: "index.umd.cjs", target: "index.umd.js" }
];

for (const { source, target } of artifacts) {
  const sourcePath = path.join(clientDir, source);
  const targetPath = path.join(clientDir, target);

  if (!fs.existsSync(sourcePath)) continue;

  fs.copyFileSync(sourcePath, targetPath);
}
