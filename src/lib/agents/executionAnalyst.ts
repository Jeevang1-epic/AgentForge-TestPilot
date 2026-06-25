import type { TestCase, TestExecutionResult } from "@/lib/types/releaseCheck";

const executedAt = "2026-06-26T08:41:40+05:30";

type ResultTemplate = Omit<
  TestExecutionResult,
  "testCaseId" | "testCaseTitle"
>;

const resultTemplates: Record<string, ResultTemplate> = {
  "TC-INV-001": {
    status: "PASSED",
    durationSeconds: 18,
    executedAt,
    evidence:
      "Preferred vendor invoice INV-10421 routed to finance validation with fast-path reason captured.",
    actualResult:
      "The invoice moved to finance validation and recorded preferred vendor fast-path routing.",
    critical: false,
    artifactRefs: ["local-run/INV-10421-routing.json"],
  },
  "TC-INV-002": {
    status: "FAILED",
    durationSeconds: 22,
    executedAt,
    evidence:
      "Invoice INV-88450 for USD 48,750 routed directly to finance validation.",
    actualResult:
      "The invoice skipped manager approval and entered finance validation.",
    critical: true,
    artifactRefs: [
      "local-run/INV-88450-routing.json",
      "local-run/INV-88450-queue-snapshot.txt",
    ],
    errorSummary:
      "High-value invoice bypasses manager approval after threshold-routing change.",
  },
  "TC-INV-003": {
    status: "PASSED",
    durationSeconds: 24,
    executedAt,
    evidence:
      "Duplicate invoice candidate INV-44109 routed to manual review with duplicate override reason captured.",
    actualResult:
      "Duplicate detection overrode preferred vendor routing and assigned manual review.",
    critical: false,
    artifactRefs: ["local-run/INV-44109-duplicate-review.json"],
  },
  "TC-INV-004": {
    status: "PASSED",
    durationSeconds: 20,
    executedAt,
    evidence:
      "Tax exception invoice INV-57222 routed to manual review with exception reason captured.",
    actualResult:
      "Tax exception handling overrode the fast path and assigned manual review.",
    critical: false,
    artifactRefs: ["local-run/INV-57222-tax-exception.json"],
  },
  "TC-INV-005": {
    status: "PASSED",
    durationSeconds: 27,
    executedAt,
    evidence:
      "Boundary invoice INV-25000 routed to manager approval with threshold and approval path evidence captured.",
    actualResult:
      "The exact-threshold invoice assigned manager approval and wrote complete audit evidence.",
    critical: false,
    artifactRefs: ["local-run/INV-25000-audit-evidence.json"],
  },
};

export function reviewExecutionResults(
  testCases: TestCase[],
): TestExecutionResult[] {
  return testCases.map((testCase) => {
    const template = resultTemplates[testCase.id] ?? {
      status: "SKIPPED",
      durationSeconds: 0,
      executedAt,
      evidence: "No deterministic execution template was defined.",
      actualResult: "No result was produced.",
      critical: false,
      artifactRefs: [],
    };

    return {
      testCaseId: testCase.id,
      testCaseTitle: testCase.title,
      ...template,
    };
  });
}
