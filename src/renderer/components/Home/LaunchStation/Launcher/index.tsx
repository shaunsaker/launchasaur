import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useHover } from "use-hooks";
import { triggerLauncher } from "../../../../store/launchStations/actions";
import {
  LauncherData,
  LaunchStationId,
} from "../../../../store/launchStations/models";
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

interface LauncherProps extends LauncherData {
  launchStationId: LaunchStationId;
}

export const Launcher = ({
  id,
  icon,
  title,
  shortcut,
  colour,
  launchStationId,
}: LauncherProps): ReactElement => {
  // TODO: figure out context menu
  const dispatch = useDispatch();
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  const onClick = useCallback(() => {
    dispatch(
      triggerLauncher.request({
        launchStationId: launchStationId,
        launcherId: id,
      }),
    );
  }, [dispatch, launchStationId, id]);

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

      <ShortcutText>{shortcut || ""}</ShortcutText>
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

const SHORTCUT_TEXT_SIZE = 12;
const ShortcutText = styled.div`
  font-size: ${SHORTCUT_TEXT_SIZE}px;
  height: ${SHORTCUT_TEXT_SIZE}px; // allows us to have empty text with the same layout
  color: ${theme.white};
  margin-top: ${RHYTHM / 2}px;
`;
