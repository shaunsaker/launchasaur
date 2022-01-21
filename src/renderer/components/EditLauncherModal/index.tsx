import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { showEditLauncherIconModal } from "../../store/editLauncherIconModal/actions";
import {
  deleteLauncherAction,
  setLauncherShortcut,
  setLauncherTitle,
} from "../../store/launchStations/actions";
import { selectLauncher } from "../../store/launchStations/selectors";
import { ApplicationState } from "../../store/reducers";
import { RHYTHM } from "../../theme";
import { ShortcutEditor } from "../ShortcutEditor";
import { MarginContainer } from "../MarginContainer";
import { FieldLabel } from "../FieldLabel";
import { Icon } from "../Icon";
import { Button } from "../Button";
import { TextInput } from "../TextInput";
import { Circle } from "../Circle";
import { showEditLauncherColourModal } from "../../store/editLauncherColourModal/actions";
import { objectToArray } from "../../utils/objectToArray";
import { ActionData } from "../../store/launchStations/models";
import { showLauncherActionsModal } from "../../store/launcherActionsModal/actions";
import { BlankState } from "../BlankState";
import { ErrorPage } from "../ErrorPage";
import { ActionItem } from "./ActionItem";
import { showConfirmationModal } from "../../store/confirmationModal/actions";
import { Modal } from "../Modal";
import {
  selectEditLauncherModalLauncherId,
  selectEditLauncherModalLaunchStationId,
} from "../../store/editLauncherModal/selectors";
import { hideEditLauncherModal } from "../../store/editLauncherModal/actions";
import { OnboardingCoachmark } from "../OnboardingCoachmark";
import { OnboardingCoachmarkKey } from "../../store/onboarding/models";

export const EditLauncherModal = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStationId = useSelector(selectEditLauncherModalLaunchStationId);
  const launcherId = useSelector(selectEditLauncherModalLauncherId);
  const launcher = useSelector((state: ApplicationState) =>
    selectLauncher(state, { launchStationId, launcherId }),
  );
  const actions = objectToArray(launcher.actions);
  const hasActions = actions.length;

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
      dispatch(
        setLauncherShortcut({
          launchStationId,
          launcherId,
          shortcut,
        }),
      );
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

  const onCloseClick = useCallback(() => {
    dispatch(hideEditLauncherModal());
  }, [dispatch]);

  const onDoneClick = useCallback(() => {
    dispatch(hideEditLauncherModal());
  }, [dispatch]);

  if (!launcher) {
    // shouldn't happen but it's better than a crash
    return <ErrorPage />;
  }

  const addActionButton = (
    <AddActionButtonContainer>
      <Button primary shouldPlaySound onClick={onAddActionClick}>
        ADD ACTION
      </Button>
    </AddActionButtonContainer>
  );

  return (
    <Modal
      title={`${launcher.title} Control Panel`}
      borderColor={launcher.colour}
      onClose={onCloseClick}>
      <Container>
        <MarginContainer small>
          <OnboardingCoachmark
            shouldRender={(key) =>
              key === OnboardingCoachmarkKey.EditLauncherName
            }
            placement="left">
            <TextInput
              label="Title"
              placeholder="What should we call your Launcher?"
              value={launcher.title}
              onChangeText={onChangeTitle}
            />
          </OnboardingCoachmark>
        </MarginContainer>

        <MarginContainer small>
          <FieldLabel>Icon</FieldLabel>

          <OnboardingCoachmark
            shouldRender={(key) =>
              key === OnboardingCoachmarkKey.EditLauncherIcon
            }
            placement="left">
            <WithEditButtonContainer>
              <Icon icon={launcher.icon} />

              <EditButtonContainer>
                <Button onClick={onEditIconClick}>EDIT</Button>
              </EditButtonContainer>
            </WithEditButtonContainer>
          </OnboardingCoachmark>
        </MarginContainer>

        <MarginContainer small>
          <FieldLabel>Shortcut</FieldLabel>

          <ShortcutEditor
            shortcut={launcher.shortcut}
            onChange={onChangeShortcut}
          />
        </MarginContainer>

        <MarginContainer small>
          <FieldLabel>Colour</FieldLabel>

          <OnboardingCoachmark
            shouldRender={(key) =>
              key === OnboardingCoachmarkKey.EditLauncherColour
            }
            placement="left">
            <WithEditButtonContainer>
              <Circle colour={launcher.colour} />

              <EditButtonContainer>
                <Button onClick={onEditColourClick}>EDIT</Button>
              </EditButtonContainer>
            </WithEditButtonContainer>
          </OnboardingCoachmark>
        </MarginContainer>

        <OnboardingCoachmark
          shouldRender={(key) =>
            key === OnboardingCoachmarkKey.EditLauncherActions
          }
          placement="left">
          <ActionsSection small>
            <FieldLabel>Actions</FieldLabel>

            {hasActions ? (
              <ActionsContainer>
                {actions.map((action, index) => {
                  const actionItemComponent = (
                    <ActionItem
                      key={action.id}
                      action={action}
                      onDelete={() => onDeleteAction(action)}
                    />
                  );
                  const isLastItem = index === actions.length - 1;

                  if (isLastItem) {
                    return actionItemComponent;
                  }

                  return (
                    <MarginContainer key={action.id} small>
                      {actionItemComponent}
                    </MarginContainer>
                  );
                })}

                {addActionButton}
              </ActionsContainer>
            ) : (
              <BlankState
                icon="rocket"
                title="You have no actions"
                description="Add an action so that you can start launching things!">
                {addActionButton}
              </BlankState>
            )}
          </ActionsSection>
        </OnboardingCoachmark>

        <DoneButtonContainer>
          <OnboardingCoachmark
            shouldRender={(key) =>
              key === OnboardingCoachmarkKey.CloseLauncherControlPanel
            }
            placement="left">
            <Button primary large onClick={onDoneClick}>
              DONE
            </Button>
          </OnboardingCoachmark>
        </DoneButtonContainer>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  overflow: hidden;
`;

const WithEditButtonContainer = styled.div`
  flex-direction: row;
  align-items: center;
`;

const EditButtonContainer = styled.div`
  margin-left: ${RHYTHM / 2}px;
`;

const ActionsSection = styled(MarginContainer)`
  overflow: hidden;
`;

const ActionsContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

const AddActionButtonContainer = styled.div`
  flex-direction: row;
  margin-top: ${RHYTHM}px;
`;

const DoneButtonContainer = styled.div`
  align-items: flex-end;
`;
