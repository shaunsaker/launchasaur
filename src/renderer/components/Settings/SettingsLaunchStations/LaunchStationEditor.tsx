import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { showEditLauncherModal } from "../../../store/editLauncherModal/actions";
import {
  addLauncher,
  deleteLauncher,
  deleteLaunchStation,
  setLaunchStationTitle,
} from "../../../store/launchStations/actions";
import {
  DEFAULT_LAUNCH_STATION_ID,
  LauncherData,
  LaunchStationData,
} from "../../../store/launchStations/models";
import { RHYTHM, theme } from "../../../theme";
import { objectToArray } from "../../../utils/objectToArray";
import { uuid } from "../../../utils/uuid";
import { Button } from "../../Button";
import { FieldLabel } from "../../FieldLabel";
import { SIDE_MENU_OPTION_MARGIN } from "../../SideMenu/SideMenuOption";
import { TextInput } from "../../TextInput";
import { LauncherItem } from "./LauncherItem";

interface LaunchStationEditorProps {
  launchStation: LaunchStationData;
}

export const LaunchStationEditor = ({
  launchStation,
}: LaunchStationEditorProps) => {
  const dispatch = useDispatch();
  const showDeleteLaunchStationButton =
    launchStation.id !== DEFAULT_LAUNCH_STATION_ID;

  const onChangeTitle = useCallback(
    (text: string) => {
      dispatch(
        setLaunchStationTitle({
          launchStationId: launchStation.id,
          title: text,
        }),
      );
    },
    [dispatch, launchStation.id],
  );

  const onLauncherDeleteClick = useCallback(
    (launcher: LauncherData) => {
      // TODO: we should show a confirmation modal
      dispatch(
        deleteLauncher({
          launchStationId: launchStation.id,
          launcherId: launcher.id,
        }),
      );
    },
    [dispatch, launchStation.id],
  );

  const onLauncherEditClick = useCallback(
    (launcher: LauncherData) => {
      dispatch(
        showEditLauncherModal({
          launchStationId: launchStation.id,
          launcherId: launcher.id,
        }),
      );
    },
    [dispatch, launchStation.id],
  );

  const onAddLauncherClick = useCallback(() => {
    dispatch(
      addLauncher({ launchStationId: launchStation.id, launcherId: uuid() }),
    );
  }, [dispatch, launchStation.id]);

  const onDeleteLaunchStationClick = useCallback(() => {
    dispatch(deleteLaunchStation({ launchStationId: launchStation.id }));
    // TODO: select the default launch station, otherwise nothing is selected
  }, [dispatch, launchStation.id]);

  return (
    <LaunchStationEditorContainer>
      <TitleText>{launchStation.title} Launch Station</TitleText>

      <TitleInputContainer>
        <TextInput
          label="Title"
          placeholder="Add a Title"
          value={launchStation.title}
          onChangeText={onChangeTitle}
        />
      </TitleInputContainer>

      <LaunchersContainer>
        <FieldLabel>Launchers</FieldLabel>

        {objectToArray(launchStation.launchers).map((launcher) => (
          <LaunchItemContainer key={launcher.id}>
            <LauncherItem
              icon={launcher.icon}
              colour={launcher.colour}
              title={launcher.title}
              onDelete={() => onLauncherDeleteClick(launcher)}
              onEdit={() => onLauncherEditClick(launcher)}
            />
          </LaunchItemContainer>
        ))}

        <AddLauncherButtonContainer>
          <Button primary large onClick={onAddLauncherClick}>
            ADD LAUNCHER
          </Button>
        </AddLauncherButtonContainer>
      </LaunchersContainer>

      {showDeleteLaunchStationButton && (
        <DeleteButtonContainer>
          <Button danger large onClick={onDeleteLaunchStationClick}>
            DELETE LAUNCH STATION
          </Button>
        </DeleteButtonContainer>
      )}
    </LaunchStationEditorContainer>
  );
};

const LaunchStationEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${RHYTHM}px;
  background-color: ${theme.white5};
`;

const TitleText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.white};
  margin-top: ${SIDE_MENU_OPTION_MARGIN}px;
  margin-bottom: ${RHYTHM * 2}px;
`;

const TitleInputContainer = styled.div`
  margin-bottom: ${RHYTHM * 2}px;
`;

const LaunchersContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

const LaunchItemContainer = styled.div`
  margin-bottom: ${RHYTHM}px;
`;

const AddLauncherButtonContainer = styled.div`
  display: flex;
`;

const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
