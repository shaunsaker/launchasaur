import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectLaunchStation } from "../../../store/launchStations/selectors";
import { navigateTo } from "../../../store/navigation/actions";
import { Routes } from "../../../store/navigation/models";
import { ApplicationState } from "../../../store/reducers";
import {
  ABSOLUTE_CENTER_CSS,
  LAUNCHER_SIZE,
  RHYTHM,
  theme,
} from "../../../theme";
import { objectToArray } from "../../../utils/objectToArray";
import { Icon } from "../../Icon";
import { Logo } from "../../Logo";
import { Launcher } from "./Launcher";

interface LaunchStationProps {
  id: string;
}

export const LaunchStation = ({ id }: LaunchStationProps): ReactElement => {
  const dispatch = useDispatch();
  const launchStation = useSelector((state: ApplicationState) =>
    selectLaunchStation(state, id),
  );
  const launchers = objectToArray(launchStation?.launchers);

  const onSettingsClick = useCallback(() => {
    dispatch(navigateTo({ to: Routes.settingsLaunchStations }));
  }, [dispatch]);

  // TODO: Launch station title
  // TODO: Logo

  return (
    <Container>
      <LaunchersContainer>
        {launchers.map((launcher) => (
          <LauncherContainer key={launcher.id}>
            <Launcher {...launcher} launchStationId={launchStation.id} />
          </LauncherContainer>
        ))}
      </LaunchersContainer>

      <HeaderContainer>
        <Logo />

        <LaunchStationTitleText>
          {launchStation.title} Launch Station
        </LaunchStationTitleText>

        <Icon icon="cog" onClick={onSettingsClick} />
      </HeaderContainer>
    </Container>
  );
};

const Container = styled.div``;

const MAX_LAUNCHERS_PER_ROW = 4;
const LAUNCHER_CONTAINER_MARGIN = RHYTHM / 2;

const LaunchersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: ${(LAUNCHER_SIZE + LAUNCHER_CONTAINER_MARGIN * 2) *
  MAX_LAUNCHERS_PER_ROW}px;
`;

const LauncherContainer = styled.div`
  margin: ${LAUNCHER_CONTAINER_MARGIN}px;
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${RHYTHM}px;
`;

const LaunchStationTitleText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.white};
`;
