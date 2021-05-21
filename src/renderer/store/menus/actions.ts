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
  "MENUS/addMenuOptionActionRequest",
  "MENUS/addMenuOptionActionSuccess",
  "MENUS/addMenuOptionActionFailure",
)<
  {
    menuId: MenuId;
    menuOptionId: MenuOptionId;
    action: MenuAction;
  },
  { menuId: MenuId; menuOptionId: MenuOptionId; actionData: ActionData },
  Error
>();
