# UiPath Adapter Proof Layer

This folder contains typed adapter contracts that map the deterministic AgentForge TestPilot release-check run into UiPath-shaped payloads.

Current status:

- Prototype status: `deterministic-local`
- UiPath connection status: `proof-layer-ready-real-connection-pending`
- Adapter mode: typed deterministic mock
- Live API calls: disabled

## What The Adapters Cover

- `testManagerAdapter.ts` maps requirements, test cases, execution logs, and traceability into Test Manager-style records.
- `apiWorkflowAdapter.ts` defines request and response shapes for release-check retrieval, test-result submission, and evidence-report generation.
- `actionCenterAdapter.ts` maps the blocked release into a human review action payload.
- `releaseEvidenceMapper.ts` combines the release check, Test Manager mapping, API Workflow examples, and Action Center review payload into one evidence bundle.

These files do not contain credentials, secrets, environment variable reads, HTTP clients, or live UiPath API calls.
