import styled from "styled-components";
import { MAX_TEXT_WIDTH, theme } from "../theme";

export const SmallText = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${theme.white};
  text-align: center;
  max-width: ${MAX_TEXT_WIDTH}px;
  display: block;
`;
