import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { hideLoginModal } from "../../store/loginModal/actions";
import { RHYTHM } from "../../theme";
import { CloseIcon } from "../CloseIcon";
import { Login } from "../Login";
import { ModalBackdrop } from "../ModalBackdrop";

export const LoginModal = (): ReactElement => {
  const dispatch = useDispatch();

  const onCloseClick = useCallback(() => {
    dispatch(hideLoginModal());
  }, [dispatch]);

  return (
    <ModalBackdrop>
      <Login title="Login to Continue" />

      <CloseIconContainer>
        <CloseIcon onClick={onCloseClick} />
      </CloseIconContainer>
    </ModalBackdrop>
  );
};

const CloseIconContainer = styled.div`
  position: fixed;
  top: -${RHYTHM / 2}px;
  right: -${RHYTHM / 2}px;
`;
