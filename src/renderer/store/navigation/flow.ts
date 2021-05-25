import { goBack, push } from "connected-react-router";
import { eventChannel, SagaIterator } from "redux-saga";
import { call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
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

const createKeyListenerChannel = (key: string) =>
  eventChannel((emit) => {
    window.addEventListener("keydown", (event) => {
      if (event.key === key) {
        emit("");
      }
    });

    return () => {};
  });

function* backHandlerSaga(): SagaIterator {
  const channel = yield call(createKeyListenerChannel, "Escape");

  yield takeEvery(channel, function* () {
    yield put(goBack());
  });
}

export function* navigationSagas(): SagaIterator {
  yield fork(navigateToSaga);
  yield fork(backHandlerSaga);
}
