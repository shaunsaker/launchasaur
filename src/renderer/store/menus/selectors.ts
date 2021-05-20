import { isEmptyObject } from "../../utils/isEmptyObject";
import { ApplicationState } from "../reducers";

export const selectMenu = (
  state: ApplicationState,
  menuId: string | undefined,
) => state.menus.data[menuId] || state.menus.data.default;

export const selectMenus = (state: ApplicationState) => state.menus.data;

export const selectHasMenus = (state: ApplicationState) =>
  !isEmptyObject(state.menus.data);
