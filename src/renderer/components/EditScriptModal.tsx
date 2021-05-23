import React, { FormEvent, ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createFile } from "../store/files/actions";

export const EditScriptModal = (): ReactElement => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
    },
    [setValue],
  );

  const onSubmitClick = useCallback(() => {
    dispatch(createFile.request({ contents: value }));
  }, [dispatch, value]);

  return (
    <div>
      <input value={value} onChange={onChange} />

      <div onClick={onSubmitClick}>Submit</div>
    </div>
  );
};
