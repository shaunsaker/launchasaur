import { createStandardAction } from "typesafe-actions";

export const showSelectLaunchStationModal = createStandardAction(
  "SELECT_LAUNCH_STATION_MODAL/showSelectLaunchStationModal",
)<{ launchStationId: string; launcherId: string; actionId: string }>();

export const hideSelectLaunchStationModal = createStandardAction(
  "SELECT_LAUNCH_STATION_MODAL/hideSelectLaunchStationModal",
)();
