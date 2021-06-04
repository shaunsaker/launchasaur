import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { makeSvgArcPath } from "../../svg/makeSvgArcPath";
import {
  borderWidth,
  rhythm,
  smallBorderWidth,
  theme,
  transitionCSS,
} from "../../theme";
import { makeSvgArcProps } from "./makeSvgArcProps";

interface MenuOptionSvgBackgroundProps {
  diameter: number;
  innerDiameter: number;
  index: number;
  itemCount: number;
  colour: string;
  isHovered: boolean;
  onMount: () => void;
}

export const MenuOptionSvgBackground = ({
  diameter,
  innerDiameter,
  index,
  itemCount,
  colour,
  isHovered,
  onMount,
}: MenuOptionSvgBackgroundProps) => {
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
    const colourPathInnerRadius = svgArcProps.outerRadius + rhythm / 2;
    const colourPath = makeSvgArcPath({
      ...svgArcProps,
      innerRadius: colourPathInnerRadius,
      outerRadius: colourPathInnerRadius + rhythm / 2,
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
    <StyledGroup menuDiameter={diameter}>
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
  menuDiameter: number;
}

const StyledGroup = styled.g<StyledGroupProps>`
  transform: translate(
    ${({ menuDiameter }) => menuDiameter / 2}px,
    ${({ menuDiameter }) => menuDiameter / 2}px
  );
`;

interface HoveredProps {
  hovered: boolean;
}

const StyledPath = styled.path<HoveredProps>`
  stroke: ${theme.black};
  stroke-width: ${borderWidth};
  fill: ${({ hovered }) =>
    hovered ? theme.backgroundLight : theme.backgroundDark};
  transition: all ${transitionCSS};
`;

interface StyledColourPathProps extends HoveredProps {
  colour: string;
}

const StyledColourPath = styled.path<StyledColourPathProps>`
  stroke: ${({ hovered }) => (hovered ? theme.white : theme.black)};
  stroke-width: ${smallBorderWidth};
  fill: ${({ colour }) => colour};
  transition: all ${transitionCSS};
`;
