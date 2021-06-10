import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useHover } from "use-hooks";
import { navigateTo } from "../../store/navigation/actions";
import { Routes } from "../../store/navigation/routes";
import {
  BORDER_WIDTH,
  FLEX_CENTER_CSS,
  theme,
  TRANSITION_CSS,
} from "../../theme";

interface LogoButtonProps {
  diameter: number;
}

export const LogoButton = ({ diameter }: LogoButtonProps): ReactElement => {
  const dispatch = useDispatch();
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  const onClick = useCallback(() => {
    dispatch(navigateTo({ to: Routes.settingsLaunchStations }));
  }, [dispatch]);

  return (
    <Container
      ref={hoverRef}
      diameter={diameter}
      hovered={isHovered}
      onClick={onClick}>
      LOGO ICON
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
  border-radius: ${({ diameter }) => diameter / 2}px;
  border-width: ${BORDER_WIDTH}px;
  border-style: solid;
  border-color: ${theme.black};
  background-color: ${({ hovered }) =>
    hovered ? theme.backgroundLight : theme.backgroundDark};
  transition: background-color ${TRANSITION_CSS};
  cursor: pointer;
  color: ${theme.white};
  ${FLEX_CENTER_CSS}
`;
