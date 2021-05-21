import { ApplicationState } from "../reducers";

export const selectMenuActionsModalIsShown = (state: ApplicationState) =>
  state.menuActionsModal.isShown;

export const selectMenuActionsModalMenuId = (state: ApplicationState) =>
  state.menuActionsModal.menuId;

export const selectMenuActionsModalMenuOptionId = (state: ApplicationState) =>
  state.menuActionsModal.menuOptionId;
