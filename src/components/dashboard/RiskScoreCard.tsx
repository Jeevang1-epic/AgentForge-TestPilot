import type { RiskAssessment } from "@/lib/types/releaseCheck";

interface RiskScoreCardProps {
  assessment: RiskAssessment;
}

export function RiskScoreCard({ assessment }: RiskScoreCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-950 p-6 text-white shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
        Risk score
      </p>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-6xl font-semibold tracking-tight">
            {assessment.score}
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-rose-200">
            {assessment.level}
          </p>
        </div>
        <p className="max-w-md text-sm leading-6 text-zinc-300">
          {assessment.businessImpact}
        </p>
      </div>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-rose-500"
          style={{ width: `${assessment.score}%` }}
        />
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {assessment.factors.map((factor) => (
          <div className="rounded-md bg-white/8 p-4" key={factor.id}>
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-white">{factor.label}</p>
              <span className="rounded-full bg-white/12 px-2 py-1 text-xs font-semibold text-zinc-200">
                {factor.severity}/5
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              {factor.description}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-md border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
        {assessment.releaseRecommendation}
      </p>
    </div>
  );
}
