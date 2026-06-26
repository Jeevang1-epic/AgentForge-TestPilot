import type { TestCase } from "@/lib/types/releaseCheck";
import { PremiumCard } from "@/components/ui/PremiumCard";

interface TestPlanTableProps {
  testCases: TestCase[];
}

export function TestPlanTable({ testCases }: TestPlanTableProps) {
  return (
    <PremiumCard>
      <p className="premium-label">
        Test coverage
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--text)]">
        Release-gate coverage table
      </h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#e3d8cc] text-xs uppercase tracking-[0.12em] text-[var(--muted-text)]">
              <th className="py-3 pr-4 font-black">ID</th>
              <th className="py-3 pr-4 font-black">Coverage</th>
              <th className="py-3 pr-4 font-black">Workflow step</th>
              <th className="py-3 pr-4 font-black">Priority</th>
              <th className="py-3 pr-4 font-black">Test data</th>
              <th className="py-3 font-black">Expected result</th>
            </tr>
          </thead>
          <tbody>
            {testCases.map((testCase) => (
              <tr className="border-b border-[#eee7df]" key={testCase.id}>
                <td className="py-4 pr-4 font-black text-[var(--primary)]">
                  {testCase.id}
                </td>
                <td className="py-4 pr-4">
                  <span className="rounded-full border border-[var(--border)] bg-[var(--surface-low)] px-2 py-1 text-xs font-black text-[var(--primary)]">
                    {testCase.type}
                  </span>
                  <p className="mt-2 font-black text-[var(--text)]">
                    {testCase.title}
                  </p>
                  <p className="mt-1 text-[var(--secondary-text)]">
                    {testCase.objective}
                  </p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--primary)]">
                    {testCase.coverageArea}
                  </p>
                </td>
                <td className="py-4 pr-4 text-[var(--secondary-text)]">
                  {testCase.workflowStep}
                </td>
                <td className="py-4 pr-4">
                  <span className="rounded-full border border-[#e4cfad] bg-[#fff4df] px-2.5 py-1 text-xs font-black text-[var(--primary)]">
                    {testCase.priority}
                  </span>
                </td>
                <td className="py-4 pr-4 leading-6 text-[var(--secondary-text)]">
                  {testCase.testData}
                </td>
                <td className="py-4 leading-6 text-[var(--secondary-text)]">
                  {testCase.expectedResult}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PremiumCard>
  );
}
