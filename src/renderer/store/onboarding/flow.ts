import { SagaIterator } from "redux-saga";
import { fork, put, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { select } from "../../utils/select";
import {
  hideEditLauncherModal,
  showEditLauncherModal,
} from "../editLauncherModal/actions";
import {
  addLauncherAction,
  setLauncherColour,
  setLauncherIcon,
  setLauncherTitle,
  setLaunchStationTitle,
  triggerLauncher,
} from "../launchStations/actions";
import { DEFAULT_LAUNCH_STATION_ID } from "../launchStations/models";
import { selectLaunchStation } from "../launchStations/selectors";
import { navigateTo } from "../navigation/actions";
import { Routes } from "../navigation/models";
import {
  hideOnboardingCoachmarks,
  setIsOnboardingSetup,
  setOnboardingCoachmarkKey,
  showOnboardingOutroModal,
} from "./actions";
import {
  OnboardingCoachmarkKey,
  ONBOARDING_NEW_LAUNCHER_ICON,
  ONBOARDING_NEW_LAUNCHER_NAME,
  ONBOARDING_PLANET,
} from "./models";
import {
  selectHasCompletedOnboarding,
  selectIsOnboardingSetup,
  selectNextOnboardingCoachmarkKey,
  selectOnboardingCoachmarkKey,
} from "./selectors";

function* setupOnboardingSaga(): SagaIterator {
  // when a user has not completed onboarding, dress up the default launch station to go along with our story
  const hasCompletedOnboarding = yield* select(selectHasCompletedOnboarding);
  const isOnboardingSetUp = yield* select(selectIsOnboardingSetup);

  if (!hasCompletedOnboarding && !isOnboardingSetUp) {
    const defaultLaunchStation = yield* select(selectLaunchStation);
    const launcherId = Object.keys(defaultLaunchStation.launchers)[0];
    const launcher = defaultLaunchStation.launchers[launcherId];

    // set the name of the launch station
    yield put(
      setLaunchStationTitle({
        launchStationId: DEFAULT_LAUNCH_STATION_ID,
        title: ONBOARDING_PLANET,
      }),
    );

    // set the name of the launcher
    yield put(
      setLauncherTitle({
        launchStationId: DEFAULT_LAUNCH_STATION_ID,
        launcherId: launcher.id,
        title: "Broken Launcher",
      }),
    );

    // set the icon of the launcher
    yield put(
      setLauncherIcon({
        launchStationId: DEFAULT_LAUNCH_STATION_ID,
        launcherId: launcher.id,
        icon: "wrench",
      }),
    );

    // set the color of the launcher
    yield put(
      setLauncherColour({
        launchStationId: DEFAULT_LAUNCH_STATION_ID,
        launcherId: launcher.id,
        colour: "#D50000",
      }),
    );

    // mark the onboarding setup as complete
    yield put(setIsOnboardingSetup());
  }
}

function* navigateToControlPanelListener(): SagaIterator {
  yield takeLatest(
    navigateTo,
    function* (action: ActionType<typeof navigateTo>) {
      const isNavigatingToSettings =
        action.payload.to === Routes.settingsLaunchStations;

      if (isNavigatingToSettings) {
        const hasCompletedOnboarding = yield* select(
          selectHasCompletedOnboarding,
        );
        const onboardingCoachmarkKey = yield* select(
          selectOnboardingCoachmarkKey,
        );
        const hasSeenOpenControlPanelCoachmark =
          onboardingCoachmarkKey === OnboardingCoachmarkKey.OpenControlPanel;

        if (!hasCompletedOnboarding && hasSeenOpenControlPanelCoachmark) {
          const nextOnboardingCoachmarkKey = yield* select(
            selectNextOnboardingCoachmarkKey,
          );

          yield put(setOnboardingCoachmarkKey(nextOnboardingCoachmarkKey));
        }
      }
    },
  );
}

function* showLauncherControlPanelListener(): SagaIterator {
  yield takeLatest(showEditLauncherModal, function* () {
    const hasCompletedOnboarding = yield* select(selectHasCompletedOnboarding);
    const onboardingCoachmarkKey = yield* select(selectOnboardingCoachmarkKey);
    const hasSeenOpenLauncherControlPanelCoachmark =
      onboardingCoachmarkKey ===
      OnboardingCoachmarkKey.OpenLauncherControlPanel;

    if (!hasCompletedOnboarding && hasSeenOpenLauncherControlPanelCoachmark) {
      const nextOnboardingCoachmarkKey = yield* select(
        selectNextOnboardingCoachmarkKey,
      );

      yield put(setOnboardingCoachmarkKey(nextOnboardingCoachmarkKey));
    }
  });
}

function* changeLauncherNameListener(): SagaIterator {
  yield takeLatest(
    setLauncherTitle,
    function* (action: ActionType<typeof setLauncherTitle>) {
      const hasCompletedOnboarding = yield* select(
        selectHasCompletedOnboarding,
      );
      const onboardingCoachmarkKey = yield* select(
        selectOnboardingCoachmarkKey,
      );
      const hasSeenEditLauncherNameCoachmark =
        onboardingCoachmarkKey === OnboardingCoachmarkKey.EditLauncherName;

      if (!hasCompletedOnboarding && hasSeenEditLauncherNameCoachmark) {
        const newLauncherName = action.payload.title;

        if (
          newLauncherName.toLowerCase() ===
          ONBOARDING_NEW_LAUNCHER_NAME.toLowerCase()
        ) {
          const nextOnboardingCoachmarkKey = yield* select(
            selectNextOnboardingCoachmarkKey,
          );

          yield put(setOnboardingCoachmarkKey(nextOnboardingCoachmarkKey));
        }
      }
    },
  );
}

function* changeLauncherIconListener(): SagaIterator {
  yield takeLatest(
    setLauncherIcon,
    function* (action: ActionType<typeof setLauncherIcon>) {
      const hasCompletedOnboarding = yield* select(
        selectHasCompletedOnboarding,
      );
      const onboardingCoachmarkKey = yield* select(
        selectOnboardingCoachmarkKey,
      );
      const hasSeenEditLauncherIconCoachmark =
        onboardingCoachmarkKey === OnboardingCoachmarkKey.EditLauncherIcon;

      if (!hasCompletedOnboarding && hasSeenEditLauncherIconCoachmark) {
        const newLauncherIcon = action.payload.icon;

        if (newLauncherIcon === ONBOARDING_NEW_LAUNCHER_ICON) {
          const nextOnboardingCoachmarkKey = yield* select(
            selectNextOnboardingCoachmarkKey,
          );

          yield put(setOnboardingCoachmarkKey(nextOnboardingCoachmarkKey));
        }
      }
    },
  );
}

function* changeLauncherColorListener(): SagaIterator {
  yield takeLatest(setLauncherColour, function* () {
    const hasCompletedOnboarding = yield* select(selectHasCompletedOnboarding);
    const onboardingCoachmarkKey = yield* select(selectOnboardingCoachmarkKey);
    const hasSeenEditLauncherColourCoachmark =
      onboardingCoachmarkKey === OnboardingCoachmarkKey.EditLauncherColour;

    if (!hasCompletedOnboarding && hasSeenEditLauncherColourCoachmark) {
      // set the next onboarding coachmark key regardless if the colour changed
      const nextOnboardingCoachmarkKey = yield* select(
        selectNextOnboardingCoachmarkKey,
      );

      yield put(setOnboardingCoachmarkKey(nextOnboardingCoachmarkKey));
    }
  });
}

function* addLauncherActionListener(): SagaIterator {
  yield takeLatest(addLauncherAction.success, function* () {
    const hasCompletedOnboarding = yield* select(selectHasCompletedOnboarding);
    const onboardingCoachmarkKey = yield* select(selectOnboardingCoachmarkKey);
    const hasSeenEditLauncherActionsCoachmark =
      onboardingCoachmarkKey === OnboardingCoachmarkKey.EditLauncherActions;

    if (!hasCompletedOnboarding && hasSeenEditLauncherActionsCoachmark) {
      // set the next onboarding coachmark key regardless if the actions changed
      const nextOnboardingCoachmarkKey = yield* select(
        selectNextOnboardingCoachmarkKey,
      );

      yield put(setOnboardingCoachmarkKey(nextOnboardingCoachmarkKey));
    }
  });
}

function* closeLauncherControlPanelListener(): SagaIterator {
  yield takeLatest(hideEditLauncherModal, function* () {
    const hasCompletedOnboarding = yield* select(selectHasCompletedOnboarding);
    const onboardingCoachmarkKey = yield* select(selectOnboardingCoachmarkKey);
    const hasSeenCloseLauncherControlPanelCoachmark =
      onboardingCoachmarkKey ===
      OnboardingCoachmarkKey.CloseLauncherControlPanel;

    if (!hasCompletedOnboarding && hasSeenCloseLauncherControlPanelCoachmark) {
      const nextOnboardingCoachmarkKey = yield* select(
        selectNextOnboardingCoachmarkKey,
      );

      yield put(setOnboardingCoachmarkKey(nextOnboardingCoachmarkKey));
    }
  });
}

function* closeControlPanelListener(): SagaIterator {
  yield takeLatest(
    navigateTo,
    function* (action: ActionType<typeof navigateTo>) {
      const isNavigatingToRoot = action.payload.to === Routes.root;

      if (isNavigatingToRoot) {
        const hasCompletedOnboarding = yield* select(
          selectHasCompletedOnboarding,
        );
        const onboardingCoachmarkKey = yield* select(
          selectOnboardingCoachmarkKey,
        );
        const hasSeenOpenControlPanelCoachmark =
          onboardingCoachmarkKey === OnboardingCoachmarkKey.CloseControlPanel;

        if (!hasCompletedOnboarding && hasSeenOpenControlPanelCoachmark) {
          const nextOnboardingCoachmarkKey = yield* select(
            selectNextOnboardingCoachmarkKey,
          );

          yield put(setOnboardingCoachmarkKey(nextOnboardingCoachmarkKey));
        }
      }
    },
  );
}

function* triggerLauncherListener(): SagaIterator {
  yield takeLatest(triggerLauncher.request, function* () {
    const hasCompletedOnboarding = yield* select(selectHasCompletedOnboarding);
    const onboardingCoachmarkKey = yield* select(selectOnboardingCoachmarkKey);
    const hasSeenTriggerLauncherCoachmark =
      onboardingCoachmarkKey === OnboardingCoachmarkKey.TriggerLauncher;

    if (!hasCompletedOnboarding && hasSeenTriggerLauncherCoachmark) {
      yield put(hideOnboardingCoachmarks());
      yield put(showOnboardingOutroModal());
    }
  });
}

export function* onboardingSagas(): SagaIterator {
  yield fork(setupOnboardingSaga);
  yield fork(navigateToControlPanelListener);
  yield fork(showLauncherControlPanelListener);
  yield fork(changeLauncherNameListener);
  yield fork(changeLauncherIconListener);
  yield fork(changeLauncherColorListener);
  yield fork(addLauncherActionListener);
  yield fork(closeLauncherControlPanelListener);
  yield fork(closeControlPanelListener);
  yield fork(triggerLauncherListener);
}
