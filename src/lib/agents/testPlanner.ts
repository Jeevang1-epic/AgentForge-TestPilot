import type {
  ChangeRequest,
  RequirementAnalysis,
  RiskAssessment,
  TestCase,
} from "@/lib/types/releaseCheck";

export function generateTestPlan(
  changeRequest: ChangeRequest,
  requirementAnalysis: RequirementAnalysis,
  riskAssessment: RiskAssessment,
): TestCase[] {
  return [
    {
      id: "TC-INV-001",
      title: "Preferred vendor invoice below threshold routes to finance",
      objective:
        "Verify the requested fast path for a low-risk preferred vendor invoice.",
      priority: "HIGH",
      type: "REGRESSION",
      requirementIds: ["REQ-001", "REQ-004"],
      preconditions: [
        "Vendor is marked preferred.",
        "Invoice amount is USD 12,500.",
        "No duplicate, tax, or compliance flags are present.",
      ],
      steps: [
        "Submit the invoice to the automation intake queue.",
        "Run threshold-routing evaluation.",
        "Review the assigned approval queue and audit log.",
      ],
      expectedResult:
        "Invoice routes to finance validation and records the preferred vendor fast-path reason.",
    },
    {
      id: "TC-INV-002",
      title: "High-value preferred vendor invoice requires manager approval",
      objective:
        "Prove that high-value invoices cannot bypass manager approval after the threshold-routing change.",
      priority: "CRITICAL",
      type: "CONTROL",
      requirementIds: ["REQ-002", "REQ-004"],
      preconditions: [
        "Vendor is marked preferred.",
        "Invoice amount is USD 48,750.",
        "No duplicate or tax exception flags are present.",
      ],
      steps: [
        "Submit the invoice to the automation intake queue.",
        "Run threshold-routing evaluation.",
        "Review the assigned approval queue before finance validation.",
      ],
      expectedResult:
        "Invoice routes to manager approval before it can proceed to finance validation.",
    },
    {
      id: "TC-INV-003",
      title: "Duplicate invoice override routes to manual review",
      objective:
        "Confirm duplicate detection overrides preferred vendor fast-path routing.",
      priority: "CRITICAL",
      type: "NEGATIVE",
      requirementIds: ["REQ-003", "REQ-004"],
      preconditions: [
        "Vendor is marked preferred.",
        "Invoice amount is USD 8,900.",
        "Duplicate invoice match score is above policy threshold.",
      ],
      steps: [
        "Submit the duplicate invoice candidate.",
        "Run exception evaluation before approval routing.",
        "Review queue assignment and audit evidence.",
      ],
      expectedResult:
        "Invoice routes to manual review and records the duplicate override reason.",
    },
    {
      id: "TC-INV-004",
      title: "Tax exception override blocks automated fast path",
      objective:
        "Confirm tax exception flags prevent direct finance validation routing.",
      priority: "HIGH",
      type: "NEGATIVE",
      requirementIds: ["REQ-003", "REQ-004"],
      preconditions: [
        "Vendor is marked preferred.",
        "Invoice amount is USD 18,000.",
        "Tax exception flag is present.",
      ],
      steps: [
        "Submit the invoice with a tax exception flag.",
        "Run exception evaluation and threshold routing.",
        "Inspect final queue assignment.",
      ],
      expectedResult:
        "Invoice routes to manual review and records the tax exception override.",
    },
    {
      id: "TC-INV-005",
      title: "Boundary invoice at USD 25,000 requires manager approval",
      objective:
        "Validate exact-threshold handling for the manager approval control.",
      priority: riskAssessment.level === "CRITICAL" ? "CRITICAL" : "HIGH",
      type: "CONTROL",
      requirementIds: ["REQ-002"],
      preconditions: [
        "Vendor is marked preferred.",
        "Invoice amount is exactly USD 25,000.",
        "No exception flags are present.",
      ],
      steps: [
        "Submit the boundary invoice.",
        "Run threshold-routing evaluation.",
        "Confirm whether the manager approval queue is assigned.",
      ],
      expectedResult:
        "Invoice routes to manager approval because the threshold rule is inclusive.",
    },
    {
      id: "TC-INV-006",
      title: "Audit log captures threshold and approval path",
      objective:
        "Verify the release produces evidence suitable for finance governance review.",
      priority: "HIGH",
      type: "AUDIT",
      requirementIds: requirementAnalysis.extractedRequirements.map(
        (requirement) => requirement.id,
      ),
      preconditions: [
        `${changeRequest.automationName} audit logging is enabled.`,
        "A mixed invoice batch includes fast-path, manager approval, and exception routes.",
      ],
      steps: [
        "Process the mixed invoice batch.",
        "Open the audit evidence log.",
        "Review logged threshold, vendor status, invoice amount, and approval path.",
      ],
      expectedResult:
        "Each invoice has complete routing evidence with no missing approval path fields.",
    },
  ];
}
