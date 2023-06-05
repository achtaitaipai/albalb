export type TokenType =
  | "value"
  | "operator"
  | "method"
  | "separator"
  | "opener"
  | "closer"
  | "unknown";

export type Token = {
  value: string;
  type: TokenType;
  argCount?: number;
  isUnary?: boolean;
};

export type TokenPattern = {
  pattern: string;
  type: TokenType;
  process?: (m: string) => string;
};

export type OperatorSymbol = {
  binary?: Operator;
  unary?: Operator;
};

export type Operator = {
  priority: number;
  associativity: "left" | "right";
  action: TokenAction;
};

export type TokenAction = (...args: string[]) => string;
