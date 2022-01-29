import React, { ReactElement, ReactNode, useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import styled from "styled-components";
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  BOX_SHADOW_CSS,
  RHYTHM,
  theme,
} from "../theme";
import { CloseIcon, CLOSE_ICON_PADDING, CLOSE_ICON_SIZE } from "./CloseIcon";
import { MarginContainer } from "./MarginContainer";
import { ModalBackdrop } from "./ModalBackdrop";
import { TitleText } from "./TitleText";

interface ModalProps {
  title?: string;
  children?: ReactNode;
  borderColor?: string;
  onClose?: () => void;
}

export const Modal = ({
  title,
  children,
  borderColor,
  onClose,
}: ModalProps): ReactElement => {
  const onEscapePress = useCallback(
    (event: KeyboardEvent) => {
      // prevent event bubble so as not to trigger app escape handler
      event.preventDefault();
      event.stopImmediatePropagation();

      if (onClose) {
        onClose();
      }
    },
    [onClose],
  );

  useHotkeys("Escape", onEscapePress);

  return (
    <ModalBackdrop>
      <ContentContainer $borderColor={borderColor}>
        <MarginContainer small>
          <StyledTitleText>{title}</StyledTitleText>
        </MarginContainer>

        {children}

        {onClose && (
          <CloseIconContainer>
            <CloseIcon onClick={onClose} />
          </CloseIconContainer>
        )}
      </ContentContainer>
    </ModalBackdrop>
  );
};

export const MODAL_WIDTH = 640;
export const MODAL_PADDING = RHYTHM;
export const MODAL_BORDER_WIDTH = BORDER_WIDTH;

interface ContentContainerProps {
  $borderColor?: string;
}

const ContentContainer = styled.div<ContentContainerProps>`
  border: ${MODAL_BORDER_WIDTH}px solid
    ${({ $borderColor }) => $borderColor || theme.black};
  border-radius: ${BORDER_RADIUS}px;
  background-color: ${theme.backgroundDarkOpaque};
  ${BOX_SHADOW_CSS};
  position: relative;
  width: ${MODAL_WIDTH}px;
  padding: ${MODAL_PADDING}px;
  margin: ${RHYTHM}px;
  max-height: 100%;
`;

const StyledTitleText = styled(TitleText)`
  min-height: 24px; /* for when there is no title */
  line-height: 1.5;
  font-weight: bold;
  text-align: center;
  margin: 0 ${CLOSE_ICON_SIZE + CLOSE_ICON_PADDING}px;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 5px;
`;
