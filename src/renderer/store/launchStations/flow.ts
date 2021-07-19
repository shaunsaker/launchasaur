import {
  all,
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import { OpenDialogReturnValue } from "electron";
import { eventChannel, SagaIterator } from "redux-saga";
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
import {
  addLauncher,
  addLauncherAction,
  registerLauncherShortcut,
  setLauncherShortcut,
  triggerLauncher,
} from "./actions";
import { makeActionData } from "./data";
import {
  LauncherId,
  LaunchStationAction,
  LaunchStationId,
  Shortcut,
} from "./models";
import { navigateToLaunchStation } from "../navigation/actions";
import { ApplicationState } from "../reducers";
import { showSelectLaunchStationModal } from "../selectLaunchStationModal/actions";
import { selectLauncher, selectLaunchStation } from "./selectors";
import Mousetrap from "mousetrap";
import { getLaunchStationIdFromRoute } from "../navigation/utils";
import { LOCATION_CHANGE } from "connected-react-router";
import { selectNavigationLocation } from "../navigation/selectors";
import { showSnackbar } from "../snackbars/actions";
import { uuid } from "../../utils/uuid";
import { SnackbarType } from "../snackbars/models";
import { launchStationBase } from "../navigation/models";

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

      // TODO: how to catch the errors here (they're not errors but rather failure actions) - we should not trigger success and hide window on error
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

const createShortcutListenerChannel = (shortcut: string) =>
  eventChannel((emit) => {
    Mousetrap.bind(shortcut.toLowerCase(), () => {
      emit("");
    });

    return () => {};
  });

export function* registerLauncherShortcutSaga({
  launchStationId,
  launcherId,
  shortcut,
}: {
  launchStationId: LaunchStationId;
  launcherId: LauncherId;
  shortcut: Shortcut;
}): SagaIterator {
  const channel = yield call(createShortcutListenerChannel, shortcut);

  yield takeEvery(channel, function* (): SagaIterator {
    yield put(triggerLauncher.request({ launchStationId, launcherId }));
  });

  yield put(registerLauncherShortcut.success());
}

function* registerLauncherShortcutListener(): SagaIterator {
  yield takeEvery(
    registerLauncherShortcut.request,
    function* (action): SagaIterator {
      yield call(registerLauncherShortcutSaga, action.payload);
    },
  );
}

function* registerLaunchStationShortcutsSaga(): SagaIterator {
  // reset all shortcut listeners
  Mousetrap.reset();

  // select the current launch station
  const launchStationId = getLaunchStationIdFromRoute();
  const launchStation = yield* select(selectLaunchStation, launchStationId);

  // for the currently selected launch station, register it's keyboard shortcuts
  const actions = objectToArray(launchStation.launchers)
    .filter((launcher) => launcher.shortcut)
    .map((launcher) =>
      put(
        registerLauncherShortcut.request({
          launchStationId: launchStation.id,
          launcherId: launcher.id,
          shortcut: launcher.shortcut,
        }),
      ),
    );

  yield all(actions);
}

function* registerLaunchStationShortcutsListener(): SagaIterator {
  // when the launch station changes
  yield takeLatest([LOCATION_CHANGE, addLauncher], function* (): SagaIterator {
    const { pathname } = yield* select(selectNavigationLocation);
    const isLaunchStationRoute =
      pathname.includes(launchStationBase) && !pathname.includes("settings");

    if (isLaunchStationRoute) {
      yield call(registerLaunchStationShortcutsSaga);
    }
  });
}

function* setLauncherShortcutListener(): SagaIterator {
  yield takeLatest(
    setLauncherShortcut.request,
    function* (action: ActionType<typeof setLauncherShortcut.request>) {
      const { launchStationId, launcherId, shortcut } = action.payload;

      // if the shortcut doesn't already exist in the other launchers
      const shortcutAlreadyExists = objectToArray(
        (yield* select(selectLaunchStation, launchStationId)).launchers,
      ).some(
        (launcher) =>
          launcher.id !== launcherId && launcher.shortcut === shortcut,
      );

      if (shortcutAlreadyExists) {
        const errorMessage = `The shortcut, ${shortcut}, already exists in this launch station. Please choose another one.`;

        yield put(
          showSnackbar({
            key: uuid(),
            message: errorMessage,
            type: SnackbarType.Danger,
          }),
        );

        yield put(registerLauncherShortcut.failure(new Error(errorMessage)));

        return;
      }

      yield call(registerLaunchStationShortcutsSaga);

      yield take(registerLauncherShortcut.success);

      yield put(
        setLauncherShortcut.success({ launchStationId, launcherId, shortcut }),
      );
    },
  );
}

export function* launchStationsSagas(): SagaIterator {
  yield fork(addLaunchStationActionSaga);
  yield fork(triggerLauncherSaga);
  yield fork(registerLaunchStationShortcutsListener);
  yield fork(registerLauncherShortcutListener);
  yield fork(setLauncherShortcutListener);
}
