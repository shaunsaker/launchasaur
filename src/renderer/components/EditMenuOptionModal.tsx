import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hideEditMenuOptionModal } from "../store/editMenuOptionModal/actions";
import {
  selectEditMenuOptionModalMenuId,
  selectEditMenuOptionModalMenuOptionId,
} from "../store/editMenuOptionModal/selectors";
import { selectMenuOption } from "../store/menus/selectors";
import { ApplicationState } from "../store/reducers";
import { flexCenterCSS, rhythm } from "../theme";
import { FieldLabel } from "./FieldLabel";
import { Icon } from "./Icon";
import { Modal } from "./Modal";
import { TextInput } from "./TextInput";

export const EditMenuOptionModal = (): ReactElement => {
  const dispatch = useDispatch();
  const menuId = useSelector(selectEditMenuOptionModalMenuId);
  const menuOptionId = useSelector(selectEditMenuOptionModalMenuOptionId);
  const menuOption = useSelector((state: ApplicationState) =>
    selectMenuOption(state, { menuId, menuOptionId }),
  );

  const onCloseClick = useCallback(() => {
    dispatch(hideEditMenuOptionModal());
  }, [dispatch]);

  return (
    <Modal title="Edit Menu Option" onClose={onCloseClick}>
      <Container>
        <FieldContainer>
          <Icon icon={menuOption.icon} />
        </FieldContainer>

        <FieldContainer>
          <FieldLabel>Colour</FieldLabel>
        </FieldContainer>

        <FieldContainer>
          <TextInput
            label="Title"
            placeholder="What should we call your menu option?"
            value=""
            onChangeText={() => {}}
          />
        </FieldContainer>

        <FieldContainer>
          <FieldLabel>Shortcut</FieldLabel>
        </FieldContainer>

        <FieldContainer>
          <FieldLabel>Actions</FieldLabel>
        </FieldContainer>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  ${flexCenterCSS};
`;

const FieldContainer = styled.div`
  margin-bottom: ${rhythm}px;
  display: flex;
`;

const FieldItemContainer = styled.div`
  flex: 1;
  ${flexCenterCSS};
`;
