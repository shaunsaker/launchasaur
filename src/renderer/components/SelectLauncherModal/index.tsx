import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hideLauncherActionsModal } from "../../store/launcherActionsModal/actions";
import {
  addLauncher,
  addLauncherAction,
} from "../../store/launchStations/actions";
import { makeActionData } from "../../store/launchStations/data";
import {
  LauncherData,
  LaunchStationAction,
} from "../../store/launchStations/models";
import { selectAllOtherLaunchers } from "../../store/launchStations/selectors";
import { ApplicationState } from "../../store/reducers";
import { hideSelectLauncherModal } from "../../store/selectLauncherModal/actions";
import {
  selectSelectLauncherModalLauncherId,
  selectSelectLauncherModalLaunchStationId,
} from "../../store/selectLauncherModal/selectors";
import { showUpgradeModal } from "../../store/upgradeModal/actions";
import { selectIsUserPro } from "../../store/user/selectors";
import { RHYTHM } from "../../theme";
import { BlankState } from "../BlankState";
import { Button } from "../Button";
import { Modal } from "../Modal";

export const SelectLauncherModal = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStationId = useSelector(selectSelectLauncherModalLaunchStationId);
  const launcherId = useSelector(selectSelectLauncherModalLauncherId);
  const launchers = useSelector((state: ApplicationState) =>
    selectAllOtherLaunchers(state, launcherId),
  );
  const hasOtherLaunchers = launchers.length;
  const userIsPro = useSelector(selectIsUserPro);

  const onAddLauncherClick = useCallback(() => {
    if (userIsPro) {
      dispatch(addLauncher({ launchStationId }));

      dispatch(hideSelectLauncherModal());

      dispatch(hideLauncherActionsModal());
    } else {
      dispatch(showUpgradeModal());
    }
  }, [dispatch, userIsPro, launchStationId]);

  const onSelectLauncher = useCallback(
    (launcher: LauncherData) => {
      const actionData = makeActionData({
        action: LaunchStationAction.TriggerLauncher,
        resource: launcher.id,
      });

      dispatch(
        addLauncherAction.success({
          launchStationId,
          launcherId,
          actionData,
        }),
      );
      dispatch(hideSelectLauncherModal());
      dispatch(hideLauncherActionsModal());
    },
    [dispatch, launchStationId, launcherId],
  );

  const onClose = useCallback(() => {
    dispatch(hideSelectLauncherModal());
  }, [dispatch]);

  return (
    <Modal title="Select a Launcher" onClose={onClose}>
      {!hasOtherLaunchers ? (
        <BlankState
          icon="rocket"
          title="No other Launchers available"
          description="Add a Launcher so that you can start triggering other launchers like a boss!">
          <AddLauncherButtonContainer>
            <Button primary onClick={onAddLauncherClick}>
              ADD LAUNCHER
            </Button>
          </AddLauncherButtonContainer>
        </BlankState>
      ) : (
        launchers.map((launcher) => (
          <LauncherButtonContainer key={launcher.id}>
            <Button large fullWidth onClick={() => onSelectLauncher(launcher)}>
              {launcher.title.toUpperCase()}
            </Button>
          </LauncherButtonContainer>
        ))
      )}
    </Modal>
  );
};

const AddLauncherButtonContainer = styled.div`
  margin-top: ${RHYTHM}px;
`;

const LauncherButtonContainer = styled.div`
  margin-top: ${RHYTHM}px;
`;
