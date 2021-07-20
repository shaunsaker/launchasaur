import React, { ReactElement, ReactNode, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { signout } from "../../store/auth/actions";
import { selectIsSignoutLoading } from "../../store/auth/selectors";
import { navigateTo } from "../../store/navigation/actions";
import { launchStationIdParam, Routes } from "../../store/navigation/models";
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  BOX_SHADOW_CSS,
  RHYTHM,
  theme,
} from "../../theme";
import { HeaderBar } from "../HeaderBar";
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

  const onCloseClick = useCallback(() => {
    dispatch(navigateTo({ to: Routes.root }));
  }, [dispatch]);

  return (
    <Container>
      <HeaderBarContainer>
        <HeaderBar title="Settings" icon="times" onClick={onCloseClick} />
      </HeaderBarContainer>

      <ContentContainer>
        <SettingsNavigationMenu routes={routes}>
          <SideMenuOption onClick={onSignOutClick}>
            {isSignOutLoading ? "Signing out..." : "Sign Out"}
          </SideMenuOption>
        </SettingsNavigationMenu>

        {children}
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  align-self: stretch;
`;

const HeaderBarContainer = styled.div``;

const ContentContainer = styled.div`
  flex-direction: row;
  flex: 1;
  width: 1024px;
  align-self: center;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: ${RHYTHM *
  4}px; // TODO: we should base this on the platform, on windows we want to avoid the taskbar
  border: ${BORDER_WIDTH}px solid ${theme.black};
  border-radius: ${BORDER_RADIUS}px;
  ${BOX_SHADOW_CSS};
  background-color: ${theme.backgroundDarkOpaque};
`;
