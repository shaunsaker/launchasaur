import { call, fork, put, take, takeLatest } from "@redux-saga/core/effects";
import { SagaIterator } from "redux-saga";
import { ActionType, getType } from "typesafe-actions";
import { getFilepath } from "../files/actions";
import { addMenuOptionAction } from "../menus/actions";
import { makeActionData } from "../menus/data";
import { MenuAction } from "../menus/models";
import { hideMenuActionsModal } from "./actions";

function* handleAddOpenOrCloseFileActionSaga(
  action: ActionType<typeof addMenuOptionAction.request>,
): SagaIterator {
  yield put(getFilepath.request());

  const getFilepathAction:
    | ActionType<typeof getFilepath.success>
    | ActionType<typeof getFilepath.failure> = yield take([
    getType(getFilepath.success),
    getType(getFilepath.failure),
  ]);

  if (getFilepathAction.type === getType(getFilepath.success)) {
    // if the file system dialog was closed, do nothing
    if (getFilepathAction.payload.canceled) {
      return;
    }

    const filepath = getFilepathAction.payload.filePaths[0]; // we only allow a single selection

    // create the menu action and add it to the menu
    const actionData = makeActionData({
      action: action.payload.action,
      resource: filepath,
    });
    yield put(
      addMenuOptionAction.success({
        menuId: action.payload.menuId,
        menuOptionId: action.payload.menuOptionId,
        actionData,
      }),
    );

    // close the modal
    yield put(hideMenuActionsModal());
  } else {
    // failure
    yield put(addMenuOptionAction.failure(getFilepathAction.payload));
  }
}

function* handleAddOpenLinkActionSaga(): SagaIterator {}

function* handleAddRunScriptActionSaga(): SagaIterator {}

function* handleAddOpenSubmenuActionSaga(): SagaIterator {}

function* handleAddMenuActionSaga(): SagaIterator {
  yield takeLatest(
    getType(addMenuOptionAction.request),
    function* (
      action: ActionType<typeof addMenuOptionAction.request>,
    ): SagaIterator {
      const { action: menuAction } = action.payload;

      switch (menuAction) {
        case MenuAction.OpenFile:
          yield call(handleAddOpenOrCloseFileActionSaga, action);
          break;
        case MenuAction.CloseFile:
          yield call(handleAddOpenOrCloseFileActionSaga, action);
          break;
        case MenuAction.OpenLink:
          yield call(handleAddOpenLinkActionSaga);
          break;
        case MenuAction.RunScript:
          yield call(handleAddRunScriptActionSaga);
          break;
        case MenuAction.OpenSubmenu:
          yield call(handleAddOpenSubmenuActionSaga);
          break;
      }
    },
  );
}

export function* menuActionsModalSagas(): SagaIterator {
  yield fork(handleAddMenuActionSaga);
}
