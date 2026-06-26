import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const requiredFiles = [
  "README.md",
  "docs/demo-script.md",
  "docs/submission-checklist.md",
  "uipath/README.md",
];

const requiredScreenshots = [
  "public/screenshots/homepage-full.png",
  "public/screenshots/homepage-viewport.png",
  "public/screenshots/release-check-full.png",
  "public/screenshots/release-check-viewport.png",
  "public/screenshots/release-critical-failure.png",
  "public/screenshots/evidence-report-preview.png",
  "public/screenshots/uipath-proof-layer.png",
];

const forbiddenPathSegments = [".agents", ".codex", ".cursor", ".claude"];
const forbiddenFileNames = [
  "AGENTS.md",
  "CODEX.md",
  "CLAUDE.md",
  "cloud.md",
  "vibe.md",
  "codex-build-log.md",
];

const publicScanRoots = ["README.md", "docs", "src", "uipath"];
const textExtensions = new Set([
  ".css",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
]);

const forbiddenPublicTerms = [
  "Codex",
  "Stitch",
  "vibe coding",
  "prompt logs",
  "local assistant artifacts",
];

const riskyClaimTerms = [
  "real UiPath API connected",
  "production ready",
  "air-gapped",
  "cryptographic sign-off",
  "native sync",
];

const failures = [];

function normalizePath(filePath) {
  return filePath.replaceAll("\\", "/");
}

function trackedFiles() {
  return execFileSync("git", ["ls-files"], { encoding: "utf8" })
    .split(/\r?\n/)
    .filter(Boolean)
    .map(normalizePath);
}

function addFailure(message) {
  failures.push(message);
}

function isPublicScannedFile(filePath) {
  const normalized = normalizePath(filePath);
  const extension = path.extname(normalized);

  if (!textExtensions.has(extension)) {
    return false;
  }

  return publicScanRoots.some((root) => {
    const normalizedRoot = normalizePath(root);
    return (
      normalized === normalizedRoot || normalized.startsWith(`${normalizedRoot}/`)
    );
  });
}

function assertTrackedArtifacts(files) {
  for (const file of files) {
    const parts = file.split("/");
    const basename = parts.at(-1);

    if (parts.some((part) => forbiddenPathSegments.includes(part))) {
      addFailure(`Forbidden tracked artifact path: ${file}`);
    }

    if (forbiddenFileNames.includes(basename)) {
      addFailure(`Forbidden tracked artifact file: ${file}`);
    }

    if (file === "docs/codex-build-log.md") {
      addFailure(`Forbidden tracked artifact file: ${file}`);
    }
  }
}

function assertRequiredFiles() {
  for (const file of requiredFiles) {
    if (!existsSync(file)) {
      addFailure(`Missing required file: ${file}`);
    }
  }
}

function assertRequiredScreenshots() {
  for (const file of requiredScreenshots) {
    if (!existsSync(file)) {
      addFailure(`Missing required screenshot: ${file}`);
      continue;
    }

    if (statSync(file).size === 0) {
      addFailure(`Empty required screenshot: ${file}`);
    }
  }
}

function assertTextSafety(files) {
  for (const file of files.filter(isPublicScannedFile)) {
    const content = readFileSync(file, "utf8");

    for (const term of forbiddenPublicTerms) {
      if (content.toLowerCase().includes(term.toLowerCase())) {
        addFailure(`Forbidden public wording in ${file}: ${term}`);
      }
    }

    for (const term of riskyClaimTerms) {
      if (content.toLowerCase().includes(term.toLowerCase())) {
        addFailure(`Risky integration claim in ${file}: ${term}`);
      }
    }

    if (/[^\x00-\x7F]/.test(content)) {
      addFailure(`Non-ASCII text found in ${file}`);
    }
  }
}

const files = trackedFiles();

assertTrackedArtifacts(files);
assertRequiredFiles();
assertRequiredScreenshots();
assertTextSafety(files);

if (failures.length > 0) {
  console.error("Repository audit failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Repository audit passed.");
