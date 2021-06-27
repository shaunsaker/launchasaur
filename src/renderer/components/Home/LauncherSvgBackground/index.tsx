import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { makeSvgArcPath } from "../../../svg/makeSvgArcPath";
import {
  BORDER_WIDTH,
  RHYTHM,
  SMALL_BORDER_WIDTH,
  theme,
  TRANSITION_CSS,
} from "../../../theme";
import { makeSvgArcProps } from "./makeSvgArcProps";

interface LauncherSvgBackgroundProps {
  diameter: number;
  innerDiameter: number;
  index: number;
  itemCount: number;
  colour: string;
  isHovered: boolean;
  onMount: () => void;
}

export const LauncherSvgBackground = ({
  diameter,
  innerDiameter,
  index,
  itemCount,
  colour,
  isHovered,
  onMount,
}: LauncherSvgBackgroundProps) => {
  const arcPathRef = useRef<SVGPathElement>();
  const colourPathRef = useRef<SVGPathElement>();
  const centerArcRef = useRef<SVGPathElement>();

  useLayoutEffect(() => {
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

    onMount();
  }, [
    arcPathRef,
    colourPathRef,
    diameter,
    innerDiameter,
    index,
    itemCount,
    onMount,
  ]);

  return (
    <StyledGroup launchStationDiameter={diameter}>
      <StyledPath ref={arcPathRef} hovered={isHovered} />

      <StyledColourPath
        ref={colourPathRef}
        hovered={isHovered}
        colour={colour}
      />

      <StyledPath ref={centerArcRef} hovered={isHovered} />
    </StyledGroup>
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
