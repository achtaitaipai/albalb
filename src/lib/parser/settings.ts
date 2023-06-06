import { isNumberString, numberToLetter } from "../numberToLetter";
import type { Operator, OperatorSymbol, TokenAction } from "./types";

const operators: Record<string, Operator> = {
  sans: {
    priority: 1,
    associativity: "left",
    action: (val1: string, val2: string) =>
      numberToLetter(val1.split(val2).join("")),
  },
  avec: {
    priority: 1,
    associativity: "left",
    action: (val1: string, val2: string) => numberToLetter(val1 + val2),
  },
  fois: {
    priority: 2,
    associativity: "left",
    action: (val1: string, val2: string) => {
      let res = "";
      if (isNumberString(val1)) res = Array(parseInt(val1)).fill(val2).join("");
      else res = Array(parseInt(val2)).fill(val1).join("");
      return numberToLetter(res);
    },
  },
  par: {
    priority: 2,
    associativity: "left",
    action: (val1: string, val2: string) => {
      if (isNumberString(val2))
        return numberToLetter(
          val1
            .split("")
            .slice(0, val1.length / parseInt(val2))
            .join("")
        );
      throw Error(`mauvaise utilisation de l'opérateur 'par'`);
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
  par: {
    binary: operators.par,
  },
  "-": {
    unary: operators.rev,
  },
};

export const methods: Record<string, TokenAction> = {
  CRIER: (...args: string[]) =>
    args.map((t) => numberToLetter(t).toLocaleUpperCase()).join(""),
  PARMI: (...args: string[]) =>
    numberToLetter(args[Math.floor(Math.random() * args.length)]),
  RANGER: (...args: string[]) =>
    args.length > 1
      ? args.map(numberToLetter).sort().join(" ")
      : numberToLetter(args[0]).split("").sort().join(""),
};
