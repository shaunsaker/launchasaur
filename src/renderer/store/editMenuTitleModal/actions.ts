import { createStandardAction } from "typesafe-actions";

export const showEditMenuTitleModal = createStandardAction(
  "EDIT_MENU_TITLE_MODAL/showEditMenuTitleModal",
)<{ menuId: string }>();

export const hideEditMenuTitleModal = createStandardAction(
  "EDIT_MENU_TITLE_MODAL/hideEditMenuTitleModal",
)();
