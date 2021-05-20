import { call, fork, takeLatest } from "@redux-saga/core/effects";
import { SagaIterator } from "redux-saga";
import { ActionType, getType } from "typesafe-actions";
import { addMenuAction } from "./actions";
import { MenuAction } from "./models";

function* addOpenFileActionToMenuSaga(): SagaIterator {}

function* addCloseFileActionToMenuSaga(): SagaIterator {}

function* addOpenLinkActionToMenuSaga(): SagaIterator {}

function* addRunScriptActionToMenuSaga(): SagaIterator {}

function* addOpenSubmenuActionToMenuSaga(): SagaIterator {}

function* addMenuOptionSaga(): SagaIterator {
  yield takeLatest(
    getType(addMenuAction),
    function* (action: ActionType<typeof addMenuAction>): SagaIterator {
      const { action: menuAction } = action.payload;

      switch (menuAction) {
        case MenuAction.OpenFile:
          yield call(addOpenFileActionToMenuSaga);
          break;
        case MenuAction.CloseFile:
          yield call(addCloseFileActionToMenuSaga);
          break;
        case MenuAction.OpenLink:
          yield call(addOpenLinkActionToMenuSaga);
          break;
        case MenuAction.RunScript:
          yield call(addRunScriptActionToMenuSaga);
          break;
        case MenuAction.OpenSubmenu:
          yield call(addOpenSubmenuActionToMenuSaga);
          break;
      }
    },
  );
}

export function* menusSagas(): SagaIterator {
  yield fork(addMenuOptionSaga);
}
