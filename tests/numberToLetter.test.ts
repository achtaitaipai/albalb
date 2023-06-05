import { describe, it, expect } from "vitest";
import { numberToLetter } from "../src/lib/numberToLetter";

describe("numberToLetter()", () => {
  it("returns the correct number", () => {
    expect(numberToLetter(1)).toMatchSnapshot();
    expect(numberToLetter(21)).toMatchSnapshot();
    expect(numberToLetter(100)).toMatchSnapshot();
    expect(numberToLetter(200)).toMatchSnapshot();
    expect(numberToLetter(243)).toMatchSnapshot();
    expect(numberToLetter(1000)).toMatchSnapshot();
    expect(numberToLetter(11000)).toMatchSnapshot();
    expect(numberToLetter(863969)).toMatchSnapshot();
    expect(numberToLetter(146548978)).toMatchSnapshot();
  });
});
