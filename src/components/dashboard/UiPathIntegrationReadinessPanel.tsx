import type { ReleaseCheck } from "@/lib/types/releaseCheck";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusPill } from "@/components/ui/StatusPill";

interface UiPathIntegrationReadinessPanelProps {
  releaseCheck: ReleaseCheck;
}

const codedAgentSteps = [
  "Requirement Analyst",
  "Risk Mapper",
  "Test Planner",
  "Failure Investigator",
  "Release Gate",
];

export function UiPathIntegrationReadinessPanel({
  releaseCheck,
}: UiPathIntegrationReadinessPanelProps) {
  const failedResult = releaseCheck.executionResults.find(
    (result) => result.status === "FAILED",
  );

  const mappings = [
    {
      title: "Test Manager mapping",
      body: `${releaseCheck.requirementAnalysis.extractedRequirements.length} requirements, ${releaseCheck.testCases.length} test cases, ${releaseCheck.executionResults.length} execution records, and traceability to ${releaseCheck.evidenceReport.id}.`,
      detail: "Requirements, test cases, execution results, and release evidence stay linked.",
    },
    {
      title: "API Workflow mapping",
      body: "getReleaseCheck, submitTestResults, and generateEvidenceReport request-response contracts are represented in the proof pack.",
      detail: "Integration-ready examples use deterministic local data only.",
    },
    {
      title: "Action Center mapping",
      body: `${releaseCheck.humanReviewDecision.reviewQueue} receives the blocked release with risk score ${releaseCheck.riskAssessment.score} and failed test ${failedResult?.testCaseId ?? "none"}.`,
      detail: "Human review is modeled without sending real tasks.",
    },
    {
      title: "Coded Agent mapping",
      body: codedAgentSteps.join(", "),
      detail: "Deterministic agent responsibilities are shaped for governed implementation later.",
    },
  ];

  return (
    <PremiumCard
      className="scroll-mt-28"
      data-screenshot="uipath-integration-readiness"
      id="uipath-integration-readiness"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="premium-label">UiPath Integration Readiness</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--text)]">
            Platform proof pack is ready for review.
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-[var(--secondary-text)]">
            The dashboard now mirrors the integration proof artifacts for Test
            Manager, API Workflows, Action Center, and Coded Agents while
            keeping the current run deterministic and local.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusPill variant="ready">Proof layer ready</StatusPill>
          <StatusPill variant="pending">Real connection pending</StatusPill>
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-2 xl:grid-cols-4">
        {mappings.map((mapping) => (
          <div
            className="min-w-0 rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4"
            key={mapping.title}
          >
            <p className="font-black text-[var(--text)]">{mapping.title}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--secondary-text)]">
              {mapping.body}
            </p>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-[var(--primary)]">
              {mapping.detail}
            </p>
          </div>
        ))}
      </div>
    </PremiumCard>
  );
}
