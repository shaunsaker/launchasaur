import { SagaIterator } from "redux-saga";
import { fork } from "redux-saga/effects";
import { appStatesSaga } from "./appStates/flow";
import { ipcSagas } from "./ipc/flow";
import { launchStationsSagas } from "./launchStations/flow";
import { navigationSagas } from "./navigation/flow";
import { onboardingSagas } from "./onboarding/flow";
import { settingsSagas } from "./settings/flow";

function* omnipresentFlows() {
  yield fork(appStatesSaga);
  yield fork(navigationSagas);
  yield fork(settingsSagas);
  yield fork(launchStationsSagas);
  yield fork(onboardingSagas);
  yield fork(ipcSagas);
}

function* rootSaga(): SagaIterator {
  yield fork(omnipresentFlows);
}

export default rootSaga;
