import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { defaultMenuId, MenuData, MenuId, MenusState } from "./models";
import {
  addMenuAction,
  addMenuOption,
  deleteMenuOption,
  editMenuOption,
} from "./actions";
import { makeMenuData, makeMenuOptionData } from "./data";
import { v4 } from "uuid";
import { Map } from "immutable";

const reducerActions = {
  addMenuOption,
  editMenuOption,
  deleteMenuOption,
  addMenuActionSuccess: addMenuAction.success,
};

// create the initial menu
const data = Map<MenuId, MenuData>().set(
  defaultMenuId,
  makeMenuData({ id: defaultMenuId }),
);
export const initialState: MenusState = {
  data,
};

const addMenuOptionReducer = (
  state: MenusState,
  action: ActionType<typeof addMenuOption>,
): MenusState => {
  const menuId = action.payload.menuId;
  const menu = state.data.get(menuId);
  const menuOptionId = v4();
  const menuOptionData = makeMenuOptionData({ id: menuOptionId });
  menu.options = menu.options.set(menuOptionId, menuOptionData);

  return {
    ...state,
    data: state.data.set(menuId, menu),
  };
};

// const editMenuOptionReducer = (
//   state: MenusState,
//   action: ActionType<typeof editMenuOption>,
// ): MenusState => {
//   const { menuId, menuOptionId } = action.payload;
//   const menu = { ...state.data[menuId] };
//   const newMenuOptions = menu.options.map((option) => ({
//     ...option,
//     isEditing: menuOptionId === option.id,
//   }));
//   menu.options = newMenuOptions;

//   return {
//     ...state,
//     data: {
//       ...state.data,
//       [menuId]: menu,
//     },
//   };
// };

// const deleteMenuOptionReducer = (
//   state: MenusState,
//   action: ActionType<typeof deleteMenuOption>,
// ): MenusState => {
//   const { menuId, menuOptionId } = action.payload;
//   const menu = { ...state.data[menuId] };
//   const newMenuOptions = menu.options.filter(
//     (option) => !(option.id === menuOptionId),
//   );
//   menu.options = newMenuOptions;

//   return {
//     ...state,
//     data: {
//       ...state.data,
//       [menuId]: menu,
//     },
//   };
// };

// const addMenuActionSuccessReducer = (
//   state: MenusState,
//   action: ActionType<typeof addMenuAction.success>,
// ): MenusState => {
//   const { menuId, menuOptionId, actionData } = action.payload;
//   const menu = { ...state.data[menuId] };
//   const newMenuOptions = menu.options.map((option) => ({
//     ...option,
//   }));
//   menu.options = newMenuOptions;

//   return {
//     ...state,
//     data: {
//       ...state.data,
//       [menuId]: menu,
//     },
//   };
// };

export const menusReducer: Reducer<MenusState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    // case REHYDRATE:
    //   return {
    //     ...state,
    //     ...action.payload?.menus,
    //   };

    case getType(addMenuOption):
      return addMenuOptionReducer(state, action);

    // case getType(editMenuOption):
    //   return editMenuOptionReducer(state, action);

    // case getType(deleteMenuOption):
    //   return deleteMenuOptionReducer(state, action);

    // case getType(addMenuAction.success):
    //   return addMenuActionSuccessReducer(state, action);

    default: {
      return state;
    }
  }
};
