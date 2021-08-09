import styled from "styled-components";
import { MAX_TEXT_WIDTH, theme } from "../theme";
import { Fonts } from "../fonts/models";

export const ParagraphText = styled.div`
  font-family: ${Fonts.paragraph};
  font-size: 16px;
  line-height: 20px;
  color: ${theme.white};
  max-width: ${MAX_TEXT_WIDTH}px;
`;
