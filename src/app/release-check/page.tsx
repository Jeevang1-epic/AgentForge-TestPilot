import Link from "next/link";
import { AgentTimeline } from "@/components/dashboard/AgentTimeline";
import { EvidenceReportView } from "@/components/dashboard/EvidenceReportView";
import { ExecutionResults } from "@/components/dashboard/ExecutionResults";
import { FailureDiagnosisPanel } from "@/components/dashboard/FailureDiagnosisPanel";
import { HumanReviewPanel } from "@/components/dashboard/HumanReviewPanel";
import { RequirementAnalysisPanel } from "@/components/dashboard/RequirementAnalysisPanel";
import { RiskScoreCard } from "@/components/dashboard/RiskScoreCard";
import { TestPlanTable } from "@/components/dashboard/TestPlanTable";
import { UiPathIntegrationReadinessPanel } from "@/components/dashboard/UiPathIntegrationReadinessPanel";
import { UiPathMappingPanel } from "@/components/dashboard/UiPathMappingPanel";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { PremiumShell } from "@/components/ui/PremiumShell";
import { StatusPill } from "@/components/ui/StatusPill";
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
  const failedCount = releaseCheck.executionResults.filter(
    (result) => result.status === "FAILED",
  ).length;
  const criticalFailureCount = releaseCheck.executionResults.filter(
    (result) => result.status === "FAILED" && result.critical,
  ).length;

  return (
    <PremiumShell active="governance">
      <section className="px-2 pb-20 pt-16">
        <Link
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--secondary-text)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
          href="/"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Home
        </Link>

        <MotionReveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="premium-label">Release governance</span>
              <span className="text-sm font-black text-[var(--muted-text)]">
                {releaseCheck.metadata.releaseCandidateId}
              </span>
              <StatusPill variant="blocked">
                {releaseCheck.humanReviewDecision.decision}
              </StatusPill>
            </div>
            <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] text-[var(--text)] md:text-7xl">
              Release governance check
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--secondary-text)]">
              {releaseCheck.metadata.runName} for{" "}
              {releaseCheck.metadata.scenario}. The deterministic pipeline
              found a high-value invoice approval bypass and prepared evidence
              for human review.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="rounded-full border border-[var(--border)] bg-white/70 px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-[var(--secondary-text)]"
              href="#evidence-report"
            >
              View Evidence
            </a>
            <a
              className="rounded-full bg-[var(--error)] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white"
              href="#human-review"
            >
              Review Release
            </a>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08} scale={0.985} y={26}>
          <PremiumCard
            className="mt-12 p-8 lg:p-12"
            data-screenshot="release-critical-failure"
            tone="danger"
          >
            <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#efb5ad] bg-[var(--error-soft)] text-3xl font-black text-[var(--error)]">
                !
              </div>
              <div>
                <StatusPill variant="blocked">
                  Critical failure detected
                </StatusPill>
                <h2 className="mt-5 max-w-5xl text-4xl font-black tracking-[-0.055em] text-[var(--error)] md:text-5xl">
                  Critical Failure Detected - Needs Human Review
                </h2>
                <p className="mt-5 max-w-4xl text-xl leading-9 text-[var(--secondary-text)]">
                  {failedResult?.errorSummary ??
                    "High-value invoice bypassed manager approval in pre-production."}{" "}
                  The release gate is blocked until remediation, rerun evidence,
                  and finance governance review are complete.
                </p>
              </div>
            </div>
          </PremiumCard>
        </MotionReveal>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <MotionReveal delay={0.02} scale={0.98} y={24}>
            <PremiumCard>
              <p className="premium-label">Overall risk score</p>
              <p className="mt-8 text-6xl font-black tracking-[-0.07em] text-[var(--error)]">
                {releaseCheck.riskAssessment.score}
                <span className="ml-2 text-2xl text-[var(--secondary-text)]">
                  / 100
                </span>
              </p>
              <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#ede6df]">
                <div
                  className="h-full rounded-full bg-[var(--error)]"
                  style={{ width: `${releaseCheck.riskAssessment.score}%` }}
                />
              </div>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.1em] text-[var(--error)]">
                {releaseCheck.riskAssessment.level} risk
              </p>
            </PremiumCard>
          </MotionReveal>

          <MotionReveal delay={0.06} scale={0.98} y={24}>
            <PremiumCard>
              <p className="premium-label">Test coverage</p>
              <p className="mt-8 text-6xl font-black tracking-[-0.07em] text-[var(--primary)]">
                {releaseCheck.testCases.length}
              </p>
              <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#ede6df]">
                <div className="h-full w-full rounded-full bg-[var(--primary)]" />
              </div>
              <p className="mt-4 text-sm font-bold text-[var(--muted-text)]">
                Release-gate cases generated from requirements.
              </p>
            </PremiumCard>
          </MotionReveal>

          <MotionReveal delay={0.1} scale={0.98} y={24}>
            <PremiumCard>
              <p className="premium-label">Failed tests</p>
              <p className="mt-8 text-6xl font-black tracking-[-0.07em] text-[var(--error)]">
                {failedCount}
              </p>
              <p className="mt-6 text-sm font-bold text-[var(--secondary-text)]">
                {passedCount} passed, {criticalFailureCount} critical failure.
              </p>
              <StatusPill className="mt-4" variant="blocked">
                {failedResult?.testCaseId ?? "No failed test"}
              </StatusPill>
            </PremiumCard>
          </MotionReveal>

          <MotionReveal delay={0.14} scale={0.98} y={24}>
            <PremiumCard>
              <p className="premium-label">Release gate status</p>
              <p className="mt-8 text-4xl font-black tracking-[-0.05em] text-[var(--error)]">
                Blocked
              </p>
              <p className="mt-6 text-sm leading-7 text-[var(--secondary-text)]">
                Evidence report is ready. Human review is required before any
                production release decision.
              </p>
              <StatusPill className="mt-4" variant="pending">
                Real UiPath connection pending
              </StatusPill>
            </PremiumCard>
          </MotionReveal>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <MotionReveal y={24}>
            <AgentTimeline timeline={releaseCheck.timeline} />
          </MotionReveal>

          <div className="grid gap-6">
            <MotionReveal delay={0.04} y={24}>
              <PremiumCard>
                <p className="premium-label">Judge Demo Flow</p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-[var(--text)]">
                  Full release story in under 60 seconds.
                </h2>
                <ol className="mt-6 grid gap-3">
                  {judgeDemoFlow.map((step, index) => (
                    <li
                      className="flex gap-3 rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4 text-sm font-semibold leading-6 text-[var(--secondary-text)]"
                      key={step}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary-container)] text-xs font-black text-[var(--primary)]">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </PremiumCard>
            </MotionReveal>

            <MotionReveal delay={0.08} y={24}>
              <PremiumCard tone="raised">
                <p className="premium-label">Release context</p>
                <dl className="mt-6 grid gap-4 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[var(--muted-text)]">Automation</dt>
                    <dd className="font-black text-[var(--text)]">
                      {releaseCheck.changeRequest.automationName}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[var(--muted-text)]">Environment</dt>
                    <dd className="font-black text-[var(--text)]">
                      {releaseCheck.changeRequest.environment}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[var(--muted-text)]">Target window</dt>
                    <dd className="font-black text-[var(--text)]">
                      {releaseCheck.changeRequest.targetReleaseWindow}
                    </dd>
                  </div>
                </dl>
              </PremiumCard>
            </MotionReveal>
          </div>
        </section>

        {failedResult ? (
          <section className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <MotionReveal y={24}>
              <PremiumCard tone="danger">
                <p className="premium-label">Failed test details</p>
                <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-[var(--text)]">
                  High-value invoice bypassed manager approval
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--secondary-text)]">
                  {failedResult.actualResult}
                </p>
                <div className="mt-6 rounded-2xl border border-[#efb5ad] bg-white/80 p-5">
                  <p className="text-sm font-black text-[var(--error)]">
                    {failedResult.testCaseId}: {failedResult.testCaseTitle}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--secondary-text)]">
                    {failedResult.evidence}
                  </p>
                </div>
              </PremiumCard>
            </MotionReveal>

            <MotionReveal delay={0.06} y={24}>
              <PremiumCard>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="premium-label">Failure diagnosis trace</p>
                  <StatusPill variant="blocked">
                    {releaseCheck.failureDiagnosis.severity}
                  </StatusPill>
                </div>
                <pre className="mt-6 overflow-auto rounded-2xl border border-[#e3d8cc] bg-[#f4eeee] p-5 text-sm leading-7 text-[var(--secondary-text)]">
                  <code>{`ERROR: Approval_Control_Bypass
Location: invoice-routing/preferred-vendor-threshold
Context:
{
  "invoice_amount": "USD 48,500",
  "preferred_vendor": true,
  "manager_approval_required": true,
  "actual_route": "Finance validation",
  "expected_route": "Manager approval"
}
Root cause:
${releaseCheck.failureDiagnosis.rootCause}`}</code>
                </pre>
              </PremiumCard>
            </MotionReveal>
          </section>
        ) : null}

        <MotionReveal
          className="mt-8 rounded-[28px] border border-[var(--border)] bg-white/72 p-4 premium-soft-shadow"
          y={24}
        >
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <RequirementAnalysisPanel
              analysis={releaseCheck.requirementAnalysis}
            />
            <RiskScoreCard assessment={releaseCheck.riskAssessment} />
          </div>
        </MotionReveal>

        <MotionReveal className="mt-8" y={24}>
          <TestPlanTable testCases={releaseCheck.testCases} />
        </MotionReveal>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <MotionReveal y={24}>
            <ExecutionResults results={releaseCheck.executionResults} />
          </MotionReveal>
          <MotionReveal delay={0.06} y={24}>
            <FailureDiagnosisPanel diagnosis={releaseCheck.failureDiagnosis} />
          </MotionReveal>
        </section>

        <section
          className="mt-8 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]"
          id="human-review"
        >
          <MotionReveal y={24}>
            <HumanReviewPanel decision={releaseCheck.humanReviewDecision} />
          </MotionReveal>
          <MotionReveal delay={0.06} y={24}>
            <EvidenceReportView report={releaseCheck.evidenceReport} />
          </MotionReveal>
        </section>

        <MotionReveal className="mt-8" y={24}>
          <UiPathIntegrationReadinessPanel releaseCheck={releaseCheck} />
        </MotionReveal>

        <MotionReveal className="mt-8" y={24}>
          <UiPathMappingPanel />
        </MotionReveal>
      </section>
    </PremiumShell>
  );
}
