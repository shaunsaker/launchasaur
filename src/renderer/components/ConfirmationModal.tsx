import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hideConfirmationModal } from "../store/confirmationModal/actions";
import {
  selectConfirmationModalActions,
  selectConfirmationModalTitle,
} from "../store/confirmationModal/selectors";
import { Button } from "./Button";
import { Modal } from "./Modal";

export const ConfirmationModal = (): ReactElement => {
  const dispatch = useDispatch();
  const title = useSelector(selectConfirmationModalTitle);
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
      <ActionButtonContainer>
        <Button danger large onClick={onActionClick}>
          YES
        </Button>
      </ActionButtonContainer>
    </Modal>
  );
};

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
