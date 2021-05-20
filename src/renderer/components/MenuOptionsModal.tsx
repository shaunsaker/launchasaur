import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { hideMenuOptionsModal } from "../store/menuOptionsModal/actions";
import { MenuAction, menuActions } from "../store/menus/models";

export const MenuOptionsModal = (): ReactElement => {
  const dispatch = useDispatch();

  const onMenuActionClick = useCallback(
    (action: MenuAction) => {
      console.log({ action });
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
