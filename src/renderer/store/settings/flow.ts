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

function* setAppShortcutSaga(): SagaIterator {
  yield takeLatest(
    getType(setAppShortcut.request),
    function* (
      action: ActionType<typeof setAppShortcut.request>,
    ): SagaIterator {
      console.log("HERE");
      const { shortcut } = action.payload;

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
  yield fork(setAppShortcutSaga);
}
