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
    route: Routes.settingsAppSettingsAppShortcut,
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
  display: flex;
  flex: 1;
`;
