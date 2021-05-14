import React, { ReactElement } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";

export const Router = (): ReactElement => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </HashRouter>
  );
};
