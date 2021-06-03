import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line

export enum MenuAction {
  OpenFile = "Open an App or File",
  CloseFile = "Close an App or File",
  OpenLink = "Open a Link",
  OpenSubmenu = "Open a Submenu",
}

export const menuActions = [
  MenuAction.OpenFile,
  MenuAction.CloseFile,
  MenuAction.OpenLink,
  MenuAction.OpenSubmenu,
];

export type Filepath = string;
export type MenuId = string;
export type ActionDataResource = Filepath | MenuId; // MenuId is used when the type is MenuActionTypes.OpenSubmenu

export interface ActionData {
  id: ActionId;
  action: MenuAction;
  resource: ActionDataResource;
}

export type ActionId = string;
export type Shortcut = string;

export interface MenuOptionData {
  id: MenuOptionId;
  title: string;
  icon: IconName;
  colour: string;
  actions: Record<ActionId, ActionData>;
  shortcut: Shortcut;
  isEditable: boolean;
}

export type MenuOptionId = string;
export type MenuTitle = string;

export interface MenuData {
  id: MenuId;
  title: MenuTitle;
  options: Record<MenuOptionId, MenuOptionData>;
}

export interface MenusState {
  data: Record<MenuId, MenuData>;
}

export const defaultMenuId = "default";

export const ADD_ITEM_TITLE = "Add New Item";
