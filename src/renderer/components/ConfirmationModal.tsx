import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hideConfirmationModal } from "../store/confirmationModal/actions";
import {
  selectConfirmationModalActions,
  selectConfirmationModalSubtitle,
  selectConfirmationModalTitle,
} from "../store/confirmationModal/selectors";
import { theme } from "../theme";
import { Button } from "./Button";
import { MarginContainer } from "./MarginContainer";
import { Modal } from "./Modal";

export const ConfirmationModal = (): ReactElement => {
  const dispatch = useDispatch();
  const title = useSelector(selectConfirmationModalTitle);
  const subtitle = useSelector(selectConfirmationModalSubtitle);
  const actions = useSelector(selectConfirmationModalActions);

  const onActionClick = useCallback(() => {
    actions.forEach((action) => {
      dispatch(action);
    });

    dispatch(hideConfirmationModal());
  }, [dispatch, actions]);

  const onClose = useCallback(() => {
    dispatch(hideConfirmationModal());
  }, [dispatch]);

  return (
    <Modal title={title} onClose={onClose}>
      {subtitle && (
        <MarginContainer>
          <SubtitleText>{subtitle}</SubtitleText>
        </MarginContainer>
      )}

      <ActionButtonContainer>
        <Button danger large onClick={onActionClick}>
          YES
        </Button>
      </ActionButtonContainer>
    </Modal>
  );
};

const SubtitleText = styled.div`
  font-size: 16px;
  color: ${theme.white};
  text-align: center;
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
