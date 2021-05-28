import { createStandardAction } from "typesafe-actions";

export const showAddMenuModal = createStandardAction(
  "ADD_MENU_MODAL/showAddMenuModal",
)();

export const hideAddMenuModal = createStandardAction(
  "ADD_MENU_MODAL/hideAddMenuModal",
)();
