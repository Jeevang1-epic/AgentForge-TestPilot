# Demo Script

## Opening

AgentForge TestPilot is a release-governance dashboard for enterprise automation teams. This demo checks whether an invoice approval automation change is safe to release.

## Step 1: Landing Page

Open `http://localhost:3000`.

Explain that the product coordinates local agent steps across requirement analysis, risk mapping, test planning, execution review, failure diagnosis, release gating, and evidence reporting.

## Step 2: Release Check Dashboard

Open `http://localhost:3000/release-check`.

Show the invoice approval change request. The proposed change adjusts threshold-based routing for approval queues.

## Step 3: Requirements And Risk

Point to the extracted requirements and risk score. The risk is critical because the change affects financial controls, approval thresholds, exception handling, auditability, and release timing.

## Step 4: Test Plan

Show the generated tests. The plan covers standard threshold behavior, preferred vendor routing, exception flags, duplicate invoice protection, audit logging, and high-value manager approval.

## Step 5: Failure Diagnosis

Show the failed critical test. A high-value invoice bypasses manager approval after the threshold-routing change. The failure diagnosis connects the defect to a missing guard in the routing condition.

## Step 6: Release Gate

Show the blocked release decision. The release should not proceed until the approval routing defect is fixed, regression tests pass, and a business owner reviews the evidence.

## Step 7: Evidence Report

Show the evidence report preview. Explain that future integrations can push this evidence into UiPath Test Manager, Test Cloud, Action Center, and governed coded-agent workflows.
