import { combineReducers } from "redux";
import { menusReducer } from "./menus/reducer";
import { MenusState } from "./menus/models";
import { MenuOptionsModalState } from "./menuActionsModal/models";
import { menuOptionsReducer } from "./menuActionsModal/reducer";

export interface ApplicationState {
  menus: MenusState;
  menuOptionsModal: MenuOptionsModalState;
}

export const rootReducer = combineReducers({
  menus: menusReducer,
  menuOptionsModal: menuOptionsReducer,
});

export const initialState = rootReducer(undefined, { type: "" });

export default rootReducer;
