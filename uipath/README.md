# UiPath Proof Layer

This folder documents how AgentForge TestPilot maps its deterministic invoice approval release-check dashboard to future UiPath implementation surfaces.

## Current Status

AgentForge TestPilot is currently a local deterministic prototype. It does not call real UiPath APIs, does not use external services, and does not include production credentials. The files in this folder are proof artifacts and contract drafts that show the intended integration shape.

## Project Module Mapping

| AgentForge module | Future UiPath component | Intended role |
| --- | --- | --- |
| `src/lib/agents/requirementAnalyst.ts` | UiPath Coded Agents, UiPath Test Manager | Extract release requirements, business rules, acceptance criteria, and missing information. |
| `src/lib/agents/riskMapper.ts` | UiPath Coded Agents, UiPath Test Cloud | Convert release context into risk score, risk factors, and recommended coverage. |
| `src/lib/agents/testPlanner.ts` | UiPath Test Manager | Generate release-gate test cases linked to invoice approval requirements. |
| `src/lib/agents/executionAnalyst.ts` | UiPath Test Cloud, UiPath Test Manager | Review execution outcomes, failed paths, and release-quality evidence. |
| `src/lib/agents/failureInvestigator.ts` | UiPath Coded Agents, UiPath Test Manager | Diagnose why a failed test creates release risk. |
| `src/lib/agents/releaseGate.ts` | UiPath Action Center | Route blocked releases to human approval with release conditions. |
| `src/lib/reports/generateEvidenceReport.ts` | UiPath API Workflows, UiPath Test Manager | Produce structured release evidence for governance review. |

## Included Proof Artifacts

- `test-manager/sample-requirement.md`: Test Manager-style requirement for threshold routing.
- `test-manager/sample-test-cases.json`: Release-gate test case sample set.
- `test-manager/sample-execution-results.json`: Deterministic execution results with four passed tests and one critical failed test.
- `test-manager/traceability-matrix.json`: Requirement, test, result, failure, and release decision traceability.
- `api-workflows/*.contract.json`: Request and response contracts for future workflow surfaces.
- `action-center/release-approval-action.schema.json`: Human review action schema.
- `coded-agents/*.contract.json`: Narrow, explainable Coded Agent contracts.

## Future Implementation Path

1. Register invoice approval requirements and test cases in UiPath Test Manager.
2. Replace local deterministic execution results with UiPath Test Cloud run outcomes.
3. Expose release-check retrieval, test-result submission, and evidence-report generation through UiPath API Workflows.
4. Route blocked release decisions to UiPath Action Center for finance governance review.
5. Move deterministic agent responsibilities into governed UiPath Coded Agents.
6. Add real credentials and deployment configuration only through approved secure environment management.
