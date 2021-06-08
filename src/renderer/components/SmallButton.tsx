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
  children: string;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export const SmallButton = ({
  icon,
  primary,
  children,
  onClick,
}: SmallButtonProps): ReactElement => {
  const [hoverRef, hovered] = useHover<HTMLDivElement>();

  return (
    <Container
      ref={hoverRef}
      hovered={hovered}
      primary={primary}
      onClick={onClick}>
      {icon && <StyledIcon icon={icon} />}

      <Text>{children}</Text>
    </Container>
  );
};

interface ContainerProps {
  hovered: boolean;
  primary?: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${RHYTHM}px;
  height: ${SMALL_BUTTON_HEIGHT}px;
  background-color: ${({ primary, hovered }) =>
    hovered && primary
      ? theme.accent67
      : primary
      ? theme.accent
      : theme.backgroundDark};
  border-radius: ${BORDER_RADIUS / 2}px;
  border: ${SMALL_BORDER_WIDTH}px solid
    ${({ hovered, primary }) =>
      primary
        ? theme.black
        : hovered
        ? theme.accent
        : primary
        ? theme.black
        : "transparent"};
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
