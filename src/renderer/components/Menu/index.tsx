import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { showMenuActionsModal } from "../../store/menuActionsModal/actions";
import {
  addMenuOption,
  deleteMenuOption,
  editMenuOption,
} from "../../store/menus/actions";
import { MenuData, MenuOptionData } from "../../store/menus/models";

interface MenuProps {
  menu: MenuData;
}

export const Menu = ({ menu }: MenuProps): ReactElement => {
  const dispatch = useDispatch();

  const onMenuOptionClick = useCallback((option: MenuOptionData) => {
    if (!option.isEditing) {
      // TODO: send actions to main so that we can trigger them from there
      console.log({ option });
    }
  }, []);

  const onAddMenuOptionClick = useCallback(() => {
    dispatch(addMenuOption({ menuId: menu.id }));
  }, [dispatch]);

  const onAddActionClick = useCallback(() => {
    dispatch(showMenuActionsModal(menu.id));
  }, [dispatch]);

  const onEditMenuOptionClick = useCallback(
    (menuOptionId: string) => {
      dispatch(editMenuOption({ menuId: menu.id, menuOptionId }));
    },
    [dispatch],
  );

  const onCloseEditMenuOptionClick = useCallback(() => {
    dispatch(editMenuOption({ menuId: menu.id, menuOptionId: "" }));
  }, [dispatch]);

  const onDeleteMenuOptionClick = useCallback(
    (menuOptionId: string) => {
      dispatch(deleteMenuOption({ menuId: menu.id, menuOptionId }));
    },
    [dispatch],
  );

  return (
    <Container>
      {menu?.options.map((option) => {
        const { isEditing } = option;

        return (
          <MenuOption key={option.id} onClick={() => onMenuOptionClick(option)}>
            <div>Title: {option.title}</div>
            <div>Icon: {option.icon}</div>
            <div>Colour: {option.colour}</div>
            <div>
              <div>Actions:</div>

              {option.actions.map((action) => (
                <div key={action.type}>
                  <div>Type: {action.type}</div>
                  <div>Resource: {action.resource}</div>
                </div>
              ))}
            </div>

            {isEditing && <div onClick={onAddActionClick}>Add Action</div>}

            {!isEditing ? (
              <div onClick={() => onEditMenuOptionClick(option.id)}>Edit</div>
            ) : (
              <div onClick={onCloseEditMenuOptionClick}>Close Edit</div>
            )}

            {isEditing && (
              <div onClick={() => onDeleteMenuOptionClick(option.id)}>
                Delete
              </div>
            )}
          </MenuOption>
        );
      })}

      <div onClick={onAddMenuOptionClick}>Add Menu Option</div>
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
`;
