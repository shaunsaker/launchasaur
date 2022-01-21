import { SagaIterator } from "redux-saga";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { select } from "../../utils/select";
import { uuid } from "../../utils/uuid";
import {
  checkShortcutRegisteredSaga,
  registerShortcutSaga,
  unregisterShortcutSaga,
} from "../ipc/flow";
import { showSnackbar } from "../snackbars/actions";
import { SnackbarType } from "../snackbars/models";
import { setAppShortcut } from "./actions";
import { selectSettingsAppShortcut } from "./selectors";

function* loadAppShortcutSaga(): SagaIterator {
  // checks if the app shortcut is available and registers it if not (sometimes we lose it 🤷‍♂️)
  const shortcut = yield* select(selectSettingsAppShortcut);

  const shortcutRegistered = yield call(checkShortcutRegisteredSaga, shortcut);

  if (!shortcutRegistered) {
    yield put(setAppShortcut.request({ shortcut }));
  }
}

function* setAppShortcutSaga(): SagaIterator {
  yield takeLatest(
    getType(setAppShortcut.request),
    function* (
      action: ActionType<typeof setAppShortcut.request>,
    ): SagaIterator {
      const { shortcut } = action.payload;

      // don't do the checks if the shortcut was cleared
      if (shortcut) {
        // check if the shortcut is available
        const shortcutRegistered = yield call(
          checkShortcutRegisteredSaga,
          shortcut,
        );

        if (shortcutRegistered) {
          const message =
            "Shortcut is already registered. Please try a different one.";

          yield put(setAppShortcut.failure(new Error(message)));

          yield put(
            showSnackbar({
              key: uuid(),
              message,
              type: SnackbarType.Danger,
            }),
          );

          return;
        }
      }

      const oldShortcut = yield* select(selectSettingsAppShortcut);

      // only attempt to unregister the old shortcut if it was not empty
      if (oldShortcut) {
        yield call(unregisterShortcutSaga, oldShortcut);
      }

      // only register a new shortcut if it is not empty
      if (shortcut) {
        yield call(registerShortcutSaga, shortcut);
      }

      yield put(setAppShortcut.success({ shortcut }));
    },
  );
}

export function* settingsSagas(): SagaIterator {
  yield fork(loadAppShortcutSaga);
  yield fork(setAppShortcutSaga);
}
