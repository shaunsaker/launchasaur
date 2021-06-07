import { ApplicationState } from "../reducers";

export const selectEditLauncherIconModalIsShown = (state: ApplicationState) =>
  state.editLauncherIconModal.isShown;

export const selectEditLauncherIconModalLaunchStationId = (
  state: ApplicationState,
) => state.editLauncherIconModal.launchStationId;

export const selectEditLauncherIconModalLauncherId = (
  state: ApplicationState,
) => state.editLauncherIconModal.launcherId;
