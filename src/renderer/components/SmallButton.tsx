import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEvent, ReactElement } from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import {
  BORDER_RADIUS,
  SMALL_BORDER_WIDTH,
  RHYTHM,
  theme,
  TRANSITION_CSS,
  BOX_SHADOW_CSS,
} from "../theme";

export const SMALL_BUTTON_HEIGHT = 30;

interface SmallButtonProps {
  icon?: IconName;
  primary?: boolean;
  danger?: boolean;
  children: string;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export const SmallButton = ({
  icon,
  primary,
  danger,
  children,
  onClick,
}: SmallButtonProps): ReactElement => {
  const [hoverRef, hovered] = useHover<HTMLDivElement>();

  return (
    <Container
      ref={hoverRef}
      hovered={hovered}
      primary={primary}
      danger={danger}
      onClick={onClick}>
      {icon && <StyledIcon icon={icon} />}

      <Text>{children}</Text>
    </Container>
  );
};

interface ContainerProps {
  hovered: boolean;
  primary?: boolean;
  danger?: boolean;
}

const getContainerBackgroundColor = ({
  primary,
  danger,
  hovered,
}: ContainerProps): string => {
  ``;
  if (hovered) {
    if (primary) {
      return theme.accent67;
    }

    if (danger) {
      return theme.danger67;
    }
  }

  if (primary) {
    return theme.accent;
  }

  if (danger) {
    return theme.danger;
  }

  return theme.backgroundDark33;
};

const getContainerBorderColor = ({
  primary,
  danger,
  hovered,
}: ContainerProps): string => {
  if (hovered) {
    if (!primary && !danger) {
      return theme.accent;
    }
  }

  return theme.black;
};

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${RHYTHM}px;
  height: ${SMALL_BUTTON_HEIGHT}px;
  background-color: ${getContainerBackgroundColor};
  border-radius: ${BORDER_RADIUS / 2}px;
  border: ${SMALL_BORDER_WIDTH}px solid ${getContainerBorderColor};
  transition: all ${TRANSITION_CSS};
  ${BOX_SHADOW_CSS};
  cursor: pointer;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 12px;
  color: ${theme.white};
  margin-right: ${RHYTHM / 2}px;
  margin-bottom: 2px;
`;

const Text = styled.div`
  font-size: 11px;
  color: ${theme.white};
  font-weight: bold;
`;
