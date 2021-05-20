import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { MenusState } from "./models";
import { addMenuOption, deleteMenuOption, editMenuOption } from "./actions";
import { makePlaceholderMenuOptionData } from "./data";

const reducerActions = {
  addMenuOption,
  editMenuOption,
  deleteMenuOption,
};

export const initialState: MenusState = {
  data: {
    default: {
      id: "default",
      title: "Placeholder",
      options: [],
    },
  },
};

const addMenuOptionReducer = (
  state: MenusState,
  action: ActionType<typeof addMenuOption>,
): MenusState => {
  const menuId = action.payload;
  const menu = { ...state.data[menuId] };
  const newMenuOptions = [...menu.options, makePlaceholderMenuOptionData()];
  menu.options = newMenuOptions;

  return {
    ...state,
    data: {
      ...state.data,
      [menuId]: menu,
    },
  };
};

const editMenuOptionReducer = (
  state: MenusState,
  action: ActionType<typeof editMenuOption>,
): MenusState => {
  const { menuId, menuOptionId } = action.payload;
  const menu = { ...state.data[menuId] };
  const newMenuOptions = menu.options.map((option) => ({
    ...option,
    isEditing: menuOptionId === option.id,
  }));
  menu.options = newMenuOptions;

  return {
    ...state,
    data: {
      ...state.data,
      [menuId]: menu,
    },
  };
};

const deleteMenuOptionReducer = (
  state: MenusState,
  action: ActionType<typeof deleteMenuOption>,
): MenusState => {
  const { menuId, menuOptionId } = action.payload;
  const menu = { ...state.data[menuId] };
  const newMenuOptions = menu.options.filter(
    (option) => !(option.id === menuOptionId),
  );
  menu.options = newMenuOptions;

  return {
    ...state,
    data: {
      ...state.data,
      [menuId]: menu,
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

    default: {
      return state;
    }
  }
};
