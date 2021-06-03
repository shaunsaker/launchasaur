import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEvent, ReactElement } from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import {
  borderRadius,
  smallBorderWidth,
  rhythm,
  theme,
  transitionCSS,
} from "../theme";

export const SMALL_BUTTON_HEIGHT = 29;

interface SmallButtonProps {
  icon: IconName;
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
      <StyledIcon icon={icon} />

      <Text>{children}</Text>
    </Container>
  );
};

interface ContainerProps {
  hovered: boolean;
  primary: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${SMALL_BUTTON_HEIGHT}px;
  background-color: ${theme.backgroundDark};
  border-radius: ${borderRadius}px;
  border: ${smallBorderWidth}px solid
    ${({ hovered }) => (hovered ? theme.accent : "transparent")};
  transition: all ${transitionCSS};
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 12px;
  color: ${theme.white};
  margin-right: ${rhythm / 2}px;
`;

const Text = styled.div`
  font-size: 11px;
  color: ${theme.white};
  font-weight: bold;
`;
