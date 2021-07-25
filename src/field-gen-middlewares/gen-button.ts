import {Entry, FieldGenMiddleware, RawEntry, Field} from "../core";

const genButton: FieldGenMiddleware = {
  applicable: (entry: Entry) => {
    return entry.kind === "RAW" && typeof entry.value === "function";
  },
  fn: (entry: Entry): Field => {
    const {name, value} = entry as RawEntry;

    return {
      kind: "BUTTON",
      name,
      event: value,
    };
  },
};

export default genButton;
