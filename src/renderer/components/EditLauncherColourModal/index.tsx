import React, { ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hideEditLauncherColourModal } from "../../store/editLauncherColourModal/actions";
import {
  selectEditLauncherColourModalLaunchStationId,
  selectEditLauncherColourModalLauncherId,
} from "../../store/editLauncherColourModal/selectors";
import { setLauncherColour } from "../../store/launchStations/actions";
import { selectLauncher } from "../../store/launchStations/selectors";
import { ApplicationState } from "../../store/reducers";
import { Modal } from "../Modal";
import { SmallButton } from "../SmallButton";
import { Picker } from "../Picker";
import { Circle } from "../Circle";
import { FieldContainer } from "../FieldContainer";
import { TextInput } from "../TextInput";

const COLOURS = [
  "#1a1333",
  "#262949",
  "#045459",
  "#087353",
  "#15c286",
  "#abd96d",
  "#fbbf54",
  "#ee6b3b",
  "#ec0f47",
  "#a02c5d",
  "#700460",
  "#022c7a",
];

export const EditLauncherColourModal = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStationId = useSelector(
    selectEditLauncherColourModalLaunchStationId,
  );
  const launcherId = useSelector(selectEditLauncherColourModalLauncherId);
  const launcher = useSelector((state: ApplicationState) =>
    selectLauncher(state, { launchStationId, launcherId }),
  );
  const [value, setValue] = useState(launcher.colour);

  const onSelectColour = useCallback(
    (colour: string) => {
      setValue(colour);
    },
    [setValue],
  );

  const onSubmitClick = useCallback(() => {
    dispatch(setLauncherColour({ launchStationId, launcherId, colour: value }));
    dispatch(hideEditLauncherColourModal());
  }, [dispatch, launchStationId, launcherId, value]);

  const onCloseClick = useCallback(() => {
    dispatch(hideEditLauncherColourModal());
  }, [dispatch]);

  const onChangeHexCode = useCallback((text: string) => {
    setValue(text);
  }, []);

  const renderColour = useCallback(
    (colour: string) => <Circle colour={colour} />,
    [],
  );

  return (
    <Modal title="Select an Colour" onClose={onCloseClick}>
      <Picker
        data={COLOURS}
        selected={value}
        rowsToRender={2}
        renderItem={renderColour}
        onSelect={onSelectColour}
      />

      <FieldContainer>
        <TextInput
          label="Enter a HEX code"
          placeholder="Indulge me..."
          value={value}
          onChangeText={onChangeHexCode}
        />
      </FieldContainer>

      <SubmitButtonContainer>
        <SmallButton primary onClick={onSubmitClick}>
          DONE
        </SmallButton>
      </SubmitButtonContainer>
    </Modal>
  );
};

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
