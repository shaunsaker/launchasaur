import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAddMenuModal } from "../store/addMenuModal/actions";
import { hideMenuActionsModal } from "../store/menuActionsModal/actions";
import { addMenuOptionAction } from "../store/menus/actions";
import { makeActionData } from "../store/menus/data";
import { MenuAction, MenuData } from "../store/menus/models";
import { selectSubmenus } from "../store/menus/selectors";
import { hideSelectSubmenuModal } from "../store/selectSubmenuModal/actions";
import {
  selectSelectSubmenuModalMenuId,
  selectSelectSubmenuModalMenuOptionId,
} from "../store/selectSubmenuModal/selectors";

export const SelectSubmenuModal = (): ReactElement => {
  const dispatch = useDispatch();
  const menuId = useSelector(selectSelectSubmenuModalMenuId);
  const menuOptionId = useSelector(selectSelectSubmenuModalMenuOptionId);
  const submenus = useSelector(selectSubmenus);
  const hasSubmenus = submenus.length;

  const onAddSubmenuClick = useCallback(() => {
    dispatch(showAddMenuModal());
  }, [dispatch]);

  const onSubmenuClick = useCallback(
    (menu: MenuData) => {
      const actionData = makeActionData({
        action: MenuAction.OpenSubmenu,
        resource: menu.id,
      });

      dispatch(
        addMenuOptionAction.success({ menuId, menuOptionId, actionData }),
      );
      dispatch(hideSelectSubmenuModal());
      dispatch(hideMenuActionsModal());
    },
    [dispatch, menuId, menuOptionId],
  );

  const onCloseClick = useCallback(() => {
    dispatch(hideSelectSubmenuModal());
  }, [dispatch]);

  return (
    <div>
      {!hasSubmenus ? (
        <div>
          <div>No submenus</div>

          <div onClick={onAddSubmenuClick}>Add Submenu</div>
        </div>
      ) : (
        <div>
          <div>Select a submenu</div>

          {submenus.map((menu) => (
            <div key={menu.id} onClick={() => onSubmenuClick(menu)}>
              {menu.title}
            </div>
          ))}
        </div>
      )}

      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};
