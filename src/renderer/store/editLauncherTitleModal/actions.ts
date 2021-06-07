import { createStandardAction } from "typesafe-actions";

export const showEditLauncherTitleModal = createStandardAction(
  "EDIT_LAUNCHER_TITLE_MODAL/showEditLauncherTitleModal",
)<{ launchStationId: string; launcherId: string }>();

export const hideEditLauncherTitleModal = createStandardAction(
  "EDIT_LAUNCHER_TITLE_MODAL/hideEditLauncherTitleModal",
)();
