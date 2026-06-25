import {
  baseTimeline,
  demoChangeRequest,
  demoReleaseCheckMetadata,
} from "@/lib/data/demoReleaseCheck";
import { reviewExecutionResults } from "@/lib/agents/executionAnalyst";
import { diagnoseFailure } from "@/lib/agents/failureInvestigator";
import { decideReleaseGate } from "@/lib/agents/releaseGate";
import { analyzeRequirements } from "@/lib/agents/requirementAnalyst";
import { mapBusinessRisk } from "@/lib/agents/riskMapper";
import { generateTestPlan } from "@/lib/agents/testPlanner";
import { generateEvidenceReport } from "@/lib/reports/generateEvidenceReport";
import type { ReleaseCheck } from "@/lib/types/releaseCheck";

export function runReleaseCheckPipeline(): ReleaseCheck {
  const releaseCheckId = demoReleaseCheckMetadata.runId;
  const requirementAnalysis = analyzeRequirements(demoChangeRequest);
  const riskAssessment = mapBusinessRisk(
    demoChangeRequest,
    requirementAnalysis,
  );
  const testCases = generateTestPlan(
    demoChangeRequest,
    requirementAnalysis,
    riskAssessment,
  );
  const executionResults = reviewExecutionResults(testCases);
  const failureDiagnosis = diagnoseFailure(executionResults);
  const humanReviewDecision = decideReleaseGate(
    riskAssessment,
    executionResults,
    failureDiagnosis,
  );
  const evidenceReport = generateEvidenceReport({
    releaseCheckId,
    requirementAnalysis,
    riskAssessment,
    testCases,
    executionResults,
    failureDiagnosis,
    humanReviewDecision,
    timeline: baseTimeline,
  });

  return {
    id: releaseCheckId,
    metadata: demoReleaseCheckMetadata,
    changeRequest: demoChangeRequest,
    requirementAnalysis,
    riskAssessment,
    testCases,
    executionResults,
    failureDiagnosis,
    humanReviewDecision,
    evidenceReport,
    timeline: baseTimeline,
  };
}
