import styled from "styled-components";
import { BOX_SHADOW_CSS, RHYTHM, theme } from "../theme";
import { SIDE_MENU_PADDING_TOP } from "./SideMenu";

export const PageContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: ${SIDE_MENU_PADDING_TOP}px ${RHYTHM}px ${RHYTHM}px;
  background-color: ${theme.white5};
  ${BOX_SHADOW_CSS};
  margin: 0 auto;
  overflow: auto;
`;
