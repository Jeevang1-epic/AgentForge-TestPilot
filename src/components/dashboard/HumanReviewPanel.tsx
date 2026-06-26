import type { HumanReviewDecision } from "@/lib/types/releaseCheck";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusPill } from "@/components/ui/StatusPill";

interface HumanReviewPanelProps {
  decision: HumanReviewDecision;
}

export function HumanReviewPanel({ decision }: HumanReviewPanelProps) {
  return (
    <PremiumCard>
      <p className="premium-label">
        Human review
      </p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-black tracking-[-0.05em] text-[var(--text)]">
          {decision.decision}
        </h2>
        <StatusPill variant="review">Manual review</StatusPill>
      </div>
      <p className="mt-3 leading-7 text-[var(--secondary-text)]">
        {decision.reason}
      </p>
      <div className="mt-5 grid gap-3">
        <div className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4">
          <p className="text-sm font-black text-[var(--muted-text)]">
            Review queue
          </p>
          <p className="mt-2 font-black text-[var(--text)]">
            {decision.reviewQueue}
          </p>
        </div>
        <div className="rounded-2xl border border-[#efb5ad] bg-[#fff7f5] p-4">
          <p className="text-sm font-black text-[var(--error)]">Next action</p>
          <p className="mt-2 leading-6 text-[var(--secondary-text)]">
            {decision.nextAction}
          </p>
        </div>
        <div className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4">
          <p className="text-sm font-black text-[var(--muted-text)]">
            Risk accepted
          </p>
          <p className="mt-2 font-black text-[var(--text)]">
            {decision.riskAccepted ? "Yes" : "No"}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-sm font-black text-[var(--muted-text)]">
          Required approvers
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {decision.requiredApprovers.map((approver) => (
            <span
              className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-sm font-black text-[var(--primary)]"
              key={approver}
            >
              {approver}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <p className="text-sm font-black text-[var(--muted-text)]">
          Release conditions
        </p>
        <ul className="mt-3 grid gap-2">
          {decision.releaseConditions.map((condition) => (
            <li
              className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-3 text-sm text-[var(--secondary-text)]"
              key={condition}
            >
              {condition}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-5 text-xs font-bold text-[var(--muted-text)]">
        Decided by {decision.decidedByAgent} at {decision.decidedAt}
      </p>
    </PremiumCard>
  );
}
