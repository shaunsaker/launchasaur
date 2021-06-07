import { ApplicationState } from "../reducers";

export const selectEditLaunchStationTitleModalIsShown = (
  state: ApplicationState,
) => state.editLaunchStationTitleModal.isShown;

export const selectEditLaunchStationTitleModalLaunchStationId = (
  state: ApplicationState,
) => state.editLaunchStationTitleModal.launchStationId;
