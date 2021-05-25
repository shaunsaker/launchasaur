import isAccelerator from "electron-is-accelerator";
import React, { FormEvent, ReactElement, useCallback, useState } from "react";

interface EditShortcutModalProps {
  shortcut: string;
  handleSubmit: (shortcut: string) => void;
}

export const EditShortcutModal = ({
  shortcut,
  handleSubmit,
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

  return (
    <div>
      <input value={value} onChange={onChange} />

      <button onClick={onSubmitClick} disabled={!isValid}>
        Submit
      </button>
    </div>
  );
};
