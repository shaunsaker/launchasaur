import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import {
  BORDER_WIDTH,
  BOX_SHADOW_CSS,
  FLEX_CENTER_CSS,
  LAUNCH_STATION_DIAMETER,
  theme,
} from "../theme";

interface CircularWindowProps {
  children: ReactNode;
}

export const CircularWindow = ({
  children,
}: CircularWindowProps): ReactElement => {
  return (
    <Container>
      <Circle>{children}</Circle>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  flex: 1;
  ${FLEX_CENTER_CSS};
`;

const Circle = styled.div`
  width: ${LAUNCH_STATION_DIAMETER}px;
  height: ${LAUNCH_STATION_DIAMETER}px;
  border-radius: ${LAUNCH_STATION_DIAMETER / 2}px;
  background-color: ${theme.backgroundDarkOpaque};
  border: ${BORDER_WIDTH}px solid ${theme.black};
  ${BOX_SHADOW_CSS};
  ${FLEX_CENTER_CSS};
`;
