import { css } from "styled-components";
import {
  RHYTHM,
  SMALL_BORDER_RADIUS,
  SMALL_BORDER_WIDTH,
  theme,
  TRANSITION_CSS,
} from "../theme";

export interface InputCSSProps {
  focussed: boolean;
}

export const inputCSS = css<InputCSSProps>`
  width: 320px;
  height: 40px;
  border: ${SMALL_BORDER_WIDTH}px solid
    ${({ focussed }) => (focussed ? theme.accent : theme.black)};
  transition: border-color ${TRANSITION_CSS};
  border-radius: ${SMALL_BORDER_RADIUS}px;
  background-color: ${theme.backgroundDark33};
  padding: ${RHYTHM / 2}px ${RHYTHM}px;
  font-size: 14px;
  font-weight: bold;
  color: ${theme.white};
`;
