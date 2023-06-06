import { describe, it, expect } from "vitest";
import { parse } from "../src/lib/parser";

describe("operators", () => {
  it("sans", () => {
    expect(parse("'le roi pepin' sans 'r' sans 'o' sans 'pin'")).toBe(
      "le i pe"
    );
    expect(parse("131 sans 3")).toBe("onze");
  });
  it("avec", () => {
    expect(parse("'tuer' avec 'amour'")).toBe("tueramour");
    expect(parse("6 avec 2")).toBe("soixante-deux");
  });
  it("fois", () => {
    expect(parse("3 fois 'rien'")).toBe("rienrienrien");
    expect(parse("3 fois 6")).toBe("six-cent-soixante-six");
  });
  it("-", () => {
    expect(parse("-'bonjour'")).toBe("ruojnob");
  });
  it("par", () => {
    expect(parse("'bonjour' par 3")).toBe("bo");
  });
});

describe("functions", () => {
  it("crier", () => {
    expect(parse('CRIER("bonjour")')).toBe("BONJOUR");
    expect(parse("CRIER(3)")).toBe("TROIS");
  });
  it("parmi", () => {
    const res = ["cinq", "deux", "quatre", "six", "trois", "un"];
    expect(res.includes(parse("PARMI(1,2,3,4,5 et 6)"))).toBeTruthy();
  });
  it("ranger", () => {
    expect(parse('RANGER("bonjour")')).toBe("bjnooru");
  });
});
