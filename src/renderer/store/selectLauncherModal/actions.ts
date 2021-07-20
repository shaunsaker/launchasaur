import { createStandardAction } from "typesafe-actions";

export const showSelectLauncherModal = createStandardAction(
  "SELECT_LAUNCH_STATION_MODAL/showSelectLauncherModal",
)<{ launchStationId: string; launcherId: string; actionId: string }>();

export const hideSelectLauncherModal = createStandardAction(
  "SELECT_LAUNCH_STATION_MODAL/hideSelectLauncherModal",
)();
