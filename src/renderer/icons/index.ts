import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line

export const loadIcons = () => {
  library.add(fas);
};

// https://github.com/FortAwesome/react-fontawesome/issues/201#issuecomment-458526491
export const getIconList = () => {
  // @ts-expect-error definitions exists
  const data = library.definitions;

  return Object.keys(data)
    .map((key) => Object.keys(data[key]))
    .reduce((current, next) => current.concat(next)) as IconName[];
};
