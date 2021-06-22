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
import { MarginContainer } from "../MarginContainer";
import { TextInput } from "../TextInput";
import { getIconList } from "../../icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICON_SIZE, RHYTHM, TEXT_ELLIPSIS_CSS, theme } from "../../theme";
import { PICKER_ITEM_CONTAINER_SIZE } from "../Picker/ItemContainer";
import { HighlightContent } from "../HighlightContent";

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
      setFilter(icon);
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
    (icon: IconName) => (
      <IconContainer>
        <StyledIcon icon={icon} />

        <IconText>{icon}</IconText>
      </IconContainer>
    ),
    [],
  );

  return (
    <Modal title="Select an Icon" onClose={onCloseClick}>
      <MarginContainer small>
        <HighlightContent>
          <TextInput
            label="Search for an Icon"
            placeholder="Filter by name..."
            value={filter}
            onChangeText={onChangeFilter}
          />
        </HighlightContent>
      </MarginContainer>

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

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: ${ICON_SIZE}px;
  color: ${theme.white};
  margin-bottom: ${RHYTHM / 2}px;
`;

const IconText = styled.div`
  font-size: 11px;
  color: ${theme.white};
  ${TEXT_ELLIPSIS_CSS};
  width: ${PICKER_ITEM_CONTAINER_SIZE - RHYTHM}px;
  text-align: center;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
