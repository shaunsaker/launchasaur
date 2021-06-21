import { SagaIterator } from "redux-saga";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { firebaseDeleteUser } from "../../firebase/auth/deleteUser";
import { firebaseForgotPassword } from "../../firebase/auth/forgotPassword";
import { firebaseLogin } from "../../firebase/auth/login";
import { firebaseSignout } from "../../firebase/auth/signout";
import { firebaseSignup } from "../../firebase/auth/signup";
import { firebaseUpdateEmail } from "../../firebase/auth/updateEmail";
import { firebaseUpdatePassword } from "../../firebase/auth/updatePassword";
import { uuid } from "../../utils/uuid";
import { showSnackbar } from "../snackbars/actions";
import { SnackbarType } from "../snackbars/models";
import {
  deleteAccount,
  forgotPassword,
  login,
  signout,
  signup,
  updateEmail,
  updatePassword,
} from "./actions";

export function* signupSaga(): SagaIterator {
  yield takeLatest(
    getType(signup.request),
    function* (action: ActionType<typeof signup.request>): SagaIterator {
      try {
        const user = yield call(firebaseSignup, action.payload);

        yield put(signup.success(user));
      } catch (error) {
        yield put(signup.failure(error));
        yield put(
          showSnackbar({
            key: uuid(),
            message: error.message,
            type: SnackbarType.Danger,
          }),
        );
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
        yield put(
          showSnackbar({
            key: uuid(),
            message: error.message,
            type: SnackbarType.Danger,
          }),
        );
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
        yield put(
          showSnackbar({
            key: uuid(),
            message: "A password reset email was sent successfully.",
            type: SnackbarType.Success,
          }),
        );
      } catch (error) {
        yield put(forgotPassword.failure(error));
        yield put(
          showSnackbar({
            key: uuid(),
            message: error.message,
            type: SnackbarType.Danger,
          }),
        );
      }
    },
  );
}

export function* signoutSaga(): SagaIterator {
  yield takeLatest(getType(signout.request), function* (): SagaIterator {
    try {
      yield call(firebaseSignout);

      yield put(signout.success());
    } catch (error) {
      yield put(signout.failure(error));
      yield put(
        showSnackbar({
          key: uuid(),
          message: error.message,
          type: SnackbarType.Danger,
        }),
      );
    }
  });
}

export function* updateEmailSaga(): SagaIterator {
  yield takeLatest(
    getType(updateEmail.request),
    function* (action: ActionType<typeof updateEmail.request>): SagaIterator {
      try {
        yield call(firebaseUpdateEmail, action.payload);

        yield put(updateEmail.success(action.payload));

        yield put(
          showSnackbar({
            key: uuid(),
            message: "Your email was updated successfully.",
            type: SnackbarType.Success,
          }),
        );
      } catch (error) {
        yield put(updateEmail.failure(error));
        yield put(
          showSnackbar({
            key: uuid(),
            message: error.message,
            type: SnackbarType.Danger,
          }),
        );
      }
    },
  );
}

export function* updatePasswordSaga(): SagaIterator {
  yield takeLatest(
    getType(updatePassword.request),
    function* (
      action: ActionType<typeof updatePassword.request>,
    ): SagaIterator {
      try {
        yield call(firebaseUpdatePassword, action.payload);

        yield put(updatePassword.success(action.payload));

        yield put(
          showSnackbar({
            key: uuid(),
            message: "Your password was updated successfully.",
            type: SnackbarType.Success,
          }),
        );
      } catch (error) {
        yield put(updatePassword.failure(error));
        yield put(
          showSnackbar({
            key: uuid(),
            message: error.message,
            type: SnackbarType.Danger,
          }),
        );
      }
    },
  );
}

export function* deleteAccountSaga(): SagaIterator {
  yield takeLatest(getType(deleteAccount.request), function* (): SagaIterator {
    try {
      yield call(firebaseDeleteUser);

      yield put(deleteAccount.success());

      yield put(
        showSnackbar({
          key: uuid(),
          message: "Your account was deleted successfully.",
          type: SnackbarType.Success,
        }),
      );
    } catch (error) {
      yield put(deleteAccount.failure(error));
      yield put(
        showSnackbar({
          key: uuid(),
          message: error.message,
          type: SnackbarType.Danger,
        }),
      );
    }
  });
}

export function* authSagas(): SagaIterator {
  yield fork(signupSaga);
  yield fork(loginSaga);
  yield fork(forgotPasswordSaga);
  yield fork(signoutSaga);
  yield fork(updateEmailSaga);
  yield fork(updatePasswordSaga);
  yield fork(deleteAccountSaga);
}
