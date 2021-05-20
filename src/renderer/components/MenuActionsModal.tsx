import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideMenuOptionsModal } from "../store/menuActionsModal/actions";
import { selectMenuOptionsModalShowForMenuId } from "../store/menuActionsModal/selectors";
import { addMenuAction } from "../store/menus/actions";
import { MenuAction, menuActions } from "../store/menus/models";

export const MenuActionsModal = (): ReactElement => {
  const dispatch = useDispatch();
  const menuId = useSelector(selectMenuOptionsModalShowForMenuId);

  const onMenuActionClick = useCallback(
    (action: MenuAction) => {
      dispatch(addMenuAction({ menuId, action }));
    },
    [dispatch],
  );

  const onCloseClick = useCallback(() => {
    dispatch(hideMenuOptionsModal());
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
