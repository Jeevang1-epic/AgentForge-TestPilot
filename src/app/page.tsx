import Link from "next/link";

const governanceSteps = [
  "Requirement analysis",
  "Business risk scoring",
  "Generated release tests",
  "Execution review",
  "Failure diagnosis",
  "Release gate evidence",
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 lg:px-10">
        <nav className="flex items-center justify-between border-b border-zinc-200 pb-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              UiPath AgentHack Track 3
            </p>
            <p className="mt-1 text-lg font-semibold text-zinc-950">
              AgentForge TestPilot
            </p>
          </div>
          <Link
            className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            href="/release-check"
          >
            Open release check
          </Link>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Agentic QA command center
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-zinc-950 md:text-7xl">
              Govern invoice automation releases before they reach production.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
              AgentForge TestPilot turns a release change request into a
              deterministic QA review: requirements, risk score, test plan,
              execution analysis, failure diagnosis, release gate, and evidence
              report.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                href="/release-check"
              >
                View invoice release dashboard
              </Link>
              <a
                className="rounded-md border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:border-emerald-700 hover:text-emerald-800"
                href="https://github.com/Jeevang1-epic/AgentForge-TestPilot"
              >
                Repository
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-900/5">
            <div className="flex items-start justify-between gap-6 border-b border-zinc-200 pb-5">
              <div>
                <p className="text-sm font-semibold text-zinc-500">
                  Demo scenario
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-zinc-950">
                  Invoice approval automation release check
                </h2>
              </div>
              <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-rose-700">
                Blocked
              </span>
            </div>

            <div className="mt-6 grid gap-3">
              {governanceSteps.map((step, index) => (
                <div
                  className="flex items-center gap-4 rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3"
                  key={step}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="font-medium text-zinc-800">{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-md bg-zinc-950 p-5 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
                Critical finding
              </p>
              <p className="mt-3 text-xl font-semibold">
                A high-value invoice bypasses manager approval after a
                threshold-routing change.
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                The local agent pipeline blocks the release and prepares
                evidence for human review.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
