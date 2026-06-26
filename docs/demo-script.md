# Demo Script

## Opening

AgentForge TestPilot is an AI release gate for UiPath automations. The demo shows how an invoice approval change request can be checked before production release with deterministic requirements, risk, testing, failure diagnosis, human review, and evidence reporting.

## Step 1: Landing Page

Open `http://localhost:3000`.

Say: "AgentForge TestPilot helps automation teams prove whether a release is safe before it reaches production. This prototype focuses on invoice approval governance for UiPath automation teams."

Show the product pitch, the blocked release finding, and the navigation into the release dashboard.

## Step 2: Release Check Dashboard

Open `http://localhost:3000/release-check`.

Show the project thesis, demo scenario, release candidate, and Judge Demo Flow panel. Explain the five-step story: a requirement change enters, the pipeline analyzes risk and generates tests, execution detects a critical failure, the release is blocked for human review, and the evidence report records the decision.

## Step 3: Change Request

Show the invoice approval threshold-routing request.

Say: "Finance wants preferred vendor invoices below USD 25,000 to move faster, but high-value invoices still need manager approval. The release risk is that a routing change can accidentally bypass a financial control."

## Step 4: Requirement Analysis And Risk

Show the requirement analysis and risk score.

Point out the extracted business rules, acceptance criteria, affected workflow steps, assumptions, missing information, risk factors, recommended coverage, and critical risk score.

## Step 5: Test Coverage And Execution

Show the test coverage table and execution results.

Say: "The system generated five release-gate tests. Four passed, but the high-value manager approval control failed. That is the defect that matters for release governance."

## Step 6: Critical Failure And Diagnosis

Show the failed test details and failure diagnosis panels.

Explain that a high-value preferred vendor invoice bypassed manager approval because the preferred-vendor fast path did not reapply the USD 25,000 approval guard before routing to finance validation.

## Step 7: Release Gate And Human Review

Show the release decision and human review panel.

Say: "The release is blocked. The next action is to fix the routing condition, rerun the deterministic release check, and route evidence to the finance governance owner before production release."

## Step 8: Evidence Report

Show the evidence report preview.

Highlight the release check ID, final status, executive summary, requirement trace, risk assessment, coverage summary, failed test details, root cause, release gate decision, human decision, UiPath proof mapping, generated timestamp, and copy-ready markdown report.

## Step 9: UiPath Mapping

Show the UiPath mapping panel.

Explain that the repository includes contract-only proof artifacts for Test Manager, API Workflows, Action Center, and Coded Agents. Real UiPath connectivity is intentionally pending future secure implementation.

## Closing

Say: "The value is not just test generation. The value is explainable release governance: what changed, what risk it created, what evidence proves the result, and who must approve the next step."
