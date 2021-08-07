import ComponentPool from "./component-pool";
import {
    ComponentGenMiddleware,
    EntryTransMiddleware,
    FieldGenMiddleware,
    ComponentGenContext,
    Field,
    Entry,
    RawEntry,
    EditEntry,
} from "./core";

export {
    entryTransMiddlewares,
    fieldGenMiddlewares,
    componentGenMiddlewares,

    setEntryTransMiddlewares,
    setFieldGenMiddlewares,
    setComponentGenMiddlewares,
} from "./component-pool";


const CP = ComponentPool;
type CP = ComponentPool;

export default CP;
export {
    CP,
    ComponentPool,
    ComponentPool as componentPool,

    ComponentGenMiddleware,
    EntryTransMiddleware,
    FieldGenMiddleware,
    ComponentGenContext,
    Field,
    Entry,
    RawEntry,
    EditEntry,
};
