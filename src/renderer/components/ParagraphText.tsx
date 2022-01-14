import styled, { css } from "styled-components";
import { MAX_TEXT_WIDTH, theme } from "../theme";
import { Fonts } from "../fonts/models";

export const ParagraphTextCss = css`
  font-family: ${Fonts.paragraph};
  font-size: 14px;
  line-height: 22px;
  color: ${theme.white};
  max-width: ${MAX_TEXT_WIDTH}px;
  display: inline-block;
`;

export const ParagraphText = styled.div`
  ${ParagraphTextCss}
`;
