import { createStandardAction } from "typesafe-actions";

export const showSelectSubmenuModal = createStandardAction(
  "SELECT_SUBMENU_MODAL/showSelectSubmenuModal",
)<{ menuId: string; menuOptionId: string; actionId: string }>();

export const hideSelectSubmenuModal = createStandardAction(
  "SELECT_SUBMENU_MODAL/hideSelectSubmenuModal",
)();
