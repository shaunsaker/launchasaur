import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { FLEX_CENTER_CSS, theme } from "../theme";
import { FadeIn } from "./FadeIn";

interface ModalProps {
  children: ReactNode;
}

export const ModalBackdrop = ({ children }: ModalProps): ReactElement => {
  return (
    <FadeIn>
      <Container>{children}</Container>
    </FadeIn>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${theme.backgroundDark};
  ${FLEX_CENTER_CSS};
  z-index: 1;
`;
