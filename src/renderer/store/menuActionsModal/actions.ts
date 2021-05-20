import { createStandardAction } from "typesafe-actions";

export const showMenuActionsModal = createStandardAction(
  "MENU_OPTIONS_MODAL/showMenuActionsModal",
)<string>();

export const hideMenuOptionsModal = createStandardAction(
  "MENU_OPTIONS_MODAL/hideMenuOptionsModal",
)();
