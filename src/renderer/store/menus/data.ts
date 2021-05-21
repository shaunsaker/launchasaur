import { Map } from "immutable";
import { v4 } from "uuid";
import {
  ActionData,
  ActionDataResource,
  MenuAction,
  MenuData,
  MenuOptionData,
  MenuOptionId,
} from "./models";

export const makeActionData = ({
  id,
  action,
  resource,
}: {
  id?: string;
  action: MenuAction;
  resource: ActionDataResource;
}): ActionData => ({
  id: id || v4(),
  action,
  resource,
});

export const makeMenuOptionData = ({
  id,
}: {
  id?: string;
}): MenuOptionData => ({
  id: id || v4(),
  title: "",
  icon: "",
  colour: "",
  actions: Map(),
  isEditing: false,
});

export const makeMenuData = ({ id }: { id?: string }): MenuData => {
  const menuOptionId = v4();

  return {
    id: id || v4(),
    title: "",
    options: Map<MenuOptionId, MenuOptionData>().set(
      menuOptionId,
      makeMenuOptionData({ id: menuOptionId }),
    ),
  };
};
