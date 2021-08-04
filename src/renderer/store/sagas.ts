import { SagaIterator } from "redux-saga";
import { fork } from "redux-saga/effects";
import { features } from "../features";
import { connectSaga } from "../utils/connectSaga";
import { appStatesSaga } from "./appStates/flow";
import { authSagas } from "./auth/flow";
import { selectIsAuthenticated } from "./auth/selectors";
import { ipcSagas } from "./ipc/flow";
import { launchStationsSagas } from "./launchStations/flow";
import { navigationSagas } from "./navigation/flow";
import { onboardingSagas } from "./onboarding/flow";
import { settingsSagas } from "./settings/flow";
import { userSagas } from "./user/flow";

function* omnipresentFlows() {
  yield fork(appStatesSaga);
  yield fork(navigationSagas);
  yield fork(authSagas);
}

function* authenticatedFlows(authenticated: boolean) {
  if (authenticated) {
    yield fork(settingsSagas);
    yield fork(launchStationsSagas);
    yield fork(onboardingSagas);
    yield fork(ipcSagas);

    if (features.billing) {
      yield fork(userSagas);
    }
  }
}

function* rootSaga(): SagaIterator {
  yield fork(omnipresentFlows);
  yield fork(() => connectSaga(selectIsAuthenticated, authenticatedFlows));
}

export default rootSaga;
