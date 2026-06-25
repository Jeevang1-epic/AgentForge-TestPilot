import type {
  FailureDiagnosis,
  TestExecutionResult,
} from "@/lib/types/releaseCheck";

export function diagnoseFailure(
  executionResults: TestExecutionResult[],
): FailureDiagnosis {
  const failedResult = executionResults.find(
    (result) => result.status === "FAILED",
  );

  return {
    failedTestCaseId: failedResult?.testCaseId ?? "TC-INV-002",
    title:
      "High-value invoice bypasses manager approval after threshold-routing change",
    severity: "CRITICAL",
    rootCause:
      "The preferred vendor fast-path branch evaluates before the high-value approval guard, so invoices above the USD 25,000 threshold can route directly to finance validation.",
    businessImpact:
      "A high-value invoice can proceed without manager approval, weakening payment governance and creating audit exposure for finance operations.",
    affectedControl:
      "High-value invoices require manager approval before finance validation.",
    failedWorkflowStep: "Manager approval assignment",
    reproductionSummary:
      "Submit preferred vendor invoice INV-88450 for USD 48,750 with no exception flags. The automation assigns finance validation instead of manager approval.",
    contributingSignals: [
      "The failed test uses a preferred vendor above the approval threshold.",
      "No duplicate or tax exception flags explain the routing outcome.",
      "The actual queue assignment is finance validation instead of manager approval.",
      "The audit record captured preferred vendor routing but did not capture manager approval evaluation.",
    ],
    recommendedFixes: [
      "Evaluate duplicate and tax exception overrides before preferred vendor routing.",
      "Evaluate the high-value approval guard before any preferred vendor fast path.",
      "Add a regression test for preferred vendor invoices above USD 25,000.",
      "Rerun the release-gate suite and attach updated evidence before approval.",
    ],
  };
}
