import * as r from "ramda";
import {fromCamelCase} from "../utils";
import {Entry, EntryTransMiddleware} from "../core";

const normalizeEntryName: EntryTransMiddleware = {
  fn: (entries: Entry[]): Entry[] => {
    const mapper = (entry: Entry): Entry => {
      if (entry.kind === "RAW")
      {
        return r.over(r.lensProp("name"), fromCamelCase, entry);
      }
      else
      {
        return entry;
      }
    };
    const newEntries: Entry[] = r.map(mapper, entries);

    return newEntries;
  },
};

export default normalizeEntryName;
