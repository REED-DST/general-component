type FieldEditInteger = {
  kind: "EDIT_INTEGER";
  name: string;
  valueName: string;
  setterName: string;
  value: number;
  setter: (value: number)=>void;
};

export default FieldEditInteger;
