import { all, call, fork, takeLatest } from "@redux-saga/core/effects";
import { LOCATION_CHANGE } from "connected-react-router";
import Mousetrap from "mousetrap";
import { eventChannel, SagaIterator } from "redux-saga";
import { put, takeEvery } from "redux-saga/effects";
import { objectToArray } from "../../utils/objectToArray";
import { select } from "../../utils/select";
import {
  setLauncherShortcut,
  triggerLauncher,
} from "../launchStations/actions";
import {
  LaunchStationId,
  LauncherId,
  Shortcut,
} from "../launchStations/models";
import { selectLaunchStation } from "../launchStations/selectors";
import { launchStationBase, Routes } from "../navigation/models";
import { selectNavigationLocation } from "../navigation/selectors";
import { getLaunchStationIdFromRoute } from "../navigation/utils";
import { registerLauncherShortcut } from "./actions";

const createShortcutListenerChannel = (shortcut: string) =>
  eventChannel((emit) => {
    Mousetrap.bind(shortcut.toLowerCase(), () => {
      emit("");
    });

    return () => {};
  });

export function* registerLauncherShortcutSaga({
  launchStationId,
  launcherId,
  shortcut,
}: {
  launchStationId: LaunchStationId;
  launcherId: LauncherId;
  shortcut: Shortcut;
}): SagaIterator {
  const channel = yield call(createShortcutListenerChannel, shortcut);

  yield takeEvery(channel, function* (): SagaIterator {
    yield put(triggerLauncher.request({ launchStationId, launcherId }));
  });

  yield put(registerLauncherShortcut.success());

  // TODO: when to close the channel?
  // channel.close()
}

function* registerLauncherShortcutListener(): SagaIterator {
  yield takeEvery(
    registerLauncherShortcut.request,
    function* (action): SagaIterator {
      yield call(registerLauncherShortcutSaga, action.payload);
    },
  );
}

function* registerLaunchStationShortcutsSaga(): SagaIterator {
  Mousetrap.reset();

  // select the current launch station
  const launchStationId = getLaunchStationIdFromRoute();
  const launchStation = yield* select(selectLaunchStation, launchStationId);

  // for the currently selected launch station, register it's keyboard shortcuts
  const actions = objectToArray(launchStation.launchers)
    .filter((launcher) => launcher.shortcut)
    .map((launcher) =>
      put(
        registerLauncherShortcut.request({
          launchStationId: launchStation.id,
          launcherId: launcher.id,
          shortcut: launcher.shortcut,
        }),
      ),
    );

  yield all(actions);
}

function* registerLaunchStationShortcutsListener(): SagaIterator {
  // when the launch station changes
  yield takeLatest(LOCATION_CHANGE, function* (): SagaIterator {
    const { pathname } = yield* select(selectNavigationLocation);

    if (pathname.includes(launchStationBase) || pathname === Routes.root) {
      yield call(registerLaunchStationShortcutsSaga);
    }
  });

  // when we change a shortcut
  yield takeLatest(setLauncherShortcut, registerLaunchStationShortcutsSaga);
}

export function* shortcutsSagas(): SagaIterator {
  // TODO: fix these
  // yield fork(registerLaunchStationShortcutsListener);
  // yield fork(registerLauncherShortcutListener);
}
