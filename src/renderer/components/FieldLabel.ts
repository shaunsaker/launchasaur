import styled from "styled-components";
import { RHYTHM, theme } from "../theme";
import { ParagraphText } from "./ParagraphText";

export const FieldLabel = styled(ParagraphText)`
  color: ${theme.white50};
  margin-bottom: ${RHYTHM / 2}px;
`;
