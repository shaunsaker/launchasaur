import { SagaIterator } from "redux-saga";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { firebaseForgotPassword } from "../../firebase/auth/forgotPassword";
import { firebaseLogin } from "../../firebase/auth/login";
import { firebaseSignup } from "../../firebase/auth/signup";
import { forgotPassword, login, signup } from "./actions";

export function* signupSaga(): SagaIterator {
  yield takeLatest(
    getType(signup.request),
    function* (action: ActionType<typeof signup.request>): SagaIterator {
      try {
        const user = yield call(firebaseSignup, action.payload);

        yield put(signup.success(user));
      } catch (error) {
        yield put(signup.failure(error));
      }
    },
  );
}

export function* loginSaga(): SagaIterator {
  yield takeLatest(
    getType(login.request),
    function* (action: ActionType<typeof login.request>): SagaIterator {
      try {
        const user = yield call(firebaseLogin, action.payload);

        yield put(login.success(user));
      } catch (error) {
        yield put(login.failure(error));
      }
    },
  );
}

export function* forgotPasswordSaga(): SagaIterator {
  yield takeLatest(
    getType(forgotPassword.request),
    function* (
      action: ActionType<typeof forgotPassword.request>,
    ): SagaIterator {
      try {
        yield call(firebaseForgotPassword, action.payload);

        yield put(forgotPassword.success());
      } catch (error) {
        yield put(forgotPassword.failure(error));
      }
    },
  );
}

export function* authSagas(): SagaIterator {
  yield fork(signupSaga);
  yield fork(loginSaga);
  yield fork(forgotPasswordSaga);
}
