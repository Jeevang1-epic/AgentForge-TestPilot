import Link from "next/link";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { PremiumShell } from "@/components/ui/PremiumShell";
import { StatusPill } from "@/components/ui/StatusPill";

const previewBars = [36, 54, 42, 68, 47, 76, 58, 84, 62, 72, 91, 65];

const featureCards = [
  {
    label: "Risk Scoring",
    summary:
      "Weighted evaluation of financial controls, threshold routing, exception handling, and audit readiness before release.",
  },
  {
    label: "Evidence Reporting",
    summary:
      "Submission-ready traceability across requirements, risk, tests, failed controls, human review, and UiPath proof mapping.",
  },
  {
    label: "Human Review",
    summary:
      "Blocked releases are routed into an explicit review path with approvers, release conditions, and next actions.",
  },
  {
    label: "UiPath Proof Layer",
    summary:
      "Contract-ready mapping for Test Manager, API Workflows, Action Center, and governed Coded Agent steps.",
  },
];

export default function Home() {
  return (
    <PremiumShell active="home">
      <section
        className="flex flex-1 flex-col items-center px-2 pb-16 pt-20 text-center lg:pt-28"
        data-screenshot="homepage-hero"
      >
        <MotionReveal className="flex flex-col items-center">
          <StatusPill variant="pending">
            Current status: local deterministic prototype with UiPath proof
            layer
          </StatusPill>

          <h1 className="mt-8 max-w-5xl text-5xl font-black tracking-[-0.055em] text-[var(--text)] md:text-7xl">
            Deterministic release governance for enterprise automation.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--secondary-text)] md:text-xl">
            Agentic QA and evidence-backed approval readiness for
            mission-critical invoice workflows. Built for calm release
            decisions, explainable controls, and portfolio-safe UiPath proof
            planning.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              className="rounded-full bg-[var(--primary-container)] px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-[var(--primary)] transition hover:bg-[var(--primary-soft)]"
              href="/release-check"
            >
              Enter Release Dashboard
            </Link>
            <Link
              className="rounded-full border border-[var(--border)] bg-white/70 px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-[var(--secondary-text)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
              href="#proof-layer"
            >
              View Proof Layer
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal
          className="mt-16 w-full max-w-6xl"
          delay={0.1}
          scale={0.98}
          y={26}
        >
          <PremiumCard className="p-3 text-left" tone="low">
            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface-card)]">
              <div className="flex items-center gap-2 border-b border-[#e4dbd2] px-5 py-4">
                <span className="h-2.5 w-2.5 rounded-full bg-[#e7d7c0]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#dcc7aa]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#c5a880]" />
                <span className="ml-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted-text)]">
                  Invoice release command center
                </span>
              </div>

              <div className="grid gap-0 overflow-hidden rounded-b-[20px] bg-[#314746] p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
                <div className="rounded-[22px] border border-white/25 bg-white/94 p-6 premium-shadow">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="premium-label">Risk score</p>
                      <p className="mt-2 text-5xl font-black tracking-[-0.06em] text-[var(--error)]">
                        94
                      </p>
                    </div>
                    <StatusPill variant="blocked">Blocked</StatusPill>
                  </div>
                  <div className="mt-8 flex h-44 items-end gap-2 border-b border-l border-[#ded5ca] px-3 pb-4">
                    {previewBars.map((bar, index) => (
                      <div
                        className="w-full rounded-t-md bg-[var(--primary-soft)]"
                        key={bar + index}
                        style={{ height: `${bar}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-5 grid gap-3 text-sm text-[var(--secondary-text)] sm:grid-cols-3">
                    <span>5 tests generated</span>
                    <span>4 passed</span>
                    <span>1 critical failed</span>
                  </div>
                </div>

                <div className="grid gap-4 bg-white/10 p-0 lg:p-6">
                  <div className="rounded-[22px] border border-white/20 bg-white/92 p-5">
                    <p className="premium-label">Critical finding</p>
                    <p className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--text)]">
                      High-value invoice bypassed manager approval.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[var(--secondary-text)]">
                      The release gate blocks deployment and prepares evidence
                      for human review.
                    </p>
                  </div>
                  <div className="rounded-[22px] border border-white/20 bg-white/92 p-5">
                    <p className="premium-label">Evidence readiness</p>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#e7ded4]">
                      <div className="h-full w-[98%] rounded-full bg-[var(--primary-container)]" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-[var(--secondary-text)]">
                      Report preview and traceability are ready for review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </PremiumCard>
        </MotionReveal>
      </section>

      <section
        className="grid gap-5 px-2 pb-16 md:grid-cols-2 xl:grid-cols-4"
        id="documentation"
      >
        {featureCards.map((feature, index) => (
          <MotionReveal delay={index * 0.04} key={feature.label} y={22}>
            <PremiumCard hover>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-low)] text-sm font-black text-[var(--primary)]">
                {feature.label
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>
              <h2 className="mt-8 text-2xl font-black tracking-[-0.04em] text-[var(--text)]">
                {feature.label}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--secondary-text)]">
                {feature.summary}
              </p>
            </PremiumCard>
          </MotionReveal>
        ))}
      </section>

      <section
        className="grid items-center gap-8 border-t border-[var(--border)] px-2 py-20 lg:grid-cols-[0.9fr_1.1fr]"
        id="proof-layer"
      >
        <MotionReveal y={24}>
          <PremiumCard className="min-h-[360px] bg-[linear-gradient(90deg,rgba(114,91,56,0.05)_1px,transparent_1px),linear-gradient(rgba(114,91,56,0.05)_1px,transparent_1px)] bg-[length:28px_28px]">
            <div className="mx-auto flex max-w-md flex-col gap-10 pt-6">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--primary-container)] px-6 py-4 text-sm font-black text-[var(--primary)] premium-soft-shadow">
                UiPath Orchestrator: execution layer
              </div>
              <div className="ml-10 rounded-xl border border-[var(--border)] bg-white px-6 py-4 text-sm font-black text-[var(--primary)] premium-soft-shadow">
                Contract proof layer
              </div>
              <div className="mr-10 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] px-6 py-4 text-sm font-black text-[var(--primary)] premium-soft-shadow">
                AgentForge TestPilot: governance layer
              </div>
            </div>
          </PremiumCard>
        </MotionReveal>

        <MotionReveal delay={0.08} y={24}>
          <p className="premium-label">Contract-only connection</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-[-0.05em] text-[var(--text)] md:text-5xl">
            UiPath alignment without claiming a live integration.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--secondary-text)]">
            The proof layer maps deterministic release governance to future
            Test Manager, API Workflows, Action Center, and Coded Agent
            surfaces. Real connectivity remains pending secure implementation.
          </p>
          <div className="mt-8 grid gap-3 text-sm font-semibold text-[var(--secondary-text)]">
            <span>
              Contract-ready proof artifacts are included in the repository.
            </span>
            <span>
              Release evidence stays local and deterministic in this prototype.
            </span>
            <span>
              No secrets, external services, or fake UiPath live calls are used.
            </span>
          </div>
        </MotionReveal>
      </section>

      <footer className="flex flex-col gap-4 border-t border-[var(--border)] px-2 py-8 text-sm text-[var(--muted-text)] md:flex-row md:items-center md:justify-between">
        <p className="font-bold text-[var(--primary)]">AgentForge TestPilot</p>
        <p>Enterprise release governance prototype.</p>
      </footer>
    </PremiumShell>
  );
}
