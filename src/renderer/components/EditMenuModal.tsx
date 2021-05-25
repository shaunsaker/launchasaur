import React, { FormEvent, ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { hideEditMenuModal } from "../store/editMenuModal/actions";
import { addMenu } from "../store/menus/actions";

export const EditMenuModal = (): ReactElement => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
    },
    [setValue],
  );

  const onSubmitClick = useCallback(() => {
    dispatch(addMenu({ title: value }));
    dispatch(hideEditMenuModal());
  }, [dispatch, value]);

  const onCloseClick = useCallback(() => {
    dispatch(hideEditMenuModal());
  }, [dispatch]);

  return (
    <div>
      <input value={value} onChange={onChange} />

      <button onClick={onSubmitClick}>Submit</button>

      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};
