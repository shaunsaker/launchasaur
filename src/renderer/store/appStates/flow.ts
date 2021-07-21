import { fork, put, takeLatest } from "@redux-saga/core/effects";
import { REHYDRATE } from "redux-persist/es/constants";
import { SagaIterator } from "redux-saga";
import { setAppStarted } from "./actions";

function* appStartedSaga(): SagaIterator {
  yield takeLatest(REHYDRATE, function* () {
    yield put(setAppStarted());
  });
}

export function* appStatesSaga(): SagaIterator {
  yield fork(appStartedSaga);
}
