import { numberToLetter } from "../numberToLetter";
import type { Operator, OperatorSymbol, TokenAction } from "./types";

const operators: Record<string, Operator> = {
  sans: {
    priority: 1,
    associativity: "left",
    action: (val1: string, val2: string) => val1.split(val2).join(""),
  },
  avec: {
    priority: 1,
    associativity: "left",
    action: (val1: string, val2: string) => val1 + val2,
  },
  fois: {
    priority: 2,
    associativity: "left",
    action: (val1: string, val2: string) => {
      if (isNaN(parseInt(val1)))
        return Array(parseInt(val2)).fill(val1).join("");
      return Array(parseInt(val1)).fill(val2).join("");
    },
  },
  rev: {
    priority: 4,
    associativity: "right",
    action: (val: string) => val.split("").reverse().join(""),
  },
};

export const symbols: Record<string, OperatorSymbol> = {
  sans: {
    binary: operators.sans,
  },
  avec: {
    binary: operators.avec,
  },
  fois: {
    binary: operators.fois,
  },
  "-": {
    unary: operators.rev,
  },
};

export const methods: Record<string, TokenAction> = {
  CRIER: (...args: string[]) => args.map((t) => t.toLocaleUpperCase()).join(""),
  AJOUTER: (...args: string[]) => args.reduce((p, c) => p + c, ""),
  PARMI: (...args: string[]) => args[Math.floor(Math.random() * args.length)],
  RANGER: (...args: string[]) =>
    args.length > 1 ? args.sort().join(" ") : args[0].split("").sort().join(""),
  MOT: (arg: string) => numberToLetter(arg),
};
