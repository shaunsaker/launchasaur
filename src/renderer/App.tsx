import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { Router } from "./router";
import { loadIcons } from "./icons";
import styled from "styled-components";
import {
  BORDER_RADIUS,
  FLEX_CENTER_CSS,
  RHYTHM,
  SCROLLBAR_WIDTH,
  theme,
} from "./theme";

require("../sentry");

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
  ${FLEX_CENTER_CSS};

  & * {
    box-sizing: border-box;
  }

  & ::-webkit-scrollbar {
    width: ${SCROLLBAR_WIDTH}px;
  }

  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }

  & ::-webkit-scrollbar-track,
  & ::-webkit-scrollbar-track-piece {
    background: transparent;
  }

  & ::-webkit-scrollbar-thumb {
    background: transparent;
  }

  & :hover::-webkit-scrollbar-thumb {
    background: ${theme.backgroundLight};
    border-radius: ${BORDER_RADIUS}px;
    min-height: ${RHYTHM}px;
  }

  & ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;
