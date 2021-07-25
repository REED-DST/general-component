import React from "react";
import {ComponentGenMiddleware} from "../core";
import FieldList from "../field-types/list";

const genList: ComponentGenMiddleware = {
  fieldKind: "LIST",
  fn: ((field: FieldList, context) => {
    // Define container.
    const Container = ({children, index}: {children: any, index: number}) => {
      const style: Record<string, any> = {
        display: "inline-flex",
        marginLeft: "4px",
        marginTop: "4px",
      };
      return <div style={style}>{children}</div>;
    };

    // Generate components for the fields.
    const mapper = (valueItem: Record<string, any>) => {
      const GC = context.createGeneralComponent();
      return ()=><GC {...valueItem}/>;
    };
    const components: React.FC[] = field.value.map(mapper);

    // Make them into one component, and response.
    const wrapComponent = (C: React.FC, index: number) => {
      const props = field.value[index];
      const keyFromProps = (props: Record<string, any>): string | undefined => {
        const getKey = (props: Record<string, any>) => props["key"] ?? props["id"] ?? undefined;
        const optionally = <T,>(fn: (t: T)=>T, value: T): T => {
          if (value == null) { return value; }
          else { return fn(value); }
        };
        const toString = (a: any) => a.toString();
        return optionally(toString, getKey(props));
      };
      const key = keyFromProps(props);

      return <Container key={key} index={index}><C/></Container>;
    };
    const style: Record<string, any> = {
      display: "inline-flex",
      flexWrap: "wrap",
      flexDirection: "row",
      marginLeft: "-4px",
      marginTop: "-4px",
    };
    return ()=><div style={style}>
      {components.map(wrapComponent)}
    </div>;
  }) as ComponentGenMiddleware["fn"],
};

export default genList;
