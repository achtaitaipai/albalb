import { describe, it, expect } from "vitest";
import { numberToLetter } from "../src/lib/numberToLetter";

describe("numberToLetter()", () => {
  it("returns the correct number", () => {
    expect(numberToLetter(1)).toBe("un");
    expect(numberToLetter(21)).toBe("vingt-et-un");
    expect(numberToLetter(100)).toBe("cent");
    expect(numberToLetter(200)).toBe("deux-cents");
    expect(numberToLetter(243)).toBe("deux-cent-quarante-trois");
    expect(numberToLetter(1000)).toBe("mille");
    expect(numberToLetter(11000)).toBe("onze-mille");
    expect(numberToLetter(863969)).toBe(
      "huit-cent-soixante-trois-mille-neuf-cent-soixante-neuf"
    );
    expect(numberToLetter(146548978)).toBe(
      "cent-quarante-six-million-cinq-cent-quarante-huit-mille-neuf-cent-soixante-dix-huit"
    );
  });
});
