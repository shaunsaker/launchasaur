import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement, ReactNode } from "react";
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
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({
  title,
  children,
  onClose,
}: ModalProps): ReactElement => {
  return (
    <FadeIn>
      <Container>
        <ContentContainer>
          <TitleText>{title}</TitleText>

          {children}

          <CloseIconContainer onClick={onClose}>
            <StyledCloseIcon icon="times" />
          </CloseIconContainer>
        </ContentContainer>
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
  border: ${borderWidth}px solid ${theme.accent};
  border-radius: ${borderRadius}px;
  background-color: ${theme.backgroundDarkOpaque};
  padding: ${rhythm}px;
  ${boxShadowCSS};
  position: relative;
`;

const TitleText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.white};
  text-align: center;
  width: 100%;
  margin-top: 4px;
  margin-bottom: ${rhythm * 2}px;
`;

const CloseIconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: ${rhythm}px;
`;

const StyledCloseIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: ${theme.white};
`;
