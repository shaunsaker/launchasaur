import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import {
  borderRadius,
  boxShadowCSS,
  rhythm,
  theme,
  transitionCSS,
} from "../theme";

interface SmallButtonProps {
  icon: IconName;
  children: string;
  onClick: () => void;
}

export const SmallButton = ({
  icon,
  children,
  onClick,
}: SmallButtonProps): ReactElement => {
  const [hoverRef, hovered] = useHover<HTMLDivElement>();

  return (
    <Container ref={hoverRef} hovered={hovered} onClick={onClick}>
      <StyledIcon icon={icon} />

      <Text>{children}</Text>
    </Container>
  );
};

interface HoverProps {
  hovered: boolean;
}

const Container = styled.div<HoverProps>`
  display: flex;
  justify-content: center;
  padding: ${rhythm / 4}px ${rhythm / 2}px;
  background-color: ${({ hovered }) =>
    hovered ? theme.accent : theme.backgroundDark};
  border-radius: ${borderRadius}px;
  transition: all ${transitionCSS};
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
