import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import { EditLinkModal } from "./components/EditLinkModal";
import { MenuActionsModal } from "./components/MenuActionsModal";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { selectEditLinkModalIsShown } from "./store/editLinkModal/selectors";
import { selectMenuActionsModalIsShown } from "./store/menuActionsModal/selectors";

export const Router = (): ReactElement => {
  const menuActionsModalIsShown = useSelector(selectMenuActionsModalIsShown);
  const editLinkModalIsShown = useSelector(selectEditLinkModalIsShown);

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
    </HashRouter>
  );
};
