import { css } from "styled-components";
import {
  RHYTHM,
  SMALL_BORDER_RADIUS,
  theme,
  TRANSITION_CSS,
  SMALL_BORDER_WIDTH,
} from "../theme";
import { ParagraphTextCss } from "./ParagraphText";

export const INPUT_HEIGHT = 40;

export interface InputCSSProps {
  focussed: boolean;
}

export const inputCSS = css<InputCSSProps>`
  width: 320px;
  height: ${INPUT_HEIGHT}px;
  border: ${SMALL_BORDER_WIDTH}px solid
    ${({ focussed }) => (focussed ? theme.accent : theme.black)};
  transition: border-color ${TRANSITION_CSS};
  border-radius: ${SMALL_BORDER_RADIUS}px;
  background-color: ${theme.backgroundDark33};
  padding: ${RHYTHM / 2}px;
  ${ParagraphTextCss};
  line-height: 14px;
`;
