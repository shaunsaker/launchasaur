import { SagaIterator } from "redux-saga";
import { fork } from "redux-saga/effects";
import { filesSagas } from "./ipc/flow";
import { menusSagas } from "./menus/flow";
import { navigationSagas } from "./navigation/flow";

function* omnipresentFlows() {
  yield fork(navigationSagas);
  yield fork(menusSagas);
  yield fork(filesSagas);
}

function* rootSaga(): SagaIterator {
  yield fork(omnipresentFlows);
}

export default rootSaga;
