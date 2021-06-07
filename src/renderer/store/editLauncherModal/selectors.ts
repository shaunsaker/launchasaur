import { ApplicationState } from "../reducers";

export const selectEditLauncherModalIsShown = (state: ApplicationState) =>
  state.editLauncherModal.isShown;

export const selectEditLauncherModalLaunchStationId = (
  state: ApplicationState,
) => state.editLauncherModal.launchStationId;

export const selectEditLauncherModalLauncherId = (state: ApplicationState) =>
  state.editLauncherModal.launcherId;
