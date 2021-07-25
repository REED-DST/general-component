import React from "react";
import * as r from "ramda";
import {Map} from "immutable";
import Field from "./field-types";
import FieldWrapper from "./components/field-wrapper";
import ComponentWrapper from "./components/component-wrapper";
import {toCamelCase} from "./utils";
export {Field};

export type ComponentGenContext = {
  createGeneralComponent: ()=>GeneralComponent;
};
export type EntryTransMiddleware = {
  fn: (entries: Entry[])=>Entry[];
};
export type FieldGenMiddleware = {
  applicable: (entry: Entry)=>boolean;
  fn: (entry: Entry) => Field
};
export type ComponentGenMiddleware = {
  fieldKind: string;
  fn: (field: Field, context: ComponentGenContext) => React.FC;
};

// Entry has kind. Simple kind is the default one, which is just a name-value pair.
export type RawEntry = {
  kind: "RAW";
  name: string;
  value: any;
};
export type EditEntry = {
  kind: "EDIT";
  value: RawEntry;
  setter: RawEntry;
};
export type CustomField = EditEntry;
export type Entry = RawEntry | CustomField;

export type GeneralComponentProps = {
  style?: Record<string, any> | undefined;
  className?: string | undefined;
  children?: any | undefined;
  [key: string]: any;
};
export type GeneralComponent = React.FC<GeneralComponentProps>;


export const createGeneralComponentFactory = (p: {
  entryTransMiddlewares: EntryTransMiddleware[];
  fieldGenMiddlewares: FieldGenMiddleware[];
  componentGenMiddlewares: ComponentGenMiddleware[];
}): ()=>GeneralComponent => {
  const {
    entryTransMiddlewares,
    fieldGenMiddlewares,
    componentGenMiddlewares,
  } = p;

  // Build componentGenMiddlewareDict;
  const componentGenMiddlewareDict = Map<string, ComponentGenMiddleware>(
    componentGenMiddlewares.map(
      (middleware: ComponentGenMiddleware) => [middleware.fieldKind, middleware]
    )
  );

  const createGeneralComponent = (): GeneralComponent => {
    const generalComponet = (props: GeneralComponentProps) => {
      const {style, className, children, ...extraProps} = props;

      // Transform props to entries.
      let entries: Entry[];
      {
        const rawEntries = Object.entries(extraProps);
        const toEntry = ([name, value]: [string, any]): Entry | undefined => {
          // Sometimes, react-symbol-like things are passed.
          if (typeof name !== "string") { return undefined; }

          return {
            kind: "RAW",
              name,
              value,
          };
        };
        const notNull = (a: any): boolean => a != null;
        entries = rawEntries.map(toEntry).filter(notNull) as Entry[];
      }

      // Transform entries
      let transformedEntries: Entry[];
      {
        const applyMiddlewares = (entries: Entry[], middlewares: EntryTransMiddleware[]): Entry[] => {
          if (middlewares.length === 0) { return entries; }

          const [first, ...extra] = middlewares;

          return applyMiddlewares(first.fn(entries), extra);
        };
        transformedEntries = applyMiddlewares(entries, entryTransMiddlewares);
      }

      // Generate fields from entries.
      let fields: Field[];
      let missingEntries: Entry[];
      {
        const generateField = (entry: Entry, middlewares?: FieldGenMiddleware[]): ["FIELD", Field] | ["MISSING_ENTRY", Entry] => {
          if (middlewares == null)
          {
            middlewares = fieldGenMiddlewares;
          }

          if (middlewares.length === 0)
          {
            // console.error(entry);
            // throw new Error("Cannot find field-gen-middleware which can handle the above.");
            return ["MISSING_ENTRY", entry];
          }

          const [first, ...extra] = middlewares;

          // Check whether it's applicable.
          if (first.applicable(entry))
          {
            return ["FIELD", first.fn(entry)];
          }
          else
          {
            return generateField(entry, extra);
          }
        };

        const maybeFields: (["FIELD", Field] | ["MISSING_ENTRY", Entry])[] = r.map(generateField, transformedEntries);
        const grouper = (maybeField: ["FIELD", Field] | ["MISSING_ENTRY", Entry]) => maybeField[0];
        const groupedFields = r.groupBy(grouper, maybeFields);

        const takeField = (maybeField: any): Field => maybeField[1];
        const takeEntry = (maybeField: any): Entry => maybeField[1];

        fields = r.map(takeField, groupedFields.FIELD ?? []);
        missingEntries = r.map(takeEntry, groupedFields.MISSING_ENTRY ?? []);
      }

      // Generate components from fields.
      let components: React.FC[];
      {
        const generateComponent = (field: Field): React.FC => {
          // Find the middleware, and apply it. If no matching middleware found, throw.
          const middleware = componentGenMiddlewareDict.get(field.kind);
          if (middleware == null)
          {
            console.error(field);
            throw new Error("Cannot find component-gen-middleware which can handle the above.");
          }
          const context: ComponentGenContext = {
            createGeneralComponent,
          };
          return middleware.fn(field, context);
        };
        components = r.map(generateComponent, fields);
      }

      // Wrap up.
      let resultingElement: JSX.Element;
      {
        const contStyle: Record<string, any> = {
          display: "flex",
          flexDirection: "column",
        };

        const wrap = (Component: React.FC, index: number) => {
          const field: Field = fields[index];

          const style = index !== 0 ? {marginTop: "4px"} : {};

          return <FieldWrapper key={field.name} title={field.name} style={style}>
            {/* Rendering as component makes a lot of issues. Need to handle later. */}
            {/*<Component/>*/}
            {/* @ts-ignore */}
            {Component()}
          </FieldWrapper>;
        };

        resultingElement = <ComponentWrapper
          style={{
            ...style,
          }}
          className={className}
        >
          <div style={contStyle}>
            {/* @ts-ignore */}
            {r.addIndex(r.map)(wrap, components)}
            {(()=>{
              if (missingEntries.length === 0) { return undefined; }

              // @ts-ignore
              return <FieldWrapper style={{marginTop: "4px"}} title={"(Properties cannot be rendered)"}>
                {r.pipe(
                  // Take name.
                  // @ts-ignore
                  r.map(r.prop("name")),

                  // To camel-case.
                  r.map(toCamelCase),

                  // Join
                  r.join(", "),
                  // @ts-ignore
                )(missingEntries)}
              </FieldWrapper>
            })()}
            {(()=>{
              const isEmpty = (a: any) => a == null || (Array.isArray(a) && a.length === 0);
              if (isEmpty(children)) { return undefined; }

              return <FieldWrapper style={{marginTop: "4px"}}>
                {children}
              </FieldWrapper>
            })()}
          </div>
        </ComponentWrapper>;
      }

      return resultingElement;
    };

    return generalComponet;
  };

  return createGeneralComponent;
};
