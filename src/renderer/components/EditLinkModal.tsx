import React, { FormEvent, ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEditLinkModal } from "../store/editLinkModal/actions";
import {
  selectEditLinkModalMenuId,
  selectEditLinkModalMenuOptionId,
} from "../store/editLinkModal/selectors";
import { hideMenuActionsModal } from "../store/menuActionsModal/actions";
import { addMenuOptionAction } from "../store/menus/actions";
import { makeActionData } from "../store/menus/data";
import { MenuAction } from "../store/menus/models";
import { uuid } from "../utils/uuid";

export const EditLinkModal = (): ReactElement => {
  const dispatch = useDispatch();
  const menuId = useSelector(selectEditLinkModalMenuId);
  const menuOptionId = useSelector(selectEditLinkModalMenuOptionId);
  const [value, setValue] = useState("");

  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
    },
    [setValue],
  );

  const onSubmitClick = useCallback(() => {
    const actionData = makeActionData({
      id: uuid(),
      action: MenuAction.OpenLink,
      resource: value,
    });

    dispatch(addMenuOptionAction.success({ menuId, menuOptionId, actionData }));
    dispatch(hideEditLinkModal());
    dispatch(hideMenuActionsModal());
  }, [dispatch, value, menuId, menuOptionId]);

  return (
    <div>
      <input value={value} onChange={onChange} />

      <div onClick={onSubmitClick}>Submit</div>
    </div>
  );
};
