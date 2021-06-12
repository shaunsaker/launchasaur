import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  BOX_SHADOW_CSS,
  FLEX_CENTER_CSS,
  RHYTHM,
  theme,
} from "../theme";
import { CloseIcon, CLOSE_ICON_PADDING, CLOSE_ICON_SIZE } from "./CloseIcon";
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

          <CloseIconContainer>
            <CloseIcon onClick={onClose} />
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
  ${FLEX_CENTER_CSS};
`;

export const MODAL_WIDTH = 480;
export const MODAL_PADDING = RHYTHM;
export const MODAL_BORDER_WIDTH = BORDER_WIDTH;

const ContentContainer = styled.div`
  border: ${MODAL_BORDER_WIDTH}px solid ${theme.black};
  border-radius: ${BORDER_RADIUS}px;
  background-color: ${theme.backgroundDarkOpaque};
  ${BOX_SHADOW_CSS};
  position: relative;
  width: ${MODAL_WIDTH}px;
  padding: ${MODAL_PADDING}px;
`;

const TitleText = styled.div`
  font-size: 24px;
  line-height: 1.5;
  font-weight: bold;
  color: ${theme.white};
  margin-bottom: ${RHYTHM * 1.5}px;
  margin-right: ${CLOSE_ICON_SIZE + CLOSE_ICON_PADDING}px;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 5px;
`;
