import { Map } from "immutable";
import { v4 } from "uuid";
import { MenuData, MenuOptionData, MenuOptionId } from "./models";

export const makeMenuOptionData = (): MenuOptionData => ({
  title: "",
  icon: "",
  colour: "",
  actions: Map(),
  isEditing: true,
});

export const makeMenuData = (): MenuData => ({
  title: "",
  options: Map<MenuOptionId, MenuOptionData>().set(v4(), makeMenuOptionData()),
});
