import { createStandardAction } from "typesafe-actions";

export const showEditLauncherIconModal = createStandardAction(
  "EDIT_LAUNCHER_ICON_MODAL/showEditLauncherIconModal",
)<{ launchStationId: string; launcherId: string }>();

export const hideEditLauncherIconModal = createStandardAction(
  "EDIT_LAUNCHER_ICON_MODAL/hideEditLauncherIconModal",
)();
