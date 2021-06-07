import { ApplicationState } from "../reducers";

export const selectEditLauncherColourModalIsShown = (state: ApplicationState) =>
  state.editLauncherColourModal.isShown;

export const selectEditLauncherColourModalLaunchStationId = (
  state: ApplicationState,
) => state.editLauncherColourModal.launchStationId;

export const selectEditLauncherColourModalLauncherId = (
  state: ApplicationState,
) => state.editLauncherColourModal.launcherId;
