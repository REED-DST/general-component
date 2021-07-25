import {Map} from "immutable";
import {createGeneralComponentFactory} from "./core";
import entryTransMiddlewares from "./entry-trans-middlewares";
import fieldGenMiddlewares from "./field-gen-middlewares";
import componentGenMiddlewares from "./component-gen-middlewares";

const createGeneralComponent = createGeneralComponentFactory({
  entryTransMiddlewares,
  fieldGenMiddlewares,
  componentGenMiddlewares,
});

const componentDict: Record<string, React.FC> = {};

const handler = {
  get: (obj: any, componentName: string) => {
    if (componentName in componentDict)
    {
      console.log("Found: ", componentName);
    }
    else
    {
      console.log("Not found: ", componentName);
    }

    if (componentName in componentDict)
    {
      return componentDict[componentName];
    }

    // Create component.
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
export {componentPool, CP, ComponentPool};

