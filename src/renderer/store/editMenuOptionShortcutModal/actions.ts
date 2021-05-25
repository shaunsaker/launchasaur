import { createStandardAction } from "typesafe-actions";

export const showEditMenuOptionShortcutModal = createStandardAction(
  "EDIT_MENU_OPTION_SHORTCUT_MODAL/showEditMenuOptionShortcutModal",
)<{ menuId: string; menuOptionId: string }>();

export const hideEditMenuOptionShortcutModal = createStandardAction(
  "EDIT_MENU_OPTION_SHORTCUT_MODAL/hideEditMenuOptionShortcutModal",
)();
