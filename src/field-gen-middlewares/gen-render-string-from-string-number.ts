import {Entry, FieldGenMiddleware, RawEntry, Field} from "../core";

const genRenderStringFromStringNumber: FieldGenMiddleware = {
  applicable: (entry: Entry): boolean => {
    return entry.kind === "RAW" && (typeof entry.value === "string" || typeof entry.value === "number");
  },
  fn: (entry: Entry): Field => {
    const {name, value} = entry as RawEntry;

    return {
      kind: "RENDER_STRING",
      name,
      value: value.toString(),
    };
  },
};

export default genRenderStringFromStringNumber;
