# AgentForge TestPilot

AgentForge TestPilot is an agentic QA and release-governance dashboard for enterprise automations. The current demo focuses on an invoice approval automation release check where a routing change is analyzed, risk is scored, test coverage is planned, execution results are reviewed, a critical failure is diagnosed, a release gate decision is produced, and a UiPath proof layer shows how future integration can be structured.

## Hackathon Track

UiPath AgentHack Track 3: UiPath Test Cloud.

## MVP Flow

1. Review an invoice approval automation change request.
2. Extract deterministic business rules, acceptance criteria, workflow steps, assumptions, and missing information.
3. Score business and compliance risk with weighted factors and recommended coverage.
4. Generate focused invoice approval release-gate test cases.
5. Review deterministic execution results with four passed tests and one critical failed test.
6. Diagnose the failure: a high-value invoice bypasses manager approval after a threshold-routing change.
7. Produce a blocked release decision and evidence report preview.
8. Review the UiPath mapping proof for Test Manager, API Workflows, Action Center, and Coded Agents.

## Local Run Commands

```bash
npm install
npm run build
npm run dev
```

Open:

- `http://localhost:3000`
- `http://localhost:3000/release-check`

## Current Status

Milestone 3 is a local deterministic prototype with a stronger typed release-check pipeline, a complete command-center dashboard, and a portfolio-safe UiPath proof layer. It uses Next.js, TypeScript, Tailwind CSS, App Router, local demo data, pure TypeScript agent functions, and no external service calls.

The application does not connect to real UiPath APIs yet. The `uipath/` folder contains sample requirements, test cases, execution results, traceability, workflow contracts, Action Center schema, and Coded Agent contracts for future implementation planning. It does not include authentication, database storage, payments, external APIs, secrets, or production credentials.

## UiPath Proof Layer

The proof layer maps the local deterministic dashboard to future UiPath surfaces:

- UiPath Test Cloud and Test Manager for requirements, test coverage, execution outcomes, and traceability.
- UiPath API Workflows for release-check retrieval, test-result submission, and evidence-report generation contracts.
- UiPath Action Center for blocked release approval review.
- UiPath Coded Agents for explainable release-check steps that can later be governed inside UiPath.

Current state is contract-only and sample-data-only. Real UiPath connection is pending future secure configuration and implementation.

## Future UiPath Integration Plan

- UiPath Test Cloud: replace deterministic execution data with release test runs and quality signals.
- UiPath Test Manager: sync generated test cases, requirements, execution evidence, and defect links.
- UiPath API Workflows: trigger controlled automation checks and retrieve run artifacts.
- UiPath Action Center: route blocked or high-risk releases to a human reviewer.
- UiPath Coded Agents: migrate deterministic agents into governed coded-agent steps.

## Repository Map

- `src/app/page.tsx`: landing page.
- `src/app/release-check/page.tsx`: release governance dashboard.
- `src/lib/agents`: deterministic local agent functions.
- `src/lib/orchestrator`: release check pipeline.
- `src/lib/data`: local invoice approval demo data.
- `src/components/dashboard`: dashboard presentation components.
- `uipath`: UiPath proof layer contracts and sample artifacts.
- `docs`: milestone vision, research mapping, architecture, demo script, and checklist.
