import { createAsyncAction, createStandardAction } from "typesafe-actions";
import {
  MenuAction,
  ActionData,
  MenuId,
  MenuOptionId,
  ActionId,
  MenuTitle,
  Shortcut,
} from "./models";

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

export const deleteMenuOptionAction = createStandardAction(
  "MENUS/deleteMenuOptionAction",
)<{
  menuId: MenuId;
  menuOptionId: MenuOptionId;
  actionId: ActionId;
}>();

export const addMenu =
  createStandardAction("MENUS/addMenu")<{
    title: MenuTitle;
  }>();

export const triggerMenuOption = createAsyncAction(
  "MENUS/triggerMenuOptionRequest",
  "MENUS/triggerMenuOptionSuccess",
  "MENUS/triggerMenuOptionFailure",
)<
  {
    menuId: MenuId;
    menuOptionId: MenuOptionId;
  },
  void,
  Error
>();

export const setMenuOptionShortcut = createStandardAction(
  "MENUS/setMenuOptionShortcut",
)<{
  menuId: MenuId;
  menuOptionId: MenuOptionId;
  shortcut: Shortcut;
}>();

export const setMenuOptionTitle = createStandardAction(
  "MENUS/setMenuOptionTitle",
)<{
  menuId: MenuId;
  menuOptionId: MenuOptionId;
  title: string;
}>();

export const setMenuTitle =
  createStandardAction("MENUS/setMenuTitle")<{
    menuId: MenuId;
    title: string;
  }>();
