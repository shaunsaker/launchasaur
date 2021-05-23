import {
  all,
  call,
  fork,
  put,
  take,
  takeLatest,
} from "@redux-saga/core/effects";
import { SagaIterator } from "redux-saga";
import { ActionType, getType } from "typesafe-actions";
import { objectToArray } from "../../utils/objectToArray";
import { select } from "../../utils/select";
import { showEditLinkModal } from "../editLinkModal/actions";
import {
  hideEditScriptModal,
  showEditScriptModal,
} from "../editScriptModal/actions";
import { createFile, getFilepath } from "../ipc/actions";
import { closeFileSaga, openFileSaga } from "../ipc/flow";
import { hideMenuActionsModal } from "../menuActionsModal/actions";
import { addMenuOptionAction, triggerMenuOption } from "../menus/actions";
import { makeActionData } from "../menus/data";
import { MenuAction } from "../menus/models";
import { ApplicationState } from "../reducers";
import { showSelectSubmenuModal } from "../selectSubmenuModal/actions";
import { selectMenuOption } from "./selectors";

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

function* handleAddOpenLinkActionSaga(
  action: ActionType<typeof addMenuOptionAction.request>,
): SagaIterator {
  yield put(
    showEditLinkModal({
      menuId: action.payload.menuId,
      menuOptionId: action.payload.menuOptionId,
      actionId: "", // it's a new action
    }),
  );
}

function* handleAddRunScriptActionSaga(
  action: ActionType<typeof addMenuOptionAction.request>,
): SagaIterator {
  yield put(
    showEditScriptModal({
      menuId: action.payload.menuId,
      menuOptionId: action.payload.menuOptionId,
      actionId: "", // it's a new action
    }),
  );

  const createFileAction:
    | ActionType<typeof createFile.success>
    | ActionType<typeof createFile.failure> = yield take([
    getType(createFile.success),
    getType(createFile.failure),
  ]);

  if (createFileAction.type === getType(createFile.success)) {
    const filepath = createFileAction.payload;

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

    yield put(hideEditScriptModal());
    yield put(hideMenuActionsModal());
  } else {
    // failure
    yield put(addMenuOptionAction.failure(createFileAction.payload));
  }
}

function* handleAddOpenSubmenuActionSaga(
  action: ActionType<typeof addMenuOptionAction.request>,
): SagaIterator {
  yield put(
    showSelectSubmenuModal({
      menuId: action.payload.menuId,
      menuOptionId: action.payload.menuOptionId,
      actionId: "", // it's a new action
    }),
  );
}

function* addMenuActionSaga(): SagaIterator {
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
          yield call(handleAddOpenLinkActionSaga, action);
          break;
        case MenuAction.RunScript:
          yield call(handleAddRunScriptActionSaga, action);
          break;
        case MenuAction.OpenSubmenu:
          yield call(handleAddOpenSubmenuActionSaga, action);
          break;
      }
    },
  );
}

function* triggerMenuOptionSaga(): SagaIterator {
  yield takeLatest(
    getType(triggerMenuOption.request),
    function* (
      action: ActionType<typeof triggerMenuOption.request>,
    ): SagaIterator {
      const { menuId, menuOptionId } = action.payload;
      const { actions } = yield* select((state: ApplicationState) =>
        selectMenuOption(state, { menuId, menuOptionId }),
      );

      // trigger the actions as appropriate
      const actionsArray = objectToArray(actions).map((action) => {
        if (action.action === MenuAction.OpenFile) {
          return call(openFileSaga, action.resource);
        }

        if (action.action === MenuAction.CloseFile) {
          return call(closeFileSaga, action.resource);
        }

        // TODO: handle the other action types
      });

      yield all(actionsArray);

      yield put(triggerMenuOption.success());
    },
  );
}

export function* menusSagas(): SagaIterator {
  yield fork(addMenuActionSaga);
  yield fork(triggerMenuOptionSaga);
}
