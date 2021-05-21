import { createStandardAction } from "typesafe-actions";

export const showEditLinkModal = createStandardAction(
  "EDIT_LINK_MODAL/showEditLinkModal",
)<{ menuId: string; menuOptionId: string; actionId: string }>();

export const hideEditLinkModal = createStandardAction(
  "EDIT_LINK_MODAL/hideEditLinkModal",
)();
