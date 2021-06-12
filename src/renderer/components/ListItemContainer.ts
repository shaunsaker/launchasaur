import styled from "styled-components";
import {
  RHYTHM,
  SMALL_BORDER_RADIUS,
  SMALL_BORDER_WIDTH,
  theme,
} from "../theme";

interface ListItemContainerProps {
  $colour?: string;
}

export const ListItemContainer = styled.div<ListItemContainerProps>`
  display: flex;
  align-items: center;
  padding: ${RHYTHM / 4}px ${RHYTHM / 2}px;
  background-color: ${theme.white5};
  border: ${SMALL_BORDER_WIDTH}px solid
    ${({ $colour }) => $colour || theme.black};
  border-radius: ${SMALL_BORDER_RADIUS}px;
`;
