import type { TestExecutionResult } from "@/lib/types/releaseCheck";

interface ExecutionResultsProps {
  results: TestExecutionResult[];
}

function badgeClassName(status: TestExecutionResult["status"]) {
  if (status === "FAILED") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  if (status === "SKIPPED") {
    return "border-zinc-200 bg-zinc-50 text-zinc-600";
  }

  return "border-emerald-200 bg-emerald-50 text-emerald-700";
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
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
        Execution results
      </p>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-semibold">Deterministic test run</h2>
        <div className="flex gap-2 text-sm font-semibold">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700">
            {passedCount} passed
          </span>
          <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-rose-700">
            {failedCount} failed
          </span>
          <span className="rounded-full border border-rose-300 bg-white px-3 py-1 text-rose-800">
            {criticalFailureCount} critical
          </span>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {results.map((result) => (
          <div
            className={`rounded-md border p-4 ${
              result.critical
                ? "border-rose-200 bg-rose-50"
                : "border-zinc-200 bg-zinc-50"
            }`}
            key={result.testCaseId}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-semibold text-zinc-950">
                  {result.testCaseId}: {result.testCaseTitle}
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  {result.durationSeconds}s at {result.executedAt}
                </p>
              </div>
              <span
                className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-xs font-semibold ${badgeClassName(
                  result.status,
                )}`}
              >
                {result.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-700">
              {result.evidence}
            </p>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-zinc-500">Actual result</dt>
                <dd className="mt-1 leading-6 text-zinc-800">
                  {result.actualResult}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-500">Evidence refs</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {result.artifactRefs.map((artifact) => (
                    <span
                      className="rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-700"
                      key={artifact}
                    >
                      {artifact}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            {result.errorSummary ? (
              <p className="mt-3 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-800">
                {result.errorSummary}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
