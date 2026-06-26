import Link from "next/link";
import { AgentTimeline } from "@/components/dashboard/AgentTimeline";
import { EvidenceReportView } from "@/components/dashboard/EvidenceReportView";
import { ExecutionResults } from "@/components/dashboard/ExecutionResults";
import { FailureDiagnosisPanel } from "@/components/dashboard/FailureDiagnosisPanel";
import { HumanReviewPanel } from "@/components/dashboard/HumanReviewPanel";
import { RequirementAnalysisPanel } from "@/components/dashboard/RequirementAnalysisPanel";
import { RiskScoreCard } from "@/components/dashboard/RiskScoreCard";
import { TestPlanTable } from "@/components/dashboard/TestPlanTable";
import { UiPathMappingPanel } from "@/components/dashboard/UiPathMappingPanel";
import { runReleaseCheckPipeline } from "@/lib/orchestrator/releaseCheckOrchestrator";

const judgeDemoFlow = [
  "Requirement change enters.",
  "Agents analyze risk and generate tests.",
  "Execution detects a critical failure.",
  "Release is blocked for human review.",
  "Evidence report records the decision.",
];

export default function ReleaseCheckPage() {
  const releaseCheck = runReleaseCheckPipeline();
  const failedResult = releaseCheck.executionResults.find(
    (result) => result.status === "FAILED",
  );
  const passedCount = releaseCheck.executionResults.filter(
    (result) => result.status === "PASSED",
  ).length;

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-6 text-zinc-950 md:px-8">
      <section className="mx-auto max-w-7xl">
        <header className="grid gap-6 border-b border-zinc-200 pb-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <Link
              className="text-sm font-semibold text-emerald-800 hover:text-emerald-950"
              href="/"
            >
              AgentForge TestPilot
            </Link>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Project thesis
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              AI release gate for UiPath automations
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-700">
              A deterministic release-check dashboard that turns an invoice
              approval change request into requirements, risk scoring, test
              coverage, execution evidence, failure diagnosis, and a governed
              release decision.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-sm font-semibold text-zinc-500">
                  Demo scenario
                </p>
                <p className="mt-2 font-semibold text-zinc-950">
                  Invoice approval threshold routing
                </p>
              </div>
              <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-sm font-semibold text-zinc-500">
                  Release candidate
                </p>
                <p className="mt-2 font-semibold text-zinc-950">
                  {releaseCheck.metadata.releaseCandidateId}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-zinc-500">
              {releaseCheck.metadata.pipelineVersion} -{" "}
              {releaseCheck.metadata.dataSource}
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-zinc-950 p-6 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
              Judge Demo Flow
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Understand the full release story in under 60 seconds.
            </h2>
            <ol className="mt-5 grid gap-3">
              {judgeDemoFlow.map((step, index) => (
                <li
                  className="flex gap-3 rounded-md border border-white/10 bg-white/5 p-3 text-sm leading-6 text-zinc-200"
                  key={step}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-semibold text-zinc-950">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="mt-5 rounded-md border border-rose-300/40 bg-rose-400/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-200">
                Release gate decision
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {releaseCheck.humanReviewDecision.decision}
              </p>
              <p className="mt-2 text-sm leading-6 text-rose-100">
                {releaseCheck.humanReviewDecision.nextAction}
              </p>
            </div>
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
              <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-semibold text-amber-900">
                  What changed
                </p>
                <p className="mt-2 leading-6 text-amber-950">
                  Preferred vendor invoices under USD 25,000 can fast-path to
                  finance validation, but invoices at or above USD 25,000 must
                  still route to manager approval.
                </p>
              </div>
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

        <section className="mt-6">
          <UiPathMappingPanel />
        </section>
      </section>
    </main>
  );
}
