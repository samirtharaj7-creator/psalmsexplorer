import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = join(root, "app.jsx");
const outputPath = join(root, "app.js");

export function compileApp(source = readFileSync(sourcePath, "utf8")) {
  const result = ts.transpileModule(source, {
    fileName: "app.jsx",
    reportDiagnostics: true,
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      newLine: ts.NewLineKind.LineFeed,
      removeComments: false,
    },
  });

  const errors = (result.diagnostics || []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  if (errors.length) {
    const details = errors
      .map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"))
      .join("\n");
    throw new Error(`Unable to compile app.jsx:\n${details}`);
  }

  return `// Generated from app.jsx by scripts/build-app.mjs. Do not edit directly.\n${result.outputText}`;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const output = compileApp();
  writeFileSync(outputPath, output);
  console.log(`Built app.js (${Buffer.byteLength(output).toLocaleString()} bytes).`);
}
