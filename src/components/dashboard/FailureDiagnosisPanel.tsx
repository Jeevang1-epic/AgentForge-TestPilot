import type { FailureDiagnosis } from "@/lib/types/releaseCheck";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusPill } from "@/components/ui/StatusPill";

interface FailureDiagnosisPanelProps {
  diagnosis: FailureDiagnosis;
}

export function FailureDiagnosisPanel({
  diagnosis,
}: FailureDiagnosisPanelProps) {
  return (
    <PremiumCard tone="danger">
      <p className="premium-label">
        Failure diagnosis
      </p>
      <div className="mt-3 flex items-start justify-between gap-4">
        <h2 className="text-3xl font-black tracking-[-0.05em] text-[var(--text)]">
          {diagnosis.title}
        </h2>
        <StatusPill variant="blocked">
          {diagnosis.severity}
        </StatusPill>
      </div>
      <div className="mt-5 grid gap-4">
        <div>
          <p className="text-sm font-black text-[var(--error)]">Failed test</p>
          <p className="mt-1 text-[var(--text)]">{diagnosis.failedTestCaseId}</p>
        </div>
        <div>
          <p className="text-sm font-black text-[var(--error)]">
            Failed workflow step
          </p>
          <p className="mt-1 text-[var(--text)]">
            {diagnosis.failedWorkflowStep}
          </p>
        </div>
        <div>
          <p className="text-sm font-black text-[var(--error)]">Root cause</p>
          <p className="mt-1 leading-7 text-[var(--secondary-text)]">
            {diagnosis.rootCause}
          </p>
        </div>
        <div>
          <p className="text-sm font-black text-[var(--error)]">
            Business impact
          </p>
          <p className="mt-1 leading-7 text-[var(--secondary-text)]">
            {diagnosis.businessImpact}
          </p>
        </div>
        <div>
          <p className="text-sm font-black text-[var(--error)]">
            Reproduction summary
          </p>
          <p className="mt-1 leading-7 text-[var(--secondary-text)]">
            {diagnosis.reproductionSummary}
          </p>
        </div>
        <div>
          <p className="text-sm font-black text-[var(--error)]">
            Contributing signals
          </p>
          <ul className="mt-2 grid gap-2">
            {diagnosis.contributingSignals.map((signal) => (
              <li
                className="rounded-2xl border border-[#efb5ad] bg-white/75 p-3 text-sm text-[var(--secondary-text)]"
                key={signal}
              >
                {signal}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-black text-[var(--error)]">
            Recommended fixes
          </p>
          <ul className="mt-2 grid gap-2">
            {diagnosis.recommendedFixes.map((fix) => (
              <li
                className="rounded-2xl border border-[#efb5ad] bg-white/75 p-3 text-sm text-[var(--secondary-text)]"
                key={fix}
              >
                {fix}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PremiumCard>
  );
}
