import React, { ReactElement, useCallback, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { showEditMenuOptionColourModal } from "../../store/editMenuOptionColourModal/actions";
import { showEditMenuOptionIconModal } from "../../store/editMenuOptionIconModal/actions";
import { showEditMenuOptionShortcutModal } from "../../store/editMenuOptionShortcutModal/actions";
import { showEditMenuOptionTitleModal } from "../../store/editMenuOptionTitleModal/actions";
import { showMenuActionsModal } from "../../store/menuActionsModal/actions";
import {
  addMenuOption,
  deleteMenuOption,
  deleteMenuOptionAction,
  editMenuOption,
  triggerMenuOption,
} from "../../store/menus/actions";
import { makeMenuOptionData } from "../../store/menus/data";
import { ActionData, MenuData, MenuOptionData } from "../../store/menus/models";
import { Routes } from "../../store/navigation/routes";
import { isSubmenuRoute } from "../../store/navigation/utils";
import { objectToArray } from "../../utils/objectToArray";
import { uuid } from "../../utils/uuid";
import { LogoButton } from "./LogoButton";
import { MenuBase } from "./MenuBase";

interface MenuProps {
  menu: MenuData;
}

export const Menu = ({ menu }: MenuProps): ReactElement => {
  const dispatch = useDispatch();

  const onMenuOptionClick = useCallback(
    (option: MenuOptionData) => {
      if (!option.isEditing) {
        dispatch(
          triggerMenuOption.request({
            menuId: menu.id,
            menuOptionId: option.id,
          }),
        );
      }
    },
    [dispatch, menu.id],
  );

  const onAddMenuOptionClick = useCallback(() => {
    dispatch(addMenuOption({ menuId: menu.id, menuOptionId: uuid() }));
  }, [dispatch, menu.id]);

  const onAddActionClick = useCallback(
    (option: MenuOptionData) => {
      dispatch(
        showMenuActionsModal({ menuId: menu.id, menuOptionId: option.id }),
      );
    },
    [dispatch, menu.id],
  );

  const onDeleteActionClick = useCallback(
    (option: MenuOptionData, action: ActionData) => {
      dispatch(
        deleteMenuOptionAction({
          menuId: menu.id,
          menuOptionId: option.id,
          actionId: action.id,
        }),
      );
    },
    [dispatch, menu.id],
  );

  const onEditMenuOptionClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>, option: MenuOptionData) => {
      // stop propogation of the event to the menu option container
      // otherwise we will trigger it's actions
      event.stopPropagation();

      dispatch(
        editMenuOption({
          menuId: menu.id,
          menuOptionId: option.id,
          isEditing: true,
        }),
      );
    },
    [dispatch, menu.id],
  );

  const onCloseEditMenuOptionClick = useCallback(
    (option: MenuOptionData) => {
      dispatch(
        editMenuOption({
          menuId: menu.id,
          menuOptionId: option.id,
          isEditing: false,
        }),
      );
    },
    [dispatch, menu.id],
  );

  const onDeleteMenuOptionClick = useCallback(
    (option: MenuOptionData) => {
      dispatch(deleteMenuOption({ menuId: menu.id, menuOptionId: option.id }));
    },
    [dispatch, menu.id],
  );

  const onEditTitleClick = useCallback(
    (option: MenuOptionData) => {
      dispatch(
        showEditMenuOptionTitleModal({
          menuId: menu.id,
          menuOptionId: option.id,
        }),
      );
    },
    [dispatch, menu.id],
  );

  const onEditShortcutClick = useCallback(
    (option: MenuOptionData) => {
      dispatch(
        showEditMenuOptionShortcutModal({
          menuId: menu.id,
          menuOptionId: option.id,
        }),
      );
    },
    [dispatch, menu.id],
  );

  const onEditIconClick = useCallback(
    (option: MenuOptionData) => {
      dispatch(
        showEditMenuOptionIconModal({
          menuId: menu.id,
          menuOptionId: option.id,
        }),
      );
    },
    [dispatch, menu.id],
  );

  const onEditColourClick = useCallback(
    (option: MenuOptionData) => {
      dispatch(
        showEditMenuOptionColourModal({
          menuId: menu.id,
          menuOptionId: option.id,
        }),
      );
    },
    [dispatch, menu.id],
  );

  return (
    <MenuBase
      options={[
        ...objectToArray(menu?.options),
        makeMenuOptionData({}),
        makeMenuOptionData({}),
        makeMenuOptionData({
          title: "Add New Item",
          icon: "plus",
          shortcut: "Ctrl + R",
        }),
      ]}
      render={(diameter) => <LogoButton diameter={diameter} />}
    />
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const MenuOption = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
  overflow: auto;
  background-color: white;
`;
