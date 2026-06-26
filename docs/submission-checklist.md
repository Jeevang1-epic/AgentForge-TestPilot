# Submission Checklist

## Product

- AgentForge TestPilot pitch is documented.
- Hackathon track is documented as UiPath AgentHack Track 3: UiPath Test Cloud.
- Demo remains focused on invoice approval automation release governance.
- Project thesis is visible on the release dashboard.
- Demo scenario is visible in the first dashboard viewport.
- No fake claim is made that real UiPath APIs are connected.
- UiPath proof layer is clearly described as contract-only and sample-data-only.

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
- Test plan includes at least five invoice approval release-gate cases.
- Execution results show four passed tests and one critical failed test.
- Failure diagnosis explains why high-value invoices bypassed manager approval.
- Release gate returns a blocked or review-required outcome.
- Evidence report includes traceability, risk, coverage, failed test details, root cause, release decision, human decision, UiPath mapping, and generated timestamp.
- UiPath proof contracts are present under `uipath/`.
- UiPath mapping panel is visible on `/release-check`.

## Demo Requirements

- Change request is visible.
- Agent timeline is visible.
- Judge Demo Flow panel is visible.
- Extracted requirements are visible.
- Risk score is visible.
- Risk factors are visible.
- Generated test cases are visible.
- Test coverage table is visible.
- Execution results are visible.
- Failed test details are visible.
- One critical failed test is visible.
- Failure diagnosis is visible.
- Release decision is visible.
- Evidence report preview is visible.
- UiPath mapping section is visible.

## Documentation

- `README.md` explains the project, track, flow, architecture, UiPath proof layer, status, run commands, repository structure, limitations, and roadmap.
- `docs/demo-script.md` supports a live walkthrough.
- `docs/demo-recording-plan.md` supports a 5-minute recording.
- `docs/judge-walkthrough.md` explains problem, solution, architecture, UiPath mapping, demo flow, limitations, and future integration path.
- Public docs stay professional and do not include local development artifacts.

## Verification

- `npm install` completed.
- `npm run lint` passed.
- `npm run build` passed.
- `npm audit --audit-level=moderate` passed.
- `npm run dev` served the application.
- `http://localhost:3000` was checked.
- `http://localhost:3000/release-check` was checked.
- Forbidden artifact scan passed.

## Git

- Changes are split into small logical commits.
- Each commit is pushed to `origin main`.
- Only reviewed, specific files are staged for each commit.
