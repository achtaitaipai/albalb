import { methods, symbols } from "./settings";
import type { Token } from "./types";

export const solve = (tokens: Token[]) => {
  const stack: string[] = [];
  tokens.forEach((token) => {
    const { type, value } = token;
    if (type === "value") stack.push(value);
    if (type === "operator") {
      const operator = token.isUnary
        ? symbols[value].unary
        : symbols[value].binary;
      const args = stack.splice(-2);
      const action = operator?.action;
      if (!action || args.length < action.length)
        throw Error(`Bah Alors ? on utilise mal "${value}"`);
      stack.push(action(...args));
    }
    if (type === "method") {
      const method = methods[value];
      const argCount = (token.argCount ?? 0) + 1;
      if (stack.length < argCount)
        throw Error(`Oupela on dirait qu'il manque des arguments à ${value}`);
      const args = stack.splice(-argCount);
      stack.push(method(...args));
    }
  });
  return stack[0];
};
