import { combineReducers } from "redux";
import { menusReducer } from "./menus/reducer";
import { MenusState } from "./menus/models";
import { MenuActionsModalState } from "./menuActionsModal/models";
import { menuActionsModalReducer } from "./menuActionsModal/reducer";
import { EditLinkModalState } from "./editLinkModal/models";
import { editLinkModalReducer } from "./editLinkModal/reducer";
import { SelectSubmenuModalState } from "./selectSubmenuModal/models";
import { selectSubmenuModalReducer } from "./selectSubmenuModal/reducer";
import { EditMenuModalState } from "./editMenuModal/models";
import { editMenuModalReducer } from "./editMenuModal/reducer";
import { connectRouter } from "connected-react-router";
import { History } from "history";

export interface ApplicationState {
  menus: MenusState;
  menuActionsModal: MenuActionsModalState;
  editLinkModal: EditLinkModalState;
  selectSubmenuModal: SelectSubmenuModalState;
  editMenuModal: EditMenuModalState;
}

export const createRootReducer = (history_: History) =>
  combineReducers({
    router: connectRouter(history_),
    menus: menusReducer,
    menuActionsModal: menuActionsModalReducer,
    editLinkModal: editLinkModalReducer,
    selectSubmenuModal: selectSubmenuModalReducer,
    editMenuModal: editMenuModalReducer,
  });

export const initialState = {
  router: {},
}; // TODO: fix this
