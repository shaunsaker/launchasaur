import styled from "styled-components";
import { Fonts } from "../fonts/models";
import { theme } from "../theme";

export const TitleText = styled.div`
  font-family: ${Fonts.title};
  font-size: 24px;
  line-height: 24px;
  color: ${theme.white};
`;
