import { combineReducers } from "redux";
import { menusReducer } from "./menus/reducer";
import { MenusState } from "./menus/models";
import { MenuActionsModalState } from "./menuActionsModal/models";
import { menuActionsReducer } from "./menuActionsModal/reducer";

export interface ApplicationState {
  menus: MenusState;
  menuActionsModal: MenuActionsModalState;
}

export const rootReducer = combineReducers({
  menus: menusReducer,
  menuActionsModal: menuActionsReducer,
});

export const initialState = rootReducer(undefined, { type: "" });

export default rootReducer;
