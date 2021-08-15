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
  theme,
  TRANSITION_CSS,
} from "../../../../theme";
import { FadeIn } from "../../../FadeIn";
import { TinyText } from "../../../TinyText";

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
          <TinyText>ACTIVE</TinyText>
        </ActiveTextContainer>
      )}

      {hovered && !isActive && (
        <ActiveTextContainer>
          <FadeIn>
            <TinyText>SET ACTIVE</TinyText>
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
  border: ${BORDER_WIDTH / 2}px solid
    ${({ $active }) => ($active ? theme.accent : theme.black)};
  border-radius: ${BORDER_RADIUS / 2}px;
  margin: 0 ${RHYTHM / 4}px;
  cursor: pointer;
  transition: all ${TRANSITION_CSS};
  position: relative;
`;

const ActiveTextContainer = styled.div`
  ${ABSOLUTE_CENTER_CSS};
  pointer-events: none;
`;
