import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  names,
} from "unique-names-generator";

const config: Config = {
  dictionaries: [adjectives, names],
  separator: " ",
  style: "capital",
};

export const getRandomPhrase = (): string => uniqueNamesGenerator(config);
