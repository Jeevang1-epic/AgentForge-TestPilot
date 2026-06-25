import type {
  FailureDiagnosis,
  HumanReviewDecision,
  RiskAssessment,
  TestExecutionResult,
} from "@/lib/types/releaseCheck";

export function decideReleaseGate(
  riskAssessment: RiskAssessment,
  executionResults: TestExecutionResult[],
  failureDiagnosis: FailureDiagnosis,
): HumanReviewDecision {
  const hasFailedTest = executionResults.some(
    (result) => result.status === "FAILED",
  );
  const shouldBlock =
    hasFailedTest ||
    riskAssessment.level === "CRITICAL" ||
    failureDiagnosis.severity === "CRITICAL";

  return {
    decision: shouldBlock ? "BLOCKED" : "NEEDS_HUMAN_REVIEW",
    reason: shouldBlock
      ? "Release is blocked because a critical approval-control test failed."
      : "Release requires human review because the change touches approval controls.",
    requiredApprovers: [
      "Accounts Payable Governance",
      "Finance Operations Lead",
      "Automation QA Owner",
    ],
    releaseConditions: [
      "Fix the high-value approval guard in threshold routing.",
      "Rerun the full invoice approval release-gate suite.",
      "Attach passing execution evidence to the release record.",
      "Obtain finance governance approval before production deployment.",
    ],
    reviewQueue: "Finance automation release governance",
    nextAction:
      "Return the change to engineering for routing guard remediation before release review.",
    riskAccepted: false,
    decidedByAgent: "Release Gate",
    decidedAt: "2026-06-26T08:42:42+05:30",
  };
}
