import { SagaIterator } from "redux-saga";
import { fork } from "redux-saga/effects";
import { filesSagas } from "./files/flow";
import { menusSagas } from "./menus/flow";

function* omnipresentFlows() {
  yield fork(menusSagas);
  yield fork(filesSagas);
}

function* rootSaga(): SagaIterator {
  yield fork(omnipresentFlows);
}

export default rootSaga;
