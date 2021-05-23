import { call, fork, put, takeLatest } from "@redux-saga/core/effects";
import { ipcRenderer } from "electron";
import { SagaIterator } from "redux-saga";
import { ActionType, getType } from "typesafe-actions";
import { IPC } from "../../../main/ipc/models";
import { uuid } from "../../utils/uuid";
import { createFile, getFilepath } from "./actions";

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

function* createFileSaga(): SagaIterator {
  yield takeLatest(
    getType(createFile.request),
    function* (action: ActionType<typeof createFile.request>): SagaIterator {
      try {
        const filename = action.payload.filename || uuid();
        const response = yield call(() =>
          ipcRenderer.invoke(IPC.CreateFile, filename, action.payload.contents),
        );

        yield put(createFile.success(response));
      } catch (error) {
        yield put(createFile.failure(error));
      }
    },
  );
}

export function* filesSagas(): SagaIterator {
  yield fork(getFilepathSaga);
  yield fork(createFileSaga);
}
