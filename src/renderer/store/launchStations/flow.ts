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
  runScriptSaga,
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
import { closeFile, openFile, openLink, runScript } from "../ipc/actions";
import { showEditScriptModal } from "../editScriptModal/actions";
import { race, take } from "redux-saga/effects";
import { safeDelay } from "../../utils/safeDelay";

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

function* handleAddRunScriptLauncherActionSaga(
  action: ActionType<typeof addLauncherAction.request>,
): SagaIterator {
  yield put(
    showEditScriptModal({
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
        case LauncherAction.RunScript:
          yield call(handleAddRunScriptLauncherActionSaga, action);
          break;
      }
    },
  );
}

// the estimated time it takes for the browser to open
// for some reason, 0 works 🤷‍♂️
const LINK_TRIGGER_DELAY = 0;

function* triggerLauncherSaga(launcherId: LauncherId): SagaIterator {
  const launcher = yield* select((state: ApplicationState) =>
    selectLauncherById(state, launcherId),
  );
  const arrayActions = objectToArray(launcher.actions);

  let linkTriggerCount = 0;

  // trigger the actions as appropriate
  const actionsArray = arrayActions.map((action) => {
    if (action.action === LauncherAction.OpenFile) {
      return call(openFileSaga, action.resource);
    }

    if (action.action === LauncherAction.CloseFile) {
      return call(closeFileSaga, action.resource);
    }

    if (action.action === LauncherAction.OpenLink) {
      // with Firefox, multiple windows are opened when multiple links are opened
      // so to mitigate this we first need to wait for the browser to open before
      // triggering subsequent links so that they open in new tabs instead of new windows
      // ie. for the 2nd link, wait for the browser to open before triggering it
      if (linkTriggerCount === 1) {
        call(safeDelay, LINK_TRIGGER_DELAY);
      }

      linkTriggerCount += 1;

      return put(openLink.request({ url: action.resource }));
    }

    if (action.action === LauncherAction.OpenLaunchStation) {
      return put(navigateToLaunchStation({ launchStationId: action.resource }));
    }

    if (action.action === LauncherAction.TriggerLauncher) {
      return call(triggerLauncherSaga, action.resource);
    }

    if (action.action === LauncherAction.RunScript) {
      return call(runScriptSaga, action.resource);
    }
  });

  // if we receive any failure actions, cancel the success actions
  const { failure } = yield race({
    success: all(actionsArray),
    failure: take([
      openFile.failure,
      closeFile.failure,
      openLink.failure,
      runScript.failure,
    ]),
  });

  if (failure) {
    yield put(triggerLauncher.failure(failure.payload));

    return;
  }

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
