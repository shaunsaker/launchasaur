import { createStandardAction } from "typesafe-actions";

export const showMenuOptionsModal = createStandardAction(
  "MENU_OPTIONS_MODAL/showMenuOptionsModal",
)<string>();

export const hideMenuOptionsModal = createStandardAction(
  "MENU_OPTIONS_MODAL/hideMenuOptionsModal",
)();
