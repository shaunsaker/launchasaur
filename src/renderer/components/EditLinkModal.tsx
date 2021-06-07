import React, { FormEvent, ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEditLinkModal } from "../store/editLinkModal/actions";
import {
  selectEditLinkModalLaunchStationId,
  selectEditLinkModalLauncherId,
} from "../store/editLinkModal/selectors";
import { hideLauncherActionsModal } from "../store/launcherActionsModal/actions";
import { addLauncherAction } from "../store/launchStations/actions";
import { makeActionData } from "../store/launchStations/data";
import { LaunchStationAction } from "../store/launchStations/models";
import { uuid } from "../utils/uuid";
import { validateUrl } from "../utils/validateUrl";

export const EditLinkModal = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStationId = useSelector(selectEditLinkModalLaunchStationId);
  const launcherId = useSelector(selectEditLinkModalLauncherId);
  const [value, setValue] = useState("");
  const isValid = validateUrl(value);

  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
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
    <div>
      <input value={value} onChange={onChange} />

      <button onClick={onSubmitClick} disabled={!isValid}>
        Submit
      </button>

      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};
