import React, { MouseEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
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
  const { xPos, yPos, showMenu, setShowMenu } = useContextMenu();

  const onEditClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation(); // don't trigger the actions

      setShowMenu(false);

      // TODO:
    },
    [setShowMenu],
  );

  const onDeleteClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation(); // don't trigger the actions

      dispatch(deleteMenuOption({ menuId, menuOptionId }));

      setShowMenu(false);
    },
    [dispatch, menuId, menuOptionId, setShowMenu],
  );

  if (!showMenu) {
    return null;
  }

  const menuItems: ContextMenuItemProps[] = [
    {
      icon: "edit",
      children: "Edit",
      onClick: onEditClick,
    },
    {
      icon: "trash",
      children: "Delete",
      onClick: onDeleteClick,
    },
  ];

  return (
    <ContextMenuContainer x={xPos} y={yPos}>
      {menuItems.map((menuItem) => (
        <ContextMenuItem
          key={menuItem.children}
          icon={menuItem.icon}
          children={menuItem.children}
          onClick={menuItem.onClick}
        />
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
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  background-color: ${theme.backgroundDark};
  border: ${smallBorderWidth}px solid ${theme.black};
  border-radius: ${borderRadius / 2}px;
  ${boxShadowCSS};
  overflow: hidden;
`;
