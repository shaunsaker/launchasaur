import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { defaultMenuId, MenusState } from "./models";
import {
  addMenuOptionAction,
  addMenuOption,
  deleteMenuOption,
  editMenuOption,
  deleteMenuOptionAction,
} from "./actions";
import { makeMenuData, makeMenuOptionData } from "./data";

const reducerActions = {
  addMenuOption,
  editMenuOption,
  deleteMenuOption,
  addMenuOptionActionSuccess: addMenuOptionAction.success,
  deleteMenuOptionAction,
};

// create the initial menu
export const initialState: MenusState = {
  data: {
    [defaultMenuId]: makeMenuData({ id: defaultMenuId }),
  },
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

export const menusReducer: Reducer<MenusState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
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

    default: {
      return state;
    }
  }
};
