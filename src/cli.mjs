import { parseRle, toRle } from "./rle.mjs";

export function cliSimulate(input, generation) {
  const cells = parseRle(input);
  return toRle(cells, generation);
}