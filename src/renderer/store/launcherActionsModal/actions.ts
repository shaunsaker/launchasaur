import { createStandardAction } from "typesafe-actions";

export const showLauncherActionsModal = createStandardAction(
  "LAUNCH_STATION_ACTIONS_MODAL/showLauncherActionsModal",
)<{ launchStationId: string; launcherId: string }>();

export const hideLauncherActionsModal = createStandardAction(
  "LAUNCH_STATION_ACTIONS_MODAL/hideLauncherActionsModal",
)();
