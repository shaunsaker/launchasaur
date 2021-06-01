import isAccelerator from "electron-is-accelerator";
import React, { ReactElement, useCallback, useState } from "react";
import { useListenForKeyboardShortcutCombination } from "./useListenForKeyboardShortcutCombination";

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
  const [value, setValue] = useState(shortcut || "");
  const [isListening, setIsListening] = useState(false);
  const isValid = !value || isAccelerator(value);

  const onAddNewShortcutClick = useCallback(() => {
    setIsListening(true);
  }, []);

  const onChangeShortcut = useCallback((newShortcut: string) => {
    setIsListening(false);

    setValue(newShortcut);
  }, []);

  const onSubmitClick = useCallback(() => {
    handleSubmit(value);
  }, [handleSubmit, value]);

  const onCloseClick = useCallback(() => {
    handleClose();
  }, [handleClose]);

  useListenForKeyboardShortcutCombination(isListening, onChangeShortcut);

  return (
    <div>
      <button onClick={onAddNewShortcutClick}>
        {isListening ? "Listening..." : `Edit Shortcut: ${value}`}
      </button>

      <button onClick={onSubmitClick} disabled={!isValid}>
        Submit
      </button>

      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};
