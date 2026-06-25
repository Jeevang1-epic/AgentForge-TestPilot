import Link from "next/link";
import { AgentTimeline } from "@/components/dashboard/AgentTimeline";
import { EvidenceReportView } from "@/components/dashboard/EvidenceReportView";
import { ExecutionResults } from "@/components/dashboard/ExecutionResults";
import { FailureDiagnosisPanel } from "@/components/dashboard/FailureDiagnosisPanel";
import { HumanReviewPanel } from "@/components/dashboard/HumanReviewPanel";
import { RiskScoreCard } from "@/components/dashboard/RiskScoreCard";
import { TestPlanTable } from "@/components/dashboard/TestPlanTable";
import { runReleaseCheckPipeline } from "@/lib/orchestrator/releaseCheckOrchestrator";

export default function ReleaseCheckPage() {
  const releaseCheck = runReleaseCheckPipeline();
  const failedResult = releaseCheck.executionResults.find(
    (result) => result.status === "FAILED",
  );

  return (
    <main className="min-h-screen px-4 py-6 text-zinc-950 md:px-8">
      <section className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-zinc-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              className="text-sm font-semibold text-emerald-800 hover:text-emerald-950"
              href="/"
            >
              AgentForge TestPilot
            </Link>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Invoice approval release command center
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-700">
              Local deterministic release governance for a threshold-routing
              change in the invoice approval automation.
            </p>
          </div>
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-5 py-4 text-rose-900">
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">
              Release decision
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {releaseCheck.humanReviewDecision.decision}
            </p>
          </div>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-zinc-500">Automation</p>
            <p className="mt-2 text-xl font-semibold">
              {releaseCheck.changeRequest.automationName}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-zinc-500">Target window</p>
            <p className="mt-2 text-xl font-semibold">
              {releaseCheck.changeRequest.targetReleaseWindow}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-zinc-500">
              Critical failed test
            </p>
            <p className="mt-2 text-xl font-semibold">
              {failedResult?.testCaseId ?? "None"}
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
                Change request
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                {releaseCheck.changeRequest.title}
              </h2>
              <p className="mt-4 leading-7 text-zinc-700">
                {releaseCheck.changeRequest.summary}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-md bg-zinc-50 p-4">
                <p className="text-sm font-semibold text-zinc-500">
                  Requester
                </p>
                <p className="mt-2 font-medium">
                  {releaseCheck.changeRequest.requester}
                </p>
              </div>
              <div className="rounded-md bg-zinc-50 p-4">
                <p className="text-sm font-semibold text-zinc-500">
                  Business owner
                </p>
                <p className="mt-2 font-medium">
                  {releaseCheck.changeRequest.businessOwner}
                </p>
              </div>
              <div className="rounded-md bg-zinc-50 p-4">
                <p className="text-sm font-semibold text-zinc-500">
                  Environment
                </p>
                <p className="mt-2 font-medium">
                  {releaseCheck.changeRequest.environment}
                </p>
              </div>
              <div className="rounded-md bg-zinc-50 p-4">
                <p className="text-sm font-semibold text-zinc-500">Scope</p>
                <p className="mt-2 font-medium">
                  {releaseCheck.changeRequest.scope}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <AgentTimeline timeline={releaseCheck.timeline} />
          <RiskScoreCard assessment={releaseCheck.riskAssessment} />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Extracted requirements
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Requirement analysis
            </h2>
            <p className="mt-3 leading-7 text-zinc-700">
              {releaseCheck.requirementAnalysis.summary}
            </p>
            <div className="mt-5 grid gap-3">
              {releaseCheck.requirementAnalysis.extractedRequirements.map(
                (requirement) => (
                  <div
                    className="rounded-md border border-zinc-200 bg-zinc-50 p-4"
                    key={requirement.id}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-zinc-950">
                        {requirement.id}
                      </p>
                      <span className="rounded-full border border-zinc-300 px-2.5 py-1 text-xs font-semibold text-zinc-600">
                        {requirement.priority}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-700">
                      {requirement.statement}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
          <TestPlanTable testCases={releaseCheck.testCases} />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <ExecutionResults results={releaseCheck.executionResults} />
          <FailureDiagnosisPanel diagnosis={releaseCheck.failureDiagnosis} />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <HumanReviewPanel decision={releaseCheck.humanReviewDecision} />
          <EvidenceReportView report={releaseCheck.evidenceReport} />
        </section>
      </section>
    </main>
  );
}
