import type { RiskAssessment } from "@/lib/types/releaseCheck";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusPill } from "@/components/ui/StatusPill";

interface RiskScoreCardProps {
  assessment: RiskAssessment;
}

export function RiskScoreCard({ assessment }: RiskScoreCardProps) {
  return (
    <PremiumCard>
      <p className="premium-label">
        Risk score
      </p>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-7xl font-black tracking-[-0.08em] text-[var(--error)]">
            {assessment.score}
          </p>
          <StatusPill className="mt-3" variant="blocked">
            {assessment.level}
          </StatusPill>
        </div>
        <p className="max-w-md text-sm leading-7 text-[var(--secondary-text)]">
          {assessment.businessImpact}
        </p>
      </div>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#ede6df]">
        <div
          className="h-full rounded-full bg-[var(--error)]"
          style={{ width: `${assessment.score}%` }}
        />
      </div>
      <p className="mt-4 text-sm leading-7 text-[var(--secondary-text)]">
        {assessment.calculationSummary}
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {assessment.factors.map((factor) => (
          <div
            className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4"
            key={factor.id}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-black text-[var(--text)]">{factor.label}</p>
              <span className="rounded-full bg-white px-2 py-1 text-xs font-black text-[var(--primary)]">
                {factor.severity}/5
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--secondary-text)]">
              {factor.description}
            </p>
            <p className="mt-3 text-xs font-black uppercase tracking-[0.12em] text-[var(--primary)]">
              {factor.impactArea}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--secondary-text)]">
              {factor.mitigation}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-[#e3d8cc] bg-white/70 p-4">
        <p className="text-sm font-black text-[var(--text)]">
          Recommended coverage
        </p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--secondary-text)] sm:grid-cols-2">
          {assessment.recommendedCoverage.map((coverage) => (
            <li key={coverage}>{coverage}</li>
          ))}
        </ul>
      </div>
      <p className="mt-5 rounded-2xl border border-[#e4cfad] bg-[#fff4df] p-4 text-sm font-semibold leading-7 text-[var(--primary)]">
        {assessment.releaseRecommendation}
      </p>
    </PremiumCard>
  );
}
