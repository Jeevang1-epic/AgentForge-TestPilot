# Submission Checklist

## Product

- AgentForge TestPilot pitch is documented.
- Hackathon track is documented as UiPath AgentHack Track 3: UiPath Test Cloud.
- Demo remains focused on invoice approval automation release governance.
- No fake claim is made that real UiPath APIs are connected.

## Application

- Next.js App Router project is created in the repository root.
- TypeScript strict mode is configured.
- Tailwind CSS is configured.
- `/` landing page exists.
- `/release-check` dashboard exists.
- Local deterministic demo data is implemented.
- Pure TypeScript agent functions are implemented.
- Orchestrator runs the full local pipeline.
- Release-check metadata is included in the pipeline result.
- Requirement analysis includes business rules, acceptance criteria, affected workflow steps, assumptions, and missing information.
- Risk assessment includes weighted factors, score, level, mitigations, and recommended coverage.
- Execution results show four passed tests and one critical failed test.

## Demo Requirements

- Change request is visible.
- Agent timeline is visible.
- Extracted requirements are visible.
- Risk score is visible.
- Generated test cases are visible.
- Test coverage table is visible.
- Execution results are visible.
- Failed test details are visible.
- One critical failed test is visible.
- Failure diagnosis is visible.
- Release decision is visible.
- Evidence report preview is visible.

## Verification

- `npm install` completed.
- `npm run build` passed.
- `npm run dev` served the application.
- `http://localhost:3000` was checked.
- `http://localhost:3000/release-check` was checked.

## Git

- Changes are split into small logical commits.
- Each commit is pushed to `origin main`.
