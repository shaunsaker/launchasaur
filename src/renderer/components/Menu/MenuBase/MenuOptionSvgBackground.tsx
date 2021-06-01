import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { makeSvgArcPath } from "../../../svg/makeSvgArcPath";
import {
  borderWidth,
  dropShadowCSS,
  rhythm,
  theme,
  transitionCSS,
  magicNumber,
} from "../../../theme";

export const MENU_SIZE = 640;
export const MENU_INNER_CIRCLE_DIAMETER = 128;

interface MenuOptionSvgBackgroundProps {
  index: number;
  itemCount: number;
  colour: string;
  isHovered: boolean;
  onMount: () => void;
}

export const MenuOptionSvgBackground = ({
  index,
  itemCount,
  colour,
  isHovered,
  onMount,
}: MenuOptionSvgBackgroundProps) => {
  const arcPathRef = useRef<SVGPathElement>();
  const colourPathRef = useRef<SVGPathElement>();

  useEffect(() => {
    // create the arc path
    const sectionDegrees = 360 / itemCount;
    const startAngle = index * sectionDegrees;
    const endAngle = startAngle + sectionDegrees;
    const innerRadius = MENU_INNER_CIRCLE_DIAMETER / 2 + rhythm;
    const outerRadius = MENU_SIZE / 2 - rhythm * 2;
    const cornerRadius = rhythm;
    const padAngle = magicNumber * 2;

    const path = makeSvgArcPath({
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      cornerRadius,
      padAngle,
    });

    // add the arc path to the dom
    arcPathRef.current.setAttribute("d", path);

    // create the colour path
    const colourPathInnerRadius = outerRadius + rhythm;
    const colourPath = makeSvgArcPath({
      innerRadius: colourPathInnerRadius,
      outerRadius: colourPathInnerRadius + rhythm / 2,
      startAngle,
      endAngle,
      cornerRadius,
      padAngle,
    });

    // add the colour path to the dom
    colourPathRef.current.setAttribute("d", colourPath);

    onMount();
  }, [arcPathRef, colourPathRef, index, itemCount, onMount]);

  return (
    <StyledGroup>
      <StyledPath ref={arcPathRef} hovered={isHovered} />

      <StyledColourPath
        ref={colourPathRef}
        hovered={isHovered}
        colour={colour}
      />
    </StyledGroup>
  );
};

interface HoveredProps {
  hovered: boolean;
}

const CENTER_POINT = MENU_SIZE / 2;
const StyledGroup = styled.g`
  transform: translate(${CENTER_POINT}px, ${CENTER_POINT}px);
`;

const StyledPath = styled.path<HoveredProps>`
  stroke: ${theme.black};
  stroke-width: ${borderWidth};
  fill: ${({ hovered }) =>
    hovered ? theme.backgroundLight : theme.backgroundDark};
  ${({ hovered }) => (hovered ? "" : dropShadowCSS)};
  transition: all ${transitionCSS};
`;

interface StyledColourPathProps extends HoveredProps {
  colour: string;
}

const StyledColourPath = styled.path<StyledColourPathProps>`
  stroke: ${theme.black};
  stroke-width: ${borderWidth};
  fill: ${({ colour }) => colour};
  ${({ hovered }) => (hovered ? "" : dropShadowCSS)};
  transition: all ${transitionCSS};
`;
