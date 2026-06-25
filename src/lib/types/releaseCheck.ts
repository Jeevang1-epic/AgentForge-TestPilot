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

export interface RequirementItem {
  id: string;
  statement: string;
  source: string;
  priority: RequirementPriority;
}

export interface RequirementAnalysis {
  summary: string;
  extractedRequirements: RequirementItem[];
  affectedSystems: string[];
  controlObjectives: string[];
  openQuestions: string[];
}

export interface RiskFactor {
  id: string;
  label: string;
  description: string;
  severity: 1 | 2 | 3 | 4 | 5;
  weight: number;
}

export interface RiskAssessment {
  score: number;
  level: RiskLevel;
  factors: RiskFactor[];
  businessImpact: string;
  releaseRecommendation: string;
}

export interface TestCase {
  id: string;
  title: string;
  objective: string;
  priority: TestPriority;
  type: "REGRESSION" | "CONTROL" | "NEGATIVE" | "AUDIT";
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
  errorSummary?: string;
}

export interface FailureDiagnosis {
  failedTestCaseId: string;
  title: string;
  severity: "HIGH" | "CRITICAL";
  rootCause: string;
  businessImpact: string;
  affectedControl: string;
  reproductionSummary: string;
  recommendedFixes: string[];
}

export interface HumanReviewDecision {
  decision: ReleaseDecisionStatus;
  reason: string;
  requiredApprovers: string[];
  releaseConditions: string[];
  decidedByAgent: string;
  decidedAt: string;
}

export interface EvidenceReportSection {
  title: string;
  findings: string[];
}

export interface EvidenceReport {
  id: string;
  title: string;
  generatedAt: string;
  releaseDecision: ReleaseDecisionStatus;
  summary: string;
  sections: EvidenceReportSection[];
  auditTrail: string[];
}

export interface AgentTimelineStep {
  id: string;
  agentName: string;
  status: TimelineStatus;
  startedAt: string;
  completedAt: string;
  outcome: string;
}

export interface ReleaseCheck {
  id: string;
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
