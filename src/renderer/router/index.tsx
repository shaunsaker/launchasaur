import { ConnectedRouter } from "connected-react-router";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import { EditAppShortcutModal } from "../components/EditAppShortcutModal";
import { EditLinkModal } from "../components/EditLinkModal";
import { EditLaunchStationModal } from "../components/EditLaunchStationModal";
import { EditLauncherColourModal } from "../components/EditLauncherColourModal";
import { EditLauncherIconModal } from "../components/EditLauncherIconModal";
import { EditLauncherShortcutModal } from "../components/EditLauncherShortcutModal";
import { EditLauncherTitleModal } from "../components/EditLauncherTitleModal";
import { EditLaunchStationTitleModal } from "../components/EditLaunchStationTitleModal";
import { LauncherActionsModal } from "../components/LauncherActionsModal";
import { SelectLaunchStationModal } from "../components/SelectLaunchStationModal";
import { Home } from "../pages/Home";
import { Settings } from "../pages/Settings";
import { history } from "../store";
import { selectEditAppShortcutModalIsShown } from "../store/editAppShortcutModal/selectors";
import { selectEditLinkModalIsShown } from "../store/editLinkModal/selectors";
import { selectEditLaunchStationModalIsShown } from "../store/addLaunchStationModal/selectors";
import { selectEditLauncherColourModalIsShown } from "../store/editLauncherColourModal/selectors";
import { selectEditLauncherIconModalIsShown } from "../store/editLauncherIconModal/selectors";
import { selectEditLauncherShortcutModalIsShown } from "../store/editLauncherShortcutModal/selectors";
import { selectEditLauncherTitleModalIsShown } from "../store/editLauncherTitleModal/selectors";
import { selectEditLaunchStationTitleModalIsShown } from "../store/editLaunchStationTitleModal/selectors";
import { selectLauncherActionsModalIsShown } from "../store/launcherActionsModal/selectors";
import { Routes } from "../store/navigation/routes";
import { selectLaunchStationModalIsShown } from "../store/selectLaunchStationModal/selectors";
import { selectEditLauncherModalIsShown } from "../store/editLauncherModal/selectors";
import { EditLauncherModal } from "../components/EditLauncherModal";

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
  const editLauncherShortcutModalIsShown = useSelector(
    selectEditLauncherShortcutModalIsShown,
  );
  const editLauncherTitleModalIsShown = useSelector(
    selectEditLauncherTitleModalIsShown,
  );
  const editLaunchStationTitleModalIsShown = useSelector(
    selectEditLaunchStationTitleModalIsShown,
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
          <Route path={Routes.settings}>
            <Settings />
          </Route>
          <Route path={Routes.launchStation}>
            <Home />
          </Route>
          <Route exact path={Routes.root}>
            <Home />
          </Route>
        </Switch>

        {launcherActionsModalIsShown && <LauncherActionsModal />}

        {editLinkModalIsShown && <EditLinkModal />}

        {launchStationSelectorModalIsShown && <SelectLaunchStationModal />}

        {editLaunchStationModalIsShown && <EditLaunchStationModal />}

        {editAppShortcutModalIsShown && <EditAppShortcutModal />}

        {editLauncherShortcutModalIsShown && <EditLauncherShortcutModal />}

        {editLauncherTitleModalIsShown && <EditLauncherTitleModal />}

        {editLaunchStationTitleModalIsShown && <EditLaunchStationTitleModal />}

        {editLauncherColourModalIsShown && <EditLauncherColourModal />}

        {editLauncherIconModalIsShown && <EditLauncherIconModal />}

        {editLauncherModalIsShown && <EditLauncherModal />}
      </HashRouter>
    </ConnectedRouter>
  );
};
