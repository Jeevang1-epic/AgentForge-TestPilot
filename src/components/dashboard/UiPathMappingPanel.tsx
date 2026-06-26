import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusPill } from "@/components/ui/StatusPill";

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
    <PremiumCard>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="premium-label">
            UiPath mapping
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--text)]">
            Proof layer ready for future integration
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-[var(--secondary-text)]">
            This dashboard currently runs on deterministic local data. The
            proof layer maps each release-check surface to future UiPath Test
            Cloud, Test Manager, API Workflows, Action Center, and Coded Agents
            integration points.
          </p>
        </div>
        <StatusPill variant="pending">
          Real connection pending
        </StatusPill>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {mappingItems.map((item) => (
          <div
            className="rounded-2xl border border-[#e3d8cc] bg-[var(--surface-low)] p-4"
            key={item.label}
          >
            <p className="font-black text-[var(--text)]">{item.label}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--secondary-text)]">
              {item.detail}
            </p>
            <p className="mt-3 text-xs font-black uppercase tracking-[0.12em] text-[var(--primary)]">
              {item.artifact}
            </p>
          </div>
        ))}
      </div>
    </PremiumCard>
  );
}
