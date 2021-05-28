import React, { FormEvent, ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { hideAddMenuModal } from "../store/addMenuModal/actions";
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
    dispatch(hideAddMenuModal());
  }, [dispatch, value]);

  const onCloseClick = useCallback(() => {
    dispatch(hideAddMenuModal());
  }, [dispatch]);

  return (
    <div>
      <input value={value} onChange={onChange} />

      <button onClick={onSubmitClick}>Submit</button>

      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};
