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
import { selectLaunchStationModalIsShown } from "../store/selectLaunchStationModal/selectors";
import { Home } from "../components/Home";
import { LaunchStations } from "../components/Settings/LaunchStations";
import { SettingsLauncher } from "../components/Settings/LaunchStations/SettingsLauncher";
import { AppShortcut } from "../components/Settings/AppSettings/AppShortcut";
import { launchStationIdParam, Routes } from "../store/navigation/models";
import { DEFAULT_LAUNCH_STATION_ID } from "../store/launchStations/models";

export const Router = (): ReactElement => {
  const launcherActionsModalIsShown = useSelector(
    selectLauncherActionsModalIsShown,
  );
  const editLinkModalIsShown = useSelector(selectEditLinkModalIsShown);
  const launchStationSelectorModalIsShown = useSelector(
    selectLaunchStationModalIsShown,
  );
  const editLauncherColourModalIsShown = useSelector(
    selectEditLauncherColourModalIsShown,
  );
  const editLauncherIconModalIsShown = useSelector(
    selectEditLauncherIconModalIsShown,
  );

  return (
    <ConnectedRouter history={history}>
      <HashRouter>
        <Switch>
          <Route exact path={Routes.root}>
            <Home />
          </Route>

          <Route path={Routes.launchStation}>
            <Home />
          </Route>

          <Route path={Routes.settingsLaunchStations}>
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

          <Route path={Routes.settingsLauncher}>
            <SettingsLauncher />
          </Route>

          <Route path={Routes.settingsAppSettingsAppShortcut}>
            <AppShortcut />
          </Route>
        </Switch>

        {editLauncherIconModalIsShown && <EditLauncherIconModal />}

        {launcherActionsModalIsShown && <SelectLauncherActionModal />}

        {editLinkModalIsShown && <EditLinkModal />}

        {launchStationSelectorModalIsShown && <SelectLaunchStationModal />}

        {editLauncherColourModalIsShown && <EditLauncherColourModal />}
      </HashRouter>
    </ConnectedRouter>
  );
};
