import {EditEntry, Entry, FieldGenMiddleware, Field} from "../core";

const genEditString: FieldGenMiddleware = {
  applicable: (entry: Entry) => {
    return entry.kind === "EDIT" && typeof entry.value.value === "string";
  },
  fn: (entry: Entry): Field => {
    const {
      value: {name: valueName, value: valueValue},
      setter: {name: setterName, value: setterValue},
    } = entry as EditEntry;

    return {
      kind: "EDIT_STRING",
      name: valueName,
      valueName,
      setterName,
      value: valueValue,
      setter: setterValue,
    };
  },
};

export default genEditString;
