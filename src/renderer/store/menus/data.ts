import { v4 as uuidv4 } from "uuid";

import { MenuOptionData } from "./models";

export const makePlaceholderMenuOptionData = (): MenuOptionData => ({
  id: uuidv4(),
  title: "Placeholder",
  icon: "",
  colour: "",
  actions: [],
  isEditing: true,
});
