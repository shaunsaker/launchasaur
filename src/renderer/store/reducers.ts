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
import { UpgradeModalState } from "./upgradeModal/models";
import { upgradeModalReducer } from "./upgradeModal/reducer";
import { EditLauncherModalState } from "./editLauncherModal/models";
import { editLauncherModalReducer } from "./editLauncherModal/reducer";
import { SelectLauncherModalState } from "./selectLauncherModal/models";
import { selectLauncherModalReducer } from "./selectLauncherModal/reducer";
import { AppStatesState } from "./appStates/models";
import { appStatesReducer } from "./appStates/reducer";
import { OnboardingState } from "./onboarding/models";
import { onboardingReducer } from "./onboarding/reducer";

export interface ApplicationState {
  router: RouterState;
  appStates: AppStatesState;
  auth: AuthState;
  settings: SettingsState;
  launchStations: LaunchStationsState;
  snackbars: SnackbarsState;
  user: UserState;
  launcherActionsModal: LauncherActionsModalState;
  editLinkModal: EditLinkModalState;
  selectLaunchStationModal: SelectLaunchStationModalState;
  editLauncherColourModal: EditLauncherColourModalState;
  editLauncherIconModal: EditLauncherIconModalState;
  confirmationModal: ConfirmationModalState;
  loginModal: LoginModalState;
  upgradeModal: UpgradeModalState;
  editLauncherModal: EditLauncherModalState;
  selectLauncherModal: SelectLauncherModalState;
  onboarding: OnboardingState;
}

export const createRootReducer = (history_: History) =>
  combineReducers({
    router: connectRouter(history_),
    appStates: appStatesReducer,
    auth: authReducer,
    settings: settingsReducer,
    launchStations: launchstationsReducer,
    snackbars: snackbarsReducer,
    user: userReducer,
    launcherActionsModal: launcherActionsModalReducer,
    editLinkModal: editLinkModalReducer,
    selectLaunchStationModal: selectLaunchStationModalReducer,
    editLauncherColourModal: editLauncherColourModalReducer,
    editLauncherIconModal: editLauncherIconModalReducer,
    confirmationModal: confirmationModalReducer,
    loginModal: loginModalReducer,
    upgradeModal: upgradeModalReducer,
    editLauncherModal: editLauncherModalReducer,
    selectLauncherModal: selectLauncherModalReducer,
    onboarding: onboardingReducer,
  });

export const initialState = {
  router: {},
};
