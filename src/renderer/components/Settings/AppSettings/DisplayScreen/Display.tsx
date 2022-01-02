import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useHover } from "use-hooks";
import { setDisplay } from "../../../../store/ipc/actions";
import { ExtendedDisplay } from "../../../../store/settings/models";
import { selectSettingsDefaultDisplayId } from "../../../../store/settings/selectors";
import {
  ABSOLUTE_CENTER_CSS,
  BORDER_RADIUS,
  BORDER_WIDTH,
  RHYTHM,
  SMALL_BORDER_RADIUS,
  SMALL_BORDER_WIDTH,
  theme,
  TRANSITION_CSS,
} from "../../../../theme";
import { FadeIn } from "../../../FadeIn";
import { ParagraphText } from "../../../ParagraphText";
import { SubtitleText } from "../../../SubtitleText";

interface DisplayProps {
  display: ExtendedDisplay;
}

export const Display = ({ display }: DisplayProps): ReactElement => {
  const dispatch = useDispatch();
  const [hoverRef, hovered] = useHover<HTMLDivElement>();
  const defaultDisplayId = useSelector(selectSettingsDefaultDisplayId);

  // if the user has not set there default display it will be undefined
  // NOTE: we assume that the app is running in the primary display
  const isActive =
    defaultDisplayId === undefined
      ? display.primary
      : defaultDisplayId === display.id;

  const onClick = useCallback(() => {
    dispatch(setDisplay.request(display.id));
  }, [dispatch, display.id]);

  return (
    <Container
      ref={hoverRef}
      $hovered={hovered}
      $active={isActive}
      onClick={onClick}>
      {isActive && (
        <ActiveTextContainer>
          <ActiveText>ACTIVE</ActiveText>
        </ActiveTextContainer>
      )}

      {hovered && !isActive && (
        <ActiveTextContainer>
          <FadeIn>
            <ActiveText>SET ACTIVE</ActiveText>
          </FadeIn>
        </ActiveTextContainer>
      )}
    </Container>
  );
};

interface ContainerProps {
  $hovered: boolean;
  $active: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 33%;
  height: 120px;
  background-color: ${({ $hovered, $active }) =>
    $hovered || $active ? theme.backgroundLight : theme.backgroundDark33};
  border: ${SMALL_BORDER_WIDTH}px solid
    ${({ $active }) => ($active ? theme.accent : theme.black)};
  border-radius: ${SMALL_BORDER_RADIUS}px;
  margin: 0 ${RHYTHM / 4}px;
  cursor: pointer;
  transition: all ${TRANSITION_CSS};
  position: relative;
`;

const ActiveTextContainer = styled.div`
  ${ABSOLUTE_CENTER_CSS};
  pointer-events: none;
`;

const ActiveText = styled(ParagraphText)`
  font-size: 12px;
  text-align: center;
`;
