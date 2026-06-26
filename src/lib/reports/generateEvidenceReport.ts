import { demoGeneratedAt } from "@/lib/data/demoReleaseCheck";
import type {
  AgentTimelineStep,
  EvidenceReportCoverageSummary,
  EvidenceReportFailedTest,
  EvidenceReport,
  EvidenceReportTraceItem,
  EvidenceReportUiPathMapping,
  FailureDiagnosis,
  HumanReviewDecision,
  RequirementAnalysis,
  RiskAssessment,
  TestCase,
  TestExecutionResult,
} from "@/lib/types/releaseCheck";

interface EvidenceReportInput {
  releaseCheckId: string;
  requirementAnalysis: RequirementAnalysis;
  riskAssessment: RiskAssessment;
  testCases: TestCase[];
  executionResults: TestExecutionResult[];
  failureDiagnosis: FailureDiagnosis;
  humanReviewDecision: HumanReviewDecision;
  timeline: AgentTimelineStep[];
}

function formatList(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
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
  const requirementTrace: EvidenceReportTraceItem[] =
    input.requirementAnalysis.extractedRequirements.map((requirement) => ({
      requirementId: requirement.id,
      requirement: requirement.statement,
      workflowStep: requirement.workflowStep,
      coveredBy: input.testCases
        .filter((testCase) => testCase.requirementIds.includes(requirement.id))
        .map((testCase) => testCase.id),
    }));
  const coverageSummary: EvidenceReportCoverageSummary = {
    totalTests: input.testCases.length,
    passedTests: passedTests.length,
    failedTests: failedTests.length,
    criticalFailures: failedTests.filter((result) => result.critical).length,
    coverageAreas: Array.from(
      new Set(input.testCases.map((testCase) => testCase.coverageArea)),
    ),
  };
  const failedTestDetails: EvidenceReportFailedTest[] = failedTests.map(
    (result) => ({
      testCaseId: result.testCaseId,
      title: result.testCaseTitle,
      status: result.status,
      critical: result.critical,
      actualResult: result.actualResult,
      errorSummary: result.errorSummary ?? "No error summary provided.",
      evidence: result.evidence,
      artifactRefs: result.artifactRefs,
    }),
  );
  const riskAssessmentSummary = [
    `Risk score: ${input.riskAssessment.score}`,
    `Risk level: ${input.riskAssessment.level}`,
    input.riskAssessment.calculationSummary,
    input.riskAssessment.businessImpact,
    input.riskAssessment.releaseRecommendation,
  ];
  const uiPathProofMapping: EvidenceReportUiPathMapping[] = [
    {
      surface: "Test Manager",
      purpose:
        "Stores requirement trace, release-gate test cases, execution results, and evidence links.",
      artifactPath: "uipath/test-manager",
    },
    {
      surface: "API Workflows",
      purpose:
        "Defines future release-check retrieval, test-result submission, and evidence-report contracts.",
      artifactPath: "uipath/api-workflows",
    },
    {
      surface: "Action Center",
      purpose:
        "Routes blocked or review-required releases to the finance governance queue.",
      artifactPath: "uipath/action-center",
    },
    {
      surface: "Coded Agents",
      purpose:
        "Maps deterministic requirement, risk, test, execution, failure, and release-gate steps to governed agent contracts.",
      artifactPath: "uipath/coded-agents",
    },
  ];
  const releaseGateDecision = `${input.humanReviewDecision.decision}: ${input.humanReviewDecision.reason}`;
  const markdown = [
    "# Invoice Approval Release Evidence",
    "",
    `Release check ID: ${input.releaseCheckId}`,
    `Final status: ${input.humanReviewDecision.decision}`,
    `Generated timestamp: ${demoGeneratedAt}`,
    "",
    "## Executive Summary",
    "The release candidate should not move to production because the high-value manager approval control failed in deterministic pre-release testing.",
    "",
    "## Requirement Trace",
    formatList(
      requirementTrace.map(
        (item) =>
          `${item.requirementId}: ${item.requirement} Covered by ${item.coveredBy.join(
            ", ",
          )}.`,
      ),
    ),
    "",
    "## Risk Assessment",
    formatList(riskAssessmentSummary),
    "",
    "## Coverage Summary",
    formatList([
      `${coverageSummary.totalTests} generated tests reviewed.`,
      `${coverageSummary.passedTests} passed tests.`,
      `${coverageSummary.failedTests} failed test.`,
      `${coverageSummary.criticalFailures} critical failure.`,
      `Coverage areas: ${coverageSummary.coverageAreas.join(", ")}.`,
    ]),
    "",
    "## Failed Test Details",
    formatList(
      failedTestDetails.map(
        (test) =>
          `${test.testCaseId}: ${test.title}. ${test.errorSummary} Actual result: ${test.actualResult}`,
      ),
    ),
    "",
    "## Root Cause",
    input.failureDiagnosis.rootCause,
    "",
    "## Release Gate Decision",
    releaseGateDecision,
    "",
    "## Human Decision",
    `${input.humanReviewDecision.decision}. ${input.humanReviewDecision.nextAction}`,
    "",
    "## UiPath Proof Mapping",
    formatList(
      uiPathProofMapping.map(
        (mapping) =>
          `${mapping.surface}: ${mapping.purpose} Artifact: ${mapping.artifactPath}.`,
      ),
    ),
  ].join("\n");

  return {
    id: "EVR-AF-INV-2026-001",
    releaseCheckId: input.releaseCheckId,
    title: "Invoice approval automation release evidence",
    generatedAt: demoGeneratedAt,
    generatedBy: "Evidence Reporter",
    finalStatus: input.humanReviewDecision.decision,
    releaseDecision: input.humanReviewDecision.decision,
    humanDecision: input.humanReviewDecision.decision,
    summary:
      "The release check found a critical high-value approval bypass in the invoice approval automation. The release is blocked until remediation, rerun evidence, and governance review are complete.",
    executiveSummary:
      "The release candidate should not move to production because the high-value manager approval control failed in deterministic pre-release testing.",
    requirementTrace,
    riskAssessmentSummary,
    coverageSummary,
    failedTestDetails,
    rootCause: input.failureDiagnosis.rootCause,
    releaseGateDecision,
    uiPathProofMapping,
    metrics: [
      {
        label: "Requirements reviewed",
        value: String(input.requirementAnalysis.extractedRequirements.length),
      },
      {
        label: "Tests generated",
        value: String(input.testCases.length),
      },
      {
        label: "Tests passed",
        value: String(passedTests.length),
      },
      {
        label: "Critical failures",
        value: String(failedTests.filter((result) => result.critical).length),
      },
      {
        label: "Risk score",
        value: String(input.riskAssessment.score),
      },
    ],
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
          input.riskAssessment.calculationSummary,
          input.riskAssessment.businessImpact,
          ...input.riskAssessment.recommendedCoverage,
        ],
      },
      {
        title: "Test execution",
        findings: [
          `${passedTests.length} tests passed.`,
          `${failedTests.length} critical test failed.`,
          `${input.testCases.length} generated test cases were reviewed.`,
          ...failedTests.map(
            (result) =>
              `${result.testCaseId}: ${result.errorSummary ?? result.actualResult}`,
          ),
        ],
      },
      {
        title: "Failure diagnosis",
        findings: [
          input.failureDiagnosis.title,
          input.failureDiagnosis.rootCause,
          input.failureDiagnosis.businessImpact,
          ...input.failureDiagnosis.contributingSignals,
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
    markdown,
  };
}
