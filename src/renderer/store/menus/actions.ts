import { createStandardAction } from "typesafe-actions";
import { MenuAction } from "./models";

export const addMenuOption = createStandardAction(
  "MENUS/addMenuOption",
)<string>();

export const editMenuOption = createStandardAction("MENUS/editMenuOption")<{
  menuId: string;
  menuOptionId: string;
}>();

export const addMenuAction = createStandardAction("MENUS/addMenuAction")<{
  menuId: string;
  action: MenuAction;
}>();

export const deleteMenuOption = createStandardAction("MENUS/deleteMenuOption")<{
  menuId: string;
  menuOptionId: string;
}>();
