import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { MenuAction, ActionData, MenuId, MenuOptionId } from "./models";

export const addMenuOption = createStandardAction("MENUS/addMenuOption")<{
  menuId: MenuId;
}>();

export const editMenuOption = createStandardAction("MENUS/editMenuOption")<{
  menuId: MenuId;
  menuOptionId: MenuOptionId;
}>();

export const deleteMenuOption = createStandardAction("MENUS/deleteMenuOption")<{
  menuId: MenuId;
  menuOptionId: MenuOptionId;
}>();

export const addMenuAction = createAsyncAction(
  "MENU_ACTIONS_MODAL/addMenuAction.request",
  "MENU_ACTIONS_MODAL/addMenuAction.success",
  "MENU_ACTIONS_MODAL/addMenuAction.failure",
)<
  {
    menuId: MenuId;
    menuOptionId: MenuOptionId;
    action: MenuAction;
  },
  { menuId: MenuId; menuOptionId: MenuOptionId; actionData: ActionData },
  Error
>();
