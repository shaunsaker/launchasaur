import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { Router } from "./router";
import { loadIcons } from "./icons";
import styled from "styled-components";
import { flexCenterCSS, theme } from "./theme";

loadIcons();

export const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer>
          <Router />
        </AppContainer>
      </PersistGate>
    </Provider>
  );
};

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${theme.backgroundDark};
  ${flexCenterCSS}
`;
