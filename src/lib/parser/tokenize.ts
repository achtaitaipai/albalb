import { methods, symbols } from "./settings";
import type { Token, TokenPattern } from "./types";

const escapeRegExp = (str: string) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const tokensPattern: TokenPattern[] = [
  {
    pattern: `".*?"|'.*?'`,
    type: "value",
    process: (m: string) => m.slice(1, -1),
  },
  {
    pattern: "\\d+",
    type: "value",
    process: (m: string) => parseInt(m).toString(),
  },
  {
    pattern: Object.keys(symbols).map(escapeRegExp).join("|"),
    type: "operator",
  },
  {
    pattern: Object.keys(methods).map(escapeRegExp).join("|"),
    type: "method",
  },
  {
    pattern: ",|et",
    type: "separator",
  },
  {
    pattern: "\\(",
    type: "opener",
  },
  {
    pattern: "\\)",
    type: "closer",
  },
  { pattern: "[^\\s]+", type: "unknown" },
];

export const regex = new RegExp(
  tokensPattern.map((t) => `(${t.pattern})`).join("|"),
  "g"
);

export const tokenize = (str: string) => {
  const matches = str.matchAll(regex);
  const tokens: Token[] = [];
  for (const match of matches) {
    match.shift();
    const index = match.findIndex((m) => m !== undefined);
    const { type, process } = tokensPattern[index];
    const value = process ? process(match[index]) : match[index];
    tokens.push({ value, type });
  }
  return tokens;
};
