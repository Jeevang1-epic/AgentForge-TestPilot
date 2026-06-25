const mappingItems = [
  {
    label: "Test Manager",
    detail: "Requirement, test cases, execution results, and traceability matrix.",
    artifact: "uipath/test-manager",
  },
  {
    label: "API Workflows",
    detail: "Release-check retrieval, test-result submission, and evidence-report contracts.",
    artifact: "uipath/api-workflows",
  },
  {
    label: "Action Center",
    detail: "Human approval gate for blocked or review-required releases.",
    artifact: "uipath/action-center",
  },
  {
    label: "Coded Agents",
    detail: "Deterministic agent contracts for requirement, risk, test, execution, failure, and release-gate steps.",
    artifact: "uipath/coded-agents",
  },
];

export function UiPathMappingPanel() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            UiPath mapping
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            Proof layer ready for future integration
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-zinc-700">
            This dashboard currently runs on deterministic local data. The
            proof layer maps each release-check surface to future UiPath Test
            Cloud, Test Manager, API Workflows, Action Center, and Coded Agents
            integration points.
          </p>
        </div>
        <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">
          Real connection pending
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {mappingItems.map((item) => (
          <div
            className="rounded-md border border-zinc-200 bg-zinc-50 p-4"
            key={item.label}
          >
            <p className="font-semibold text-zinc-950">{item.label}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-700">
              {item.detail}
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
              {item.artifact}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
