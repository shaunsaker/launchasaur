import { SagaIterator } from "redux-saga";
import { fork } from "redux-saga/effects";
import { menusSagas } from "./menus/flow";

function* omnipresentFlows() {
  yield fork(menusSagas);
}

function* rootSaga(): SagaIterator {
  yield fork(omnipresentFlows);
}

export default rootSaga;
