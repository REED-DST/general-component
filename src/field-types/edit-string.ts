type FieldEditString = {
  kind: "EDIT_STRING";
  name: string;
  valueName: string;
  setterName: string;
  value: string;
  setter: (value: string)=>void;
};

export default FieldEditString;
