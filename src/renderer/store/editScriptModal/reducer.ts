import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showEditScriptModal, hideEditScriptModal } from "./actions";
import { EditScriptModalState } from "./models";

const reducerActions = {
  showEditScriptModal,
  hideEditScriptModal,
};

export const initialState: EditScriptModalState = {
  isShown: false,
  menuId: "",
  menuOptionId: "",
  actionId: "",
};

export const editScriptModalReducer: Reducer<EditScriptModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showEditScriptModal):
      const newState: EditScriptModalState = {
        ...state,
        isShown: true,
        menuId: action.payload.menuId,
        menuOptionId: action.payload.menuOptionId,
        actionId: action.payload.actionId,
      };

      return newState;
    case getType(hideEditScriptModal):
      return initialState;

    default: {
      return state;
    }
  }
};
