import { objectToArray } from "../../utils/objectToArray";
import { ApplicationState } from "../reducers";
import { defaultMenuId, MenuAction, MenuId, MenuOptionId } from "./models";

export const selectMenu = (state: ApplicationState, menuId?: string) =>
  state.menus.data[menuId || defaultMenuId];

export const selectIsMenuSubmenu = (menuId: string) => menuId !== defaultMenuId;

// return all the menus that are not the default
export const selectSubmenus = (state: ApplicationState) =>
  objectToArray(state.menus.data).filter(({ id }) => id !== defaultMenuId);

export const selectMenus = (state: ApplicationState) =>
  objectToArray(state.menus.data);

export const selectMenuOption = (
  state: ApplicationState,
  { menuId, menuOptionId }: { menuId: MenuId; menuOptionId: MenuOptionId },
) => {
  const menu = selectMenu(state, menuId);
  const menuOption = menu.options[menuOptionId];

  return menuOption;
};

export const selectMenuOptionHasOpenSubmenuAction = (
  state: ApplicationState,
  { menuId, menuOptionId }: { menuId: MenuId; menuOptionId: MenuOptionId },
): boolean => {
  const menuOption = selectMenuOption(state, { menuId, menuOptionId });

  return objectToArray(menuOption.actions).some(
    (actionData) => actionData.action === MenuAction.OpenSubmenu,
  );
};
