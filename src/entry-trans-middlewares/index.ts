import {EntryTransMiddleware} from "../core";
import normalizeEntryName from "./normalize-entry-name";
import bundleValueSetterPairs from "./bundle-value-setter-pairs";

const entryTransMiddlewares: EntryTransMiddleware[] = [
  normalizeEntryName,
  bundleValueSetterPairs,
];

export default entryTransMiddlewares;
