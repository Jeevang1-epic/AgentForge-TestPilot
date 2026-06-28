# Winning Judge Brief

## 60-Second Pitch

AgentForge TestPilot is a deterministic release gate for UiPath invoice approval automations. It turns a risky workflow change into requirements, risk scoring, release-gate tests, execution evidence, failure diagnosis, human review, and an evidence report. In the demo, a preferred vendor threshold-routing change is blocked because a high-value invoice bypasses manager approval.

## Enterprise Problem

Invoice approval automation is a financial control surface. If a threshold or exception-routing change is wrong, high-value invoices can skip approval, exception cases can enter the wrong queue, and audit evidence can become incomplete. Enterprise teams need a clear way to connect business requirements, test results, failure diagnosis, and human approval before a workflow release moves forward.

## Track 3 Fit

This fits UiPath AgentHack Track 3: UiPath Test Cloud because the project is centered on release testing, traceability, evidence, and approval readiness. It is not a generic dashboard. The flow shows how Test Cloud and Test Manager-style evidence can support safer automation releases.

## Live Demo Flow

1. Open the live demo at `https://agentforge-testpilot.vercel.app`.
2. Enter the release dashboard at `/release-check`.
3. Review the invoice approval change request and critical failure summary.
4. Inspect requirement analysis, risk score, test coverage, and execution results.
5. Review the failed test showing invoice `INV-88450` for `USD 48,750` routed to finance validation instead of manager approval.
6. Read the failure diagnosis and blocked release decision.
7. Open the evidence report preview and UiPath proof sections.
8. Review the `UiPath Integration Readiness` panel showing how the proof layer maps to UiPath platform surfaces.

## UiPath Proof Layer Mapping

### Test Manager

Requirements, generated test cases, execution logs, and traceability are mapped into Test Manager-style records. The proof bundle links requirement `REQ-002`, test `TC-INV-002`, execution evidence, failure diagnosis, and evidence report `EVR-AF-INV-2026-001`.

### Test Cloud

The current execution results are deterministic local samples. In a future connection, UiPath Test Cloud would provide the release-gate execution results that replace the local sample pass/fail data.

### API Workflows

The proof layer defines request and response examples for `getReleaseCheck`, `submitTestResults`, and `generateEvidenceReport`. These examples show how a future workflow surface can expose the release-check pipeline without adding live API calls now.

### Action Center

The blocked release maps to a human review action with release check ID, risk score, failed test ID, failure summary, required approvers, reviewer decision, and final status.

### Coded Agents

The deterministic modules map to governed agent responsibilities: Requirement Analyst, Risk Mapper, Test Planner, Execution Analyst, Failure Investigator, Release Gate, and Evidence Reporter.

## Implemented Now

- Live Next.js demo with `/` and `/release-check` routes.
- Deterministic release-check pipeline with typed local modules.
- Five invoice approval release-gate tests.
- Four passed tests and one critical failed test.
- Evidence report preview with requirement, risk, coverage, failure, release decision, and UiPath mapping.
- Typed adapter proof layer in `src/lib/uipath-adapters/`.
- Static platform proof bundle in `uipath/platform-proof/`.
- Platform proof validation through `npm run proof:validate`.
- Screenshot assets under `public/screenshots/`.

## Future Integration

- Secure UiPath tenant configuration outside the repository.
- Test Manager requirement and test case registration.
- Test Cloud execution result ingestion.
- API Workflow endpoint implementation with approved authentication.
- Action Center task creation for blocked release review.
- Governed Coded Agent implementation for deterministic release-check responsibilities.

## Why Deterministic Helps Judging

The deterministic prototype makes the release-check story repeatable. Judges can inspect the same requirement analysis, risk score, test plan, failed execution, diagnosis, decision, and evidence report every time. That repeatability makes the UiPath platform mapping easier to review without needing credentials, tenant setup, or external services during judging.

## Honest Limitations

- No real UiPath API calls are made.
- No UiPath credentials, tenant URLs, tokens, or secrets are included.
- Execution results are deterministic demo data.
- The proof layer is integration-ready, not a live connector.
- Authentication, database storage, payments, and external APIs are intentionally out of scope.

## Why It Is A Strong Contender

AgentForge TestPilot demonstrates a concrete testing and governance workflow for a realistic enterprise automation risk. It shows the problem, the failed control, the evidence trail, the human decision path, and the exact UiPath platform surfaces that can carry the solution forward. The result is easy to judge, submission-safe, and focused on Track 3 outcomes.
