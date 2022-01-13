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
import { ParagraphText } from "../../../ParagraphText";
import { SubtitleText } from "../../../SubtitleText";

interface LauncherBaseProps
  extends Omit<LauncherData, "id" | "actions" | "order"> {
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

      <LauncherText>{title}</LauncherText>

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
  text-align: center;
`;

const IconContainer = styled.div`
  margin-bottom: ${RHYTHM / 2}px;
  position: relative;
`;

const LauncherText = styled(ParagraphText)``;

const ShortcutText = styled(SubtitleText)`
  font-size: 12px;
  margin-top: ${RHYTHM / 2}px;
`;
