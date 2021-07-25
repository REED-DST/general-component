import {Entry, FieldGenMiddleware, RawEntry, Field} from "../core";

const genList: FieldGenMiddleware = {
  applicable: (entry: Entry): boolean => {
    return entry.kind === "RAW" && Array.isArray(entry.value);
  },
  fn: (entry: Entry): Field => {
    const {name, value} = entry as RawEntry;

    return {
      kind: "LIST",
      name,
      value,
    };
  },
};

export default genList;
