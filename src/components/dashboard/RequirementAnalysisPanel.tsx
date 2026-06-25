import type { RequirementAnalysis } from "@/lib/types/releaseCheck";

interface RequirementAnalysisPanelProps {
  analysis: RequirementAnalysis;
}

export function RequirementAnalysisPanel({
  analysis,
}: RequirementAnalysisPanelProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
        Requirement analysis
      </p>
      <h2 className="mt-3 text-2xl font-semibold">
        Business rules and controls
      </h2>
      <p className="mt-3 leading-7 text-zinc-700">{analysis.summary}</p>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-zinc-500">Business rules</p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-zinc-700">
            {analysis.businessRules.map((rule) => (
              <li className="rounded-md bg-zinc-50 p-3" key={rule}>
                {rule}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-500">
            Affected workflow steps
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-zinc-700">
            {analysis.affectedWorkflowSteps.map((step) => (
              <li className="rounded-md bg-zinc-50 p-3" key={step}>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-zinc-500">
          Acceptance criteria
        </p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-zinc-700 md:grid-cols-2">
          {analysis.acceptanceCriteria.map((criterion) => (
            <li className="rounded-md bg-zinc-50 p-3" key={criterion}>
              {criterion}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid gap-3">
        {analysis.extractedRequirements.map((requirement) => (
          <div
            className="rounded-md border border-zinc-200 bg-zinc-50 p-4"
            key={requirement.id}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-zinc-950">
                  {requirement.id} - {requirement.workflowStep}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                  Source: {requirement.source}
                </p>
              </div>
              <span className="w-fit rounded-full border border-zinc-300 px-2.5 py-1 text-xs font-semibold text-zinc-600">
                {requirement.priority}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-700">
              {requirement.statement}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">Assumptions</p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-amber-950">
            {analysis.assumptions.map((assumption) => (
              <li key={assumption}>{assumption}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-700">
            Missing information
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-zinc-700">
            {analysis.missingInformation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
