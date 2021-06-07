import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEditLauncherShortcutModal } from "../store/editLauncherShortcutModal/actions";
import {
  selectEditLauncherShortcutModalLaunchStationId,
  selectEditLauncherShortcutModalLauncherId,
} from "../store/editLauncherShortcutModal/selectors";
import { setLauncherShortcut } from "../store/launchStations/actions";
import { selectLauncher } from "../store/launchStations/selectors";
import { ApplicationState } from "../store/reducers";
import { EditShortcutModal } from "./EditShortcutModal";

export const EditLauncherShortcutModal = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStationId = useSelector(
    selectEditLauncherShortcutModalLaunchStationId,
  );
  const launcherId = useSelector(selectEditLauncherShortcutModalLauncherId);
  const launcher = useSelector((state: ApplicationState) =>
    selectLauncher(state, { launchStationId, launcherId }),
  );

  const onSubmit = useCallback(
    (shortcut: string) => {
      dispatch(setLauncherShortcut({ launchStationId, launcherId, shortcut }));
      dispatch(hideEditLauncherShortcutModal());
    },
    [dispatch, launchStationId, launcherId],
  );

  const onClose = useCallback(() => {
    dispatch(hideEditLauncherShortcutModal());
  }, [dispatch]);

  return (
    <EditShortcutModal
      shortcut={launcher.shortcut}
      handleSubmit={onSubmit}
      handleClose={onClose}
    />
  );
};
