import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { LaunchStationsRouteParams } from ".";
import { showConfirmationModal } from "../../../store/confirmationModal/actions";
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
import { navigateTo } from "../../../store/navigation/actions";
import { Routes } from "../../../store/navigation/models";
import { ApplicationState } from "../../../store/reducers";
import { objectToArray } from "../../../utils/objectToArray";
import { uuid } from "../../../utils/uuid";
import { BlankState } from "../../BlankState";
import { Button } from "../../Button";
import { MarginContainer } from "../../MarginContainer";
import { FieldLabel } from "../../FieldLabel";
import { ListItem } from "../../ListItem";
import { PageContentContainer } from "../../PageContentContainer";
import { PageTitleText } from "../../PageTitleText";
import { TextInput } from "../../TextInput";
import { showEditLauncherModal } from "../../../store/editLauncherModal/actions";

export const LaunchStationEditor = () => {
  const dispatch = useDispatch();
  const { launchStationId } = useParams<LaunchStationsRouteParams>();
  const launchStation = useSelector((state: ApplicationState) =>
    selectLaunchStation(state, launchStationId),
  );
  const launchers = launchStation ? objectToArray(launchStation.launchers) : [];
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
      dispatch(
        showConfirmationModal({
          title: `Are you sure you want to delete the ${launcher.title} Launcher?`,
          actions: [
            deleteLauncher({
              launchStationId: launchStationId,
              launcherId: launcher.id,
            }),
          ],
        }),
      );
    },
    [dispatch, launchStationId],
  );

  const onLauncherEditClick = useCallback(
    (launcher: LauncherData) => {
      dispatch(
        showEditLauncherModal({
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
    dispatch(
      showConfirmationModal({
        title: `Are you sure you want to delete the ${launchStation.title} Launch Station?`,
        actions: [
          deleteLaunchStation({ launchStationId: launchStationId }),
          navigateTo({ to: Routes.settingsLaunchStations }),
        ],
      }),
    );
  }, [dispatch, launchStationId, launchStation]);

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
      <PageTitleText>{launchStation.title} Launch Station</PageTitleText>

      <MarginContainer>
        <TextInput
          label="Title"
          placeholder="Add a Title"
          value={launchStation.title}
          onChangeText={onChangeTitle}
        />
      </MarginContainer>

      <LaunchersContainer>
        <FieldLabel>Launchers</FieldLabel>

        {hasLaunchers ? (
          <>
            {objectToArray(launchStation.launchers).map((launcher) => (
              <MarginContainer key={launcher.id} small>
                <ListItem
                  icon={launcher.icon}
                  colour={launcher.colour}
                  title={launcher.title}
                  onDelete={() => onLauncherDeleteClick(launcher)}
                  onEdit={() => onLauncherEditClick(launcher)}
                />
              </MarginContainer>
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

const LaunchersContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

const AddLauncherButtonContainer = styled.div`
  flex-direction: row;
`;

const DeleteButtonContainer = styled.div`
  flex-direction: row;
  justify-content: flex-end;
`;
