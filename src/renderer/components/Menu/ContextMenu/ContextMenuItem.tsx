import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import { rhythm, theme, transitionCSS } from "../../../theme";

export interface ContextMenuItemProps {
  icon: IconName;
  children: string;
  onClick: () => void;
}

export const ContextMenuItem = ({
  icon,
  children,
  onClick,
}: ContextMenuItemProps): ReactElement => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <Container ref={hoverRef} hovered={isHovered} onClick={onClick}>
      <StyledIcon icon={icon} />

      <Text>{children}</Text>
    </Container>
  );
};

interface ContainerProps {
  hovered: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  padding: ${rhythm / 2}px ${rhythm}px;
  background-color: ${({ hovered }) =>
    hovered ? theme.backgroundLight : theme.backgroundDark};
  transition: background-color ${transitionCSS};
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 14px;
  color: ${theme.white};
  margin-right: ${rhythm / 2}px;
`;

const Text = styled.div`
  font-size: 14px;
  color: ${theme.white};
`;
