import FieldEditInteger from "./edit-integer";
import FieldEditString from "./edit-string";
import FieldList from "./list";
import FieldButton from "./button";
import FieldRenderString from "./render-string";

type Field = (
  FieldEditInteger |
  FieldEditString |
  FieldList |
  FieldButton |
  FieldRenderString
);

export default Field;
