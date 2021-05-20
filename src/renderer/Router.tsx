import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import { MenuActionsModal } from "./components/MenuActionsModal";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { selectMenuOptionsModalShowForMenuId } from "./store/menuActionsModal/selectors";

export const Router = (): ReactElement => {
  const showMenuActionsModal = useSelector(selectMenuOptionsModalShowForMenuId);

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

      {showMenuActionsModal && <MenuActionsModal />}
    </HashRouter>
  );
};
