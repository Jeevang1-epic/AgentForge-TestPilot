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
            {report.id} generated at {report.generatedAt}
          </p>
        </div>
        <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
          {report.releaseDecision}
        </span>
      </div>
      <p className="mt-4 leading-7 text-zinc-700">{report.summary}</p>
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
