import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { MenuAction, ActionData, MenuId, MenuOptionId } from "./models";

export const addMenuOption = createStandardAction("MENUS/addMenuOption")<{
  menuId: MenuId;
  menuOptionId: MenuOptionId;
}>();

export const editMenuOption = createStandardAction("MENUS/editMenuOption")<{
  menuId: MenuId;
  menuOptionId: MenuOptionId;
  isEditing: boolean;
}>();

export const deleteMenuOption = createStandardAction("MENUS/deleteMenuOption")<{
  menuId: MenuId;
  menuOptionId: MenuOptionId;
}>();

export const addMenuOptionAction = createAsyncAction(
  "MENU_ACTIONS_MODAL/addMenuOptionAction.request",
  "MENU_ACTIONS_MODAL/addMenuOptionAction.success",
  "MENU_ACTIONS_MODAL/addMenuOptionAction.failure",
)<
  {
    menuId: MenuId;
    menuOptionId: MenuOptionId;
    action: MenuAction;
  },
  { menuId: MenuId; menuOptionId: MenuOptionId; actionData: ActionData },
  Error
>();
