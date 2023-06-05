import { symbols } from "./settings";
import type { Operator, Token } from "./types";

export const compile = (tokens: Token[]) => {
  const stack: Token[] = [];
  const output: Token[] = [];
  const argCounts: number[] = [];
  tokens.forEach((token, index) => {
    const { type, value } = token;
    if (type === "value") {
      output.push(token);
    }
    if (type === "opener") {
      stack.push(token);
    }
    if (type === "method") {
      stack.push(token);
      argCounts.push(0);
    }
    if (type === "separator") {
      while (stack.at(-1)?.type !== "opener") {
        const lastOfStack = stack.pop();
        if (!lastOfStack)
          throw Error("aïe aïe aîe : une parenthèse n'a pas de sœur :(");
        output.push(lastOfStack);
      }
      argCounts[argCounts.length - 1]++;
    }
    if (type === "operator") {
      const operator1 = getOperator(token, tokens, index);
      if (!operator1)
        throw Error(`aïe aïe aîe : l'opérateur "${value}" n'existe pas !`);
      while (stackHasPriority(operator1, stack)) {
        const itm = stack.pop();
        if (itm) output.push(itm);
      }
      stack.push(token);
    }
    if (type === "closer") {
      let top = stack.pop();
      while (top?.type !== "opener") {
        if (!top)
          throw Error("aïe aïe aîe : une parenthèse n'a pas de sœur :(");
        output.push(top);
        top = stack.pop();
      }
      if (stack.at(-1)?.type === "method") {
        const item = stack.pop();
        if (item) {
          output.push(item);
          const currentCount = argCounts.pop();
          if (currentCount !== undefined) item.argCount = currentCount;
        }
      }
    }
  });
  let item = stack.pop();
  while (item) {
    if (item.type === "opener")
      throw Error("aïe aïe aîe : une parenthèse n'a pas de sœur :(");
    output.push(item);
    item = stack.pop();
  }
  return output;
};

const getOperator = (token: Token, tokens: Token[], index: number) => {
  let operator: Operator | undefined;
  if (
    tokens[index - 1]?.type !== "value" &&
    tokens[index - 1]?.type !== "closer"
  ) {
    token.isUnary = true;
    operator = symbols[token.value]?.unary;
  } else operator = symbols[token.value]?.binary;
  if (!operator)
    throw Error(`aïe aïe aîe : l'opérateur "${token.value}" est mal utilisé`);
  return operator;
};

const stackHasPriority = (operator1: Operator, stack: Token[]) => {
  const topStack = stack.at(-1);
  if (!topStack || topStack.type !== "operator") return false;
  const opType = topStack.isUnary ? "unary" : "binary";
  const operator2Priority =
    symbols[topStack.value][opType]?.priority ?? Infinity;
  if (
    operator1.associativity === "left" &&
    operator1.priority <= operator2Priority
  )
    return true;
  if (operator1.priority < operator2Priority) return true;
  return false;
};
