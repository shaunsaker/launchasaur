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

export interface MenuActionData {
  type: MenuAction;
  resource: Filepath | MenuId; // MenuId is used when the type is MenuActionTypes.OpenSubmenu TODO: can we just use an app url here to deep link?
}

export interface MenuOptionData {
  id: string;
  title: string;
  icon: string;
  colour: string;
  actions: MenuActionData[];
  isEditing: boolean;
}

export interface MenuData {
  id: MenuId;
  title: string;
  options: MenuOptionData[];
}

export interface MenusState {
  data: Record<MenuId, MenuData>;
}
