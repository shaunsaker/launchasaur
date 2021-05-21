import { Map } from "immutable";

export enum MenuAction {
  OpenFile = "Open a File",
  CloseFile = "Close a File",
  OpenLink = "Open a Link",
  RunScript = "Run a Script",
  OpenSubmenu = "Open a Submenu",
}

export const menuActions = [
  MenuAction.OpenFile,
  MenuAction.CloseFile,
  MenuAction.OpenLink,
  MenuAction.RunScript,
  MenuAction.OpenSubmenu,
];

export type Filepath = string;
export type MenuId = string;

export interface ActionData {
  type: MenuAction;
  resource: Filepath | MenuId; // MenuId is used when the type is MenuActionTypes.OpenSubmenu TODO: can we just use an app url here to deep link?
}

export type ActionId = string;

export interface MenuOptionData {
  title: string;
  icon: string;
  colour: string;
  actions: Map<ActionId, ActionData>;
  isEditing: boolean;
}

export type MenuOptionId = string;

export interface MenuData {
  title: string;
  options: Map<MenuOptionId, MenuOptionData>;
}

export interface MenusState {
  data: Map<MenuId, MenuData>;
}

export const defaultMenuId = "default";
