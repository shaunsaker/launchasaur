import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectUserEmail } from "../../store/auth/selectors";
import { hideUpgradeModal } from "../../store/upgradeModal/actions";
import { startTrial } from "../../store/user/actions";
import {
  selectIsEligibleForTrial,
  selectIsUserLoading,
} from "../../store/user/selectors";
import { RHYTHM } from "../../theme";
import { BlankState } from "../BlankState";
import { Button } from "../Button";
import { Modal } from "../Modal";

export const UpgradeModal = (): ReactElement => {
  const dispatch = useDispatch();
  const isEligibleForTrial = useSelector(selectIsEligibleForTrial);
  const userEmail = useSelector(selectUserEmail);
  const isUserLoading = useSelector(selectIsUserLoading);

  const onClose = useCallback(() => {
    dispatch(hideUpgradeModal());
  }, [dispatch]);

  const onSubmitClick = useCallback(() => {
    if (isEligibleForTrial) {
      dispatch(startTrial.request({ email: userEmail }));
    } else {
      // TODO: navigate to billing
    }
  }, [dispatch, isEligibleForTrial, userEmail]);

  return (
    <Modal title="Not so fast amigo!" onClose={onClose}>
      <BlankState
        icon="rocket"
        title={isEligibleForTrial ? "Start your Free Trial" : "Upgrade to Pro"}
        description={`Adding multiple launch stations is a Pro feature. ${
          isEligibleForTrial ? "Start your Free Trial" : "Upgrade to Pro"
        } to unlock all of the Launchasaur Pro features!`}>
        <ButtonContainer>
          <Button
            primary
            large
            disabled={isUserLoading}
            onClick={onSubmitClick}>
            {isEligibleForTrial ? "START YOUR FREE TRIAL" : "UPGRADE TO PRO"}
          </Button>
        </ButtonContainer>
      </BlankState>
    </Modal>
  );
};

const ButtonContainer = styled.div`
  margin-top: ${RHYTHM}px;
`;
