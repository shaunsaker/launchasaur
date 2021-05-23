import { createStandardAction } from "typesafe-actions";

export const showEditMenuModal = createStandardAction(
  "EDIT_MENU_MODAL/showEditMenuModal",
)();

export const hideEditMenuModal = createStandardAction(
  "EDIT_MENU_MODAL/hideEditMenuModal",
)();
