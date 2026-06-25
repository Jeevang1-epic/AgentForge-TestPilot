import type { AgentTimelineStep, ChangeRequest } from "@/lib/types/releaseCheck";

export const demoGeneratedAt = "2026-06-26T09:00:00+05:30";

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
    agentName: "Requirement Analyst",
    status: "COMPLETED",
    startedAt: "2026-06-26T08:40:00+05:30",
    completedAt: "2026-06-26T08:40:08+05:30",
    outcome: "Extracted release requirements and approval control objectives.",
  },
  {
    id: "timeline-002",
    agentName: "Risk Mapper",
    status: "COMPLETED",
    startedAt: "2026-06-26T08:40:09+05:30",
    completedAt: "2026-06-26T08:40:15+05:30",
    outcome: "Classified the change as critical due to approval bypass risk.",
  },
  {
    id: "timeline-003",
    agentName: "Test Planner",
    status: "COMPLETED",
    startedAt: "2026-06-26T08:40:16+05:30",
    completedAt: "2026-06-26T08:40:26+05:30",
    outcome: "Generated release-gate tests for threshold and exception routing.",
  },
  {
    id: "timeline-004",
    agentName: "Execution Analyst",
    status: "REVIEW_REQUIRED",
    startedAt: "2026-06-26T08:41:00+05:30",
    completedAt: "2026-06-26T08:42:10+05:30",
    outcome: "Found one critical failed test in high-value invoice routing.",
  },
  {
    id: "timeline-005",
    agentName: "Failure Investigator",
    status: "COMPLETED",
    startedAt: "2026-06-26T08:42:11+05:30",
    completedAt: "2026-06-26T08:42:35+05:30",
    outcome: "Diagnosed a missing high-value approval guard in the routing branch.",
  },
  {
    id: "timeline-006",
    agentName: "Release Gate",
    status: "BLOCKED",
    startedAt: "2026-06-26T08:42:36+05:30",
    completedAt: "2026-06-26T08:42:42+05:30",
    outcome: "Blocked release pending fix, rerun, and human review.",
  },
  {
    id: "timeline-007",
    agentName: "Evidence Reporter",
    status: "COMPLETED",
    startedAt: "2026-06-26T08:42:43+05:30",
    completedAt: "2026-06-26T08:42:50+05:30",
    outcome: "Prepared release evidence preview for submission review.",
  },
];
