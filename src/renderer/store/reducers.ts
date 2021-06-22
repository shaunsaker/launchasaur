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
import { AuthState } from "./auth/models";
import { authReducer } from "./auth/reducers";
import { LoginModalState } from "./loginModal/models";
import { loginModalReducer } from "./loginModal/reducer";
import { SnackbarsState } from "./snackbars/models";
import { snackbarsReducer } from "./snackbars/reducer";
import { UserState } from "./user/models";
import { userReducer } from "./user/reducer";

export interface ApplicationState {
  router: RouterState;
  auth: AuthState;
  settings: SettingsState;
  launchStations: LaunchStationsState;
  launcherActionsModal: LauncherActionsModalState;
  editLinkModal: EditLinkModalState;
  selectLaunchStationModal: SelectLaunchStationModalState;
  editLauncherColourModal: EditLauncherColourModalState;
  editLauncherIconModal: EditLauncherIconModalState;
  confirmationModal: ConfirmationModalState;
  loginModal: LoginModalState;
  snackbars: SnackbarsState;
  user: UserState;
}

export const createRootReducer = (history_: History) =>
  combineReducers({
    router: connectRouter(history_),
    auth: authReducer,
    settings: settingsReducer,
    launchStations: launchstationsReducer,
    launcherActionsModal: launcherActionsModalReducer,
    editLinkModal: editLinkModalReducer,
    selectLaunchStationModal: selectLaunchStationModalReducer,
    editLauncherColourModal: editLauncherColourModalReducer,
    editLauncherIconModal: editLauncherIconModalReducer,
    confirmationModal: confirmationModalReducer,
    loginModal: loginModalReducer,
    snackbars: snackbarsReducer,
    user: userReducer,
  });

export const initialState = {
  router: {},
};
