# Phase 2 Architecture Summary

## Application Architecture

AgentForge TestPilot is a Next.js App Router application using TypeScript and Tailwind CSS. It has two public pages:

- `/`: product landing page for the hackathon demo.
- `/release-check`: command-center dashboard for invoice approval release governance.

## Local Pipeline

The release check pipeline is deterministic and runs locally:

1. `requirementAnalyst` extracts requirements and control objectives.
2. `riskMapper` produces a risk assessment from fixed weighted factors.
3. `testPlanner` creates invoice approval test cases.
4. `executionAnalyst` returns deterministic test execution results.
5. `failureInvestigator` diagnoses the critical failed test.
6. `releaseGate` returns the blocked release decision.
7. `generateEvidenceReport` builds the evidence report preview.

## Data Boundaries

All demo data lives in `src/lib/data/demoReleaseCheck.ts`. No server-side persistence is used. No external APIs are called.

## Type Model

Strict TypeScript types define the release check surface:

- `ReleaseCheck`
- `RequirementAnalysis`
- `RiskAssessment`
- `TestCase`
- `TestExecutionResult`
- `FailureDiagnosis`
- `HumanReviewDecision`
- `EvidenceReport`

## Future Integration Boundary

The local orchestrator is the integration boundary. Future UiPath integrations can replace deterministic inputs and outputs while keeping the dashboard components and evidence report structure stable.
