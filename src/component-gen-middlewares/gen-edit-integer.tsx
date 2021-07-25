import React from "react";
import {ComponentGenMiddleware, Field} from "../core";
import FieldEditInteger from "../field-types/edit-integer";

const genEditInteger: ComponentGenMiddleware = {
  fieldKind: "EDIT_INTEGER",
  fn: ((field: FieldEditInteger): React.FC => {
    return () => <input
      type={"number"}
      value={field.value.toString()}
      onChange={e => {
        const value = e.target.value;

        const numberValue = Number(value);

        if (Number.isNaN(numberValue))
        {
          field.setter(field.value);
          return;
        }

        field.setter(numberValue);
      }}
      placeholder={field.name}
    />;
  }) as ComponentGenMiddleware["fn"],
};

export default genEditInteger;
