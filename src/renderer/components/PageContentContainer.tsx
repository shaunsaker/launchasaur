import styled from "styled-components";
import {
  BOX_SHADOW_CSS,
  CONTENT_CONTAINER_WIDTH,
  RHYTHM,
  theme,
} from "../theme";

export const PageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${CONTENT_CONTAINER_WIDTH}px;
  height: 100%;
  padding: ${RHYTHM}px;
  background-color: ${theme.white5};
  ${BOX_SHADOW_CSS};
  margin: 0 auto;
`;
