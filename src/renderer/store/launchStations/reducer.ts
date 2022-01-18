import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { DEFAULT_LAUNCH_STATION_ID, LaunchStationsState } from "./models";
import {
  addLauncherAction,
  addLauncher,
  deleteLauncher,
  editLauncher,
  deleteLauncherAction,
  addLaunchStation,
  setLauncherShortcut,
  setLauncherTitle,
  setLaunchStationTitle,
  setLauncherColour,
  setLauncherIcon,
  deleteLaunchStation,
  sortLaunchers,
} from "./actions";
import { makeLaunchStationData, makeLauncherData } from "./data";
import { selectLaunchStation } from "./selectors";
import { ApplicationState } from "../reducers";
import { objectToArray } from "../../utils/objectToArray";
import { uuid } from "../../utils/uuid";
import { arrayToObject } from "../../utils/arrayToObject";
import { sortArrayOfObjectsByKey } from "../../utils/sortArrayOfObjectsByKey";
import { arraymove } from "../../utils/arrayMove";

const reducerActions = {
  addLauncher,
  editLauncher,
  deleteLauncher,
  sortLaunchers,
  addLauncherActionSuccess: addLauncherAction.success,
  deleteLauncherAction,
  addLaunchStation,
  setLauncherShortcut,
  setLauncherTitle,
  setLaunchStationTitle,
  setLauncherColour,
  setLauncherIcon,
  deleteLaunchStation,
};

export const initialState: LaunchStationsState = {
  data: {
    [DEFAULT_LAUNCH_STATION_ID]: makeLaunchStationData({
      id: DEFAULT_LAUNCH_STATION_ID,
    }),
  },
};

const addLauncherReducer = (
  state: LaunchStationsState,
  action: ActionType<typeof addLauncher>,
): LaunchStationsState => {
  const { launchStationId } = action.payload;
  const launchStation = selectLaunchStation(
    { launchStations: state } as ApplicationState,
    launchStationId,
  );

  const nextLauncherOrder = objectToArray(launchStation.launchers).length + 1;
  const launcherId = uuid();
  const newLauncherData = makeLauncherData({
    id: launcherId,
    shortcut: `Ctrl+Shift+${nextLauncherOrder}`,
    order: nextLauncherOrder,
  });
  const newLaunchers = {
    ...state.data[launchStationId].launchers,
    [launcherId]: newLauncherData,
  };

  return {
    ...state,
    data: {
      ...state.data,
      [launchStationId]: {
        ...state.data[launchStationId],
        launchers: newLaunchers,
      },
    },
  };
};

const deleteLauncherReducer = (
  state: LaunchStationsState,
  action: ActionType<typeof deleteLauncher>,
): LaunchStationsState => {
  const { launchStationId, launcherId } = action.payload;
  const launchers = { ...state.data[launchStationId].launchers };

  delete launchers[launcherId];

  // reset the order of each launcher
  let newLaunchersArray = objectToArray(launchers);
  newLaunchersArray = sortArrayOfObjectsByKey(newLaunchersArray, "order");
  newLaunchersArray = newLaunchersArray.map((launcher, index) => ({
    ...launcher,
    order: index + 1,
  }));
  const newLaunchers = arrayToObject(newLaunchersArray);

  return {
    ...state,
    data: {
      ...state.data,
      [launchStationId]: {
        ...state.data[launchStationId],
        launchers: newLaunchers,
      },
    },
  };
};

const sortLaunchersReducer = (
  state: LaunchStationsState,
  action: ActionType<typeof sortLaunchers>,
): LaunchStationsState => {
  const { launchStationId, sourceIndex, destinationIndex } = action.payload;
  const launchers = { ...state.data[launchStationId].launchers };

  let newLaunchersArray = objectToArray(launchers);
  newLaunchersArray = sortArrayOfObjectsByKey(newLaunchersArray, "order");

  // move the launcher at sourceIndex to the destinationIndex
  newLaunchersArray = arraymove(
    newLaunchersArray,
    sourceIndex,
    destinationIndex,
  );

  // reset the order of each launcher
  newLaunchersArray = newLaunchersArray.map((launcher, index) => ({
    ...launcher,
    order: index + 1,
  }));

  const newLaunchers = arrayToObject(newLaunchersArray);

  return {
    ...state,
    data: {
      ...state.data,
      [launchStationId]: {
        ...state.data[launchStationId],
        launchers: newLaunchers,
      },
    },
  };
};

const addLauncherActionSuccessReducer = (
  state: LaunchStationsState,
  action: ActionType<typeof addLauncherAction.success>,
): LaunchStationsState => {
  const { launchStationId, launcherId, actionData } = action.payload;

  return {
    ...state,
    data: {
      ...state.data,
      [launchStationId]: {
        ...state.data[launchStationId],
        launchers: {
          ...state.data[launchStationId].launchers,
          [launcherId]: {
            ...state.data[launchStationId].launchers[launcherId],
            actions: {
              ...state.data[launchStationId].launchers[launcherId].actions,
              [actionData.id]: actionData,
            },
          },
        },
      },
    },
  };
};

const deleteLauncherActionReducer = (
  state: LaunchStationsState,
  action: ActionType<typeof deleteLauncherAction>,
): LaunchStationsState => {
  const { launchStationId, launcherId, actionId } = action.payload;
  const actions = state.data[launchStationId].launchers[launcherId].actions;

  delete actions[actionId];

  return {
    ...state,
    data: {
      ...state.data,
      [launchStationId]: {
        ...state.data[launchStationId],
        launchers: {
          ...state.data[launchStationId].launchers,
          [launcherId]: {
            ...state.data[launchStationId].launchers[launcherId],
            actions,
          },
        },
      },
    },
  };
};

const addLaunchStationReducer = (
  state: LaunchStationsState,
  action: ActionType<typeof addLaunchStation>,
): LaunchStationsState => {
  const newLaunchStation = makeLaunchStationData({
    id: action.payload.id,
  });

  return {
    ...state,
    data: {
      ...state.data,
      [newLaunchStation.id]: newLaunchStation,
    },
  };
};

const setLauncherShortcutReducer = (
  state: LaunchStationsState,
  action: ActionType<typeof setLauncherShortcut>,
): LaunchStationsState => {
  const { launchStationId, launcherId, shortcut } = action.payload;

  return {
    ...state,
    data: {
      ...state.data,
      [launchStationId]: {
        ...state.data[launchStationId],
        launchers: {
          ...state.data[launchStationId].launchers,
          [launcherId]: {
            ...state.data[launchStationId].launchers[launcherId],
            shortcut,
          },
        },
      },
    },
  };
};

const setLauncherTitleReducer = (
  state: LaunchStationsState,
  action: ActionType<typeof setLauncherTitle>,
): LaunchStationsState => {
  const { launchStationId, launcherId, title } = action.payload;

  return {
    ...state,
    data: {
      ...state.data,
      [launchStationId]: {
        ...state.data[launchStationId],
        launchers: {
          ...state.data[launchStationId].launchers,
          [launcherId]: {
            ...state.data[launchStationId].launchers[launcherId],
            title,
          },
        },
      },
    },
  };
};

const setLaunchStationTitleReducer = (
  state: LaunchStationsState,
  action: ActionType<typeof setLaunchStationTitle>,
): LaunchStationsState => {
  const { launchStationId, title } = action.payload;

  return {
    ...state,
    data: {
      ...state.data,
      [launchStationId]: {
        ...state.data[launchStationId],
        title,
      },
    },
  };
};

const setLauncherColourReducer = (
  state: LaunchStationsState,
  action: ActionType<typeof setLauncherColour>,
): LaunchStationsState => {
  const { launchStationId, launcherId, colour } = action.payload;

  return {
    ...state,
    data: {
      ...state.data,
      [launchStationId]: {
        ...state.data[launchStationId],
        launchers: {
          ...state.data[launchStationId].launchers,
          [launcherId]: {
            ...state.data[launchStationId].launchers[launcherId],
            colour,
          },
        },
      },
    },
  };
};

const setLauncherIconReducer = (
  state: LaunchStationsState,
  action: ActionType<typeof setLauncherIcon>,
): LaunchStationsState => {
  const { launchStationId, launcherId, icon } = action.payload;

  return {
    ...state,
    data: {
      ...state.data,
      [launchStationId]: {
        ...state.data[launchStationId],
        launchers: {
          ...state.data[launchStationId].launchers,
          [launcherId]: {
            ...state.data[launchStationId].launchers[launcherId],
            icon,
          },
        },
      },
    },
  };
};

const deleteLaunchStationReducer = (
  state: LaunchStationsState,
  action: ActionType<typeof deleteLaunchStation>,
): LaunchStationsState => {
  const { launchStationId } = action.payload;
  const launchStations = {
    ...state.data,
  };

  delete launchStations[launchStationId];

  return {
    ...state,
    data: launchStations,
  };
};

export const launchstationsReducer: Reducer<LaunchStationsState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(addLauncher):
      return addLauncherReducer(state, action);

    case getType(deleteLauncher):
      return deleteLauncherReducer(state, action);

    case getType(sortLaunchers):
      return sortLaunchersReducer(state, action);

    case getType(addLauncherAction.success):
      return addLauncherActionSuccessReducer(state, action);

    case getType(deleteLauncherAction):
      return deleteLauncherActionReducer(state, action);

    case getType(addLaunchStation):
      return addLaunchStationReducer(state, action);

    case getType(setLauncherShortcut):
      return setLauncherShortcutReducer(state, action);

    case getType(setLauncherTitle):
      return setLauncherTitleReducer(state, action);

    case getType(setLaunchStationTitle):
      return setLaunchStationTitleReducer(state, action);

    case getType(setLauncherColour):
      return setLauncherColourReducer(state, action);

    case getType(setLauncherIcon):
      return setLauncherIconReducer(state, action);

    case getType(deleteLaunchStation):
      return deleteLaunchStationReducer(state, action);

    default: {
      return state;
    }
  }
};
