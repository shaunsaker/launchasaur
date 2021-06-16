import { combineReducers } from "redux";
import { launchstationsReducer } from "./launchStations/reducer";
import { LaunchStationsState } from "./launchStations/models";
import { LauncherActionsModalState } from "./launcherActionsModal/models";
import { launcherActionsModalReducer } from "./launcherActionsModal/reducer";
import { EditLinkModalState } from "./editLinkModal/models";
import { editLinkModalReducer } from "./editLinkModal/reducer";
import { SelectLaunchStationModalState } from "./selectLaunchStationModal/models";
import { selectLaunchStationModalReducer } from "./selectLaunchStationModal/reducer";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { SettingsState } from "./settings/models";
import { settingsReducer } from "./settings/reducer";
import { EditLauncherColourModalState } from "./editLauncherColourModal/models";
import { editLauncherColourModalReducer } from "./editLauncherColourModal/reducer";
import { editLauncherIconModalReducer } from "./editLauncherIconModal/reducer";
import { EditLauncherIconModalState } from "./editLauncherIconModal/models";
import { ConfirmationModalState } from "./confirmationModal/models";
import { confirmationModalReducer } from "./confirmationModal/reducer";

export interface ApplicationState {
  router: RouterState;
  settings: SettingsState;
  launchStations: LaunchStationsState;
  launcherActionsModal: LauncherActionsModalState;
  editLinkModal: EditLinkModalState;
  selectLaunchStationModal: SelectLaunchStationModalState;
  editLauncherColourModal: EditLauncherColourModalState;
  editLauncherIconModal: EditLauncherIconModalState;
  confirmationModal: ConfirmationModalState;
}

export const createRootReducer = (history_: History) =>
  combineReducers({
    router: connectRouter(history_),
    settings: settingsReducer,
    launchStations: launchstationsReducer,
    launcherActionsModal: launcherActionsModalReducer,
    editLinkModal: editLinkModalReducer,
    selectLaunchStationModal: selectLaunchStationModalReducer,
    editLauncherColourModal: editLauncherColourModalReducer,
    editLauncherIconModal: editLauncherIconModalReducer,
    confirmationModal: confirmationModalReducer,
  });

export const initialState = {
  router: {},
}; // TODO: fix this
