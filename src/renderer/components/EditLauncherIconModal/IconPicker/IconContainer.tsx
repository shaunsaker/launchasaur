import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import {
  SMALL_BORDER_RADIUS,
  SMALL_BORDER_WIDTH,
  FLEX_CENTER_CSS,
  SCROLLBAR_WIDTH,
  theme,
  TRANSITION_CSS,
  ICON_SIZE,
} from "../../../theme";
import { MODAL_BORDER_WIDTH, MODAL_PADDING, MODAL_WIDTH } from "../../Modal";

interface IconContainerProps {
  icon: IconName;
  active: boolean;
  onClick: () => void;
}

export const IconContainer = ({
  icon,
  active,
  onClick,
}: IconContainerProps): ReactElement => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <Container
      ref={hoverRef}
      active={active}
      hovered={isHovered}
      onClick={onClick}>
      <StyledIcon icon={icon} />
    </Container>
  );
};

export const ICONS_PER_ROW = 6;
export const ICON_CONTAINER_SIZE =
  (MODAL_WIDTH - MODAL_PADDING * 2 - MODAL_BORDER_WIDTH * 2 - SCROLLBAR_WIDTH) /
  ICONS_PER_ROW;

interface ContainerProps {
  active: boolean;
  hovered: boolean;
}

const Container = styled.div<ContainerProps>`
  width: ${ICON_CONTAINER_SIZE}px;
  height: ${ICON_CONTAINER_SIZE}px;
  border: ${SMALL_BORDER_WIDTH}px solid
    ${({ active, hovered }) =>
      active || hovered ? theme.accent : "transparent"};
  border-radius: ${SMALL_BORDER_RADIUS}px;
  transition: border-color ${TRANSITION_CSS};
  ${FLEX_CENTER_CSS};
  cursor: pointer;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: ${ICON_SIZE}px;
  color: ${theme.white};
`;
