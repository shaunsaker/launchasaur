import React, { ReactElement, useCallback, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { showMenuActionsModal } from "../../store/menuActionsModal/actions";
import {
  addMenuOption,
  deleteMenuOption,
  deleteMenuOptionAction,
  editMenuOption,
  triggerMenuOption,
} from "../../store/menus/actions";
import { ActionData, MenuData, MenuOptionData } from "../../store/menus/models";
import { objectToArray } from "../../utils/objectToArray";
import { uuid } from "../../utils/uuid";

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

  return (
    <Container>
      {objectToArray(menu?.options).map((option) => {
        const { isEditing } = option;

        return (
          <MenuOption key={option.id} onClick={() => onMenuOptionClick(option)}>
            <div>Title: {option.title}</div>
            <div>Icon: {option.icon}</div>
            <div>Colour: {option.colour}</div>
            <div>
              <div>Actions:</div>

              {objectToArray(option.actions).map((action) => (
                <div key={action.id}>
                  <div>Type: {action.action}</div>
                  <div>Resource: {action.resource}</div>

                  {isEditing && (
                    <button onClick={() => onDeleteActionClick(option, action)}>
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

            {isEditing && (
              <button onClick={() => onDeleteMenuOptionClick(option)}>
                Delete
              </button>
            )}
          </MenuOption>
        );
      })}

      <button onClick={onAddMenuOptionClick}>Add Menu Option</button>
    </Container>
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
