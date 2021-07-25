import React from "react";
import {ComponentGenMiddleware} from "../core";
import FieldButton from "../field-types/button";

const genButton: ComponentGenMiddleware = {
  fieldKind: "BUTTON",
  fn: ((field: FieldButton): React.FC => {
    return () => <input
      type={"button"}
      onClick={field.event}
      value={field.name}
    />;
  }) as ComponentGenMiddleware["fn"],
};

export default genButton;
