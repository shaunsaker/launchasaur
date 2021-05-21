import { ApplicationState } from "../reducers";

export const selectEditLinkModalIsShown = (state: ApplicationState) =>
  state.editLinkModal.isShown;

export const selectEditLinkModalMenuId = (state: ApplicationState) =>
  state.editLinkModal.menuId;

export const selectEditLinkModalMenuOptionId = (state: ApplicationState) =>
  state.editLinkModal.menuOptionId;

export const selectEditLinkModalActionId = (state: ApplicationState) =>
  state.editLinkModal.actionId;
