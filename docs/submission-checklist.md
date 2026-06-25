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

## Demo Requirements

- Change request is visible.
- Agent timeline is visible.
- Extracted requirements are visible.
- Risk score is visible.
- Generated test cases are visible.
- Execution results are visible.
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

- Changes are committed with message `added milestone 1 release check dashboard`.
- Commit is pushed to `origin main`.
