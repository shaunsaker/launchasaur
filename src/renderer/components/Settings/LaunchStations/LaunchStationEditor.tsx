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
  sortLaunchers,
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
import { BlankState } from "../../BlankState";
import { Button } from "../../Button";
import { MarginContainer } from "../../MarginContainer";
import { FieldLabel } from "../../FieldLabel";
import { ListItem } from "../../ListItem";
import { PageContentContainer } from "../../PageContentContainer";
import { TitleText } from "../../TitleText";
import { TextInput } from "../../TextInput";
import { showEditLauncherModal } from "../../../store/editLauncherModal/actions";
import { RHYTHM } from "../../../theme";
import { OnboardingCoachmark } from "../../OnboardingCoachmark";
import { OnboardingCoachmarkKey } from "../../../store/onboarding/models";
import { DraggableList } from "../../DraggableList";
import { sortArrayOfObjectsByKey } from "../../../utils/sortArrayOfObjectsByKey";

export const LaunchStationEditor = () => {
  const dispatch = useDispatch();
  const { launchStationId } = useParams<LaunchStationsRouteParams>();
  const launchStation = useSelector((state: ApplicationState) =>
    selectLaunchStation(state, launchStationId),
  );
  const launchers = launchStation
    ? sortArrayOfObjectsByKey(objectToArray(launchStation.launchers), "order")
    : [];
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
    dispatch(addLauncher({ launchStationId: launchStationId }));
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

  const onDragEnd = useCallback(
    (sourceIndex: number, destinationIndex: number) => {
      dispatch(
        sortLaunchers({ launchStationId, sourceIndex, destinationIndex }),
      );
    },
    [dispatch, launchStationId],
  );

  const renderLauncher = useCallback(
    (launcher: LauncherData, isDragging: boolean) => {
      return (
        <MarginContainer small>
          <ListItem
            icon={launcher.icon}
            colour={launcher.colour}
            title={launcher.title}
            highlight={isDragging}
            onDelete={() => onLauncherDeleteClick(launcher)}
            onEdit={() => onLauncherEditClick(launcher)}
          />
        </MarginContainer>
      );
    },
    [onLauncherDeleteClick, onLauncherEditClick],
  );

  if (!launchStation) {
    // can happen when we delete a launch station
    return null;
  }

  return (
    <PageContentContainer>
      <MarginContainer>
        <TitleText>{launchStation.title} Launch Station</TitleText>
      </MarginContainer>

      <MarginContainer>
        <TextInput
          label="Title"
          placeholder="Add a Title"
          value={launchStation.title}
          onChangeText={onChangeTitle}
        />
      </MarginContainer>

      <LaunchersSectionContainer>
        <FieldLabel>Launchers</FieldLabel>

        {hasLaunchers ? (
          <>
            <OnboardingCoachmark
              shouldRender={(key) =>
                key === OnboardingCoachmarkKey.OpenLauncherControlPanel
              }
              placement="right">
              <DraggableList
                items={launchers}
                renderItem={renderLauncher}
                onDragEnd={onDragEnd}
              />
            </OnboardingCoachmark>

            <AddLauncherButtonContainer>
              <Button primary large onClick={onAddLauncherClick}>
                ADD LAUNCHER
              </Button>
            </AddLauncherButtonContainer>
          </>
        ) : (
          <BlankState
            icon="rocket"
            title="You have no Launchers"
            description="Add a Launcher so that you can start launching things!">
            <BlankStateAddLauncherButtonContainer>
              <Button primary large onClick={onAddLauncherClick}>
                ADD LAUNCHER
              </Button>
            </BlankStateAddLauncherButtonContainer>
          </BlankState>
        )}
      </LaunchersSectionContainer>

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

const LaunchersSectionContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

const AddLauncherButtonContainer = styled.div`
  flex-direction: row;
`;

const BlankStateAddLauncherButtonContainer = styled.div`
  margin-top: ${RHYTHM}px;
`;

const DeleteButtonContainer = styled.div`
  flex-direction: row;
  justify-content: flex-end;
`;
