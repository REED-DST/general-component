import {ComponentGenMiddleware} from "../core";
import genButton from "./gen-button";
import genEditInteger from "./gen-edit-integer";
import genEditString from "./gen-edit-string";
import genList from "./gen-list";
import genRenderString from "./gen-render-string";

const componentGenMiddlewares: ComponentGenMiddleware[] = [
  genButton,
  genEditInteger,
  genEditString,
  genList,
  genRenderString,
];

export default componentGenMiddlewares;
