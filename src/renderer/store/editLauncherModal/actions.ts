import { createStandardAction } from "typesafe-actions";

export const showEditLauncherModal = createStandardAction(
  "EDIT_LAUNCHER_MODAL/showEditLauncherModal",
)<{ launchStationId: string; launcherId: string }>();

export const hideEditLauncherModal = createStandardAction(
  "EDIT_LAUNCHER_MODAL/hideEditLauncherModal",
)();
