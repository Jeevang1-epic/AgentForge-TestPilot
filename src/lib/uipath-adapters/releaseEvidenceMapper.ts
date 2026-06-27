import type { ReleaseCheck } from "@/lib/types/releaseCheck";
import { createActionCenterProofPayload } from "@/lib/uipath-adapters/actionCenterAdapter";
import { createApiWorkflowProofPayload } from "@/lib/uipath-adapters/apiWorkflowAdapter";
import {
  createTestManagerProofPayload,
  uipathProofStatus,
} from "@/lib/uipath-adapters/testManagerAdapter";
import type { PlatformEvidenceBundle } from "@/lib/uipath-adapters/types";

export function createPlatformEvidenceBundle(
  releaseCheck: ReleaseCheck,
): PlatformEvidenceBundle {
  return {
    status: uipathProofStatus,
    releaseCheck,
    testManager: createTestManagerProofPayload(releaseCheck),
    apiWorkflows: createApiWorkflowProofPayload(releaseCheck),
    actionCenter: createActionCenterProofPayload(releaseCheck),
  };
}
