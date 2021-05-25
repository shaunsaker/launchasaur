import { ApplicationState } from "../reducers";

export const selectEditMenuOptionShortcutModalIsShown = (
  state: ApplicationState,
) => state.editMenuOptionShortcutModal.isShown;

export const selectEditMenuOptionShortcutModalMenuId = (
  state: ApplicationState,
) => state.editMenuOptionShortcutModal.menuId;

export const selectEditMenuOptionShortcutModalMenuOptionId = (
  state: ApplicationState,
) => state.editMenuOptionShortcutModal.menuOptionId;
