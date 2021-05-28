import { ConnectedRouter } from "connected-react-router";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import { EditAppShortcutModal } from "../components/EditAppShortcutModal";
import { EditLinkModal } from "../components/EditLinkModal";
import { EditMenuModal } from "../components/EditMenuModal";
import { EditMenuOptionColourModal } from "../components/EditMenuOptionColourModal";
import { EditMenuOptionIconModal } from "../components/EditMenuOptionIconModal";
import { EditMenuOptionShortcutModal } from "../components/EditMenuOptionShortcutModal";
import { EditMenuOptionTitleModal } from "../components/EditMenuOptionTitleModal";
import { EditMenuTitleModal } from "../components/EditMenuTitleModal";
import { MenuActionsModal } from "../components/MenuActionsModal";
import { SelectSubmenuModal } from "../components/SelectSubmenuModal";
import { Home } from "../pages/Home";
import { Settings } from "../pages/Settings";
import { history } from "../store";
import { selectEditAppShortcutModalIsShown } from "../store/editAppShortcutModal/selectors";
import { selectEditLinkModalIsShown } from "../store/editLinkModal/selectors";
import { selectEditMenuModalIsShown } from "../store/addMenuModal/selectors";
import { selectEditMenuOptionColourModalIsShown } from "../store/editMenuOptionColourModal/selectors";
import { selectEditMenuOptionIconModalIsShown } from "../store/editMenuOptionIconModal/selectors";
import { selectEditMenuOptionShortcutModalIsShown } from "../store/editMenuOptionShortcutModal/selectors";
import { selectEditMenuOptionTitleModalIsShown } from "../store/editMenuOptionTitleModal/selectors";
import { selectEditMenuTitleModalIsShown } from "../store/editMenuTitleModal/selectors";
import { selectMenuActionsModalIsShown } from "../store/menuActionsModal/selectors";
import { Routes } from "../store/navigation/routes";
import { selectSelectSubmenuModalIsShown } from "../store/selectSubmenuModal/selectors";

export const Router = (): ReactElement => {
  const menuActionsModalIsShown = useSelector(selectMenuActionsModalIsShown);
  const editLinkModalIsShown = useSelector(selectEditLinkModalIsShown);
  const submenuModalIsShown = useSelector(selectSelectSubmenuModalIsShown);
  const editMenuModalIsShown = useSelector(selectEditMenuModalIsShown);
  const editAppShortcutModalIsShown = useSelector(
    selectEditAppShortcutModalIsShown,
  );
  const editMenuOptionShortcutModalIsShown = useSelector(
    selectEditMenuOptionShortcutModalIsShown,
  );
  const editMenuOptionTitleModalIsShown = useSelector(
    selectEditMenuOptionTitleModalIsShown,
  );
  const editMenuTitleModalIsShown = useSelector(
    selectEditMenuTitleModalIsShown,
  );
  const editMenuOptionColourModalIsShown = useSelector(
    selectEditMenuOptionColourModalIsShown,
  );
  const editMenuOptionIconModalIsShown = useSelector(
    selectEditMenuOptionIconModalIsShown,
  );

  return (
    <ConnectedRouter history={history}>
      <HashRouter>
        <Switch>
          <Route path={Routes.settings}>
            <Settings />
          </Route>
          <Route path={Routes.submenu}>
            <Home />
          </Route>
          <Route exact path={Routes.root}>
            <Home />
          </Route>
        </Switch>

        {menuActionsModalIsShown && <MenuActionsModal />}

        {editLinkModalIsShown && <EditLinkModal />}

        {submenuModalIsShown && <SelectSubmenuModal />}

        {editMenuModalIsShown && <EditMenuModal />}

        {editAppShortcutModalIsShown && <EditAppShortcutModal />}

        {editMenuOptionShortcutModalIsShown && <EditMenuOptionShortcutModal />}

        {editMenuOptionTitleModalIsShown && <EditMenuOptionTitleModal />}

        {editMenuTitleModalIsShown && <EditMenuTitleModal />}

        {editMenuOptionColourModalIsShown && <EditMenuOptionColourModal />}

        {editMenuOptionIconModalIsShown && <EditMenuOptionIconModal />}
      </HashRouter>
    </ConnectedRouter>
  );
};
