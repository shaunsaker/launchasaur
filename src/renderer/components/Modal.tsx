import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement } from "react";
import styled from "styled-components";
import {
  borderRadius,
  borderWidth,
  boxShadowCSS,
  flexCenterCSS,
  rhythm,
  theme,
} from "../theme";
import { FadeIn } from "./FadeIn";

interface ModalProps {
  children: ReactElement;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: ModalProps): ReactElement => {
  return (
    <FadeIn>
      <Container>
        <ContentContainer>{children}</ContentContainer>

        <CloseIconContainer onClick={onClose}>
          <StyledCloseIcon icon="times" />
        </CloseIconContainer>
      </Container>
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
  ${flexCenterCSS};
`;

const ContentContainer = styled.div`
  border: ${borderWidth}px solid ${theme.black};
  border-radius: ${borderRadius}px;
  background-color: ${theme.backgroundDarkOpaque};
  padding: ${rhythm}px;
  ${boxShadowCSS};
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${rhythm}px;
  cursor: pointer;
`;

const StyledCloseIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: ${theme.white};
`;
