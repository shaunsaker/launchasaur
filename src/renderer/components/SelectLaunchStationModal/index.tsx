import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hideLauncherActionsModal } from "../../store/launcherActionsModal/actions";
import {
  addLauncherAction,
  addLaunchStation,
} from "../../store/launchStations/actions";
import { makeActionData } from "../../store/launchStations/data";
import {
  LaunchStationAction,
  LaunchStationData,
} from "../../store/launchStations/models";
import { selectAllOtherLaunchStations } from "../../store/launchStations/selectors";
import { navigateToSettingsLaunchStation } from "../../store/navigation/actions";
import { ApplicationState } from "../../store/reducers";
import { hideSelectLaunchStationModal } from "../../store/selectLaunchStationModal/actions";
import {
  selectSelectLaunchStationModalLaunchStationId,
  selectSelectLaunchStationModalLauncherId,
} from "../../store/selectLaunchStationModal/selectors";
import { showUpgradeModal } from "../../store/upgradeModal/actions";
import { selectIsUserPro } from "../../store/user/selectors";
import { RHYTHM } from "../../theme";
import { uuid } from "../../utils/uuid";
import { BlankState } from "../BlankState";
import { Button } from "../Button";
import { Modal } from "../Modal";

export const SelectLaunchStationModal = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStationId = useSelector(
    selectSelectLaunchStationModalLaunchStationId,
  );
  const launcherId = useSelector(selectSelectLaunchStationModalLauncherId);
  const launchStations = useSelector((state: ApplicationState) =>
    selectAllOtherLaunchStations(state, launchStationId),
  );
  const hasOtherLaunchStations = launchStations.length;
  const userIsPro = useSelector(selectIsUserPro);

  const onAddLaunchStationClick = useCallback(() => {
    if (userIsPro) {
      const id = uuid();

      dispatch(addLaunchStation({ id }));

      dispatch(hideSelectLaunchStationModal());

      dispatch(hideLauncherActionsModal());

      dispatch(navigateToSettingsLaunchStation({ launchStationId: id }));
    } else {
      dispatch(showUpgradeModal());
    }
  }, [dispatch, userIsPro]);

  const onLaunchStationClick = useCallback(
    (launchStation: LaunchStationData) => {
      const actionData = makeActionData({
        action: LaunchStationAction.OpenLaunchStation,
        resource: launchStation.id,
      });

      dispatch(
        addLauncherAction.success({
          launchStationId,
          launcherId,
          actionData,
        }),
      );
      dispatch(hideSelectLaunchStationModal());
      dispatch(hideLauncherActionsModal());
    },
    [dispatch, launchStationId, launcherId],
  );

  const onClose = useCallback(() => {
    dispatch(hideSelectLaunchStationModal());
  }, [dispatch]);

  return (
    <Modal title="Select a Launch Station" onClose={onClose}>
      {!hasOtherLaunchStations ? (
        <BlankState
          icon="rocket"
          title="No other Launch Stations available"
          description="Add a Launch Station so that you can start grouping launchers!">
          <AddLaunchStationButtonContainer>
            <Button primary onClick={onAddLaunchStationClick}>
              ADD LAUNCH STATION
            </Button>
          </AddLaunchStationButtonContainer>
        </BlankState>
      ) : (
        launchStations.map((launchStation) => (
          <LaunchStationButtonContainer key={launchStation.id}>
            <Button
              large
              fullWidth
              onClick={() => onLaunchStationClick(launchStation)}>
              {launchStation.title.toUpperCase()}
            </Button>
          </LaunchStationButtonContainer>
        ))
      )}
    </Modal>
  );
};

const AddLaunchStationButtonContainer = styled.div`
  margin-top: ${RHYTHM}px;
`;

const LaunchStationButtonContainer = styled.div`
  margin-top: ${RHYTHM}px;
`;
