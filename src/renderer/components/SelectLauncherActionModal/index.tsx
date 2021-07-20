import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hideLauncherActionsModal } from "../../store/launcherActionsModal/actions";
import {
  selectLauncherActionsModalLaunchStationId,
  selectLauncherActionsModalLauncherId,
} from "../../store/launcherActionsModal/selectors";
import { addLauncherAction } from "../../store/launchStations/actions";
import {
  LaunchStationAction,
  LauncherActions,
} from "../../store/launchStations/models";
import { selectLauncherHasOpenLaunchStationAction } from "../../store/launchStations/selectors";
import { getActionIcon } from "../../store/launchStations/utils";
import { ApplicationState } from "../../store/reducers";
import { RHYTHM } from "../../theme";
import { Button } from "../Button";
import { Modal } from "../Modal";

export const SelectLauncherActionModal = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStationId = useSelector(
    selectLauncherActionsModalLaunchStationId,
  );
  const launcherId = useSelector(selectLauncherActionsModalLauncherId);
  const launcherHasOpenLaunchStationAction = useSelector(
    (state: ApplicationState) =>
      selectLauncherHasOpenLaunchStationAction(state, {
        launchStationId,
        launcherId,
      }),
  );

  const onActionClick = useCallback(
    (action: LaunchStationAction) => {
      dispatch(
        addLauncherAction.request({ launchStationId, launcherId, action }),
      );
    },
    [dispatch, launchStationId, launcherId],
  );

  const onCloseClick = useCallback(() => {
    dispatch(hideLauncherActionsModal());
  }, [dispatch]);

  return (
    <Modal title="Select an Action" onClose={onCloseClick}>
      {LauncherActions.map((action) => (
        <ButtonContainer key={action}>
          <Button
            icon={getActionIcon(action)}
            large
            fullWidth
            disabled={
              // don't allow multiple open launch station actions
              action === LaunchStationAction.OpenLaunchStation &&
              launcherHasOpenLaunchStationAction
            }
            onClick={() => onActionClick(action)}>
            {action.toUpperCase()}
          </Button>
        </ButtonContainer>
      ))}
    </Modal>
  );
};

const ButtonContainer = styled.div`
  margin-top: ${RHYTHM}px;
`;
