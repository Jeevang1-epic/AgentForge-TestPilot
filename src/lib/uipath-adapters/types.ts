import type {
  ReleaseCheck,
  ReleaseDecisionStatus,
  RequirementPriority,
  TestPriority,
  TestStatus,
  TestType,
} from "@/lib/types/releaseCheck";

export type UiPathPrototypeStatus = "deterministic-local";

export type UiPathConnectionStatus =
  "proof-layer-ready-real-connection-pending";

export interface UiPathProofStatus {
  prototypeStatus: UiPathPrototypeStatus;
  uipathConnectionStatus: UiPathConnectionStatus;
  adapterMode: "typed-deterministic-mock";
  liveApiCallsEnabled: false;
}

export interface TestManagerRequirementPayload {
  requirementId: string;
  name: string;
  description: string;
  priority: RequirementPriority;
  sourceChangeRequestId: string;
  workflowStep: string;
  acceptanceCriteria: string[];
  controlObjectives: string[];
}

export interface TestManagerTestCasePayload {
  testCaseId: string;
  name: string;
  objective: string;
  priority: TestPriority;
  type: TestType;
  coverageArea: string;
  workflowStep: string;
  requirementIds: string[];
  preconditions: string[];
  steps: string[];
  testData: string;
  expectedResult: string;
}

export interface TestManagerExecutionLogPayload {
  executionId: string;
  testCaseId: string;
  status: TestStatus;
  executedAt: string;
  durationSeconds: number;
  actualResult: string;
  evidenceRefs: string[];
  critical: boolean;
  errorSummary?: string;
}

export interface TestManagerTraceabilityPayload {
  requirementId: string;
  testCaseIds: string[];
  executionResultIds: string[];
  failureDiagnosisId: string | null;
  evidenceReportId: string;
  releaseCheckId: string;
}

export interface TestManagerProofPayload {
  status: UiPathProofStatus;
  releaseCheckId: string;
  requirements: TestManagerRequirementPayload[];
  testCases: TestManagerTestCasePayload[];
  executionLogs: TestManagerExecutionLogPayload[];
  traceability: TestManagerTraceabilityPayload[];
}

export interface GetReleaseCheckRequest {
  releaseCheckId: string;
}

export interface GetReleaseCheckResponse {
  releaseCheckId: string;
  releaseCandidateId: string;
  runName: string;
  scenario: string;
  riskScore: number;
  riskLevel: string;
  finalStatus: ReleaseDecisionStatus;
  failedTestId: string | null;
  evidenceReportId: string;
}

export interface SubmitTestResultsRequest {
  releaseCheckId: string;
  executionResults: TestManagerExecutionLogPayload[];
}

export interface SubmitTestResultsResponse {
  accepted: true;
  releaseCheckId: string;
  resultCount: number;
  passedCount: number;
  failedCount: number;
  criticalFailureCount: number;
  finalStatus: ReleaseDecisionStatus;
}

export interface GenerateEvidenceReportRequest {
  releaseCheckId: string;
  includeMarkdown: boolean;
}

export interface GenerateEvidenceReportResponse {
  releaseCheckId: string;
  evidenceReportId: string;
  title: string;
  summary: string;
  finalStatus: ReleaseDecisionStatus;
  generatedAt: string;
  markdown?: string;
}

export interface ApiWorkflowExample<TRequest, TResponse> {
  operation: string;
  request: TRequest;
  response: TResponse;
}

export interface ApiWorkflowProofPayload {
  status: UiPathProofStatus;
  getReleaseCheck: ApiWorkflowExample<
    GetReleaseCheckRequest,
    GetReleaseCheckResponse
  >;
  submitTestResults: ApiWorkflowExample<
    SubmitTestResultsRequest,
    SubmitTestResultsResponse
  >;
  generateEvidenceReport: ApiWorkflowExample<
    GenerateEvidenceReportRequest,
    GenerateEvidenceReportResponse
  >;
}

export interface ActionCenterReviewInput {
  releaseCheckId: string;
  riskScore: number;
  failedTestId: string;
  failureSummary: string;
  reviewQueue: string;
  requiredApprovers: string[];
}

export interface ActionCenterReviewOutput {
  releaseCheckId: string;
  reviewerDecision: ReleaseDecisionStatus;
  reviewerComment: string;
  finalStatus: ReleaseDecisionStatus;
  riskAccepted: boolean;
  releaseConditions: string[];
  decidedAt: string;
}

export interface ActionCenterProofPayload {
  status: UiPathProofStatus;
  actionInput: ActionCenterReviewInput;
  deterministicOutput: ActionCenterReviewOutput;
}

export interface PlatformEvidenceBundle {
  status: UiPathProofStatus;
  releaseCheck: ReleaseCheck;
  testManager: TestManagerProofPayload;
  apiWorkflows: ApiWorkflowProofPayload;
  actionCenter: ActionCenterProofPayload;
}
