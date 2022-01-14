import styled from "styled-components";
import { Fonts } from "../fonts/models";
import { MAX_TEXT_WIDTH, theme } from "../theme";

export const SubtitleText = styled.div`
  font-family: ${Fonts.subtitle};
  font-size: 12px;
  color: ${theme.white};
  max-width: ${MAX_TEXT_WIDTH}px;
`;
