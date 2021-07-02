import React, { ReactElement, ReactNode, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { signout } from "../../store/auth/actions";
import { selectIsSignoutLoading } from "../../store/auth/selectors";
import { launchStationIdParam, Routes } from "../../store/navigation/models";
import { Page } from "../Page";
import { SideMenuOption } from "../SideMenu/SideMenuOption";
import {
  SettingsNavigationMenu,
  SettingsNavigationMenuRoute,
} from "./SettingsNavigationMenu";

const routes: SettingsNavigationMenuRoute[] = [
  {
    key: "launchStations",
    title: "Launch Stations",
    route: Routes.settingsLaunchStations,
    baseRoute: Routes.settingsLaunchStation.replace(launchStationIdParam, ""),
  },
  {
    key: "account",
    title: "My Account",
    route: Routes.settingsAccount,
    baseRoute: Routes.settingsAccount,
  },
  {
    key: "appSettings",
    title: "App Settings",
    route: Routes.settingsAppSettings,
    baseRoute: Routes.settingsAppSettings,
  },
];

interface SettingsBaseProps {
  children: ReactNode;
}

export const SettingsBase = ({ children }: SettingsBaseProps): ReactElement => {
  const dispatch = useDispatch();
  const isSignOutLoading = useSelector(selectIsSignoutLoading);

  const onSignOutClick = useCallback(() => {
    dispatch(signout.request());
  }, [dispatch]);

  return (
    <Page>
      <Container>
        <SettingsNavigationMenu routes={routes}>
          <SideMenuOption onClick={onSignOutClick}>
            {isSignOutLoading ? "Signing out..." : "Sign Out"}
          </SideMenuOption>
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
