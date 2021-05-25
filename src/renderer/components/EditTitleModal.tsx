import React, { FormEvent, ReactElement, useCallback, useState } from "react";

type Title = string;

interface EditTitleModalProps {
  title: Title;
  handleSubmit: (title: Title) => void;
  handleClose: () => void;
}

export const EditTitleModal = ({
  title,
  handleSubmit,
  handleClose,
}: EditTitleModalProps): ReactElement => {
  const [value, setValue] = useState(title);

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

      <button onClick={onSubmitClick}>Submit</button>

      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};
