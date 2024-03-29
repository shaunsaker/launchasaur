import React, { ReactElement, useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { playSound } from "../../../sounds/playSound";
import { addLauncher } from "../../../store/launchStations/actions";
import { selectLaunchStation } from "../../../store/launchStations/selectors";
import { navigateToSettings } from "../../../store/navigation/actions";
import { OnboardingCoachmarkKey } from "../../../store/onboarding/models";
import { ApplicationState } from "../../../store/reducers";
import { LAUNCHER_SIZE, RHYTHM, theme } from "../../../theme";
import { objectToArray } from "../../../utils/objectToArray";
import { sortArrayOfObjectsByKey } from "../../../utils/sortArrayOfObjectsByKey";
import { HeaderBar } from "../../HeaderBar";
import { OnboardingCoachmark } from "../../OnboardingCoachmark";
import { Launcher } from "./Launcher";
import { LauncherBase } from "./Launcher/LauncherBase";
import openSound from "../../../sounds/open.wav";
import { selectSettingsSoundsEnabled } from "../../../store/settings/selectors";

interface LaunchStationProps {
  id: string;
}

export const LaunchStation = ({ id }: LaunchStationProps): ReactElement => {
  const dispatch = useDispatch();
  const launchStation = useSelector((state: ApplicationState) =>
    selectLaunchStation(state, id),
  );
  const launchers = sortArrayOfObjectsByKey(
    objectToArray(launchStation?.launchers),
    "order",
  );
  const hasLaunchers = launchers.length;

  const soundsEnabled = useSelector(selectSettingsSoundsEnabled);

  const onSettingsClick = useCallback(() => {
    if (soundsEnabled) {
      playSound(openSound);
    }

    dispatch(navigateToSettings());
  }, [dispatch, soundsEnabled]);

  const onAddLauncherClick = useCallback(() => {
    dispatch(addLauncher({ launchStationId: launchStation.id }));
  }, [dispatch, launchStation.id]);

  useHotkeys("ctrl+shift+s", onSettingsClick);

  return (
    <Container>
      <HeaderBarContainer>
        <OnboardingCoachmark
          shouldRender={(key) =>
            key === OnboardingCoachmarkKey.ShowLaunchStation
          }>
          <HeaderBar
            title={`${launchStation.title} Launch Station`}
            icon="cog"
            onClick={onSettingsClick}
          />
        </OnboardingCoachmark>
      </HeaderBarContainer>

      {hasLaunchers ? (
        <OnboardingCoachmark
          shouldRender={(key) => key === OnboardingCoachmarkKey.ShowLauncher}>
          <OnboardingCoachmark
            shouldRender={(key) =>
              key === OnboardingCoachmarkKey.TriggerLauncher
            }>
            <LaunchersContainer>
              {launchers.map((launcher) => (
                <LauncherContainer key={launcher.id}>
                  <Launcher {...launcher} />
                </LauncherContainer>
              ))}
            </LaunchersContainer>
          </OnboardingCoachmark>
        </OnboardingCoachmark>
      ) : (
        <LauncherBase
          icon="plus"
          title="Add Launcher"
          shortcut=""
          colour={theme.accent}
          order={1}
          onClick={onAddLauncherClick}
        />
      )}
    </Container>
  );
};

const Container = styled.div``;

const HeaderBarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
`;

const MAX_LAUNCHERS_PER_ROW = 4;
const LAUNCHER_CONTAINER_MARGIN = RHYTHM;

const LaunchersContainer = styled.div`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: ${(LAUNCHER_SIZE + LAUNCHER_CONTAINER_MARGIN * 2) *
  MAX_LAUNCHERS_PER_ROW}px;
  position: relative;
`;

const LauncherContainer = styled.div`
  margin: ${LAUNCHER_CONTAINER_MARGIN}px;
`;
