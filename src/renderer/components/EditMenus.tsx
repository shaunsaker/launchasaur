import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAddMenuModal } from "../store/addMenuModal/actions";
import { showEditMenuTitleModal } from "../store/editMenuTitleModal/actions";
import { deleteSubmenu } from "../store/menus/actions";
import { MenuData } from "../store/menus/models";
import { selectIsMenuSubmenu, selectMenus } from "../store/menus/selectors";

export const EditMenus = (): ReactElement => {
  // display a list of menus with edit and delete buttons
  // show the default menu
  // can't delete default menu
  const dispatch = useDispatch();
  const menus = useSelector(selectMenus);

  const onEditMenuClick = useCallback(
    (menu: MenuData) => {
      dispatch(showEditMenuTitleModal({ menuId: menu.id }));
    },
    [dispatch],
  );

  const onDeleteMenuClick = useCallback(
    (menu: MenuData) => {
      dispatch(deleteSubmenu({ menuId: menu.id }));
    },
    [dispatch],
  );

  const onAddMenuClick = useCallback(() => {
    dispatch(showAddMenuModal());
  }, [dispatch]);

  return (
    <div>
      {menus.map((menu) => {
        const isMenuSubmenu = selectIsMenuSubmenu(menu.id);

        return (
          <div key={menu.id}>
            {menu.title}

            <button onClick={() => onEditMenuClick(menu)}>Edit</button>

            {isMenuSubmenu && (
              <button onClick={() => onDeleteMenuClick(menu)}>Delete</button>
            )}
          </div>
        );
      })}

      <button onClick={onAddMenuClick}>Add Menu</button>
    </div>
  );
};
