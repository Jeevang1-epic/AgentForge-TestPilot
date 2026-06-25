# Phase 2 Architecture Summary

## Application Architecture

AgentForge TestPilot is a Next.js App Router application using TypeScript and Tailwind CSS. It has two public pages:

- `/`: product landing page for the hackathon demo.
- `/release-check`: command-center dashboard for invoice approval release governance.

## Local Pipeline

The release check pipeline is deterministic and runs locally:

1. `requirementAnalyst` extracts business rules, acceptance criteria, affected workflow steps, assumptions, missing information, requirements, and control objectives.
2. `riskMapper` calculates a weighted risk score, risk level, risk factors, mitigations, and recommended release-gate coverage.
3. `testPlanner` creates five realistic invoice approval test cases across fast-path, manager approval, exception handling, and audit evidence.
4. `executionAnalyst` returns deterministic execution results with four passed tests and one critical failed test.
5. `failureInvestigator` diagnoses why the high-value invoice bypassed manager approval.
6. `releaseGate` returns the blocked release decision with review queue, next action, and release conditions.
7. `generateEvidenceReport` builds the evidence report preview with metrics, findings, and audit trail.

## Data Boundaries

All demo data lives in `src/lib/data/demoReleaseCheck.ts`. No server-side persistence is used. No external APIs are called.

## Type Model

Strict TypeScript types define the release check surface:

- `ReleaseCheck`
- `ReleaseCheckMetadata`
- `RequirementAnalysis`
- `RiskAssessment`
- `TestCase`
- `TestExecutionResult`
- `FailureDiagnosis`
- `HumanReviewDecision`
- `EvidenceReport`

## Dashboard Surface

The `/release-check` dashboard presents run metadata, change request context, agent timeline, requirement analysis, risk score, test coverage table, execution results, failed test details, failure diagnosis, release decision, human review routing, and evidence report preview.

## Future Integration Boundary

The local orchestrator is the integration boundary. Future UiPath integrations can replace deterministic inputs and outputs while keeping the dashboard components and evidence report structure stable.
