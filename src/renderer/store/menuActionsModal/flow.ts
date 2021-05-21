import { call, fork, put, take, takeLatest } from "@redux-saga/core/effects";
import { SagaIterator } from "redux-saga";
import { ActionType, getType } from "typesafe-actions";
import { getFilepath } from "../files/actions";
import { addMenuAction } from "../menus/actions";
import { makeActionData } from "../menus/data";
import { MenuAction } from "../menus/models";
import { hideMenuActionsModal } from "./actions";

function* handleAddOpenFileActionSaga(
  action: ActionType<typeof addMenuAction.request>,
): SagaIterator {
  yield put(getFilepath.request());

  const getFilepathAction:
    | ActionType<typeof getFilepath.success>
    | ActionType<typeof getFilepath.failure> = yield take([
    getType(getFilepath.success),
    getType(getFilepath.failure),
  ]);

  if (getFilepathAction.type === getType(getFilepath.success)) {
    const filepath = getFilepathAction.payload.filePaths[0]; // we only allow a single selection

    // create the menu action and add it to the menu
    const actionData = makeActionData({
      action: action.payload.action,
      resource: filepath,
    });
    yield put(
      addMenuAction.success({
        menuId: action.payload.menuId,
        menuOptionId: action.payload.menuOptionId,
        actionData,
      }),
    );

    // close the modal
    yield put(hideMenuActionsModal());
  } else {
    // failure
    yield put(addMenuAction.failure(getFilepathAction.payload));
  }
}

function* handleAddCloseFileActionSaga(): SagaIterator {}

function* handleAddOpenLinkActionSaga(): SagaIterator {}

function* handleAddRunScriptActionSaga(): SagaIterator {}

function* handleAddOpenSubmenuActionSaga(): SagaIterator {}

function* handleAddMenuActionSaga(): SagaIterator {
  yield takeLatest(
    getType(addMenuAction.request),
    function* (action: ActionType<typeof addMenuAction.request>): SagaIterator {
      const { action: menuAction } = action.payload;

      switch (menuAction) {
        case MenuAction.OpenFile:
          yield call(handleAddOpenFileActionSaga, action);
          break;
        case MenuAction.CloseFile:
          yield call(handleAddCloseFileActionSaga);
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
