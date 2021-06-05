import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { showEditMenuOptionColourModal } from "../../../store/editMenuOptionColourModal/actions";
import { showEditMenuOptionIconModal } from "../../../store/editMenuOptionIconModal/actions";
import { showEditMenuOptionShortcutModal } from "../../../store/editMenuOptionShortcutModal/actions";
import { showEditMenuOptionTitleModal } from "../../../store/editMenuOptionTitleModal/actions";
import { deleteMenuOption } from "../../../store/menus/actions";
import {
  borderRadius,
  boxShadowCSS,
  smallBorderWidth,
  theme,
} from "../../../theme";
import { ContextMenuItem, ContextMenuItemProps } from "./ContextMenuItem";
import { useContextMenu } from "./useContextMenu";

interface ContextMenuProps {
  menuId: string;
  menuOptionId: string;
}

export const ContextMenu = ({ menuId, menuOptionId }: ContextMenuProps) => {
  const dispatch = useDispatch();
  const { xPos, yPos, showMenu } = useContextMenu();

  const onEditIconClick = useCallback(() => {
    dispatch(
      showEditMenuOptionIconModal({
        menuId,
        menuOptionId,
      }),
    );
  }, [dispatch, menuId, menuOptionId]);

  const onEditTitleClick = useCallback(() => {
    dispatch(
      showEditMenuOptionTitleModal({
        menuId,
        menuOptionId,
      }),
    );
  }, [dispatch, menuId, menuOptionId]);

  const onEditShortcutClick = useCallback(() => {
    dispatch(
      showEditMenuOptionShortcutModal({
        menuId,
        menuOptionId,
      }),
    );
  }, [dispatch, menuId, menuOptionId]);

  const onEditColourClick = useCallback(() => {
    dispatch(
      showEditMenuOptionColourModal({
        menuId,
        menuOptionId,
      }),
    );
  }, [dispatch, menuId, menuOptionId]);

  // const onAddActionClick = useCallback(() => {
  //   dispatch(showMenuActionsModal({ menuId: menuId, menuOptionId: id }));
  // }, [dispatch, menuId, id]);

  // const onDeleteActionClick = useCallback(
  //   (option: MenuOptionData, action: ActionData) => {
  //     dispatch(
  //       deleteMenuOptionAction({
  //         menuId: menuId,
  //         menuOptionId: id,
  //         actionId: action.id,
  //       }),
  //     );
  //   },
  //   [dispatch, menuId, id],
  // );

  const onDeleteMenuOptionClick = useCallback(() => {
    dispatch(deleteMenuOption({ menuId, menuOptionId }));
  }, [dispatch, menuId, menuOptionId]);

  if (!showMenu) {
    return null;
  }

  const menuItems: ContextMenuItemProps[] = [
    {
      icon: "edit",
      children: "Edit Icon",
      onClick: onEditIconClick,
    },
    {
      icon: "edit",
      children: "Edit Title",
      onClick: onEditTitleClick,
    },
    {
      icon: "edit",
      children: "Edit Shortcut",
      onClick: onEditShortcutClick,
    },
    {
      icon: "edit",
      children: "Edit Colour",
      onClick: onEditColourClick,
    },
    // {
    //   icon: "edit",
    //   children: "Edit Actions",
    //   onClick: onEditIconClick,
    // },
    {
      icon: "trash",
      children: "Delete",
      onClick: onDeleteMenuOptionClick,
    },
  ];

  return (
    <ContextMenuContainer x={xPos} y={yPos}>
      {menuItems.map((menuItem) => (
        <ContextMenuItem key={menuItem.children} {...menuItem} />
      ))}
    </ContextMenuContainer>
  );
};

interface ContextMenuContainerProps {
  x: number;
  y: number;
}

const ContextMenuContainer = styled.div<ContextMenuContainerProps>`
  position: fixed;
  top: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  background-color: ${theme.backgroundDark};
  border: ${smallBorderWidth}px solid ${theme.black};
  border-radius: ${borderRadius}px;
  ${boxShadowCSS};
  overflow: hidden;
`;
