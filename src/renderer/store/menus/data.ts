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

export const makeMenuOptionData = (): MenuOptionData => ({
  id: v4(),
  title: "",
  icon: "",
  colour: "",
  actions: Map(),
  isEditing: true,
});

export const makeMenuData = (): MenuData => ({
  id: v4(),
  title: "",
  options: Map<MenuOptionId, MenuOptionData>().set(v4(), makeMenuOptionData()),
});
