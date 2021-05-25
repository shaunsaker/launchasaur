import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEditMenuOptionTitleModal } from "../store/editMenuOptionTitleModal/actions";
import {
  selectEditMenuOptionTitleModalMenuId,
  selectEditMenuOptionTitleModalMenuOptionId,
} from "../store/editMenuOptionTitleModal/selectors";
import { setMenuOptionTitle } from "../store/menus/actions";
import { selectMenuOption } from "../store/menus/selectors";
import { ApplicationState } from "../store/reducers";
import { EditTitleModal } from "./EditTitleModal";

export const EditMenuOptionTitleModal = (): ReactElement => {
  const dispatch = useDispatch();
  const menuId = useSelector(selectEditMenuOptionTitleModalMenuId);
  const menuOptionId = useSelector(selectEditMenuOptionTitleModalMenuOptionId);
  const menuOption = useSelector((state: ApplicationState) =>
    selectMenuOption(state, { menuId, menuOptionId }),
  );
  const onSubmit = useCallback(
    (value: string) => {
      dispatch(setMenuOptionTitle({ menuId, menuOptionId, title: value }));
      dispatch(hideEditMenuOptionTitleModal());
    },
    [dispatch, menuId, menuOptionId],
  );

  const onClose = useCallback(() => {
    dispatch(hideEditMenuOptionTitleModal());
  }, [dispatch]);

  return (
    <EditTitleModal
      title={menuOption.title}
      handleSubmit={onSubmit}
      handleClose={onClose}
    />
  );
};
