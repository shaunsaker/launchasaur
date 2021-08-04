import React, { ReactElement, ReactNode, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { signout } from "../../store/auth/actions";
import { selectIsSignoutLoading } from "../../store/auth/selectors";
import { navigateTo } from "../../store/navigation/actions";
import { launchStationIdParam, Routes } from "../../store/navigation/models";
import { OnboardingCoachmarkKey } from "../../store/onboarding/models";
import {
  ABSOLUTE_CENTER_CSS,
  BORDER_RADIUS,
  BORDER_WIDTH,
  BOX_SHADOW_CSS,
  RHYTHM,
  theme,
} from "../../theme";
import { HeaderBar } from "../HeaderBar";
import { OnboardingCoachmark } from "../OnboardingCoachmark";
import { SideMenuOption } from "../SideMenu/SideMenuOption";
import { TinyText } from "../TinyText";
import {
  SettingsNavigationMenu,
  SettingsNavigationMenuRoute,
} from "./SettingsNavigationMenu";
import pkg from "../../../../package.json";

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
        <HeaderBar title="Control Panel" icon="times" onClick={onCloseClick} />
      </HeaderBarContainer>

      <ContentContainer>
        <OnboardingCoachmark
          shouldRender={(key) =>
            key === OnboardingCoachmarkKey.ShowControlPanel
          }
          placement="left">
          <SettingsNavigationMenu routes={routes}>
            <SideMenuOption onClick={onSignOutClick}>
              {isSignOutLoading ? "Signing out..." : "Sign Out"}
            </SideMenuOption>
          </SettingsNavigationMenu>
        </OnboardingCoachmark>

        {children}
      </ContentContainer>

      <VersionContainer>
        <TinyText>Launchasaur (Alpha) v{pkg.version}</TinyText>
      </VersionContainer>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  align-self: stretch;
`;

const HeaderBarContainer = styled.div``;

// TODO: we should base this on the platform, on windows we want to avoid the taskbar
const TASKBAR_MARGIN = RHYTHM * 2;

const ContentContainer = styled.div`
  flex-direction: row;
  flex: 1;
  width: 1024px;
  align-self: center;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: ${TASKBAR_MARGIN + RHYTHM * 2}px;
  border: ${BORDER_WIDTH}px solid ${theme.black};
  border-radius: ${BORDER_RADIUS}px;
  ${BOX_SHADOW_CSS};
  background-color: ${theme.backgroundDarkOpaque};
`;

const VersionContainer = styled.div`
  position: fixed;
  bottom: ${TASKBAR_MARGIN + RHYTHM / 2}px;
  left: 50%;
  transform: translateX(-50%);
`;
