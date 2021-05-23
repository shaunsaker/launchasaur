import { push } from "connected-react-router";
import { SagaIterator } from "redux-saga";
import { fork, put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { navigateTo } from "./actions";

function* navigateToSaga(): SagaIterator {
  yield takeLatest(
    getType(navigateTo),
    function* (action: ActionType<typeof navigateTo>): SagaIterator {
      yield put(push(action.payload.to));
    },
  );
}

export function* navigationSagas(): SagaIterator {
  yield fork(navigateToSaga);
}
