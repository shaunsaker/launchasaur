import { SagaIterator } from "redux-saga";
import { fork } from "redux-saga/effects";
import { authSagas } from "./auth/flow";
import { launchStationsSagas } from "./launchStations/flow";
import { navigationSagas } from "./navigation/flow";
import { settingsSagas } from "./settings/flow";
import { shortcutsSagas } from "./shortcuts/flow";

function* omnipresentFlows() {
  yield fork(navigationSagas);
  yield fork(authSagas);
  yield fork(settingsSagas);
  yield fork(launchStationsSagas);
  yield fork(shortcutsSagas);
}

function* rootSaga(): SagaIterator {
  yield fork(omnipresentFlows);
}

export default rootSaga;
