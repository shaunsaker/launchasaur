import { combineReducers } from "redux";
import { launchstationsReducer } from "./launchStations/reducer";
import { LaunchStationsState } from "./launchStations/models";
import { LauncherActionsModalState } from "./launcherActionsModal/models";
import { launcherActionsModalReducer } from "./launcherActionsModal/reducer";
import { EditLinkModalState } from "./editLinkModal/models";
import { editLinkModalReducer } from "./editLinkModal/reducer";
import { SelectLaunchStationModalState } from "./selectLaunchStationModal/models";
import { selectLaunchStationModalReducer } from "./selectLaunchStationModal/reducer";
import { EditLaunchStationModalState } from "./addLaunchStationModal/models";
import { editLaunchStationModalReducer } from "./addLaunchStationModal/reducer";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { EditAppShortcutModalState } from "./editAppShortcutModal/models";
import { editAppShortcutModalReducer } from "./editAppShortcutModal/reducer";
import { SettingsState } from "./settings/models";
import { settingsReducer } from "./settings/reducer";
import { EditLauncherShortcutModalState } from "./editLauncherShortcutModal/models";
import { editLauncherShortcutModalReducer } from "./editLauncherShortcutModal/reducer";
import { EditLauncherTitleModalState } from "./editLauncherTitleModal/models";
import { editLauncherTitleModalReducer } from "./editLauncherTitleModal/reducer";
import { EditLaunchStationTitleModalState } from "./editLaunchStationTitleModal/models";
import { editLaunchStationTitleModalReducer } from "./editLaunchStationTitleModal/reducer";
import { EditLauncherColourModalState } from "./editLauncherColourModal/models";
import { editLauncherColourModalReducer } from "./editLauncherColourModal/reducer";
import { editLauncherIconModalReducer } from "./editLauncherIconModal/reducer";
import { EditLauncherIconModalState } from "./editLauncherIconModal/models";
import { EditLauncherModalState } from "./editLauncherModal/models";
import { editLauncherModalReducer } from "./editLauncherModal/reducers";

export interface ApplicationState {
  router: RouterState;
  settings: SettingsState;
  launchStations: LaunchStationsState;
  launcherActionsModal: LauncherActionsModalState;
  editLinkModal: EditLinkModalState;
  selectLaunchStationModal: SelectLaunchStationModalState;
  editLaunchStationModal: EditLaunchStationModalState;
  editAppShortcutModal: EditAppShortcutModalState;
  editLauncherShortcutModal: EditLauncherShortcutModalState;
  editLauncherTitleModal: EditLauncherTitleModalState;
  editLaunchStationTitleModal: EditLaunchStationTitleModalState;
  editLauncherColourModal: EditLauncherColourModalState;
  editLauncherIconModal: EditLauncherIconModalState;
  editLauncherModal: EditLauncherModalState;
}

export const createRootReducer = (history_: History) =>
  combineReducers({
    router: connectRouter(history_),
    settings: settingsReducer,
    launchStations: launchstationsReducer,
    launcherActionsModal: launcherActionsModalReducer,
    editLinkModal: editLinkModalReducer,
    selectLaunchStationModal: selectLaunchStationModalReducer,
    editLaunchStationModal: editLaunchStationModalReducer,
    editAppShortcutModal: editAppShortcutModalReducer,
    editLauncherShortcutModal: editLauncherShortcutModalReducer,
    editLauncherTitleModal: editLauncherTitleModalReducer,
    editLaunchStationTitleModal: editLaunchStationTitleModalReducer,
    editLauncherColourModal: editLauncherColourModalReducer,
    editLauncherIconModal: editLauncherIconModalReducer,
    editLauncherModal: editLauncherModalReducer,
  });

export const initialState = {
  router: {},
}; // TODO: fix this
