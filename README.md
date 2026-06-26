# AgentForge TestPilot

AgentForge TestPilot is an AI release gate for UiPath automations. It helps automation teams decide whether a workflow release is safe by turning a change request into requirements, risk scoring, test coverage, execution evidence, failure diagnosis, human review, and a structured evidence report.

One-line pitch: catch release-breaking automation defects before production, explain why they matter, and record the evidence needed for review.

## Hackathon Track

UiPath AgentHack Track 3: UiPath Test Cloud.

## Live Deployment

- Live demo: https://agentforge-testpilot.vercel.app
- GitHub repository: https://github.com/Jeevang1-epic/AgentForge-TestPilot
- Main demo route: `/release-check`
- Screenshot assets: `public/screenshots/`

## Problem

Invoice approval automations carry financial control risk. A small threshold-routing change can let high-value invoices skip manager approval, send exception cases to the wrong queue, or leave audit evidence incomplete. Teams need a clear release decision that connects the requirement, risk, test evidence, failure cause, and human review path.

## Solution

AgentForge TestPilot provides a deterministic release-check dashboard for an invoice approval automation. The current prototype shows how a UiPath automation release could be evaluated before production with:

- Requirement analysis.
- Risk scoring and risk factors.
- Release-gate test planning.
- Execution result review.
- Critical failure diagnosis.
- Blocked release decision.
- Human review queue.
- Evidence report preview.
- UiPath proof mapping.

## Live Demo Flow

1. Review an invoice approval automation change request.
2. Extract deterministic business rules, acceptance criteria, workflow steps, assumptions, and missing information.
3. Score business and compliance risk with weighted factors and recommended coverage.
4. Generate focused invoice approval release-gate test cases.
5. Review deterministic execution results with four passed tests and one critical failed test.
6. Diagnose the failure: a high-value invoice bypasses manager approval after a threshold-routing change.
7. Produce a blocked release decision and evidence report preview.
8. Review the UiPath mapping proof for Test Manager, API Workflows, Action Center, and Coded Agents.

## Architecture Overview

The app is a Next.js App Router project using TypeScript and Tailwind CSS. The release-check pipeline is built from local deterministic modules:

- Requirement Analyst extracts business rules and missing information.
- Risk Mapper scores business and compliance risk.
- Test Planner generates invoice approval release-gate tests.
- Execution Analyst reviews deterministic test outcomes.
- Failure Investigator explains the critical failed test.
- Release Gate returns the release decision and human review path.
- Evidence Reporter produces the structured report preview.

No external services are required to run the demo.

## UiPath Proof Layer

The proof layer maps the local deterministic dashboard to future UiPath surfaces:

- UiPath Test Cloud and Test Manager for requirements, test coverage, execution outcomes, and traceability.
- UiPath API Workflows for release-check retrieval, test-result submission, and evidence-report generation contracts.
- UiPath Action Center for blocked release approval review.
- UiPath Coded Agents for explainable release-check steps that can later be governed inside UiPath.

Current state is contract-only and sample-data-only. Real UiPath connection is pending future secure configuration and implementation.

## Local Run Commands

```bash
npm install
npm run lint
npm run build
npm run dev
```

Open:

- `http://localhost:3000`
- `http://localhost:3000/release-check`

## Current Status

Phase 5 is a live deterministic demo with a polished release-check dashboard, improved evidence reporting, submission walkthrough docs, and a portfolio-safe UiPath proof layer. It uses Next.js, TypeScript, Tailwind CSS, App Router, local demo data, pure TypeScript release-check modules, and no external service calls.

The application does not connect to real UiPath APIs yet. The `uipath/` folder contains sample requirements, test cases, execution results, traceability, workflow contracts, Action Center schema, and Coded Agent contracts for future implementation planning. It does not include authentication, database storage, payments, external APIs, secrets, or production credentials.

## Repository Structure

- `src/app/page.tsx`: landing page.
- `src/app/release-check/page.tsx`: release governance dashboard.
- `src/lib/agents`: deterministic local agent functions.
- `src/lib/orchestrator`: release check pipeline.
- `src/lib/data`: local invoice approval demo data.
- `src/components/dashboard`: dashboard presentation components.
- `uipath`: UiPath proof layer contracts and sample artifacts.
- `docs`: architecture notes, demo script, recording plan, judge walkthrough, and submission checklist.

## Limitations

- The release-check data is deterministic demo data.
- Test execution results are simulated for the invoice approval scenario.
- Real UiPath API connectivity is not implemented yet.
- Evidence reporting is shown in the dashboard and markdown preview; PDF generation is out of scope.
- Authentication, database storage, payments, external APIs, secrets, and production credential management are intentionally not included.

## Future Roadmap

- Connect Test Manager requirements, generated tests, execution evidence, and traceability.
- Replace deterministic execution data with UiPath Test Cloud results.
- Use API Workflows for release-check retrieval, test-result submission, and evidence-report generation.
- Route blocked releases to Action Center for finance governance review.
- Move deterministic release-check steps into governed Coded Agent contracts where appropriate.
- Add secure enterprise configuration, audit retention, and deployment controls.
