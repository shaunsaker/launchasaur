import { createStandardAction } from "typesafe-actions";

export const showEditLauncherColourModal = createStandardAction(
  "EDIT_LAUNCHER_COLOUR_MODAL/showEditLauncherColourModal",
)<{ launchStationId: string; launcherId: string }>();

export const hideEditLauncherColourModal = createStandardAction(
  "EDIT_LAUNCHER_COLOUR_MODAL/hideEditLauncherColourModal",
)();
