import { createStandardAction } from "typesafe-actions";

export const showEditLaunchStationTitleModal = createStandardAction(
  "EDIT_LAUNCH_STATION_TITLE_MODAL/showEditLaunchStationTitleModal",
)<{ launchStationId: string }>();

export const hideEditLaunchStationTitleModal = createStandardAction(
  "EDIT_LAUNCH_STATION_TITLE_MODAL/hideEditLaunchStationTitleModal",
)();
