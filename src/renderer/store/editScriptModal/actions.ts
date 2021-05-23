import { createStandardAction } from "typesafe-actions";

export const showEditScriptModal = createStandardAction(
  "EDIT_SCRIPT_MODAL/showEditScriptModal",
)<{ menuId: string; menuOptionId: string; actionId: string }>();

export const hideEditScriptModal = createStandardAction(
  "EDIT_SCRIPT_MODAL/hideEditScriptModal",
)();
