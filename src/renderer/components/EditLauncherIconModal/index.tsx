import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import React, { ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hideEditLauncherIconModal } from "../../store/editLauncherIconModal/actions";
import {
  selectEditLauncherIconModalLaunchStationId,
  selectEditLauncherIconModalLauncherId,
} from "../../store/editLauncherIconModal/selectors";
import { setLauncherIcon } from "../../store/launchStations/actions";
import { selectLauncher } from "../../store/launchStations/selectors";
import { ApplicationState } from "../../store/reducers";
import { Modal } from "../Modal";
import { SmallButton } from "../SmallButton";
import { IconPicker } from "./IconPicker";

export const EditLauncherIconModal = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStationId = useSelector(
    selectEditLauncherIconModalLaunchStationId,
  );
  const launcherId = useSelector(selectEditLauncherIconModalLauncherId);
  const launcher = useSelector((state: ApplicationState) =>
    selectLauncher(state, { launchStationId, launcherId }),
  );
  const [value, setValue] = useState(launcher.icon);

  const onSelectIcon = useCallback(
    (icon: IconName) => {
      setValue(icon);
    },
    [setValue],
  );

  const onSubmitClick = useCallback(() => {
    dispatch(setLauncherIcon({ launchStationId, launcherId, icon: value }));
    dispatch(hideEditLauncherIconModal());
  }, [dispatch, launchStationId, launcherId, value]);

  const onCloseClick = useCallback(() => {
    dispatch(hideEditLauncherIconModal());
  }, [dispatch]);

  return (
    <Modal title="Select an Icon" onClose={onCloseClick}>
      <IconPicker selected={value} onSelect={onSelectIcon} />

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
