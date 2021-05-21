import { isEmptyObject } from "../../utils/isEmptyObject";
import { ApplicationState } from "../reducers";
import { defaultMenuId } from "./models";

export const selectMenu = (
  state: ApplicationState,
  menuId: string | undefined,
) =>
  menuId ? state.menus.data.get(menuId) : state.menus.data.get(defaultMenuId);

export const selectMenus = (state: ApplicationState) => state.menus.data;

export const selectHasMenus = (state: ApplicationState) =>
  !isEmptyObject(state.menus.data);
