import { ApplicationState } from "../reducers";

export const selectLaunchStationModalIsShown = (state: ApplicationState) =>
  state.selectLaunchStationModal.isShown;

export const selectSelectLaunchStationModalLaunchStationId = (
  state: ApplicationState,
) => state.selectLaunchStationModal.launchStationId;

export const selectSelectLaunchStationModalLauncherId = (
  state: ApplicationState,
) => state.selectLaunchStationModal.launcherId;

export const selectSelectLaunchStationModalActionId = (
  state: ApplicationState,
) => state.selectLaunchStationModal.actionId;
