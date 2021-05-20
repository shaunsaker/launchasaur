import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { showMenuOptionsModal } from "../../store/menuOptionsModal/actions";
import { MenuData, MenuOptionData } from "../../store/menus/models";

interface MenuProps {
  menu: MenuData;
}

export const Menu = ({ menu }: MenuProps): ReactElement => {
  const dispatch = useDispatch();

  const onMenuOptionClick = useCallback((option: MenuOptionData) => {
    // send actions to main so that we can trigger them from there
    console.log({ option });
  }, []);

  const onAddMenuOption = useCallback(() => {
    dispatch(showMenuOptionsModal(menu.id));
  }, [dispatch]);

  return (
    <Container>
      {menu.options.map((option) => (
        <div onClick={() => onMenuOptionClick(option)} />
      ))}

      <div onClick={onAddMenuOption}>Add Menu Option</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
