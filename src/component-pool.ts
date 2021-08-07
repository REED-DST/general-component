import {ComponentGenMiddleware, createGeneralComponentFactory, EntryTransMiddleware, FieldGenMiddleware} from "./core";
import defaultEntryTransMiddlewares from "./entry-trans-middlewares";
import defaultFieldGenMiddlewares from "./field-gen-middlewares";
import defaultComponentGenMiddlewares from "./component-gen-middlewares";

let entryTransMiddlewares: EntryTransMiddleware[] = defaultEntryTransMiddlewares;
let fieldGenMiddlewares: FieldGenMiddleware[] = defaultFieldGenMiddlewares;
let componentGenMiddlewares: ComponentGenMiddleware[] = defaultComponentGenMiddlewares;

const setEntryTransMiddlewares = (value: EntryTransMiddleware[]) => entryTransMiddlewares = value;
const setFieldGenMiddlewares = (value: FieldGenMiddleware[]) => fieldGenMiddlewares = value;
const setComponentGenMiddlewares = (value: ComponentGenMiddleware[]) => componentGenMiddlewares = value;

const componentDict: Record<string, React.FC> = {};

const handler = {
  get: (obj: any, componentName: string) => {
    if (componentName in componentDict)
    {
      return componentDict[componentName];
    }

    // Create component.
    const createGeneralComponent = createGeneralComponentFactory({
      entryTransMiddlewares,
      fieldGenMiddlewares,
      componentGenMiddlewares,
    });
    const newComponent = createGeneralComponent();

    // Store to obj.
    componentDict[componentName] = newComponent;

    return newComponent;
  },
  set: (obj: any, prop: string, value: any) => {
    componentDict[prop] = value;
    return true;
  },
};

const componentPool = new Proxy({}, handler);
const CP = componentPool;
const ComponentPool = componentPool;

type ComponentPool = any;
type CP = ComponentPool;

export default CP;
export {
  componentPool,
  CP,
  ComponentPool,

  entryTransMiddlewares,
  fieldGenMiddlewares,
  componentGenMiddlewares,

  setEntryTransMiddlewares,
  setFieldGenMiddlewares,
  setComponentGenMiddlewares,
};

