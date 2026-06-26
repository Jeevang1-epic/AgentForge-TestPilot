import type { AgentTimelineStep } from "@/lib/types/releaseCheck";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusPill } from "@/components/ui/StatusPill";

interface AgentTimelineProps {
  timeline: AgentTimelineStep[];
}

function statusVariant(status: AgentTimelineStep["status"]) {
  if (status === "BLOCKED") {
    return "blocked";
  }

  if (status === "REVIEW_REQUIRED") {
    return "review";
  }

  return "passed";
}

export function AgentTimeline({ timeline }: AgentTimelineProps) {
  return (
    <PremiumCard>
      <p className="premium-label">
        Agent timeline
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--text)]">
        Local agent pipeline
      </h2>
      <div className="mt-6 grid gap-4">
        {timeline.map((step) => (
          <MotionReveal
            delay={step.sequence * 0.025}
            key={step.id}
            scale={0.99}
            y={14}
          >
            <div className="grid gap-4 rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4 sm:grid-cols-[auto_0.8fr_1fr]">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white text-sm font-black text-[var(--primary)] premium-soft-shadow">
                {step.sequence}
              </div>
              <div>
                <p className="font-black text-[var(--text)]">
                  {step.agentName}
                </p>
                <p className="mt-1 text-xs font-bold text-[var(--muted-text)]">
                  {step.durationSeconds}s execution window
                </p>
              </div>
              <div>
                <StatusPill variant={statusVariant(step.status)}>
                  {step.status}
                </StatusPill>
                <p className="mt-3 text-sm leading-6 text-[var(--secondary-text)]">
                  {step.outcome}
                </p>
                <p className="mt-2 text-xs font-bold text-[var(--muted-text)]">
                  {step.startedAt} to {step.completedAt}
                </p>
              </div>
            </div>
          </MotionReveal>
        ))}
      </div>
    </PremiumCard>
  );
}
