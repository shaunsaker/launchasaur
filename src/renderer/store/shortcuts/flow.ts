import { all, call, fork, takeLatest } from "@redux-saga/core/effects";
import Mousetrap from "mousetrap";
import { REHYDRATE } from "redux-persist/es/constants";
import { eventChannel, SagaIterator } from "redux-saga";
import { put, takeEvery } from "redux-saga/effects";
import { objectToArray } from "../../utils/objectToArray";
import { select } from "../../utils/select";
import { setMenuOptionShortcut, triggerMenuOption } from "../menus/actions";
import { MenuId, MenuOptionId, Shortcut } from "../menus/models";
import { selectMenu } from "../menus/selectors";

const createShortcutListenerChannel = (shortcut: string) =>
  eventChannel((emit) => {
    Mousetrap.bind(shortcut.toLowerCase(), () => {
      emit("");
    });

    return () => {};
  });

export function* registerMenuOptionShortcut({
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

  // TODO: when to close the channel?
  // channel.close()
}

function* registerShortcutsSaga(): SagaIterator {
  // TODO: also check when the menu changes
  yield takeLatest(
    [REHYDRATE, setMenuOptionShortcut],
    function* (): SagaIterator {
      // reset all shortcuts
      Mousetrap.reset();

      // select the current menu
      const menu = yield* select(selectMenu);

      // for the currently selected menu, register it's keyboard shortcuts
      const actions = objectToArray(menu.options)
        .filter((option) => option.shortcut)
        .map((option) =>
          call(registerMenuOptionShortcut, {
            menuId: menu.id,
            menuOptionId: option.id,
            shortcut: option.shortcut,
          }),
        );

      yield all(actions);
    },
  );
}

export function* shortcutsSagas(): SagaIterator {
  yield fork(registerShortcutsSaga);
}
