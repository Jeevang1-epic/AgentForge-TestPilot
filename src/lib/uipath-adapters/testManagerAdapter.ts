import type { ReleaseCheck } from "@/lib/types/releaseCheck";
import type {
  TestManagerExecutionLogPayload,
  TestManagerProofPayload,
  TestManagerRequirementPayload,
  TestManagerTestCasePayload,
  TestManagerTraceabilityPayload,
  UiPathProofStatus,
} from "@/lib/uipath-adapters/types";

export const uipathProofStatus: UiPathProofStatus = {
  prototypeStatus: "deterministic-local",
  uipathConnectionStatus: "proof-layer-ready-real-connection-pending",
  adapterMode: "typed-deterministic-mock",
  liveApiCallsEnabled: false,
};

export function mapRequirementsToTestManager(
  releaseCheck: ReleaseCheck,
): TestManagerRequirementPayload[] {
  return releaseCheck.requirementAnalysis.extractedRequirements.map(
    (requirement) => ({
      requirementId: requirement.id,
      name: requirement.workflowStep,
      description: requirement.statement,
      priority: requirement.priority,
      sourceChangeRequestId: releaseCheck.changeRequest.id,
      workflowStep: requirement.workflowStep,
      acceptanceCriteria: releaseCheck.requirementAnalysis.acceptanceCriteria,
      controlObjectives: releaseCheck.requirementAnalysis.controlObjectives,
    }),
  );
}

export function mapTestCasesToTestManager(
  releaseCheck: ReleaseCheck,
): TestManagerTestCasePayload[] {
  return releaseCheck.testCases.map((testCase) => ({
    testCaseId: testCase.id,
    name: testCase.title,
    objective: testCase.objective,
    priority: testCase.priority,
    type: testCase.type,
    coverageArea: testCase.coverageArea,
    workflowStep: testCase.workflowStep,
    requirementIds: testCase.requirementIds,
    preconditions: testCase.preconditions,
    steps: testCase.steps,
    testData: testCase.testData,
    expectedResult: testCase.expectedResult,
  }));
}

export function mapExecutionResultsToTestManager(
  releaseCheck: ReleaseCheck,
): TestManagerExecutionLogPayload[] {
  return releaseCheck.executionResults.map((result) => ({
    executionId: `${releaseCheck.id}-${result.testCaseId}-log`,
    testCaseId: result.testCaseId,
    status: result.status,
    executedAt: result.executedAt,
    durationSeconds: result.durationSeconds,
    actualResult: result.actualResult,
    evidenceRefs: result.artifactRefs,
    critical: result.critical,
    errorSummary: result.errorSummary,
  }));
}

export function mapTraceabilityToTestManager(
  releaseCheck: ReleaseCheck,
): TestManagerTraceabilityPayload[] {
  return releaseCheck.requirementAnalysis.extractedRequirements.map(
    (requirement) => {
      const relatedTestCases = releaseCheck.testCases.filter((testCase) =>
        testCase.requirementIds.includes(requirement.id),
      );
      const relatedExecutionIds = releaseCheck.executionResults
        .filter((result) =>
          relatedTestCases.some(
            (testCase) => testCase.id === result.testCaseId,
          ),
        )
        .map((result) => `${releaseCheck.id}-${result.testCaseId}-log`);

      return {
        requirementId: requirement.id,
        testCaseIds: relatedTestCases.map((testCase) => testCase.id),
        executionResultIds: relatedExecutionIds,
        failureDiagnosisId: relatedTestCases.some(
          (testCase) =>
            testCase.id === releaseCheck.failureDiagnosis.failedTestCaseId,
        )
          ? `failure-${releaseCheck.failureDiagnosis.failedTestCaseId}`
          : null,
        evidenceReportId: releaseCheck.evidenceReport.id,
        releaseCheckId: releaseCheck.id,
      };
    },
  );
}

export function createTestManagerProofPayload(
  releaseCheck: ReleaseCheck,
): TestManagerProofPayload {
  return {
    status: uipathProofStatus,
    releaseCheckId: releaseCheck.id,
    requirements: mapRequirementsToTestManager(releaseCheck),
    testCases: mapTestCasesToTestManager(releaseCheck),
    executionLogs: mapExecutionResultsToTestManager(releaseCheck),
    traceability: mapTraceabilityToTestManager(releaseCheck),
  };
}
