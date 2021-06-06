import { createStandardAction } from "typesafe-actions";

export const showEditMenuOptionModal = createStandardAction(
  "EDIT_MENU_OPTION_MODAL/showEditMenuOptionModal",
)<{ menuId: string; menuOptionId: string }>();

export const hideEditMenuOptionModal = createStandardAction(
  "EDIT_MENU_OPTION_MODAL/hideEditMenuOptionModal",
)();
