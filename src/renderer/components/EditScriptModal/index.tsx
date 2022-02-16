import React, { ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hideEditScriptModal } from "../../store/editScriptModal/actions";
import {
  selectEditScriptModalLaunchStationId,
  selectEditScriptModalLauncherId,
} from "../../store/editScriptModal/selectors";
import { hideLauncherActionsModal } from "../../store/launcherActionsModal/actions";
import { addLauncherAction } from "../../store/launchStations/actions";
import { makeActionData } from "../../store/launchStations/data";
import { LauncherAction } from "../../store/launchStations/models";
import { uuid } from "../../utils/uuid";
import { Button } from "../Button";
import { HighlightContent } from "../HighlightContent";
import { MarginContainer } from "../MarginContainer";
import { Modal } from "../Modal";
import { TextArea } from "../TextArea";

export const EditScriptModal = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStationId = useSelector(selectEditScriptModalLaunchStationId);
  const launcherId = useSelector(selectEditScriptModalLauncherId);
  const [value, setValue] = useState("");
  const isValid = true;

  const onChangeScript = useCallback(
    (text: string) => {
      setValue(text);
    },
    [setValue],
  );

  const onSubmitClick = useCallback(() => {
    const actionData = makeActionData({
      id: uuid(),
      action: LauncherAction.RunScript,
      resource: value,
    });

    dispatch(
      addLauncherAction.success({ launchStationId, launcherId, actionData }),
    );
    dispatch(hideEditScriptModal());
    dispatch(hideLauncherActionsModal());
  }, [dispatch, value, launchStationId, launcherId]);

  const onCloseClick = useCallback(() => {
    dispatch(hideEditScriptModal());
  }, [dispatch]);

  return (
    <Modal title="Run a Script" onClose={onCloseClick}>
      <MarginContainer small>
        <HighlightContent>
          <TextArea
            label="Script"
            placeholder="What script would you like to run?"
            value={value}
            onChangeText={onChangeScript}
          />
        </HighlightContent>
      </MarginContainer>

      <ButtonContainer>
        <Button primary large disabled={!isValid} onClick={onSubmitClick}>
          DONE
        </Button>
      </ButtonContainer>
    </Modal>
  );
};

const ButtonContainer = styled.div`
  flex-direction: row;
  justify-content: flex-end;
`;
