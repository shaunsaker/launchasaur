import { call, fork, put, takeLatest } from "@redux-saga/core/effects";
import { ipcRenderer } from "electron";
import { SagaIterator } from "redux-saga";
import { getType } from "typesafe-actions";
import { IPC } from "../../../main/ipc/models";
import { getFilenameFromFilepath } from "./utils";
import { closeFile, getFilepath, openFile, openLink } from "./actions";

function* getFilepathSaga(): SagaIterator {
  yield takeLatest(getType(getFilepath.request), function* (): SagaIterator {
    try {
      const response = yield call(() => ipcRenderer.invoke(IPC.GetFilePath));

      yield put(getFilepath.success(response));
    } catch (error) {
      yield put(getFilepath.failure(error));
    }
  });
}

export function* openFileSaga(filepath: string): SagaIterator {
  yield put(openFile.request({ filepath }));

  try {
    yield call(() => ipcRenderer.invoke(IPC.OpenFile, filepath));

    yield put(openFile.success());
  } catch (error) {
    yield put(openFile.failure(error));
  }
}

export function* closeFileSaga(filepath: string): SagaIterator {
  yield put(closeFile.request({ filepath }));

  try {
    const filename = getFilenameFromFilepath(filepath);

    yield call(() => ipcRenderer.invoke(IPC.CloseFile, filename));

    yield put(closeFile.success());
  } catch (error) {
    yield put(closeFile.failure(error));
  }
}

export function* openLinkSaga(url: string): SagaIterator {
  yield put(openLink.request({ url }));

  try {
    yield call(() => ipcRenderer.invoke(IPC.OpenLink, url));

    yield put(openLink.success());
  } catch (error) {
    yield put(openLink.failure(error));
  }
}

export function* filesSagas(): SagaIterator {
  yield fork(getFilepathSaga);
}
