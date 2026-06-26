import type { TestExecutionResult } from "@/lib/types/releaseCheck";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusPill } from "@/components/ui/StatusPill";

interface ExecutionResultsProps {
  results: TestExecutionResult[];
}

function statusVariant(status: TestExecutionResult["status"]) {
  if (status === "FAILED") {
    return "blocked";
  }

  if (status === "SKIPPED") {
    return "pending";
  }

  return "passed";
}

export function ExecutionResults({ results }: ExecutionResultsProps) {
  const passedCount = results.filter((result) => result.status === "PASSED")
    .length;
  const failedCount = results.filter((result) => result.status === "FAILED")
    .length;
  const criticalFailureCount = results.filter(
    (result) => result.status === "FAILED" && result.critical,
  ).length;

  return (
    <PremiumCard>
      <p className="premium-label">
        Execution results
      </p>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-3xl font-black tracking-[-0.05em] text-[var(--text)]">
          Deterministic test run
        </h2>
        <div className="flex flex-wrap gap-2 text-sm font-black">
          <StatusPill variant="passed">
            {passedCount} passed
          </StatusPill>
          <StatusPill variant="blocked">
            {failedCount} failed
          </StatusPill>
          <StatusPill variant="blocked">
            {criticalFailureCount} critical
          </StatusPill>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {results.map((result) => (
          <div
            className={`rounded-2xl border p-4 ${
              result.critical
                ? "border-[#efb5ad] bg-[#fff7f5]"
                : "border-[#e3d8cc] bg-[var(--surface-low)]"
            }`}
            key={result.testCaseId}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-black text-[var(--text)]">
                  {result.testCaseId}: {result.testCaseTitle}
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--muted-text)]">
                  {result.durationSeconds}s at {result.executedAt}
                </p>
              </div>
              <StatusPill variant={statusVariant(result.status)}>
                {result.status}
              </StatusPill>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--secondary-text)]">
              {result.evidence}
            </p>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-black text-[var(--muted-text)]">
                  Actual result
                </dt>
                <dd className="mt-1 leading-6 text-[var(--secondary-text)]">
                  {result.actualResult}
                </dd>
              </div>
              <div>
                <dt className="font-black text-[var(--muted-text)]">
                  Evidence refs
                </dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {result.artifactRefs.map((artifact) => (
                    <span
                      className="rounded-full border border-[var(--border)] bg-white px-2.5 py-1 text-xs font-black text-[var(--primary)]"
                      key={artifact}
                    >
                      {artifact}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            {result.errorSummary ? (
              <p className="mt-3 rounded-2xl border border-[#efb5ad] bg-[var(--error-soft)] p-3 text-sm font-black text-[var(--error)]">
                {result.errorSummary}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </PremiumCard>
  );
}
