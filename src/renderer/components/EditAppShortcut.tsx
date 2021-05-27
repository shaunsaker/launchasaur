import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showEditAppShortcutModal } from "../store/editAppShortcutModal/actions";
import { selectSettingsAppShortcut } from "../store/settings/selectors";

export const EditAppShortcut = (): ReactElement => {
  const dispatch = useDispatch();
  const appShortcut = useSelector(selectSettingsAppShortcut);

  const onAppShortcutClick = useCallback(() => {
    dispatch(showEditAppShortcutModal());
  }, [dispatch]);

  return (
    <button onClick={onAppShortcutClick}>App Shortcut: {appShortcut}</button>
  );
};
