import { ApplicationState } from "../reducers";

export const selectEditLinkModalIsShown = (state: ApplicationState) =>
  state.editLinkModal.isShown;

export const selectEditLinkModalLaunchStationId = (state: ApplicationState) =>
  state.editLinkModal.launchStationId;

export const selectEditLinkModalLauncherId = (state: ApplicationState) =>
  state.editLinkModal.launcherId;

export const selectEditLinkModalActionId = (state: ApplicationState) =>
  state.editLinkModal.actionId;
