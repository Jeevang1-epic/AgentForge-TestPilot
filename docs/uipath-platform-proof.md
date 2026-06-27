# UiPath Platform Proof

## Why UiPath Matters

AgentForge TestPilot is built around release governance for invoice approval automation. UiPath is the right platform target because the demo flow depends on requirements, test coverage, execution evidence, human approval, and governed automation steps. Those surfaces map naturally to UiPath Test Manager, Test Cloud, API Workflows, Action Center, and Coded Agents.

## Current Prototype Status

The current implementation is a deterministic local prototype. It runs the release-check pipeline from local TypeScript modules and local demo data. It does not call real UiPath APIs, does not require UiPath credentials, and does not include secrets.

Current proof status:

- Prototype status: `deterministic-local`
- UiPath connection status: `proof-layer-ready-real-connection-pending`
- Adapter mode: typed deterministic mock
- Live UiPath API calls: not enabled

## Test Manager And Test Cloud Mapping

The release-check flow produces the same governance objects that a UiPath testing workflow would need:

- Requirement analysis maps to Test Manager requirements.
- Generated release-gate test cases map to Test Manager test cases.
- Deterministic execution results map to TestExecution and TestCaseLog-style records.
- The failed high-value invoice test maps to linked execution evidence and failure diagnosis.
- The evidence report maps requirement trace, risk, test coverage, execution result, failure cause, and release decision into one reviewable record.

Test Cloud is the future execution source for this project. In the current proof layer, execution results remain deterministic local samples: four passed tests and one critical failed test.

## Execution Result Mapping

The failed control is `TC-INV-002`, where invoice `INV-88450` for `USD 48,750` routes to finance validation instead of manager approval. This maps to a TestExecution/TestCaseLog-style record with:

- Test status: `FAILED`
- Critical flag: `true`
- Actual result: invoice skipped manager approval
- Evidence references: local routing and queue snapshot files
- Linked failure diagnosis: preferred vendor fast path evaluated before the high-value approval guard

## API Workflow Mapping

The proof layer defines request and response shapes for three future workflow surfaces:

- `getReleaseCheck`: retrieves release metadata, risk score, final status, failed test ID, and evidence report ID.
- `submitTestResults`: accepts mapped execution logs and returns pass/fail counts plus final status.
- `generateEvidenceReport`: returns the evidence report summary, final status, generated timestamp, and optional markdown.

These are typed proof contracts only. Real workflow endpoints can be implemented later behind approved authentication and tenant configuration.

## Action Center Mapping

The human review flow maps to an Action Center-style action:

- `releaseCheckId`: `RC-AF-INV-2026-001`
- `riskScore`: `94`
- `failedTestId`: `TC-INV-002`
- `failureSummary`: high-value invoice bypassed manager approval
- `reviewQueue`: finance automation release governance
- `reviewerDecision`: `BLOCKED`
- `finalStatus`: `BLOCKED`

This is represented as deterministic review input and output. No real human review task is sent.

## Coded Agent Mapping

The six deterministic release-check agents map to governed Coded Agent responsibilities:

- Requirement Analyst extracts business rules, acceptance criteria, workflow steps, assumptions, and missing information.
- Risk Mapper calculates risk score, risk level, risk factors, and recommended coverage.
- Test Planner generates invoice approval release-gate tests.
- Execution Analyst reviews pass/fail outcomes and evidence references.
- Failure Investigator diagnoses why the high-value invoice bypassed manager approval.
- Release Gate returns the blocked or review-required decision and human review path.

## Implemented Now

- Typed adapter contracts in `src/lib/uipath-adapters/`.
- Platform proof artifacts in `uipath/platform-proof/`.
- Test Manager-style requirement, test case, execution, and traceability samples.
- API Workflow request and response examples.
- Action Center human review example.
- Dashboard proof panel titled `UiPath Integration Readiness`.

## Future Integration

- Secure UiPath tenant configuration outside this repository.
- Test Manager requirement and test case registration.
- Test Cloud execution result ingestion.
- API Workflow endpoint implementation behind approved authentication.
- Action Center task creation for blocked releases.
- Governed Coded Agent implementation for deterministic release-check responsibilities.

## Track 3 Fit

This is a strong UiPath AgentHack Track 3 fit because the demo centers on testing and release evidence, not a generic automation dashboard. It shows how a risky invoice approval change can be converted into requirements, risk scoring, test coverage, execution evidence, failure diagnosis, and a blocked release decision with a concrete path into UiPath testing and governance surfaces.
