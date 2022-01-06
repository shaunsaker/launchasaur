import React, { ReactElement, ReactNode, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { navigateTo } from "../../store/navigation/actions";
import { launchStationIdParam, Routes } from "../../store/navigation/models";
import { OnboardingCoachmarkKey } from "../../store/onboarding/models";
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  BOX_SHADOW_CSS,
  theme,
} from "../../theme";
import { HeaderBar } from "../HeaderBar";
import { OnboardingCoachmark } from "../OnboardingCoachmark";
import { SideMenuOption } from "../SideMenu/SideMenuOption";
import { SubtitleText } from "../SubtitleText";
import {
  SettingsNavigationMenu,
  SettingsNavigationMenuRoute,
} from "./SettingsNavigationMenu";
import pkg from "../../../../package.json";
import { openLink } from "../../store/ipc/actions";
import { SUPPORT_EMAIL } from "../../config";

const routes: SettingsNavigationMenuRoute[] = [
  {
    key: "launchStations",
    title: "Launch Stations",
    route: Routes.settingsLaunchStations,
    baseRoute: Routes.settingsLaunchStation.replace(launchStationIdParam, ""),
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

  const onSupportClick = useCallback(() => {
    dispatch(openLink.request({ url: `mailto: ${SUPPORT_EMAIL}` }));
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
            <SideMenuOption onClick={onSupportClick}>Support</SideMenuOption>
          </SettingsNavigationMenu>
        </OnboardingCoachmark>

        {children}
      </ContentContainer>

      <VersionContainer>
        <SubtitleText>Launchasaur (Alpha) v{pkg.version}</SubtitleText>
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
const TASKBAR_HEIGHT = 41;

const VERSION_CONTAINER_HEIGHT = 32;

const ContentContainer = styled.div`
  flex-direction: row;
  flex: 1;
  width: 1024px;
  align-self: center;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: ${TASKBAR_HEIGHT + VERSION_CONTAINER_HEIGHT}px;
  border: ${BORDER_WIDTH}px solid ${theme.black};
  border-radius: ${BORDER_RADIUS}px;
  ${BOX_SHADOW_CSS};
  background-color: ${theme.backgroundDarkOpaque};
`;

const VersionContainer = styled.div`
  position: fixed;
  bottom: ${TASKBAR_HEIGHT}px;
  left: 50%;
  transform: translateX(-50%);
  height: ${VERSION_CONTAINER_HEIGHT}px;
  justify-content: center;
`;
