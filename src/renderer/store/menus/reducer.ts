import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { defaultMenuId, MenusState } from "./models";
import {
  addMenuOptionAction,
  addMenuOption,
  deleteMenuOption,
  editMenuOption,
  deleteMenuOptionAction,
  addMenu,
  setMenuOptionShortcut,
  setMenuOptionTitle,
  setMenuTitle,
  setMenuOptionColour,
} from "./actions";
import { makeMenuData, makeMenuOptionData } from "./data";
import { REHYDRATE } from "redux-persist/es/constants";

const reducerActions = {
  addMenuOption,
  editMenuOption,
  deleteMenuOption,
  addMenuOptionActionSuccess: addMenuOptionAction.success,
  deleteMenuOptionAction,
  addMenu,
  setMenuOptionShortcut,
  setMenuOptionTitle,
  setMenuTitle,
  setMenuOptionColour,
};

// create the initial menu
export const initialState: MenusState = {
  data: {
    [defaultMenuId]: makeMenuData({ id: defaultMenuId }),
  },
};

const rehydrateReducer = (
  state: MenusState,
  action: { payload: { menus: MenusState } },
) => {
  if (!action.payload) {
    return state;
  }

  // reset all menu options isEditing state
  const menus = action.payload.menus.data;

  Object.keys(menus).forEach((menuId) => {
    const options = menus[menuId].options;

    Object.keys(options).forEach((optionId) => {
      const option = options[optionId];
      option.isEditing = false;
    });
  });

  return {
    ...state,
    data: menus,
  };
};

const addMenuOptionReducer = (
  state: MenusState,
  action: ActionType<typeof addMenuOption>,
): MenusState => {
  const { menuId, menuOptionId } = action.payload;
  const newMenuOptionData = makeMenuOptionData({ id: menuOptionId });

  return {
    ...state,
    data: {
      ...state.data,
      [menuId]: {
        ...state.data[menuId],
        options: {
          ...state.data[menuId].options,
          [menuOptionId]: newMenuOptionData,
        },
      },
    },
  };
};

const editMenuOptionReducer = (
  state: MenusState,
  action: ActionType<typeof editMenuOption>,
): MenusState => {
  const { menuId, menuOptionId, isEditing } = action.payload;

  return {
    ...state,
    data: {
      ...state.data,
      [menuId]: {
        ...state.data[menuId],
        options: {
          ...state.data[menuId].options,
          [menuOptionId]: {
            ...state.data[menuId].options[menuOptionId],
            isEditing,
          },
        },
      },
    },
  };
};

const deleteMenuOptionReducer = (
  state: MenusState,
  action: ActionType<typeof deleteMenuOption>,
): MenusState => {
  const { menuId, menuOptionId } = action.payload;
  const menuOptions = { ...state.data[menuId].options };

  delete menuOptions[menuOptionId];

  return {
    ...state,
    data: {
      ...state.data,
      [menuId]: {
        ...state.data[menuId],
        options: menuOptions,
      },
    },
  };
};

const addMenuOptionActionSuccessReducer = (
  state: MenusState,
  action: ActionType<typeof addMenuOptionAction.success>,
): MenusState => {
  const { menuId, menuOptionId, actionData } = action.payload;

  return {
    ...state,
    data: {
      ...state.data,
      [menuId]: {
        ...state.data[menuId],
        options: {
          ...state.data[menuId].options,
          [menuOptionId]: {
            ...state.data[menuId].options[menuOptionId],
            actions: {
              ...state.data[menuId].options[menuOptionId].actions,
              [actionData.id]: actionData,
            },
          },
        },
      },
    },
  };
};

const deleteMenuOptionActionReducer = (
  state: MenusState,
  action: ActionType<typeof deleteMenuOptionAction>,
): MenusState => {
  const { menuId, menuOptionId, actionId } = action.payload;
  const actions = state.data[menuId].options[menuOptionId].actions;

  delete actions[actionId];

  return {
    ...state,
    data: {
      ...state.data,
      [menuId]: {
        ...state.data[menuId],
        options: {
          ...state.data[menuId].options,
          [menuOptionId]: {
            ...state.data[menuId].options[menuOptionId],
            actions,
          },
        },
      },
    },
  };
};

const addMenuReducer = (
  state: MenusState,
  action: ActionType<typeof addMenu>,
): MenusState => {
  const newMenu = makeMenuData({ title: action.payload.title });

  return {
    ...state,
    data: {
      ...state.data,
      [newMenu.id]: newMenu,
    },
  };
};

const setMenuOptionShortcutReducer = (
  state: MenusState,
  action: ActionType<typeof setMenuOptionShortcut>,
): MenusState => {
  const { menuId, menuOptionId, shortcut } = action.payload;

  return {
    ...state,
    data: {
      ...state.data,
      [menuId]: {
        ...state.data[menuId],
        options: {
          ...state.data[menuId].options,
          [menuOptionId]: {
            ...state.data[menuId].options[menuOptionId],
            shortcut,
          },
        },
      },
    },
  };
};

const setMenuOptionTitleReducer = (
  state: MenusState,
  action: ActionType<typeof setMenuOptionTitle>,
): MenusState => {
  const { menuId, menuOptionId, title } = action.payload;

  return {
    ...state,
    data: {
      ...state.data,
      [menuId]: {
        ...state.data[menuId],
        options: {
          ...state.data[menuId].options,
          [menuOptionId]: {
            ...state.data[menuId].options[menuOptionId],
            title,
          },
        },
      },
    },
  };
};

const setMenuTitleReducer = (
  state: MenusState,
  action: ActionType<typeof setMenuTitle>,
): MenusState => {
  const { menuId, title } = action.payload;

  return {
    ...state,
    data: {
      ...state.data,
      [menuId]: {
        ...state.data[menuId],
        title,
      },
    },
  };
};

const setMenuOptionColourReducer = (
  state: MenusState,
  action: ActionType<typeof setMenuOptionColour>,
): MenusState => {
  const { menuId, menuOptionId, colour } = action.payload;

  return {
    ...state,
    data: {
      ...state.data,
      [menuId]: {
        ...state.data[menuId],
        options: {
          ...state.data[menuId].options,
          [menuOptionId]: {
            ...state.data[menuId].options[menuOptionId],
            colour,
          },
        },
      },
    },
  };
};

export const menusReducer: Reducer<MenusState> = (
  state = initialState,
  action:
    | ActionType<typeof reducerActions>
    | { type: typeof REHYDRATE; payload: { menus: MenusState } },
) => {
  switch (action.type) {
    case REHYDRATE:
      return rehydrateReducer(state, action);

    case getType(addMenuOption):
      return addMenuOptionReducer(state, action);

    case getType(editMenuOption):
      return editMenuOptionReducer(state, action);

    case getType(deleteMenuOption):
      return deleteMenuOptionReducer(state, action);

    case getType(addMenuOptionAction.success):
      return addMenuOptionActionSuccessReducer(state, action);

    case getType(deleteMenuOptionAction):
      return deleteMenuOptionActionReducer(state, action);

    case getType(addMenu):
      return addMenuReducer(state, action);

    case getType(setMenuOptionShortcut):
      return setMenuOptionShortcutReducer(state, action);

    case getType(setMenuOptionTitle):
      return setMenuOptionTitleReducer(state, action);

    case getType(setMenuTitle):
      return setMenuTitleReducer(state, action);

    case getType(setMenuOptionColour):
      return setMenuOptionColourReducer(state, action);

    default: {
      return state;
    }
  }
};
