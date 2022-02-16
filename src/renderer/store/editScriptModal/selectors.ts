import { ApplicationState } from "../reducers";

export const selectEditScriptModalIsShown = (state: ApplicationState) =>
  state.editScriptModal.isShown;

export const selectEditScriptModalLaunchStationId = (state: ApplicationState) =>
  state.editScriptModal.launchStationId;

export const selectEditScriptModalLauncherId = (state: ApplicationState) =>
  state.editScriptModal.launcherId;

export const selectEditScriptModalActionId = (state: ApplicationState) =>
  state.editScriptModal.actionId;
