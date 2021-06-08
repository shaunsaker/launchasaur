import React, { ReactElement, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { HomeRouteParams } from "../../pages/Home";
import { makeLauncherData } from "../../store/launchStations/data";
import { ADD_ITEM_TITLE } from "../../store/launchStations/models";
import { selectLaunchStation } from "../../store/launchStations/selectors";
import { ApplicationState } from "../../store/reducers";
import { ABSOLUTE_CENTER_CSS, FLEX_CENTER_CSS } from "../../theme";
import { objectToArray } from "../../utils/objectToArray";
import { LogoButton } from "./LogoButton";
import { LauncherForeground } from "./LauncherForeground";
import { LauncherSvgBackground } from "./LauncherSvgBackground";

const LAUNCH_STATION_DIAMETER = 640;
const LAUNCH_STATION_INNER_DIAMETER = 128;

export const LaunchStation = (): ReactElement => {
  const { launchStationId } = useParams<HomeRouteParams>();
  const launchStation = useSelector((state: ApplicationState) =>
    selectLaunchStation(state, launchStationId),
  );
  const [svgBackgroundHasMounted, setSvgBackgroundHasMounted] = useState(false);
  const [launcherIndexHovered, setLauncherIndexHovered] = useState(null);
  const launchers = [
    ...objectToArray(launchStation?.launchers),
    makeLauncherData({
      title: ADD_ITEM_TITLE,
      icon: "plus",
      shortcut: "Ctrl + R",
      isEditable: false,
    }),
  ];
  const itemCount = launchers.length;

  const onMountSvgBackground = useCallback(() => {
    setSvgBackgroundHasMounted(true);
  }, []);

  const onHoverLauncher = useCallback((index: number) => {
    setLauncherIndexHovered(index);
  }, []);

  return (
    <Container>
      <SvgBackgroundContainer id={launchStation.id}>
        {launchers.map((launcher, index) => (
          <LauncherSvgBackground
            key={launcher.id}
            diameter={LAUNCH_STATION_DIAMETER}
            innerDiameter={LAUNCH_STATION_INNER_DIAMETER}
            index={index}
            itemCount={itemCount}
            colour={launcher.colour}
            isHovered={launcherIndexHovered === index}
            onMount={onMountSvgBackground}
          />
        ))}
      </SvgBackgroundContainer>

      <ForegroundContainer>
        {launchers.map((launcher, index) => (
          <LauncherForeground
            key={launcher.id}
            diameter={LAUNCH_STATION_DIAMETER}
            innerDiameter={LAUNCH_STATION_INNER_DIAMETER}
            {...launcher}
            index={index}
            itemCount={itemCount}
            launchStationId={launchStation.id}
            svgBackgroundHasMounted={svgBackgroundHasMounted}
            isHovered={launcherIndexHovered === index}
            isEditable={launcher.isEditable}
            onHover={onHoverLauncher}
          />
        ))}
      </ForegroundContainer>

      <LogoButtonContainer>
        <LogoButton diameter={LAUNCH_STATION_INNER_DIAMETER} />
      </LogoButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  flex: 1;
  ${FLEX_CENTER_CSS}
`;

const SvgBackgroundContainer = styled.svg`
  width: ${LAUNCH_STATION_DIAMETER}px;
  height: ${LAUNCH_STATION_DIAMETER}px;
`;

const ForegroundContainer = styled.div``;

const LogoButtonContainer = styled.div`
  ${ABSOLUTE_CENTER_CSS}
`;
