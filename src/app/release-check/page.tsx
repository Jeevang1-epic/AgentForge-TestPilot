import Link from "next/link";
import { AgentTimeline } from "@/components/dashboard/AgentTimeline";
import { EvidenceReportView } from "@/components/dashboard/EvidenceReportView";
import { ExecutionResults } from "@/components/dashboard/ExecutionResults";
import { FailureDiagnosisPanel } from "@/components/dashboard/FailureDiagnosisPanel";
import { HumanReviewPanel } from "@/components/dashboard/HumanReviewPanel";
import { RequirementAnalysisPanel } from "@/components/dashboard/RequirementAnalysisPanel";
import { RiskScoreCard } from "@/components/dashboard/RiskScoreCard";
import { TestPlanTable } from "@/components/dashboard/TestPlanTable";
import { runReleaseCheckPipeline } from "@/lib/orchestrator/releaseCheckOrchestrator";

export default function ReleaseCheckPage() {
  const releaseCheck = runReleaseCheckPipeline();
  const failedResult = releaseCheck.executionResults.find(
    (result) => result.status === "FAILED",
  );
  const passedCount = releaseCheck.executionResults.filter(
    (result) => result.status === "PASSED",
  ).length;

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
              {releaseCheck.metadata.runName} for{" "}
              {releaseCheck.metadata.scenario}.
            </p>
            <p className="mt-2 text-sm font-medium text-zinc-500">
              {releaseCheck.metadata.releaseCandidateId} -{" "}
              {releaseCheck.metadata.pipelineVersion} -{" "}
              {releaseCheck.metadata.dataSource}
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

        <section className="mt-6 grid gap-4 md:grid-cols-4">
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
              Tests reviewed
            </p>
            <p className="mt-2 text-xl font-semibold">
              {passedCount} passed / {releaseCheck.executionResults.length}{" "}
              total
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

        {failedResult ? (
          <section className="mt-6 rounded-lg border border-rose-200 bg-rose-50 p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-rose-700">
                  Failed test details
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-rose-950">
                  {failedResult.testCaseId}: {failedResult.testCaseTitle}
                </h2>
                <p className="mt-3 leading-7 text-rose-950">
                  {failedResult.errorSummary}
                </p>
              </div>
              <span className="w-fit rounded-full bg-rose-700 px-3 py-1 text-xs font-semibold text-white">
                Critical control failure
              </span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-md bg-white/70 p-4">
                <p className="text-sm font-semibold text-rose-900">Evidence</p>
                <p className="mt-2 leading-6 text-rose-950">
                  {failedResult.evidence}
                </p>
              </div>
              <div className="rounded-md bg-white/70 p-4">
                <p className="text-sm font-semibold text-rose-900">
                  Actual result
                </p>
                <p className="mt-2 leading-6 text-rose-950">
                  {failedResult.actualResult}
                </p>
              </div>
            </div>
          </section>
        ) : null}

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
          <RequirementAnalysisPanel
            analysis={releaseCheck.requirementAnalysis}
          />
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
