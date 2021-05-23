import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import { EditLinkModal } from "./components/EditLinkModal";
import { EditScriptModal } from "./components/EditScriptModal";
import { MenuActionsModal } from "./components/MenuActionsModal";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { selectEditLinkModalIsShown } from "./store/editLinkModal/selectors";
import { selectEditScriptModalIsShown } from "./store/editScriptModal/selectors";
import { selectMenuActionsModalIsShown } from "./store/menuActionsModal/selectors";

export const Router = (): ReactElement => {
  const menuActionsModalIsShown = useSelector(selectMenuActionsModalIsShown);
  const editLinkModalIsShown = useSelector(selectEditLinkModalIsShown);
  const editScriptsModalIsShown = useSelector(selectEditScriptModalIsShown);

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

      {editScriptsModalIsShown && <EditScriptModal />}
    </HashRouter>
  );
};
