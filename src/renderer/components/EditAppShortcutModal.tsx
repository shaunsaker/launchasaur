import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEditAppShortcutModal } from "../store/editAppShortcutModal/actions";
import { settingsSetAppShortcut } from "../store/settings/actions";
import { selectSettingsAppShortcut } from "../store/settings/selectors";
import { ShortcutEditor } from "./ShortcutEditor";

export const EditAppShortcutModal = (): ReactElement => {
  const dispatch = useDispatch();
  const appShortcut = useSelector(selectSettingsAppShortcut);

  const onSubmit = useCallback(
    (shortcut: string) => {
      dispatch(settingsSetAppShortcut.request({ shortcut }));
    },
    [dispatch],
  );

  const onClose = useCallback(() => {
    dispatch(hideEditAppShortcutModal());
  }, [dispatch]);

  return (
    <ShortcutEditor
      shortcut={appShortcut}
      handleSubmit={onSubmit}
      handleClose={onClose}
    />
  );
};
