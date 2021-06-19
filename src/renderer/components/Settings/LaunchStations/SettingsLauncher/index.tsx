import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { showEditLauncherIconModal } from "../../../../store/editLauncherIconModal/actions";
import {
  deleteLauncherAction,
  setLauncherShortcut,
  setLauncherTitle,
} from "../../../../store/launchStations/actions";
import { selectLauncher } from "../../../../store/launchStations/selectors";
import { ApplicationState } from "../../../../store/reducers";
import { CONTENT_CONTAINER_WIDTH, RHYTHM } from "../../../../theme";
import { ShortcutEditor } from "../../../ShortcutEditor";
import { MarginContainer } from "../../../MarginContainer";
import { FieldLabel } from "../../../FieldLabel";
import { Icon } from "../../../Icon";
import { Button } from "../../../Button";
import { TextInput } from "../../../TextInput";
import { Circle } from "../../../Circle";
import { showEditLauncherColourModal } from "../../../../store/editLauncherColourModal/actions";
import { Page } from "../../../Page";
import { useParams } from "react-router-dom";
import { navigateBack } from "../../../../store/navigation/actions";
import { PageTitleText } from "../../../PageTitleText";
import { PageContentContainer } from "../../../PageContentContainer";
import { objectToArray } from "../../../../utils/objectToArray";
import { ActionData } from "../../../../store/launchStations/models";
import { showLauncherActionsModal } from "../../../../store/launcherActionsModal/actions";
import { BlankState } from "../../../BlankState";
import { ErrorPage } from "../../../ErrorPage";
import { ActionItem } from "./ActionItem";
import { showConfirmationModal } from "../../../../store/confirmationModal/actions";

interface SettingsLauncherRouteParams {
  launchStationId: string | undefined;
  launcherId: string | undefined;
}

export const SettingsLauncher = (): ReactElement => {
  const dispatch = useDispatch();
  const { launchStationId, launcherId } =
    useParams<SettingsLauncherRouteParams>();
  const launcher = useSelector((state: ApplicationState) =>
    selectLauncher(state, { launchStationId, launcherId }),
  );
  const actions = objectToArray(launcher.actions);
  const hasActions = actions.length;

  const onDoneClick = useCallback(() => {
    dispatch(navigateBack());
  }, [dispatch]);

  const onEditIconClick = useCallback(() => {
    dispatch(showEditLauncherIconModal({ launchStationId, launcherId }));
  }, [dispatch, launchStationId, launcherId]);

  const onChangeTitle = useCallback(
    (text: string) => {
      dispatch(setLauncherTitle({ launchStationId, launcherId, title: text }));
    },
    [dispatch, launchStationId, launcherId],
  );

  const onChangeShortcut = useCallback(
    (shortcut: string) => {
      dispatch(setLauncherShortcut({ launchStationId, launcherId, shortcut }));
    },
    [dispatch, launchStationId, launcherId],
  );

  const onEditColourClick = useCallback(() => {
    dispatch(showEditLauncherColourModal({ launchStationId, launcherId }));
  }, [dispatch, launchStationId, launcherId]);

  const onAddActionClick = useCallback(() => {
    dispatch(showLauncherActionsModal({ launchStationId, launcherId }));
  }, [dispatch, launchStationId, launcherId]);

  const onDeleteAction = useCallback(
    (action: ActionData) => {
      dispatch(
        showConfirmationModal({
          title: "Are you sure you want to delete this action?",
          actions: [
            deleteLauncherAction({
              launchStationId,
              launcherId,
              actionId: action.id,
            }),
          ],
        }),
      );
    },
    [dispatch, launchStationId, launcherId],
  );

  if (!launcher) {
    // shouldn't happen but it's better than a crash
    return <ErrorPage />;
  }

  const addActionButton = (
    <AddActionButtonContainer>
      <Button primary onClick={onAddActionClick}>
        ADD ACTION
      </Button>
    </AddActionButtonContainer>
  );

  return (
    <Page showClose goBack>
      <Container>
        <PageTitleText>{launcher.title} Launcher</PageTitleText>

        <MarginContainer>
          <FieldLabel>Icon</FieldLabel>

          <WithEditButtonContainer>
            <Icon icon={launcher.icon} />

            <EditButtonContainer>
              <Button onClick={onEditIconClick}>EDIT</Button>
            </EditButtonContainer>
          </WithEditButtonContainer>
        </MarginContainer>

        <MarginContainer>
          <TextInput
            label="Title"
            placeholder="What should we call your Launcher?"
            value={launcher.title}
            onChangeText={onChangeTitle}
          />
        </MarginContainer>

        <MarginContainer>
          <FieldLabel>Shortcut</FieldLabel>

          <ShortcutEditor
            shortcut={launcher.shortcut}
            onChange={onChangeShortcut}
          />
        </MarginContainer>

        <MarginContainer>
          <FieldLabel>Colour</FieldLabel>

          <WithEditButtonContainer>
            <Circle colour={launcher.colour} />

            <EditButtonContainer>
              <Button onClick={onEditColourClick}>EDIT</Button>
            </EditButtonContainer>
          </WithEditButtonContainer>
        </MarginContainer>

        <ActionsContainer>
          <MarginContainer>
            <FieldLabel>Actions</FieldLabel>

            {hasActions ? (
              <>
                {actions.map((action) => {
                  return (
                    <MarginContainer key={action.id} small>
                      <ActionItem
                        action={action}
                        onDelete={() => onDeleteAction(action)}
                      />
                    </MarginContainer>
                  );
                })}

                {addActionButton}
              </>
            ) : (
              <BlankState
                icon="rocket"
                title="You have no actions"
                description="Add an action so that you can start launching things!">
                {addActionButton}
              </BlankState>
            )}
          </MarginContainer>
        </ActionsContainer>

        <DoneButtonContainer>
          <Button primary large onClick={onDoneClick}>
            DONE
          </Button>
        </DoneButtonContainer>
      </Container>
    </Page>
  );
};

const Container = styled(PageContentContainer)`
  width: ${CONTENT_CONTAINER_WIDTH}px;
  align-self: center;
`;

const WithEditButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const EditButtonContainer = styled.div`
  margin-left: ${RHYTHM}px;
`;

const ActionsContainer = styled.div`
  flex: 1;
`;

const AddActionButtonContainer = styled.div`
  display: flex;
  margin-top: ${RHYTHM}px;
`;

const DoneButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
