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
} from "../ipc/flow";
import { hideLauncherActionsModal } from "../launcherActionsModal/actions";
import { addLauncherAction, triggerLauncher } from "./actions";
import { makeActionData } from "./data";
import { LauncherId, LauncherAction } from "./models";
import { navigateToLaunchStation } from "../navigation/actions";
import { ApplicationState } from "../reducers";
import { showSelectLaunchStationModal } from "../selectLaunchStationModal/actions";
import { selectLauncherById } from "./selectors";
import { showSelectLauncherModal } from "../selectLauncherModal/actions";
import { openLink } from "../ipc/actions";

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
    // FIXME: Should we fail silently?
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

function* handleAddTriggerLauncherActionSaga(
  action: ActionType<typeof addLauncherAction.request>,
): SagaIterator {
  yield put(
    showSelectLauncherModal({
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
        case LauncherAction.OpenFile:
          yield call(handleAddOpenOrCloseFileActionSaga, action);
          break;
        case LauncherAction.CloseFile:
          yield call(handleAddOpenOrCloseFileActionSaga, action);
          break;
        case LauncherAction.OpenLink:
          yield call(handleAddOpenLinkActionSaga, action);
          break;
        case LauncherAction.OpenLaunchStation:
          yield call(handleAddOpenLaunchStationActionSaga, action);
          break;
        case LauncherAction.TriggerLauncher:
          yield call(handleAddTriggerLauncherActionSaga, action);
          break;
      }
    },
  );
}

function* triggerLauncherSaga(launcherId: LauncherId): SagaIterator {
  const launcher = yield* select((state: ApplicationState) =>
    selectLauncherById(state, launcherId),
  );
  const arrayActions = objectToArray(launcher.actions);

  // trigger the actions as appropriate
  const actionsArray = arrayActions.map((action) => {
    if (action.action === LauncherAction.OpenFile) {
      return call(openFileSaga, action.resource);
    }

    if (action.action === LauncherAction.CloseFile) {
      return call(closeFileSaga, action.resource);
    }

    if (action.action === LauncherAction.OpenLink) {
      return put(openLink.request({ url: action.resource }));
    }

    if (action.action === LauncherAction.OpenLaunchStation) {
      return put(navigateToLaunchStation({ launchStationId: action.resource }));
    }

    if (action.action === LauncherAction.TriggerLauncher) {
      return call(triggerLauncherSaga, action.resource);
    }
  });

  // FIXME: how to catch the errors here (they're not errors but rather failure actions) - we should not trigger success and hide window on error
  yield all(actionsArray);

  yield put(triggerLauncher.success());

  const isOpeningAnotherLaunchStation = arrayActions.some(
    (action) => action.action === LauncherAction.OpenLaunchStation,
  );
  const hasActions = arrayActions.length;
  if (!isOpeningAnotherLaunchStation && hasActions) {
    yield call(hideWindowSaga);
  }
}

function* triggerLauncherListener(): SagaIterator {
  yield takeLatest(
    getType(triggerLauncher.request),
    function* (
      action: ActionType<typeof triggerLauncher.request>,
    ): SagaIterator {
      const launcherId = action.payload;

      yield call(triggerLauncherSaga, launcherId);
    },
  );
}

export function* launchStationsSagas(): SagaIterator {
  yield fork(addLaunchStationActionSaga);
  yield fork(triggerLauncherListener);
}
