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
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { EditAppShortcutModalState } from "./editAppShortcutModal/models";
import { editAppShortcutModalReducer } from "./editAppShortcutModal/reducer";
import { SettingsState } from "./settings/models";
import { settingsReducer } from "./settings/reducer";
import { EditMenuOptionShortcutModalState } from "./editMenuOptionShortcutModal/models";
import { editMenuOptionShortcutModalReducer } from "./editMenuOptionShortcutModal/reducer";
import { EditMenuOptionTitleModalState } from "./editMenuOptionTitleModal/models";
import { editMenuOptionTitleModalReducer } from "./editMenuOptionTitleModal/reducer";
import { EditMenuTitleModalState } from "./editMenuTitleModal/models";
import { editMenuTitleModalReducer } from "./editMenuTitleModal/reducer";
import { EditMenuOptionColourModalState } from "./editMenuOptionColourModal/models";
import { editMenuOptionColourModalReducer } from "./editMenuOptionColourModal/reducer";
import { editMenuOptionIconModalReducer } from "./editMenuOptionIconModal/reducer";
import { EditMenuOptionIconModalState } from "./editMenuOptionIconModal/models";

export interface ApplicationState {
  router: RouterState;
  settings: SettingsState;
  menus: MenusState;
  menuActionsModal: MenuActionsModalState;
  editLinkModal: EditLinkModalState;
  selectSubmenuModal: SelectSubmenuModalState;
  editMenuModal: EditMenuModalState;
  editAppShortcutModal: EditAppShortcutModalState;
  editMenuOptionShortcutModal: EditMenuOptionShortcutModalState;
  editMenuOptionTitleModal: EditMenuOptionTitleModalState;
  editMenuTitleModal: EditMenuTitleModalState;
  editMenuOptionColourModal: EditMenuOptionColourModalState;
  editMenuOptionIconModal: EditMenuOptionIconModalState;
}

export const createRootReducer = (history_: History) =>
  combineReducers({
    router: connectRouter(history_),
    settings: settingsReducer,
    menus: menusReducer,
    menuActionsModal: menuActionsModalReducer,
    editLinkModal: editLinkModalReducer,
    selectSubmenuModal: selectSubmenuModalReducer,
    editMenuModal: editMenuModalReducer,
    editAppShortcutModal: editAppShortcutModalReducer,
    editMenuOptionShortcutModal: editMenuOptionShortcutModalReducer,
    editMenuOptionTitleModal: editMenuOptionTitleModalReducer,
    editMenuTitleModal: editMenuTitleModalReducer,
    editMenuOptionColourModal: editMenuOptionColourModalReducer,
    editMenuOptionIconModal: editMenuOptionIconModalReducer,
  });

export const initialState = {
  router: {},
}; // TODO: fix this
