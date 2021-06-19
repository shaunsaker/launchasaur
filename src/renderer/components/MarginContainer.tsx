import styled from "styled-components";
import { RHYTHM } from "../theme";

interface MarginContainerProps {
  small?: boolean;
}

export const MarginContainer = styled.div<MarginContainerProps>`
  margin-bottom: ${({ small }) => (small ? RHYTHM : RHYTHM * 2)}px;
`;
