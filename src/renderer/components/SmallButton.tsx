import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import {
  borderRadius,
  borderWidth,
  boxShadowCSS,
  rhythm,
  theme,
  transitionCSS,
} from "../theme";

export const SMALL_BUTTON_HEIGHT = 29;

interface SmallButtonProps {
  icon: IconName;
  primary?: boolean;
  children: string;
  onClick: () => void;
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${SMALL_BUTTON_HEIGHT}px;
  padding: 0 ${rhythm / 2}px;
  background-color: ${({ hovered, primary }) =>
    hovered || primary ? theme.accent : theme.backgroundDark};
  border-radius: ${borderRadius}px;
  transition: all ${transitionCSS};
  box-sizing: border-box;
  border: ${borderWidth}px solid
    ${({ hovered }) => (hovered ? theme.backgroundDark : "transparent")};
  ${({ hovered }) => (hovered ? "" : boxShadowCSS)}
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 12px;
  color: ${theme.white};
  margin-right: ${rhythm / 4}px;
`;

const Text = styled.div`
  font-size: 12px;
  color: ${theme.white};
  font-weight: bold;
`;
