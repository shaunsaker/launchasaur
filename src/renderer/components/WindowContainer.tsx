import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import {
  BORDER_WIDTH,
  BOX_SHADOW_CSS,
  FLEX_CENTER_CSS,
  CONTENT_CONTAINER_WIDTH,
  theme,
  BORDER_RADIUS,
} from "../theme";

interface CircularWindowProps {
  children: ReactNode;
}

export const WindowContainer = ({
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
  width: ${CONTENT_CONTAINER_WIDTH}px;
  height: ${CONTENT_CONTAINER_WIDTH}px;
  border-radius: ${BORDER_RADIUS}px;
  background-color: ${theme.backgroundDarkOpaque};
  border: ${BORDER_WIDTH}px solid ${theme.black};
  ${BOX_SHADOW_CSS};
  ${FLEX_CENTER_CSS};
`;
