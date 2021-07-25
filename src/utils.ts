const isUpperCase = (value: string): boolean => value === value.toUpperCase();

const fromCamelCase = (camel: string): string => {
  // String to characters.
  const chars: string[] = Array.from(camel);

  // Convert capital character into space + lowercase.
  const normalizedChars: string[] = chars.map(
    (char: string) => {
      if (isUpperCase(char))
      {
        return " " + char.toLowerCase();
      }
      else
      {
        return char;
      }
    }
  );

  // Join.
  const normalized: string = normalizedChars.join("");

  // Response.
  return normalized;
};

const toCamelCase = (normalized: string): string => {
  const impl = (name: string, isCapital: boolean): string => {
    if (name.length === 0) { return ""; }

    const first = name[0];
    const extra = name.slice(1, name.length);

    if (first === " ")
    {
      return impl(extra, true);
    }

    const char = isCapital ? first.toUpperCase() : first.toLowerCase();
    return char + impl(extra, false);
  };

  return impl(normalized, false);
};

// const oppositeVHDirection = (direc: VHDirection): VHDirection => direc === "horizontal" ? "vertical" : "horizontal";
//
// const vhDirectionToFlexDirection = (direc: VHDirection): "row" | "column" => direc === "horizontal" ? "row" : "column";

export {
  isUpperCase,
  fromCamelCase,
  toCamelCase,
  // oppositeVHDirection,
  // vhDirectionToFlexDirection,
};

