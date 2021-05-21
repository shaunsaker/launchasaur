import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideMenuActionsModal } from "../store/menuActionsModal/actions";
import {
  selectMenuActionsModalMenuId,
  selectMenuActionsModalMenuOptionId,
} from "../store/menuActionsModal/selectors";
import { addMenuAction } from "../store/menus/actions";
import { MenuAction, menuActions } from "../store/menus/models";

export const MenuActionsModal = (): ReactElement => {
  const dispatch = useDispatch();
  const menuId = useSelector(selectMenuActionsModalMenuId);
  const menuOptionId = useSelector(selectMenuActionsModalMenuOptionId);

  const onMenuActionClick = useCallback(
    (action: MenuAction) => {
      dispatch(addMenuAction.request({ menuId, menuOptionId, action }));
    },
    [dispatch],
  );

  const onCloseClick = useCallback(() => {
    dispatch(hideMenuActionsModal());
  }, [dispatch]);

  return (
    <div>
      {menuActions.map((action) => (
        <div key={action} onClick={() => onMenuActionClick(action)}>
          {action}
        </div>
      ))}

      <div onClick={onCloseClick}>Close</div>
    </div>
  );
};
