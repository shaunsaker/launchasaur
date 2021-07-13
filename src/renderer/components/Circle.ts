import styled from "styled-components";
import {
  BOX_SHADOW_CSS,
  FLEX_CENTER_CSS,
  ICON_SIZE,
  theme,
  TRANSITION_CSS,
} from "../theme";

interface CircleProps {
  $isHovered: boolean;
  onClick: () => void | undefined;
}

const SIZE = ICON_SIZE * 2;
export const Circle = styled.div<CircleProps>`
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  background-color: ${({ $isHovered }) =>
    $isHovered ? theme.backgroundLight : theme.backgroundDark};
  transition: background-color ${TRANSITION_CSS};
  ${FLEX_CENTER_CSS};
  ${BOX_SHADOW_CSS};
  cursor: ${({ onClick }) => (onClick ? "pointer" : "initial")};
`;
