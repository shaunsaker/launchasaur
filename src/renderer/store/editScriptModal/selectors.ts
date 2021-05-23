import { ApplicationState } from "../reducers";

export const selectEditScriptModalIsShown = (state: ApplicationState) =>
  state.editScriptModal.isShown;

export const selectEditScriptModalMenuId = (state: ApplicationState) =>
  state.editScriptModal.menuId;

export const selectEditScriptModalMenuOptionId = (state: ApplicationState) =>
  state.editScriptModal.menuOptionId;

export const selectEditScriptModalActionId = (state: ApplicationState) =>
  state.editScriptModal.actionId;
