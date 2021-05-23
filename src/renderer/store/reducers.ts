import { combineReducers } from "redux";
import { menusReducer } from "./menus/reducer";
import { MenusState } from "./menus/models";
import { MenuActionsModalState } from "./menuActionsModal/models";
import { menuActionsModalReducer } from "./menuActionsModal/reducer";
import { EditLinkModalState } from "./editLinkModal/models";
import { editLinkModalReducer } from "./editLinkModal/reducer";
import { EditScriptModalState } from "./editScriptModal/models";
import { editScriptModalReducer } from "./editScriptModal/reducer";
import { SelectSubmenuModalState } from "./selectSubmenuModal/models";
import { selectSubmenuModalReducer } from "./selectSubmenuModal/reducer";
import { EditMenuModalState } from "./editMenuModal/models";
import { editMenuModalReducer } from "./editMenuModal/reducer";

export interface ApplicationState {
  menus: MenusState;
  menuActionsModal: MenuActionsModalState;
  editLinkModal: EditLinkModalState;
  editScriptModal: EditScriptModalState;
  selectSubmenuModal: SelectSubmenuModalState;
  editMenuModal: EditMenuModalState;
}

export const rootReducer = combineReducers({
  menus: menusReducer,
  menuActionsModal: menuActionsModalReducer,
  editLinkModal: editLinkModalReducer,
  editScriptModal: editScriptModalReducer,
  selectSubmenuModal: selectSubmenuModalReducer,
  editMenuModal: editMenuModalReducer,
});

export const initialState = rootReducer(undefined, { type: "" });

export default rootReducer;
