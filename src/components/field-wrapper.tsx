import React from "react";

type FieldWrapperProps = {
  style?: Record<string, any> | undefined;
  innerStyle?: Record<string, any> | undefined;
  className?: string | undefined;
  title?: string | undefined;
  children?: any | undefined;
};

const FieldWrapper = (p: FieldWrapperProps) => {
  const {
    style,
    innerStyle,
    className,
    title,
    children,
  } = p;

  const divStyle: Record<string, any> = {
    display: "inline-flex",
    flexDirection: "column",
    padding: "4px",
    border: "1px solid gray",
    borderRadius: "4px",
    ...style,
  };
  const nameStyle: Record<string, any> = {
    color: "gray",
    fontSize: "0.8em",
    margin: "0px",
    padding: "0px",
    textAlign: "left",
  };
  const fieldsCont: Record<string, any> = {
    marginTop: "4px",
    display: "flex",
    flexDirection: "column",
    ...innerStyle,
  };

  return (
    <div style={divStyle} className={className}>
      {title != null ? <h6 style={nameStyle}>{title}</h6> : undefined}
      <div style={fieldsCont}>
        {children}
      </div>
    </div>
  );
};

export default FieldWrapper;
export type {FieldWrapperProps};
