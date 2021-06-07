import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEditLauncherTitleModal } from "../store/editLauncherTitleModal/actions";
import {
  selectEditLauncherTitleModalLaunchStationId,
  selectEditLauncherTitleModalLauncherId,
} from "../store/editLauncherTitleModal/selectors";
import { setLauncherTitle } from "../store/launchStations/actions";
import { selectLauncher } from "../store/launchStations/selectors";
import { ApplicationState } from "../store/reducers";
import { EditTitleModal } from "./EditTitleModal";

export const EditLauncherTitleModal = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStationId = useSelector(
    selectEditLauncherTitleModalLaunchStationId,
  );
  const launcherId = useSelector(selectEditLauncherTitleModalLauncherId);
  const launcher = useSelector((state: ApplicationState) =>
    selectLauncher(state, { launchStationId, launcherId }),
  );
  const onSubmit = useCallback(
    (value: string) => {
      dispatch(setLauncherTitle({ launchStationId, launcherId, title: value }));
      dispatch(hideEditLauncherTitleModal());
    },
    [dispatch, launchStationId, launcherId],
  );

  const onClose = useCallback(() => {
    dispatch(hideEditLauncherTitleModal());
  }, [dispatch]);

  return (
    <EditTitleModal
      title={launcher.title}
      handleSubmit={onSubmit}
      handleClose={onClose}
    />
  );
};
