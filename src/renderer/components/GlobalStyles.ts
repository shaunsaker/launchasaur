import { createGlobalStyle } from "styled-components";
import { BORDER_RADIUS, RHYTHM, SCROLLBAR_WIDTH, theme } from "../theme";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    user-select: none;
  }

  body {
    margin: 0;
    overflow: hidden;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  img {
    outline: none;
  }

  & ::-webkit-scrollbar {
    width: ${SCROLLBAR_WIDTH}px;
  }

  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }

  & ::-webkit-scrollbar-track,
  & ::-webkit-scrollbar-track-piece {
    background: transparent;
  }

  & ::-webkit-scrollbar-thumb {
    background: transparent;
  }

  & :hover::-webkit-scrollbar-thumb {
    background: ${theme.backgroundLight};
    border-radius: ${BORDER_RADIUS}px;
    min-height: ${RHYTHM}px;
  }

  & ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;
