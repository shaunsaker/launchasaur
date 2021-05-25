import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showEditAppShortcutModal } from "../store/editAppShortcutModal/actions";
import { selectSettingsAppShortcut } from "../store/settings/selectors";

export const Settings = (): ReactElement => {
  const dispatch = useDispatch();
  const appShortcut = useSelector(selectSettingsAppShortcut);

  const onAppShortcutClick = useCallback(() => {
    dispatch(showEditAppShortcutModal());
  }, [dispatch]);

  return (
    <div>
      Settings
      <Link to="/">
        <button type="button">Back</button>
      </Link>
      <div>
        <button onClick={onAppShortcutClick}>
          App Shortcut: {appShortcut}
        </button>
      </div>
    </div>
  );
};
