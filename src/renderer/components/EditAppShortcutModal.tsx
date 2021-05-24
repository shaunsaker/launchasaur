import isAccelerator from "electron-is-accelerator";
import React, { FormEvent, ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingsSetAppShortcut } from "../store/settings/actions";
import { selectSettingsAppShortcut } from "../store/settings/selectors";

export const EditAppShortcutModal = (): ReactElement => {
  const dispatch = useDispatch();
  const appShortcut = useSelector(selectSettingsAppShortcut);
  const [value, setValue] = useState(appShortcut);
  const isValid = isAccelerator(value);

  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
    },
    [setValue],
  );

  const onSubmitClick = useCallback(() => {
    dispatch(settingsSetAppShortcut.request({ shortcut: value }));
  }, [dispatch, value]);

  return (
    <div>
      <input value={value} onChange={onChange} />

      <button onClick={onSubmitClick} disabled={!isValid}>
        Submit
      </button>
    </div>
  );
};
