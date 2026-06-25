import type { TestCase } from "@/lib/types/releaseCheck";

interface TestPlanTableProps {
  testCases: TestCase[];
}

export function TestPlanTable({ testCases }: TestPlanTableProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
        Test coverage
      </p>
      <h2 className="mt-3 text-2xl font-semibold">
        Release-gate coverage table
      </h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-xs uppercase tracking-[0.12em] text-zinc-500">
              <th className="py-3 pr-4 font-semibold">ID</th>
              <th className="py-3 pr-4 font-semibold">Coverage</th>
              <th className="py-3 pr-4 font-semibold">Workflow step</th>
              <th className="py-3 pr-4 font-semibold">Priority</th>
              <th className="py-3 pr-4 font-semibold">Test data</th>
              <th className="py-3 font-semibold">Expected result</th>
            </tr>
          </thead>
          <tbody>
            {testCases.map((testCase) => (
              <tr className="border-b border-zinc-100" key={testCase.id}>
                <td className="py-4 pr-4 font-semibold text-zinc-950">
                  {testCase.id}
                </td>
                <td className="py-4 pr-4">
                  <span className="rounded-full border border-zinc-300 px-2 py-1 text-xs font-semibold text-zinc-600">
                    {testCase.type}
                  </span>
                  <p className="font-semibold text-zinc-900">
                    {testCase.title}
                  </p>
                  <p className="mt-1 text-zinc-600">{testCase.objective}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                    {testCase.coverageArea}
                  </p>
                </td>
                <td className="py-4 pr-4 text-zinc-700">
                  {testCase.workflowStep}
                </td>
                <td className="py-4 pr-4">
                  <span className="rounded-full border border-zinc-300 px-2.5 py-1 text-xs font-semibold text-zinc-700">
                    {testCase.priority}
                  </span>
                </td>
                <td className="py-4 pr-4 leading-6 text-zinc-700">
                  {testCase.testData}
                </td>
                <td className="py-4 leading-6 text-zinc-700">
                  {testCase.expectedResult}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
