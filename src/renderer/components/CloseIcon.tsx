import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import { RHYTHM, theme, TRANSITION_CSS } from "../theme";

interface CloseIconProps {
  onClick: () => void;
}

export const CloseIcon = ({ onClick }: CloseIconProps) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <CloseIconContainer ref={hoverRef} onClick={onClick}>
      <StyledCloseIcon icon="times" hovered={isHovered} />
    </CloseIconContainer>
  );
};

export const CLOSE_ICON_SIZE = 24;
export const CLOSE_ICON_PADDING = RHYTHM;

const CloseIconContainer = styled.div`
  cursor: pointer;
  padding: ${CLOSE_ICON_PADDING}px;
`;

interface StyledCloseIconProps {
  hovered: boolean;
}

const StyledCloseIcon = styled(FontAwesomeIcon)<StyledCloseIconProps>`
  font-size: ${CLOSE_ICON_SIZE}px;
  color: ${({ hovered }) => (hovered ? theme.accent : theme.white)};
  transition: color ${TRANSITION_CSS};
`;
