import styled from "styled-components";
import { MAX_TEXT_WIDTH, theme } from "../theme";

export const ParagraphText = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: ${theme.white};
  text-align: center;
  max-width: ${MAX_TEXT_WIDTH}px;
`;
