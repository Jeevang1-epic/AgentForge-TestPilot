import type { EvidenceReport } from "@/lib/types/releaseCheck";

interface EvidenceReportViewProps {
  report: EvidenceReport;
}

export function EvidenceReportView({ report }: EvidenceReportViewProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
        Evidence report preview
      </p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{report.title}</h2>
          <p className="mt-2 text-sm font-medium text-zinc-500">
            {report.id} for {report.releaseCheckId}
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-500">
            Generated timestamp: {report.generatedAt}
          </p>
        </div>
        <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
          {report.finalStatus}
        </span>
      </div>
      <p className="mt-4 rounded-md border border-zinc-200 bg-zinc-50 p-4 leading-7 text-zinc-800">
        {report.executiveSummary}
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-5">
        {report.metrics.map((metric) => (
          <div
            className="rounded-md border border-zinc-200 bg-white p-4"
            key={metric.label}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {metric.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-zinc-950">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-500">Final status</p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">
            {report.finalStatus}
          </p>
        </div>
        <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-500">
            Release gate decision
          </p>
          <p className="mt-2 text-sm leading-6 text-zinc-800">
            {report.releaseGateDecision}
          </p>
        </div>
        <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-500">
            Human decision
          </p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">
            {report.humanDecision}
          </p>
        </div>
      </div>

      <p className="mt-5 leading-7 text-zinc-700">{report.summary}</p>

      <div className="mt-5 rounded-md border border-zinc-200 bg-zinc-50 p-4">
        <p className="font-semibold text-zinc-950">Requirement trace</p>
        <div className="mt-3 grid gap-3">
          {report.requirementTrace.map((item) => (
            <div
              className="rounded-md border border-zinc-200 bg-white p-3 text-sm"
              key={item.requirementId}
            >
              <p className="font-semibold text-zinc-950">
                {item.requirementId} - {item.workflowStep}
              </p>
              <p className="mt-2 leading-6 text-zinc-700">
                {item.requirement}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                Covered by {item.coveredBy.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
          <p className="font-semibold text-zinc-950">Risk assessment</p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-zinc-700">
            {report.riskAssessmentSummary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
          <p className="font-semibold text-zinc-950">Coverage summary</p>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-zinc-500">Total tests</dt>
              <dd className="mt-1 text-zinc-950">
                {report.coverageSummary.totalTests}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-500">Passed tests</dt>
              <dd className="mt-1 text-zinc-950">
                {report.coverageSummary.passedTests}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-500">Failed tests</dt>
              <dd className="mt-1 text-zinc-950">
                {report.coverageSummary.failedTests}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-500">
                Critical failures
              </dt>
              <dd className="mt-1 text-zinc-950">
                {report.coverageSummary.criticalFailures}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-sm leading-6 text-zinc-700">
            {report.coverageSummary.coverageAreas.join(", ")}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-md border border-rose-200 bg-rose-50 p-4">
        <p className="font-semibold text-rose-950">Failed test details</p>
        <div className="mt-3 grid gap-3">
          {report.failedTestDetails.map((test) => (
            <div className="rounded-md bg-white/75 p-3" key={test.testCaseId}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-semibold text-rose-950">
                  {test.testCaseId}: {test.title}
                </p>
                <span className="w-fit rounded-full bg-rose-700 px-2.5 py-1 text-xs font-semibold text-white">
                  {test.status}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-rose-950">
                {test.errorSummary}
              </p>
              <p className="mt-2 text-sm leading-6 text-rose-950">
                {test.actualResult}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-rose-700">
                {test.artifactRefs.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-md border border-zinc-200 bg-zinc-50 p-4">
        <p className="font-semibold text-zinc-950">Root cause</p>
        <p className="mt-2 text-sm leading-6 text-zinc-700">
          {report.rootCause}
        </p>
      </div>

      <div className="mt-5 rounded-md border border-zinc-200 bg-zinc-50 p-4">
        <p className="font-semibold text-zinc-950">UiPath proof mapping</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.uiPathProofMapping.map((mapping) => (
            <div
              className="rounded-md border border-zinc-200 bg-white p-3"
              key={mapping.surface}
            >
              <p className="font-semibold text-zinc-950">{mapping.surface}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">
                {mapping.purpose}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                {mapping.artifactPath}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        {report.sections.map((section) => (
          <div
            className="rounded-md border border-zinc-200 bg-zinc-50 p-4"
            key={section.title}
          >
            <p className="font-semibold text-zinc-950">{section.title}</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-zinc-700">
              {section.findings.map((finding) => (
                <li key={finding}>{finding}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-md border border-zinc-200 bg-white p-4">
        <p className="font-semibold text-zinc-950">
          Copy-ready markdown report
        </p>
        <pre className="mt-3 max-h-80 overflow-auto rounded-md bg-zinc-950 p-4 text-xs leading-6 text-zinc-200">
          {report.markdown}
        </pre>
      </div>
      <div className="mt-5 rounded-md bg-zinc-950 p-4 text-sm text-zinc-200">
        <p className="font-semibold text-white">Audit trail</p>
        <div className="mt-3 grid gap-2">
          {report.auditTrail.map((entry) => (
            <p key={entry}>{entry}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
