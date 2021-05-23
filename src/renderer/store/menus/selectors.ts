import { objectToArray } from "../../utils/objectToArray";
import { ApplicationState } from "../reducers";
import { defaultMenuId } from "./models";

export const selectMenu = (
  state: ApplicationState,
  menuId: string | undefined,
) => state.menus.data[menuId];

// return all the menus that are not the default
export const selectSubmenus = (state: ApplicationState) =>
  objectToArray(state.menus.data).filter(({ id }) => id !== defaultMenuId);
