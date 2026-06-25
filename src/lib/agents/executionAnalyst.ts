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
  },
  "TC-INV-002": {
    status: "FAILED",
    durationSeconds: 22,
    executedAt,
    evidence:
      "Invoice INV-88450 for USD 48,750 routed directly to finance validation.",
    errorSummary:
      "High-value invoice bypasses manager approval after threshold-routing change.",
  },
  "TC-INV-003": {
    status: "PASSED",
    durationSeconds: 24,
    executedAt,
    evidence:
      "Duplicate invoice candidate INV-44109 routed to manual review with duplicate override reason captured.",
  },
  "TC-INV-004": {
    status: "PASSED",
    durationSeconds: 20,
    executedAt,
    evidence:
      "Tax exception invoice INV-57222 routed to manual review with exception reason captured.",
  },
  "TC-INV-005": {
    status: "PASSED",
    durationSeconds: 19,
    executedAt,
    evidence:
      "Boundary invoice INV-25000 routed to manager approval at exactly USD 25,000.",
  },
  "TC-INV-006": {
    status: "PASSED",
    durationSeconds: 31,
    executedAt,
    evidence:
      "Audit log captured threshold, vendor status, invoice amount, and approval path for all sampled invoices.",
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
    };

    return {
      testCaseId: testCase.id,
      testCaseTitle: testCase.title,
      ...template,
    };
  });
}
