export enum MenuAction {
  openFile = "Open a File",
  closeFile = "Close a File",
  openLink = "Open a Link",
  runScript = "Run a Script",
  openSubmenu = "Open a Submenu",
}

export const menuActions = [
  MenuAction.openFile,
  MenuAction.closeFile,
  MenuAction.openLink,
  MenuAction.runScript,
  MenuAction.openSubmenu,
];

export type Filepath = string;
export type MenuId = string;

export interface MenuActionData {
  type: MenuAction;
  resource: Filepath | MenuId; // MenuId is used when the type is MenuActionTypes.openSubmenu TODO: can we just use an app url here to deep link?
}

export interface MenuOptionData {
  id: string;
  title: string;
  icon: string;
  colour: string;
  actions: MenuActionData[];
}

export interface MenuData {
  id: MenuId;
  title: string;
  options: MenuOptionData[];
}

export interface MenusState {
  data: Record<MenuId, MenuData>;
}
