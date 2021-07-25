import React from "react";
import {ComponentGenMiddleware} from "../core";
import FieldRenderString from "../field-types/render-string";

const genRenderString: ComponentGenMiddleware = {
  fieldKind: "RENDER_STRING",
  fn: ((field: FieldRenderString) => {
    const style: Record<string, any> = {
      margin: "0px",
      padding: "0px",
      border: "0px",
      textAlign: "left",
    };

    return () => <p style={style}>{field.value}</p>;
  }) as ComponentGenMiddleware["fn"],
};

export default genRenderString;
