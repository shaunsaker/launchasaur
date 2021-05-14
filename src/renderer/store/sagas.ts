import { SagaIterator } from "@redux-saga/types"; // eslint-disable-line
import { call, fork } from "redux-saga/effects";

function* omnipresentFlows() {
  yield call(() => true); // TODO: update this
}

function* rootSaga(): SagaIterator {
  yield fork(omnipresentFlows);
}

export default rootSaga;
