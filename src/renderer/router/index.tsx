import { ConnectedRouter } from "connected-react-router";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
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
import { Routes } from "../store/navigation/routes";
import { selectLaunchStationModalIsShown } from "../store/selectLaunchStationModal/selectors";
import { Home } from "../components/Home";
import { SettingsLaunchStations } from "../components/Settings/SettingsLaunchStations";
import { SettingsAppSettingsAppShortcut } from "../components/Settings/SettingsAppSettingsAppShortcut";
import { SettingsLauncher } from "../components/Settings/SettingsLauncher";

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
            <SettingsLaunchStations />
          </Route>

          <Route path={Routes.settingsLaunchStations}>
            <SettingsLaunchStations />
          </Route>

          <Route path={Routes.settingsLauncher}>
            <SettingsLauncher />
          </Route>

          <Route path={Routes.settingsAppSettingsAppShortcut}>
            <SettingsAppSettingsAppShortcut />
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
