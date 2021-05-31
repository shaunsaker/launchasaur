import React, { ReactElement, useEffect } from "react";
import styled from "styled-components";
import {
  rhythm,
  borderWidth,
  theme,
  dropShadowCSS,
  transitionCSS,
} from "../../theme";
import * as d3 from "d3";
import { makeSvgArcPath } from "../../svg/makeSvgArcPath";
import { useHover } from "use-hooks";

const SIZE = 640;
const INNER_CIRCLE_DIAMETER = 128;
const MARGIN = rhythm;
const BORDER_WIDTH = borderWidth;
const COLOUR_THICKNESS = 16;
const PATH_CLASSNAME = "path";
const COLOUR_CLASSNAME = "colour";

const drawMenu = () => {
  // create the arc path
  // TODO: selectors will be dynamic too
  const sectionSize = 90; // TODO: dynamic
  const startAngle = 0; // TODO: dynamic
  const endAngle = startAngle + sectionSize; // TODO: dynamic 360 / items.length
  const innerRadius = INNER_CIRCLE_DIAMETER / 2 + MARGIN;
  const outerRadius = SIZE / 2 - MARGIN;

  const path = makeSvgArcPath({
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    cornerRadius: 16,
  });

  // add the arc path to the dom
  const pathPath = d3.select(PATH_CLASSNAME);
  console.log({ pathPath });
  d3.select(PATH_CLASSNAME).attr("d", path);

  // TODO: create the colour path (this ain't working so well)
  const colourPath = makeSvgArcPath({
    innerRadius: outerRadius + MARGIN,
    outerRadius: outerRadius + MARGIN + COLOUR_THICKNESS,
    startAngle,
    endAngle,
    cornerRadius: 16,
  });

  // add the colour path to the dom
  // const colorPath = d3.select(COLOUR_CLASSNAME);
  // console.log({ colorPath });
  // d3.select(`path.${PATH_CLASSNAME}`).attr("d", colourPath);
};

interface RadialMenuProps {
  render: (diameter: number) => ReactElement; // renders in the center of the menu, e.g. Logo
}

export const RadialMenu = ({ render }: RadialMenuProps): ReactElement => {
  const [hoverRef, isHovered] = useHover<SVGSVGElement>();

  useEffect(() => {
    // TODO: pass in options and make it dynamic
    drawMenu();
  }, []);

  return (
    <Container>
      <StyledSvg width={SIZE} height={SIZE}>
        <StyledGroup ref={hoverRef} hovered={isHovered}>
          <StyledPath className={PATH_CLASSNAME} hovered={isHovered} />

          <StyledColourPath className={COLOUR_CLASSNAME} hovered={isHovered} />
        </StyledGroup>
      </StyledSvg>

      <ChildrenContainer>{render(INNER_CIRCLE_DIAMETER)}</ChildrenContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledSvg = styled.svg``;

interface StyledGroupProps {
  hovered: boolean;
}

const CENTER_POINT = SIZE / 2;
const StyledGroup = styled.g<StyledGroupProps>`
  cursor: pointer;
  transform: translate(${CENTER_POINT}px, ${CENTER_POINT}px);
  transition: transform ${transitionCSS};
`;

interface StyledPathProps {
  hovered: boolean;
}

const StyledPath = styled.path<StyledPathProps>`
  stroke: ${({ hovered }) => (hovered ? theme.accent : theme.black)};
  stroke-width: ${BORDER_WIDTH};
  fill: ${({ hovered }) =>
    hovered ? theme.backgroundLight : theme.backgroundDark};
  ${({ hovered }) => (hovered ? "" : dropShadowCSS)};
  transition: all ${transitionCSS};
`;

interface StyledColourPathProps {
  hovered: boolean;
}

const StyledColourPath = styled.path<StyledColourPathProps>`
  stroke: ${theme.black};
  stroke-width: ${BORDER_WIDTH};
  fill: red;
  ${({ hovered }) => (hovered ? "" : dropShadowCSS)};
  transition: all ${transitionCSS};
`;

const ChildrenContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
