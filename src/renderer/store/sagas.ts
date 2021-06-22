import { SagaIterator } from "redux-saga";
import { fork } from "redux-saga/effects";
import { connectSaga } from "../utils/connectSaga";
import { authSagas } from "./auth/flow";
import { selectIsAuthenticated } from "./auth/selectors";
import { launchStationsSagas } from "./launchStations/flow";
import { navigationSagas } from "./navigation/flow";
import { settingsSagas } from "./settings/flow";
import { shortcutsSagas } from "./shortcuts/flow";
import { userSagas } from "./user/flow";

function* omnipresentFlows() {
  yield fork(navigationSagas);
  yield fork(authSagas);
}

function* authenticatedFlows(authenticated: boolean) {
  if (authenticated) {
    yield fork(settingsSagas);
    yield fork(launchStationsSagas);
    yield fork(shortcutsSagas);
    yield fork(userSagas);
  }
}

function* rootSaga(): SagaIterator {
  yield fork(omnipresentFlows);
  yield fork(() => connectSaga(selectIsAuthenticated, authenticatedFlows));
}

export default rootSaga;
