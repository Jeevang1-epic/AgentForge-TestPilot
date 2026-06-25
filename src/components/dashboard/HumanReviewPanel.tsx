import type { HumanReviewDecision } from "@/lib/types/releaseCheck";

interface HumanReviewPanelProps {
  decision: HumanReviewDecision;
}

export function HumanReviewPanel({ decision }: HumanReviewPanelProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
        Human review
      </p>
      <h2 className="mt-3 text-2xl font-semibold">{decision.decision}</h2>
      <p className="mt-3 leading-7 text-zinc-700">{decision.reason}</p>
      <div className="mt-5 grid gap-3">
        <div className="rounded-md bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-500">Review queue</p>
          <p className="mt-2 font-medium text-zinc-950">
            {decision.reviewQueue}
          </p>
        </div>
        <div className="rounded-md border border-rose-200 bg-rose-50 p-4">
          <p className="text-sm font-semibold text-rose-700">Next action</p>
          <p className="mt-2 leading-6 text-rose-950">
            {decision.nextAction}
          </p>
        </div>
        <div className="rounded-md bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-500">Risk accepted</p>
          <p className="mt-2 font-medium text-zinc-950">
            {decision.riskAccepted ? "Yes" : "No"}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-sm font-semibold text-zinc-500">
          Required approvers
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {decision.requiredApprovers.map((approver) => (
            <span
              className="rounded-full border border-zinc-300 px-3 py-1 text-sm font-semibold text-zinc-700"
              key={approver}
            >
              {approver}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <p className="text-sm font-semibold text-zinc-500">
          Release conditions
        </p>
        <ul className="mt-3 grid gap-2">
          {decision.releaseConditions.map((condition) => (
            <li className="rounded-md bg-zinc-50 p-3 text-sm" key={condition}>
              {condition}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-5 text-xs font-medium text-zinc-500">
        Decided by {decision.decidedByAgent} at {decision.decidedAt}
      </p>
    </div>
  );
}
