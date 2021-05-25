import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEditMenuOptionShortcutModal } from "../store/editMenuOptionShortcutModal/actions";
import {
  selectEditMenuOptionShortcutModalMenuId,
  selectEditMenuOptionShortcutModalMenuOptionId,
} from "../store/editMenuOptionShortcutModal/selectors";
import { setMenuOptionShortcut } from "../store/menus/actions";
import { selectMenuOption } from "../store/menus/selectors";
import { ApplicationState } from "../store/reducers";
import { EditShortcutModal } from "./EditShortcutModal";

export const EditMenuOptionShortcutModal = (): ReactElement => {
  const dispatch = useDispatch();
  const menuId = useSelector(selectEditMenuOptionShortcutModalMenuId);
  const menuOptionId = useSelector(
    selectEditMenuOptionShortcutModalMenuOptionId,
  );
  const menuOption = useSelector((state: ApplicationState) =>
    selectMenuOption(state, { menuId, menuOptionId }),
  );

  const onSubmit = useCallback(
    (shortcut: string) => {
      dispatch(setMenuOptionShortcut({ menuId, menuOptionId, shortcut }));
      dispatch(hideEditMenuOptionShortcutModal());
    },
    [dispatch, menuId, menuOptionId],
  );

  const onClose = useCallback(() => {
    dispatch(hideEditMenuOptionShortcutModal());
  }, [dispatch]);

  return (
    <EditShortcutModal
      shortcut={menuOption.shortcut}
      handleSubmit={onSubmit}
      handleClose={onClose}
    />
  );
};
