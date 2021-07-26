import styled from "styled-components";
import { MAX_TEXT_WIDTH, theme } from "../theme";

export const TinyText = styled.div`
  font-size: 12px;
  font-weight: bold;
  line-height: 20px;
  color: ${theme.white};
  text-align: center;
  max-width: ${MAX_TEXT_WIDTH}px;
`;
