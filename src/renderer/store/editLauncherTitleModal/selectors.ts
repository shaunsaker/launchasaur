import { ApplicationState } from "../reducers";

export const selectEditLauncherTitleModalIsShown = (state: ApplicationState) =>
  state.editLauncherTitleModal.isShown;

export const selectEditLauncherTitleModalLaunchStationId = (
  state: ApplicationState,
) => state.editLauncherTitleModal.launchStationId;

export const selectEditLauncherTitleModalLauncherId = (
  state: ApplicationState,
) => state.editLauncherTitleModal.launcherId;
