import { combineReducers } from "redux";
import { menusReducer } from "./menus/reducer";
import { MenusState } from "./menus/models";
import { MenuActionsModalState } from "./menuActionsModal/models";
import { menuActionsModalReducer } from "./menuActionsModal/reducer";
import { EditLinkModalState } from "./editLinkModal/models";
import { editLinkModalReducer } from "./editLinkModal/reducer";

export interface ApplicationState {
  menus: MenusState;
  menuActionsModal: MenuActionsModalState;
  editLinkModal: EditLinkModalState;
}

export const rootReducer = combineReducers({
  menus: menusReducer,
  menuActionsModal: menuActionsModalReducer,
  editLinkModal: editLinkModalReducer,
});

export const initialState = rootReducer(undefined, { type: "" });

export default rootReducer;
