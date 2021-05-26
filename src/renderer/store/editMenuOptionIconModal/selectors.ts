import { ApplicationState } from "../reducers";

export const selectEditMenuOptionIconModalIsShown = (state: ApplicationState) =>
  state.editMenuOptionIconModal.isShown;

export const selectEditMenuOptionIconModalMenuId = (state: ApplicationState) =>
  state.editMenuOptionIconModal.menuId;

export const selectEditMenuOptionIconModalMenuOptionId = (
  state: ApplicationState,
) => state.editMenuOptionIconModal.menuOptionId;
