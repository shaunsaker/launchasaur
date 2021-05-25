import { ApplicationState } from "../reducers";

export const selectEditMenuOptionTitleModalIsShown = (
  state: ApplicationState,
) => state.editMenuOptionTitleModal.isShown;

export const selectEditMenuOptionTitleModalMenuId = (state: ApplicationState) =>
  state.editMenuOptionTitleModal.menuId;

export const selectEditMenuOptionTitleModalMenuOptionId = (
  state: ApplicationState,
) => state.editMenuOptionTitleModal.menuOptionId;
