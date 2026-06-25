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
      coverageArea: "Preferred vendor fast path",
      workflowStep: "Preferred vendor threshold routing",
      testData: "INV-10421, preferred vendor, USD 12,500, no exceptions",
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
      coverageArea: "High-value approval control",
      workflowStep: "Manager approval assignment",
      testData: "INV-88450, preferred vendor, USD 48,750, no exceptions",
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
      coverageArea: "Duplicate exception override",
      workflowStep: "Exception screening",
      testData:
        "INV-44109, preferred vendor, USD 8,900, duplicate match score 0.94",
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
      coverageArea: "Tax exception override",
      workflowStep: "Exception screening",
      testData: "INV-57222, preferred vendor, USD 18,000, tax exception flag",
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
      title: "Boundary invoice captures manager approval and audit evidence",
      objective:
        "Validate exact-threshold handling and release evidence for the manager approval control.",
      priority: riskAssessment.level === "CRITICAL" ? "CRITICAL" : "HIGH",
      type: "AUDIT",
      coverageArea: "Boundary threshold and audit evidence",
      workflowStep: "Approval path audit logging",
      testData: `INV-25000, preferred vendor, USD 25,000, ${changeRequest.automationName}`,
      requirementIds: requirementAnalysis.extractedRequirements.map(
        (requirement) => requirement.id,
      ),
      preconditions: [
        "Vendor is marked preferred.",
        "Invoice amount is exactly USD 25,000.",
        "No exception flags are present.",
        "Audit logging is enabled for routing decisions.",
      ],
      steps: [
        "Submit the boundary invoice.",
        "Run threshold-routing evaluation.",
        "Confirm whether the manager approval queue is assigned.",
        "Review the routing audit evidence for threshold and approval path.",
      ],
      expectedResult:
        "Invoice routes to manager approval and records threshold, vendor status, amount, and approval path.",
    },
  ];
}
