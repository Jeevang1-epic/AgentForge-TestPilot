import type { RequirementAnalysis } from "@/lib/types/releaseCheck";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusPill } from "@/components/ui/StatusPill";

interface RequirementAnalysisPanelProps {
  analysis: RequirementAnalysis;
}

export function RequirementAnalysisPanel({
  analysis,
}: RequirementAnalysisPanelProps) {
  return (
    <PremiumCard>
      <p className="premium-label">
        Requirement analysis
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--text)]">
        Business rules and controls
      </h2>
      <p className="mt-3 leading-7 text-[var(--secondary-text)]">
        {analysis.summary}
      </p>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div>
          <p className="text-sm font-black text-[var(--muted-text)]">
            Business rules
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--secondary-text)]">
            {analysis.businessRules.map((rule) => (
              <li
                className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-3"
                key={rule}
              >
                {rule}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-black text-[var(--muted-text)]">
            Affected workflow steps
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--secondary-text)]">
            {analysis.affectedWorkflowSteps.map((step) => (
              <li
                className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-3"
                key={step}
              >
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-black text-[var(--muted-text)]">
          Acceptance criteria
        </p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--secondary-text)] md:grid-cols-2">
          {analysis.acceptanceCriteria.map((criterion) => (
            <li
              className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-3"
              key={criterion}
            >
              {criterion}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid gap-3">
        {analysis.extractedRequirements.map((requirement) => (
          <div
            className="rounded-2xl border border-[#e3d8cc] bg-white/80 p-4"
            key={requirement.id}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-black text-[var(--text)]">
                  {requirement.id} - {requirement.workflowStep}
                </p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-[var(--muted-text)]">
                  Source: {requirement.source}
                </p>
              </div>
              <StatusPill variant="review">
                {requirement.priority}
              </StatusPill>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--secondary-text)]">
              {requirement.statement}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#e4cfad] bg-[#fff4df] p-4">
          <p className="text-sm font-black text-[var(--primary)]">
            Assumptions
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--secondary-text)]">
            {analysis.assumptions.map((assumption) => (
              <li key={assumption}>{assumption}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4">
          <p className="text-sm font-black text-[var(--muted-text)]">
            Missing information
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--secondary-text)]">
            {analysis.missingInformation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </PremiumCard>
  );
}
