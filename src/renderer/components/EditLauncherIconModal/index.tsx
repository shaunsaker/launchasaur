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
import { Button } from "../Button";
import { Picker } from "../Picker";
import { FieldContainer } from "../FieldContainer";
import { TextInput } from "../TextInput";
import { getIconList } from "../../icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICON_SIZE, theme } from "../../theme";

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
  const [iconList] = useState(getIconList());
  const [filter, setFilter] = useState("");
  const filteredIcons = iconList.filter((icon) =>
    icon.includes(filter.toLowerCase()),
  );

  const onChangeFilter = useCallback(
    (value: string) => {
      setFilter(value);
    },
    [setFilter],
  );

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

  const renderIcon = useCallback(
    (icon: IconName) => <StyledIcon icon={icon} />,
    [],
  );

  return (
    <Modal title="Select an Icon" onClose={onCloseClick}>
      <FieldContainer>
        <TextInput
          label="Search for an Icon"
          placeholder="Filter by name..."
          value={filter}
          onChangeText={onChangeFilter}
        />
      </FieldContainer>

      <Picker
        data={filteredIcons}
        selected={value}
        rowsToRender={4}
        renderItem={renderIcon}
        onSelect={onSelectIcon}
      />

      <SubmitButtonContainer>
        <Button primary large onClick={onSubmitClick}>
          DONE
        </Button>
      </SubmitButtonContainer>
    </Modal>
  );
};

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: ${ICON_SIZE}px;
  color: ${theme.white};
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
