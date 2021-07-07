import React, { ReactElement, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { makeLauncherData } from "../../../store/launchStations/data";
import { ADD_ITEM_TITLE } from "../../../store/launchStations/models";
import { selectLaunchStation } from "../../../store/launchStations/selectors";
import { ApplicationState } from "../../../store/reducers";
import {
  theme,
  LAUNCH_STATION_DIAMETER,
  FLEX_CENTER_CSS,
  ABSOLUTE_CENTER_CSS,
} from "../../../theme";
import { objectToArray } from "../../../utils/objectToArray";
import { CenterButton } from "./CenterButton";
import { LauncherForeground } from "./LauncherForeground";
import { LauncherSvgBackground } from "./LauncherSvgBackground";

const LAUNCH_STATION_INNER_DIAMETER = 128;

interface LaunchStationProps {
  id: string;
}

export const LaunchStation = ({ id }: LaunchStationProps): ReactElement => {
  const launchStation = useSelector((state: ApplicationState) =>
    selectLaunchStation(state, id),
  );
  const [svgBackgroundHasMounted, setSvgBackgroundHasMounted] = useState(false);
  const [launcherIndexHovered, setLauncherIndexHovered] = useState(null);

  let launchers = objectToArray(launchStation?.launchers);

  // allow a maximum of 7 launchers per launch station
  if (launchers.length < 7) {
    launchers = [
      ...launchers,
      makeLauncherData({
        title: ADD_ITEM_TITLE,
        icon: "plus",
        colour: theme.backgroundDarkOpaque,
        isEditable: false,
      }),
    ];
  }

  const itemCount = launchers.length;

  const onMountSvgBackground = useCallback(() => {
    setSvgBackgroundHasMounted(true);
  }, []);

  const onHoverLauncher = useCallback((index: number) => {
    setLauncherIndexHovered(index);
  }, []);

  // TODO: LauncherForeground does not update correctly when another launcher is added/removed because it does not know when svg background has updated
  // ideally svg background should control LauncherForeground but we will need a ref to the ForegroundContainer to attach those pieces too
  // we could then just use one component for each launcher
  // and move this to the Launch station component

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
            key={launcher.id + index + itemCount}
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

      <CenterButtonContainer>
        <CenterButton diameter={LAUNCH_STATION_INNER_DIAMETER} />
      </CenterButtonContainer>
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

const CenterButtonContainer = styled.div`
  ${ABSOLUTE_CENTER_CSS}
`;