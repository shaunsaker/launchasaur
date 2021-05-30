import React, { ReactElement } from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import { borderWidth, shadowCSS, theme, transitionCSS } from "../../theme";

interface LogoButtonProps {
  diameter: number;
}

export const LogoButton = ({ diameter }: LogoButtonProps): ReactElement => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <Container ref={hoverRef} diameter={diameter} hovered={isHovered}>
      <div>LOGO</div>
    </Container>
  );
};

interface ContainerProps {
  diameter: number;
  hovered: boolean;
}

const Container = styled.div<ContainerProps>`
  width: ${({ diameter }) => diameter}px;
  height: ${({ diameter }) => diameter}px;
  box-sizing: border-box;
  border-radius: ${({ diameter }) => diameter / 2}px;
  border-width: ${borderWidth}px;
  border-style: solid;
  border-color: ${({ hovered }) => (hovered ? theme.accent : theme.black)};
  background-color: ${({ hovered }) =>
    hovered ? theme.backgroundLight : theme.backgroundDark};
  ${({ hovered }) => (hovered ? "box-shadow: none;" : shadowCSS)}
  transition: all ${transitionCSS};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
