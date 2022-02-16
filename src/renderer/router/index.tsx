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
import { selectEditLauncherModalIsShown } from "../store/editLauncherModal/selectors";
import { SelectLauncherModal } from "../components/SelectLauncherModal";
import { selectSelectLauncherModalIsShown } from "../store/selectLauncherModal/selectors";
import {
  selectShowOnboardingIntroModal,
  selectShowOnboardingOutroModal,
} from "../store/onboarding/selectors";
import { OnboardingIntroModalModal } from "../components/OnboardingIntroModal";
import { OnboardingOutroModal } from "../components/OnboardingOutroModal";
import { DisplayScreen } from "../components/Settings/AppSettings/DisplayScreen";
import { Sounds } from "../components/Settings/AppSettings/Sounds";
import { selectEditScriptModalIsShown } from "../store/editScriptModal/selectors";
import { EditScriptModal } from "../components/EditScriptModal";

export const Router = (): ReactElement => {
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
  const editLauncherModalIsShown = useSelector(selectEditLauncherModalIsShown);
  const selectLauncherModalIsShown = useSelector(
    selectSelectLauncherModalIsShown,
  );
  const showOnboardingIntroModal = useSelector(selectShowOnboardingIntroModal);
  const showOnboardingOutroModal = useSelector(selectShowOnboardingOutroModal);
  const editScriptModalIsShown = useSelector(selectEditScriptModalIsShown);

  return (
    <ConnectedRouter history={history}>
      <HashRouter>
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

          <Route exact path={Routes.settingsAppSettings}>
            <Redirect to={Routes.settingsAppSettingsAppShortcut} />
          </Route>

          <Route path={Routes.settingsAppSettingsAppShortcut}>
            <AppShortcut />
          </Route>

          <Route path={Routes.settingsAppSettingsDisplayScreen}>
            <DisplayScreen />
          </Route>

          <Route path={Routes.settingsAppSettingsSounds}>
            <Sounds />
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

        {showOnboardingIntroModal && <OnboardingIntroModalModal />}

        {showOnboardingOutroModal && <OnboardingOutroModal />}

        {editScriptModalIsShown && <EditScriptModal />}
      </HashRouter>
    </ConnectedRouter>
  );
};
