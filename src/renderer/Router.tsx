import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import { EditLinkModal } from "./components/EditLinkModal";
import { EditMenuModal } from "./components/EditMenuModal";
import { MenuActionsModal } from "./components/MenuActionsModal";
import { SelectSubmenuModal } from "./components/SelectSubmenuModal";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { selectEditLinkModalIsShown } from "./store/editLinkModal/selectors";
import { selectEditMenuModalIsShown } from "./store/editMenuModal/selectors";
import { selectMenuActionsModalIsShown } from "./store/menuActionsModal/selectors";
import { selectSelectSubmenuModalIsShown } from "./store/selectSubmenuModal/selectors";

export const Router = (): ReactElement => {
  const menuActionsModalIsShown = useSelector(selectMenuActionsModalIsShown);
  const editLinkModalIsShown = useSelector(selectEditLinkModalIsShown);
  const submenuModalIsShown = useSelector(selectSelectSubmenuModalIsShown);
  const editMenuModalIsShown = useSelector(selectEditMenuModalIsShown);

  return (
    <HashRouter>
      <Switch>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/:menuId">
          <Home />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      {menuActionsModalIsShown && <MenuActionsModal />}

      {editLinkModalIsShown && <EditLinkModal />}

      {submenuModalIsShown && <SelectSubmenuModal />}

      {editMenuModalIsShown && <EditMenuModal />}
    </HashRouter>
  );
};
