import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEditLaunchStationTitleModal } from "../store/editLaunchStationTitleModal/actions";
import { selectEditLaunchStationTitleModalLaunchStationId } from "../store/editLaunchStationTitleModal/selectors";
import { setLaunchStationTitle } from "../store/launchStations/actions";
import { selectLaunchStation } from "../store/launchStations/selectors";
import { ApplicationState } from "../store/reducers";
import { EditTitleModal } from "./EditTitleModal";

export const EditLaunchStationTitleModal = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStationId = useSelector(
    selectEditLaunchStationTitleModalLaunchStationId,
  );
  const launchStation = useSelector((state: ApplicationState) =>
    selectLaunchStation(state, launchStationId),
  );

  const onSubmit = useCallback(
    (value: string) => {
      dispatch(setLaunchStationTitle({ launchStationId, title: value }));
      dispatch(hideEditLaunchStationTitleModal());
    },
    [dispatch, launchStationId],
  );

  const onClose = useCallback(() => {
    dispatch(hideEditLaunchStationTitleModal());
  }, [dispatch]);

  return (
    <EditTitleModal
      title={launchStation.title}
      handleSubmit={onSubmit}
      handleClose={onClose}
    />
  );
};
