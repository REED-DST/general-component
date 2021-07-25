import moment from "moment";
import {Entry, FieldGenMiddleware, RawEntry, Field} from "../core";

const genRenderStringFromDate: FieldGenMiddleware = {
  applicable: (entry: Entry): boolean => {
    return entry.kind === "RAW" && entry.value instanceof Date;
  },
  fn: (entry: Entry): Field => {
    const {name, value} = entry as RawEntry;

    return {
      kind: "RENDER_STRING",
      name,
      value: moment(value).calendar(),
    };
  },
};

export default genRenderStringFromDate;
