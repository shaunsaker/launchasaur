import React from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import {
  RHYTHM,
  SMALL_BORDER_RADIUS,
  theme,
  TRANSITION_CSS,
} from "../../theme";

interface SideMenuOptionProps {
  selected: boolean;
  children: string;
  onClick: () => void;
}

export const SideMenuOption = ({
  selected,
  children,
  onClick,
}: SideMenuOptionProps) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <Container
      ref={hoverRef}
      $isHovered={isHovered}
      $isSelected={selected}
      onClick={onClick}>
      {children}
    </Container>
  );
};

export const SIDE_MENU_OPTION_MARGIN = RHYTHM / 2;

interface ContainerProps {
  $isHovered: boolean;
  $isSelected: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 160px;
  font-size: 16px;
  font-weight: bold;
  color: ${theme.white};
  padding: ${RHYTHM / 2}px ${RHYTHM}px;
  margin: ${SIDE_MENU_OPTION_MARGIN}px 0px;
  background-color: ${({ $isHovered, $isSelected }) =>
    $isHovered || $isSelected ? theme.backgroundLight : "transparent"};
  border-radius: ${SMALL_BORDER_RADIUS}px;
  transition: background-color ${TRANSITION_CSS};
  cursor: pointer;
`;
