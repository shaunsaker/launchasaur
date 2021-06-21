import { call, put } from "@redux-saga/core/effects";
import { ipcRenderer } from "electron";
import { SagaIterator } from "redux-saga";
import { IPC } from "../../../main/ipc/models";
import { getFilenameFromFilepath } from "./utils";
import {
  checkShortcutRegistered,
  closeFile,
  getFilepath,
  hideWindow,
  openFile,
  openLink,
  registerShortcut,
  unregisterShortcut,
} from "./actions";
import { showSnackbar } from "../snackbars/actions";
import { uuid } from "../../utils/uuid";
import { SnackbarType } from "../snackbars/models";

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
    const filename = getFilenameFromFilepath(filepath);

    const error = yield call(() => ipcRenderer.invoke(IPC.CloseFile, filename));

    if (error) {
      yield put(openFile.failure(error));
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

export function* openLinkSaga(url: string): SagaIterator {
  yield put(openLink.request({ url }));

  try {
    yield call(() => ipcRenderer.invoke(IPC.OpenLink, url));

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
