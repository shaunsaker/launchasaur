import styled from "styled-components";
import { BOX_SHADOW_CSS, RHYTHM, theme } from "../theme";

export const PageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: ${RHYTHM}px;
  background-color: ${theme.white5};
  ${BOX_SHADOW_CSS};
  margin: 0 auto;
  overflow: auto;
`;
