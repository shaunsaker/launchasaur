import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEvent, ReactElement } from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import { RHYTHM, theme, TRANSITION_CSS } from "../../../../../theme";

export interface ContextMenuItemProps {
  icon: IconName;
  children: string;
  onClick: (event: MouseEvent) => void;
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
  padding: ${RHYTHM / 2}px;
  background-color: ${({ hovered }) =>
    hovered ? theme.backgroundLight : theme.backgroundDark};
  transition: background-color ${TRANSITION_CSS};
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 14px;
  color: ${theme.white};
  margin-right: ${RHYTHM / 2}px;
  margin-bottom: 2px;
`;

const Text = styled.div`
  font-size: 14px;
  color: ${theme.white};
`;
