import type { ReleaseCheck } from "@/lib/types/releaseCheck";
import {
  mapExecutionResultsToTestManager,
  uipathProofStatus,
} from "@/lib/uipath-adapters/testManagerAdapter";
import type {
  ApiWorkflowProofPayload,
  GenerateEvidenceReportResponse,
  GetReleaseCheckResponse,
  SubmitTestResultsResponse,
} from "@/lib/uipath-adapters/types";

export function createGetReleaseCheckResponse(
  releaseCheck: ReleaseCheck,
): GetReleaseCheckResponse {
  const failedResult = releaseCheck.executionResults.find(
    (result) => result.status === "FAILED",
  );

  return {
    releaseCheckId: releaseCheck.id,
    releaseCandidateId: releaseCheck.metadata.releaseCandidateId,
    runName: releaseCheck.metadata.runName,
    scenario: releaseCheck.metadata.scenario,
    riskScore: releaseCheck.riskAssessment.score,
    riskLevel: releaseCheck.riskAssessment.level,
    finalStatus: releaseCheck.humanReviewDecision.decision,
    failedTestId: failedResult?.testCaseId ?? null,
    evidenceReportId: releaseCheck.evidenceReport.id,
  };
}

export function createSubmitTestResultsResponse(
  releaseCheck: ReleaseCheck,
): SubmitTestResultsResponse {
  const passedCount = releaseCheck.executionResults.filter(
    (result) => result.status === "PASSED",
  ).length;
  const failedResults = releaseCheck.executionResults.filter(
    (result) => result.status === "FAILED",
  );

  return {
    accepted: true,
    releaseCheckId: releaseCheck.id,
    resultCount: releaseCheck.executionResults.length,
    passedCount,
    failedCount: failedResults.length,
    criticalFailureCount: failedResults.filter((result) => result.critical)
      .length,
    finalStatus: releaseCheck.humanReviewDecision.decision,
  };
}

export function createGenerateEvidenceReportResponse(
  releaseCheck: ReleaseCheck,
  includeMarkdown = true,
): GenerateEvidenceReportResponse {
  return {
    releaseCheckId: releaseCheck.id,
    evidenceReportId: releaseCheck.evidenceReport.id,
    title: releaseCheck.evidenceReport.title,
    summary: releaseCheck.evidenceReport.summary,
    finalStatus: releaseCheck.evidenceReport.finalStatus,
    generatedAt: releaseCheck.evidenceReport.generatedAt,
    markdown: includeMarkdown ? releaseCheck.evidenceReport.markdown : undefined,
  };
}

export function createApiWorkflowProofPayload(
  releaseCheck: ReleaseCheck,
): ApiWorkflowProofPayload {
  const executionResults = mapExecutionResultsToTestManager(releaseCheck);

  return {
    status: uipathProofStatus,
    getReleaseCheck: {
      operation: "getReleaseCheck",
      request: {
        releaseCheckId: releaseCheck.id,
      },
      response: createGetReleaseCheckResponse(releaseCheck),
    },
    submitTestResults: {
      operation: "submitTestResults",
      request: {
        releaseCheckId: releaseCheck.id,
        executionResults,
      },
      response: createSubmitTestResultsResponse(releaseCheck),
    },
    generateEvidenceReport: {
      operation: "generateEvidenceReport",
      request: {
        releaseCheckId: releaseCheck.id,
        includeMarkdown: true,
      },
      response: createGenerateEvidenceReportResponse(releaseCheck),
    },
  };
}
