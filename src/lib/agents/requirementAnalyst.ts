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
        workflowStep: "Threshold routing",
      },
      {
        id: "REQ-002",
        statement:
          "Invoices at or above USD 25,000 must route to manager approval before finance validation.",
        source: changeRequest.id,
        priority: "CRITICAL",
        workflowStep: "Manager approval routing",
      },
      {
        id: "REQ-003",
        statement:
          "Duplicate invoice matches and tax exception flags must override preferred vendor routing.",
        source: changeRequest.id,
        priority: "CRITICAL",
        workflowStep: "Exception screening",
      },
      {
        id: "REQ-004",
        statement:
          "Every routing decision must record vendor status, invoice amount, threshold applied, and final approval path.",
        source: changeRequest.id,
        priority: "HIGH",
        workflowStep: "Audit evidence logging",
      },
    ],
    businessRules: [
      "Exception screening runs before threshold routing.",
      "Preferred vendor status only changes routing for invoices below USD 25,000.",
      "USD 25,000 is an inclusive manager approval threshold.",
      "Finance validation cannot occur before required manager approval is complete.",
      "Audit evidence must capture the rule branch used for every invoice.",
    ],
    acceptanceCriteria: changeRequest.acceptanceCriteria,
    affectedWorkflowSteps: [
      "Invoice intake validation",
      "Duplicate and tax exception screening",
      "Preferred vendor threshold routing",
      "Manager approval assignment",
      "Finance validation queue assignment",
      "Approval path audit logging",
    ],
    affectedSystems: [
      "Invoice intake queue",
      "Approval routing rules",
      "Manager approval queue",
      "Finance validation queue",
      "Audit evidence log",
    ],
    controlObjectives: changeRequest.controlObjectives,
    assumptions: [
      "The release uses a single global USD 25,000 approval threshold for the demo scenario.",
      "Preferred vendor status is already validated before the routing rules execute.",
      "Manual review queues are staffed before the target release window.",
    ],
    missingInformation: [
      "Confirm whether regional approval thresholds differ from the global USD 25,000 threshold.",
      "Confirm whether emergency vendor overrides require separate approval evidence.",
      "Confirm whether finance wants blocked release evidence exported into its release record.",
    ],
  };
}
