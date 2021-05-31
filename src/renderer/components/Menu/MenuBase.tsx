import React, { ReactElement, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  rhythm,
  borderWidth,
  theme,
  dropShadowCSS,
  transitionCSS,
} from "../../theme";
import { makeSvgArcPath } from "../../svg/makeSvgArcPath";
import { useHover } from "use-hooks";
import { MenuOptionData } from "../../store/menus/models";

const SIZE = 640;
const INNER_CIRCLE_DIAMETER = 128;

interface MenuBaseOptionProps {
  index: number;
  itemCount: number;
}

const MenuBaseOption = ({ index, itemCount }: MenuBaseOptionProps) => {
  const [hoverRef, isHovered] = useHover<SVGSVGElement>();
  const arcPathRef = useRef<SVGPathElement>();
  const colourPathRef = useRef<SVGPathElement>();

  useEffect(() => {
    // create the arc path
    const sectionDegrees = 360 / itemCount;
    const startAngle = index * sectionDegrees;
    const endAngle = startAngle + sectionDegrees;
    const innerRadius = INNER_CIRCLE_DIAMETER / 2 + rhythm;
    const outerRadius = SIZE / 2 - rhythm * 2;
    const cornerRadius = rhythm;

    const path = makeSvgArcPath({
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      cornerRadius,
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
    });

    // add the colour path to the dom
    colourPathRef.current.setAttribute("d", colourPath);
  }, [arcPathRef, colourPathRef, index, itemCount]);

  return (
    <StyledGroup ref={hoverRef} hovered={isHovered}>
      <StyledPath ref={arcPathRef} hovered={isHovered} />

      <StyledColourPath ref={colourPathRef} hovered={isHovered} />
    </StyledGroup>
  );
};

interface MenuBaseProps {
  options: MenuOptionData[];
  render: (diameter: number) => ReactElement; // renders in the center of the menu, e.g. Logo
}

export const MenuBase = ({ options, render }: MenuBaseProps): ReactElement => {
  return (
    <Container>
      <StyledSvg width={SIZE} height={SIZE}>
        {options.map((option, index) => (
          <MenuBaseOption
            key={option.id}
            index={index}
            itemCount={options.length}
          />
        ))}
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
  stroke: ${theme.black};
  stroke-width: ${borderWidth};
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
  stroke-width: ${borderWidth};
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
