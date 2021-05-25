import { createStandardAction } from "typesafe-actions";

export const showEditMenuOptionTitleModal = createStandardAction(
  "EDIT_MENU_OPTION_TITLE_MODAL/showEditMenuOptionTitleModal",
)<{ menuId: string; menuOptionId: string }>();

export const hideEditMenuOptionTitleModal = createStandardAction(
  "EDIT_MENU_OPTION_TITLE_MODAL/hideEditMenuOptionTitleModal",
)();
