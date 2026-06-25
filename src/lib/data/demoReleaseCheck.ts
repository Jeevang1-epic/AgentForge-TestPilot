import type {
  AgentTimelineStep,
  ChangeRequest,
  ReleaseCheckMetadata,
} from "@/lib/types/releaseCheck";

export const demoGeneratedAt = "2026-06-26T09:00:00+05:30";

export const demoReleaseCheckMetadata: ReleaseCheckMetadata = {
  runId: "RC-AF-INV-2026-001",
  releaseCandidateId: "REL-INV-DISPATCHER-2026-06-28",
  runName: "Preferred vendor threshold routing release check",
  scenario: "Invoice approval automation release governance",
  pipelineVersion: "2.0.0-local",
  dataSource: "LOCAL_DETERMINISTIC_DEMO",
  generatedAt: demoGeneratedAt,
  status: "COMPLETED",
  qualityGate: "RELEASE_GOVERNANCE",
};

export const demoChangeRequest: ChangeRequest = {
  id: "CR-INV-2026-014",
  title: "Update invoice approval threshold routing for preferred vendors",
  summary:
    "Finance operations wants the invoice approval automation to route preferred vendor invoices under USD 25,000 directly to the finance validation queue while preserving manager approval for high-value invoices, exception flags, duplicate matches, and audit logging.",
  requester: "Finance Operations",
  businessOwner: "Accounts Payable Governance",
  submittedAt: "2026-06-25T15:30:00+05:30",
  targetReleaseWindow: "2026-06-28 22:00 IST",
  automationName: "Invoice Approval Dispatcher",
  environment: "Pre-production",
  scope:
    "Threshold routing, preferred vendor handling, manager approval controls, audit evidence, and release gate readiness.",
  controlObjectives: [
    "High-value invoices require manager approval before finance validation.",
    "Exception-flagged invoices cannot bypass approval controls.",
    "Routing changes must preserve audit evidence for approval decisions.",
  ],
  acceptanceCriteria: [
    "Preferred vendor invoices below USD 25,000 route to finance validation.",
    "Invoices at or above USD 25,000 route to manager approval.",
    "Invoices with duplicate or tax exception flags route to manual review.",
    "Every routing decision records threshold, vendor status, and approval path.",
  ],
};

export const baseTimeline: AgentTimelineStep[] = [
  {
    id: "timeline-001",
    sequence: 1,
    agentName: "Requirement Analyst",
    status: "COMPLETED",
    startedAt: "2026-06-26T08:40:00+05:30",
    completedAt: "2026-06-26T08:40:08+05:30",
    durationSeconds: 8,
    outcome:
      "Extracted business rules, acceptance criteria, workflow steps, assumptions, and missing information.",
  },
  {
    id: "timeline-002",
    sequence: 2,
    agentName: "Risk Mapper",
    status: "COMPLETED",
    startedAt: "2026-06-26T08:40:09+05:30",
    completedAt: "2026-06-26T08:40:15+05:30",
    durationSeconds: 6,
    outcome:
      "Calculated a critical risk score and mapped required release-gate coverage.",
  },
  {
    id: "timeline-003",
    sequence: 3,
    agentName: "Test Planner",
    status: "COMPLETED",
    startedAt: "2026-06-26T08:40:16+05:30",
    completedAt: "2026-06-26T08:40:26+05:30",
    durationSeconds: 10,
    outcome:
      "Generated five invoice approval tests across fast-path, controls, exceptions, and audit evidence.",
  },
  {
    id: "timeline-004",
    sequence: 4,
    agentName: "Execution Analyst",
    status: "REVIEW_REQUIRED",
    startedAt: "2026-06-26T08:41:00+05:30",
    completedAt: "2026-06-26T08:42:10+05:30",
    durationSeconds: 70,
    outcome:
      "Reviewed deterministic execution results: four passed tests and one critical failed test.",
  },
  {
    id: "timeline-005",
    sequence: 5,
    agentName: "Failure Investigator",
    status: "COMPLETED",
    startedAt: "2026-06-26T08:42:11+05:30",
    completedAt: "2026-06-26T08:42:35+05:30",
    durationSeconds: 24,
    outcome: "Diagnosed a missing high-value approval guard in the routing branch.",
  },
  {
    id: "timeline-006",
    sequence: 6,
    agentName: "Release Gate",
    status: "BLOCKED",
    startedAt: "2026-06-26T08:42:36+05:30",
    completedAt: "2026-06-26T08:42:42+05:30",
    durationSeconds: 6,
    outcome: "Blocked release pending fix, rerun, and human review.",
  },
  {
    id: "timeline-007",
    sequence: 7,
    agentName: "Evidence Reporter",
    status: "COMPLETED",
    startedAt: "2026-06-26T08:42:43+05:30",
    completedAt: "2026-06-26T08:42:50+05:30",
    durationSeconds: 7,
    outcome:
      "Prepared a structured evidence report preview for release governance review.",
  },
];
