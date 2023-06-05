import { words } from "./words";

const suffix = {
  mille: 2,
  million: 3,
};

const cleanNumber = (str: string | number) =>
  typeof str === "string"
    ? parseInt(str).toString()
    : Math.round(str).toString();

const splitNumber = (str: string) => {
  const reversed = str.split("").reverse().join("");
  const chuncks = reversed.match(/(\d{3}|\d+)/g) ?? [];
  const res = chuncks.map((c) => c.split("").reverse()).reverse();
  return res;
};

export const numberToLetter = (input: number | string) => {
  const str = splitNumber(cleanNumber(input));
  const chunks = str.map((chunk, i) => {
    const num = parseInt(chunk.join(""));
    if (num === 0) return "";
    if (num < 100) return words[num];
    const c = Math.floor(num / 100);
    const d = parseInt(chunk.slice(1).join(""));
    const start = c > 1 ? words[c] + "-cent" : "cent";
    const end = d > 0 ? "-" + words[d] : "";
    const res = start + end;
    if (end === "" && i === str.length - 1 && c > 1) return res + "s";
    return res;
  });
  Object.entries(suffix).forEach(([toAdd, i]) => {
    for (let index = chunks.length - i; index >= 0; index -= i) {
      if (chunks[index] === "") return;
      chunks[index] =
        i === 0 || chunks[index] !== "un" ? chunks[index] + "-" + toAdd : toAdd;
    }
  });
  return chunks.filter((c) => c !== "").join("-");
};
