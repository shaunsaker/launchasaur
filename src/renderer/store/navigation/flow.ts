import { goBack, push, replace } from "connected-react-router";
import { eventChannel, SagaIterator } from "redux-saga";
import { call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { select } from "../../utils/select";
import { hideWindowSaga } from "../ipc/flow";
import { DEFAULT_LAUNCH_STATION_ID } from "../launchStations/models";
import { navigateBack, navigateTo } from "./actions";
import { selectNavigationLocation } from "./selectors";
import { getLaunchStationIdFromRoute } from "./utils";

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
    const isDefaultLaunchStationRoute =
      getLaunchStationIdFromRoute() === DEFAULT_LAUNCH_STATION_ID &&
      !pathname.includes("settings");

    if (isDefaultLaunchStationRoute) {
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
