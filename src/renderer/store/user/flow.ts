import { call, fork, put } from "@redux-saga/core/effects";
import { SagaIterator } from "redux-saga";
import { firebaseFetchUser } from "../../firebase/firestore/fetchUser";
import { select } from "../../utils/select";
import { uuid } from "../../utils/uuid";
import { selectUserId } from "../auth/selectors";
import { showSnackbar } from "../snackbars/actions";
import { SnackbarType } from "../snackbars/models";
import { fetchUser } from "./actions";

function* fetchUserSaga(): SagaIterator {
  const userId = yield* select(selectUserId);

  if (!userId) {
    yield put(fetchUser.failure(new Error("No user is signed in.")));

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

export function* userSagas(): SagaIterator {
  yield fork(fetchUserSaga);
}
