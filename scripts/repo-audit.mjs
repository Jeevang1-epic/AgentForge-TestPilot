import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const requiredFiles = [
  "README.md",
  "docs/coding-agent-bonus.md",
  "docs/demo-script.md",
  "docs/submission-checklist.md",
  "docs/uipath-platform-proof.md",
  "uipath/README.md",
  "uipath/platform-proof/agentforge-testpilot-evidence-bundle.json",
  "uipath/platform-proof/integration-readiness-checklist.md",
];

const requiredScreenshots = [
  "public/screenshots/homepage-full.png",
  "public/screenshots/homepage-viewport.png",
  "public/screenshots/release-check-full.png",
  "public/screenshots/release-check-viewport.png",
  "public/screenshots/release-critical-failure.png",
  "public/screenshots/evidence-report-preview.png",
  "public/screenshots/uipath-integration-readiness.png",
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

const forbiddenPromptLogFilePatterns = [
  /prompt[-_ ]?log/i,
  /chat[-_ ]?history/i,
  /raw[-_ ]?prompt/i,
  /assistant[-_ ]?transcript/i,
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
  "Stitch",
  "vibe coding",
  "local assistant artifacts",
];

const allowedCodingAgentEvidenceFiles = new Set([
  "README.md",
  "docs/coding-agent-bonus.md",
  "docs/submission-checklist.md",
]);

const codingAgentEvidenceTerms = ["OpenAI Codex", "prompt logs"];

const riskyClaimTerms = [
  "real UiPath API connected",
  "real UiPath API execution is already connected",
  "live UiPath connector enabled",
  "live UiPath tenant connected",
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

    for (const pattern of forbiddenPromptLogFilePatterns) {
      if (pattern.test(file)) {
        addFailure(`Forbidden raw prompt log style file: ${file}`);
      }
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

function assertCodingAgentEvidence() {
  const readme = readFileSync("README.md", "utf8");
  const bonusDoc = readFileSync("docs/coding-agent-bonus.md", "utf8");

  if (!readme.includes("Coding Agent Bonus Evidence")) {
    addFailure("README.md must mention Coding Agent Bonus Evidence.");
  }

  if (!bonusDoc.includes("OpenAI Codex")) {
    addFailure("docs/coding-agent-bonus.md must document the coding agent tool.");
  }

  if (!bonusDoc.includes("No raw prompt logs are included.")) {
    addFailure("docs/coding-agent-bonus.md must state raw prompt logs are not included.");
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

    if (!allowedCodingAgentEvidenceFiles.has(file)) {
      for (const term of codingAgentEvidenceTerms) {
        if (content.toLowerCase().includes(term.toLowerCase())) {
          addFailure(`Coding-agent evidence wording outside allowed files in ${file}: ${term}`);
        }
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
assertCodingAgentEvidence();
assertTextSafety(files);

if (failures.length > 0) {
  console.error("Repository audit failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Repository audit passed.");
