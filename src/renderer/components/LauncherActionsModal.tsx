import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLauncherActionsModal } from "../store/launcherActionsModal/actions";
import {
  selectLauncherActionsModalLaunchStationId,
  selectLauncherActionsModalLauncherId,
} from "../store/launcherActionsModal/selectors";
import { addLauncherAction } from "../store/launchStations/actions";
import {
  LaunchStationAction,
  launcherActions,
} from "../store/launchStations/models";
import { selectLauncherHasOpenLaunchStationAction } from "../store/launchStations/selectors";
import { ApplicationState } from "../store/reducers";

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
      // TODO: is this the correct action name?
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
    <div>
      {launcherActions.map((action) => (
        <button
          key={action}
          onClick={() => onActionClick(action)}
          disabled={
            // don't allow multiple open launch station actions
            action === LaunchStationAction.OpenLaunchStation &&
            launcherHasOpenLaunchStationAction
          }>
          {action}
        </button>
      ))}

      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};
