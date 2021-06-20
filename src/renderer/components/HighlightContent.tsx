import styled from "styled-components";
import { BORDER_RADIUS, FLEX_CENTER_CSS, RHYTHM, theme } from "../theme";

export const HighlightContent = styled.div`
  background-color: ${theme.white5};
  padding: ${RHYTHM / 2}px;
  border-radius: ${BORDER_RADIUS}px;
  ${FLEX_CENTER_CSS};
  text-align: center;
`;
