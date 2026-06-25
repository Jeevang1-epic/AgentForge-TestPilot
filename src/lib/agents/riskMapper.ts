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
      impactArea: "Financial approval governance",
      description:
        "The change touches manager approval routing for invoices near financial control thresholds.",
      severity: 5,
      weight: 30,
      mitigation:
        "Cover high-value and exact-threshold invoices with manager approval control tests.",
    },
    {
      id: "RISK-002",
      label: "Financial exposure",
      impactArea: "Payment release exposure",
      description:
        "A routing defect could allow high-value invoices to move forward without required approval.",
      severity: 5,
      weight: 25,
      mitigation:
        "Block release when any high-value invoice can reach finance validation before approval.",
    },
    {
      id: "RISK-003",
      label: "Exception handling",
      impactArea: "Duplicate and tax controls",
      description:
        "Duplicate and tax exception overrides must remain stronger than preferred vendor logic.",
      severity: 4,
      weight: 20,
      mitigation:
        "Run negative tests for duplicate matches and tax exception flags before fast-path routing.",
    },
    {
      id: "RISK-004",
      label: "Auditability",
      impactArea: "Release evidence",
      description:
        "Routing evidence must prove the threshold and approval path used for each invoice.",
      severity: 4,
      weight: 15,
      mitigation:
        "Require audit evidence for threshold, vendor status, exception state, and final queue.",
    },
    {
      id: "RISK-005",
      label: "Release timing",
      impactArea: "Operational readiness",
      description:
        "The release window is close enough that failed controls would have limited remediation time.",
      severity: 3,
      weight: 10,
      mitigation:
        "Hold release until rerun evidence is attached and finance governance review is complete.",
    },
  ];
  const score = calculateRiskScore(factors);

  return {
    score,
    level: mapRiskLevel(score),
    factors,
    calculationSummary:
      "Risk score is calculated from weighted severity across approval control impact, financial exposure, exception handling, auditability, and release timing.",
    recommendedCoverage: [
      "Preferred vendor fast-path below USD 25,000.",
      "High-value preferred vendor invoice above USD 25,000.",
      "Exact-threshold invoice at USD 25,000.",
      "Duplicate invoice override before routing.",
      "Tax exception override before routing.",
      "Audit evidence for threshold, vendor status, exception state, and final approval path.",
    ],
    businessImpact: `${changeRequest.automationName} processes payment approvals where a missed manager review can create financial, compliance, and audit exposure.`,
    releaseRecommendation: `${requirementAnalysis.extractedRequirements.length} critical and high-priority requirements require release-gate coverage before approval.`,
  };
}
