import { all, call, fork, takeLatest } from "@redux-saga/core/effects";
import { LOCATION_CHANGE } from "connected-react-router";
import Mousetrap from "mousetrap";
import { eventChannel, SagaIterator } from "redux-saga";
import { put, takeEvery } from "redux-saga/effects";
import { objectToArray } from "../../utils/objectToArray";
import { select } from "../../utils/select";
import { setMenuOptionShortcut, triggerMenuOption } from "../menus/actions";
import { MenuId, MenuOptionId, Shortcut } from "../menus/models";
import { selectMenu } from "../menus/selectors";
import { Routes } from "../navigation/routes";
import { selectNavigationLocation } from "../navigation/selectors";
import { getMenuIdFromRoute } from "../navigation/utils";
import { registerMenuOptionShortcut } from "./actions";

const createShortcutListenerChannel = (shortcut: string) =>
  eventChannel((emit) => {
    Mousetrap.bind(shortcut.toLowerCase(), () => {
      emit("");
    });

    return () => {};
  });

export function* registerMenuOptionShortcutSaga({
  menuId,
  menuOptionId,
  shortcut,
}: {
  menuId: MenuId;
  menuOptionId: MenuOptionId;
  shortcut: Shortcut;
}): SagaIterator {
  const channel = yield call(createShortcutListenerChannel, shortcut);

  yield takeEvery(channel, function* (): SagaIterator {
    yield put(triggerMenuOption.request({ menuId, menuOptionId }));
  });

  yield put(registerMenuOptionShortcut.success());

  // TODO: when to close the channel?
  // channel.close()
}

function* registerMenuOptionShortcutListener(): SagaIterator {
  yield takeEvery(
    registerMenuOptionShortcut.request,
    function* (action): SagaIterator {
      yield call(registerMenuOptionShortcutSaga, action.payload);
    },
  );
}

function* registerShortcutsSaga(): SagaIterator {
  Mousetrap.reset();

  // select the current menu
  const menuId = getMenuIdFromRoute();
  const menu = yield* select(selectMenu, menuId);

  // for the currently selected menu, register it's keyboard shortcuts
  const actions = objectToArray(menu.options)
    .filter((option) => option.shortcut)
    .map((option) =>
      put(
        registerMenuOptionShortcut.request({
          menuId: menu.id,
          menuOptionId: option.id,
          shortcut: option.shortcut,
        }),
      ),
    );

  yield all(actions);
}

function* registerShortcutsListener(): SagaIterator {
  // when the menu changes
  yield takeLatest(LOCATION_CHANGE, function* (): SagaIterator {
    const { pathname } = yield* select(selectNavigationLocation);

    if (pathname.includes("menu") || pathname === Routes.root) {
      yield call(registerShortcutsSaga);
    }
  });

  // when we change a shortcut
  yield takeLatest(setMenuOptionShortcut, registerShortcutsSaga);
}

export function* shortcutsSagas(): SagaIterator {
  yield fork(registerShortcutsListener);
  yield fork(registerMenuOptionShortcutListener);
}
