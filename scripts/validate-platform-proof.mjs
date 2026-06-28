import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const jsonRoots = ["uipath", "src/lib/uipath-adapters"];
const claimScanRoots = [
  "README.md",
  "docs",
  "uipath",
  "src/lib/uipath-adapters",
  "src/components/dashboard",
];
const textExtensions = new Set([
  ".css",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
]);
const evidenceBundlePath =
  "uipath/platform-proof/agentforge-testpilot-evidence-bundle.json";
const requiredEvidenceFields = [
  "prototypeStatus",
  "uipathConnectionStatus",
  "releaseCheckId",
  "risk",
  "testCoverage",
  "criticalFailure",
  "humanReview",
  "evidenceReport",
  "uipathMappings",
];
const forbiddenLiveClaimPatterns = [
  /\breal\s+uipath\s+api\s+calls\s+are\s+connected\b/i,
  /\breal\s+uipath\s+api\s+execution\s+is\s+(already\s+)?connected\b/i,
  /\blive\s+uipath\s+(api\s+)?connector\s+(is\s+)?enabled\b/i,
  /\blive\s+uipath\s+tenant\s+(is\s+)?connected\b/i,
  /\buipathconnectionstatus["\s:]+connected\b/i,
];

const failures = [];

function normalizePath(filePath) {
  return filePath.replaceAll("\\", "/");
}

function walkFiles(root) {
  if (!existsSync(root)) {
    return [];
  }

  const entry = statSync(root);
  if (entry.isFile()) {
    return [normalizePath(root)];
  }

  const files = [];
  for (const child of readdirSync(root)) {
    const childPath = path.join(root, child);
    const childStat = statSync(childPath);

    if (childStat.isDirectory()) {
      files.push(...walkFiles(childPath));
    } else {
      files.push(normalizePath(childPath));
    }
  }

  return files;
}

function addFailure(message) {
  failures.push(message);
}

function readJson(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    addFailure(`Invalid JSON in ${filePath}: ${error.message}`);
    return null;
  }
}

function validateJsonFiles() {
  const jsonFiles = jsonRoots
    .flatMap(walkFiles)
    .filter((filePath) => path.extname(filePath) === ".json")
    .sort();

  for (const filePath of jsonFiles) {
    readJson(filePath);
  }

  return jsonFiles.length;
}

function validateEvidenceBundle() {
  if (!existsSync(evidenceBundlePath)) {
    addFailure(`Missing evidence bundle: ${evidenceBundlePath}`);
    return;
  }

  const bundle = readJson(evidenceBundlePath);
  if (!bundle) {
    return;
  }

  for (const field of requiredEvidenceFields) {
    if (!(field in bundle)) {
      addFailure(`Evidence bundle missing required field: ${field}`);
    }
  }
}

function validateLiveClaims() {
  const textFiles = claimScanRoots
    .flatMap(walkFiles)
    .filter((filePath) => textExtensions.has(path.extname(filePath)))
    .sort();

  for (const filePath of textFiles) {
    const content = readFileSync(filePath, "utf8");

    for (const pattern of forbiddenLiveClaimPatterns) {
      if (pattern.test(content)) {
        addFailure(`Fake live UiPath connection claim in ${filePath}`);
      }
    }
  }
}

const jsonFileCount = validateJsonFiles();
validateEvidenceBundle();
validateLiveClaims();

if (failures.length > 0) {
  console.error("Platform proof validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Platform proof validation passed for ${jsonFileCount} JSON files.`);
