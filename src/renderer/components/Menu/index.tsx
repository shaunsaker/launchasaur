import React, { ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
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
import { absoluteCenterCSS, flexCenterCSS } from "../../theme";
import { objectToArray } from "../../utils/objectToArray";
import { uuid } from "../../utils/uuid";
import { LogoButton } from "./LogoButton";
import { MenuOptionForeground } from "./MenuOptionForeground";
import { MenuOptionSvgBackground } from "./MenuOptionSvgBackground";

const MENU_DIAMETER = 640;
const MENU_INNER_DIAMETER = 128;
export const SVG_BACKGROUND_ID = "menu";

interface MenuProps {
  menu: MenuData;
}

export const Menu = ({ menu }: MenuProps): ReactElement => {
  const dispatch = useDispatch();
  const [svgBackgroundHasMounted, setSvgBackgroundHasMounted] = useState(false);
  const [menuOptionIndexHovered, setMenuOptionIndexHovered] = useState(null);
  const [menuOptionIndexEditing, setMenuOptionIndexEditing] = useState(null);
  const options = [
    ...objectToArray(menu?.options),
    makeMenuOptionData({
      title: "Add New Item",
      icon: "plus",
      shortcut: "Ctrl + R",
      isEditable: false,
    }),
  ];
  const itemCount = options.length;

  const onMountSvgBackground = useCallback(() => {
    setSvgBackgroundHasMounted(true);
  }, []);

  const onHoverMenuOption = useCallback((index: number) => {
    setMenuOptionIndexHovered(index);
  }, []);

  const onEditMenuOption = useCallback((index: number) => {
    setMenuOptionIndexEditing(index);
  }, []);

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
    <Container>
      <SvgBackgroundContainer id={SVG_BACKGROUND_ID}>
        {options.map((option, index) => (
          <MenuOptionSvgBackground
            key={option.id}
            diameter={MENU_DIAMETER}
            innerDiameter={MENU_INNER_DIAMETER}
            index={index}
            itemCount={itemCount}
            colour={option.colour}
            isHovered={
              menuOptionIndexHovered === index ||
              menuOptionIndexEditing === index
            }
            onMount={onMountSvgBackground}
          />
        ))}
      </SvgBackgroundContainer>

      <ForegroundContainer>
        {options.map((option, index) => (
          <MenuOptionForeground
            key={option.id}
            diameter={MENU_DIAMETER}
            innerDiameter={MENU_INNER_DIAMETER}
            index={index}
            itemCount={itemCount}
            svgBackgroundHasMounted={svgBackgroundHasMounted}
            icon={option.icon}
            title={option.title}
            shortcut={option.shortcut}
            isHovered={menuOptionIndexHovered === index}
            isEditing={menuOptionIndexEditing === index}
            isEditable={option.isEditable}
            onHover={onHoverMenuOption}
            onEdit={onEditMenuOption}
          />
        ))}
      </ForegroundContainer>

      <LogoButtonContainer>
        <LogoButton diameter={MENU_INNER_DIAMETER} />
      </LogoButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  flex: 1;
  ${flexCenterCSS}
`;

const SvgBackgroundContainer = styled.svg`
  width: ${MENU_DIAMETER}px;
  height: ${MENU_DIAMETER}px;
`;

const ForegroundContainer = styled.div``;

const LogoButtonContainer = styled.div`
  ${absoluteCenterCSS}
`;
