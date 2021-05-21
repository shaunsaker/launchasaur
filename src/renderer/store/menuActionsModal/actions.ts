import { createStandardAction } from "typesafe-actions";

export const showMenuActionsModal = createStandardAction(
  "MENU_ACTIONS_MODAL/showMenuActionsModal",
)<{ menuId: string; menuOptionId: string }>();

export const hideMenuActionsModal = createStandardAction(
  "MENU_ACTIONS_MODAL/hideMenuActionsModal",
)();
