import styled from "styled-components";
import { BOX_SHADOW_CSS, FLEX_CENTER_CSS, ICON_SIZE, theme } from "../theme";

interface CircleProps {
  colour?: string;
}

const SIZE = ICON_SIZE * 2;
export const Circle = styled.div<CircleProps>`
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  background-color: ${({ colour }) => colour || theme.backgroundDark};
  ${FLEX_CENTER_CSS}
  ${BOX_SHADOW_CSS}
`;
