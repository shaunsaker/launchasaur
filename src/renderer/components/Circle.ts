import styled from "styled-components";
import {
  BOX_SHADOW_CSS,
  FLEX_CENTER_CSS,
  ICON_SIZE,
  SMALL_BORDER_WIDTH,
  theme,
  TRANSITION_CSS,
} from "../theme";

interface CircleProps {
  colour?: string;
  $isHovered?: boolean;
  onClick?: () => void | undefined;
}

const SIZE = ICON_SIZE * 2;
export const Circle = styled.div<CircleProps>`
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  border: ${({ onClick }) =>
    onClick ? `${SMALL_BORDER_WIDTH}px solid ${theme.black}` : ""};
  background-color: ${({ $isHovered, colour }) =>
    $isHovered ? theme.backgroundLight : colour || theme.backgroundDark};
  transition: background-color ${TRANSITION_CSS};
  ${FLEX_CENTER_CSS};
  ${BOX_SHADOW_CSS};
  cursor: ${({ onClick }) => (onClick ? "pointer" : "")};
`;
