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
import { ActionData, MenuData, MenuOptionData } from "../../store/menus/models";
import { Routes } from "../../store/navigation/routes";
import { isSubmenuRoute } from "../../store/navigation/utils";
import { objectToArray } from "../../utils/objectToArray";
import { uuid } from "../../utils/uuid";
import { LogoButton } from "./LogoButton";
import { RadialMenu } from "./RadialMenu";

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
    <RadialMenu render={(diameter) => <LogoButton diameter={diameter} />} />
  );

  return (
    <div>
      <Container>
        {objectToArray(menu?.options).map((option) => {
          const { isEditing } = option;

          return (
            <MenuOption
              key={option.id}
              onClick={() => onMenuOptionClick(option)}>
              {isEditing ? (
                <button onClick={() => onEditTitleClick(option)}>
                  Edit Title: {option.title}
                </button>
              ) : (
                <div>Title: {option.title}</div>
              )}

              {isEditing ? (
                <button onClick={() => onEditIconClick(option)}>
                  Edit Icon: {option.icon}
                </button>
              ) : (
                <div>Icon: {option.icon}</div>
              )}

              {isEditing ? (
                <button onClick={() => onEditColourClick(option)}>
                  Edit Colour: {option.colour}
                </button>
              ) : (
                <div>Colour: {option.colour}</div>
              )}

              {isEditing ? (
                <button onClick={() => onEditShortcutClick(option)}>
                  Edit Shortcut: {option.shortcut}
                </button>
              ) : (
                <div>Shortcut: {option.shortcut}</div>
              )}

              <div>
                <div>Actions:</div>

                {objectToArray(option.actions).map((action) => (
                  <div key={action.id}>
                    <div>Type: {action.action}</div>
                    <div>Resource: {action.resource}</div>

                    {isEditing && (
                      <button
                        onClick={() => onDeleteActionClick(option, action)}>
                        Delete Action
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <button onClick={() => onAddActionClick(option)}>
                  Add Action
                </button>
              )}

              {isEditing && (
                <button onClick={() => onDeleteMenuOptionClick(option)}>
                  Delete Menu Option
                </button>
              )}

              {!isEditing ? (
                <button
                  onClick={(event: MouseEvent<HTMLButtonElement>) =>
                    onEditMenuOptionClick(event, option)
                  }>
                  Edit
                </button>
              ) : (
                <button onClick={() => onCloseEditMenuOptionClick(option)}>
                  Close Edit
                </button>
              )}
            </MenuOption>
          );
        })}

        <button onClick={onAddMenuOptionClick}>Add Menu Option</button>

        {isSubmenuRoute() && <Link to={Routes.root}>Go Back</Link>}
      </Container>
    </div>
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
