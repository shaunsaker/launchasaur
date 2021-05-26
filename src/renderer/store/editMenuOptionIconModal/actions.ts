import { createStandardAction } from "typesafe-actions";

export const showEditMenuOptionIconModal = createStandardAction(
  "EDIT_MENU_OPTION_ICON_MODAL/showEditMenuOptionIconModal",
)<{ menuId: string; menuOptionId: string }>();

export const hideEditMenuOptionIconModal = createStandardAction(
  "EDIT_MENU_OPTION_ICON_MODAL/hideEditMenuOptionIconModal",
)();
