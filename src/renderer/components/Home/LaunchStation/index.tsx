import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectLaunchStation } from "../../../store/launchStations/selectors";
import { navigateTo } from "../../../store/navigation/actions";
import { Routes } from "../../../store/navigation/models";
import { ApplicationState } from "../../../store/reducers";
import { LAUNCHER_SIZE, RHYTHM, theme } from "../../../theme";
import { objectToArray } from "../../../utils/objectToArray";
import { HeaderBar } from "../../HeaderBar";
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

  return (
    <Container>
      <HeaderBarContainer>
        <HeaderBar
          title={`${launchStation.title} Launch Station`}
          icon="cog"
          onClick={onSettingsClick}
        />
      </HeaderBarContainer>

      <LaunchersContainer>
        {launchers.map((launcher) => (
          <LauncherContainer key={launcher.id}>
            <Launcher {...launcher} launchStationId={launchStation.id} />
          </LauncherContainer>
        ))}
      </LaunchersContainer>
    </Container>
  );
};

const Container = styled.div``;

const HeaderBarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

const MAX_LAUNCHERS_PER_ROW = 4;
const LAUNCHER_CONTAINER_MARGIN = RHYTHM / 2;

const LaunchersContainer = styled.div`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: ${(LAUNCHER_SIZE + LAUNCHER_CONTAINER_MARGIN * 2) *
  MAX_LAUNCHERS_PER_ROW}px;
`;

const LauncherContainer = styled.div`
  margin: ${LAUNCHER_CONTAINER_MARGIN}px;
`;
