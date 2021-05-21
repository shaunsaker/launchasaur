import { Map, OrderedMap } from "immutable";

export const mapToArray = <T>(
  map: Map<string, T> | OrderedMap<string, T>,
): T[] => map.valueSeq().toArray();
