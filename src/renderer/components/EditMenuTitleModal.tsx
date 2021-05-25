import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEditMenuTitleModal } from "../store/editMenuTitleModal/actions";
import { selectEditMenuTitleModalMenuId } from "../store/editMenuTitleModal/selectors";
import { setMenuTitle } from "../store/menus/actions";
import { selectMenu } from "../store/menus/selectors";
import { EditTitleModal } from "./EditTitleModal";

export const EditMenuTitleModal = (): ReactElement => {
  const dispatch = useDispatch();
  const menuId = useSelector(selectEditMenuTitleModalMenuId);
  const menu = useSelector(selectMenu);

  const onSubmit = useCallback(
    (value: string) => {
      dispatch(setMenuTitle({ menuId, title: value }));
      dispatch(hideEditMenuTitleModal());
    },
    [dispatch, menuId],
  );

  const onClose = useCallback(() => {
    dispatch(hideEditMenuTitleModal());
  }, [dispatch]);

  return (
    <EditTitleModal
      title={menu.title}
      handleSubmit={onSubmit}
      handleClose={onClose}
    />
  );
};
