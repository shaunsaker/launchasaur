import { createStandardAction } from "typesafe-actions";

export const showAddLaunchStationModal = createStandardAction(
  "ADD_LAUNCH_STATION_MODAL/showAddLaunchStationModal",
)();

export const hideAddLaunchStationModal = createStandardAction(
  "ADD_LAUNCH_STATION_MODAL/hideAddLaunchStationModal",
)();
