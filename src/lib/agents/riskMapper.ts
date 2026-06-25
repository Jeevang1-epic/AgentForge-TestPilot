import type {
  ChangeRequest,
  RequirementAnalysis,
  RiskAssessment,
  RiskFactor,
} from "@/lib/types/releaseCheck";
import { calculateRiskScore, mapRiskLevel } from "@/lib/scoring/riskScoring";

export function mapBusinessRisk(
  changeRequest: ChangeRequest,
  requirementAnalysis: RequirementAnalysis,
): RiskAssessment {
  const factors: RiskFactor[] = [
    {
      id: "RISK-001",
      label: "Approval control impact",
      description:
        "The change touches manager approval routing for invoices near financial control thresholds.",
      severity: 5,
      weight: 30,
    },
    {
      id: "RISK-002",
      label: "Financial exposure",
      description:
        "A routing defect could allow high-value invoices to move forward without required approval.",
      severity: 5,
      weight: 25,
    },
    {
      id: "RISK-003",
      label: "Exception handling",
      description:
        "Duplicate and tax exception overrides must remain stronger than preferred vendor logic.",
      severity: 4,
      weight: 20,
    },
    {
      id: "RISK-004",
      label: "Auditability",
      description:
        "Routing evidence must prove the threshold and approval path used for each invoice.",
      severity: 4,
      weight: 15,
    },
    {
      id: "RISK-005",
      label: "Release timing",
      description:
        "The release window is close enough that failed controls would have limited remediation time.",
      severity: 3,
      weight: 10,
    },
  ];
  const score = calculateRiskScore(factors);

  return {
    score,
    level: mapRiskLevel(score),
    factors,
    businessImpact: `${changeRequest.automationName} processes payment approvals where a missed manager review can create financial, compliance, and audit exposure.`,
    releaseRecommendation: `${requirementAnalysis.extractedRequirements.length} requirements require release-gate coverage before approval.`,
  };
}
