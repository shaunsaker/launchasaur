import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { showEditLauncherIconModal } from "../../store/editLauncherIconModal/actions";
import { hideEditLauncherModal } from "../../store/editLauncherModal/actions";
import {
  selectEditLauncherModalLaunchStationId,
  selectEditLauncherModalLauncherId,
} from "../../store/editLauncherModal/selectors";
import { setLauncherTitle } from "../../store/launchStations/actions";
import { selectLauncher } from "../../store/launchStations/selectors";
import { ApplicationState } from "../../store/reducers";
import { RHYTHM } from "../../theme";
import { FieldContainer } from "../FieldContainer";
import { FieldLabel } from "../FieldLabel";
import { Icon } from "../Icon";
import { Modal } from "../Modal";
import { SmallButton } from "../SmallButton";
import { TextInput } from "../TextInput";

export const EditLauncherModal = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStationId = useSelector(selectEditLauncherModalLaunchStationId);
  const launcherId = useSelector(selectEditLauncherModalLauncherId);
  const launcher = useSelector((state: ApplicationState) =>
    selectLauncher(state, { launchStationId, launcherId }),
  );

  const onCloseClick = useCallback(() => {
    dispatch(hideEditLauncherModal());
  }, [dispatch]);

  const onEditIconClick = useCallback(() => {
    dispatch(showEditLauncherIconModal({ launchStationId, launcherId }));
  }, [dispatch, launchStationId, launcherId]);

  const onChangeTitle = useCallback(
    (text: string) => {
      dispatch(setLauncherTitle({ launchStationId, launcherId, title: text }));
    },
    [dispatch, launchStationId, launcherId],
  );

  return (
    <Modal
      title={`Editing ${launcher.title || "Launcher"}`}
      onClose={onCloseClick}>
      <Container>
        <FieldContainer>
          <FieldLabel>Icon</FieldLabel>

          <IconContainer>
            <Icon icon={launcher.icon} />

            <IconButtonContainer>
              <SmallButton onClick={onEditIconClick}>EDIT</SmallButton>
            </IconButtonContainer>
          </IconContainer>
        </FieldContainer>

        <FieldContainer>
          <TextInput
            label="Title"
            placeholder="What should we call your Launcher?"
            value={launcher.title}
            onChangeText={onChangeTitle}
          />
        </FieldContainer>

        <FieldContainer>
          <FieldLabel>Shortcut</FieldLabel>
        </FieldContainer>

        <FieldContainer>
          <FieldLabel>Colour</FieldLabel>
        </FieldContainer>

        <FieldContainer>
          <FieldLabel>Actions</FieldLabel>
        </FieldContainer>

        <SubmitButtonContainer>
          <SmallButton primary onClick={onCloseClick}>
            DONE
          </SmallButton>
        </SubmitButtonContainer>
      </Container>
    </Modal>
  );
};

const Container = styled.div``;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconButtonContainer = styled.div`
  margin-left: ${RHYTHM}px;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
