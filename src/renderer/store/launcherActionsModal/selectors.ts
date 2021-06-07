import { ApplicationState } from "../reducers";

export const selectLauncherActionsModalIsShown = (state: ApplicationState) =>
  state.launcherActionsModal.isShown;

export const selectLauncherActionsModalLaunchStationId = (
  state: ApplicationState,
) => state.launcherActionsModal.launchStationId;

export const selectLauncherActionsModalLauncherId = (state: ApplicationState) =>
  state.launcherActionsModal.launcherId;
