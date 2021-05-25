import React, { FormEvent, ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEditMenuOptionTitleModal } from "../store/editMenuOptionTitleModal/actions";
import {
  selectEditMenuOptionTitleModalMenuId,
  selectEditMenuOptionTitleModalMenuOptionId,
} from "../store/editMenuOptionTitleModal/selectors";
import { setMenuOptionTitle } from "../store/menus/actions";

export const EditMenuOptionTitleModal = (): ReactElement => {
  const dispatch = useDispatch();
  const menuId = useSelector(selectEditMenuOptionTitleModalMenuId);
  const menuOptionId = useSelector(selectEditMenuOptionTitleModalMenuOptionId);
  const [value, setValue] = useState("");

  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
    },
    [setValue],
  );

  const onSubmitClick = useCallback(() => {
    dispatch(setMenuOptionTitle({ menuId, menuOptionId, title: value }));
    dispatch(hideEditMenuOptionTitleModal());
  }, [dispatch, menuId, menuOptionId, value]);

  const onCloseClick = useCallback(() => {
    dispatch(hideEditMenuOptionTitleModal());
  }, [dispatch]);

  return (
    <div>
      <input value={value} onChange={onChange} />

      <button onClick={onSubmitClick}>Submit</button>

      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};
