import { call, fork, put, takeLatest } from "@redux-saga/core/effects";
import { ipcRenderer } from "electron";
import { SagaIterator } from "redux-saga";
import { getType } from "typesafe-actions";
import { IPC } from "../../../main/ipc/models";
import { getFilepath } from "./actions";

function* getFilepathSaga(): SagaIterator {
  yield takeLatest(getType(getFilepath.request), function* (): SagaIterator {
    try {
      const response = yield call(() => ipcRenderer.invoke(IPC.OpenFile));

      yield put(getFilepath.success(response));
    } catch (error) {
      yield put(getFilepath.failure(error));
    }
  });
}

export function* filesSagas(): SagaIterator {
  yield fork(getFilepathSaga);
}
