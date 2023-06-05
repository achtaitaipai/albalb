import { solve } from ".";
import { compile } from ".";
import { tokenize } from ".";

export { tokenize } from "./tokenize";
export { compile } from "./compile";
export { solve } from "./solve";

export const parse = (input: string) => solve(compile(tokenize(input)));
