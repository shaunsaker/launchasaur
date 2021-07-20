import { ApplicationState } from "../reducers";

export const selectSelectLauncherModalIsShown = (state: ApplicationState) =>
  state.selectLauncherModal.isShown;

export const selectSelectLauncherModalLaunchStationId = (
  state: ApplicationState,
) => state.selectLauncherModal.launchStationId;

export const selectSelectLauncherModalLauncherId = (state: ApplicationState) =>
  state.selectLauncherModal.launcherId;

export const selectSelectLauncherModalActionId = (state: ApplicationState) =>
  state.selectLauncherModal.actionId;
