import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { Routes } from "../../store/navigation/models";
import { Page } from "../Page";
import {
  SettingsNavigationMenu,
  SettingsNavigationMenuRoute,
} from "./SettingsNavigationMenu";

const routes: SettingsNavigationMenuRoute[] = [
  {
    key: "Launch Stations",
    title: "Launch Stations",
    route: Routes.settingsLaunchStations,
  },
  {
    key: "App Settings",
    title: "App Settings",
    route: Routes.settingsAppSettingsAppShortcut,
  },
];

interface SettingsBaseProps {
  children: ReactNode;
}

export const SettingsBase = ({ children }: SettingsBaseProps): ReactElement => {
  return (
    <Page>
      <Container>
        <SettingsNavigationMenu routes={routes} />

        {children}
      </Container>
    </Page>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
`;
