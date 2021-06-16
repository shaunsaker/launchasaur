import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { LaunchStationsRouteParams } from ".";
import {
  addLauncher,
  deleteLauncher,
  deleteLaunchStation,
  setLaunchStationTitle,
} from "../../../store/launchStations/actions";
import {
  DEFAULT_LAUNCH_STATION_ID,
  LauncherData,
} from "../../../store/launchStations/models";
import { selectLaunchStation } from "../../../store/launchStations/selectors";
import {
  navigateTo,
  navigateToSettingsLauncher,
  navigateToSettingsLaunchStation,
} from "../../../store/navigation/actions";
import { Routes } from "../../../store/navigation/models";
import { ApplicationState } from "../../../store/reducers";
import { RHYTHM } from "../../../theme";
import { objectToArray } from "../../../utils/objectToArray";
import { uuid } from "../../../utils/uuid";
import { BlankState } from "../../BlankState";
import { Button } from "../../Button";
import { FieldContainer } from "../../FieldContainer";
import { FieldLabel } from "../../FieldLabel";
import { ListItem } from "../../ListItem";
import { PageContentContainer } from "../../PageContentContainer";
import { PageTitleText } from "../../PageTitleText";
import { SIDE_MENU_OPTION_MARGIN } from "../../SideMenu/SideMenuOption";
import { TextInput } from "../../TextInput";

export const LaunchStationEditor = () => {
  const dispatch = useDispatch();
  const { launchStationId } = useParams<LaunchStationsRouteParams>();
  const launchStation = useSelector((state: ApplicationState) =>
    selectLaunchStation(state, launchStationId),
  );
  const launchers = objectToArray(launchStation.launchers);
  const hasLaunchers = launchers.length;
  const showDeleteLaunchStationButton =
    launchStationId !== DEFAULT_LAUNCH_STATION_ID;

  const onChangeTitle = useCallback(
    (text: string) => {
      dispatch(
        setLaunchStationTitle({
          launchStationId: launchStationId,
          title: text,
        }),
      );
    },
    [dispatch, launchStationId],
  );

  const onLauncherDeleteClick = useCallback(
    (launcher: LauncherData) => {
      // TODO: we should show a confirmation modal
      dispatch(
        deleteLauncher({
          launchStationId: launchStationId,
          launcherId: launcher.id,
        }),
      );
    },
    [dispatch, launchStationId],
  );

  const onLauncherEditClick = useCallback(
    (launcher: LauncherData) => {
      dispatch(
        navigateToSettingsLauncher({
          launchStationId: launchStationId,
          launcherId: launcher.id,
        }),
      );
    },
    [dispatch, launchStationId],
  );

  const onAddLauncherClick = useCallback(() => {
    dispatch(
      addLauncher({ launchStationId: launchStationId, launcherId: uuid() }),
    );
  }, [dispatch, launchStationId]);

  const onDeleteLaunchStationClick = useCallback(() => {
    dispatch(deleteLaunchStation({ launchStationId: launchStationId }));

    dispatch(navigateTo({ to: Routes.settingsLaunchStations }));
  }, [dispatch, launchStationId]);

  if (!launchStation) {
    // can happen when we delete a launch station
    return null;
  }

  const addLauncherButton = (
    <AddLauncherButtonContainer>
      <Button primary onClick={onAddLauncherClick}>
        ADD LAUNCHER
      </Button>
    </AddLauncherButtonContainer>
  );

  return (
    <PageContentContainer>
      <StyledPageTitleText>
        {launchStation.title} Launch Station
      </StyledPageTitleText>

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

        {hasLaunchers ? (
          <>
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

            {addLauncherButton}
          </>
        ) : (
          <BlankState
            icon="rocket"
            title="You have no Launchers"
            description="Add a Launcher so that you can start launching things!">
            {addLauncherButton}
          </BlankState>
        )}
      </LaunchersContainer>

      {showDeleteLaunchStationButton && (
        <DeleteButtonContainer>
          <Button danger large onClick={onDeleteLaunchStationClick}>
            DELETE LAUNCH STATION
          </Button>
        </DeleteButtonContainer>
      )}
    </PageContentContainer>
  );
};

const StyledPageTitleText = styled(PageTitleText)`
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
  margin-top: ${RHYTHM}px;
`;

const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
