import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hideLauncherActionsModal } from "../../store/launcherActionsModal/actions";
import {
  selectLauncherActionsModalLaunchStationId,
  selectLauncherActionsModalLauncherId,
} from "../../store/launcherActionsModal/selectors";
import { addLauncherAction } from "../../store/launchStations/actions";
import { getActionIcon } from "../../store/launchStations/data";
import {
  LaunchStationAction,
  launcherActions,
} from "../../store/launchStations/models";
import { selectLauncherHasOpenLaunchStationAction } from "../../store/launchStations/selectors";
import { ApplicationState } from "../../store/reducers";
import { Button } from "../Button";
import { Modal } from "../Modal";

export const LauncherActionsModal = (): ReactElement => {
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
      {launcherActions.map((action) => (
        <ButtonContainer key={action}>
          <Button
            icon={getActionIcon(action)}
            large
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
  width: 320px;
  margin: 20px auto 0;
`;
