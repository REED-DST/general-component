import {FieldGenMiddleware} from "../core";
import genEditString from "./gen-edit-string";
import genEditInteger from "./gen-edit-integer";
import genButton from "./gen-button";
import genList from "./gen-list";
import genRenderStringFromDate from "./gen-render-string-from-date";
import genRenderStringFromStringNumber from "./gen-render-string-from-string-number";

const fieldGenMiddlewares: FieldGenMiddleware[] = [
  genEditString,
  genEditInteger,
  genButton,
  genList,
  genRenderStringFromDate,
  genRenderStringFromStringNumber,
];

export default fieldGenMiddlewares;
