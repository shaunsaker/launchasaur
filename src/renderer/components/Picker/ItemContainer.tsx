import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import {
  SMALL_BORDER_RADIUS,
  SMALL_BORDER_WIDTH,
  FLEX_CENTER_CSS,
  SCROLLBAR_WIDTH,
  theme,
  TRANSITION_CSS,
} from "../../theme";
import { MODAL_BORDER_WIDTH, MODAL_PADDING, MODAL_WIDTH } from "../Modal";

interface ItemContainerProps {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}

export const ItemContainer = ({
  active,
  children,
  onClick,
}: ItemContainerProps): ReactElement => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <Container
      ref={hoverRef}
      active={active}
      hovered={isHovered}
      onClick={onClick}>
      {children}
    </Container>
  );
};

export const ITEMS_PER_ROW = 6;
export const ITEM_CONTAINER_SIZE =
  (MODAL_WIDTH - MODAL_PADDING * 2 - MODAL_BORDER_WIDTH * 2 - SCROLLBAR_WIDTH) /
  ITEMS_PER_ROW;

interface ContainerProps {
  active: boolean;
  hovered: boolean;
}

const Container = styled.div<ContainerProps>`
  width: ${ITEM_CONTAINER_SIZE}px;
  height: ${ITEM_CONTAINER_SIZE}px;
  border: ${SMALL_BORDER_WIDTH}px solid
    ${({ active, hovered }) =>
      active || hovered ? theme.accent : "transparent"};
  border-radius: ${SMALL_BORDER_RADIUS}px;
  transition: border-color ${TRANSITION_CSS};
  ${FLEX_CENTER_CSS};
  cursor: pointer;
`;
