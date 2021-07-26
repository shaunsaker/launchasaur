import { call, fork, put, takeLatest } from "@redux-saga/core/effects";
import { SagaIterator } from "redux-saga";
import { ActionType } from "typesafe-actions";
import { firebaseFetchUser } from "../../firebase/firestore/fetchUser";
import { firebaseStartTrial } from "../../firebase/functions/startTrial";
import { select } from "../../utils/select";
import { uuid } from "../../utils/uuid";
import { selectUserId } from "../auth/selectors";
import { showSnackbar } from "../snackbars/actions";
import { SnackbarType } from "../snackbars/models";
import { hideUpgradeModal } from "../upgradeModal/actions";
import { fetchUser, startTrial } from "./actions";

function* fetchUserSaga(): SagaIterator {
  const userId = yield* select(selectUserId);

  if (!userId) {
    const message = "No user is signed in.";

    yield put(fetchUser.failure(new Error(message)));

    yield put(
      showSnackbar({
        key: uuid(),
        message: message,
        type: SnackbarType.Danger,
      }),
    );

    return;
  }

  yield put(fetchUser.request({ userId }));

  try {
    const userData = yield call(firebaseFetchUser, { userId });

    yield put(fetchUser.success(userData));
  } catch (error) {
    yield put(fetchUser.failure(error));

    yield put(
      showSnackbar({
        key: uuid(),
        message: error.message,
        type: SnackbarType.Danger,
      }),
    );
  }
}

function* startTrialSaga(): SagaIterator {
  yield takeLatest(
    startTrial.request,
    function* (action: ActionType<typeof startTrial.request>) {
      try {
        yield call(firebaseStartTrial, { email: action.payload.email });

        // fetch the updated user data
        yield call(fetchUserSaga);

        yield put(startTrial.success());

        yield put(hideUpgradeModal());

        yield put(
          showSnackbar({
            key: uuid(),
            message:
              "You've successfully activated your Pro Trial! It will expire in 30 days.",
            type: SnackbarType.Success,
          }),
        );
      } catch (error) {
        yield put(startTrial.failure(error));

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

export function* userSagas(): SagaIterator {
  yield fork(fetchUserSaga);
  yield fork(startTrialSaga);
}
