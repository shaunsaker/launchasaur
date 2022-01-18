import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { isEmptyObject } from "../utils/isEmptyObject";

export const loadIcons = () => {
  library.add(fas);
};

// https://github.com/FortAwesome/react-fontawesome/issues/201#issuecomment-458526491
export const getIconList = () => {
  // @ts-expect-error definitions exists
  const data = library.definitions;

  if (isEmptyObject(data)) {
    return [];
  }

  return Object.keys(data)
    .map((key) => Object.keys(data[key]))
    .reduce((current, next) => current.concat(next)) as IconName[];
};
