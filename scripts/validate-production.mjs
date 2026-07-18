import { createRequire } from "node:module";
import { mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { compileApp } from "./build-app.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const failures = [];
const read = (file) => readFileSync(join(root, file), "utf8");

const html = read("index.html");
const source = read("app.jsx");
const builtApp = read("app.js");
const builtCss = read("tailwind.css");

for (const [label, pattern] of [
  ["Tailwind Play CDN", /cdn\.tailwindcss\.com/i],
  ["Babel standalone", /@babel\/standalone|babel(?:\.min)?\.js/i],
  ["runtime JSX transform", /type=["']text\/babel["']|data-type=["']module["']/i],
  ["production JSX source", /<script[^>]+src=["'][^"']*app\.jsx/i],
]) {
  if (pattern.test(html)) failures.push(`${label} remains in index.html.`);
}

if (!/<link[^>]+href=["']\/tailwind\.css\?v=psalms-20260718-1["']/i.test(html)) {
  failures.push("index.html does not load the compiled Tailwind stylesheet.");
}
if (!/<script[^>]+type=["']module["'][^>]+src=["']\/app\.js\?v=psalms-20260718-1["']/i.test(html)) {
  failures.push("index.html does not load the precompiled JavaScript module.");
}

const inputTags = [...source.matchAll(/<input\b[\s\S]*?\/>/g)].map((match) => match[0]);
if (inputTags.length !== 2) failures.push(`Expected two application inputs; found ${inputTags.length}.`);
inputTags.forEach((tag, index) => {
  if (!/\baria-label(?:ledby)?=/.test(tag)) failures.push(`Application input ${index + 1} has no accessible name.`);
});
for (const label of ["Search Psalms", "Psalm number to study"]) {
  if (!source.includes(`aria-label="${label}"`)) failures.push(`Source is missing accessible name: ${label}.`);
  if (!builtApp.includes(`"aria-label": "${label}"`)) failures.push(`Built app is missing accessible name: ${label}.`);
}

const expectedApp = compileApp();
if (builtApp !== expectedApp) failures.push("app.js is stale; run the production build.");
if (/<[A-Z][A-Za-z0-9]*[\s/>]/.test(builtApp) || /className=/.test(builtApp)) {
  failures.push("app.js still contains uncompiled JSX.");
}
if (statSync(join(root, "app.js")).size < 90_000) failures.push("app.js is unexpectedly small.");
if (statSync(join(root, "tailwind.css")).size < 20_000) failures.push("tailwind.css is unexpectedly small.");
for (const selector of [".text-slate-950", ".lg\\:grid-cols-12", ".focus\\:ring-4"]) {
  if (!builtCss.includes(selector)) failures.push(`tailwind.css is missing ${selector}.`);
}

const temp = mkdtempSync(join(tmpdir(), "psalms-tailwind-"));
try {
  const regeneratedCss = join(temp, "tailwind.css");
  const tailwindCli = require.resolve("tailwindcss/lib/cli.js");
  const result = spawnSync(
    process.execPath,
    [tailwindCli, "-c", "tailwind.config.cjs", "-i", "styles/tailwind.input.css", "-o", regeneratedCss, "--minify"],
    { cwd: root, encoding: "utf8" },
  );
  if (result.status !== 0) {
    failures.push(`Unable to regenerate tailwind.css: ${result.stderr || result.stdout}`);
  } else if (readFileSync(regeneratedCss, "utf8") !== builtCss) {
    failures.push("tailwind.css is stale; run the production build.");
  }
} finally {
  rmSync(temp, { recursive: true, force: true });
}

if (failures.length) {
  console.error("Psalm production validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  "Psalm production validation passed: compiled CSS/JS are current, runtime compilers are absent, and both inputs have accessible names.",
);
