import { ApplicationState } from "../reducers";

export const selectEditMenuOptionModalIsShown = (state: ApplicationState) =>
  state.editMenuOptionModal.isShown;

export const selectEditMenuOptionModalMenuId = (state: ApplicationState) =>
  state.editMenuOptionModal.menuId;

export const selectEditMenuOptionModalMenuOptionId = (
  state: ApplicationState,
) => state.editMenuOptionModal.menuOptionId;
