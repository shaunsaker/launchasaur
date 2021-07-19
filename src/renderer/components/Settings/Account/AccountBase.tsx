import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { Routes } from "../../../store/navigation/models";
import {
  SettingsNavigationMenu,
  SettingsNavigationMenuRoute,
} from "../SettingsNavigationMenu";

const routes: SettingsNavigationMenuRoute[] = [
  {
    key: "info",
    title: "Info",
    route: Routes.settingsAccountInfo,
    baseRoute: Routes.settingsAccountInfo,
  },
];

interface AccountBaseProps {
  children: ReactNode;
}

export const AccountBase = ({ children }: AccountBaseProps): ReactElement => {
  return (
    <Container>
      <SettingsNavigationMenu title="MY ACCOUNT" routes={routes} />

      {children}
    </Container>
  );
};

const Container = styled.div`
  flex-direction: row;
  flex: 1;
`;
