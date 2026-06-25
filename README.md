# AgentForge TestPilot

AgentForge TestPilot is an agentic QA and release-governance dashboard for enterprise automations. The Milestone 1 demo focuses on an invoice approval automation release check where a routing change is analyzed, risk is scored, tests are generated, execution results are reviewed, a critical failure is diagnosed, and a release gate decision is produced with an evidence report.

## Hackathon Track

UiPath AgentHack Track 3: UiPath Test Cloud.

## MVP Flow

1. Review an invoice approval automation change request.
2. Extract deterministic requirements and control objectives.
3. Score business and compliance risk.
4. Generate focused regression and release-gate test cases.
5. Review deterministic execution results with one critical failed test.
6. Diagnose the failure: a high-value invoice bypasses manager approval after a threshold-routing change.
7. Produce a blocked release decision and evidence report preview.

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

Milestone 1 is a local deterministic prototype. It uses Next.js, TypeScript, Tailwind CSS, App Router, local demo data, pure TypeScript agent functions, and no external service calls.

The application does not connect to real UiPath APIs yet. It does not include authentication, database storage, payments, or external APIs.

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
- `docs`: milestone vision, research mapping, architecture, demo script, and checklist.
