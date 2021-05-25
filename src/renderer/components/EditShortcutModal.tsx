import isAccelerator from "electron-is-accelerator";
import React, { FormEvent, ReactElement, useCallback, useState } from "react";

interface EditShortcutModalProps {
  shortcut: string;
  handleSubmit: (shortcut: string) => void;
  handleClose: () => void;
}

export const EditShortcutModal = ({
  shortcut,
  handleSubmit,
  handleClose,
}: EditShortcutModalProps): ReactElement => {
  const [value, setValue] = useState(shortcut);
  const isValid = isAccelerator(value);

  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
    },
    [setValue],
  );

  const onSubmitClick = useCallback(() => {
    handleSubmit(value);
  }, [handleSubmit, value]);

  const onCloseClick = useCallback(() => {
    handleClose();
  }, [handleClose]);

  return (
    <div>
      <input value={value} onChange={onChange} />

      <button onClick={onSubmitClick} disabled={!isValid}>
        Submit
      </button>

      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};
