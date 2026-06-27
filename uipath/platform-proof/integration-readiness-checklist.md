# UiPath Integration Readiness Checklist

## Current Status

- Prototype status: `deterministic-local`
- UiPath connection status: `proof-layer-ready-real-connection-pending`
- Live UiPath API calls: not enabled
- Credentials or secrets: not included

## Proof Coverage

- Test Manager-style requirements are mapped to invoice approval business rules.
- Test Manager-style test cases cover preferred vendor routing, high-value approval, exception overrides, and audit evidence.
- Execution results include four passed tests and one critical failed test.
- The high-value invoice failure is linked to requirement trace, execution evidence, failure diagnosis, and release decision.
- API Workflow request and response examples are defined for release-check retrieval, test-result submission, and evidence-report generation.
- Action Center-style human review input and output are defined for the blocked release.
- Coded Agent responsibilities are mapped to the deterministic release-check modules.

## Future Integration Tasks

- Configure secure UiPath tenant access outside this repository.
- Replace local deterministic execution data with UiPath Test Cloud run results.
- Register requirements and test cases in UiPath Test Manager.
- Implement API Workflow endpoints behind approved authentication.
- Route blocked release review tasks into UiPath Action Center.
- Move deterministic agent responsibilities into governed Coded Agent contracts where appropriate.
- Add deployment-specific monitoring and audit retention after real connectivity is approved.
