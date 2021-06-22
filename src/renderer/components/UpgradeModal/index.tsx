import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { hideUpgradeModal } from "../../store/upgradeModal/actions";
import { Modal } from "../Modal";

export const UpgradeModal = (): ReactElement => {
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    dispatch(hideUpgradeModal());
  }, [dispatch]);

  return (
    <Modal title="" onClose={onClose}>
      <div />
    </Modal>
  );
};
