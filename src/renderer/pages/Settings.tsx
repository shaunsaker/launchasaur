import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showEditAppShortcutModal } from "../store/editAppShortcutModal/actions";

export const Settings = (): ReactElement => {
  const dispatch = useDispatch();
  const appShortcut = "";

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
