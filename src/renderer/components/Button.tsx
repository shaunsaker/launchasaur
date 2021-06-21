import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEvent, ReactElement } from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import {
  BORDER_RADIUS,
  RHYTHM,
  theme,
  TRANSITION_CSS,
  BOX_SHADOW_CSS,
  SMALL_BORDER_WIDTH,
} from "../theme";

interface SmallButtonProps {
  icon?: IconName;
  primary?: boolean;
  danger?: boolean;
  large?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  children: string;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export const Button = ({
  icon,
  primary,
  danger,
  large,
  fullWidth,
  disabled,
  children,
  onClick,
}: SmallButtonProps): ReactElement => {
  const [hoverRef, hovered] = useHover<HTMLDivElement>();

  return (
    <Container
      ref={hoverRef}
      hovered={!disabled && hovered}
      primary={primary}
      danger={danger}
      large={large}
      $fullWidth={fullWidth}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}>
      {icon && <StyledIcon icon={icon} />}

      <Text $disabled={disabled} $large={large}>
        {children}
      </Text>
    </Container>
  );
};

interface ContainerProps {
  hovered: boolean;
  primary?: boolean;
  danger?: boolean;
  large?: boolean;
  $fullWidth?: boolean;
  disabled?: boolean;
}

const getContainerBackgroundColor = ({
  primary,
  danger,
  hovered,
  disabled,
}: ContainerProps): string => {
  if (disabled) {
    return theme.white5;
  }

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
  disabled,
}: ContainerProps): string => {
  if (disabled) {
    return theme.white5;
  }

  if (hovered) {
    if (!primary && !danger) {
      return theme.accent;
    }
  }

  return theme.black;
};

const MAX_WIDTH = 320;
export const LARGE_BUTTON_HEIGHT = 40;

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${RHYTHM / 2}px ${({ large }) => (large ? RHYTHM : RHYTHM / 2)}px;
  min-height: ${({ large }) => (large ? LARGE_BUTTON_HEIGHT : 26)}px;
  background-color: ${getContainerBackgroundColor};
  border-radius: ${BORDER_RADIUS / 2}px;
  border: ${SMALL_BORDER_WIDTH}px solid ${getContainerBorderColor};
  transition: all ${TRANSITION_CSS};
  ${({ disabled }) => (disabled ? undefined : BOX_SHADOW_CSS)};
  cursor: ${({ disabled }) => (disabled ? "unset" : "pointer")};
  max-width: ${MAX_WIDTH}px;
  width: ${({ $fullWidth }) => ($fullWidth ? `${MAX_WIDTH}px` : "initial")};
  margin: ${({ $fullWidth }) => ($fullWidth ? "0 auto" : "initial")};
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 12px;
  color: ${theme.white};
  margin-right: ${RHYTHM / 2}px;
  margin-bottom: 2px;
`;

interface TextProps {
  $large?: boolean;
  $disabled?: boolean;
}

const Text = styled.div<TextProps>`
  font-size: ${({ $large }) => ($large ? 13 : 11)}px;
  color: ${({ $disabled }) => ($disabled ? theme.white50 : theme.white)};
  font-weight: bold;
`;
