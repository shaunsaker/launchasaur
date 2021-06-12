import styled from "styled-components";
import { CONTENT_CONTAINER_WIDTH, RHYTHM, theme } from "../theme";

export const PageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${CONTENT_CONTAINER_WIDTH}px;
  height: 100%;
  padding: ${RHYTHM}px;
  background-color: ${theme.white5};
`;
