import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideMenuActionsModal } from "../store/menuActionsModal/actions";
import {
  selectMenuActionsModalMenuId,
  selectMenuActionsModalMenuOptionId,
} from "../store/menuActionsModal/selectors";
import { addMenuOptionAction } from "../store/menus/actions";
import { MenuAction, menuActions } from "../store/menus/models";
import { selectMenuOptionHasOpenSubmenuAction } from "../store/menus/selectors";
import { ApplicationState } from "../store/reducers";

export const MenuActionsModal = (): ReactElement => {
  const dispatch = useDispatch();
  const menuId = useSelector(selectMenuActionsModalMenuId);
  const menuOptionId = useSelector(selectMenuActionsModalMenuOptionId);
  const menuOptionHasOpenSubmenuAction = useSelector(
    (state: ApplicationState) =>
      selectMenuOptionHasOpenSubmenuAction(state, { menuId, menuOptionId }),
  );

  const onMenuActionClick = useCallback(
    (action: MenuAction) => {
      dispatch(addMenuOptionAction.request({ menuId, menuOptionId, action }));
    },
    [dispatch, menuId, menuOptionId],
  );

  const onCloseClick = useCallback(() => {
    dispatch(hideMenuActionsModal());
  }, [dispatch]);

  return (
    <div>
      {menuActions.map((action) => (
        <button
          key={action}
          onClick={() => onMenuActionClick(action)}
          disabled={
            // don't allow multiple open submenu actions
            action === MenuAction.OpenSubmenu && menuOptionHasOpenSubmenuAction
          }>
          {action}
        </button>
      ))}

      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};
