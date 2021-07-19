import React, { ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hideEditLinkModal } from "../../store/editLinkModal/actions";
import {
  selectEditLinkModalLaunchStationId,
  selectEditLinkModalLauncherId,
} from "../../store/editLinkModal/selectors";
import { hideLauncherActionsModal } from "../../store/launcherActionsModal/actions";
import { addLauncherAction } from "../../store/launchStations/actions";
import { makeActionData } from "../../store/launchStations/data";
import { LaunchStationAction } from "../../store/launchStations/models";
import { uuid } from "../../utils/uuid";
import { validateUrl } from "../../utils/validateUrl";
import { Button } from "../Button";
import { HighlightContent } from "../HighlightContent";
import { MarginContainer } from "../MarginContainer";
import { Modal } from "../Modal";
import { TextInput } from "../TextInput";

export const EditLinkModal = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStationId = useSelector(selectEditLinkModalLaunchStationId);
  const launcherId = useSelector(selectEditLinkModalLauncherId);
  const [value, setValue] = useState("");
  const isValid = validateUrl(value);

  const onChangeLink = useCallback(
    (text: string) => {
      setValue(text);
    },
    [setValue],
  );

  const onSubmitClick = useCallback(() => {
    const actionData = makeActionData({
      id: uuid(),
      action: LaunchStationAction.OpenLink,
      resource: value,
    });

    dispatch(
      addLauncherAction.success({ launchStationId, launcherId, actionData }),
    );
    dispatch(hideEditLinkModal());
    dispatch(hideLauncherActionsModal());
  }, [dispatch, value, launchStationId, launcherId]);

  const onCloseClick = useCallback(() => {
    dispatch(hideEditLinkModal());
  }, [dispatch]);

  return (
    <Modal title="Open a Link" onClose={onCloseClick}>
      <MarginContainer small>
        <HighlightContent>
          <TextInput
            label="Link"
            placeholder="Where should we browse to?"
            value={value}
            onChangeText={onChangeLink}
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
