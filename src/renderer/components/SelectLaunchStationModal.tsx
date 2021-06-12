import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLauncherActionsModal } from "../store/launcherActionsModal/actions";
import { addLauncherAction } from "../store/launchStations/actions";
import { makeActionData } from "../store/launchStations/data";
import {
  LaunchStationAction,
  LaunchStationData,
} from "../store/launchStations/models";
import { selectLaunchStations } from "../store/launchStations/selectors";
import { hideSelectLaunchStationModal } from "../store/selectLaunchStationModal/actions";
import {
  selectSelectLaunchStationModalLaunchStationId,
  selectSelectLaunchStationModalLauncherId,
} from "../store/selectLaunchStationModal/selectors";

export const SelectLaunchStationModal = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStationId = useSelector(
    selectSelectLaunchStationModalLaunchStationId,
  );
  const launcherId = useSelector(selectSelectLaunchStationModalLauncherId);
  const launchStations = useSelector(selectLaunchStations);
  const hasLaunchStations = launchStations.length;

  const onAddLaunchStationClick = useCallback(() => {
    // TODO: how to handle this
  }, []);

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

  const onCloseClick = useCallback(() => {
    dispatch(hideSelectLaunchStationModal());
  }, [dispatch]);

  return (
    <div>
      {!hasLaunchStations ? (
        <div>
          <div>No other Launch Stations available</div>

          <div onClick={onAddLaunchStationClick}>Add Launch Station</div>
        </div>
      ) : (
        <div>
          <div>Select a Launch Station</div>

          {launchStations.map((launchStation) => (
            <div
              key={launchStation.id}
              onClick={() => onLaunchStationClick(launchStation)}>
              {launchStation.title}
            </div>
          ))}
        </div>
      )}

      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};
