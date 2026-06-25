import { demoGeneratedAt } from "@/lib/data/demoReleaseCheck";
import type {
  AgentTimelineStep,
  EvidenceReport,
  FailureDiagnosis,
  HumanReviewDecision,
  RequirementAnalysis,
  RiskAssessment,
  TestCase,
  TestExecutionResult,
} from "@/lib/types/releaseCheck";

interface EvidenceReportInput {
  requirementAnalysis: RequirementAnalysis;
  riskAssessment: RiskAssessment;
  testCases: TestCase[];
  executionResults: TestExecutionResult[];
  failureDiagnosis: FailureDiagnosis;
  humanReviewDecision: HumanReviewDecision;
  timeline: AgentTimelineStep[];
}

export function generateEvidenceReport(
  input: EvidenceReportInput,
): EvidenceReport {
  const failedTests = input.executionResults.filter(
    (result) => result.status === "FAILED",
  );
  const passedTests = input.executionResults.filter(
    (result) => result.status === "PASSED",
  );

  return {
    id: "EVR-AF-INV-2026-001",
    title: "Invoice approval automation release evidence",
    generatedAt: demoGeneratedAt,
    releaseDecision: input.humanReviewDecision.decision,
    summary:
      "The release check found a critical high-value approval bypass in the invoice approval automation. The release is blocked until remediation, rerun evidence, and governance review are complete.",
    sections: [
      {
        title: "Requirements reviewed",
        findings: input.requirementAnalysis.extractedRequirements.map(
          (requirement) => `${requirement.id}: ${requirement.statement}`,
        ),
      },
      {
        title: "Risk assessment",
        findings: [
          `Risk score: ${input.riskAssessment.score}`,
          `Risk level: ${input.riskAssessment.level}`,
          input.riskAssessment.businessImpact,
        ],
      },
      {
        title: "Test execution",
        findings: [
          `${passedTests.length} tests passed.`,
          `${failedTests.length} critical test failed.`,
          `${input.testCases.length} generated test cases were reviewed.`,
        ],
      },
      {
        title: "Failure diagnosis",
        findings: [
          input.failureDiagnosis.title,
          input.failureDiagnosis.rootCause,
          input.failureDiagnosis.businessImpact,
        ],
      },
      {
        title: "Release gate",
        findings: [
          `Decision: ${input.humanReviewDecision.decision}`,
          input.humanReviewDecision.reason,
          ...input.humanReviewDecision.releaseConditions,
        ],
      },
    ],
    auditTrail: input.timeline.map(
      (step) => `${step.completedAt}: ${step.agentName} - ${step.outcome}`,
    ),
  };
}
