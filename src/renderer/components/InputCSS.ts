import { css } from "styled-components";
import { Fonts } from "../fonts/models";
import {
  RHYTHM,
  SMALL_BORDER_RADIUS,
  theme,
  TRANSITION_CSS,
  SMALL_BORDER_WIDTH,
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
  padding: ${RHYTHM / 2}px;
  font-family: ${Fonts.paragraph};
  font-size: 14px;
  line-height: 14px;
  color: ${theme.white};
`;
