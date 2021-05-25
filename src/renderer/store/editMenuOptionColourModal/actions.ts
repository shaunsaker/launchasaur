import { createStandardAction } from "typesafe-actions";

export const showEditMenuOptionColourModal = createStandardAction(
  "EDIT_MENU_OPTION_COLOUR_MODAL/showEditMenuOptionColourModal",
)<{ menuId: string; menuOptionId: string }>();

export const hideEditMenuOptionColourModal = createStandardAction(
  "EDIT_MENU_OPTION_COLOUR_MODAL/hideEditMenuOptionColourModal",
)();
