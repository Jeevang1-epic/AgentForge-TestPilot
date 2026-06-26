import type { EvidenceReport } from "@/lib/types/releaseCheck";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusPill } from "@/components/ui/StatusPill";

interface EvidenceReportViewProps {
  report: EvidenceReport;
}

export function EvidenceReportView({ report }: EvidenceReportViewProps) {
  return (
    <PremiumCard>
      <p className="premium-label">Evidence report preview</p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-[-0.05em] text-[var(--text)]">
            {report.title}
          </h2>
          <p className="mt-2 text-sm font-bold text-[var(--muted-text)]">
            {report.id} for {report.releaseCheckId}
          </p>
          <p className="mt-1 text-sm font-bold text-[var(--muted-text)]">
            Generated timestamp: {report.generatedAt}
          </p>
        </div>
        <StatusPill variant="blocked">{report.finalStatus}</StatusPill>
      </div>

      <p className="mt-5 rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4 leading-7 text-[var(--secondary-text)]">
        {report.executiveSummary}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-5">
        {report.metrics.map((metric) => (
          <div
            className="rounded-2xl border border-[#e3d8cc] bg-white/80 p-4"
            key={metric.label}
          >
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--muted-text)]">
              {metric.label}
            </p>
            <p className="mt-2 text-2xl font-black text-[var(--text)]">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4">
          <p className="text-sm font-black text-[var(--muted-text)]">
            Final status
          </p>
          <p className="mt-2 text-lg font-black text-[var(--text)]">
            {report.finalStatus}
          </p>
        </div>
        <div className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4">
          <p className="text-sm font-black text-[var(--muted-text)]">
            Release gate decision
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--secondary-text)]">
            {report.releaseGateDecision}
          </p>
        </div>
        <div className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4">
          <p className="text-sm font-black text-[var(--muted-text)]">
            Human decision
          </p>
          <p className="mt-2 text-lg font-black text-[var(--text)]">
            {report.humanDecision}
          </p>
        </div>
      </div>

      <p className="mt-5 leading-7 text-[var(--secondary-text)]">
        {report.summary}
      </p>

      <div className="mt-5 rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4">
        <p className="font-black text-[var(--text)]">Requirement trace</p>
        <div className="mt-3 grid gap-3">
          {report.requirementTrace.map((item) => (
            <div
              className="rounded-2xl border border-[#e3d8cc] bg-white/80 p-3 text-sm"
              key={item.requirementId}
            >
              <p className="font-black text-[var(--text)]">
                {item.requirementId} - {item.workflowStep}
              </p>
              <p className="mt-2 leading-6 text-[var(--secondary-text)]">
                {item.requirement}
              </p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--primary)]">
                Covered by {item.coveredBy.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4">
          <p className="font-black text-[var(--text)]">Risk assessment</p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--secondary-text)]">
            {report.riskAssessmentSummary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4">
          <p className="font-black text-[var(--text)]">Coverage summary</p>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-black text-[var(--muted-text)]">
                Total tests
              </dt>
              <dd className="mt-1 text-[var(--text)]">
                {report.coverageSummary.totalTests}
              </dd>
            </div>
            <div>
              <dt className="font-black text-[var(--muted-text)]">
                Passed tests
              </dt>
              <dd className="mt-1 text-[var(--text)]">
                {report.coverageSummary.passedTests}
              </dd>
            </div>
            <div>
              <dt className="font-black text-[var(--muted-text)]">
                Failed tests
              </dt>
              <dd className="mt-1 text-[var(--text)]">
                {report.coverageSummary.failedTests}
              </dd>
            </div>
            <div>
              <dt className="font-black text-[var(--muted-text)]">
                Critical failures
              </dt>
              <dd className="mt-1 text-[var(--text)]">
                {report.coverageSummary.criticalFailures}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-sm leading-6 text-[var(--secondary-text)]">
            {report.coverageSummary.coverageAreas.join(", ")}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-[#efb5ad] bg-[#fff7f5] p-4">
        <p className="font-black text-[var(--error)]">Failed test details</p>
        <div className="mt-3 grid gap-3">
          {report.failedTestDetails.map((test) => (
            <div
              className="rounded-2xl border border-[#efb5ad] bg-white/75 p-3"
              key={test.testCaseId}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-black text-[var(--text)]">
                  {test.testCaseId}: {test.title}
                </p>
                <StatusPill variant="blocked">{test.status}</StatusPill>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--secondary-text)]">
                {test.errorSummary}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--secondary-text)]">
                {test.actualResult}
              </p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--error)]">
                {test.artifactRefs.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4">
          <p className="font-black text-[var(--text)]">Root cause</p>
          <p className="mt-2 text-sm leading-6 text-[var(--secondary-text)]">
            {report.rootCause}
          </p>
        </div>
        <div className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4">
          <p className="font-black text-[var(--text)]">UiPath proof mapping</p>
          <div className="mt-3 grid gap-3">
            {report.uiPathProofMapping.map((mapping) => (
              <div
                className="rounded-2xl border border-[#e3d8cc] bg-white/80 p-3"
                key={mapping.surface}
              >
                <p className="font-black text-[var(--text)]">
                  {mapping.surface}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--secondary-text)]">
                  {mapping.purpose}
                </p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--primary)]">
                  {mapping.artifactPath}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        {report.sections.map((section) => (
          <div
            className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4"
            key={section.title}
          >
            <p className="font-black text-[var(--text)]">{section.title}</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--secondary-text)]">
              {section.findings.map((finding) => (
                <li key={finding}>{finding}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-[#e3d8cc] bg-white/80 p-4">
        <p className="font-black text-[var(--text)]">
          Copy-ready markdown report
        </p>
        <pre className="mt-3 max-h-80 overflow-auto rounded-2xl border border-[#d8ccc0] bg-[#26221d] p-4 text-xs leading-6 text-[#f5efe8]">
          {report.markdown}
        </pre>
      </div>

      <div className="mt-5 rounded-2xl bg-[#26221d] p-4 text-sm text-[#f5efe8]">
        <p className="font-black text-white">Audit trail</p>
        <div className="mt-3 grid gap-2">
          {report.auditTrail.map((entry) => (
            <p key={entry}>{entry}</p>
          ))}
        </div>
      </div>
    </PremiumCard>
  );
}
