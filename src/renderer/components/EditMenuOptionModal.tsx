import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEditMenuOptionModal } from "../store/editMenuOptionModal/actions";
import {
  selectEditMenuOptionModalMenuId,
  selectEditMenuOptionModalMenuOptionId,
} from "../store/editMenuOptionModal/selectors";
import { Modal } from "./Modal";

export const EditMenuOptionModal = (): ReactElement => {
  const dispatch = useDispatch();
  const menuId = useSelector(selectEditMenuOptionModalMenuId);
  const menuOptionId = useSelector(selectEditMenuOptionModalMenuOptionId);

  const onCloseClick = useCallback(() => {
    dispatch(hideEditMenuOptionModal());
  }, [dispatch]);

  return (
    <Modal onClose={onCloseClick}>
      <div />
    </Modal>
  );
};
