import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { Router } from "./router";
import { loadIcons } from "./icons";
import styled from "styled-components";
import { FLEX_CENTER_CSS } from "./theme";
import { Notifier } from "./components/Notifier";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./fonts/fonts.css";
import { Stars } from "./components/Stars";
import { GlobalStyles } from "./components/GlobalStyles";

require("../sentry");

loadIcons();

export const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer>
          <ErrorBoundary>
            <Stars />

            <Router />

            <Notifier />
          </ErrorBoundary>
        </AppContainer>

        <GlobalStyles />
      </PersistGate>
    </Provider>
  );
};

const AppContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  ${FLEX_CENTER_CSS};
`;
