import React, { ReactElement, useEffect, useRef } from "react";
import styled from "styled-components";
import { makeSvgArc } from "../../svg/makeSvgArc";
import { appendPathToSvg } from "../../svg/appendPathToSvg";
import { rhythm, borderWidth, theme } from "../../theme";
import { makeSvg } from "../../svg/makeSvg";
import { appendSvgLine } from "../../svg/appendSvgLine";
import { makeSvgArcLineProps } from "../../svg/makeSvgArcLineProps";

const SIZE = 640;
const INNER_CIRCLE_DIAMETER = 128;
const MARGIN = rhythm;
const BORDER_WIDTH = borderWidth;
const COLOUR_THICKNESS = 16;
const BORDER_CLASSNAME = "wedge";
const COLOUR_CLASSNAME = "colour";

const drawMenu = () => {
  // create our canvas
  const svg = makeSvg({ selector: "svg", size: SIZE });

  const sectionSize = 30; // TODO: dynamic
  const startAngle = 30; // TODO: dynamic
  const endAngle = startAngle + sectionSize; // TODO: dynamic 360 / items.length
  const innerRadius = INNER_CIRCLE_DIAMETER / 2 + MARGIN;
  const outerRadius = SIZE / 2 - MARGIN;

  // inner arc
  const arcInner = makeSvgArc({
    innerRadius,
    thickness: BORDER_WIDTH,
    startAngle,
    endAngle,
  });

  appendPathToSvg(svg, arcInner, BORDER_CLASSNAME);

  // outer arc
  const arcOuter = makeSvgArc({
    innerRadius: outerRadius,
    thickness: BORDER_WIDTH,
    startAngle,
    endAngle,
  });

  appendPathToSvg(svg, arcOuter, BORDER_CLASSNAME);

  // left line
  const svgLeftLineProps = makeSvgArcLineProps({
    startAngle,
    innerRadius,
    outerRadius,
  });

  appendSvgLine({
    svg,
    color: theme.black,
    thickness: BORDER_WIDTH,
    ...svgLeftLineProps,
  });

  //  right line
  const svgRightLineProps = makeSvgArcLineProps({
    startAngle: endAngle,
    innerRadius,
    outerRadius,
  });

  appendSvgLine({
    svg,
    color: theme.black,
    thickness: BORDER_WIDTH,
    ...svgRightLineProps,
  });

  // colour arc
  const arcColour = makeSvgArc({
    innerRadius: outerRadius + MARGIN,
    thickness: COLOUR_THICKNESS,
    startAngle,
    endAngle,
    cornerRadius: rhythm,
  });

  appendPathToSvg(svg, arcColour, COLOUR_CLASSNAME);

  // colour arc border
  const arcColourBorder = makeSvgArc({
    innerRadius: outerRadius + MARGIN + BORDER_WIDTH,
    thickness: BORDER_WIDTH,
    startAngle,
    endAngle,
    cornerRadius: rhythm,
  });

  appendPathToSvg(svg, arcColourBorder, BORDER_CLASSNAME);

  // TODO: map this from the options
};

interface RadialMenuProps {
  render: (diameter: number) => ReactElement; // renders in the center of the menu, e.g. Logo
}

export const RadialMenu = ({ render }: RadialMenuProps): ReactElement => {
  const ref = useRef();

  useEffect(() => {
    drawMenu();
  }, []);

  return (
    <Container>
      <SvgRoot ref={ref} width={SIZE} height={SIZE} />

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

const SvgRoot = styled.svg`
  & .wedge {
    fill: ${theme.black};
  }

  & .colour {
    fill: blue;
  }
`;

const ChildrenContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
