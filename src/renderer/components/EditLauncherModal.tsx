import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hideEditLauncherModal } from "../store/editLauncherModal/actions";
import {
  selectEditLauncherModalLaunchStationId,
  selectEditLauncherModalLauncherId,
} from "../store/editLauncherModal/selectors";
import { selectLauncher } from "../store/launchStations/selectors";
import { ApplicationState } from "../store/reducers";
import { flexCenterCSS, rhythm } from "../theme";
import { FieldLabel } from "./FieldLabel";
import { Icon } from "./Icon";
import { Modal } from "./Modal";
import { TextInput } from "./TextInput";

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

  return (
    <Modal title="Edit Launcher" onClose={onCloseClick}>
      <Container>
        <FieldContainer>
          <Icon icon={launcher.icon} />
        </FieldContainer>

        <FieldContainer>
          <FieldLabel>Colour</FieldLabel>
        </FieldContainer>

        <FieldContainer>
          <TextInput
            label="Title"
            placeholder="What should we call your Launcher?"
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
