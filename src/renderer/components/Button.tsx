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
  BORDER_WIDTH,
  SMALL_BORDER_WIDTH,
} from "../theme";

interface SmallButtonProps {
  icon?: IconName;
  primary?: boolean;
  danger?: boolean;
  large?: boolean;
  children: string;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export const Button = ({
  icon,
  primary,
  danger,
  large,
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
      large={large}
      onClick={onClick}>
      {icon && <StyledIcon icon={icon} />}

      <Text large={large}>{children}</Text>
    </Container>
  );
};

interface ContainerProps {
  hovered: boolean;
  primary?: boolean;
  danger?: boolean;
  large?: boolean;
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
  padding: 0 ${({ large }) => (large ? RHYTHM : RHYTHM / 2)}px;
  height: ${({ large }) => (large ? 40 : 26)}px;
  background-color: ${getContainerBackgroundColor};
  border-radius: ${BORDER_RADIUS / 2}px;
  border: ${({ large }) => (large ? BORDER_WIDTH : SMALL_BORDER_WIDTH)}px solid
    ${getContainerBorderColor};
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

interface TextProps {
  large?: boolean;
}

const Text = styled.div<TextProps>`
  font-size: ${({ large }) => (large ? 13 : 11)}px;
  color: ${theme.white};
  font-weight: bold;
`;
