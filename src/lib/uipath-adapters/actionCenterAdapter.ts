import type { ReleaseCheck } from "@/lib/types/releaseCheck";
import { uipathProofStatus } from "@/lib/uipath-adapters/testManagerAdapter";
import type {
  ActionCenterProofPayload,
  ActionCenterReviewInput,
  ActionCenterReviewOutput,
} from "@/lib/uipath-adapters/types";

export function createActionCenterReviewInput(
  releaseCheck: ReleaseCheck,
): ActionCenterReviewInput {
  return {
    releaseCheckId: releaseCheck.id,
    riskScore: releaseCheck.riskAssessment.score,
    failedTestId: releaseCheck.failureDiagnosis.failedTestCaseId,
    failureSummary: releaseCheck.failureDiagnosis.title,
    reviewQueue: releaseCheck.humanReviewDecision.reviewQueue,
    requiredApprovers: releaseCheck.humanReviewDecision.requiredApprovers,
  };
}

export function createActionCenterReviewOutput(
  releaseCheck: ReleaseCheck,
): ActionCenterReviewOutput {
  return {
    releaseCheckId: releaseCheck.id,
    reviewerDecision: releaseCheck.humanReviewDecision.decision,
    reviewerComment: releaseCheck.humanReviewDecision.reason,
    finalStatus: releaseCheck.evidenceReport.finalStatus,
    riskAccepted: releaseCheck.humanReviewDecision.riskAccepted,
    releaseConditions: releaseCheck.humanReviewDecision.releaseConditions,
    decidedAt: releaseCheck.humanReviewDecision.decidedAt,
  };
}

export function createActionCenterProofPayload(
  releaseCheck: ReleaseCheck,
): ActionCenterProofPayload {
  return {
    status: uipathProofStatus,
    actionInput: createActionCenterReviewInput(releaseCheck),
    deterministicOutput: createActionCenterReviewOutput(releaseCheck),
  };
}
