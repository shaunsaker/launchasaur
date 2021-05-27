import { SagaIterator } from "redux-saga";
import { fork } from "redux-saga/effects";
import { menusSagas } from "./menus/flow";
import { navigationSagas } from "./navigation/flow";
import { settingsSagas } from "./settings/flow";
import { shortcutsSagas } from "./shortcuts/flow";

function* omnipresentFlows() {
  yield fork(navigationSagas);
  yield fork(settingsSagas);
  yield fork(menusSagas);
  yield fork(shortcutsSagas);
}

function* rootSaga(): SagaIterator {
  yield fork(omnipresentFlows);
}

export default rootSaga;
