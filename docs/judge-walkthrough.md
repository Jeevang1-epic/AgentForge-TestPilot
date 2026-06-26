# Judge Walkthrough

## Problem

Enterprise automation teams often ship workflow changes without a single, clear view of release risk. For invoice approvals, a small routing change can break a financial control: high-value invoices may skip manager approval, exception cases may route incorrectly, and audit evidence may be incomplete.

The problem is not only whether tests exist. The problem is whether the team can explain:

- What changed.
- Which business rules are affected.
- Which tests prove the release is safe or unsafe.
- Why a failure happened.
- Who must review the evidence before release.

## Solution

AgentForge TestPilot is an AI release gate for UiPath automations. It uses a deterministic local release-check pipeline to turn an invoice approval change request into:

- Requirement analysis.
- Risk assessment.
- Generated release-gate test coverage.
- Execution results.
- Failure diagnosis.
- Release gate decision.
- Human review decision.
- Evidence report preview.
- UiPath proof mapping.

The current prototype is intentionally local and deterministic so judges can inspect the full release story without secrets, credentials, external services, or real UiPath API calls.

## Architecture

The project is a Next.js App Router application with TypeScript and Tailwind CSS.

Key runtime paths:

- `src/app/page.tsx`: portfolio-ready landing page.
- `src/app/release-check/page.tsx`: release governance dashboard.
- `src/lib/data`: local invoice approval scenario data.
- `src/lib/agents`: deterministic requirement, risk, test, execution, failure, and release gate modules.
- `src/lib/orchestrator`: complete release-check pipeline assembly.
- `src/lib/reports`: structured evidence report generation.
- `src/components/dashboard`: dashboard presentation components.
- `uipath`: proof-layer contracts and sample artifacts for future UiPath integration.

The app does not use authentication, database storage, payments, secrets, external APIs, or real UiPath calls.

## UiPath Mapping

The UiPath proof layer maps the local prototype to future UiPath implementation surfaces:

| UiPath Surface | Prototype Mapping |
| --- | --- |
| Test Manager | Requirements, generated tests, execution evidence, and traceability matrix. |
| Test Cloud | Future release test execution and quality signals. |
| API Workflows | Release-check retrieval, test-result submission, and evidence-report contracts. |
| Action Center | Human review queue for blocked or review-required releases. |
| Coded Agents | Governed steps for requirement analysis, risk mapping, test planning, execution analysis, failure investigation, release gating, and evidence reporting. |

Current state is contract-only and sample-data-only.

## Demo Flow

1. Open `http://localhost:3000`.
2. Show the product pitch and blocked release finding.
3. Open `http://localhost:3000/release-check`.
4. Show the project thesis and scenario: invoice approval threshold routing.
5. Walk through the Judge Demo Flow panel.
6. Show the change request and threshold-routing change.
7. Show requirement analysis and risk score.
8. Show the generated test coverage table.
9. Show execution results: four passed tests and one critical failed test.
10. Show the failure diagnosis explaining the high-value approval bypass.
11. Show the blocked release decision and human review next action.
12. Show the evidence report preview and copy-ready markdown.
13. Show the UiPath mapping panel.

## Limitations

- The release-check data is deterministic demo data.
- The project does not connect to real UiPath APIs yet.
- Test execution results are simulated for the invoice approval scenario.
- Evidence reporting is rendered in the dashboard and markdown preview; PDF generation is intentionally out of scope.
- There is no authentication, database, payment flow, external API, secret handling, or production credential management.

## Future Integration Path

1. Connect Test Manager requirements and test cases to the release-check pipeline.
2. Replace deterministic execution results with UiPath Test Cloud execution evidence.
3. Use API Workflows to retrieve release-check state and submit test outcomes.
4. Route blocked releases to Action Center for finance governance approval.
5. Move deterministic steps into governed Coded Agent contracts where appropriate.
6. Add secure environment configuration, audit retention, and enterprise deployment controls.

## Judge Takeaway

AgentForge TestPilot demonstrates how automation teams can convert a risky workflow change into a clear, evidence-backed release decision before production.
