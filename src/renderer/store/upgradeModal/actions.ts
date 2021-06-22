import { createStandardAction } from "typesafe-actions";

export const showUpgradeModal = createStandardAction(
  "UPGRADE_MODAL/showUpgradeModal",
)();

export const hideUpgradeModal = createStandardAction(
  "UPGRADE_MODAL/hideUpgradeModal",
)();
