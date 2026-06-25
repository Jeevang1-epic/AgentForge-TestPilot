import type {
  ChangeRequest,
  RequirementAnalysis,
} from "@/lib/types/releaseCheck";

export function analyzeRequirements(
  changeRequest: ChangeRequest,
): RequirementAnalysis {
  return {
    summary:
      "The change modifies threshold-based routing for invoice approvals and must preserve manager approval, exception handling, duplicate detection, and audit evidence.",
    extractedRequirements: [
      {
        id: "REQ-001",
        statement:
          "Preferred vendor invoices below USD 25,000 may route directly to finance validation when no exception flags are present.",
        source: changeRequest.id,
        priority: "HIGH",
      },
      {
        id: "REQ-002",
        statement:
          "Invoices at or above USD 25,000 must route to manager approval before finance validation.",
        source: changeRequest.id,
        priority: "CRITICAL",
      },
      {
        id: "REQ-003",
        statement:
          "Duplicate invoice matches and tax exception flags must override preferred vendor routing.",
        source: changeRequest.id,
        priority: "CRITICAL",
      },
      {
        id: "REQ-004",
        statement:
          "Every routing decision must record vendor status, invoice amount, threshold applied, and final approval path.",
        source: changeRequest.id,
        priority: "HIGH",
      },
    ],
    affectedSystems: [
      "Invoice intake queue",
      "Approval routing rules",
      "Manager approval queue",
      "Finance validation queue",
      "Audit evidence log",
    ],
    controlObjectives: changeRequest.controlObjectives,
    openQuestions: [
      "Confirm whether regional approval thresholds differ from the global USD 25,000 threshold.",
      "Confirm whether emergency vendor overrides require separate approval evidence.",
    ],
  };
}
