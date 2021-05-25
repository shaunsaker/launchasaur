import { ApplicationState } from "../reducers";

export const selectEditMenuOptionColourModalIsShown = (
  state: ApplicationState,
) => state.editMenuOptionColourModal.isShown;

export const selectEditMenuOptionColourModalMenuId = (
  state: ApplicationState,
) => state.editMenuOptionColourModal.menuId;

export const selectEditMenuOptionColourModalMenuOptionId = (
  state: ApplicationState,
) => state.editMenuOptionColourModal.menuOptionId;
