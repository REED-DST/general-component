import {EditEntry, Entry, FieldGenMiddleware, Field} from "../core";

const genEditInteger: FieldGenMiddleware = {
  applicable: (entry: Entry) => {
    return entry.kind === "EDIT" &&
      typeof entry.value.value === "number" &&
      Number.isInteger(entry.value.value);
  },
  fn: (entry: Entry): Field => {

    const {
      value: {name: valueName, value: valueValue},
      setter: {name: setterName, value: setterValue},
    } = entry as EditEntry;

    return {
      kind: "EDIT_INTEGER",
      name: valueName,
      valueName,
      setterName,
      value: valueValue,
      setter: setterValue,
    };
  },
};

export default genEditInteger;
