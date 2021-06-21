import { goBack, push, replace } from "connected-react-router";
import { REHYDRATE } from "redux-persist/es/constants";
import { eventChannel, SagaIterator } from "redux-saga";
import { call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { select } from "../../utils/select";
import { hideWindowSaga } from "../ipc/flow";
import { navigateBack, navigateTo } from "./actions";
import { Routes } from "./models";
import { selectNavigationLocation } from "./selectors";

function* navigateToSaga(): SagaIterator {
  yield takeLatest(
    getType(navigateTo),
    function* (action: ActionType<typeof navigateTo>): SagaIterator {
      yield put(
        action.payload.replace
          ? replace(action.payload.to)
          : push(action.payload.to),
      );
    },
  );
}

function* navigateBackSaga(): SagaIterator {
  yield takeLatest(getType(navigateBack), function* (): SagaIterator {
    yield put(goBack());
  });
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
    const { pathname } = yield* select(selectNavigationLocation);
    const isRoot = pathname === Routes.root;

    if (isRoot) {
      yield call(hideWindowSaga);
    } else {
      yield put(goBack());
    }
  });
}

export function* navigationSagas(): SagaIterator {
  yield fork(navigateToSaga);
  yield fork(navigateBackSaga);
  yield fork(backHandlerSaga);
}
