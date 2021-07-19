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
import { Button } from "../Button";
import { Picker } from "../Picker";
import { Circle } from "../Circle";
import { MarginContainer } from "../MarginContainer";
import { TextInput } from "../TextInput";
import { colours } from "./colours";
import { HighlightContent } from "../HighlightContent";

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
      <MarginContainer small>
        <HighlightContent>
          <TextInput
            label="Enter a HEX code"
            placeholder="Indulge me..."
            value={value}
            onChangeText={onChangeHexCode}
          />
        </HighlightContent>
      </MarginContainer>

      <Picker
        data={colours}
        selected={value}
        rowsToRender={4}
        renderItem={renderColour}
        onSelect={onSelectColour}
      />

      <SubmitButtonContainer>
        <Button primary large onClick={onSubmitClick}>
          DONE
        </Button>
      </SubmitButtonContainer>
    </Modal>
  );
};

const SubmitButtonContainer = styled.div`
  flex-direction: row;
  justify-content: flex-end;
`;
