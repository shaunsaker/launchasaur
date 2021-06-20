import React, { ReactElement, ReactNode, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { signout } from "../../store/auth/actions";
import { Routes } from "../../store/navigation/models";
import { Page } from "../Page";
import { SideMenuOption } from "../SideMenu/SideMenuOption";
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
  const dispatch = useDispatch();

  const onSignOutClick = useCallback(() => {
    dispatch(signout.request());
  }, [dispatch]);

  return (
    <Page showClose>
      <Container>
        <SettingsNavigationMenu routes={routes}>
          <SideMenuOption onClick={onSignOutClick}>Sign Out</SideMenuOption>
        </SettingsNavigationMenu>

        {children}
      </Container>
    </Page>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
`;
