import type { AgentTimelineStep } from "@/lib/types/releaseCheck";

interface AgentTimelineProps {
  timeline: AgentTimelineStep[];
}

function statusClassName(status: AgentTimelineStep["status"]) {
  if (status === "BLOCKED") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  if (status === "REVIEW_REQUIRED") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-emerald-200 bg-emerald-50 text-emerald-700";
}

export function AgentTimeline({ timeline }: AgentTimelineProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
        Agent timeline
      </p>
      <h2 className="mt-3 text-2xl font-semibold">Local agent pipeline</h2>
      <div className="mt-5 grid gap-3">
        {timeline.map((step) => (
          <div
            className="grid gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-[auto_0.8fr_1fr]"
            key={step.id}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
              {step.sequence}
            </div>
            <div>
              <p className="font-semibold text-zinc-950">{step.agentName}</p>
              <p className="mt-1 text-xs font-medium text-zinc-500">
                {step.durationSeconds}s execution window
              </p>
            </div>
            <div>
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClassName(
                  step.status,
                )}`}
              >
                {step.status}
              </span>
              <p className="mt-2 text-sm leading-6 text-zinc-700">
                {step.outcome}
              </p>
              <p className="mt-2 text-xs font-medium text-zinc-500">
                {step.startedAt} to {step.completedAt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
