import { ipcRenderer } from "electron";
import { SagaIterator } from "redux-saga";
import { IPC } from "../../../main/ipc/models";
import {
  checkShortcutRegistered,
  closeFile,
  getDisplays,
  getFilepath,
  hideWindow,
  openFile,
  openLink,
  registerShortcut,
  runScript,
  setDisplay,
  unregisterShortcut,
} from "./actions";
import { showSnackbar } from "../snackbars/actions";
import { uuid } from "../../utils/uuid";
import { SnackbarType } from "../snackbars/models";
import { call, put, fork, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { ExtendedDisplay } from "../settings/models";

export function* getFilepathSaga(): SagaIterator {
  yield put(getFilepath.request());

  try {
    const response = yield call(() => ipcRenderer.invoke(IPC.GetFilePath));

    yield put(getFilepath.success(response));

    return response;
  } catch (error) {
    yield put(getFilepath.failure(error));
    yield put(
      showSnackbar({
        key: uuid(),
        message: error.message,
        type: SnackbarType.Danger,
      }),
    );
  }
}

export function* openFileSaga(filepath: string): SagaIterator {
  yield put(openFile.request({ filepath }));

  try {
    const error = yield call(() => ipcRenderer.invoke(IPC.OpenFile, filepath));

    if (error) {
      yield put(openFile.failure(error));
      yield put(
        showSnackbar({
          key: uuid(),
          message: error.message,
          type: SnackbarType.Danger,
        }),
      );
    } else {
      yield put(openFile.success());
    }
  } catch (error) {
    yield put(openFile.failure(error));
    yield put(
      showSnackbar({
        key: uuid(),
        message: error.message,
        type: SnackbarType.Danger,
      }),
    );
  }
}

export function* closeFileSaga(filepath: string): SagaIterator {
  yield put(closeFile.request({ filepath }));

  try {
    const error = yield call(() => ipcRenderer.invoke(IPC.CloseFile, filepath));

    if (error) {
      yield put(closeFile.failure(error));
      yield put(
        showSnackbar({
          key: uuid(),
          message: error.message,
          type: SnackbarType.Danger,
        }),
      );
    } else {
      yield put(closeFile.success());
    }
  } catch (error) {
    yield put(closeFile.failure(error));
    yield put(
      showSnackbar({
        key: uuid(),
        message: error.message,
        type: SnackbarType.Danger,
      }),
    );
  }
}

export function* openLinkSaga(): SagaIterator {
  yield takeLatest(
    openLink.request,
    function* (action: ActionType<typeof openLink.request>) {
      try {
        yield call(() => ipcRenderer.invoke(IPC.OpenLink, action.payload.url));

        yield put(openLink.success());
      } catch (error) {
        yield put(openLink.failure(error));
        yield put(
          showSnackbar({
            key: uuid(),
            message: error.message,
            type: SnackbarType.Danger,
          }),
        );
      }
    },
  );
}

export function* checkShortcutRegisteredSaga(shortcut: string): SagaIterator {
  yield put(checkShortcutRegistered.request({ shortcut }));

  try {
    const shortcutRegistered = yield call(() =>
      ipcRenderer.invoke(IPC.CheckShortcutRegistered, shortcut),
    );

    yield put(checkShortcutRegistered.success(shortcutRegistered));

    return shortcutRegistered;
  } catch (error) {
    yield put(checkShortcutRegistered.failure(error));
    yield put(
      showSnackbar({
        key: uuid(),
        message: error.message,
        type: SnackbarType.Danger,
      }),
    );
  }
}

export function* unregisterShortcutSaga(shortcut: string): SagaIterator {
  yield put(unregisterShortcut.request({ shortcut }));

  try {
    yield call(() => ipcRenderer.invoke(IPC.UnregisterShortcut, shortcut));

    yield put(unregisterShortcut.success());
  } catch (error) {
    yield put(unregisterShortcut.failure(error));
    yield put(
      showSnackbar({
        key: uuid(),
        message: error.message,
        type: SnackbarType.Danger,
      }),
    );
  }
}

export function* registerShortcutSaga(shortcut: string): SagaIterator {
  yield put(registerShortcut.request({ shortcut }));

  try {
    yield call(() => ipcRenderer.invoke(IPC.RegisterShortcut, shortcut));

    yield put(registerShortcut.success());
  } catch (error) {
    yield put(registerShortcut.failure(error));
    yield put(
      showSnackbar({
        key: uuid(),
        message: error.message,
        type: SnackbarType.Danger,
      }),
    );
  }
}

export function* hideWindowSaga(): SagaIterator {
  yield put(hideWindow.request());

  try {
    yield call(() => ipcRenderer.invoke(IPC.HideWindow));

    yield put(hideWindow.success());
  } catch (error) {
    yield put(hideWindow.failure(error));
    yield put(
      showSnackbar({
        key: uuid(),
        message: error.message,
        type: SnackbarType.Danger,
      }),
    );
  }
}

export function* getDisplaysSaga(): SagaIterator {
  yield takeLatest(getDisplays.request, function* (): SagaIterator {
    try {
      const displays: ExtendedDisplay[] = yield call(() =>
        ipcRenderer.invoke(IPC.GetDisplays),
      );

      yield put(getDisplays.success(displays));
    } catch (error) {
      yield put(hideWindow.failure(error));
      yield put(
        showSnackbar({
          key: uuid(),
          message: error.message,
          type: SnackbarType.Danger,
        }),
      );
    }
  });
}

export function* setDisplaySaga(): SagaIterator {
  yield takeLatest(
    setDisplay.request,
    function* (action: ActionType<typeof setDisplay.request>): SagaIterator {
      try {
        yield call(() => ipcRenderer.invoke(IPC.SetDisplay, action.payload));

        yield put(setDisplay.success(action.payload));
      } catch (error) {
        yield put(setDisplay.failure(error));
        yield put(
          showSnackbar({
            key: uuid(),
            message: error.message,
            type: SnackbarType.Danger,
          }),
        );
      }
    },
  );
}

export function* runScriptSaga(script: string): SagaIterator {
  yield put(runScript.request(script));

  try {
    // FIXME: how to type the result automatically
    const result: { message: string; error?: boolean } = yield call(() =>
      ipcRenderer.invoke(IPC.RunScript, script),
    );

    if (result.error) {
      yield put(
        showSnackbar({
          key: uuid(),
          message: result.message,
          type: SnackbarType.Danger,
        }),
      );

      yield put(runScript.failure(new Error(result.message)));

      return;
    }

    yield put(runScript.success());

    yield put(
      showSnackbar({
        key: uuid(),
        message: result.message,
        type: SnackbarType.Success,
      }),
    );
  } catch (error) {
    yield put(runScript.failure(error));
    yield put(
      showSnackbar({
        key: uuid(),
        message: error.message,
        type: SnackbarType.Danger,
      }),
    );
  }
}

export function* ipcSagas(): SagaIterator {
  yield fork(openLinkSaga);
  yield fork(getDisplaysSaga);
  yield put(getDisplays.request());
  yield fork(setDisplaySaga);
}
