import { ConnectedRouter } from "connected-react-router";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { EditLinkModal } from "../components/EditLinkModal";
import { EditLauncherColourModal } from "../components/EditLauncherColourModal";
import { EditLauncherIconModal } from "../components/EditLauncherIconModal";
import { SelectLauncherActionModal } from "../components/SelectLauncherActionModal";
import { SelectLaunchStationModal } from "../components/SelectLaunchStationModal";
import { history } from "../store";
import { selectEditLinkModalIsShown } from "../store/editLinkModal/selectors";
import { selectEditLauncherColourModalIsShown } from "../store/editLauncherColourModal/selectors";
import { selectEditLauncherIconModalIsShown } from "../store/editLauncherIconModal/selectors";
import { selectLauncherActionsModalIsShown } from "../store/launcherActionsModal/selectors";
import { selectSelectLaunchStationModalIsShown } from "../store/selectLaunchStationModal/selectors";
import { Home } from "../components/Home";
import { LaunchStations } from "../components/Settings/LaunchStations";
import { EditLauncherModal } from "../components/EditLauncherModal";
import { AppShortcut } from "../components/Settings/AppSettings/AppShortcut";
import { launchStationIdParam, Routes } from "../store/navigation/models";
import { DEFAULT_LAUNCH_STATION_ID } from "../store/launchStations/models";
import { selectConfirmationModalIsShown } from "../store/confirmationModal/selectors";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { selectIsAuthenticated } from "../store/auth/selectors";
import { Login } from "../components/Login";
import { AccountInfo } from "../components/Settings/Account/Info";
import { selectLoginModalIsShown } from "../store/loginModal/selectors";
import { LoginModal } from "../components/LoginModal";
import { selecUpgradeModalIsShown } from "../store/upgradeModal/selectors";
import { UpgradeModal } from "../components/UpgradeModal";
import { selectEditLauncherModalIsShown } from "../store/editLauncherModal/selectors";
import { SelectLauncherModal } from "../components/SelectLauncherModal";
import { selectSelectLauncherModalIsShown } from "../store/selectLauncherModal/selectors";
import {
  selectShowOnboardingIntroModal,
  selectShowOnboardingOutroModal,
} from "../store/onboarding/selectors";
import { OnboardingIntroModalModal } from "../components/OnboardingIntroModal";
import { OnboardingOutroModal } from "../components/OnboardingOutroModal";

export const Router = (): ReactElement => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const launcherActionsModalIsShown = useSelector(
    selectLauncherActionsModalIsShown,
  );
  const editLinkModalIsShown = useSelector(selectEditLinkModalIsShown);
  const selectLaunchStationModalIsShown = useSelector(
    selectSelectLaunchStationModalIsShown,
  );
  const editLauncherColourModalIsShown = useSelector(
    selectEditLauncherColourModalIsShown,
  );
  const editLauncherIconModalIsShown = useSelector(
    selectEditLauncherIconModalIsShown,
  );
  const confirmationModalIsShown = useSelector(selectConfirmationModalIsShown);
  const loginModalIsShown = useSelector(selectLoginModalIsShown);
  const upgradeModalIsShown = useSelector(selecUpgradeModalIsShown);
  const editLauncherModalIsShown = useSelector(selectEditLauncherModalIsShown);
  const selectLauncherModalIsShown = useSelector(
    selectSelectLauncherModalIsShown,
  );
  const showOnboardingIntroModal = useSelector(selectShowOnboardingIntroModal);
  const showOnboardingOutroModal = useSelector(selectShowOnboardingOutroModal);

  return (
    <ConnectedRouter history={history}>
      <HashRouter>
        {isAuthenticated ? (
          <>
            <Switch>
              <Route exact path={Routes.root}>
                <Redirect
                  to={Routes.launchStation.replace(
                    launchStationIdParam,
                    DEFAULT_LAUNCH_STATION_ID,
                  )}
                />
              </Route>

              <Route path={Routes.launchStation}>
                <Home />
              </Route>

              <Route exact path={Routes.settingsLaunchStations}>
                <Redirect
                  to={Routes.settingsLaunchStation.replace(
                    launchStationIdParam,
                    DEFAULT_LAUNCH_STATION_ID,
                  )}
                />
              </Route>

              <Route path={Routes.settingsLaunchStation}>
                <LaunchStations />
              </Route>

              <Route exact path={Routes.settingsAccount}>
                <Redirect to={Routes.settingsAccountInfo} />
              </Route>

              <Route path={Routes.settingsAccountInfo}>
                <AccountInfo />
              </Route>

              <Route exact path={Routes.settingsAppSettings}>
                <Redirect to={Routes.settingsAppSettingsAppShortcut} />
              </Route>

              <Route path={Routes.settingsAppSettingsAppShortcut}>
                <AppShortcut />
              </Route>

              <Redirect to={Routes.root} />
            </Switch>

            {editLauncherModalIsShown && <EditLauncherModal />}

            {editLauncherIconModalIsShown && <EditLauncherIconModal />}

            {launcherActionsModalIsShown && <SelectLauncherActionModal />}

            {editLinkModalIsShown && <EditLinkModal />}

            {selectLaunchStationModalIsShown && <SelectLaunchStationModal />}

            {selectLauncherModalIsShown && <SelectLauncherModal />}

            {editLauncherColourModalIsShown && <EditLauncherColourModal />}

            {confirmationModalIsShown && <ConfirmationModal />}

            {loginModalIsShown && <LoginModal />}

            {upgradeModalIsShown && <UpgradeModal />}

            {showOnboardingIntroModal && <OnboardingIntroModalModal />}

            {showOnboardingOutroModal && <OnboardingOutroModal />}
          </>
        ) : (
          <Switch>
            <Route path={Routes.login}>
              <Login />
            </Route>

            <Redirect to={Routes.login} />
          </Switch>
        )}
      </HashRouter>
    </ConnectedRouter>
  );
};
