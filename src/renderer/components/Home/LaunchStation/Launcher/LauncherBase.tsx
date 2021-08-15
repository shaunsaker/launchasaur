import React, { ReactElement } from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import { LauncherData } from "../../../../store/launchStations/models";
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  BOX_SHADOW_CSS,
  FLEX_CENTER_CSS,
  LAUNCHER_SIZE,
  RHYTHM,
  theme,
  TRANSITION_CSS,
} from "../../../../theme";
import { Icon } from "../../../Icon";

interface LauncherBaseProps extends Omit<LauncherData, "id" | "actions"> {
  onClick: () => void;
}

export const LauncherBase = ({
  icon,
  title,
  shortcut,
  colour,
  onClick,
}: LauncherBaseProps): ReactElement => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <Container
      ref={hoverRef}
      $isHovered={isHovered}
      $colour={colour}
      onClick={onClick}>
      <IconContainer>
        <Icon icon={icon} />
      </IconContainer>

      <Text>{title}</Text>

      {shortcut && <ShortcutText>{shortcut}</ShortcutText>}
    </Container>
  );
};

interface ContainerProps {
  $isHovered: boolean;
  $colour: string;
}

const Container = styled.div<ContainerProps>`
  width: ${LAUNCHER_SIZE}px;
  height: ${LAUNCHER_SIZE}px;
  border-radius: ${BORDER_RADIUS}px;
  background-color: ${({ $isHovered }) =>
    $isHovered ? theme.backgroundLight : theme.backgroundDarkOpaque};
  border: ${BORDER_WIDTH}px solid ${({ $colour }) => $colour};
  transition: background-color ${TRANSITION_CSS};
  padding: ${RHYTHM}px ${RHYTHM}px;
  ${FLEX_CENTER_CSS};
  ${BOX_SHADOW_CSS};
  cursor: pointer;
`;

const IconContainer = styled.div`
  margin-bottom: ${RHYTHM / 2}px;
  position: relative;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.white};
  text-align: center;
`;

const ShortcutText = styled.div`
  font-size: 12px;
  color: ${theme.white};
  margin-top: ${RHYTHM / 2}px;
`;
