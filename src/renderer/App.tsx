import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { Router } from "./router";
import { loadIcons } from "./icons";
import styled from "styled-components";
import { theme } from "./theme";

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.backgroundDark};
`;
