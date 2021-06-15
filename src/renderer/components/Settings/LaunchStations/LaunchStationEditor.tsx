import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
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
import { navigateToSettingsLauncher } from "../../../store/navigation/actions";
import { RHYTHM } from "../../../theme";
import { objectToArray } from "../../../utils/objectToArray";
import { uuid } from "../../../utils/uuid";
import { Button } from "../../Button";
import { FieldContainer } from "../../FieldContainer";
import { FieldLabel } from "../../FieldLabel";
import { ListItem } from "../../ListItem";
import { PageContentContainer } from "../../PageContentContainer";
import { PageTitleText } from "../../PageTitleText";
import { SIDE_MENU_OPTION_MARGIN } from "../../SideMenu/SideMenuOption";
import { TextInput } from "../../TextInput";

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
        navigateToSettingsLauncher({
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
    <Container>
      <TitleText>{launchStation.title} Launch Station</TitleText>

      <FieldContainer>
        <TextInput
          label="Title"
          placeholder="Add a Title"
          value={launchStation.title}
          onChangeText={onChangeTitle}
        />
      </FieldContainer>

      <LaunchersContainer>
        <FieldLabel>Launchers</FieldLabel>

        {objectToArray(launchStation.launchers).map((launcher) => (
          <LaunchItemContainer key={launcher.id}>
            <ListItem
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
    </Container>
  );
};

const Container = styled(PageContentContainer)``;

const TitleText = styled(PageTitleText)`
  margin-top: ${SIDE_MENU_OPTION_MARGIN}px;
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
