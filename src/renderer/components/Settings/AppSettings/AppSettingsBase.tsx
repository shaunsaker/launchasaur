import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { Routes } from "../../../store/navigation/models";
import {
  SettingsNavigationMenu,
  SettingsNavigationMenuRoute,
} from "../SettingsNavigationMenu";

const routes: SettingsNavigationMenuRoute[] = [
  {
    key: "App Shortcut",
    title: "App Shortcut",
    route: Routes.settingsAppSettingsAppShortcut,
    baseRoute: Routes.settingsAppSettingsAppShortcut,
  },
];

interface SettingsBaseProps {
  children: ReactNode;
}

export const AppSettingsBase = ({
  children,
}: SettingsBaseProps): ReactElement => {
  return (
    <Container>
      <SettingsNavigationMenu title="APP SETTINGS" routes={routes} />

      {children}
    </Container>
  );
};

const Container = styled.div`
  flex-direction: row;
  flex: 1;
`;
