import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import React, {
  MouseEvent,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useWindowSize } from "use-hooks";
import { SVG_BACKGROUND_ID } from ".";
import { showEditMenuOptionColourModal } from "../../store/editMenuOptionColourModal/actions";
import { showEditMenuOptionIconModal } from "../../store/editMenuOptionIconModal/actions";
import { showEditMenuOptionShortcutModal } from "../../store/editMenuOptionShortcutModal/actions";
import { showEditMenuOptionTitleModal } from "../../store/editMenuOptionTitleModal/actions";
import { showMenuActionsModal } from "../../store/menuActionsModal/actions";
import {
  addMenuOption,
  deleteMenuOption,
  deleteMenuOptionAction,
  triggerMenuOption,
} from "../../store/menus/actions";
import {
  ActionData,
  ADD_ITEM_TITLE,
  MenuId,
  MenuOptionData,
} from "../../store/menus/models";
import { getSvgArcCentroid } from "../../svg/getSvgArcCentroid";
import { flexCenterCSS, rhythm, theme } from "../../theme";
import { uuid } from "../../utils/uuid";
import { ContextMenu } from "../ContextMenu";
import { Icon } from "../Icon";
import { makeSvgArcProps } from "./makeSvgArcProps";

interface MenuOptionForegroundProps extends MenuOptionData {
  diameter: number;
  innerDiameter: number;
  index: number;
  itemCount: number;
  menuId: MenuId;
  svgBackgroundHasMounted: boolean;
  isHovered: boolean;
  isEditing: boolean;
  isEditable: boolean;
  onHover: (index: number | null) => void;
  onEdit: (index: number | null) => void;
}

interface LayoutState {
  top: number;
  left: number;
  width: number;
  height: number;
  contentTranslateX: number;
  contentTranslateY: number;
}

export const MenuOptionForeground = ({
  diameter,
  innerDiameter,
  index,
  itemCount,
  menuId,
  svgBackgroundHasMounted,
  id,
  icon,
  title,
  shortcut,
  isHovered,
  isEditing,
  isEditable,
  onHover,
  onEdit,
}: MenuOptionForegroundProps) => {
  const dispatch = useDispatch();
  const [layout, setLayout] = useState<LayoutState>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    contentTranslateX: 0,
    contentTranslateY: 0,
  });
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  useLayoutEffect(() => {
    // when the svg background has mounted we need to get the corresponding svg group
    // using the index and copy it's layout
    // we also position the inner content container so that it's center point
    // is exactly between the inner and outer arcs
    if (svgBackgroundHasMounted) {
      const svgArcProps = makeSvgArcProps({
        diameter,
        innerDiameter,
        itemCount,
        index,
      });
      const centerRadius =
        (diameter / 2 - rhythm * 2 + innerDiameter / 2 + rhythm / 2) / 2;
      const arcCentroid = getSvgArcCentroid({
        ...svgArcProps,
        innerRadius: centerRadius,
        outerRadius: centerRadius,
      });
      const element = document
        .getElementById(SVG_BACKGROUND_ID)
        .getElementsByTagName("g")
        .item(index)
        .getElementsByTagName("path")
        .item(0);
      const clientRect = element.getClientRects().item(0);
      const centerCoordsOfContainerRelativeToWindow = [
        clientRect.x + clientRect.width / 2,
        clientRect.y + clientRect.height / 2,
      ];
      const centerCoordsOfWindow = [windowWidth / 2, windowHeight / 2];
      const arcCentroidRelativeToWindow = [
        arcCentroid[0] + centerCoordsOfWindow[0],
        arcCentroid[1] + centerCoordsOfWindow[1],
      ];
      const contentTranslateRequired = [
        arcCentroidRelativeToWindow[0] -
          centerCoordsOfContainerRelativeToWindow[0],
        arcCentroidRelativeToWindow[1] -
          centerCoordsOfContainerRelativeToWindow[1],
      ];

      setLayout({
        top: clientRect.top,
        left: clientRect.left,
        width: clientRect.width,
        height: clientRect.height,
        contentTranslateX: contentTranslateRequired[0],
        contentTranslateY: contentTranslateRequired[1],
      });
    }
  }, [
    svgBackgroundHasMounted,
    diameter,
    innerDiameter,
    index,
    itemCount,
    windowWidth,
    windowHeight,
  ]);

  const onMouseOver = useCallback(() => {
    onHover(index);
  }, [onHover, index]);

  const onMouseLeave = useCallback(() => {
    onHover(null);
  }, [onHover]);

  const onClick = useCallback(() => {
    if (!isEditing) {
      const isAddItem = title === ADD_ITEM_TITLE;

      if (isAddItem) {
        dispatch(addMenuOption({ menuId, menuOptionId: uuid() }));
      } else {
        dispatch(
          triggerMenuOption.request({
            menuId: menuId,
            menuOptionId: id,
          }),
        );
      }
    }
  }, [dispatch, menuId, id, isEditing, title]);

  const onEditClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      onEdit(index);
    },
    [onEdit, index],
  );

  const onCloseEditClick = useCallback(() => {
    onEdit(null);
  }, [onEdit]);

  const onDeleteMenuOptionClick = useCallback(() => {
    dispatch(deleteMenuOption({ menuId: menuId, menuOptionId: id }));

    // reset the editing state
    onEdit(null);
  }, [dispatch, menuId, id, onEdit]);

  const onEditIconClick = useCallback(() => {
    dispatch(
      showEditMenuOptionIconModal({
        menuId: menuId,
        menuOptionId: id,
      }),
    );
  }, [dispatch, menuId, id]);

  const onEditTitleClick = useCallback(() => {
    dispatch(
      showEditMenuOptionTitleModal({
        menuId: menuId,
        menuOptionId: id,
      }),
    );
  }, [dispatch, menuId, id]);

  const onEditShortcutClick = useCallback(() => {
    dispatch(
      showEditMenuOptionShortcutModal({
        menuId: menuId,
        menuOptionId: id,
      }),
    );
  }, [dispatch, menuId, id]);

  const onEditColourClick = useCallback(() => {
    dispatch(
      showEditMenuOptionColourModal({
        menuId: menuId,
        menuOptionId: id,
      }),
    );
  }, [dispatch, menuId, id]);

  const onAddActionClick = useCallback(() => {
    dispatch(showMenuActionsModal({ menuId: menuId, menuOptionId: id }));
  }, [dispatch, menuId, id]);

  const onDeleteActionClick = useCallback(
    (option: MenuOptionData, action: ActionData) => {
      dispatch(
        deleteMenuOptionAction({
          menuId: menuId,
          menuOptionId: id,
          actionId: action.id,
        }),
      );
    },
    [dispatch, menuId, id],
  );

  if (!svgBackgroundHasMounted) {
    return null;
  }

  return (
    <Container
      layout={layout}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={onClick}>
      <ContentContainer
        translateX={layout.contentTranslateX}
        translateY={layout.contentTranslateY}>
        <IconContainer>
          <Icon icon={icon} isClickable={isEditing} onClick={onEditIconClick} />
        </IconContainer>

        <Text>{title || "What am I?"}</Text>

        <ShortcutText>
          {shortcut || (isEditing ? "Set Shortcut" : "")}
        </ShortcutText>
      </ContentContainer>

      {isEditable && isHovered && <ContextMenu />}
    </Container>
  );
};

interface ContainerProps {
  layout: LayoutState;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  top: ${({ layout }) => layout.top}px;
  left: ${({ layout }) => layout.left}px;
  width: ${({ layout }) => layout.width}px;
  height: ${({ layout }) => layout.height}px;
  cursor: pointer;
  ${flexCenterCSS}
`;

interface ContentContainerProps {
  translateX: number;
  translateY: number;
}

const ContentContainer = styled.div<ContentContainerProps>`
  transform: ${({ translateX, translateY }) =>
    `translate(${translateX}px, ${translateY}px)`};
  position: relative;
  ${flexCenterCSS}
`;

const IconContainer = styled.div`
  margin-bottom: ${rhythm}px;
  position: relative;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.white};
`;

const SHORTCUT_TEXT_SIZE = 12;
const ShortcutText = styled.div`
  font-size: ${SHORTCUT_TEXT_SIZE}px;
  height: ${SHORTCUT_TEXT_SIZE}px; // allows us to have empty text with the same layout
  color: ${theme.white};
  margin-top: ${rhythm / 2}px;
`;
