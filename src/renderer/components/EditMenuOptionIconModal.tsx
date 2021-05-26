import React, { ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEditMenuOptionIconModal } from "../store/editMenuOptionIconModal/actions";
import {
  selectEditMenuOptionIconModalMenuId,
  selectEditMenuOptionIconModalMenuOptionId,
} from "../store/editMenuOptionIconModal/selectors";
import { setMenuOptionIcon } from "../store/menus/actions";
import { selectMenuOption } from "../store/menus/selectors";
import { ApplicationState } from "../store/reducers";

export const EditMenuOptionIconModal = (): ReactElement => {
  const dispatch = useDispatch();
  const menuId = useSelector(selectEditMenuOptionIconModalMenuId);
  const menuOptionId = useSelector(selectEditMenuOptionIconModalMenuOptionId);
  const menuOption = useSelector((state: ApplicationState) =>
    selectMenuOption(state, { menuId, menuOptionId }),
  );
  const [value, setValue] = useState(menuOption.icon);

  const onSelectIcon = useCallback(
    (icon: string) => {
      setValue(icon);
    },
    [setValue],
  );

  const onSubmitClick = useCallback(() => {
    dispatch(setMenuOptionIcon({ menuId, menuOptionId, icon: value }));
    dispatch(hideEditMenuOptionIconModal());
  }, [dispatch, menuId, menuOptionId, value]);

  const onCloseClick = useCallback(() => {
    dispatch(hideEditMenuOptionIconModal());
  }, [dispatch]);

  // TODO: list all icons for selection

  return (
    <div>
      <button onClick={onSubmitClick}>Submit</button>

      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};
