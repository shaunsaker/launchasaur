import { ConnectedRouter } from "connected-react-router";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import { EditAppShortcutModal } from "../components/EditAppShortcutModal";
import { EditLinkModal } from "../components/EditLinkModal";
import { EditLaunchStationModal } from "../components/EditLaunchStationModal";
import { EditLauncherColourModal } from "../components/EditLauncherColourModal";
import { EditLauncherIconModal } from "../components/EditLauncherIconModal";
import { LauncherActionsModal } from "../components/LauncherActionsModal";
import { SelectLaunchStationModal } from "../components/SelectLaunchStationModal";
import { history } from "../store";
import { selectEditAppShortcutModalIsShown } from "../store/editAppShortcutModal/selectors";
import { selectEditLinkModalIsShown } from "../store/editLinkModal/selectors";
import { selectEditLaunchStationModalIsShown } from "../store/addLaunchStationModal/selectors";
import { selectEditLauncherColourModalIsShown } from "../store/editLauncherColourModal/selectors";
import { selectEditLauncherIconModalIsShown } from "../store/editLauncherIconModal/selectors";
import { selectEditLauncherTitleModalIsShown } from "../store/editLauncherTitleModal/selectors";
import { selectEditLaunchStationTitleModalIsShown } from "../store/editLaunchStationTitleModal/selectors";
import { selectLauncherActionsModalIsShown } from "../store/launcherActionsModal/selectors";
import { Routes } from "../store/navigation/routes";
import { selectLaunchStationModalIsShown } from "../store/selectLaunchStationModal/selectors";
import { selectEditLauncherModalIsShown } from "../store/editLauncherModal/selectors";
import { EditLauncherModal } from "../components/EditLauncherModal";
import { Home } from "../components/Home";
import { SettingsLaunchStations } from "../components/Settings/SettingsLaunchStations";
import { SettingsAccount } from "../components/Settings/SettingsAccount";
import { SettingsAppSettingsAppShortcut } from "../components/Settings/SettingsAppSettingsAppShortcut";

export const Router = (): ReactElement => {
  const launcherActionsModalIsShown = useSelector(
    selectLauncherActionsModalIsShown,
  );
  const editLinkModalIsShown = useSelector(selectEditLinkModalIsShown);
  const launchStationSelectorModalIsShown = useSelector(
    selectLaunchStationModalIsShown,
  );
  const editLaunchStationModalIsShown = useSelector(
    selectEditLaunchStationModalIsShown,
  );
  const editAppShortcutModalIsShown = useSelector(
    selectEditAppShortcutModalIsShown,
  );
  const editLauncherColourModalIsShown = useSelector(
    selectEditLauncherColourModalIsShown,
  );
  const editLauncherIconModalIsShown = useSelector(
    selectEditLauncherIconModalIsShown,
  );
  const editLauncherModalIsShown = useSelector(selectEditLauncherModalIsShown);

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

          <Route path={Routes.settingsAccount}>
            <SettingsAccount />
          </Route>

          <Route path={Routes.settingsAppSettingsAppShortcut}>
            <SettingsAppSettingsAppShortcut />
          </Route>
        </Switch>

        {editLauncherModalIsShown && <EditLauncherModal />}

        {editLauncherIconModalIsShown && <EditLauncherIconModal />}

        {launcherActionsModalIsShown && <LauncherActionsModal />}

        {editLinkModalIsShown && <EditLinkModal />}

        {launchStationSelectorModalIsShown && <SelectLaunchStationModal />}

        {editLaunchStationModalIsShown && <EditLaunchStationModal />}

        {editAppShortcutModalIsShown && <EditAppShortcutModal />}

        {editLauncherColourModalIsShown && <EditLauncherColourModal />}
      </HashRouter>
    </ConnectedRouter>
  );
};
