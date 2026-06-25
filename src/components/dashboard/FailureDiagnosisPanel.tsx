import type { FailureDiagnosis } from "@/lib/types/releaseCheck";

interface FailureDiagnosisPanelProps {
  diagnosis: FailureDiagnosis;
}

export function FailureDiagnosisPanel({
  diagnosis,
}: FailureDiagnosisPanelProps) {
  return (
    <div className="rounded-lg border border-rose-200 bg-rose-50 p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-rose-700">
        Failure diagnosis
      </p>
      <div className="mt-3 flex items-start justify-between gap-4">
        <h2 className="text-2xl font-semibold text-rose-950">
          {diagnosis.title}
        </h2>
        <span className="rounded-full bg-rose-700 px-3 py-1 text-xs font-semibold text-white">
          {diagnosis.severity}
        </span>
      </div>
      <div className="mt-5 grid gap-4">
        <div>
          <p className="text-sm font-semibold text-rose-900">Failed test</p>
          <p className="mt-1 text-rose-950">{diagnosis.failedTestCaseId}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-rose-900">
            Failed workflow step
          </p>
          <p className="mt-1 text-rose-950">{diagnosis.failedWorkflowStep}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-rose-900">Root cause</p>
          <p className="mt-1 leading-7 text-rose-950">
            {diagnosis.rootCause}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-rose-900">
            Business impact
          </p>
          <p className="mt-1 leading-7 text-rose-950">
            {diagnosis.businessImpact}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-rose-900">
            Reproduction summary
          </p>
          <p className="mt-1 leading-7 text-rose-950">
            {diagnosis.reproductionSummary}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-rose-900">
            Contributing signals
          </p>
          <ul className="mt-2 grid gap-2">
            {diagnosis.contributingSignals.map((signal) => (
              <li className="rounded-md bg-white/70 p-3 text-sm" key={signal}>
                {signal}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-rose-900">
            Recommended fixes
          </p>
          <ul className="mt-2 grid gap-2">
            {diagnosis.recommendedFixes.map((fix) => (
              <li className="rounded-md bg-white/70 p-3 text-sm" key={fix}>
                {fix}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
