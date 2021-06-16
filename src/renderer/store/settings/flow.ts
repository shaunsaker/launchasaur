import { SagaIterator } from "redux-saga";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { select } from "../../utils/select";
import {
  checkShortcutRegisteredSaga,
  registerShortcutSaga,
  unregisterShortcutSaga,
} from "../ipc/flow";
import { setAppShortcut } from "./actions";
import { selectSettingsAppShortcut } from "./selectors";

function* loadAppShortcutSaga(): SagaIterator {
  // loads the app shortcut on mount
  const shortcut = yield* select(selectSettingsAppShortcut);

  yield put(setAppShortcut.request({ shortcut }));

  yield call(registerShortcutSaga, shortcut);

  yield put(setAppShortcut.success({ shortcut }));
}

function* setAppShortcutSaga(): SagaIterator {
  yield takeLatest(
    getType(setAppShortcut.request),
    function* (
      action: ActionType<typeof setAppShortcut.request>,
    ): SagaIterator {
      const { shortcut } = action.payload;

      // check if the shortcut is available
      const shortcutRegistered = yield call(
        checkShortcutRegisteredSaga,
        shortcut,
      );

      if (shortcutRegistered) {
        yield put(
          setAppShortcut.failure(
            new Error(
              "Shortcut is already registered. Please try a different one.",
            ),
          ),
        );
      } else {
        const oldShortcut = yield* select(selectSettingsAppShortcut);
        yield call(unregisterShortcutSaga, oldShortcut);

        yield call(registerShortcutSaga, shortcut);

        yield put(setAppShortcut.success({ shortcut }));
      }
    },
  );
}

export function* settingsSagas(): SagaIterator {
  // yield fork(loadAppShortcutSaga);
  // yield fork(setAppShortcutSaga);
}
