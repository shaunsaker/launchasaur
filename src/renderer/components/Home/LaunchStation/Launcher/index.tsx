import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { makeSvgArcPath } from "../../../../svg/makeSvgArcPath";
import {
  BORDER_WIDTH,
  LAUNCH_STATION_DIAMETER,
  RHYTHM,
  SMALL_BORDER_WIDTH,
  theme,
  TRANSITION_CSS,
} from "../../../../theme";
import { makeSvgArcProps } from "./makeSvgArcProps";
import usePortal from "react-useportal";
import { LauncherForeground } from "./LauncherForeground";
import {
  LauncherData,
  LaunchStationData,
} from "../../../../store/launchStations/models";
import { LAUNCH_STATION_INNER_DIAMETER } from "..";

interface LauncherProps {
  launcher: LauncherData;
  launchStation: LaunchStationData;
  diameter: number;
  innerDiameter: number;
  index: number;
  itemCount: number;
  colour: string;
  foregroundContainerRef: MutableRefObject<HTMLDivElement>;
}

export const Launcher = ({
  launcher,
  launchStation,
  diameter,
  innerDiameter,
  index,
  itemCount,
  colour,
  foregroundContainerRef,
}: LauncherProps) => {
  const arcPathRef = useRef<SVGPathElement>();
  const colourPathRef = useRef<SVGPathElement>();
  const centerArcRef = useRef<SVGPathElement>();
  const { Portal: Overlay } = usePortal({
    bindTo: foregroundContainerRef.current,
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // create the arc path
    const svgArcProps = makeSvgArcProps({
      diameter,
      innerDiameter,
      index,
      itemCount,
    });
    const path = makeSvgArcPath(svgArcProps);

    // add the arc path to the dom
    arcPathRef.current.setAttribute("d", path);

    // create the colour path
    const colourPathInnerRadius = svgArcProps.outerRadius + RHYTHM / 2;
    const colourPath = makeSvgArcPath({
      ...svgArcProps,
      innerRadius: colourPathInnerRadius,
      outerRadius: colourPathInnerRadius + RHYTHM / 2,
    });

    // add the colour path to the dom
    colourPathRef.current.setAttribute("d", colourPath);
  }, [arcPathRef, colourPathRef, diameter, innerDiameter, index, itemCount]);

  const onHover = useCallback((isHovered) => {
    setIsHovered(isHovered);
  }, []);

  // TODO: Overlay should control the position here, LauncherForeground should purely be UI

  return (
    <>
      <StyledGroup launchStationDiameter={diameter}>
        <StyledPath ref={arcPathRef} hovered={isHovered} />

        <StyledColourPath
          ref={colourPathRef}
          hovered={isHovered}
          colour={colour}
        />

        <StyledPath ref={centerArcRef} hovered={isHovered} />
      </StyledGroup>

      <Overlay>
        <LauncherForeground
          key={launcher.id}
          diameter={LAUNCH_STATION_DIAMETER}
          innerDiameter={LAUNCH_STATION_INNER_DIAMETER}
          {...launcher}
          arcPathRef={arcPathRef}
          index={index}
          itemCount={itemCount}
          launchStationId={launchStation.id}
          isHovered={isHovered}
          isEditable={launcher.isEditable}
          onHover={onHover}
        />
      </Overlay>
    </>
  );
};

interface StyledGroupProps {
  launchStationDiameter: number;
}

const StyledGroup = styled.g<StyledGroupProps>`
  transform: translate(
    ${({ launchStationDiameter }) => launchStationDiameter / 2}px,
    ${({ launchStationDiameter }) => launchStationDiameter / 2}px
  );
`;

interface HoveredProps {
  hovered: boolean;
}

const StyledPath = styled.path<HoveredProps>`
  stroke: ${theme.black};
  stroke-width: ${BORDER_WIDTH};
  fill: ${({ hovered }) =>
    hovered ? theme.backgroundLightOpaque : theme.backgroundDarkOpaque};
  transition: all ${TRANSITION_CSS};
`;

interface StyledColourPathProps extends HoveredProps {
  colour: string;
}

const StyledColourPath = styled.path<StyledColourPathProps>`
  stroke: ${theme.black};
  stroke-width: ${SMALL_BORDER_WIDTH};
  fill: ${({ colour }) => colour};
  transition: all ${TRANSITION_CSS};
`;
