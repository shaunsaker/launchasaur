import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingsSetAppShortcut } from "../store/settings/actions";
import { selectSettingsAppShortcut } from "../store/settings/selectors";
import { EditShortcutModal } from "./EditShortcutModal";

export const EditAppShortcutModal = (): ReactElement => {
  const dispatch = useDispatch();
  const appShortcut = useSelector(selectSettingsAppShortcut);

  const onSubmit = useCallback(
    (shortcut: string) => {
      dispatch(settingsSetAppShortcut.request({ shortcut }));
    },
    [dispatch],
  );

  return <EditShortcutModal shortcut={appShortcut} handleSubmit={onSubmit} />;
};
