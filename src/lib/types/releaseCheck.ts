export type ReleaseDecisionStatus =
  | "APPROVED"
  | "NEEDS_HUMAN_REVIEW"
  | "BLOCKED";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type RequirementPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type TestPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type TestStatus = "PASSED" | "FAILED" | "SKIPPED";

export type TimelineStatus =
  | "COMPLETED"
  | "REVIEW_REQUIRED"
  | "BLOCKED"
  | "NOT_STARTED";

export type TestType = "REGRESSION" | "CONTROL" | "NEGATIVE" | "AUDIT";

export interface ChangeRequest {
  id: string;
  title: string;
  summary: string;
  requester: string;
  businessOwner: string;
  submittedAt: string;
  targetReleaseWindow: string;
  automationName: string;
  environment: string;
  scope: string;
  controlObjectives: string[];
  acceptanceCriteria: string[];
}

export interface ReleaseCheckMetadata {
  runId: string;
  releaseCandidateId: string;
  runName: string;
  scenario: string;
  pipelineVersion: string;
  dataSource: "LOCAL_DETERMINISTIC_DEMO";
  generatedAt: string;
  status: "COMPLETED";
  qualityGate: "RELEASE_GOVERNANCE";
}

export interface RequirementItem {
  id: string;
  statement: string;
  source: string;
  priority: RequirementPriority;
  workflowStep: string;
}

export interface RequirementAnalysis {
  summary: string;
  extractedRequirements: RequirementItem[];
  businessRules: string[];
  acceptanceCriteria: string[];
  affectedWorkflowSteps: string[];
  affectedSystems: string[];
  controlObjectives: string[];
  assumptions: string[];
  missingInformation: string[];
}

export interface RiskFactor {
  id: string;
  label: string;
  impactArea: string;
  description: string;
  severity: 1 | 2 | 3 | 4 | 5;
  weight: number;
  mitigation: string;
}

export interface RiskAssessment {
  score: number;
  level: RiskLevel;
  factors: RiskFactor[];
  calculationSummary: string;
  recommendedCoverage: string[];
  businessImpact: string;
  releaseRecommendation: string;
}

export interface TestCase {
  id: string;
  title: string;
  objective: string;
  priority: TestPriority;
  type: TestType;
  coverageArea: string;
  workflowStep: string;
  testData: string;
  requirementIds: string[];
  preconditions: string[];
  steps: string[];
  expectedResult: string;
}

export interface TestExecutionResult {
  testCaseId: string;
  testCaseTitle: string;
  status: TestStatus;
  durationSeconds: number;
  executedAt: string;
  evidence: string;
  actualResult: string;
  critical: boolean;
  artifactRefs: string[];
  errorSummary?: string;
}

export interface FailureDiagnosis {
  failedTestCaseId: string;
  title: string;
  severity: "HIGH" | "CRITICAL";
  rootCause: string;
  businessImpact: string;
  affectedControl: string;
  failedWorkflowStep: string;
  reproductionSummary: string;
  contributingSignals: string[];
  recommendedFixes: string[];
}

export interface HumanReviewDecision {
  decision: ReleaseDecisionStatus;
  reason: string;
  requiredApprovers: string[];
  releaseConditions: string[];
  reviewQueue: string;
  nextAction: string;
  riskAccepted: boolean;
  decidedByAgent: string;
  decidedAt: string;
}

export interface EvidenceReportMetric {
  label: string;
  value: string;
}

export interface EvidenceReportSection {
  title: string;
  findings: string[];
}

export interface EvidenceReport {
  id: string;
  releaseCheckId: string;
  title: string;
  generatedAt: string;
  generatedBy: string;
  releaseDecision: ReleaseDecisionStatus;
  summary: string;
  executiveSummary: string;
  metrics: EvidenceReportMetric[];
  sections: EvidenceReportSection[];
  auditTrail: string[];
}

export interface AgentTimelineStep {
  id: string;
  sequence: number;
  agentName: string;
  status: TimelineStatus;
  startedAt: string;
  completedAt: string;
  durationSeconds: number;
  outcome: string;
}

export interface ReleaseCheck {
  id: string;
  metadata: ReleaseCheckMetadata;
  changeRequest: ChangeRequest;
  requirementAnalysis: RequirementAnalysis;
  riskAssessment: RiskAssessment;
  testCases: TestCase[];
  executionResults: TestExecutionResult[];
  failureDiagnosis: FailureDiagnosis;
  humanReviewDecision: HumanReviewDecision;
  evidenceReport: EvidenceReport;
  timeline: AgentTimelineStep[];
}
