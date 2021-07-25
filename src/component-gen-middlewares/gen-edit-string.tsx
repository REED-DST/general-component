import React from "react";
import {ComponentGenMiddleware} from "../core";
import FieldEditString from "../field-types/edit-string";

const genEditString: ComponentGenMiddleware = {
  fieldKind: "EDIT_STRING",
  fn: ((field: FieldEditString): React.FC => {
    return () => <input
      type={"text"}
      value={field.value}
      onChange={e => { field.setter(e.target.value); }}
      placeholder={field.name}
    />;
  }) as ComponentGenMiddleware["fn"],
};

export default genEditString;
