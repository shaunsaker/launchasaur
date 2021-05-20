import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import { MenuOptionsModal } from "./components/MenuOptionsModal";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { selectMenuOptionsModalShowForMenuId } from "./store/menuOptionsModal/selectors";

export const Router = (): ReactElement => {
  const showMenuOptionsModal = useSelector(selectMenuOptionsModalShowForMenuId);

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

      {showMenuOptionsModal && <MenuOptionsModal />}
    </HashRouter>
  );
};
