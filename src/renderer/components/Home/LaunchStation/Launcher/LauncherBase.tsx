import React, { ReactElement } from "react";
import styled from "styled-components";
import { LauncherData } from "../../../../store/launchStations/models";
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FLEX_CENTER_CSS,
  LAUNCHER_SIZE,
  RHYTHM,
  theme,
  TRANSITION_CSS,
} from "../../../../theme";
import { Icon } from "../../../Icon";
import { ParagraphText } from "../../../ParagraphText";
import { SubtitleText } from "../../../SubtitleText";
import { LauncherAnimator } from "./LauncherAnimator";

interface LauncherBaseProps extends Omit<LauncherData, "id" | "actions"> {
  onClick: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}

export const LauncherBase = ({
  icon,
  title,
  shortcut,
  colour,
  order,
  onClick,
  onMouseOver,
  onMouseOut,
  onMouseDown,
  onMouseUp,
}: LauncherBaseProps): ReactElement => {
  return (
    <LauncherAnimator order={order} colour={colour}>
      <Container
        $colour={colour}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}>
        <ContentContainer>
          <IconContainer>
            <Icon icon={icon} />
          </IconContainer>

          <LauncherText>{title}</LauncherText>

          {shortcut && <ShortcutText>{shortcut}</ShortcutText>}
        </ContentContainer>
      </Container>
    </LauncherAnimator>
  );
};

interface ContainerProps {
  $colour: string;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  width: ${LAUNCHER_SIZE}px;
  height: ${LAUNCHER_SIZE}px;
  border-radius: ${BORDER_RADIUS}px;
  background-color: ${theme.backgroundDarkOpaque};
  border: ${BORDER_WIDTH}px solid ${theme.black};
  border-color: inherit;
  padding: ${RHYTHM}px ${RHYTHM}px;
  cursor: pointer;
  text-align: center;
  box-shadow: inset -${RHYTHM / 2}px 0 ${RHYTHM / 2}px rgb(0 0 0 / 15%),
    inset 0 -${RHYTHM / 2}px ${RHYTHM / 2}px rgb(0 0 0 / 25%),
    0 0 0 ${RHYTHM / 4}px rgb(0 0 0 / 75%),
    ${RHYTHM / 2}px ${RHYTHM}px ${RHYTHM / 2}px rgb(0 0 0 / 40%);
  transition: all ${TRANSITION_CSS};

  &:hover {
    background-color: ${theme.backgroundLightOpaque};
    box-shadow: 0 0 ${RHYTHM / 4}px ${RHYTHM / 2}px ${theme.white80},
      0 0 ${RHYTHM * 2}px ${RHYTHM / 2}px ${({ $colour }) => $colour};

    & svg {
      color: ${({ $colour }) => $colour};
    }
  }

  &:active {
    box-shadow: 0 0 ${RHYTHM / 8}px ${RHYTHM / 4}px ${theme.white},
      0 0 ${RHYTHM / 1.5}px ${RHYTHM / 8}px ${({ $colour }) => $colour};
    transform: translate3d(${RHYTHM / 8}px, ${RHYTHM / 4}px, 0);
    animation: none;
  }

  &:before {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    bottom: 22px;
    right: 22px;
    background: linear-gradient(
      90deg,
      ${theme.backgroundDark33},
      ${theme.backgroundLight}
    );
    border-radius: ${BORDER_RADIUS}px;
    box-shadow: -${RHYTHM / 2}px 0 ${RHYTHM / 2}px rgb(255 255 255 / 25%),
      ${RHYTHM / 2}px ${RHYTHM / 4}px ${RHYTHM / 2}px rgb(0 0 0 / 15%);
    transition: all ${TRANSITION_CSS};
  }
`;

const ContentContainer = styled.div`
  z-index: 1;
  flex: 1;
  ${FLEX_CENTER_CSS};
  pointer-events: none;
`;

const IconContainer = styled.div`
  margin-bottom: ${RHYTHM / 2}px;
  position: relative;
`;

const LauncherText = styled(ParagraphText)``;

const ShortcutText = styled(SubtitleText)`
  font-size: 12px;
  color: ${theme.white80};
  margin-top: ${RHYTHM / 2}px;
`;
