import React, { MouseEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { showEditLauncherModal } from "../../../../../store/editLauncherModal/actions";
import { deleteLauncher } from "../../../../../store/launchStations/actions";
import {
  BORDER_RADIUS,
  BOX_SHADOW_CSS,
  SMALL_BORDER_RADIUS,
  SMALL_BORDER_WIDTH,
  theme,
} from "../../../../../theme";
import { FadeIn } from "../../../../FadeIn";
import { ContextMenuItem, ContextMenuItemProps } from "./ContextMenuItem";
import { useContextMenu } from "./useContextMenu";

interface ContextMenuProps {
  launchStationId: string;
  launcherId: string;
}

export const ContextMenu = ({
  launchStationId,
  launcherId,
}: ContextMenuProps) => {
  const dispatch = useDispatch();
  const { xPos, yPos, showContextMenu, setShowContextMenu } = useContextMenu();

  const onEditClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation(); // don't trigger the actions

      dispatch(showEditLauncherModal({ launchStationId, launcherId }));

      setShowContextMenu(false);
    },
    [dispatch, launchStationId, launcherId, setShowContextMenu],
  );

  const onDeleteClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation(); // don't trigger the actions

      dispatch(deleteLauncher({ launchStationId, launcherId }));

      setShowContextMenu(false);
    },
    [dispatch, launchStationId, launcherId, setShowContextMenu],
  );

  if (!showContextMenu) {
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
    <FadeIn>
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
    </FadeIn>
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
  background-color: ${theme.backgroundDarkOpaque};
  border: ${SMALL_BORDER_WIDTH}px solid ${theme.black};
  border-radius: ${SMALL_BORDER_RADIUS}px;
  ${BOX_SHADOW_CSS};
  overflow: hidden;
`;
