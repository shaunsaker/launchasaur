import { ApplicationState } from "../reducers";

export const selectEditMenuTitleModalIsShown = (state: ApplicationState) =>
  state.editMenuTitleModal.isShown;

export const selectEditMenuTitleModalMenuId = (state: ApplicationState) =>
  state.editMenuTitleModal.menuId;
