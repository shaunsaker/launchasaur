import { all, call, fork, put, takeLatest } from "@redux-saga/core/effects";
import { OpenDialogReturnValue } from "electron";
import { SagaIterator } from "redux-saga";
import { ActionType, getType } from "typesafe-actions";
import { objectToArray } from "../../utils/objectToArray";
import { select } from "../../utils/select";
import { showEditLinkModal } from "../editLinkModal/actions";
import {
  closeFileSaga,
  getFilepathSaga,
  hideWindowSaga,
  openFileSaga,
  openLinkSaga,
} from "../ipc/flow";
import { hideLauncherActionsModal } from "../launcherActionsModal/actions";
import { addLauncherAction, triggerLauncher } from "./actions";
import { makeActionData } from "./data";
import { LaunchStationAction } from "./models";
import { navigateToLaunchStation } from "../navigation/actions";
import { ApplicationState } from "../reducers";
import { showSelectLaunchStationModal } from "../selectLaunchStationModal/actions";
import { selectLauncher } from "./selectors";

function* handleAddOpenOrCloseFileActionSaga(
  action: ActionType<typeof addLauncherAction.request>,
): SagaIterator {
  const response: OpenDialogReturnValue = yield call(getFilepathSaga);

  if (response) {
    // if the file system dialog was closed, do nothing
    if (response.canceled) {
      return;
    }

    const filepath = response.filePaths[0]; // we only allow a single selection

    // create the launcher action and add it to the launcher
    const actionData = makeActionData({
      action: action.payload.action,
      resource: filepath,
    });
    yield put(
      addLauncherAction.success({
        launchStationId: action.payload.launchStationId,
        launcherId: action.payload.launcherId,
        actionData,
      }),
    );

    // close the modal
    yield put(hideLauncherActionsModal());
  } else {
    // failure
    yield put(addLauncherAction.failure());
    // TODO: Should we fail silently?
  }
}

function* handleAddOpenLinkActionSaga(
  action: ActionType<typeof addLauncherAction.request>,
): SagaIterator {
  yield put(
    showEditLinkModal({
      launchStationId: action.payload.launchStationId,
      launcherId: action.payload.launcherId,
      actionId: "", // it's a new action
    }),
  );
}

function* handleAddOpenLaunchStationActionSaga(
  action: ActionType<typeof addLauncherAction.request>,
): SagaIterator {
  yield put(
    showSelectLaunchStationModal({
      launchStationId: action.payload.launchStationId,
      launcherId: action.payload.launcherId,
      actionId: "", // it's a new action
    }),
  );
}

function* addLaunchStationActionSaga(): SagaIterator {
  yield takeLatest(
    getType(addLauncherAction.request),
    function* (
      action: ActionType<typeof addLauncherAction.request>,
    ): SagaIterator {
      const { action: launcherAction } = action.payload;

      switch (launcherAction) {
        case LaunchStationAction.OpenFile:
          yield call(handleAddOpenOrCloseFileActionSaga, action);
          break;
        case LaunchStationAction.CloseFile:
          yield call(handleAddOpenOrCloseFileActionSaga, action);
          break;
        case LaunchStationAction.OpenLink:
          yield call(handleAddOpenLinkActionSaga, action);
          break;
        case LaunchStationAction.OpenLaunchStation:
          yield call(handleAddOpenLaunchStationActionSaga, action);
          break;
      }
    },
  );
}

function* triggerLauncherSaga(): SagaIterator {
  yield takeLatest(
    getType(triggerLauncher.request),
    function* (
      action: ActionType<typeof triggerLauncher.request>,
    ): SagaIterator {
      const { launchStationId, launcherId } = action.payload;
      const { actions } = yield* select((state: ApplicationState) =>
        selectLauncher(state, { launchStationId, launcherId }),
      );
      const arrayActions = objectToArray(actions);

      // trigger the actions as appropriate
      const actionsArray = arrayActions.map((action) => {
        if (action.action === LaunchStationAction.OpenFile) {
          return call(openFileSaga, action.resource);
        }

        if (action.action === LaunchStationAction.CloseFile) {
          return call(closeFileSaga, action.resource);
        }

        if (action.action === LaunchStationAction.OpenLink) {
          return call(openLinkSaga, action.resource);
        }

        if (action.action === LaunchStationAction.OpenLaunchStation) {
          return put(
            navigateToLaunchStation({ launchStationId: action.resource }),
          );
        }
      });

      yield all(actionsArray);

      yield put(triggerLauncher.success());

      const isOpeningLaunchStation = arrayActions.some(
        (action) => action.action === LaunchStationAction.OpenLaunchStation,
      );
      const hasActions = arrayActions.length;
      if (!isOpeningLaunchStation && hasActions) {
        yield call(hideWindowSaga);
      }
    },
  );
}

export function* launchStationsSagas(): SagaIterator {
  yield fork(addLaunchStationActionSaga);
  yield fork(triggerLauncherSaga);
}
